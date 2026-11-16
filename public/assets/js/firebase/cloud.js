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
  const KV_KEYS = ["wrongbook", "fc-known", "tips-done", "calc"]; // ngoài ra còn "speakRate:*"
  const isKV = (k) => KV_KEYS.indexOf(k) > -1 || k.indexOf("speakRate:") === 0;

  let auth = null, db = null, user = null, ready = false, applying = false, pushT = null;
  const sent = {}; // đường dẫn doc → chuỗi JSON đã đẩy gần nhất (để không ghi lại thứ không đổi)
  const subs = [];

  const cloud = (FA.cloud = {
    enabled: () => !!(cfg && cfg.projectId),
    user: () => user,
    db: () => db,
    onChange: (fn) => subs.push(fn),
    aiReady: () => !!(cfg && cfg.useCloudAI && user),
    aiLabel: () => (cfg && cfg.aiLabel) || "AI",
    signIn: () => signIn(),
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
        if (!seen[id]) { seen[id] = 1; out.push(x); }
      });
      return key === "wrongbook" ? out.slice(0, 300) : out;
    }
    if (local && remote && typeof local === "object" && typeof remote === "object") return Object.assign({}, remote, local);
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
      localKVKeys().forEach((k) => localStorage.removeItem(PREFIX + k));
    } catch (e) {}
  }

  /* ---------- đăng nhập / đăng xuất ---------- */
  async function signIn() {
    try {
      await sdkReady();
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      if (e && e.code === "auth/popup-closed-by-user") return;
      const m = e && e.code === "auth/unauthorized-domain" ? "Tên miền này chưa được cho phép trong Firebase (Authentication → Settings → Authorized domains)." : (e && e.message) || "lỗi";
      FA.toast("Không đăng nhập được: " + m);
      console.warn(e);
    }
  }
  async function signOut() {
    try { await pushNow(); } catch (e) {}
    ready = false;
    await auth.signOut();
    clearLocalSynced();
    FA.toast("Đã đăng xuất");
    setTimeout(() => location.reload(), 600);
  }

  /* ---------- nút trong header (chỗ .auth-slot do FA.renderShell tạo) ---------- */
  function paint() {
    document.querySelectorAll(".auth-slot").forEach((el) => {
      if (!cfg) { el.innerHTML = ""; return; }
      if (user) {
        const full = user.displayName || user.email || "Tài khoản";
        const initial = FA.esc((full.trim().split(/\s+/).slice(-1)[0] || "?").charAt(0).toUpperCase());
        // ảnh Google cần no-referrer; lỗi ảnh → hiện chữ cái đầu
        const avatar = user.photoURL
          ? `<img src="${FA.esc(user.photoURL)}" alt="" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${initial}'}))">`
          : `<span>${initial}</span>`;
        el.innerHTML = `
          <div class="acct">
            <button class="acct-btn" type="button" aria-haspopup="menu" aria-expanded="false" title="${FA.esc(full)}">
              <span class="avatar">${avatar}</span><span class="plan-badge"></span><svg class="caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="acct-menu" role="menu">
              <div class="acct-head">
                <span class="avatar avatar-lg">${avatar}</span>
                <div class="acct-id"><b>${FA.esc(full)} <span class="role-badge acct-role" hidden>ADMIN</span></b><span>${FA.esc(user.email || "")}</span></div>
              </div>
              <div class="acct-plan"></div><!-- plan.js điền: gói hiện tại, lượt AI -->
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
        el.innerHTML = `<button class="btn btn-outline btn-sm login-btn" type="button"><svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg><span>Đăng nhập</span></button>`;
        el.querySelector("button").onclick = signIn;
      }
    });
  }

  /* ---------- AI chấm qua Cloud Function ---------- */
  cloud.callAI = async function (payload) {
    await sdkReady();
    await loadScript(SDK + "firebase-functions-compat.js");
    const fn = firebase.app().functions(cfg.functionsRegion || "us-central1").httpsCallable("gradeWriting", { timeout: 120000 });
    const r = await fn(payload);
    return (r.data && r.data.content) || "";
  };

  /* ---------- khởi động ---------- */
  if (cfg) {
    document.addEventListener("DOMContentLoaded", paint);
    sdkReady().then(() => {
      firebase.initializeApp(cfg);
      auth = firebase.auth(); db = firebase.firestore();
      auth.onAuthStateChanged(async (u) => {
        user = u; ready = false;
        paint();
        if (u) {
          try {
            const changed = await syncDown();
            ready = true;
            await pushNow();
            if (changed) FA.toast("Đã đồng bộ dữ liệu từ tài khoản — tải lại trang để thấy đầy đủ");
          } catch (e) { console.warn("[FA.cloud] đồng bộ lỗi", e); FA.toast("Không đồng bộ được dữ liệu (kiểm tra Firestore Rules / mạng)"); }
        }
        subs.forEach((fn) => { try { fn(user); } catch (e) {} });
      });
    }).catch((e) => console.warn("[FA.cloud] không nạp được Firebase — chạy offline", e));
  }
})();
