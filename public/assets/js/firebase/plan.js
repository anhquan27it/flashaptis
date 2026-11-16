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
    bank: { id: "MB", accountNo: "0000000000", accountName: "TEN CHU TAI KHOAN" },
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
    let pu = 0, ad = false, us = { day: "", n: 0 };
    if (u && db()) {
      const d = db(), uid = u.uid;
      const get = (col) => d.collection(col).doc(uid).get().catch((e) => { console.warn("[FA.plan] đọc " + col + " lỗi", e); return null; });
      const [p, a, g] = await Promise.all([get("plans"), get("admins"), get("aiUsage")]);
      pu = (p && p.exists && +p.data().proUntil) || 0;
      ad = !!(a && a.exists);
      if (g && g.exists) us = g.data();
    }
    user = u || null; proUntil = pu; admin = ad; usage = us;
    loaded = true;
    savePlan();
    emit();
  }

  /* trừ 1 lượt AI hôm nay. Trả {ok:true} hoặc {ok:false, reason} (lý do hiển thị cho người dùng) */
  async function useAI() {
    if (!firebaseOn()) return { ok: true }; // không cấu hình Firebase (dev) → không giới hạn
    if (!user) return { ok: false, reason: `Đăng nhập để dùng AI chấm nội dung (Free ${CFG.aiPerDay.free} lượt/ngày, Pro ${CFG.aiPerDay.pro} lượt/ngày).` };
    const limit = aiLimit(), day = today(), d = db(), ref = d.collection("aiUsage").doc(user.uid);
    try {
      const n = await d.runTransaction(async (tx) => {
        const s = await tx.get(ref), x = s.exists ? s.data() : {};
        const used = x.day === day ? x.n || 0 : 0;
        if (used >= limit) return -1;
        tx.set(ref, { day, n: used + 1 });
        return used + 1;
      });
      if (n < 0) return { ok: false, reason: `Bạn đã dùng hết ${limit}/${limit} lượt AI hôm nay.` + (isPro() ? "" : ` Nâng cấp Pro để có ${CFG.aiPerDay.pro} lượt/ngày.`) };
      usage = { day, n };
      savePlan();
      paintBadge();
      return { ok: true, used: n, limit };
    } catch (e) {
      console.warn("[FA.plan] trừ lượt AI lỗi", e);
      return { ok: false, reason: "Không kiểm tra được lượt AI (mạng / Firestore)." };
    }
  }
  /* AI lỗi → trả lại lượt vừa trừ */
  async function refundAI() {
    if (!firebaseOn() || !user) return;
    const day = today(), d = db(), ref = d.collection("aiUsage").doc(user.uid);
    try {
      await d.runTransaction(async (tx) => {
        const s = await tx.get(ref), x = s.exists ? s.data() : {};
        if (x.day === day && x.n > 0) tx.set(ref, { day, n: x.n - 1 });
      });
      if (usage.day === day && usage.n > 0) usage.n--;
    } catch (e) {}
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
