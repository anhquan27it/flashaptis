/* FlashAptis — Firebase: đăng nhập Google + đồng bộ dữ liệu học (Firestore) + gọi AI chấm qua Cloud Function.
   - Dùng bản "compat" của Firebase SDK (script thường, không cần build), tự nạp từ gstatic khi trang mở.
   - localStorage (FA.store) vẫn là nguồn chính: chưa đăng nhập / không tải được Firebase thì mọi thứ chạy như cũ.
   - Đăng nhập → gộp dữ liệu máy với dữ liệu trên tài khoản (hợp, không mất bên nào) rồi đẩy lại lên; sau đó mỗi lần FA.store.set
     một khóa được đồng bộ thì tự đẩy lên (trễ 1.5s). Đăng xuất → đẩy nốt rồi xóa bản sao cục bộ (tránh người dùng chung máy thấy dữ liệu nhau).
   - Cấu trúc Firestore: users/{uid}/attempts/{skill:testId} {key, v: JSON}, users/{uid}/kv/{khóa} {key, v: JSON}. Lưu JSON dạng chuỗi
     vì Firestore không cho mảng lồng mảng (đáp án bài làm có thể lồng). */
(function () {
  const FA = (window.FA = window.FA || {});
  const cfg = window.FA_FIREBASE;
  const SDK = "https://www.gstatic.com/firebasejs/10.14.1/";
  const PREFIX = "flashaptis:";
  const KV_KEYS = ["wrongbook", "fc-known", "fc-starred", "tips-done", "calc", "roadmap", "activity", "daily", "mock", "grammar-done"]; // ngoài ra còn "speakRate:*"
  const isKV = (k) => KV_KEYS.indexOf(k) > -1 || k.indexOf("speakRate:") === 0;

  let auth = null, db = null, user = null, ready = false, applying = false, pushT = null;
  /* Nhớ hồ sơ hiển thị của lần đăng nhập trước → mỗi lần chuyển trang header vẽ ngay avatar, không nháy "Đăng nhập" trong lúc chờ Firebase.
     Firebase xác nhận xong (onAuthStateChanged) mới là sự thật: khác thì vẽ lại, đăng xuất thì xóa cache. */
  const SESSION_KEY = PREFIX + "session";
  const readSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch (e) { return null; } };
  const writeSession = (u) => {
    try {
      if (u) localStorage.setItem(SESSION_KEY, JSON.stringify({ uid: u.uid, displayName: u.displayName || "", email: u.email || "", photoURL: u.photoURL || "" }));
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  };
  let cached = readSession(), authKnown = false, authResolve;
  const authReady = new Promise((r) => (authResolve = r));
  const sent = {}; // đường dẫn doc → chuỗi JSON đã đẩy gần nhất (để không ghi lại thứ không đổi)
  const subs = [];

  const cloud = (FA.cloud = {
    enabled: () => !!(cfg && cfg.projectId),
    user: () => user,
    authKnown: () => authKnown, // Firebase đã xác nhận xong trạng thái đăng nhập chưa
    cachedUser: () => (authKnown ? user : cached), // người dùng dùng để HIỂN THỊ (cache khi Firebase chưa xác nhận)
    db: () => db,
    onChange: (fn) => subs.push(fn),
    cloudAIEnabled: () => !!(cfg && cfg.useCloudAI),
    aiReady: () => !!(cfg && cfg.useCloudAI && user),
    aiLabel: () => (cfg && cfg.aiLabel) || "AI",
    signIn: (tab) => signIn(tab), // mở hộp thoại: "in" đăng nhập / "up" tạo tài khoản
    signOut: () => signOut(),
  });

  /* ---------- nạp SDK ---------- */
  const loaded = {};
  function loadScript(src) {
    return (loaded[src] = loaded[src] || new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = () => fail(new Error("Không tải được " + src));
      document.head.append(s);
    }));
  }
  const sdkReady = (() => {
    let p;
    return () => (p = p || loadScript(SDK + "firebase-app-compat.js")
      .then(() => Promise.all([loadScript(SDK + "firebase-auth-compat.js"), loadScript(SDK + "firebase-firestore-compat.js")])));
  })();

  /* ---------- băm/đọc dữ liệu cục bộ ---------- */
  const docId = (k) => encodeURIComponent(k);
  const parse = (s) => { try { return JSON.parse(s); } catch (e) { return undefined; } };
  const localKVKeys = () => {
    const out = new Set(KV_KEYS);
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.indexOf(PREFIX) === 0 && isKV(k.slice(PREFIX.length))) out.add(k.slice(PREFIX.length)); } } catch (e) {}
    return Array.from(out);
  };
  const hasLocal = (k) => { try { return localStorage.getItem(PREFIX + k) != null; } catch (e) { return false; } };

  /* ---------- gộp ---------- */
  function mergeAttempts(local, remote) {
    const seen = {}, all = [];
    (local || []).concat(remote || []).forEach((r) => { if (r && !seen[r.at]) { seen[r.at] = 1; all.push(r); } });
    return all.sort((a, b) => b.at - a.at).slice(0, 10);
  }
  function mergeKV(key, local, remote) {
    if (local === undefined) return remote;
    if (remote === undefined) return local;
    if (Array.isArray(local) && Array.isArray(remote)) {
      const seen = {}, out = [];
      local.concat(remote).forEach((x) => {
        const id = x && typeof x === "object" && x.id != null ? "id:" + x.id : JSON.stringify(x);
        if (!seen[id]) seen[id] = out.push(x);
        else if (key === "wrongbook" && x?.attemptAt > (out[seen[id] - 1]?.attemptAt || 0)) out[seen[id] - 1] = x;
      });
      return key === "wrongbook" ? out.slice(0, 300) : out;
    }
    if (key === "mock" && local && remote && typeof local === "object" && typeof remote === "object") {
      // lịch sử Full Test {idBộ: [lượt]} → gộp các lượt của cả 2 thiết bị theo mốc at, giữ 10 lượt mới nhất
      const out = {};
      Object.keys(Object.assign({}, remote, local)).forEach((id) => {
        const seen = {}, list = [];
        [].concat(local[id] || [], remote[id] || []).forEach((r) => { if (r && !seen[r.at]) { seen[r.at] = 1; list.push(r); } });
        out[id] = list.sort((x, y) => y.at - x.at).slice(0, 10);
      });
      return out;
    }
    if (local && remote && typeof local === "object" && typeof remote === "object") {
      const out = Object.assign({}, remote, local);
      // nếu là bảng mốc thời gian (vd. fc-known) thì giữ mốc mới hơn giữa 2 thiết bị
      if (key === "fc-known" || key === "activity" || key === "grammar-done") { // activity: điểm học theo ngày → lấy số lớn hơn
        Object.keys(remote).forEach((k) => {
          if (typeof remote[k] === "number" && typeof local[k] === "number") out[k] = Math.max(local[k], remote[k]);
        });
      }
      return out;
    }
    return local; // giá trị đơn (vd. calc): máy này thắng
  }

  /* ---------- đồng bộ ---------- */
  const base = () => db.collection("users").doc(user.uid);

  async function syncDown() {
    const [aSnap, kSnap] = await Promise.all([base().collection("attempts").get(), base().collection("kv").get()]);
    let changed = false;
    applying = true;
    try {
      const all = FA.store.get("attempts", {});
      aSnap.forEach((d) => {
        const x = d.data(), remote = parse(x.v);
        if (!x.key || !Array.isArray(remote)) return;
        sent["attempts/" + d.id] = x.v;
        const merged = mergeAttempts(all[x.key], remote);
        if (JSON.stringify(merged) !== JSON.stringify(all[x.key] || [])) { all[x.key] = merged; changed = true; }
      });
      FA.store.set("attempts", all);
      kSnap.forEach((d) => {
        const x = d.data();
        if (!x.key || !isKV(x.key)) return;
        sent["kv/" + d.id] = x.v;
        const local = hasLocal(x.key) ? FA.store.get(x.key, undefined) : undefined;
        const merged = mergeKV(x.key, local, parse(x.v));
        if (merged !== undefined && JSON.stringify(merged) !== JSON.stringify(local)) { FA.store.set(x.key, merged); changed = true; }
      });
    } finally { applying = false; }
    return changed;
  }

  async function pushNow() {
    clearTimeout(pushT); pushT = null;
    if (!user || !db) return;
    const writes = [];
    const all = FA.store.get("attempts", {});
    Object.keys(all).forEach((k) => {
      const v = JSON.stringify(all[k]), id = docId(k);
      if (sent["attempts/" + id] !== v) writes.push(["attempts", id, k, v]);
    });
    localKVKeys().forEach((k) => {
      if (!hasLocal(k)) return;
      const v = JSON.stringify(FA.store.get(k, null)), id = docId(k);
      if (sent["kv/" + id] !== v) writes.push(["kv", id, k, v]);
    });
    for (const [col, id, key, v] of writes) {
      try {
        await base().collection(col).doc(id).set({ key, v, updatedAt: Date.now() });
        sent[col + "/" + id] = v;
      } catch (e) { console.warn("[FA.cloud] đẩy dữ liệu lỗi", e); }
    }
  }
  function schedulePush() { if (!pushT) pushT = setTimeout(pushNow, 1500); }

  // mỗi lần lưu khóa được đồng bộ → đẩy lên (khi đã đăng nhập và đã gộp xong)
  const rawSet = FA.store.set;
  FA.store.set = function (key, val) {
    rawSet.call(FA.store, key, val);
    if (user && ready && !applying && (key === "attempts" || isKV(key))) schedulePush();
  };
  window.addEventListener("pagehide", () => { if (pushT) pushNow(); });

  function clearLocalSynced() {
    try {
      localStorage.removeItem(PREFIX + "attempts");
      localStorage.removeItem(PREFIX + "spell-ignore");
      localStorage.removeItem(PREFIX + "devAiUsage");
      localKVKeys().forEach((k) => localStorage.removeItem(PREFIX + k));
      // bản nháp bài làm dở (exam.js, "draft:<skill>:<id>") không đồng bộ nhưng là bài của người vừa đăng xuất → xóa để người dùng chung máy không thấy
      const drafts = [];
      for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.indexOf(PREFIX + "draft:") === 0) drafts.push(k); }
      drafts.forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  }

  /* ---------- đăng nhập / đăng xuất ---------- */
  /* ---------- đăng nhập: hộp thoại Google + email/mật khẩu ---------- */
  const GOOGLE_SVG = '<svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  const ERR = {
    "auth/email-already-in-use": "Email này đã có tài khoản — chuyển sang tab Đăng nhập (hoặc tài khoản này được tạo bằng Google).",
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/weak-password": "Mật khẩu quá yếu — cần ít nhất 6 ký tự.",
    "auth/invalid-credential": "Sai email hoặc mật khẩu.",
    "auth/invalid-login-credentials": "Sai email hoặc mật khẩu.",
    "auth/wrong-password": "Sai email hoặc mật khẩu.",
    "auth/user-not-found": "Chưa có tài khoản với email này — hãy Tạo tài khoản.",
    "auth/missing-password": "Nhập mật khẩu.",
    "auth/too-many-requests": "Thử sai quá nhiều lần, vui lòng đợi vài phút rồi thử lại.",
    "auth/network-request-failed": "Mất kết nối mạng.",
    "auth/operation-not-allowed": "Đăng nhập bằng email chưa được bật trong Firebase (Authentication → Sign-in method → Email/Password).",
    "auth/unauthorized-domain": "Tên miền này chưa được cho phép trong Firebase (Authentication → Settings → Authorized domains) — hãy mở bằng localhost.",
    "otp/send-failed": "Không gửi được mã xác nhận tới email này — kiểm tra lại email hoặc thử lại sau ít phút.",
    "auth/popup-blocked": "Trình duyệt chặn cửa sổ đăng nhập Google — cho phép popup rồi thử lại.",
  };
  const errMsg = (e) => ERR[e && e.code] || (e && e.message) || "Có lỗi xảy ra.";
  const getAuth = async () => { await sdkReady(); await authReady; auth.languageCode = "vi"; return auth; }; // email đặt lại mật khẩu bằng tiếng Việt

  /* ---------- OTP xác nhận email khi tạo tài khoản (EmailJS) ----------
     Mã 6 số tạo ở trình duyệt, gửi qua EmailJS (cấu hình FA_FIREBASE.otp). Chỉ giữ HASH của mã (SHA-256 + muối) trong bộ nhớ,
     hết hạn sau 15 phút, sai tối đa 5 lần, gửi lại sau 60 giây. Đây là kiểm tra PHÍA TRÌNH DUYỆT (đủ cho test/nội bộ):
     người rành DevTools vẫn lách được — muốn chặn thật phải chuyển việc tạo/kiểm mã sang Cloud Function.
     Chưa cấu hình EmailJS → tạo tài khoản ngay như cũ (không OTP). */
  const OTP = (cfg && cfg.otp) || {};
  const otpOn = () => !!(OTP.serviceId && OTP.templateId && OTP.publicKey);
  const OTP_TTL = 15 * 60e3, OTP_TRIES = 5, OTP_RESEND = 60e3; // 15 phút: khớp mẫu "One-Time Password" của EmailJS
  const sha256 = async (s) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((x) => x.toString(16).padStart(2, "0")).join("");
  async function sendOtp(p) {
    const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1e6).padStart(6, "0");
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: OTP.serviceId, template_id: OTP.templateId, user_id: OTP.publicKey,
        // gửi cả tên biến của mẫu "One-Time Password" có sẵn trong EmailJS ({{passcode}}, {{time}}) lẫn tên riêng ({{otp_code}}, {{expire_minutes}})
        template_params: {
          to_email: p.email, email: p.email, to_name: p.name, name: p.name, app_name: "FlashAptis",
          otp_code: code, passcode: code, expire_minutes: OTP_TTL / 60e3,
          time: new Date(Date.now() + OTP_TTL).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Ho_Chi_Minh" }),
        },
      }),
    });
    if (!res.ok) { const t = await res.text().catch(() => ""); const e = new Error("EmailJS " + res.status + ": " + t); e.code = "otp/send-failed"; throw e; }
    p.salt = Array.from(crypto.getRandomValues(new Uint32Array(4))).join("-");
    p.hash = await sha256(p.salt + code);
    p.exp = Date.now() + OTP_TTL; p.tries = 0; p.sentAt = Date.now();
  }

  let modal = null, otpTimer = null;
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  function closeModal() { clearInterval(otpTimer); if (modal) { modal.remove(); modal = null; document.removeEventListener("keydown", escClose); } }

  function signIn(tab) {
    closeModal();
    modal = document.createElement("div");
    modal.className = "auth-modal";
    modal.innerHTML = `
      <div class="auth-box" role="dialog" aria-modal="true" aria-labelledby="authTitle">
        <button class="auth-x" type="button" aria-label="Đóng">✕</button>
        <h2 id="authTitle">Chào mừng đến FlashAptis</h2>
        <p class="muted auth-sub">Đăng nhập để đồng bộ kết quả giữa các thiết bị và dùng AI chấm Writing.</p>
        <div class="auth-tabs" role="tablist">
          <button type="button" role="tab" data-tab="in">Đăng nhập</button>
          <button type="button" role="tab" data-tab="up">Tạo tài khoản</button>
        </div>
        <button class="btn btn-outline auth-google" type="button">${GOOGLE_SVG}<span>Tiếp tục với Google</span></button>
        <div class="auth-or"><span>hoặc dùng email</span></div>
        <form class="auth-form" novalidate>
          <label class="f-up">Họ và tên<input class="inp" name="name" autocomplete="name" maxlength="60" placeholder="Nguyễn Văn A"></label>
          <label class="f-mail">Email<input class="inp" name="email" type="email" autocomplete="email" placeholder="ban@email.com"></label>
          <label class="f-pw">Mật khẩu<input class="inp" name="pw" type="password" placeholder="Ít nhất 6 ký tự"></label>
          <label class="f-up">Nhập lại mật khẩu<input class="inp" name="pw2" type="password" autocomplete="new-password" placeholder="Nhập lại mật khẩu"></label>
          <div class="f-otp otp-box">
            <div class="otp-icon" aria-hidden="true">✉️</div>
            <p class="otp-info"></p>
            <input class="inp otp-inp" name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••" aria-label="Mã xác nhận 6 số">
            <button class="auth-link" type="button" data-act="resend">Gửi lại mã</button>
          </div>
          <div class="auth-msg" role="alert"></div>
          <button class="btn btn-primary auth-submit" type="submit"></button>
          <button class="auth-link f-in" type="button" data-act="forgot">Quên mật khẩu?</button>
          <button class="auth-link f-reset" type="button" data-act="back">← Quay lại đăng nhập</button>
          <button class="auth-link f-otp" type="button" data-act="edit">← Sửa email / thông tin</button>
        </form>
      </div>`;
    document.body.append(modal);
    document.addEventListener("keydown", escClose);
    const $ = (s) => modal.querySelector(s), form = $(".auth-form"), msg = $(".auth-msg"), submit = $(".auth-submit");
    const F = {}; ["name", "email", "pw", "pw2", "otp"].forEach((n) => (F[n] = form.querySelector(`[name="${n}"]`))); // ô nhập theo tên
    let mode = "in"; // in | up | reset | otp
    let pending = null; // thông tin đăng ký đang chờ nhập OTP {email, pw, name, salt, hash, exp, tries, sentAt}

    const setMode = (m) => {
      mode = m; msg.textContent = ""; msg.className = "auth-msg";
      modal.dataset.mode = m;
      modal.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === m)));
      submit.textContent = { up: otpOn() ? "Gửi mã xác nhận" : "Tạo tài khoản", reset: "Gửi email đặt lại mật khẩu", otp: "Xác nhận & tạo tài khoản" }[m] || "Đăng nhập";
      F.pw.autocomplete = m === "up" ? "new-password" : "current-password";
      $("#authTitle").textContent = { reset: "Quên mật khẩu", otp: "Nhập mã xác nhận" }[m] || "Chào mừng đến FlashAptis";
      $(".auth-sub").textContent = {
        reset: "Nhập email đã đăng ký — FlashAptis sẽ gửi link để bạn đặt mật khẩu mới.",
        up: "Tạo tài khoản miễn phí để lưu kết quả trên mọi thiết bị và dùng AI chấm Writing.",
        otp: "Bước cuối: xác nhận email là của bạn.",
      }[m] || "Đăng nhập để đồng bộ kết quả giữa các thiết bị và dùng AI chấm Writing.";
      clearInterval(otpTimer);
      if (m === "otp") {
        $(".otp-info").innerHTML = `Mã 6 số đã được gửi tới<br><b>${FA.esc(pending.email)}</b><br>Mã có hiệu lực 15 phút — xem cả thư mục Spam/Quảng cáo.`;
        F.otp.value = "";
        tickResend(); otpTimer = setInterval(tickResend, 1000);
      }
      setTimeout(() => { if (modal) ({ up: F.name, otp: F.otp }[m] || F.email).focus(); }, 0);
    };
    // nút "Gửi lại mã": đếm ngược 60 giây kể từ lần gửi gần nhất
    const tickResend = () => {
      const b = $("[data-act=resend]"), left = pending ? Math.ceil((pending.sentAt + OTP_RESEND - Date.now()) / 1000) : 0;
      b.disabled = left > 0;
      b.textContent = left > 0 ? `Gửi lại mã sau ${left}s` : "Gửi lại mã";
    };
    async function createAccount(p) {
      const a = await getAuth();
      const cred = await a.createUserWithEmailAndPassword(p.email, p.pw);
      await cred.user.updateProfile({ displayName: p.name });
      writeSession(cred.user); paint(); // onAuthStateChanged chạy trước khi có tên → vẽ lại header với tên
      if (!otpOn()) cred.user.sendEmailVerification().catch(() => {}); // đã xác nhận bằng OTP thì không cần link
      done("Đã tạo tài khoản — chào " + p.name + "!");
    }
    const say = (t, ok) => { msg.textContent = t; msg.className = "auth-msg " + (ok ? "ok" : "err"); };
    const busy = (b) => modal && modal.querySelectorAll("button, input").forEach((x) => (x.disabled = b));
    const done = (t) => { closeModal(); FA.toast(t); };

    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); }); // bấm nền tối → đóng
    $(".auth-x").onclick = closeModal;
    modal.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => setMode(b.dataset.tab)));
    $("[data-act=forgot]").onclick = () => setMode("reset");
    $("[data-act=back]").onclick = () => setMode("in");
    $("[data-act=edit]").onclick = () => setMode("up"); // giữ nguyên thông tin đã nhập
    $("[data-act=resend]").onclick = async () => {
      if (!pending) return setMode("up");
      busy(true);
      try { await sendOtp(pending); busy(false); setMode("otp"); say("Đã gửi mã mới.", true); }
      catch (e) { busy(false); tickResend(); say("Không gửi được mã xác nhận — thử lại sau ít phút."); console.warn(e); }
    };
    F.otp.addEventListener("input", () => { F.otp.value = F.otp.value.replace(/\D/g, "").slice(0, 6); });

    $(".auth-google").onclick = async () => {
      busy(true);
      try { const a = await getAuth(); await a.signInWithPopup(new firebase.auth.GoogleAuthProvider()); done("Đã đăng nhập"); }
      catch (e) { busy(false); if (e && e.code === "auth/popup-closed-by-user") return; say(errMsg(e)); console.warn(e); }
    };

    form.onsubmit = async (e) => {
      e.preventDefault();
      if (mode === "otp") {
        const code = F.otp.value.replace(/\D/g, "");
        if (code.length !== 6) { say("Nhập đủ 6 số."); return F.otp.focus(); }
        if (Date.now() > pending.exp) return say("Mã đã hết hạn — bấm “Gửi lại mã”.");
        if (pending.tries >= OTP_TRIES) return say("Sai quá nhiều lần — bấm “Gửi lại mã” để nhận mã mới.");
        pending.tries++;
        if ((await sha256(pending.salt + code)) !== pending.hash) {
          const left = OTP_TRIES - pending.tries;
          F.otp.select();
          return say(left > 0 ? `Mã không đúng (còn ${left} lần thử).` : "Sai quá nhiều lần — bấm “Gửi lại mã” để nhận mã mới.");
        }
        say("Mã đúng — đang tạo tài khoản…", true);
        busy(true);
        try { await createAccount(pending); pending = null; }
        catch (err) {
          busy(false); console.warn(err);
          // email đã có tài khoản → đưa về tab đăng nhập với email đã điền
          if (err && err.code === "auth/email-already-in-use") { setMode("in"); F.email.value = pending.email; F.pw.value = ""; }
          say(errMsg(err));
        }
        return;
      }
      const email = F.email.value.trim(), pw = F.pw.value, name = F.name.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("Email không hợp lệ."); return F.email.focus(); }
      if (mode !== "reset" && !pw) { say("Nhập mật khẩu."); return F.pw.focus(); }
      if (mode === "up") {
        if (!name) { say("Nhập họ và tên."); return F.name.focus(); }
        if (pw.length < 6) { say("Mật khẩu cần ít nhất 6 ký tự."); return F.pw.focus(); }
        if (pw !== F.pw2.value) { say("Hai mật khẩu không khớp."); return F.pw2.focus(); }
      }
      busy(true);
      try {
        if (mode === "in") {
          await (await getAuth()).signInWithEmailAndPassword(email, pw);
          done("Đã đăng nhập");
        } else if (mode === "up") {
          if (otpOn()) {
            pending = { email, pw, name }; // gửi OTP không cần chờ Firebase
            await sendOtp(pending);
            busy(false);
            setMode("otp");
          } else {
            await createAccount({ email, pw, name });
          }
        } else {
          await (await getAuth()).sendPasswordResetEmail(email);
          busy(false);
          say("Đã gửi email đặt lại mật khẩu tới " + email + " (xem cả thư mục Spam).", true);
        }
      } catch (err) {
        busy(false);
        say(errMsg(err));
        console.warn(err);
      }
    };
    setMode(tab === "up" ? "up" : "in");
  }
  async function signOut() {
    await authReady;
    try { await pushNow(); } catch (e) {}
    ready = false;
    await auth.signOut();
    writeSession(null);
    clearLocalSynced();
    FA.toast("Đã đăng xuất");
    setTimeout(() => location.reload(), 600);
  }

  /* ---------- nút trong header (chỗ .auth-slot do FA.renderShell tạo) ---------- */
  function paint() {
    const who = authKnown ? user : cached; // chưa xác nhận → tạm dùng hồ sơ đã nhớ
    const sig = who ? [who.uid, who.displayName, who.email, who.photoURL].join("|") : "out";
    document.querySelectorAll(".auth-slot").forEach((el) => {
      if (!cfg) { el.innerHTML = ""; return; }
      if (el.dataset.sig === sig) return; // giống hệt lần trước → giữ nguyên DOM (ảnh không tải lại, menu đang mở không bị đóng)
      el.dataset.sig = sig;
      if (who) {
        const full = who.displayName || who.email || "Tài khoản";
        const initial = FA.esc((full.trim().split(/\s+/).slice(-1)[0] || "?").charAt(0).toUpperCase());
        // ảnh Google cần no-referrer; lỗi ảnh → hiện chữ cái đầu
        const avatar = who.photoURL
          ? `<img src="${FA.esc(who.photoURL)}" alt="" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${initial}'}))">`
          : `<span>${initial}</span>`;
        el.innerHTML = `
          <div class="acct">
            <button class="acct-btn" type="button" aria-haspopup="menu" aria-expanded="false" title="${FA.esc(full)}">
              <span class="avatar">${avatar}</span><span class="plan-badge"></span><svg class="caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="acct-menu" role="menu">
              <div class="acct-head">
                <span class="avatar avatar-lg">${avatar}</span>
                <div class="acct-id"><b>${FA.esc(full)} <span class="role-badge acct-role" hidden>ADMIN</span></b><span>${FA.esc(who.email || "")}</span></div>
              </div>
              <div class="acct-plan"></div><!-- plan.js điền: gói hiện tại, lượt AI -->
              <a role="menuitem" href="dashboard.html">🗺️ Dashboard · Lộ trình học</a>
              <a role="menuitem" href="exam.html#/progress">📊 Tiến độ & lịch sử</a>
              <a role="menuitem" href="pricing.html">⭐ Gói & thanh toán</a>
              <a role="menuitem" href="admin.html" class="acct-admin" hidden>🛠️ Trang quản trị (Admin)</a>
              <button role="menuitem" type="button" class="acct-out">↩ Đăng xuất</button>
            </div>
          </div>`;
        const acct = el.querySelector(".acct"), btn = el.querySelector(".acct-btn");
        btn.onclick = (e) => {
          e.stopPropagation();
          const open = acct.classList.toggle("open");
          btn.setAttribute("aria-expanded", open);
          document.querySelectorAll(".nav.open").forEach((n) => n.classList.remove("open"));
        };
        el.querySelector(".acct-out").onclick = signOut;
      } else {
        el.innerHTML = `<button class="login-btn" type="button"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg><span>Đăng nhập</span></button>`;
        el.querySelector("button").onclick = () => signIn("in");
      }
    });
    if (FA.plan && FA.plan.paint) FA.plan.paint(); // điền huy hiệu gói vào DOM vừa vẽ
  }
  cloud.paint = paint; // common.js gọi ngay khi tạo header

  /* ---------- AI chấm qua Cloud Function ---------- */
  async function callCloudFn(name, payload) {
    await sdkReady();
    await loadScript(SDK + "firebase-functions-compat.js");
    const fn = firebase.app().functions(cfg.functionsRegion || "us-central1").httpsCallable(name, { timeout: 120000 });
    const r = await fn(payload);
    return (r.data && r.data.content) || "";
  }
  cloud.callAI = (payload) => callCloudFn("gradeWriting", payload);
  cloud.callSpeakingAI = (payload) => callCloudFn("gradeSpeaking", payload);

  /* ---------- khởi động ---------- */
  if (cfg) {
    document.addEventListener("DOMContentLoaded", paint);
    sdkReady().then(() => {
      firebase.initializeApp(cfg);
      auth = firebase.auth(); db = firebase.firestore();
      auth.onAuthStateChanged(async (u) => {
        user = u; ready = false;
        authKnown = true; cached = u ? { uid: u.uid } : null;
        writeSession(u);
        authResolve();
        paint();
        if (u) {
          try {
            const changed = await syncDown();
            ready = true;
            await pushNow();
            if (changed) {
              window.dispatchEvent(new CustomEvent("fa:synced"));
              FA.toast("Đã đồng bộ dữ liệu từ tài khoản ⚡");
            }
          } catch (e) { console.warn("[FA.cloud] đồng bộ lỗi", e); FA.toast("Không đồng bộ được dữ liệu (kiểm tra Firestore Rules / mạng)"); }
        }
        subs.forEach((fn) => { try { fn(user); } catch (e) {} });
      });
    }).catch((e) => console.warn("[FA.cloud] không nạp được Firebase — chạy offline", e));
  }
})();
