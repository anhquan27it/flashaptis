/* FlashAptis — tiện ích dùng chung: header, footer, lưu trữ, giọng đọc, quy đổi CEFR */
(function () {
  const FA = (window.FA = window.FA || {});

  /* ---------- Header & footer ---------- */
  const NAV = [
    { href: "exam.html", label: "Thi thử", key: "exam" },
    { href: "flashcards.html", label: "Flashcard", key: "flashcards" },
    { href: "exam.html#/gym", label: "Phòng gym", key: "gym" },
    { href: "tips.html", label: "Lộ trình mẹo", key: "tips" },
    { href: "guide.html", label: "Cấu trúc đề", key: "guide" },
    { href: "calculator.html", label: "Tính điểm", key: "calculator" },
  ];

  FA.renderShell = function (active) {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="container">
        <a class="logo" href="index.html" aria-label="FlashAptis trang chủ"><span class="bolt">⚡</span><span class="flash">Flash</span>Aptis</a>
        <button class="menu-btn" aria-label="Mở menu">☰</button>
        <nav class="nav">
          ${NAV.map((n) => `<a href="${n.href}" class="${n.key === active ? "active" : ""}">${n.label}</a>`).join("")}
          <a class="btn btn-primary btn-sm" href="exam.html">Làm đề ngay</a>
        </nav>
      </div>`;
    document.body.prepend(header);
    header.querySelector(".menu-btn").addEventListener("click", () => header.querySelector(".nav").classList.toggle("open"));

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div>
          <a class="logo" href="index.html" style="font-size:1.1rem"><span class="bolt">⚡</span><span class="flash">Flash</span>Aptis</a>
          <div class="mt-1">Luyện thi Aptis ESOL miễn phí · Học nhanh như tia chớp.</div>
          <div class="mt-1" style="font-size:.8rem">Aptis là nhãn hiệu của British Council. FlashAptis là dự án học tập độc lập, không liên kết với British Council. Điểm trên web chỉ mang tính ước lượng.</div>
        </div>
        <div>
          <a href="exam.html">Thi thử</a><a href="flashcards.html">Flashcard</a><a href="tips.html">Mẹo</a><a href="guide.html">Cấu trúc đề</a><a href="calculator.html">Tính điểm</a>
        </div>
      </div>
      <div class="container made-by">
        <span>© ${new Date().getFullYear()} FlashAptis · Bảo lưu mọi quyền.</span>
        <span class="made-badge">Made by <b>FPT University</b></span>
      </div>`;
    document.body.append(footer);
  };

  /* ---------- Lưu trữ cục bộ (an toàn khi bị chặn) ---------- */
  const PREFIX = "flashaptis:";
  FA.store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(PREFIX + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(val));
      } catch (e) {}
    },
  };

  /* Lịch sử làm bài */
  FA.saveAttempt = function (skill, testId, score, extra) {
    const all = FA.store.get("attempts", {});
    const k = skill + ":" + testId;
    all[k] = all[k] || [];
    // `at` vừa là thời điểm vừa là mã lượt làm bài → luôn lớn hơn lượt trước để không trùng nhau
    const rec = Object.assign({ score, at: Math.max(Date.now(), ((all[k][0] && all[k][0].at) || 0) + 1) }, extra || {}); // extra.ans = đáp án đã làm, dùng cho nút "Xem lại"
    all[k].unshift(rec);
    all[k] = all[k].slice(0, 10);
    FA.store.set("attempts", all);
    return rec.at; // mã định danh lượt làm bài
  };
  FA.updateAttempt = function (skill, testId, at, patch) {
    const all = FA.store.get("attempts", {});
    const rec = (all[skill + ":" + testId] || []).find((x) => x.at === at);
    if (rec) { Object.assign(rec, patch); FA.store.set("attempts", all); }
  };
  FA.getAttempts = function (skill, testId) {
    return FA.store.get("attempts", {})[skill + ":" + testId] || [];
  };

  /* Sổ câu sai */
  FA.addWrong = function (item) {
    const list = FA.store.get("wrongbook", []);
    if (!list.some((x) => x.id === item.id)) list.unshift(item);
    FA.store.set("wrongbook", list.slice(0, 300));
  };
  FA.removeWrong = function (id) {
    FA.store.set("wrongbook", FA.store.get("wrongbook", []).filter((x) => x.id !== id));
  };

  /* ---------- Toast ---------- */
  let toastEl, toastT;
  FA.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.append(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 2200);
  };

  /* ---------- Tiện ích ---------- */
  FA.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  FA.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  FA.fmtTime = (s) => {
    s = Math.max(0, Math.round(s));
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  };
  FA.wordCount = (t) => (t.trim().match(/[A-Za-zÀ-ỹ0-9'’-]+/g) || []).length;
  FA.fmtDate = (ts) => new Date(ts).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  /* ---------- Giọng đọc (Web Speech API) ---------- */
  let voices = [];
  let speakGen = 0;
  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  }
  loadVoices();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = loadVoices;

  FA.ttsSupported = () => "speechSynthesis" in window;

  // chọn giọng theo giới tính gợi ý (male/female) — ưu tiên giọng Anh-Anh
  function pickVoice(gender, idx) {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    const gb = voices.filter((v) => /en-GB/i.test(v.lang));
    const pool = gb.length ? gb : voices;
    const femaleRe = /female|woman|zira|hazel|susan|libby|sonia|serena|kate|samantha|karen|moira|tessa|fiona|victoria|emma|amy|natasha|aria|jenny|clara/i;
    const maleRe = /male|man|george|daniel|ryan|thomas|arthur|oliver|guy|david|mark|james|alex|fred|rishi|brian/i;
    let cand = pool.filter((v) => (gender === "f" ? femaleRe : maleRe).test(v.name) && !(gender === "m" && /female/i.test(v.name)));
    if (!cand.length) cand = voices.filter((v) => (gender === "f" ? femaleRe : maleRe).test(v.name));
    if (!cand.length) cand = pool;
    return cand[(idx || 0) % cand.length];
  }

  /* lines: [{s:'m'|'f', t:'text'}] hoặc chuỗi. Trả về Promise khi đọc xong. */
  FA.speak = function (lines, opts) {
    opts = opts || {};
    if (!FA.ttsSupported()) return Promise.reject(new Error("no-tts"));
    const gen = ++speakGen;
    speechSynthesis.cancel();
    if (typeof lines === "string") lines = [{ s: opts.gender || "f", t: lines }];
    const speakerIdx = {};
    let n = 0;
    return new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (gen !== speakGen) return resolve(); // đã bị dừng
        if (i >= lines.length) return resolve();
        const ln = lines[i++];
        const u = new SpeechSynthesisUtterance(ln.t);
        const who = ln.who || ln.s;
        if (!(who in speakerIdx)) speakerIdx[who] = n++;
        const v = pickVoice(ln.s, ln.s === "f" ? speakerIdx[who] : speakerIdx[who]);
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
        u.rate = opts.rate || 0.95;
        u.pitch = ln.s === "m" ? 0.85 + (speakerIdx[who] % 2) * 0.15 : 1.05 + (speakerIdx[who] % 2) * 0.12;
        u.onend = () => setTimeout(next, 350);
        u.onerror = () => setTimeout(next, 50);
        speechSynthesis.speak(u);
      };
      next();
    });
  };
  FA.stopSpeak = () => { speakGen++; if (FA.ttsSupported()) speechSynthesis.cancel(); };

  /* ---------- Quy đổi điểm Aptis → CEFR (ước lượng) ----------
     Cấu trúc điểm (theo bảng tham khảo của prepedu.com/vi/blog/thang-diem-aptis — không phải bảng chính thức của British Council):
       • Overall = Listening + Reading + Speaking + Writing, mỗi kỹ năng 0–50 → tối đa 200. Grammar & Vocabulary (50 câu × 1 điểm) KHÔNG cộng vào tổng,
         chỉ được xét khi điểm một kỹ năng nằm sát ngưỡng giữa hai bậc.
       • Listening: 25 câu, B1 12–16 · B2 17–20 · C 21–25 câu đúng.  Reading: 25 câu, B1 13–18 · B2 19–22 · C 23–25.
         Quy ra thang 50 (×2): Listening 24/34/42, Reading 26/38/46 — bên dưới. Nguồn không nêu ngưỡng A1/A2 nên giữ ngưỡng tham khảo cũ.
       • Speaking: 4 part, mỗi part 0–5 → tối đa 20, web quy ra thang 50 (×2,5). Writing do giám khảo chấm, nguồn không có thang → giữ ngưỡng ước lượng cũ.
       • Overall: dưới 40 A1 · 40–80 A2 · 80–120 B1 · 120–160 B2 · 160–180 C1 · trên 180 C2. Các mốc 80/120/160 xuất hiện ở hai dòng liền nhau nên web tính “từ mốc trở lên”
         (80 → B1, 120 → B2, 160 → C1); C2 bắt đầu từ 181 vì nguồn ghi “trên 180”. */
  FA.CEFR = {
    listening: [[42, "C"], [34, "B2"], [24, "B1"], [16, "A2"], [8, "A1"]],
    reading: [[46, "C"], [38, "B2"], [26, "B1"], [16, "A2"], [8, "A1"]],
    speaking: [[48, "C"], [41, "B2"], [26, "B1"], [16, "A2"], [4, "A1"]],
    writing: [[48, "C"], [40, "B2"], [26, "B1"], [18, "A2"], [6, "A1"]],
    overall: [[181, "C2"], [160, "C1"], [120, "B2"], [80, "B1"], [40, "A2"], [0, "A1"]],
  };
  // điểm kỹ năng không làm tròn trước khi xét bậc (vd: 25,86 chưa đạt ngưỡng 26)
  FA.toCEFR = function (skill, score) {
    const t = FA.CEFR[skill];
    if (!t) return "";
    for (const [min, lv] of t) if (score >= min) return lv;
    return "A0";
  };
  // Speaking: 4 part × 0–5 = tối đa 20 → thang 50
  FA.SPEAKING_MAX_RAW = 20;
  FA.speakingTo50 = (raw) => Math.round((raw / FA.SPEAKING_MAX_RAW) * 50);
})();
