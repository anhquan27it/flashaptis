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
    { href: "dashboard.html", label: "Dashboard", key: "dashboard" },
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
          <span class="streak-slot"></span><!-- FA.daily.paint(): chuỗi ngày học + mục tiêu hôm nay -->
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
    if (FA.daily) FA.daily.paint();
    if (FA.cloud && FA.cloud.paint) FA.cloud.paint(); // vẽ ô tài khoản ngay (cloud.js dùng hồ sơ đã nhớ), tránh nháy khi chuyển trang
    FA.contact.mount();
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.textContent = open ? "✕" : "☰";
    });
    // bấm ra ngoài / Esc → đóng menu điều hướng và menu tài khoản
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav, .acct")) closeAll();
      if (!e.target.closest(".streak")) header.querySelectorAll(".streak.open").forEach((x) => x.classList.remove("open"));
    });
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
          <a href="dashboard.html">Dashboard</a><a href="exam.html">Thi thử</a><a href="flashcards.html">Flashcard</a><a href="tips.html">Mẹo</a><a href="guide.html">Cấu trúc đề</a><a href="calculator.html">Tính điểm</a>
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
    if (FA.daily) FA.daily.add(FA.daily.PTS.test);
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

  /* ---------- Ăn mừng (kỷ lục mới, lên bậc, xong giai đoạn, đạt mục tiêu ngày) ----------
     FA.celebrate({icon, title, sub, confetti}) — hiện lần lượt từng banner (không chồng nhau), bấm để đóng.
     Hệ điều hành bật "giảm chuyển động" thì bỏ pháo giấy, chỉ hiện banner. */
  const celebQueue = [];
  let celebBusy = false;
  const reduceMotion = () => { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } };
  function confetti() {
    const box = document.createElement("div");
    box.className = "confetti";
    box.setAttribute("aria-hidden", "true");
    const colors = ["#f97316", "#fb923c", "#facc15", "#22c55e", "#3b82f6", "#ec4899", "#a855f7"];
    let html = "";
    for (let i = 0; i < 90; i++) {
      html += `<i style="--x:${Math.round(Math.random() * 100)}vw;--dx:${Math.round(Math.random() * 160 - 80)}px;--d:${(Math.random() * 0.5).toFixed(2)}s;--t:${(2.2 + Math.random() * 1.4).toFixed(2)}s;--r:${Math.round(Math.random() * 720 - 360)}deg;--c:${colors[i % colors.length]};--w:${6 + Math.round(Math.random() * 6)}px"></i>`;
    }
    box.innerHTML = html;
    document.body.append(box);
    setTimeout(() => box.remove(), 4200);
  }
  function nextCeleb() {
    if (celebBusy || !celebQueue.length) return;
    celebBusy = true;
    const o = celebQueue.shift();
    try {
      if (o.confetti !== false && !reduceMotion()) confetti();
      const el = document.createElement("div");
      el.className = "celebrate";
      el.setAttribute("role", "status");
      el.innerHTML = `<div class="celebrate-icon">${FA.esc(o.icon || "🎉")}</div><div><b>${FA.esc(o.title)}</b>${o.sub ? `<span>${FA.esc(o.sub)}</span>` : ""}</div>`;
      document.body.append(el);
      requestAnimationFrame(() => el.classList.add("show"));
      let done = false;
      const close = () => {
        if (done) return;
        done = true;
        el.classList.remove("show");
        setTimeout(() => { el.remove(); celebBusy = false; nextCeleb(); }, 350);
      };
      el.onclick = close;
      setTimeout(close, o.ms || 3600);
    } catch (e) { celebBusy = false; }
  }
  FA.celebrate = function (o) { celebQueue.push(o || {}); nextCeleb(); };

  /* ---------- Mục tiêu ngày + chuỗi ngày học (hiện trên header) ----------
     "Điểm học" trong ngày: nộp 1 đề = 10, trả lời 1 câu Ôn tập / 1 thẻ flashcard / 1 câu kiểm tra từ vựng = 1.
     Nhật ký theo ngày lưu ở FA.store "activity" {"YYYY-MM-DD": điểm}; ngày chưa có nhật ký (trước khi có tính năng này)
     thì suy ra từ lượt làm bài và flashcard đã thuộc. Chuỗi = số ngày liên tiếp có học, tính tới hôm nay (hôm nay chưa học thì tới hôm qua). */
  const pad2 = (n) => String(n).padStart(2, "0");
  FA.dayKey = (ts) => { const d = new Date(ts); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); };
  const DAY_MS = 86400000;
  const GOALS = [[10, "Nhẹ nhàng"], [20, "Vừa phải"], [40, "Chăm chỉ"]];
  function perDay() {
    const out = Object.assign({}, FA.store.get("activity", {}));
    const derived = {};
    const bump = (ts, n) => { if (typeof ts === "number" && ts > 0) { const k = FA.dayKey(ts); derived[k] = (derived[k] || 0) + n; } };
    const all = FA.store.get("attempts", {});
    Object.keys(all).forEach((k) => (all[k] || []).forEach((r) => bump(r && r.at, 10)));
    const fc = FA.store.get("fc-known", {});
    Object.keys(fc).forEach((k) => bump(fc[k], 1));
    Object.keys(derived).forEach((k) => { out[k] = Math.max(out[k] || 0, derived[k]); });
    return out;
  }
  function streakOf(map, now) {
    let n = 0;
    for (let i = map[FA.dayKey(now)] ? 0 : 1; i < 3650; i++) { if (map[FA.dayKey(now - i * DAY_MS)]) n++; else break; }
    return n;
  }
  function bestStreakOf(map) {
    const days = Object.keys(map).filter((k) => map[k] > 0).sort();
    let best = 0, run = 0, prev = null;
    days.forEach((k) => {
      const t = new Date(k + "T12:00:00").getTime();
      run = prev != null && Math.round((t - prev) / DAY_MS) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = t;
    });
    return best;
  }
  FA.daily = {
    PTS: { test: 10, item: 1 },
    GOALS,
    goal() { const g = (FA.store.get("daily", {}) || {}).goal; return GOALS.some(([v]) => v === g) ? g : 20; },
    setGoal(g) { const d = FA.store.get("daily", {}) || {}; d.goal = g; FA.store.set("daily", d); FA.daily.paint(); },
    perDay,
    today(now) { return perDay()[FA.dayKey(now || Date.now())] || 0; },
    streak(now) { return streakOf(perDay(), now || Date.now()); },
    bestStreak() { return bestStreakOf(perDay()); },
    add(n, now) {
      now = now || Date.now();
      const key = FA.dayKey(now), goal = FA.daily.goal();
      const before = FA.daily.today(now);
      const log = FA.store.get("activity", {});
      log[key] = (log[key] || 0) + (n || 1);
      const cut = FA.dayKey(now - 400 * DAY_MS); // giữ khoảng 13 tháng gần nhất
      Object.keys(log).forEach((k) => { if (k < cut) delete log[k]; });
      FA.store.set("activity", log);
      const after = FA.daily.today(now);
      if (before < goal && after >= goal) {
        FA.celebrate({ icon: "🎯", title: "Hoàn thành mục tiêu hôm nay!", sub: `${after}/${goal} điểm học · chuỗi ${streakOf(perDay(), now)} ngày 🔥` });
      }
      FA.daily.paint();
      return after;
    },
    paint() {
      if (typeof document === "undefined" || !document.querySelectorAll) return;
      const slots = document.querySelectorAll(".streak-slot");
      if (!slots || !slots.length) return;
      const now = Date.now(), map = perDay();
      const st = streakOf(map, now), best = Math.max(st, bestStreakOf(map));
      const today = map[FA.dayKey(now)] || 0, goal = FA.daily.goal();
      const pct = Math.min(100, Math.round((today / goal) * 100));
      const hit = today >= goal;
      slots.forEach((slot) => {
        const wasOpen = !!slot.querySelector(".streak.open");
        slot.innerHTML = `
          <div class="streak${wasOpen ? " open" : ""}${hit ? " hit" : ""}${st ? "" : " cold"}">
            <button class="streak-btn" type="button" aria-haspopup="dialog" aria-expanded="${wasOpen}" title="Chuỗi ${st} ngày · hôm nay ${today}/${goal} điểm học">
              <span class="streak-ring" style="--p:${pct}"><span>${st ? "🔥" : "💤"}</span></span><b>${st}</b>
            </button>
            <div class="streak-menu" role="dialog" aria-label="Mục tiêu hôm nay">
              <div class="row" style="gap:8px"><b style="font-family:var(--font-head);font-size:1.05rem">🔥 Chuỗi ${st} ngày</b><div class="spacer"></div><span class="muted" style="font-size:.82rem">Kỷ lục ${best} ngày</span></div>
              <div class="mt-1" style="font-size:.92rem">Hôm nay: <b>${today}/${goal}</b> điểm học ${hit ? "✅" : ""}</div>
              <div class="progress mt-1"><i style="width:${pct}%"></i></div>
              <div class="muted mt-1" style="font-size:.8rem">${hit ? "Tuyệt! Giữ nhịp này mỗi ngày nhé." : st ? "Học tiếp hôm nay để giữ chuỗi!" : "Học một chút hôm nay để bắt đầu chuỗi mới."}<br>Nộp 1 đề = 10 · 1 câu ôn tập / 1 thẻ flashcard = 1</div>
              <div class="streak-goals mt-2">${GOALS.map(([v, lb]) => `<button type="button" class="${v === goal ? "active" : ""}" data-goal="${v}">${lb}<small>${v}/ngày</small></button>`).join("")}</div>
              <div class="row mt-2" style="gap:6px"><a class="btn btn-primary btn-sm" href="exam.html#/gym">Ôn nhanh 10 câu</a><a class="btn btn-ghost btn-sm" href="dashboard.html">Lộ trình →</a></div>
            </div>
          </div>`;
        const box = slot.querySelector(".streak"), btn = slot.querySelector(".streak-btn");
        btn.onclick = (e) => { e.stopPropagation(); const o = box.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); };
        slot.querySelectorAll("[data-goal]").forEach((b) => (b.onclick = (e) => { e.stopPropagation(); FA.daily.setGoal(+b.dataset.goal); }));
      });
    },
  };
  if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("fa:synced", () => FA.daily.paint());


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

  /* ---------- Nút liên hệ hỗ trợ (góc dưới phải, mọi trang có header) ---------- */
  FA.CONTACT = {
    facebook: "https://www.facebook.com/ho.dung.411021/",
    messenger: "https://m.me/ho.dung.411021",
  };
  FA.contact = {
    mount() {
      if (typeof document === "undefined" || document.querySelector(".help-fab")) return;
      const C = FA.CONTACT;
      const box = document.createElement("div");
      box.className = "help-fab";
      box.innerHTML = `
        <div class="help-panel" id="helpPanel" role="dialog" aria-label="Liên hệ hỗ trợ" hidden>
          <div class="help-head">
            <span class="help-ava">💬</span>
            <div><b>Gặp vấn đề khi học?</b><small>Lỗi đề, lỗi chấm điểm, đăng nhập, thanh toán…</small></div>
            <button class="help-x" type="button" aria-label="Đóng">✕</button>
          </div>
          <p class="help-txt">Nhắn cho FlashAptis qua Facebook, mô tả ngắn vấn đề (kèm ảnh chụp màn hình nếu có). Bọn mình sẽ trả lời sớm nhất có thể.</p>
          <a class="btn btn-primary help-go" href="${C.messenger}" target="_blank" rel="noopener">Nhắn tin qua Messenger</a>
          <a class="btn btn-ghost help-go" href="${C.facebook}" target="_blank" rel="noopener">Xem trang Facebook</a>
          <button class="help-copy" type="button">📋 Sao chép thông tin trang này để gửi kèm</button>
        </div>
        <button class="help-btn" type="button" aria-expanded="false" aria-controls="helpPanel" title="Liên hệ hỗ trợ">
          <span class="help-ic" aria-hidden="true">💬</span><span class="help-lb">Hỗ trợ</span>
        </button>`;
      document.body.appendChild(box);
      const panel = box.querySelector(".help-panel"), btn = box.querySelector(".help-btn");
      const set = (open) => {
        panel.hidden = !open;
        box.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
      };
      btn.addEventListener("click", () => set(panel.hidden));
      box.querySelector(".help-x").addEventListener("click", () => set(false));
      box.querySelectorAll(".help-go").forEach((a) => a.addEventListener("click", () => set(false)));
      box.querySelector(".help-copy").addEventListener("click", () => {
        const info = `Trang: ${location.href}\nTrình duyệt: ${navigator.userAgent}\nThời gian: ${new Date().toLocaleString("vi-VN")}`;
        const done = () => FA.toast && FA.toast("Đã sao chép — dán vào tin nhắn giúp mình nhé");
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(info).then(done, () => window.prompt("Sao chép thông tin này:", info));
        else window.prompt("Sao chép thông tin này:", info);
      });
      document.addEventListener("click", (e) => { if (!panel.hidden && !e.target.closest(".help-fab")) set(false); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) set(false); });
    },
  };

  /* ---------- Báo lỗi câu hỏi / đề (Firestore: reports/{id}, admin xem ở admin.html) ----------
     FA.reportBtn({skill, testId, testTitle, ref}) → chuỗi HTML nút "⚠️ Báo lỗi"; bấm nút (delegate data-report) → hộp thoại.
     ref: vị trí trong đề ("Câu 12", "Part 2 · Câu 1"…). Mỗi câu chỉ báo 1 lần/ngày trên một máy (chống spam). */
  FA.REPORT_CATS = [["answer", "Đáp án sai"], ["text", "Câu hỏi / chính tả sai"], ["audio", "Âm thanh lỗi"], ["image", "Hình ảnh lỗi"], ["explain", "Giải thích sai / khó hiểu"], ["other", "Khác"]];
  FA.reportBtn = function (ctx, label) {
    return `<button type="button" class="rep-btn" data-report="${FA.esc(JSON.stringify(ctx || {}))}" title="Báo lỗi câu này cho FlashAptis">⚠️ ${FA.esc(label || "Báo lỗi")}</button>`;
  };
  FA.report = function (ctx) {
    ctx = ctx || {};
    const cut = (s, n) => String(s == null ? "" : s).slice(0, n);
    const ref = cut(ctx.ref, 200);
    const dedupeKey = [ctx.skill, ctx.testId, ref].join("|");
    const sentLog = FA.store.get("report-sent", {}) || {};
    const ov = document.createElement("div");
    ov.className = "auth-modal fa-modal";
    ov.innerHTML = `
      <div class="auth-box rep-box" role="dialog" aria-modal="true" aria-label="Báo lỗi" style="max-width:460px;padding:22px">
        <h3 style="margin:0 0 4px;font-size:1.15rem">⚠️ Báo lỗi câu này</h3>
        <p class="muted mb-2" style="font-size:.88rem">${FA.esc([ctx.testTitle, ref].filter(Boolean).join(" · ") || "Trang hiện tại")}</p>
        <div class="rep-cats">${FA.REPORT_CATS.map(([k, n], i) => `<label><input type="radio" name="repCat" value="${k}" ${i === 0 ? "checked" : ""}> ${n}</label>`).join("")}</div>
        <textarea class="inp mt-2" id="repMsg" maxlength="500" style="min-height:90px" placeholder="Mô tả ngắn: sai ở đâu, đáp án đúng nên là gì… (không bắt buộc)"></textarea>
        <div class="rep-err hidden" id="repErr"></div>
        <div class="row" style="justify-content:flex-end;margin-top:14px">
          <button type="button" class="btn btn-outline btn-sm" id="repNo">Hủy</button>
          <button type="button" class="btn btn-primary btn-sm" id="repYes">Gửi báo lỗi</button>
        </div>
      </div>`;
    document.body.append(ov);
    const $ = (s) => ov.querySelector(s);
    const close = () => { document.removeEventListener("keydown", onKey); ov.remove(); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    $("#repNo").onclick = close;
    setTimeout(() => $("#repMsg").focus(), 0);
    if (sentLog[dedupeKey] === FA.dayKey(Date.now())) {
      $("#repErr").classList.remove("hidden");
      $("#repErr").innerHTML = "Bạn đã báo lỗi câu này hôm nay rồi — cảm ơn bạn! Gửi thêm nếu có thông tin mới.";
    }
    $("#repYes").onclick = async () => {
      const btn = $("#repYes");
      const cat = (ov.querySelector('input[name="repCat"]:checked') || {}).value || "other";
      const u = FA.cloud && FA.cloud.user && FA.cloud.user();
      const doc = {
        uid: u ? u.uid : "", email: cut(u && u.email, 120), name: cut(u && u.displayName, 80),
        skill: cut(ctx.skill, 20), testId: cut(ctx.testId, 20), testTitle: cut(ctx.testTitle, 120), ref,
        cat, msg: cut($("#repMsg").value.trim(), 500), page: cut(location.pathname.split("/").pop() + location.hash, 200),
        status: "open", createdAt: Date.now(),
      };
      btn.disabled = true; btn.textContent = "Đang gửi…";
      const done = () => {
        sentLog[dedupeKey] = FA.dayKey(Date.now());
        Object.keys(sentLog).forEach((k) => { if (sentLog[k] !== FA.dayKey(Date.now())) delete sentLog[k]; }); // chỉ giữ của hôm nay
        FA.store.set("report-sent", sentLog);
        close();
        FA.toast("Đã gửi báo lỗi — cảm ơn bạn! Bọn mình sẽ sửa sớm.");
      };
      try {
        const db = FA.cloud && FA.cloud.enabled() && FA.cloud.db && FA.cloud.db();
        if (!db || !u) {
          // chạy local không có Firebase / chưa đăng nhập → lưu tạm trên máy để không mất
          const local = FA.store.get("reports-local", []);
          local.unshift(doc);
          FA.store.set("reports-local", local.slice(0, 50));
          if (FA.cloud && FA.cloud.enabled() && !u) throw new Error("login");
          return done();
        }
        await db.collection("reports").add(doc);
        done();
      } catch (e) {
        btn.disabled = false; btn.textContent = "Gửi lại";
        const C = FA.CONTACT || {};
        $("#repErr").classList.remove("hidden");
        $("#repErr").innerHTML = (e && e.message === "login" ? "Bạn cần đăng nhập để gửi báo lỗi." : "Chưa gửi được báo lỗi (lỗi kết nối hoặc quyền truy cập).") +
          (C.messenger ? ` Bạn có thể <a href="${C.messenger}" target="_blank" rel="noopener">nhắn qua Messenger</a> kèm vị trí câu: <b>${FA.esc([ctx.testTitle, ref].filter(Boolean).join(" · "))}</b>.` : "");
      }
    };
  };
  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("click", (e) => {
      const b = e.target.closest && e.target.closest("[data-report]");
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      let ctx = {};
      try { ctx = JSON.parse(b.getAttribute("data-report") || "{}"); } catch (err) {}
      if (typeof FA.reportCtx === "function") ctx = FA.reportCtx(ctx, b) || ctx; // trang (exam.js) bổ sung vị trí câu đang làm
      FA.report(ctx);
    });
  }

  /* ---------- Hiệu ứng chuyển tab / chuyển màn cho mượt ----------
     - Đổi trang (menu header): CSS @view-transition (Chrome/Edge), xem style.css.
     - Đổi màn trong SPA (hash: exam, flashcards): cho #app mờ dần vào.
     - Bấm nút .tab (lọc, Anh→Việt…): phần nội dung ngay sau dãy tab mờ dần vào.
     Chỉ chạy lại animation CSS (class .fx-in) nên không đụng logic trang; tắt khi prefers-reduced-motion. */
  FA.fxIn = function (el) {
    if (!el || !el.classList) return;
    el.classList.remove("fx-in");
    void el.offsetWidth; // ép trình duyệt chạy lại animation
    el.classList.add("fx-in");
  };
  window.addEventListener("hashchange", () => FA.fxIn(document.getElementById("app")));
  document.addEventListener("click", (e) => {
    const tab = e.target.closest && e.target.closest(".tab");
    if (!tab || tab.tagName === "A") return; // <a href="#..."> đã có hiệu ứng hashchange
    const bar = tab.closest(".tabs");
    // handler của trang đã chạy xong (bubble) → nếu cả màn vẽ lại thì lấy dãy tab mới
    setTimeout(() => {
      const root = document.getElementById("app") || document.querySelector("main");
      const tabs = bar && bar.isConnected ? bar : root && root.querySelector(".tabs");
      if (!tabs) return;
      let n = tabs.nextElementSibling, any = false;
      for (; n; n = n.nextElementSibling) { FA.fxIn(n); any = true; }
      if (!any && tabs.parentElement) FA.fxIn(tabs.parentElement.nextElementSibling);
    }, 0);
  });
})();
