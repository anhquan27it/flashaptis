// Quay clip giới thiệu FlashAptis. Mỗi "take" là một trang + một chuỗi khung hình; build.js ghép lại.
// node record.js [tên-take,...]   (mặc định: tất cả)
const { BASE, VW, VH, launch, newPage, recorder, actor, sleep } = require("./lib");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "frames");
const only = (process.argv[2] || "").split(",").filter(Boolean);

const CARD = (title, sub, foot) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&family=Lexend:wght@600;700&display=swap" rel="stylesheet">
<style>
html,body{margin:0;height:100%}
body{display:grid;place-items:center;background:radial-gradient(1200px 600px at 70% 10%,#ffedd5,transparent),linear-gradient(160deg,#fff7ed,#fffbf5 60%,#ffedd5);font-family:"Be Vietnam Pro",sans-serif;color:#1f2937;overflow:hidden}
.w{text-align:center;animation:in .9s cubic-bezier(.2,.8,.2,1) both}
img{width:150px;height:150px;border-radius:50%;background:#fff;box-shadow:0 14px 40px rgba(249,115,22,.28);padding:6px;animation:pop 1s .1s cubic-bezier(.2,1.4,.4,1) both}
h1{font:700 76px/1.1 Lexend,sans-serif;margin:26px 0 8px}
h1 .f{background:linear-gradient(90deg,#f97316,#ea580c);-webkit-background-clip:text;color:transparent}
p{font-size:30px;margin:6px 0;color:#4b5563;animation:in .9s .35s both}
.foot{margin-top:34px;display:inline-block;padding:12px 26px;border-radius:999px;background:#f97316;color:#fff;font-weight:700;font-size:26px;animation:in .9s .6s both;box-shadow:0 10px 30px rgba(249,115,22,.35)}
@keyframes in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
</style></head><body><div class="w"><img src="${BASE}assets/img/brand/mascot-192.webp"><h1><span class="f">Flash</span>Aptis</h1><p>${title}</p><p style="font-size:24px">${sub}</p>${foot ? `<div class="foot">${foot}</div>` : ""}</div></body></html>`;

async function card(browser, name, html, ms, say) {
  const { ctx, page } = await newPage(browser, { seed: false });
  await page.goto(BASE + "index.html"); // để ảnh/linh vật cùng origin
  await page.setContent(html, { waitUntil: "networkidle" });
  await sleep(300);
  const rec = await recorder(page, path.join(OUT, name));
  await page.evaluate(() => { const w = document.querySelector(".w"); w.style.animation = "none"; w.offsetHeight; w.style.animation = ""; document.querySelectorAll("img,p,.foot").forEach((e) => { e.style.animation = "none"; e.offsetHeight; e.style.animation = ""; }); });
  await rec.start();
  await sleep(300);
  if (say) rec.event(say);
  await sleep(ms - 300);
  const frames = await rec.stop();
  await ctx.close();
  return frames;
}

/* trả lời 1 câu Grammar: chọn đúng theo dữ liệu (đáp án bị xáo mỗi lần tải nên đọc văn bản) */
const correctText = (page, testId, i) => page.evaluate(([id, i]) => { const q = FA_GRAMMAR.find((t) => t.id === id).questions[i]; return { right: q.o[q.a], wrong: q.o[(q.a + 1) % q.o.length] }; }, [testId, i]);

const TAKES_A = {
  intro: (b) => card(b, "intro", CARD("Luyện thi Aptis ESOL online — chấm điểm liền tay", "Hướng dẫn sử dụng trong 3 phút"), 4200, "FlashAptis — luyện thi Aptis online, chấm điểm liền tay. Cùng xem cách dùng trong ba phút nhé!"),

  /* bản thật: chưa đăng nhập thì phải đăng nhập (không chặn Firebase) */
  async login(b) {
    const ctx = await b.newContext({ viewport: null, locale: "vi-VN" });
    await ctx.route("**/assets/js/grading/ai-config.js", (r) => r.fulfill({ contentType: "text/javascript", body: "" }));
    await ctx.addInitScript(require("./lib").OVERLAY);
    const page = await ctx.newPage();
    await page.goto(BASE + "exam.html#/grammar/g2", { waitUntil: "networkidle" });
    await sleep(1500);
    const a = actor(page);
    const rec = await recorder(page, path.join(OUT, "login"));
    await rec.start();
    a.onCap = (h) => rec.event(h);
    await a.cap("Lần đầu vào làm đề, web yêu cầu <b>đăng nhập bằng Google hoặc email</b> (miễn phí)");
    await sleep(2600);
    await a.cap("Đăng nhập xong, lịch sử làm bài, chuỗi ngày và lộ trình được <b>đồng bộ theo tài khoản</b>");
    await sleep(3000);
    const frames = await rec.stop();
    await ctx.close();
    return frames;
  },

  outro: (b) => card(b, "outro", CARD("Luyện mỗi ngày một chút — đỗ Aptis nhẹ nhàng", "Đăng nhập bằng Google hoặc email để bắt đầu", "flashaptis.web.app"), 4200, "Luyện mỗi ngày một chút, đỗ Aptis nhẹ nhàng. Vào flashaptis chấm web chấm app để bắt đầu ngay hôm nay!"),
};

/* các cảnh trong cùng một phiên trình duyệt (dữ liệu, chuỗi ngày nối tiếp nhau) */
const START = { home: "index.html", hub: "index.html", grammar: "exam.html#/grammar", writing: "exam.html#/writing/w2", gym: "exam.html#/gym", flash: "flashcards.html", lesson: "grammar.html", dash: "dashboard.html", calc: "calculator.html", mock: "exam.html#/mock" };
const SCENES = {
  async home({ a, page, go, rec }) {
    await a.cap("Đây là <b>FlashAptis</b> — web luyện thi Aptis ESOL đủ <b>5 kỹ năng</b>");
    await a.moveTo(700, 400, 900);
    await sleep(1600);
    await a.cap("Thử ngay một câu Grammar mẫu ngay trên trang chủ");
    await a.click("#demo .demo-opt[data-k='1']", { ms: 900, after: 1800 });
    await a.cap("Kho đề lớn: <b>1.400 câu Grammar</b>, 13 đề Reading, 24 đề Listening, <b>9.642 thẻ từ vựng</b>");
    await a.scrollTo(".stats", 300, 1000);
    await sleep(2600);
  },
  async hub({ a, page, go, rec }) {
    await a.cap("Bấm <b>⚡ Luyện đề</b> trên menu để vào kho đề");
    await a.click(".nav-hot", { ms: 900, after: 0 });
    rec.pause(); await page.waitForLoadState("networkidle"); await sleep(600); await rec.resume();
    await a.cap("Web tự <b>gợi ý đề nên làm</b> và ước lượng điểm Overall của bạn");
    await a.hover(".hub-suggest, .hub-sugg, [class*=suggest]", 900).catch(() => a.moveTo(1250, 330, 900));
    await sleep(2600);
    await a.cap("Một buổi thi Aptis gồm <b>5 phần</b>: Grammar → Listening → Reading → Writing → Speaking");
    await a.scroll(560, 1100);
    await sleep(2400);
    await a.cap("Mỗi kỹ năng có tiến độ, điểm cao nhất và bậc CEFR — kèm <b>Full Test</b> thi thử trọn bộ");
    await a.scroll(420, 1000);
    await sleep(2800);
  },
  async grammar({ a, page, go, rec }) {
    await a.cap("Chọn kỹ năng → chọn đề. Gói Free làm được <b>2 đề đầu</b> mỗi kỹ năng");
    await sleep(800);
    await a.hover("a[href='#/grammar/g2']", 900).catch(() => {});
    await sleep(900);
    await a.click("a[href='#/grammar/g2']", { ms: 400, after: 700 });
    await a.cap("Đọc hướng dẫn rồi bấm <b>Bắt đầu tính giờ</b> — đồng hồ 25 phút như thi thật");
    await sleep(1000);
    await a.click("#startBtn", { ms: 800, after: 700 });
    await a.capPos("top");
    await a.cap("Mỗi lần một câu, đúng format thi trên máy. Chọn đáp án rồi bấm <b>Tiếp →</b>");
    for (let i = 0; i < 3; i++) {
      const t = await correctText(page, "g2", i);
      const pick = i === 2 ? t.wrong : t.right;
      await a.click(page.locator(".q-card .opt", { hasText: pick }).first(), { ms: 600, after: 350 });
      if (i === 1) { await a.cap("Câu chưa chắc? Bấm <b>🏳️ Đánh dấu</b> để xem lại trước khi nộp"); await a.click("#flagBtn", { ms: 600, after: 800 }); }
      await a.click("#next", { ms: 550, after: 400 });
    }
    await a.cap("⏩ Tua nhanh đến câu cuối…");
    await sleep(700);
    // làm nốt (cùng một tác vụ JS nên trình duyệt chỉ vẽ lại ở câu cuối)
    await page.evaluate(() => {
      const Q = FA_GRAMMAR.find((t) => t.id === "g2").questions;
      for (let i = 3; i < Q.length; i++) {
        const q = Q[i], txt = [9, 23, 37].includes(i) ? q.o[(q.a + 1) % q.o.length] : q.o[q.a];
        const b = [...document.querySelectorAll(".q-card .opt")].find((x) => x.textContent.slice(1) === txt);
        b.click();
        const n = document.querySelector("#next"); if (n) n.click();
      }
    });
    await sleep(1000);
    await a.cap("Xong thì bấm <b>Nộp bài</b> — có điểm ngay trên thang 0–50");
    await a.click("#fin", { ms: 900, after: 700 });
    const ok = page.locator(".modal .btn-primary, .confirm .btn-primary, [data-ok]").first();
    if (await ok.isVisible().catch(() => false)) await a.click(ok, { ms: 600, after: 600 });
    await a.capPos("bottom");
    await a.cap("Kết quả: điểm từng phần, và <b>đạt điểm cao còn có pháo giấy chúc mừng</b> 🎆");
    await sleep(3000);
    await a.cap("Bên dưới là <b>đáp án + giải thích từng câu</b>; câu sai tự vào <b>Sổ câu sai</b>");
    await a.scrollTo("h2.mt-4", 140, 1200);
    await sleep(800);
    await a.scroll(380, 900);
    await sleep(1600);
  },
  async writing({ a, page, go, rec }) {
    await a.cap("<b>Writing</b>: viết thẳng trên web, có đếm số từ theo từng câu");
    await a.click("#startBtn", { ms: 800, after: 1000 });
    await a.capPos("top");
    const box = page.locator("#examContainer input:visible, #examContainer textarea:visible, .q-card input:visible").first();
    await a.type(box, "I usually read novels at the weekend.", 16);
    await sleep(500);
    await a.cap("Nộp bài, web <b>tự chấm</b>: chính tả, ngữ pháp, độ dài và mức <b>bám sát câu hỏi</b> (có AI hỗ trợ)");
    await sleep(3400);
    await a.capPos("bottom");
  },
  async gym({ a, page, go, rec }) {
    await a.cap("<b>Ôn tập nhanh</b>: mỗi ngày 10 câu, không bấm giờ — chọn là biết đúng sai ngay");
    await sleep(1800);
    await a.click(page.locator(".card", { hasText: "Grammar & Vocab" }).last(), { ms: 900, after: 700 });
    await a.scrollTo(".q-card", 130, 800);
    for (let i = 0; i < 2; i++) {
      await a.click(page.locator(".q-card .opt").nth(i === 0 ? 1 : 0), { ms: 700, after: 1500 });
      if (i === 0) await a.cap("Có <b>giải thích</b> sau mỗi câu; câu sai được lưu để ôn lại");
      await a.hover("#gnext", 700); await sleep(200);
      // bấm + cuộn trong cùng một tác vụ để không lộ khung chân trang
      await page.evaluate(() => { document.querySelector("#gnext").click(); const q = document.querySelector(".q-card"); window.scrollTo(0, scrollY + q.getBoundingClientRect().top - 130); });
      await sleep(500);
    }
    await a.capPos("bottom");
  },
  async flash({ a, page, go, rec }) {
    await a.cap("<b>Flashcard</b>: 6 bộ theo bậc CEFR A1–C2 và 23 chủ đề Aptis");
    await sleep(1000);
    await a.scrollTo("h2", 200, 900);
    await sleep(500);
    await a.click(page.locator("a.btn-primary[href^='#']").first(), { ms: 900, after: 1200 });
    await a.cap("Bấm vào thẻ để <b>lật xem nghĩa</b>, có phát âm và ví dụ");
    await a.click("#fc", { ms: 800, after: 1700 });
    await a.cap("Nhớ rồi thì bấm <b>✅ Đã thuộc</b>, từ khó thì gắn <b>⭐</b> để ôn riêng");
    await a.click("#got", { ms: 800, after: 1200 });
    await a.click("#fc", { ms: 600, after: 1300 });
    await a.click(page.locator(".fc-front .star-btn, .fc-front [class*=star]").first(), { ms: 700, after: 900 }).catch(() => {});
    await a.click("#got", { ms: 700, after: 3200 });
  },
  async lesson({ a, page, go, rec }) {
    await a.cap("<b>Học ngữ pháp</b>: 101 chủ điểm từ A1 đến C2, giảng bằng tiếng Việt");
    await sleep(1500);
    await a.click("a[href='#b1']", { ms: 900, after: 1000 });
    await a.click("a[href='#b1-04']", { ms: 900, after: 1200 }).catch(async () => { await a.click(page.locator("a[href^='#b1-']").nth(3), { ms: 900, after: 1200 }); });
    await a.cap("Mỗi bài có trọng tâm, cấu trúc câu, ví dụ giảng giải và phần <b>tự sửa lỗi</b>");
    await sleep(1400);
    await a.scroll(700, 1600);
    await sleep(1800);
  },
  async dash({ a, page, go, rec }) {
    await a.cap("<b>Dashboard lộ trình</b>: đặt bậc mục tiêu (B1/B2/C1) và ngày thi");
    await a.hover("select", 900).catch(() => {});
    await sleep(2400);
    await a.cap("Web tự tick từng việc theo bài bạn đã làm và cho biết <b>nên học gì tiếp theo</b>");
    await a.scroll(800, 1400);
    await sleep(2600);
    await a.cap("🔥 <b>Chuỗi ngày học</b> và biểu đồ 14 ngày giữ động lực mỗi ngày");
    await a.scroll(900, 1500);
    await sleep(2400);
  },
  async calc({ a, page, go, rec }) {
    await a.cap("<b>Tính điểm</b>: quy đổi điểm 4 kỹ năng sang Overall /200 và bậc CEFR");
    await a.click("#fromHist", { ms: 900, after: 1200 });
    const sl = await a.box("input[type=range][data-k='speaking'], input[type=range]");
    await a.moveTo(sl.x + sl.width * 0.48, sl.y + sl.height / 2, 700);
    await page.mouse.down();
    await a.moveTo(sl.x + sl.width * 0.76, sl.y + sl.height / 2, 1100);
    await page.mouse.up();
    await sleep(2200);
  },
  async mock({ a, page, go, rec }) {
    // phòng thi mở cùng tab (không bật tab mới), toàn màn hình giả lập (giữ nguyên khung hình khi quay)
    await page.evaluate(() => {
      window.open = () => null;
      const d = document.documentElement;
      d.requestFullscreen = () => Promise.resolve();
      if (navigator.keyboard) navigator.keyboard.lock = () => Promise.resolve();
    });
    await a.cap("<b>Full Test</b>: thi thử trọn bộ 5 phần liên tiếp, giống một buổi thi thật");
    await sleep(1600);
    await a.click("a[href='#/mock/m1']", { ms: 900, after: 900 });
    await a.cap("Làm liền 5 phần, <b>mỗi phần có đồng hồ riêng</b>; nộp phần nào là khóa phần đó");
    await a.scrollTo(".intro-box", 180, 1100);
    await sleep(2200);
    await a.click("#openRoom", { ms: 900, after: 900 });
    await a.cap("Vào phòng thi: kiểm tra micro và <b>cam kết tự làm bài</b>, không tra cứu hay dùng AI");
    await a.click("#micBtn", { ms: 900, after: 1000 });
    await a.scrollTo("#agree", 380, 800);
    await a.click("#agree", { ms: 800, after: 700 });
    await a.cap("Phòng thi chuyển <b>toàn màn hình</b>, khóa menu, chuột phải, sao chép/dán và phím tắt");
    await sleep(1200);
    await a.click("#enterBtn", { ms: 800, after: 1200 });
    await a.click(page.locator(".q-card .opt").first(), { ms: 700, after: 1200 });
    await sleep(2200); // hết thời gian ân hạn đầu giờ
    const leave = () => page.evaluate(() => {
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
      document.dispatchEvent(new Event("visibilitychange"));
      delete document.visibilityState;
    });
    await a.cap("Cố tình <b>chuyển tab</b> hay thoát toàn màn hình? Lần 1 sẽ bị <b>cảnh báo</b>");
    await a.moveTo(1380, 20, 900); // giả như rê chuột ra ngoài để đổi tab
    await leave();
    await sleep(3200);
    await a.click(".lock-ov .btn-primary", { ms: 900, after: 1800 });
    await a.cap("Vi phạm lần 2: <b>bài thi tự nộp và dừng ngay lập tức</b>, phần chưa làm tính 0 điểm");
    await sleep(1000);
    await a.moveTo(1380, 20, 900);
    await leave();
    await sleep(2400);
    await a.moveTo(720, 420, 900);
    await sleep(2800);
    await go("pricing.html");
    await a.cap("Gói <b>Free</b> dùng ngay; <b>Pro</b> mở toàn bộ đề và thêm lượt AI chấm bài");
    await sleep(3200);
    await a.cap("");
    await sleep(400);
  },
};

async function runScenes(b, names) {
  const { ctx, page } = await newPage(b);
  page.setDefaultTimeout(6000);
  page.on("pageerror", (e) => console.log("PAGEERR", e.stack.split(String.fromCharCode(10)).slice(0, 3).join(" | ")));
  const a = actor(page);
  const out = {};
  let rec = null;
  page.on("dialog", (d) => d.accept().catch(() => {}));
  const go = async (u) => { if (rec) rec.pause(); await page.evaluate(() => { try { sessionStorage.removeItem("__cap"); } catch (e) {} }).catch(() => {}); await page.goto("about:blank"); await page.goto(BASE + u, { waitUntil: "networkidle" }); await sleep(700); if (rec) await rec.resume(); };
  let cur = null;
  for (const n of names) {
    const t = Date.now();
    if (n !== "hub" || cur !== "home") await go(START[n]);
    fs.rmSync(path.join(OUT, n), { recursive: true, force: true });
    rec = await recorder(page, path.join(OUT, n));
    await rec.start();
    a.onCap = (h) => rec && rec.event(h);
    try { await SCENES[n]({ a, page, go, rec }); }
    catch (e) { console.log("LỖI cảnh", n, e.message.split(String.fromCharCode(10))[0]); await page.screenshot({ path: path.join(OUT, n + "-err.png") }); }
    out[n] = await rec.stop();
    rec = null; cur = n;
    console.log("cảnh", n, ((Date.now() - t) / 1000).toFixed(1) + "s");
  }
  await ctx.close();
  return out;
}


(async () => {
  const b = await launch();
  const names = only.length ? only : ["intro", "login", ...Object.keys(SCENES), "outro"];
  const sc = names.filter((n) => SCENES[n]);
  const res = sc.length ? await runScenes(b, sc) : {};
  for (const n of sc) save(n, res[n]);
  for (const n of names.filter((n) => !SCENES[n])) {
    fs.rmSync(path.join(OUT, n), { recursive: true, force: true });
    const t = Date.now();
    save(n, await TAKES_A[n](b));
  }
  await b.close();
})();
function save(n, frames) {
  {
    fs.writeFileSync(path.join(OUT, n + ".json"), JSON.stringify(frames));
    const kept = frames.filter((f) => f.keep && f.file);
    const span = frames[frames.length - 1].t - frames[0].t;
    console.log(`take ${n}: ${frames.length} khung, giữ ${kept.length}, dài ${span.toFixed(1)}s, ~${(kept.length / span).toFixed(1)} fps, `);
  }
}
