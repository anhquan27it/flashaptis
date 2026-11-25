/* FlashAptis — gói tài khoản Free / Pro (FA.plan). Nạp sau cloud.js ở mọi trang.
   - Free (0đ): 2 đề đầu mỗi kỹ năng, AI chấm Writing 3 lượt/ngày. Pro (50.000đ/30 ngày): mọi đề, AI 6 lượt/ngày.
   - Khách chưa đăng nhập = Free; riêng AI phải đăng nhập (cần tài khoản để đếm lượt).
   - Firestore: plans/{uid} {proUntil: ms} — CHỈ admin ghi; aiUsage/{uid} {day, n} — lượt AI trong ngày (giờ VN);
     payments/{id} — yêu cầu thanh toán người dùng tạo (status "pending"), admin duyệt ở admin.html; admins/{uid} — tạo tay trong Console.
   - Đây là chặn PHÍA TRÌNH DUYỆT: nội dung đề Pro vẫn nằm trong data/*.js công khai, người rành DevTools đọc được.
     Lượt AI qua Cloud Function thì được đếm lại ở server (functions/index.js), không lách được. */
(function () {
  const FA = (window.FA = window.FA || {});

  const CFG = (FA.PLAN = {
    freeTests: 2,                      // số đề đầu tiên của MỖI kỹ năng dành cho Free
    aiPerDay: { free: 3, pro: 6 },     // lượt AI chấm Writing mỗi ngày (giữ khớp với functions/index.js)
    price: 50000,                      // VNĐ cho mỗi lần gia hạn
    days: 30,                          // số ngày Pro mỗi lần thanh toán
    // Tài khoản nhận tiền — dùng để tạo mã VietQR (img.vietqr.io). id: mã ngân hàng (vd. MB, VCB, TCB, ACB, BIDV, VPB, TPB) hoặc mã BIN.
    // name: tên hiển thị trên trang Bảng giá (không bắt buộc, mặc định dùng id)
    bank: { id: "BIDV", accountNo: "8872127598", accountName: "DOAN THAI DUONG", name: "BIDV – PGD Nguyễn Đình Chiểu" },
  });

  const subs = [];
  let user = null, proUntil = 0, admin = false, loaded = false, usage = { day: "", n: 0 };
  /* Nhớ gói của lần trước (theo uid) → huy hiệu PRO/FREE, link admin, đề Pro hiện đúng ngay khi chuyển trang.
     Đây chỉ là hiển thị tạm: load() đọc Firestore xong sẽ ghi đè. */
  const PLAN_KEY = "flashaptis:planCache";
  const savePlan = () => { try { if (user) localStorage.setItem(PLAN_KEY, JSON.stringify({ uid: user.uid, proUntil, admin, usage })); else localStorage.removeItem(PLAN_KEY); } catch (e) {} };
  (function restore() {
    const who = FA.cloud && FA.cloud.cachedUser && FA.cloud.cachedUser();
    let c = null;
    try { c = JSON.parse(localStorage.getItem(PLAN_KEY)); } catch (e) {}
    if (who && c && c.uid === who.uid) { user = who; proUntil = +c.proUntil || 0; admin = !!c.admin; usage = c.usage || usage; }
  })();

  const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }); // YYYY-MM-DD theo giờ VN
  const db = () => FA.cloud && FA.cloud.db && FA.cloud.db();
  const firebaseOn = () => !!(FA.cloud && FA.cloud.enabled());
  const isLocalDevAI = () => !!(window.FA_AI && window.FA_AI.endpoint && window.FA_AI.apiKey);
  const usingCloudAI = () => !isLocalDevAI() && !!(FA.cloud && FA.cloud.cloudAIEnabled && FA.cloud.cloudAIEnabled());
  const DEV_USAGE_KEY = "flashaptis:devAiUsage";
  const readDevUsage = () => { try { const x = JSON.parse(localStorage.getItem(DEV_USAGE_KEY)); return x && x.day === today() ? x : { day: today(), n: 0 }; } catch (e) { return { day: today(), n: 0 }; } };
  const writeDevUsage = (u) => { try { localStorage.setItem(DEV_USAGE_KEY, JSON.stringify(u)); } catch (e) {} };
  const isPro = () => proUntil > Date.now();
  const aiLimit = () => CFG.aiPerDay[isPro() ? "pro" : "free"];
  const aiUsed = () => (usage.day === today() ? usage.n || 0 : 0);
  const code = () => (user ? "FA" + user.uid.slice(0, 8).toUpperCase() : "");
  const memo = () => "FLASHAPTIS " + code();
  const fmtVND = (n) => n.toLocaleString("vi-VN") + "đ";
  const fmtDay = (ms) => new Date(ms).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  function paintBadge() {
    document.querySelectorAll(".auth-slot .plan-badge").forEach((el) => {
      el.textContent = !user ? "" : isPro() ? "PRO" : "FREE";
      el.className = "plan-badge" + (user ? (isPro() ? " pro" : " free") : "");
      el.title = user && isPro() ? "Pro đến " + fmtDay(proUntil) : "";
    });
    // menu tài khoản trong header (cloud.js tạo)
    document.querySelectorAll(".acct-plan").forEach((el) => {
      if (!user) { el.innerHTML = ""; return; }
      el.innerHTML = isPro()
        ? `<span class="plan-badge pro">PRO</span> Hết hạn ${fmtDay(proUntil)}<br><small>AI hôm nay: ${aiUsed()}/${aiLimit()} lượt</small>`
        : `<span class="plan-badge free">FREE</span> AI hôm nay: ${aiUsed()}/${aiLimit()} lượt<br><a href="pricing.html">Nâng cấp Pro →</a>`;
    });
    document.querySelectorAll(".acct-admin, .acct-role").forEach((el) => (el.hidden = !admin)); // chỉ tài khoản có admins/{uid}
  }
  function emit() {
    paintBadge();
    subs.forEach((fn) => { try { fn(); } catch (e) { console.warn(e); } });
  }

  async function load(u) {
    // đọc xong mới gán (không xóa trạng thái đang hiển thị trong lúc chờ → không nháy FREE)
    let pu = 0, ad = false, us = { day: today(), n: 0 };
    if (u && db()) {
      const d = db(), uid = u.uid, day = today();
      const get = (col) => d.collection(col).doc(uid).get().catch((e) => { console.warn("[FA.plan] đọc " + col + " lỗi", e); return null; });
      const getUsage = usingCloudAI()
        ? d.collection("users").doc(uid).collection("usage").doc(day).get().catch((e) => { console.warn("[FA.plan] đọc usage lỗi", e); return null; })
        : Promise.resolve(null);
      const [p, a, g] = await Promise.all([get("plans"), get("admins"), getUsage]);
      pu = (p && p.exists && +p.data().proUntil) || 0;
      ad = !!(a && a.exists);
      if (usingCloudAI()) us = { day, n: (g && g.exists && +g.data().ai) || 0 };
      else if (isLocalDevAI()) us = readDevUsage();
    }
    user = u || null; proUntil = pu; admin = ad; usage = us;
    loaded = true;
    savePlan();
    emit();
  }

  /* Kiểm tra & (ở chế độ dev) trừ 1 lượt AI hôm nay. Ở chế độ Cloud AI, server (functions/index.js) kiểm tra & trừ lượt nguyên tử. */
  async function useAI() {
    if (!firebaseOn()) return { ok: true }; // không cấu hình Firebase (dev) → không giới hạn
    if (!user) return { ok: false, reason: `Đăng nhập để dùng AI chấm nội dung (Free ${CFG.aiPerDay.free} lượt/ngày, Pro ${CFG.aiPerDay.pro} lượt/ngày).` };
    const limit = aiLimit(), day = today();
    const outOfQuota = () => `Bạn đã dùng hết ${limit}/${limit} lượt AI hôm nay.` + (isPro() ? "" : ` Nâng cấp Pro để có ${CFG.aiPerDay.pro} lượt/ngày.`);

    if (usingCloudAI()) {
      try {
        const s = await db().collection("users").doc(user.uid).collection("usage").doc(day).get();
        const used = (s.exists && +s.data().ai) || 0;
        if (used >= limit) {
          usage = { day, n: used }; savePlan(); paintBadge();
          return { ok: false, reason: outOfQuota() };
        }
        usage = { day, n: used + 1 };
        savePlan();
        paintBadge();
        return { ok: true, used: used + 1, limit, cloud: true };
      } catch (e) {
        console.warn("[FA.plan] đọc lượt AI lỗi", e);
        return { ok: false, reason: "Không kiểm tra được lượt AI (mạng / Firestore)." };
      }
    }

    if (isLocalDevAI()) {
      const cur = readDevUsage();
      if (cur.n >= limit) return { ok: false, reason: outOfQuota() };
      usage = { day, n: cur.n + 1 };
      writeDevUsage(usage);
      savePlan();
      paintBadge();
      return { ok: true, used: usage.n, limit };
    }

    return { ok: false, reason: "AI chấm điểm chưa được bật." };
  }
  /* AI lỗi → hoàn lượt (Cloud AI hoàn ngay trên server; ở đây đồng bộ lại số lượt thực tế) */
  async function refundAI() {
    if (!firebaseOn() || !user) return;
    const day = today();
    if (usingCloudAI()) { await load(user); return; }
    if (isLocalDevAI()) {
      const cur = readDevUsage();
      if (cur.n > 0) {
        usage = { day, n: cur.n - 1 };
        writeDevUsage(usage);
        savePlan();
        paintBadge();
      }
    }
  }

  /* ---------- thanh toán ---------- */
  function qrUrl() {
    const b = CFG.bank;
    return `https://img.vietqr.io/image/${encodeURIComponent(b.id)}-${encodeURIComponent(b.accountNo)}-compact2.png?amount=${CFG.price}&addInfo=${encodeURIComponent(memo())}&accountName=${encodeURIComponent(b.accountName)}`;
  }
  async function myPayments() {
    if (!user) return [];
    const s = await db().collection("payments").where("uid", "==", user.uid).get();
    const out = [];
    s.forEach((d) => out.push(Object.assign({ id: d.id }, d.data())));
    return out.sort((a, b) => b.createdAt - a.createdAt);
  }
  async function submitPayment() {
    if (!user) throw new Error("Chưa đăng nhập");
    await db().collection("payments").add({
      uid: user.uid, email: user.email || "", name: user.displayName || "", code: code(),
      amount: CFG.price, status: "pending", createdAt: Date.now(),
    });
  }

  FA.plan = {
    loaded: () => loaded,
    user: () => user,
    isPro, isAdmin: () => admin, proUntil: () => proUntil,
    name: () => (isPro() ? "Pro" : "Free"),
    /* đề thứ idx (0-based) trong danh sách của một kỹ năng có bị khóa không */
    locked: (idx) => idx >= CFG.freeTests && !isPro(),
    aiLimit, aiUsed, useAI, refundAI,
    code, memo, qrUrl, myPayments, submitPayment, fmtVND, fmtDay,
    reload: () => load(user),
    paint: paintBadge,
    onChange: (fn) => subs.push(fn),
  };

  if (FA.cloud && FA.cloud.enabled()) {
    FA.cloud.onChange(load);
    setTimeout(() => { if (!loaded) { loaded = true; emit(); } }, 6000); // không nạp được Firebase → coi như Free
  } else {
    loaded = true;
  }
  document.addEventListener("DOMContentLoaded", paintBadge);
})();
