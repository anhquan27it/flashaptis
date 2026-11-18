/* FlashAptis — tiện ích dùng chung: header, footer, lưu trữ, giọng đọc, quy đổi CEFR */
(function () {
  const FA = (window.FA = window.FA || {});

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

  /* ---------- Giao diện Sáng / Tối (Dark Mode) ---------- */
  const applyTheme = (t) => {
    const dark = t === "dark";
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.dataset.theme = dark ? "dark" : "light";
    }
    if (typeof document !== "undefined") {
      document.querySelectorAll(".theme-btn").forEach((b) => {
        b.textContent = dark ? "☀️" : "🌙";
        b.title = dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
        b.setAttribute("aria-pressed", String(dark));
      });
    }
  };
  applyTheme(FA.store.get("theme", "light"));

  /* ---------- Header & footer ---------- */
  const NAV = [
    { href: "exam.html", label: "Thi thử", key: "exam" },
    { href: "flashcards.html", label: "Flashcard", key: "flashcards" },
    { href: "exam.html#/gym", label: "Ôn tập", key: "gym" },
    { href: "tips.html", label: "Lộ trình mẹo", key: "tips" },
    { href: "guide.html", label: "Cấu trúc đề", key: "guide" },
    { href: "calculator.html", label: "Tính điểm", key: "calculator" },
    { href: "pricing.html", label: "Gói Pro", key: "pricing" },
  ];

  FA.renderShell = function (active) {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="container">
        <a class="logo" href="index.html" aria-label="FlashAptis trang chủ"><span class="bolt">⚡</span><span class="flash">Flash</span>Aptis</a>
        <nav class="nav" aria-label="Điều hướng chính">
          ${NAV.map((n) => `<a href="${n.href}" data-nav="${n.key}" class="${n.key === active ? "active" : ""}${n.key === "pricing" ? " nav-pro" : ""}"${n.key === active ? ' aria-current="page"' : ""}>${n.key === "pricing" ? "⭐ " : ""}${n.label}</a>`).join("")}
          <a class="btn btn-primary nav-cta" href="exam.html">Làm đề ngay ⚡</a><!-- chỉ hiện trong menu mobile -->
        </nav>
        <div class="header-actions">
          <button class="theme-btn" type="button" aria-label="Đổi giao diện sáng/tối" aria-pressed="false">🌙</button>
          <span class="auth-slot"></span><!-- cloud.js điền nút Đăng nhập / menu tài khoản -->
          <button class="menu-btn" type="button" aria-label="Mở menu" aria-expanded="false">☰</button>
        </div>
      </div>`;
    document.body.prepend(header);
    document.body.classList.add("has-shell");
    applyTheme(FA.store.get("theme", "light"));
    header.querySelector(".theme-btn").onclick = () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      FA.store.set("theme", next);
      applyTheme(next);
    };
    const menuBtn = header.querySelector(".menu-btn"), nav = header.querySelector(".nav");
    const closeAll = () => {
      nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.textContent = "☰";
      header.querySelectorAll(".acct.open").forEach((x) => x.classList.remove("open"));
    };
    // nếu đang ở exam.html thì chuyển tab Thi thử / Ôn tập ngay bằng hash (không tải lại trang)
    const onExamPage = /(?:^|\/)exam(?:\.html)?$/i.test(String(location.pathname || ""));
    if (onExamPage) {
      header.querySelectorAll('a[href="exam.html"], a[href="exam.html#/gym"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          closeAll();
          const target = a.getAttribute("href") === "exam.html#/gym" ? "#/gym" : "#/";
          if (location.hash !== target) location.hash = target;
        });
      });
    }
    // cập nhật active giữa "Thi thử" và "Ôn tập" khi đổi hash trong exam.html
    if (active === "exam" || active === "gym") {
      const syncNav = () => {
        const cur = location.hash.indexOf("gym") > -1 ? "gym" : "exam";
        header.querySelectorAll(".nav a[data-nav]").forEach((a) => {
          const isCur = a.dataset.nav === cur;
          a.classList.toggle("active", isCur);
          if (isCur) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
        closeAll();
      };
      window.addEventListener("hashchange", syncNav);
      syncNav();
    }
    if (FA.cloud && FA.cloud.paint) FA.cloud.paint(); // vẽ ô tài khoản ngay (cloud.js dùng hồ sơ đã nhớ), tránh nháy khi chuyển trang
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.textContent = open ? "✕" : "☰";
    });
    // bấm ra ngoài / Esc → đóng menu điều hướng và menu tài khoản
    document.addEventListener("click", (e) => { if (!e.target.closest(".nav, .acct")) closeAll(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
    // cuộn xuống → header có bóng nhẹ để tách khỏi nội dung
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

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

  /* ---------- Toast & Hộp thoại xác nhận ---------- */
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

  function openDialog(cfg) {
    return new Promise((resolve) => {
      const ov = document.createElement("div");
      ov.className = "auth-modal fa-modal";
      const hasInput = cfg.kind === "prompt";
      ov.innerHTML = `
        <div class="auth-box" role="dialog" aria-modal="true" style="max-width:420px;padding:24px">
          <h3 style="margin:0 0 8px;font-size:1.2rem">${FA.esc(cfg.title || (hasInput ? "Nhập thông tin" : "Xác nhận"))}</h3>
          <p class="muted mb-2" style="font-size:.95rem;white-space:pre-line">${FA.esc(cfg.msg)}</p>
          ${hasInput ? `<input class="inp mb-2" id="faDlgInp" value="${FA.esc(cfg.val || "")}" placeholder="${FA.esc(cfg.placeholder || "")}">` : ""}
          <div class="row" style="justify-content:flex-end;margin-top:16px">
            <button type="button" class="btn btn-outline btn-sm" id="faDlgNo">${FA.esc(cfg.cancelText || "Hủy")}</button>
            <button type="button" class="btn ${cfg.danger ? "btn-red" : "btn-primary"} btn-sm" id="faDlgYes">${FA.esc(cfg.okText || "Đồng ý")}</button>
          </div>
        </div>`;
      document.body.append(ov);
      const inp = ov.querySelector("#faDlgInp"), yes = ov.querySelector("#faDlgYes"), no = ov.querySelector("#faDlgNo");
      const close = (val) => { document.removeEventListener("keydown", onKey); ov.remove(); resolve(val); };
      const submit = () => close(hasInput ? inp.value : true);
      const onKey = (e) => {
        if (e.key === "Escape") close(hasInput ? null : false);
        else if (e.key === "Enter" && hasInput) { e.preventDefault(); submit(); }
      };
      document.addEventListener("keydown", onKey);
      ov.addEventListener("click", (e) => { if (e.target === ov) close(hasInput ? null : false); });
      no.onclick = () => close(hasInput ? null : false);
      yes.onclick = submit;
      setTimeout(() => (hasInput ? inp : yes).focus(), 0);
    });
  }
  FA.confirm = (msg, opts) => openDialog(Object.assign({ kind: "confirm", msg }, opts || {}));
  FA.prompt = (msg, val, opts) => openDialog(Object.assign({ kind: "prompt", msg, val }, opts || {}));

  FA.copy = async function (text, btn) {
    try { await navigator.clipboard.writeText(String(text)); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = String(text); ta.style.cssText = "position:fixed;opacity:0";
      document.body.append(ta); ta.select();
      try { document.execCommand("copy"); } catch (err) {}
      ta.remove();
    }
    FA.toast("Đã sao chép: " + text);
    if (btn) { const old = btn.textContent; btn.textContent = "✓ Đã chép"; setTimeout(() => { btn.textContent = old; }, 1400); }
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
    const totalChars = Math.max(1, lines.reduce((sum, ln) => sum + (ln.t ? ln.t.length : 0), 0));
    let doneChars = 0;
    const report = (pct) => { if (opts.onProgress) try { opts.onProgress(Math.max(0, Math.min(100, Math.round(pct)))); } catch (e) {} };
    report(0);
    return new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (gen !== speakGen) return resolve(); // đã bị dừng
        if (i >= lines.length) { report(100); return resolve(); }
        const ln = lines[i++];
        const u = new SpeechSynthesisUtterance(ln.t);
        const who = ln.who || ln.s;
        if (!(who in speakerIdx)) speakerIdx[who] = n++;
        const v = pickVoice(ln.s, speakerIdx[who]);
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
        u.rate = opts.rate || 0.95;
        u.pitch = ln.s === "m" ? 0.85 + (speakerIdx[who] % 2) * 0.15 : 1.05 + (speakerIdx[who] % 2) * 0.12;
        u.onboundary = (ev) => {
          if (gen === speakGen && typeof ev.charIndex === "number") report(((doneChars + ev.charIndex) / totalChars) * 100);
        };
        const advance = (delay) => {
          doneChars += ln.t ? ln.t.length : 0;
          report((doneChars / totalChars) * 100);
          setTimeout(next, delay);
        };
        u.onend = () => advance(350);
        u.onerror = () => advance(50);
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
