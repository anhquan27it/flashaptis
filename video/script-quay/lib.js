// Thư viện quay clip: Edge headless + CDP screencast (JPEG chất lượng cao) + con trỏ giả + phụ đề trong trang
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:5502/";
const VW = 1440, VH = 810, DPR = 4 / 3; // → khung 1920x1080

// dữ liệu mẫu: một người học đã dùng web ~2 tuần
function seed() {
  const day = 864e5, now = Date.now();
  const d = (n) => new Date(now - n * day).toISOString().slice(0, 10);
  const activity = {};
  activity[d(0)] = 6;
  [13, 12, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1].forEach((n, i) => (activity[d(n)] = [12, 25, 18, 30, 22, 14, 35, 28, 20, 41, 26, 32][i]));
  const at = (n) => now - n * day;
  const attempts = {
    "grammar:g1": [{ score: 34, at: at(9) }, { score: 29, at: at(12) }],
    "reading:r1": [{ score: 30, at: at(7) }],
    "listening:l1": [{ score: 28, at: at(5) }],
    "writing:w1": [{ score: 26, at: at(4) }],
    "speaking:s1": [{ score: 24, at: at(3) }],
  };
  const fc = {};
  ["time", "people", "family", "home", "food", "school", "work", "travel", "weather", "shop", "city", "body", "health", "sport", "music", "movie", "book", "phone", "friend", "money"].forEach((w, i) => (fc["c-a1|" + w] = at(i % 9)));
  return {
    attempts, activity, "fc-known": fc,
    roadmap: { target: "B2", examDate: d(-75), updatedAt: at(10) },
    daily: { goal: 20 },
    "tips-done": [1, 2, 3, 4],
    "grammar-done": { "b1-01": at(6), "b1-02": at(5), "b1-03": at(2) },
    theme: "light",
  };
}

const OVERLAY = `
(() => {
  if (location.protocol === "about:") return;
  const css = \`
  #__cur{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;pointer-events:none;transform:translate(-100px,-100px);transition:none}
  #__cur svg{filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
  .__rip{position:fixed;z-index:2147483646;pointer-events:none;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:3px solid #f97316;animation:__rip .55s ease-out forwards}
  @keyframes __rip{from{transform:scale(.3);opacity:1}to{transform:scale(1.5);opacity:0}}
  #__cap{position:fixed;left:50%;bottom:34px;transform:translateX(-50%) translateY(14px);z-index:2147483645;pointer-events:none;
    max-width:78%;padding:14px 26px;border-radius:16px;background:rgba(17,24,39,.88);color:#fff;text-align:center;
    font:600 23px/1.45 "Be Vietnam Pro",system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.28);opacity:0;transition:opacity .35s,transform .35s}
  #__cap.on{opacity:1;transform:translateX(-50%) translateY(0)}
  #__cap b{color:#fdba74}
  html.__top #__cap{bottom:16px}
  .help-btn,.help-panel{display:none!important}
  #__tag{position:fixed;left:24px;top:auto;bottom:34px;z-index:2147483645;pointer-events:none;display:none}
  \`;
  const mount = () => {
    if (document.getElementById("__cur")) return;
    const st = document.createElement("style"); st.textContent = css; document.documentElement.append(st);
    const c = document.createElement("div"); c.id = "__cur";
    c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l15 9.5-6.6 1.4L16.2 21l-3 1.4-3.8-8.1L4 18.6z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.documentElement.append(c);
    const cap = document.createElement("div"); cap.id = "__cap"; document.documentElement.append(cap);
    const last = sessionStorage.getItem("__pos");
    if (last) { const [x, y] = last.split(",").map(Number); c.style.transform = "translate(" + x + "px," + y + "px)"; }
    const keep = sessionStorage.getItem("__cap");
    if (keep) { cap.innerHTML = keep; cap.classList.add("on"); }
  };
  window.__capPos = (p) => { document.documentElement.classList.toggle("__top", p === "top"); p === "top" ? sessionStorage.setItem("__top", "1") : sessionStorage.removeItem("__top"); };
  if (sessionStorage.getItem("__top")) document.documentElement.classList.add("__top");
  window.__cap = (html) => {
    mount();
    const cap = document.getElementById("__cap");
    if (!html) { cap.classList.remove("on"); sessionStorage.removeItem("__cap"); return; }
    sessionStorage.setItem("__cap", html);
    cap.classList.remove("on");
    setTimeout(() => { cap.innerHTML = html; cap.classList.add("on"); }, cap.textContent ? 180 : 0);
  };
  addEventListener("mousemove", (e) => { mount(); document.getElementById("__cur").style.transform = "translate(" + (e.clientX - 3) + "px," + (e.clientY - 2) + "px)"; sessionStorage.setItem("__pos", (e.clientX - 3) + "," + (e.clientY - 2)); }, true);
  addEventListener("mousedown", (e) => { const r = document.createElement("div"); r.className = "__rip"; r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px"; document.documentElement.append(r); setTimeout(() => r.remove(), 600); }, true);
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", mount); else mount();
})();`;

async function launch() {
  return chromium.launch({
    channel: "msedge", headless: true,
    args: ["--force-device-scale-factor=1.3333333", "--window-size=1465,902", "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none"],
  });
}

async function newPage(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: null, locale: "vi-VN", permissions: ["microphone"] });
  // tắt Firebase (không chặn đăng nhập) và AI (không gọi ra ngoài) khi quay
  await ctx.route("**/assets/js/firebase/firebase-config.js", (r) => r.fulfill({ contentType: "text/javascript", body: "window.FA_FIREBASE = null;" }));
  await ctx.route("**/assets/js/grading/ai-config.js", (r) => r.fulfill({ contentType: "text/javascript", body: "/* tắt AI khi quay */" }));
  const data = opts.seed === false ? {} : seed();
  await ctx.addInitScript((data) => {
    if (location.protocol === "about:") return;
    if (sessionStorage.getItem("__seeded")) return;
    sessionStorage.setItem("__seeded", "1");
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("flashaptis:")).forEach((k) => localStorage.removeItem(k));
      for (const k in data) localStorage.setItem("flashaptis:" + k, JSON.stringify(data[k]));
    } catch (e) {}
  }, data);
  await ctx.addInitScript(OVERLAY);
  const page = await ctx.newPage();
  return { ctx, page };
}

/* Ghi hình bằng CDP screencast: lưu từng khung JPEG kèm mốc thời gian */
async function recorder(page, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const cdp = await page.context().newCDPSession(page);
  const frames = []; // {file, t}
  let n = 0, on = false, lastWall = Date.now() / 1000, off = 0;
  const now = () => Date.now() / 1000 + off;
  cdp.on("Page.screencastFrame", async (f) => {
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
    if (!on) return;
    lastWall = Date.now() / 1000;
    off = f.metadata.timestamp - lastWall;
    const file = path.join(dir, String(n++).padStart(6, "0") + ".jpg");
    frames.push({ file, t: f.metadata.timestamp, keep: rec.keep });
    fs.promises.writeFile(file, Buffer.from(f.data, "base64"));
  });
  const rec = {
    keep: true,
    async start() { on = true; await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 }); },
    async stop() { await cdp.send("Page.stopScreencast"); on = false; frames.push({ file: null, t: now(), keep: false }); await sleep(300); return frames; },
    event(cap) { frames.push({ file: null, t: now(), ev: true, cap }); },
    pause() { frames.push({ file: null, t: now(), keep: false }); rec.keep = false; },   // đoạn giữa pause/resume bị cắt khi dựng
    async resume() {
      rec.keep = true;
      // ép trình duyệt vẽ lại để có khung mới ngay sau khi tiếp tục
      await page.evaluate(() => { const c = document.getElementById("__cur"); if (c) { c.style.opacity = "0.99"; requestAnimationFrame(() => (c.style.opacity = "")); } }).catch(() => {});
    },
  };
  return rec;
}

/* thao tác giống người */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function actor(page) {
  let pos = { x: VW / 2, y: VH / 2 };
  const a = {
    page,
    wait: sleep,
    async capPos(p) { await page.evaluate((p) => window.__capPos(p), p); },
    onCap: null,
    async cap(html, hold = 0) { if (a.onCap && html) a.onCap(html); await page.evaluate((h) => window.__cap && window.__cap(h), html); if (hold) await sleep(hold); },
    async moveTo(x, y, ms = 700) {
      const steps = Math.max(8, Math.round(ms / 16));
      const sx = pos.x, sy = pos.y;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps, e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        await page.mouse.move(sx + (x - sx) * e, sy + (y - sy) * e);
        await sleep(ms / steps);
      }
      pos = { x, y };
    },
    async box(sel) {
      const loc = typeof sel === "string" ? page.locator(sel).first() : sel;
      await loc.scrollIntoViewIfNeeded();
      await sleep(150);
      return loc.boundingBox();
    },
    async hover(sel, ms = 700) { const b = await a.box(sel); await a.moveTo(b.x + b.width / 2, b.y + b.height / 2, ms); return b; },
    async click(sel, { ms = 700, pause = 250, after = 500 } = {}) {
      await a.hover(sel, ms);
      await sleep(pause);
      await page.mouse.down(); await sleep(70); await page.mouse.up();
      await sleep(after);
    },
    async type(sel, text, cps = 14) {
      await a.click(sel, { after: 200 });
      for (const ch of text) { await page.keyboard.type(ch); await sleep(1000 / cps * (ch === " " ? 1.3 : 1) * (0.7 + Math.random() * 0.6)); }
    },
    async scroll(dy, ms = 900) {
      const steps = Math.round(ms / 16);
      for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, dy / steps); await sleep(16); }
      await sleep(200);
    },
    async scrollTo(sel, offset = 120, ms = 900) {
      const y = await page.locator(sel).first().evaluate((el, off) => el.getBoundingClientRect().top - off, offset);
      await a.scroll(y, ms);
    },
  };
  return a;
}

module.exports = { OVERLAY, BASE, VW, VH, launch, newPage, recorder, actor, sleep };
