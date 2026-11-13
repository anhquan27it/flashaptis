/* FlashAptis — ứng dụng thi thử (định tuyến bằng hash)
   #/                     chọn kỹ năng
   #/{skill}              danh sách đề
   #/{skill}/{testId}     giới thiệu + làm bài + kết quả
   #/gym, #/gym/wrong     phòng gym & sổ câu sai */
(function () {
  const FA = window.FA;
  const esc = FA.esc;
  const app = document.getElementById("app");

  const SKILLS = {
    speaking: { name: "Speaking", icon: "🎙️", data: window.FA_SPEAKING, time: 12, meta: "4 part · ghi âm trên trình duyệt",
      desc: "Đồng hồ đếm ngược như phòng thi, máy đọc câu hỏi, bạn thu âm câu trả lời rồi nghe lại và so với bài mẫu." },
    listening: { name: "Listening", icon: "🎧", data: window.FA_LISTENING, time: 40, meta: "17 câu hỏi · 40 phút",
      desc: "Đủ 4 part: 13 câu ngắn, 4 người nói, hội thoại, 2 bài độc thoại. Mỗi đoạn nghe tối đa 2 lần, có transcript tô câu chốt." },
    grammar: { name: "Grammar & Vocabulary", short: "Grammar", icon: "🧩", data: window.FA_GRAMMAR, time: 25, meta: "50 câu trắc nghiệm · 25 phút",
      desc: "25 câu ngữ pháp + 25 câu từ vựng, chấm ngay. Sai câu nào hiện luôn giải thích vì sao." },
    reading: { name: "Reading", icon: "📖", data: window.FA_READING, time: 35, meta: "5 part · 29 ý · 35 phút",
      desc: "Điền từ, sắp xếp câu, ghép ý kiến, chọn tiêu đề đoạn văn. Chấm ngay kèm giải thích." },
    writing: { name: "Writing", icon: "✍️", data: window.FA_WRITING, time: 50, meta: "4 part · 50 phút",
      desc: "Đủ 4 part như thi thật, đếm từ tự động. Nộp xong xem bài mẫu đặt cạnh bài mình và điểm ước lượng." },
  };
  const short = (k) => SKILLS[k].short || SKILLS[k].name;

  /* xáo trộn thứ tự đáp án mỗi lần tải trang để vị trí đáp án đúng không cố định */
  function shuffleOpts(item) {
    const idx = FA.shuffle(item.o.map((_, i) => i));
    item.a = idx.indexOf(item.a);
    item.o = idx.map((i) => item.o[i]);
  }
  window.FA_GRAMMAR.forEach((t) => t.questions.forEach(shuffleOpts));
  window.FA_READING.forEach((t) => t.parts.forEach((p) => p.type === "gap" && p.gaps.forEach(shuffleOpts)));
  window.FA_LISTENING.forEach((t) => t.parts.forEach((p) => {
    if (p.type === "mcq") p.items.forEach(shuffleOpts);
    if (p.type === "mono") p.talks.forEach((tk) => tk.questions.forEach(shuffleOpts));
  }));

  /* ---------- quản lý vòng đời ---------- */
  let cleanup = [];
  let running = false;
  let lastHash = location.hash;
  let ignoreHash = false;
  function clearRun() {
    cleanup.forEach((f) => { try { f(); } catch (e) {} });
    cleanup = [];
    FA.stopSpeak();
    running = false;
  }
  window.addEventListener("beforeunload", (e) => {
    if (running) { e.preventDefault(); e.returnValue = ""; }
  });
  window.addEventListener("hashchange", () => {
    if (ignoreHash) { ignoreHash = false; return; }
    if (running && !confirm("Bạn đang làm bài. Thoát ra sẽ mất bài làm hiện tại. Vẫn thoát?")) {
      ignoreHash = true;
      location.hash = lastHash;
      return;
    }
    route();
  });

  function route() {
    clearRun();
    lastHash = location.hash;
    window.scrollTo(0, 0);
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (!parts.length) return viewHub();
    if (parts[0] === "gym") return parts[1] === "wrong" ? viewGym(true) : viewGym(false);
    const skill = parts[0];
    if (!SKILLS[skill]) return viewHub();
    if (!parts[1]) return viewList(skill);
    const test = SKILLS[skill].data.find((t) => t.id === parts[1]);
    if (!test) return viewList(skill);
    viewIntro(skill, test);
  }

  function startTimer(sec, el, onEnd) {
    const end = Date.now() + sec * 1000;
    let id;
    const stop = () => clearInterval(id);
    const tick = () => {
      const left = (end - Date.now()) / 1000;
      el.textContent = FA.fmtTime(left);
      el.classList.toggle("warn", left < 60);
      if (left <= 0) { stop(); onEnd(); }
    };
    id = setInterval(tick, 500);
    tick();
    cleanup.push(stop);
    return stop;
  }

  /* thanh trên cùng của phòng thi */
  function examShell(title, timeMin) {
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="row mb-2">
          <div><div class="crumbs mb-0">${esc(title)}</div></div>
          <div class="spacer"></div>
          <div class="exam-bar">
            ${timeMin ? `<div class="timer" id="timer">--:--</div>` : ""}
            <button class="btn btn-primary btn-sm" id="submitBtn">Nộp bài</button>
            <button class="btn btn-ghost btn-sm" id="exitBtn">Thoát</button>
          </div>
        </div>
        <div id="stage"></div>
      </div></div>`;
    running = true;
    app.querySelector("#exitBtn").onclick = () => {
      const seg = location.hash.replace(/^#\/?/, "").split("/")[0];
      location.hash = "#/" + (seg || "");
    };
    return { stage: app.querySelector("#stage"), timer: app.querySelector("#timer"), submit: app.querySelector("#submitBtn") };
  }

  /* ======================================================
     HUB
     ====================================================== */
  function viewHub() {
    const wrongN = FA.store.get("wrongbook", []).length;
    app.innerHTML = `
      <div class="page"><div class="container">
        <span class="eyebrow">Thi thử Aptis</span>
        <h1 class="page-title">Chọn kỹ năng, làm luôn</h1>
        <p class="page-sub">Không cần đăng ký. Mọi lượt làm bài được lưu ngay trên máy của bạn.</p>
        <div class="grid grid-3">
          ${Object.entries(SKILLS).map(([k, s]) => `
            <a class="card skill-card" href="#/${k}">
              <div class="icon">${s.icon}</div>
              <span class="pill ${k === "speaking" ? "hot" : "green"}">${s.data.length} đề</span>
              <h3>${s.name}</h3>
              <p>${s.desc}</p>
              <span class="go">Vào thi →</span>
            </a>`).join("")}
          <a class="card skill-card" href="#/gym">
            <div class="icon">🏋️</div>
            <span class="pill">Không bấm giờ</span>
            <h3>Phòng gym</h3>
            <p>Luyện nhanh 10 câu, chọn xong biết ngay đúng sai và vì sao. Câu sai tự vào Sổ câu sai${wrongN ? ` (đang có <b>${wrongN}</b> câu)` : ""}.</p>
            <span class="go">Vào tập →</span>
          </a>
        </div>
      </div></div>`;
  }

  /* ======================================================
     DANH SÁCH ĐỀ
     ====================================================== */
  function viewList(skill) {
    const S = SKILLS[skill];
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/">← Kỹ năng</a> / ${esc(S.name)}</div>
        <h1 class="page-title">Chọn đề ${esc(short(skill))}</h1>
        <p class="page-sub">${S.desc}</p>
        <div class="grid grid-2">
          ${S.data.map((t) => {
            const at = FA.getAttempts(skill, t.id)[0];
            return `<a class="card test-card" href="#/${skill}/${t.id}">
              ${t.hot ? `<span class="pill hot">🔥 Đề trọng điểm</span>` : `<span class="pill green">Miễn phí</span>`}
              <h3>${esc(t.title)}</h3>
              <div class="meta">${S.meta}</div>
              <div class="last">${at ? `Lần gần nhất: ${at.score}/50 · ${FA.fmtDate(at.at)}` : `<span class="muted" style="font-weight:500">Chưa làm lần nào</span>`}</div>
            </a>`;
          }).join("")}
        </div>
      </div></div>`;
  }

  /* ======================================================
     GIỚI THIỆU ĐỀ
     ====================================================== */
  const INTRO = {
    grammar: ["50 câu trắc nghiệm, mỗi lần một câu — giống format thi trên máy.", "Đồng hồ 25 phút. Hết giờ bài tự nộp.", "Bấm phím 1–4 hoặc A–D để chọn nhanh, ← → để chuyển câu.", "Nộp bài xong có điểm thang 0–50 và giải thích từng câu."],
    reading: ["5 part: điền từ, 2 bài sắp xếp câu, ghép ý kiến, chọn tiêu đề.", "Đồng hồ 35 phút. Chuyển part bằng thanh số ở dưới.", "Part 2–3: dùng nút ▲ ▼ để đổi vị trí câu.", "Nộp bài xong có điểm thang 0–50 và đáp án từng ý."],
    listening: ["17 câu hỏi chia 4 part như đề thật.", "Mỗi đoạn nghe được phát tối đa 2 lần (giọng đọc máy của trình duyệt).", "Đồng hồ 40 phút. Nên dùng tai nghe và Chrome/Edge để giọng đọc rõ nhất.", "Nộp xong xem transcript với câu chốt đáp án được tô sáng."],
    writing: ["4 part: trả lời ngắn, điền form, chat 3 câu, viết 2 email.", "Đồng hồ 50 phút, đếm từ tự động cho từng câu.", "Nộp xong có điểm ước lượng tự động + bài mẫu đặt cạnh bài của bạn.", "Writing thật do giám khảo chấm; điểm ở đây là ước lượng tự động dựa trên độ dài, cấu trúc, từ nối — chỉ để tham khảo.", "Bài bị trừ điểm khi sai chính tả, sai ngữ pháp (kiểm tra bằng Harper — cần mạng, tải ~8 MB lần đầu, chạy trên máy bạn) hoặc trả lời lạc đề/thiếu ý so với câu hỏi (kiểm tra từ khóa offline, hoặc do AI chấm nếu đã cấu hình — khi đó bài viết được gửi tới máy chủ AI)."],
    speaking: ["4 part, khoảng 12 phút. Máy đọc câu hỏi, sau đó đồng hồ đếm ngược thời gian nói.", "Trình duyệt sẽ xin quyền micro để thu âm. Bản ghi chỉ nằm trên máy bạn, không gửi đi đâu.", "Part 1: 30 giây/câu · Part 2–3: 45 giây/câu · Part 4: 1 phút chuẩn bị + 2 phút nói.", "Xong bài, nghe lại từng câu, so với bài mẫu rồi tự chấm từng part theo thang Aptis: mỗi part 0–5 điểm, tối đa 20 (web quy ra thang 50)."],
  };
  function viewIntro(skill, test) {
    const S = SKILLS[skill];
    const ttsWarn = (skill === "listening" || skill === "speaking") && !FA.ttsSupported();
    const hist = FA.getAttempts(skill, test.id);
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/${skill}">← Chọn đề</a> / ${esc(test.title)}</div>
        <h1 class="page-title">${esc(test.title)} — ${esc(S.name)}</h1>
        <div class="card intro-box mt-2"><ul>${INTRO[skill].map((x) => `<li>${x}</li>`).join("")}</ul></div>
        ${ttsWarn ? `<div class="explain">⚠️ Trình duyệt của bạn không hỗ trợ giọng đọc. Hãy dùng Chrome, Edge hoặc Safari bản mới.</div>` : ""}
        <div class="row mt-3"><button class="btn btn-primary btn-lg" id="startBtn">Bắt đầu tính giờ</button></div>
        ${hist.length ? `<div class="mt-4"><h3>Lịch sử làm bài</h3><div class="tbl-wrap"><table class="tbl"><tr><th>Thời gian</th><th>Điểm</th><th>Bài làm</th></tr>${hist.map((h, i) => `<tr><td>${FA.fmtDate(h.at)}</td><td><b>${h.score}</b>/50 ${h.cefr ? `· ${h.cefr}` : ""}</td><td>${h.ans ? `<button class="btn btn-outline btn-sm" data-replay="${i}">👁 Xem lại</button>` : `<span class="muted" style="font-size:.85rem" title="Lượt làm này được lưu trước khi có tính năng xem lại">—</span>`}</td></tr>`).join("")}</table></div></div>` : ""}
      </div></div>`;
    app.querySelector("#startBtn").onclick = () => RUNNERS[skill](test);
    app.querySelectorAll("[data-replay]").forEach((b) => (b.onclick = () => RUNNERS[skill](test, hist[+b.dataset.replay])));
  }

  /* Đáp án trắc nghiệm được xáo thứ tự mỗi lần tải trang → lưu NỘI DUNG đáp án chứ không lưu chỉ số, để xem lại sau vẫn đúng */
  const optText = (list, a) => (a == null ? null : list[a] == null ? null : list[a]);
  const optIdx = (list, t) => { const i = t == null ? -1 : list.indexOf(t); return i < 0 ? null : i; };

  /* ======================================================
     KẾT QUẢ (dùng chung)
     ====================================================== */
  function renderResult(o) {
    // o: {skill, test, score, cefr, note, breakdown:[{label,got,total}], review(el)}
    running = false;
    FA.stopSpeak();
    // o.replay: đang xem lại một lượt đã làm → không lưu thêm lượt mới, o.attemptAt là lượt đó
    if (!o.replay) o.attemptAt = FA.saveAttempt(o.skill, o.test.id, o.score, { cefr: o.cefr, ans: o.ans });
    const titleOf = (s) => (s >= 40 ? "Xuất sắc! 🎉" : s >= 26 ? "Làm tốt lắm! 💪" : "Cố lên, luyện thêm nhé! 🔥");
    const cefrHTML = (c) => (c ? `<span class="cefr-badge">${c}</span><span class="muted">bậc CEFR ước lượng</span>` : `<span class="muted">Grammar & Vocabulary không quy đổi CEFR riêng</span>`);
    const breakHTML = (bd) => (bd || []).map((b) => `
                <div class="bar-row"><span>${esc(b.label)}</span><div class="progress"><i style="width:${b.total ? Math.round((b.got / b.total) * 100) : 0}%"></i></div><b>${b.got}/${b.total}</b></div>`).join("");
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/${o.skill}">← Chọn đề</a> / ${esc(o.test.title)} / Kết quả</div>
        <div class="card">
          <div class="result-hero">
            <div class="ring-lg" id="rRing" style="--p:${Math.round((o.score / 50) * 100)}"><div><b id="rScore">${o.score}</b><span>/50</span></div></div>
            <div>
              <span class="eyebrow">${o.replay ? `Xem lại bài làm lúc ${FA.fmtDate(o.attemptAt)}` : "Kết quả của bạn"} · ${esc(SKILLS[o.skill].name)}</span>
              <h2 class="mb-0" id="rTitle">${titleOf(o.score)}</h2>
              <div class="row mt-1" id="rCefr">${cefrHTML(o.cefr)}</div>
              <p class="muted mt-1 mb-0" id="rNote" style="font-size:.88rem">${o.note || ""}</p>
              <div class="breakdown" id="rBreak">${breakHTML(o.breakdown)}</div>
            </div>
          </div>
          <div class="row mt-3">
            ${o.replay ? `<button class="btn btn-outline" id="backHist">← Về lịch sử</button>` : ""}
            <button class="btn btn-primary" id="retryBtn">Làm lại đề này</button>
            <a class="btn btn-outline" href="#/${o.skill}">Chọn đề khác</a>
            ${["grammar", "reading", "listening"].includes(o.skill) ? `<a class="btn btn-ghost" href="#/gym/wrong">Ôn Sổ câu sai</a>` : ""}
          </div>
        </div>
        <h2 class="mt-4">Xem lại bài làm</h2>
        <div id="review"></div>
      </div></div>`;
    window.scrollTo(0, 0);
    app.querySelector("#retryBtn").onclick = () => RUNNERS[o.skill](o.test);
    const back = app.querySelector("#backHist");
    if (back) back.onclick = () => viewIntro(o.skill, o.test);
    // cập nhật điểm sau khi đã hiển thị (vd: Writing bị trừ điểm chính tả, hoặc người dùng bỏ qua một tên riêng)
    const update = (n) => {
      Object.assign(o, n);
      if (o.attemptAt) FA.updateAttempt(o.skill, o.test.id, o.attemptAt, Object.assign({ score: o.score, cefr: o.cefr }, n.ans ? { ans: n.ans } : {}));
      const q = (s) => app.querySelector(s);
      if (!q("#rRing")) return; // đã chuyển sang trang khác
      q("#rRing").style.setProperty("--p", Math.round((o.score / 50) * 100));
      q("#rScore").textContent = o.score;
      q("#rTitle").textContent = titleOf(o.score);
      q("#rCefr").innerHTML = cefrHTML(o.cefr);
      q("#rNote").innerHTML = o.note || "";
      q("#rBreak").innerHTML = breakHTML(o.breakdown);
    };
    o.review(app.querySelector("#review"), update);
  }

  /* ======================================================
     GRAMMAR & VOCABULARY
     ====================================================== */
  function runGrammar(test, replay) {
    clearRun();
    const Q = test.questions;
    const st = { i: 0, ans: Array(Q.length).fill(null) };
    if (replay) { st.ans = Q.map((q, k) => optIdx(q.o, (replay.ans || [])[k])); return finish(); }
    const sh = examShell(`${test.title} — Grammar & Vocabulary`, 25);
    startTimer(25 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    sh.submit.onclick = () => {
      const left = st.ans.filter((x) => x == null).length;
      if (left && !confirm(`Bạn còn ${left} câu chưa trả lời. Vẫn nộp bài?`)) return;
      finish();
    };
    const onKey = (e) => {
      if (e.target.matches("input,textarea,select")) return;
      const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
      const k = e.key.toLowerCase();
      if (k in map && map[k] < Q[st.i].o.length) { st.ans[st.i] = map[k]; render(); }
      else if (e.key === "ArrowRight" && st.i < Q.length - 1) { st.i++; render(); }
      else if (e.key === "ArrowLeft" && st.i > 0) { st.i--; render(); }
    };
    document.addEventListener("keydown", onKey);
    cleanup.push(() => document.removeEventListener("keydown", onKey));

    function render() {
      const q = Q[st.i];
      const done = st.ans.filter((x) => x != null).length;
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / Q.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Câu ${st.i + 1}/${Q.length}</span><span>Đã trả lời ${done}</span></div>
        <div class="q-card">
          <div class="q-part">${q.sec === "grammar" ? "Grammar" : "Vocabulary"}</div>
          ${q.instr ? `<div class="q-instr">${esc(q.instr)}</div>` : ""}
          <div class="q-text" ${q.sec === "vocab" && q.q.split(" ").length < 4 ? 'style="font-size:1.5rem"' : ""}>${esc(q.q).replace(/_{3,}/g, '<span style="letter-spacing:2px">______</span>')}</div>
          ${q.o.map((o, k) => `<button class="opt ${st.ans[st.i] === k ? "selected" : ""}" data-k="${k}"><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
        </div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Trước</button>
          ${st.i < Q.length - 1 ? `<button class="btn btn-primary" id="next">Tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${Q.map((_, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""} ${st.ans[k] != null ? "done" : ""}">${k + 1}</button>`).join("")}</div>`;
      sh.stage.querySelectorAll(".opt").forEach((b) => (b.onclick = () => { st.ans[st.i] = +b.dataset.k; render(); }));
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => { st.i = +b.dataset.j; render(); }));
      const p = sh.stage.querySelector("#prev"), n = sh.stage.querySelector("#next"), f = sh.stage.querySelector("#fin");
      if (p) p.onclick = () => { st.i--; render(); };
      if (n) n.onclick = () => { st.i++; render(); };
      if (f) f.onclick = () => sh.submit.click();
    }
    render();

    function finish() {
      clearRun();
      let g = 0, v = 0;
      Q.forEach((q, k) => {
        const ok = st.ans[k] === q.a;
        if (ok) q.sec === "grammar" ? g++ : v++;
        else if (!replay) FA.addWrong({ id: `${test.id}-q${k}`, src: "Grammar · " + test.title, q: q.q, o: q.o, a: q.a, e: q.e, instr: q.instr });
      });
      const nG = Q.filter((q) => q.sec === "grammar").length;
      const score = Math.round(((g + v) / Q.length) * 50);
      renderResult({
        skill: "grammar", test, score, cefr: "", replay: !!replay, attemptAt: replay && replay.at,
        note: `Bạn đúng <b>${g + v}/${Q.length}</b> câu (mỗi câu 1 điểm). Điểm Grammar & Vocabulary <b>không cộng vào tổng Overall</b> (chỉ tính 4 kỹ năng), nhưng được xét khi điểm một kỹ năng nằm sát ngưỡng giữa hai bậc CEFR.`,
        ans: st.ans.map((a, k) => optText(Q[k].o, a)),
        breakdown: [{ label: "Ngữ pháp", got: g, total: nG }, { label: "Từ vựng", got: v, total: Q.length - nG }],
        review(el) {
          let filter = "wrong";
          const draw = () => {
            el.innerHTML = `<div class="tabs"><button class="tab ${filter === "wrong" ? "active" : ""}" data-f="wrong">Câu sai / bỏ trống</button><button class="tab ${filter === "all" ? "active" : ""}" data-f="all">Tất cả</button></div>` +
              Q.map((q, k) => {
                const ok = st.ans[k] === q.a;
                if (filter === "wrong" && ok) return "";
                return `<div class="q-card mb-2">
                  <div class="q-part">Câu ${k + 1} · ${q.sec === "grammar" ? "Grammar" : "Vocabulary"} ${ok ? "✅" : "❌"}</div>
                  ${q.instr ? `<div class="q-instr">${esc(q.instr)}</div>` : ""}
                  <div class="q-text">${esc(q.q)}</div>
                  ${q.o.map((o, j) => `<button class="opt ${j === q.a ? "correct" : st.ans[k] === j ? "wrong" : ""}" disabled><span class="key">${"ABCD"[j]}</span>${esc(o)}</button>`).join("")}
                  ${st.ans[k] == null ? `<div class="muted" style="font-size:.9rem">Bạn chưa trả lời câu này.</div>` : ""}
                  <div class="explain"><b>Giải thích:</b> ${esc(q.e)}</div>
                </div>`;
              }).join("") || `<div class="empty"><div class="big">🎯</div>Bạn không sai câu nào. Quá đỉnh!</div>`;
            el.querySelectorAll(".tab").forEach((t) => (t.onclick = () => { filter = t.dataset.f; draw(); }));
          };
          draw();
        },
      });
    }
  }

  /* ======================================================
     READING
     ====================================================== */
  function shuffledOrder(n) {
    let a;
    do a = FA.shuffle([...Array(n).keys()]); while (n > 1 && a.every((v, i) => v === i));
    return a;
  }
  function fillGaps(text, gaps, renderGap) {
    return esc(text).replace(/\{(\d+)\}/g, (_, k) => renderGap(+k, gaps[+k])).replace(/\n/g, "<br>");
  }

  function readingPartHTML(p, ans, review) {
    const L = "ABCDEFGH";
    if (p.type === "gap") {
      return `<div class="passage">${fillGaps(p.text, p.gaps, (k, g) => {
        if (review) {
          const ok = ans[k] === g.a;
          return `<b style="color:${ok ? "var(--green)" : "var(--red)"}">[${k + 1}] ${esc(ans[k] != null ? g.o[ans[k]] : "—")}</b>${ok ? "" : ` <span class="fix">→ ${esc(g.o[g.a])}</span>`}`;
        }
        return `<select class="sel inline" data-gap="${k}"><option value="">(${k + 1}) chọn…</option>${g.o.map((o, j) => `<option value="${j}" ${ans[k] === j ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      })}</div>${review ? p.gaps.map((g, k) => `<div class="explain"><b>(${k + 1})</b> ${esc(g.e)}</div>`).join("") : ""}`;
    }
    if (p.type === "order") {
      return `<div class="muted mb-2"><b>Chủ đề:</b> ${esc(p.topic)}</div>
        <ol class="order-list">
          <li class="order-item fixed"><span class="num">1</span><span class="txt">${esc(p.first)}</span></li>
          ${ans.map((si, pos) => {
            const cls = review ? (si === pos ? "ok" : "bad") : "";
            return `<li class="order-item ${cls}"><span class="num">${pos + 2}</span><span class="txt">${esc(p.sentences[si])}${review && si !== pos ? `<div class="fix">Vị trí đúng: ${si + 2}</div>` : ""}</span>
              ${review ? "" : `<span class="mv"><button data-up="${pos}" ${pos === 0 ? "disabled" : ""} aria-label="Lên">▲</button><button data-down="${pos}" ${pos === ans.length - 1 ? "disabled" : ""} aria-label="Xuống">▼</button></span>`}</li>`;
          }).join("")}
        </ol>
        ${review ? `<div class="explain"><b>Thứ tự đúng:</b><br>${[p.first, ...p.sentences].map((s, i) => `${i + 1}. ${esc(s)}`).join("<br>")}<br><br>${esc(p.tip || "")}</div>` : ""}`;
    }
    if (p.type === "opinion") {
      return `<div class="people">${p.people.map((pp, i) => `<div class="person"><b>${L[i]}. ${esc(pp.name)}</b><br>${esc(pp.text)}</div>`).join("")}</div>
        ${p.questions.map((q, k) => {
          const ok = ans[k] === q.a;
          return `<div class="match-row ${review ? (ok ? "ok" : "bad") : ""}"><span>${k + 1}. ${esc(q.q)}</span>
            <div><select class="sel" data-op="${k}" ${review ? "disabled" : ""}><option value="">Chọn người…</option>${p.people.map((pp, i) => `<option value="${i}" ${ans[k] === i ? "selected" : ""}>${L[i]}. ${esc(pp.name)}</option>`).join("")}</select>
            ${review && !ok ? `<div class="fix">Đáp án: ${L[q.a]}. ${esc(p.people[q.a].name)}</div>` : ""}</div></div>`;
        }).join("")}`;
    }
    if (p.type === "heading") {
      return `<div class="muted mb-2"><b>Chủ đề:</b> ${esc(p.topic)}</div>
        <div class="passage" style="line-height:1.7"><b>Các tiêu đề:</b><br>${p.headings.map((h, i) => `${L[i]}. ${esc(h)}`).join("<br>")}</div>
        ${p.paragraphs.map((pa, k) => {
          const ok = ans[k] === pa.a;
          return `<div class="card mb-2 ${review ? "" : ""}" style="padding:16px;${review ? `border-color:${ok ? "#bbf7d0" : "#fecaca"}` : ""}">
            <div class="row mb-2"><b>Đoạn ${k + 1}</b><div class="spacer"></div>
              <select class="sel" style="max-width:340px" data-hd="${k}" ${review ? "disabled" : ""}><option value="">Chọn tiêu đề…</option>${p.headings.map((h, i) => `<option value="${i}" ${ans[k] === i ? "selected" : ""}>${L[i]}. ${esc(h)}</option>`).join("")}</select></div>
            <div style="color:var(--ink-2)">${esc(pa.text)}</div>
            ${review && !ok ? `<div class="fix mt-1">Đáp án: ${L[pa.a]}. ${esc(p.headings[pa.a])}</div>` : ""}
          </div>`;
        }).join("")}`;
    }
    return "";
  }
  function readingItems(p) {
    return p.type === "gap" ? p.gaps.length : p.type === "order" ? p.sentences.length : p.type === "opinion" ? p.questions.length : p.paragraphs.length;
  }
  function readingCorrect(p, ans) {
    if (p.type === "gap") return p.gaps.filter((g, k) => ans[k] === g.a).length;
    if (p.type === "order") return ans.filter((si, pos) => si === pos).length;
    if (p.type === "opinion") return p.questions.filter((q, k) => ans[k] === q.a).length;
    return p.paragraphs.filter((pa, k) => ans[k] === pa.a).length;
  }

  function runReading(test, replay) {
    clearRun();
    const P = test.parts;
    const st = { i: 0, ans: P.map((p) => (p.type === "order" ? shuffledOrder(p.sentences.length) : Array(readingItems(p)).fill(null))) };
    if (replay) {
      const sv = replay.ans || [];
      st.ans = P.map((p, i) => (p.type === "gap" ? p.gaps.map((g, k) => optIdx(g.o, sv[i] && sv[i][k])) : Array.isArray(sv[i]) && sv[i].length === st.ans[i].length ? sv[i] : st.ans[i]));
      return finish();
    }
    const sh = examShell(`${test.title} — Reading`, 35);
    startTimer(35 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    sh.submit.onclick = () => { if (confirm("Nộp bài Reading?")) finish(); };

    function render() {
      const p = P[st.i];
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / P.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Part ${st.i + 1}/${P.length}</span><span>${esc(p.title)}</span></div>
        <div class="q-card">
          <div class="q-part">${esc(p.title)}</div>
          <div class="q-instr">${esc(p.instr)}</div>
          ${readingPartHTML(p, st.ans[st.i], false)}
        </div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Part trước</button>
          ${st.i < P.length - 1 ? `<button class="btn btn-primary" id="next">Part tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${P.map((_, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""}" style="width:auto;padding:0 12px">Part ${k + 1}</button>`).join("")}</div>`;
      const a = st.ans[st.i];
      sh.stage.querySelectorAll("select[data-gap]").forEach((s) => (s.onchange = () => (a[+s.dataset.gap] = s.value === "" ? null : +s.value)));
      sh.stage.querySelectorAll("select[data-op]").forEach((s) => (s.onchange = () => (a[+s.dataset.op] = s.value === "" ? null : +s.value)));
      sh.stage.querySelectorAll("select[data-hd]").forEach((s) => (s.onchange = () => (a[+s.dataset.hd] = s.value === "" ? null : +s.value)));
      sh.stage.querySelectorAll("[data-up]").forEach((b) => (b.onclick = () => { const k = +b.dataset.up; [a[k - 1], a[k]] = [a[k], a[k - 1]]; render(); }));
      sh.stage.querySelectorAll("[data-down]").forEach((b) => (b.onclick = () => { const k = +b.dataset.down; [a[k + 1], a[k]] = [a[k], a[k + 1]]; render(); }));
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => { st.i = +b.dataset.j; render(); window.scrollTo(0, 0); }));
      const pv = sh.stage.querySelector("#prev"), nx = sh.stage.querySelector("#next"), fn = sh.stage.querySelector("#fin");
      if (pv) pv.onclick = () => { st.i--; render(); window.scrollTo(0, 0); };
      if (nx) nx.onclick = () => { st.i++; render(); window.scrollTo(0, 0); };
      if (fn) fn.onclick = () => sh.submit.click();
    }
    render();

    function finish() {
      clearRun();
      let got = 0, total = 0;
      const breakdown = P.map((p, i) => {
        const c = readingCorrect(p, st.ans[i]), t = readingItems(p);
        got += c; total += t;
        if (p.type === "gap" && !replay) p.gaps.forEach((g, k) => { if (st.ans[i][k] !== g.a) FA.addWrong(gapItem(test, i, p, k)); });
        return { label: p.title.split("·")[0].trim(), got: c, total: t };
      });
      const score = Math.round((got / total) * 50);
      renderResult({
        skill: "reading", test, score, cefr: FA.toCEFR("reading", (got / total) * 50), breakdown, replay: !!replay, attemptAt: replay && replay.at,
        ans: st.ans.map((a, i) => (P[i].type === "gap" ? a.map((x, k) => optText(P[i].gaps[k].o, x)) : a.slice())),
        note: `Bạn đúng <b>${got}/${total}</b> ý → quy ra thang 50 (đúng ÷ tổng × 50). Bậc CEFR ước lượng theo ngưỡng tham khảo (≈ B1 từ 52% số câu đúng, B2 từ 76%, C từ 92%), không phải kết quả chính thức.`,
        review(el) {
          el.innerHTML = P.map((p, i) => `<div class="q-card mb-2"><div class="q-part">${esc(p.title)} · ${readingCorrect(p, st.ans[i])}/${readingItems(p)}</div>${readingPartHTML(p, st.ans[i], true)}</div>`).join("");
        },
      });
    }
  }
  function gapItem(test, pi, p, k) {
    const passage = fillGaps(p.text, p.gaps, (j, g) => (j === k ? `<b style="color:var(--orange-600)">(${k + 1}) ______</b>` : esc(g.o[g.a])));
    return { id: `${test.id}-p${pi}-g${k}`, src: "Reading · " + test.title, passage, q: `Chọn từ cho chỗ trống (${k + 1})`, o: p.gaps[k].o, a: p.gaps[k].a, e: p.gaps[k].e };
  }

  /* ======================================================
     LISTENING
     ====================================================== */
  function transcriptHTML(script, e) {
    // tô sáng dòng có hl; với bài độc thoại tô các cụm được trích trong giải thích
    const quotes = [];
    (e || []).forEach((x) => (x.match(/'([^']{6,})'/g) || []).forEach((m) => quotes.push(m.slice(1, -1).replace(/\.\.\.$/, ""))));
    return script.map((ln) => {
      let t = esc(ln.t);
      if (ln.hl && !quotes.length) t = `<mark>${t}</mark>`;
      quotes.forEach((q) => { const qe = esc(q); if (t.includes(qe)) t = t.replace(qe, `<mark>${qe}</mark>`); });
      const who = ln.who ? `Speaker ${ln.who}` : ln.s === "m" ? "Man" : "Woman";
      return `<div><b>${who}:</b> ${t}</div>`;
    }).join("");
  }
  function audioBox(id, plays, maxPlays) {
    const left = maxPlays - (plays[id] || 0);
    return `<div class="audio-box"><button class="play-btn" data-play="${id}" ${left <= 0 ? "disabled" : ""} aria-label="Phát">▶</button>
      <div class="info"><b>${left > 0 ? "Bấm để nghe" : "Đã hết lượt nghe"}</b><br>Còn ${Math.max(0, left)}/${maxPlays} lượt</div>
      <div class="wave" data-wave="${id}">${"<i></i>".repeat(12)}</div></div>`;
  }

  function runListening(test, replay) {
    clearRun();
    // tạo danh sách màn hình
    const screens = [];
    test.parts.forEach((p, pi) => {
      if (p.type === "mcq") p.items.forEach((it, k) => screens.push({ kind: "mcq", p, pi, it, k, label: `Câu ${k + 1}` }));
      if (p.type === "speakers") screens.push({ kind: "speakers", p, pi, label: "Câu 14" });
      if (p.type === "conv") screens.push({ kind: "conv", p, pi, label: "Câu 15" });
      if (p.type === "mono") p.talks.forEach((tk, k) => screens.push({ kind: "mono", p, pi, tk, k, label: `Câu ${16 + k}` }));
    });
    const st = { i: 0, plays: {}, ans: screens.map((s) => (s.kind === "mcq" ? null : s.kind === "speakers" ? Array(4).fill(null) : s.kind === "conv" ? Array(s.p.statements.length).fill(null) : Array(s.tk.questions.length).fill(null))), playing: false };
    if (replay) {
      const sv = replay.ans || [];
      st.ans = screens.map((s, i) => {
        const v = sv[i];
        if (s.kind === "mcq") return optIdx(s.it.o, v);
        if (s.kind === "mono") return s.tk.questions.map((q, k) => optIdx(q.o, v && v[k]));
        return Array.isArray(v) && v.length === st.ans[i].length ? v : st.ans[i]; // speakers / conv: chỉ số cố định, không bị xáo
      });
      return finish();
    }
    const sh = examShell(`${test.title} — Listening`, 40);
    startTimer(40 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    sh.submit.onclick = () => { if (confirm("Nộp bài Listening?")) finish(); };

    function play(id, script) {
      if (st.playing) return;
      if ((st.plays[id] || 0) >= 2) return;
      st.plays[id] = (st.plays[id] || 0) + 1;
      st.playing = id;
      render();
      FA.speak(script).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc.")).then(() => {
        if (st.playing !== id) return; // đã chuyển câu
        st.playing = false;
        if (running) render();
      });
    }

    function render() {
      const s = screens[st.i];
      const a = st.ans;
      let body = "";
      if (s.kind === "mcq") {
        body = `${audioBox("s" + st.i, st.plays, 2)}<div class="q-text">${esc(s.it.q)}</div>
          ${s.it.o.map((o, k) => `<button class="opt ${a[st.i] === k ? "selected" : ""}" data-k="${k}"><span class="key">${"ABC"[k]}</span>${esc(o)}</button>`).join("")}`;
      } else if (s.kind === "speakers") {
        body = s.p.speakers.map((sp, k) => `<div class="card mb-2" style="padding:14px"><div class="row"><b>Speaker ${"ABCD"[k]}</b><div class="spacer"></div>
            <select class="sel" style="max-width:340px" data-sp="${k}"><option value="">Chọn…</option>${s.p.options.map((o, j) => `<option value="${j}" ${a[st.i][k] === j ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></div>
            <div class="mt-1">${audioBox("s" + st.i + "-" + k, st.plays, 2)}</div></div>`).join("");
      } else if (s.kind === "conv") {
        body = audioBox("s" + st.i, st.plays, 2) + s.p.statements.map((x, k) => `<div class="match-row"><span>${k + 1}. ${esc(x.q)}</span>
            <select class="sel" data-cv="${k}"><option value="">Chọn…</option>${["Man", "Woman", "Both"].map((o) => `<option ${a[st.i][k] === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>`).join("");
      } else {
        body = `<div class="muted mb-2"><b>Chủ đề:</b> ${esc(s.tk.topic)}</div>${audioBox("s" + st.i, st.plays, 2)}` +
          s.tk.questions.map((q, k) => `<div class="mt-2"><div class="q-text" style="font-size:1rem">${k + 1}. ${esc(q.q)}</div>
            ${q.o.map((o, j) => `<button class="opt ${a[st.i][k] === j ? "selected" : ""}" data-mq="${k}" data-k="${j}"><span class="key">${"ABC"[j]}</span>${esc(o)}</button>`).join("")}</div>`).join("");
      }
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / screens.length) * 100}%"></i></div>
        <div class="progress-meta"><span>${s.label}/17</span><span>${esc(s.p.title)}</span></div>
        <div class="q-card"><div class="q-part">${esc(s.p.title)}</div><div class="q-instr">${esc(s.p.instr)}</div>${body}</div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Trước</button>
          ${st.i < screens.length - 1 ? `<button class="btn btn-primary" id="next">Tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${screens.map((x, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""} ${answered(k) ? "done" : ""}">${k + 1}</button>`).join("")}</div>`;
      // sự kiện
      sh.stage.querySelectorAll("[data-play]").forEach((b) => (b.onclick = () => {
        const id = b.dataset.play;
        const m = id.match(/^s(\d+)-(\d+)$/);
        const script = m ? s.p.speakers[+m[2]].script : s.kind === "mcq" ? s.it.script : s.kind === "conv" ? s.p.script : s.tk.script;
        play(id, script);
      }));
      if (st.playing) {
        sh.stage.querySelectorAll(".play-btn").forEach((b) => (b.disabled = true));
        const w = sh.stage.querySelector(`[data-wave="${st.playing}"]`);
        if (w) w.classList.add("on");
      }
      sh.stage.querySelectorAll(".opt[data-k]:not([data-mq])").forEach((b) => (b.onclick = () => { a[st.i] = +b.dataset.k; render(); }));
      sh.stage.querySelectorAll("[data-mq]").forEach((b) => (b.onclick = () => { a[st.i][+b.dataset.mq] = +b.dataset.k; render(); }));
      sh.stage.querySelectorAll("[data-sp]").forEach((x) => (x.onchange = () => { a[st.i][+x.dataset.sp] = x.value === "" ? null : +x.value; }));
      sh.stage.querySelectorAll("[data-cv]").forEach((x) => (x.onchange = () => { a[st.i][+x.dataset.cv] = x.value || null; }));
      const go = (k) => { if (st.playing) { FA.stopSpeak(); st.playing = false; } st.i = k; render(); };
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => go(+b.dataset.j)));
      const pv = sh.stage.querySelector("#prev"), nx = sh.stage.querySelector("#next"), fn = sh.stage.querySelector("#fin");
      if (pv) pv.onclick = () => go(st.i - 1);
      if (nx) nx.onclick = () => go(st.i + 1);
      if (fn) fn.onclick = () => sh.submit.click();
    }
    function answered(k) {
      const v = st.ans[k];
      return Array.isArray(v) ? v.every((x) => x != null) : v != null;
    }
    render();

    function finish() {
      clearRun();
      const parts = {};
      let got = 0, total = 0;
      screens.forEach((s, i) => {
        const a = st.ans[i];
        let c = 0, t = 0;
        if (s.kind === "mcq") {
          t = 1; c = a === s.it.a ? 1 : 0;
          if (!c && !replay) FA.addWrong({ id: `${test.id}-p${s.pi}-i${s.k}`, src: "Listening · " + test.title, q: s.it.q, o: s.it.o, a: s.it.a, e: s.it.e, script: s.it.script });
        } else if (s.kind === "speakers") { t = 4; c = s.p.speakers.filter((sp, k) => a[k] === sp.a).length; }
        else if (s.kind === "conv") { t = s.p.statements.length; c = s.p.statements.filter((x, k) => a[k] === x.a).length; }
        else { t = s.tk.questions.length; c = s.tk.questions.filter((q, k) => a[k] === q.a).length; }
        const key = s.p.title.split("·")[0].trim();
        parts[key] = parts[key] || { label: key, got: 0, total: 0 };
        parts[key].got += c; parts[key].total += t; got += c; total += t;
      });
      const score = Math.round((got / total) * 50);
      renderResult({
        skill: "listening", test, score, cefr: FA.toCEFR("listening", (got / total) * 50), breakdown: Object.values(parts), replay: !!replay, attemptAt: replay && replay.at,
        ans: screens.map((s, i) => (s.kind === "mcq" ? optText(s.it.o, st.ans[i]) : s.kind === "mono" ? st.ans[i].map((x, k) => optText(s.tk.questions[k].o, x)) : st.ans[i].slice())),
        note: `Bạn đúng <b>${got}/${total}</b> câu (mỗi câu 1 điểm) → quy ra thang 50. Bậc CEFR ước lượng theo ngưỡng tham khảo: B1 từ 12 câu đúng, B2 từ 17, C từ 21 (trên 25 câu) — không phải kết quả chính thức.`,
        review(el) {
          el.innerHTML = screens.map((s, i) => {
            const a = st.ans[i];
            let inner = "";
            if (s.kind === "mcq") {
              inner = `<div class="q-text">${esc(s.it.q)} ${a === s.it.a ? "✅" : "❌"}</div>
                ${s.it.o.map((o, j) => `<button class="opt ${j === s.it.a ? "correct" : a === j ? "wrong" : ""}" disabled><span class="key">${"ABC"[j]}</span>${esc(o)}</button>`).join("")}
                <div class="explain"><b>Giải thích:</b> ${esc(s.it.e)}</div><div class="transcript">${transcriptHTML(s.it.script)}</div>`;
            } else if (s.kind === "speakers") {
              inner = s.p.speakers.map((sp, k) => `<div class="match-row ${a[k] === sp.a ? "ok" : "bad"}"><div><b>Speaker ${"ABCD"[k]}</b> ${a[k] === sp.a ? "✅" : "❌"}<div class="transcript">${transcriptHTML(sp.script)}</div></div>
                <div><select class="sel" disabled><option>${a[k] != null ? esc(s.p.options[a[k]]) : "(bỏ trống)"}</option></select>${a[k] !== sp.a ? `<div class="fix">Đáp án: ${esc(s.p.options[sp.a])}</div>` : ""}</div></div>`).join("");
            } else if (s.kind === "conv") {
              inner = s.p.statements.map((x, k) => `<div class="match-row ${a[k] === x.a ? "ok" : "bad"}"><span>${k + 1}. ${esc(x.q)}</span><div><select class="sel" disabled><option>${esc(a[k] || "(bỏ trống)")}</option></select>${a[k] !== x.a ? `<div class="fix">Đáp án: ${x.a}</div>` : ""}</div></div>`).join("") +
                `<div class="transcript">${transcriptHTML(s.p.script)}</div>`;
            } else {
              inner = `<div class="muted">${esc(s.tk.topic)}</div>` + s.tk.questions.map((q, k) => `<div class="mt-2"><div class="q-text" style="font-size:1rem">${k + 1}. ${esc(q.q)} ${a[k] === q.a ? "✅" : "❌"}</div>
                ${q.o.map((o, j) => `<button class="opt ${j === q.a ? "correct" : a[k] === j ? "wrong" : ""}" disabled><span class="key">${"ABC"[j]}</span>${esc(o)}</button>`).join("")}
                <div class="explain"><b>Giải thích:</b> ${esc(q.e)}</div></div>`).join("") +
                `<div class="transcript">${transcriptHTML(s.tk.script, s.tk.questions.map((q) => q.e))}</div>`;
            }
            return `<div class="q-card mb-2"><div class="q-part">${s.label} · ${esc(s.p.title)}</div>${inner}</div>`;
          }).join("");
        },
      });
    }
  }

  /* ======================================================
     WRITING
     ====================================================== */
  const LINKERS = /\b(firstly|secondly|thirdly|finally|however|moreover|furthermore|in addition|also|because|although|therefore|so|but|for example|for instance|as a result|on the other hand|in my opinion|i think|i believe|besides|while|whereas|nevertheless|instead|then)\b/gi;
  function textQuality(text, min, max, opts) {
    opts = opts || {};
    const wc = FA.wordCount(text);
    if (!wc) return 0;
    let s = 0;
    // độ dài (40%)
    const lenScore = wc >= min && wc <= max * 1.15 ? 1 : wc < min ? wc / min : Math.max(0.6, 1 - (wc - max) / max);
    s += 0.4 * lenScore;
    // viết hoa đầu câu & dấu câu (20%)
    const sentences = text.split(/[.!?]+\s*/).filter((x) => x.trim());
    const caps = sentences.filter((x) => /^[A-Z"'(]/.test(x.trim())).length / Math.max(1, sentences.length);
    const punct = /[.!?]\s*$/.test(text.trim()) ? 1 : 0.5;
    s += 0.2 * (caps * 0.6 + punct * 0.4);
    // từ nối (20%)
    const links = (text.match(LINKERS) || []).length;
    const needLinks = opts.long ? 5 : opts.mid ? 2 : 1;
    s += 0.2 * Math.min(1, links / needLinks);
    // đa dạng từ vựng (20%)
    const words = text.toLowerCase().match(/[a-z']+/g) || [];
    const ttr = new Set(words).size / Math.max(1, words.length);
    s += 0.2 * Math.min(1, ttr / 0.6);
    // email: lời chào & kết thư
    if (opts.email) {
      const greet = /^(dear|hi|hello)\b/i.test(text.trim()) ? 1 : 0;
      const close = /(yours (faithfully|sincerely)|best wishes|best regards|regards|love|see you|cheers|best,|take care)/i.test(text) ? 1 : 0;
      s = s * 0.85 + 0.15 * ((greet + close) / 2);
    }
    return Math.max(0, Math.min(1, s));
  }

  function runWriting(test, replay) {
    clearRun();
    const st = { i: 0, p1: Array(5).fill(""), p2: "", p3: Array(3).fill(""), p4a: "", p4b: "" };
    // xem lại: nạp bài đã viết rồi chấm lại như lúc nộp (chính tả/ngữ pháp cần Harper, nội dung chạy offline)
    if (replay && replay.ans) { const a = replay.ans; Object.assign(st, { p1: a.p1 || st.p1, p2: a.p2 || "", p3: a.p3 || st.p3, p4a: a.p4a || "", p4b: a.p4b || "" }); return finish(); }
    const sh = examShell(`${test.title} — Writing`, 50);
    if (FA.spell) FA.spell.warm(); // tải sẵn bộ kiểm tra chính tả (Harper) để lúc xem lại có ngay
    startTimer(50 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    sh.submit.onclick = () => { if (confirm("Nộp bài Writing?")) finish(); };
    const titles = ["Part 1 · Word-level writing", "Part 2 · Short text", "Part 3 · Three written responses", "Part 4 · Formal & informal emails"];

    function ta(key, idx, min, max, rows) {
      const val = idx == null ? st[key] : st[key][idx];
      return `<textarea class="inp" data-key="${key}" ${idx != null ? `data-idx="${idx}"` : ""} style="min-height:${rows || 140}px" spellcheck="false">${esc(val)}</textarea>
        <div class="wc" data-wc="${key}${idx != null ? idx : ""}" data-min="${min}" data-max="${max}"></div>`;
    }
    function render() {
      const T = test;
      let body = "";
      if (st.i === 0) body = `<div class="q-instr">${esc(T.p1.instr)}</div>` + T.p1.questions.map((q, k) => `<div class="mb-2"><div style="font-weight:600;margin-bottom:6px">${k + 1}. ${esc(q.q)}</div><input class="inp" data-key="p1" data-idx="${k}" value="${esc(st.p1[k])}" spellcheck="false"><div class="wc" data-wc="p1${k}" data-min="1" data-max="5"></div></div>`).join("");
      if (st.i === 1) body = `<div class="q-instr">${esc(T.p2.instr)}</div><div class="q-text">${esc(T.p2.q)}</div>${ta("p2", null, T.p2.min, T.p2.max, 120)}`;
      if (st.i === 2) body = `<div class="q-instr">${esc(T.p3.instr)}</div>` + T.p3.questions.map((q, k) => `<div class="mb-2"><div class="chat-bubble"><div class="who">${esc(q.who)}</div>${esc(q.q)}</div>${ta("p3", k, T.p3.min, T.p3.max, 110)}</div>`).join("");
      if (st.i === 3) body = `<div class="passage" style="white-space:pre-line;line-height:1.7">${esc(T.p4.notice)}</div>
        <div class="q-text" style="font-size:1rem">Email 1 (informal)</div><div class="q-instr">${esc(T.p4.informal.instr)}</div>${ta("p4a", null, T.p4.informal.min, T.p4.informal.max, 140)}
        <div class="q-text mt-3" style="font-size:1rem">Email 2 (formal)</div><div class="q-instr">${esc(T.p4.formal.instr)}</div>${ta("p4b", null, T.p4.formal.min, T.p4.formal.max, 260)}`;
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / 4) * 100}%"></i></div>
        <div class="progress-meta"><span>Part ${st.i + 1}/4</span><span>${esc(test.club)}</span></div>
        <div class="q-card"><div class="q-part">${titles[st.i]}</div>${body}</div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Part trước</button>
          ${st.i < 3 ? `<button class="btn btn-primary" id="next">Part tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${titles.map((_, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""}" style="width:auto;padding:0 12px">Part ${k + 1}</button>`).join("")}</div>`;
      const upd = (el) => {
        const key = el.dataset.key, idx = el.dataset.idx;
        if (idx != null) st[key][+idx] = el.value; else st[key] = el.value;
        const wcEl = sh.stage.querySelector(`[data-wc="${key}${idx != null ? idx : ""}"]`);
        if (wcEl) {
          const n = FA.wordCount(el.value), mn = +wcEl.dataset.min, mx = +wcEl.dataset.max;
          wcEl.textContent = `${n} từ · yêu cầu ${mn}–${mx}`;
          wcEl.className = "wc " + (n === 0 ? "" : n < mn ? "" : n <= mx ? "ok" : "over");
        }
      };
      sh.stage.querySelectorAll("[data-key]").forEach((el) => { el.oninput = () => upd(el); upd(el); });
      const go = (k) => { st.i = k; render(); window.scrollTo(0, 0); };
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => go(+b.dataset.j)));
      const pv = sh.stage.querySelector("#prev"), nx = sh.stage.querySelector("#next"), fn = sh.stage.querySelector("#fin");
      if (pv) pv.onclick = () => go(st.i - 1);
      if (nx) nx.onclick = () => go(st.i + 1);
      if (fn) fn.onclick = () => sh.submit.click();
    }
    render();

    async function finish() {
      clearRun();
      const T = test;
      const hash0 = location.hash;

      /* các bài viết cần kiểm tra chính tả, theo khóa: p1-0…p1-4, p2, p3-0…p3-2, p4a, p4b */
      const J = {};
      T.p1.questions.forEach((q, k) => (J["p1-" + k] = { t: st.p1[k], opts: { spellingOnly: true, quiet: true, skip: /\bname\b/i.test(q.q) } }));
      J.p2 = { t: st.p2, opts: {} };
      st.p3.forEach((t, k) => (J["p3-" + k] = { t, opts: {} }));
      J.p4a = { t: st.p4a, opts: {} };
      J.p4b = { t: st.p4b, opts: {} };
      const keys = Object.keys(J);

      // AI chấm nội dung (tùy chọn, chạy song song với Harper). Lỗi/quá giờ → dùng kiểm tra từ khóa offline.
      // Xem lại bài cũ: KHÔNG gọi AI nữa — dùng đúng kết quả AI đã lưu lúc nộp (ans.ai); lượt cũ chưa lưu thì dùng từ khóa.
      const useAI = !replay && !!(FA.ai && FA.ai.enabled());
      const savedAI = replay && replay.ans && replay.ans.ai && typeof replay.ans.ai === "object" ? replay.ans.ai : null;
      let aiErr = "";
      const aiP = useAI ? FA.ai.grade(T, { p1: st.p1, p2: st.p2, p3: st.p3, p4a: st.p4a, p4b: st.p4b }).catch((e) => { aiErr = (e && e.message) || "lỗi"; return null; }) : null;

      // quét chính tả bằng Harper trước khi chấm (bộ kiểm tra đã được tải sẵn từ lúc bắt đầu làm bài)
      app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty"><div class="big">⏳</div><p>Đang chấm bài, kiểm tra chính tả & ngữ pháp…${useAI ? `<br>AI (${esc(FA.ai.model())}) đang chấm nội dung — có thể mất 10–40 giây.` : ""}</p></div></div></div>`;
      let spellOk = false;
      if (FA.spell) {
        try {
          const res = await Promise.all(keys.map((k) => (J[k].opts.skip || !J[k].t.trim() ? [] : FA.spell.check(J[k].t, Object.assign({ timeoutMs: 15000 }, J[k].opts)))));
          keys.forEach((k, i) => (J[k].issues = res[i]));
          spellOk = true;
        } catch (e) { /* không tải được → chấm không trừ điểm chính tả */ }
      }
      const ai = savedAI || (aiP ? await aiP : null);
      if (location.hash !== hash0) return; // người dùng đã rời trang trong lúc chờ

      /* 1) NỘI DUNG — bám sát câu hỏi. Có AI thì AI chấm (mục nào AI không trả về thì dùng từ khóa);
            không thì kiểm tra từ khóa offline (assets/js/relevance.js, không phụ thuộc Harper). */
      const C = {};
      const REL = FA.rel;
      T.p1.questions.forEach((q, k) => {
        const key = "p1-" + k, loc = REL ? REL.p1(q.t, q.q, st.p1[k]) : { score: 1, why: "" }, a = ai && ai[key];
        // AI: ≥0.75 → đủ điểm, ≥0.25 → nửa điểm. Chép lại câu hỏi (chắc chắn) vẫn 0 dù AI nói gì.
        C[key] = a && !loc.echo ? { score: a.score >= 0.75 ? 1 : a.score >= 0.25 ? 0.5 : 0, why: a.comment || a.missing.join("; ") || "chưa trả lời đúng thông tin được hỏi", ai: true } : loc;
      });
      const cf = (k, groups, src, text) => {
        const a = ai && ai[k];
        C[k] = REL ? REL.factor(groups, src, text, a ? { frac: a.score, missing: a.missing } : undefined) : { factor: 1, frac: 1, missing: [], copy: 0, copied: false };
        if (a) { C[k].ai = true; C[k].comment = a.comment; }
        return C[k];
      };
      cf("p2", T.p2.r, T.p2.q, st.p2);
      T.p3.questions.forEach((q, k) => cf("p3-" + k, q.r, q.q, st.p3[k]));
      cf("p4a", T.p4.informal.r, T.p4.notice, st.p4a);
      cf("p4b", T.p4.formal.r, T.p4.notice, st.p4b);

      /* 2) CHÍNH TẢ & NGỮ PHÁP — Harper. Part 1: câu sai chính tả không được điểm (Part 1 không xét ngữ pháp vì chỉ là cụm từ).
            Part 2–4: nhân hệ số theo tỉ lệ lỗi/số từ — chính tả nặng hơn (tối thiểu 30%), ngữ pháp nhẹ hơn (tối thiểu 60%) vì Harper bắt ngữ pháp chưa đầy đủ. */
      const isP1 = (k) => k.indexOf("p1-") === 0;
      const countOf = (k, fn) => (spellOk ? J[k].issues.filter(fn).length : 0);
      const nErr = (k) => countOf(k, FA.spell.isSpelling);
      const gErr = (k) => (isP1(k) ? 0 : countOf(k, FA.spell.isGrammar));
      const words = (k) => Math.max(1, FA.wordCount(J[k].t));
      const acc = (k) => { const n = nErr(k); return n ? Math.max(0.3, 1 - (4 * n) / words(k)) : 1; };
      const gacc = (k) => { const n = gErr(k); return n ? Math.max(0.6, 1 - (2 * n) / words(k)) : 1; };
      const rel = (k) => (isP1(k) ? C[k].score : C[k].factor);
      const calc = () => {
        const q1 = st.p1.map((x, k) => { const n = FA.wordCount(x); return nErr("p1-" + k) ? 0 : (n >= 1 && n <= 5 ? 1 : n > 5 ? 0.6 : 0) * rel("p1-" + k); }).reduce((a, b) => a + b, 0) / 5;
        const mk = (k, text, min, max, o) => textQuality(text, min, max, o) * acc(k) * gacc(k) * rel(k);
        const q2 = mk("p2", st.p2, T.p2.min, T.p2.max);
        const q3 = st.p3.map((x, k) => mk("p3-" + k, x, T.p3.min, T.p3.max, { mid: true })).reduce((a, b) => a + b, 0) / 3;
        const q4 = 0.35 * mk("p4a", st.p4a, T.p4.informal.min, T.p4.informal.max, { email: true, mid: true }) + 0.65 * mk("p4b", st.p4b, T.p4.formal.min, T.p4.formal.max, { email: true, long: true });
        const score = Math.round(50 * (0.1 * q1 + 0.2 * q2 + 0.3 * q3 + 0.4 * q4));
        const pt = (q, w) => Math.round(q * w * 50);
        const errs = keys.reduce((n, k) => n + nErr(k), 0), gerrs = keys.reduce((n, k) => n + gErr(k), 0);
        const offTopic = keys.filter((k) => J[k].t.trim() && rel(k) < 0.999).length;
        const note = "Điểm ước lượng tự động dựa trên độ dài, dấu câu, từ nối, độ đa dạng từ vựng, bố cục email, lỗi chính tả, lỗi ngữ pháp và mức bám sát câu hỏi — chỉ mang tính tham khảo, không thay được giám khảo thật. " +
          (!spellOk ? "⚠️ Chưa trừ điểm chính tả/ngữ pháp vì không tải được bộ kiểm tra Harper (cần có mạng và mở web qua server http — xem mục “Chạy trên máy” trong README). "
            : (errs || gerrs) ? `Đã trừ điểm vì <b>${errs}</b> lỗi chính tả và <b>${gerrs}</b> lỗi ngữ pháp (Part 1: câu sai chính tả không được điểm). Harper báo nhầm tên riêng/câu đúng? Bấm “✕ bỏ qua” ở phần xem lại, điểm sẽ tính lại. `
            : "Không có lỗi chính tả/ngữ pháp nào bị trừ điểm. ") +
          (useAI && !ai ? `⚠️ Không gọi được AI chấm nội dung (${esc(aiErr)}) nên dùng kiểm tra từ khóa thay thế. ` : ai ? (savedAI ? "Nội dung do AI chấm lúc nộp bài (kết quả đã lưu, không gọi lại AI). " : `Nội dung do AI (${esc(FA.ai.model())}) chấm. `) : replay ? "Lượt này không có kết quả AI đã lưu nên nội dung được kiểm tra bằng từ khóa (không gọi lại AI). " : "") +
          (offTopic ? `<b>${offTopic}</b> câu/bài chưa bám sát câu hỏi nên bị trừ điểm nội dung (xem lý do ở từng mục bên dưới). ` : "Nội dung các câu đều bám sát câu hỏi. ") +
          "Hãy so với bài mẫu và tự soát theo checklist.";
        return {
          score, cefr: FA.toCEFR("writing", score), note,
          breakdown: [{ label: "Part 1", got: pt(q1, 0.1), total: 5 }, { label: "Part 2", got: pt(q2, 0.2), total: 10 }, { label: "Part 3", got: pt(q3, 0.3), total: 15 }, { label: "Part 4", got: pt(q4, 0.4), total: 20 }],
        };
      };

      /* khung giải thích nội dung ở từng mục (tĩnh — không đổi khi bỏ qua lỗi Harper) */
      const relBox = (k) => {
        const c = C[k];
        if (!J[k].t.trim()) return "";
        if (isP1(k)) {
          if (c.score >= 1) return "";
          return `<div class="rel-note bad">🎯 Nội dung${c.ai ? " (AI)" : ""}: ${c.score ? "chỉ được một nửa điểm câu này — " : "không được điểm câu này — "}${esc(c.why).replace(/[.。]+$/, "")}.</div>`;
        }
        const aiNote = c.ai && c.comment ? `<div>🤖 ${esc(c.comment)}</div>` : "";
        if (c.frac >= 0.999 && !c.copied) return `<div class="rel-note ok">🎯 Nội dung${c.ai ? " (AI)" : ""}: bám sát câu hỏi, đủ các ý chính.${aiNote}</div>`;
        return `<div class="rel-note bad">🎯 Nội dung${c.ai ? " (AI)" : ""}: bị nhân hệ số <b>×${c.factor.toFixed(2)}</b>.${aiNote}${c.missing.length ? `<ul>${c.missing.map((m) => `<li>Chưa thấy ý: ${esc(m)}</li>`).join("")}</ul>` : ""}${c.copied ? `<div>Bài chép lại khoảng ${Math.round(c.copy * 100)}% câu chữ của đề bài — hãy diễn đạt bằng lời của bạn.</div>` : ""}</div>`;
      };

      renderResult({
        skill: "writing", test, ...calc(), replay: !!replay, attemptAt: replay && replay.at,
        ans: { p1: st.p1.slice(), p2: st.p2, p3: st.p3.slice(), p4a: st.p4a, p4b: st.p4b, ai: ai || undefined }, // lưu kết quả AI để xem lại không phải chấm lại
        review(el, update) {
          const spellBox = (k) => `<div class="spell-box" data-spell="${k}"></div>`;
          const yours = (t, min, max, k) => `<div class="sample-label" style="color:var(--orange-700)">Bài của bạn · ${FA.wordCount(t)} từ (yêu cầu ${min}–${max})</div><div class="passage" style="white-space:pre-line;line-height:1.7;margin:6px 0 0">${esc(t) || '<span class="muted">(bỏ trống)</span>'}</div>${spellBox(k)}${relBox(k)}`;
          const sample = (s) => `<div class="sample"><div class="sample-label">Bài mẫu tham khảo</div>${esc(s)}</div>`;
          el.innerHTML = `
            <div class="q-card mb-2"><div class="q-part">Part 1</div>${T.p1.questions.map((q, k) => `<div class="mb-2"><b>${k + 1}. ${esc(q.q)}</b><div>Bạn: ${esc(st.p1[k]) || '<span class="muted">(bỏ trống)</span>'}</div>${spellBox("p1-" + k)}${relBox("p1-" + k)}<div style="color:#166534">Mẫu: ${esc(q.s)}</div></div>`).join("")}</div>
            <div class="q-card mb-2"><div class="q-part">Part 2</div><div class="q-text">${esc(T.p2.q)}</div>${yours(st.p2, T.p2.min, T.p2.max, "p2")}${sample(T.p2.s)}</div>
            <div class="q-card mb-2"><div class="q-part">Part 3</div>${T.p3.questions.map((q, k) => `<div class="mb-2"><div class="chat-bubble"><div class="who">${esc(q.who)}</div>${esc(q.q)}</div>${yours(st.p3[k], T.p3.min, T.p3.max, "p3-" + k)}${sample(q.s)}</div>`).join("")}</div>
            <div class="q-card mb-2"><div class="q-part">Part 4</div><div class="passage" style="white-space:pre-line">${esc(T.p4.notice)}</div>
              <h3>Email informal</h3>${yours(st.p4a, T.p4.informal.min, T.p4.informal.max, "p4a")}${sample(T.p4.informal.s)}
              <h3 class="mt-3">Email formal</h3>${yours(st.p4b, T.p4.formal.min, T.p4.formal.max, "p4b")}${sample(T.p4.formal.s)}</div>
            <div class="q-card checklist"><div class="q-part">Checklist tự soát</div>
              ${["Trả lời đúng và đủ ý tất cả câu hỏi", "Đủ số từ yêu cầu ở mọi part", "Email formal có Dear… / Yours faithfully, không viết tắt (I'm → I am)", "Email informal thân mật, có hỏi lại bạn", "Dùng từ nối: Firstly, However, In addition, Therefore…", "Có ít nhất 1 câu phức (because, although, if, which…)", "Viết hoa đầu câu, chấm câu đầy đủ, không sai chính tả cơ bản", "Đưa ra đề xuất/giải pháp cụ thể ở email formal"].map((x) => `<label><input type="checkbox"> ${x}</label>`).join("")}
            </div>
            <p class="muted" style="font-size:.8rem">Kiểm tra chính tả & ngữ pháp bởi <a href="https://github.com/Automattic/harper" target="_blank" rel="noopener">Harper</a> (Apache-2.0). ${ai ? `Mức bám sát câu hỏi do AI chấm${savedAI ? " lúc nộp bài (xem lại không gửi bài đi nữa)" : ` (${esc(FA.ai.model())}): nội dung bài viết được gửi tới máy chủ AI đã cấu hình trong <code>ai-config.js</code>`}; Harper vẫn chạy ngay trên máy bạn.` : "Mức bám sát câu hỏi do FlashAptis kiểm tra bằng từ khóa. Tất cả chạy ngay trên máy bạn — bài viết không bị gửi đi đâu."}</p>`;
          const boxes = {};
          el.querySelectorAll("[data-spell]").forEach((b) => (boxes[b.dataset.spell] = b));
          const mountAll = () => keys.forEach((k) => {
            if (!FA.spell) return;
            const o = Object.assign({}, J[k].opts);
            if (spellOk) { o.issues = J[k].issues; o.onIgnore = refresh; }
            FA.spell.mount(boxes[k], J[k].t, o);
          });
          // người dùng bấm "bỏ qua" một từ → bỏ lỗi đó ở mọi ô, tính lại điểm
          function refresh() {
            keys.forEach((k) => (J[k].issues = FA.spell.filterIgnored(J[k].issues)));
            update(calc());
            mountAll();
          }
          mountAll();
        },
      });
    }
  }

  /* ======================================================
     SPEAKING
     ====================================================== */
  function runSpeaking(test, replay) {
    clearRun();
    const steps = [];
    test.p1.forEach((q, k) => steps.push({ part: 1, label: `Part 1 · Câu ${k + 1}`, q: q.q, s: q.s, time: 30 }));
    test.p2.questions.forEach((q, k) => steps.push({ part: 2, label: `Part 2 · Câu ${k + 1}`, q: q.q, s: q.s, time: 45, photo: test.p2.photo }));
    test.p3.questions.forEach((q, k) => steps.push({ part: 3, label: `Part 3 · Câu ${k + 1}`, q: q.q, s: q.s, time: 45, photos: test.p3.photos }));
    steps.push({ part: 4, label: "Part 4", qs: test.p4.questions, s: test.p4.s, prep: 60, time: 120, photo: test.p4.photo });

    const st = { i: 0, recs: [], stream: null, phase: "idle" };
    const sh = examShell(`${test.title} — Speaking`, 0);
    sh.submit.textContent = "Kết thúc";
    sh.submit.onclick = () => { if (confirm("Kết thúc bài Speaking và xem kết quả?")) finish(); };

    const photoHTML = (p) => `<div class="photo"><div><div class="emo">${p.emo}</div><div class="cap">${esc(p.cap)}</div></div></div>`;
    let stopTick = null, recorder = null, chunks = [];

    async function getMic() {
      if (st.stream || !navigator.mediaDevices || !window.MediaRecorder) return;
      try { st.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); cleanup.push(() => st.stream && st.stream.getTracks().forEach((t) => t.stop())); }
      catch (e) { FA.toast("Không có quyền micro — bạn vẫn luyện được nhưng không ghi âm."); }
    }
    function startRec() {
      if (!st.stream) return;
      chunks = [];
      try {
        const rec = (recorder = new MediaRecorder(st.stream));
        const myChunks = (chunks = []);
        rec.ondataavailable = (e) => e.data.size && myChunks.push(e.data);
        const idx = st.i;
        rec.onstop = () => { st.recs[idx] = URL.createObjectURL(new Blob(myChunks, { type: rec.mimeType || "audio/webm" })); };
        rec.start();
      } catch (e) { recorder = null; }
    }
    function stopRec() { if (recorder && recorder.state !== "inactive") recorder.stop(); recorder = null; }
    cleanup.push(stopRec);
    if (replay) return finish(); // xem lại: bản ghi âm không được lưu, chỉ còn điểm tự chấm và bài mẫu

    function countdown(sec, label, onEnd) {
      const el = sh.stage.querySelector("#bigTimer"), lb = sh.stage.querySelector("#stageLabel");
      lb.innerHTML = label;
      const end = Date.now() + sec * 1000;
      let id;
      const tick = () => {
        const left = (end - Date.now()) / 1000;
        el.textContent = FA.fmtTime(left);
        if (left <= 0) { clearInterval(id); onEnd(); }
      };
      id = setInterval(tick, 250);
      tick();
      stopTick = () => clearInterval(id);
      cleanup.push(stopTick);
    }

    function render() {
      const s = steps[st.i];
      const qHTML = s.qs ? `<ol style="padding-left:20px;margin:0">${s.qs.map((q) => `<li class="q-text" style="font-size:1.05rem;margin-bottom:6px">${esc(q)}</li>`).join("")}</ol>` : `<div class="q-text">${esc(s.q)}</div>`;
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / steps.length) * 100}%"></i></div>
        <div class="progress-meta"><span>${s.label}</span><span>Bước ${st.i + 1}/${steps.length}</span></div>
        <div class="q-card">
          <div class="q-part">${s.label}</div>
          ${s.photo ? `<div class="mb-2">${photoHTML(s.photo)}</div>` : ""}
          ${s.photos ? `<div class="photos-2">${s.photos.map(photoHTML).join("")}</div>` : ""}
          ${qHTML}
          <div class="speak-stage">
            <div><div class="stage-label" id="stageLabel">Sẵn sàng</div><div class="big-timer" id="bigTimer">${FA.fmtTime(s.time)}</div></div>
            <div class="spacer"></div>
            <button class="btn btn-primary" id="goBtn">▶ Bắt đầu câu này</button>
            <button class="btn btn-outline hidden" id="doneBtn">Xong, câu tiếp →</button>
          </div>
          <div class="muted" style="font-size:.88rem">Máy sẽ đọc câu hỏi, sau đó đồng hồ chạy và ghi âm tự động. ${s.prep ? "Part 4 có 1 phút chuẩn bị (có thể ghi chú ra giấy)." : ""}</div>
        </div>`;
      sh.stage.querySelector("#goBtn").onclick = start;
      sh.stage.querySelector("#doneBtn").onclick = next;
    }
    async function start() {
      const s = steps[st.i];
      const go = sh.stage.querySelector("#goBtn");
      go.classList.add("hidden");
      await getMic();
      if (!running) return;
      sh.stage.querySelector("#stageLabel").textContent = "🔊 Đang đọc câu hỏi…";
      await FA.speak(s.qs ? s.qs.join(" ") : s.q, { gender: "f" }).catch(() => {});
      if (!running) return;
      const done = sh.stage.querySelector("#doneBtn");
      const speak = () => {
        done.textContent = "Xong, câu tiếp →";
        done.onclick = next;
        done.classList.remove("hidden");
        startRec();
        countdown(s.time, `${st.stream ? '<span class="rec-dot"></span>Đang ghi âm' : "Đang nói"}`, next);
      };
      if (s.prep) {
        done.textContent = "Nói ngay →";
        done.onclick = () => { stopTick(); speak(); };
        done.classList.remove("hidden");
        countdown(s.prep, "⏳ Thời gian chuẩn bị", () => { stopTick(); speak(); });
      } else speak();
    }
    function next() {
      if (stopTick) stopTick();
      stopRec();
      FA.stopSpeak();
      if (st.i < steps.length - 1) { st.i++; setTimeout(render, 150); }
      else setTimeout(finish, 300);
    }
    render();

    function finish() {
      stopRec();
      setTimeout(() => {
        const recs = st.recs.slice();
        clearRun();
        /* Thang chấm Speaking: 4 part, mỗi part 0–5 → tối đa 20, quy ra thang 50 (FA.speakingTo50) */
        const PARTS = [["Part 1", "3 câu về bản thân"], ["Part 2", "mô tả 1 tranh + 2 câu hỏi"], ["Part 3", "so sánh 2 tranh + 2 câu hỏi"], ["Part 4", "3 câu về chủ đề trừu tượng (nói 2 phút)"]];
        // lượt chấm cũ dùng 5 tiêu chí (1–5) → quy về trung bình cho cả 4 part; thiếu dữ liệu → 3/part
        const normRates = (a) => {
          const nums = (Array.isArray(a) ? a : []).filter((x) => typeof x === "number" && isFinite(x));
          const cl = (x) => Math.max(0, Math.min(5, Math.round(x)));
          if (nums.length === PARTS.length) return nums.map(cl);
          if (nums.length) { const m = cl(nums.reduce((p, c) => p + c, 0) / nums.length); return PARTS.map(() => m); }
          return PARTS.map(() => 3);
        };
        const rates = normRates((replay && replay.ans && replay.ans.rates) || FA.store.get("speakRate:" + test.id, null));
        const raw = () => rates.reduce((a, b) => a + b, 0);
        const calc = () => FA.speakingTo50(raw());
        const breakdown = () => PARTS.map((p, k) => ({ label: p[0], got: rates[k], total: 5 }));
        renderResult({
          skill: "speaking", test, score: calc(), cefr: FA.toCEFR("speaking", calc()), replay: !!replay, attemptAt: replay && replay.at, ans: { rates: rates.slice() },
          note: "Điểm Speaking là điểm TỰ CHẤM theo thang Aptis: 4 part, mỗi part 0–5 điểm (tối đa 20), web quy ra thang 50 (×2,5). Nghe lại bản ghi, so với bài mẫu rồi kéo thanh đánh giá bên dưới — điểm sẽ cập nhật.",
          breakdown: breakdown(),
          review(el, update) {
            el.innerHTML = `<div class="q-card mb-2"><div class="q-part">Tự chấm từng part (0–5 điểm)</div>
              <div class="muted mb-2" style="font-size:.88rem">Tiêu chí: khả năng diễn đạt (trôi chảy, từ vựng, ngữ pháp, phát âm) và độ chính xác, đúng trọng tâm của câu trả lời.<br><b>0</b> không trả lời/không hiểu được · <b>1–2</b> rất hạn chế · <b>3</b> trả lời được nhưng còn nhiều lỗi · <b>4</b> khá tốt · <b>5</b> tốt, tự nhiên.</div>
              ${PARTS.map((p, k) => `<div class="calc-row"><span><b>${p[0]}</b> · ${p[1]}</span><input type="range" min="0" max="5" value="${rates[k]}" data-r="${k}"><b class="lv" data-rv="${k}">${rates[k]}</b><span></span></div>`).join("")}
              <div class="row mt-2"><b>Điểm tự chấm: <span id="selfRaw">${raw()}</span>/${FA.SPEAKING_MAX_RAW} → <span id="selfScore">${calc()}</span>/50</b> · <span id="selfCefr" class="pill">${FA.toCEFR("speaking", calc())}</span><div class="spacer"></div><button class="btn btn-primary btn-sm" id="saveRate">Lưu điểm</button></div></div>` +
              steps.map((s, i) => `<div class="q-card mb-2"><div class="q-part">${s.label}</div>
                ${s.qs ? `<ol style="padding-left:20px">${s.qs.map((q) => `<li><b>${esc(q)}</b></li>`).join("")}</ol>` : `<div class="q-text">${esc(s.q)}</div>`}
                ${recs[i] ? `<div class="sample-label" style="color:var(--orange-700)">Bản ghi của bạn</div><audio controls src="${recs[i]}" style="width:100%;margin:6px 0"></audio>` : `<div class="muted" style="font-size:.9rem">${replay ? "Bản ghi âm không được lưu lại sau khi rời trang." : "Không có bản ghi cho câu này."}</div>`}
                <div class="sample"><div class="row"><span class="sample-label">Bài mẫu tham khảo</span><div class="spacer"></div><button class="btn btn-ghost btn-sm" data-say="${i}">🔊 Nghe mẫu</button></div>${esc(s.s)}</div></div>`).join("");
            el.querySelectorAll("[data-r]").forEach((r) => (r.oninput = () => {
              rates[+r.dataset.r] = +r.value;
              el.querySelector(`[data-rv="${r.dataset.r}"]`).textContent = r.value;
              el.querySelector("#selfRaw").textContent = raw();
              el.querySelector("#selfScore").textContent = calc();
              el.querySelector("#selfCefr").textContent = FA.toCEFR("speaking", calc());
            }));
            el.querySelector("#saveRate").onclick = () => {
              FA.store.set("speakRate:" + test.id, rates);
              update({ score: calc(), cefr: FA.toCEFR("speaking", calc()), breakdown: breakdown(), ans: { rates: rates.slice() } }); // cập nhật đúng lượt làm bài này + vòng điểm phía trên
              FA.toast(`Đã lưu điểm tự chấm: ${raw()}/${FA.SPEAKING_MAX_RAW} → ${calc()}/50`);
            };
            el.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => FA.speak(steps[+b.dataset.say].s, { gender: "m" })));
          },
        });
      }, 250);
    }
  }

  const RUNNERS = { grammar: runGrammar, reading: runReading, listening: runListening, writing: runWriting, speaking: runSpeaking };

  /* ======================================================
     PHÒNG GYM & SỔ CÂU SAI
     ====================================================== */
  function gymPool(src) {
    const pool = [];
    if (src === "grammar" || src === "mix") window.FA_GRAMMAR.forEach((t) => t.questions.forEach((q, k) => pool.push({ id: `${t.id}-q${k}`, src: "Grammar · " + t.title, q: q.q, o: q.o, a: q.a, e: q.e, instr: q.instr })));
    if (src === "reading" || src === "mix") window.FA_READING.forEach((t) => t.parts.forEach((p, pi) => p.type === "gap" && p.gaps.forEach((g, k) => pool.push(gapItem(t, pi, p, k)))));
    if (src === "listening" || src === "mix") window.FA_LISTENING.forEach((t) => t.parts.forEach((p, pi) => p.type === "mcq" && p.items.forEach((it, k) => pool.push({ id: `${t.id}-p${pi}-i${k}`, src: "Listening · " + t.title, q: it.q, o: it.o, a: it.a, e: it.e, script: it.script }))));
    return pool;
  }

  function viewGym(wrongMode) {
    const wrong = FA.store.get("wrongbook", []);
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/">← Kỹ năng</a> / Phòng gym</div>
        <h1 class="page-title">🏋️ Phòng gym</h1>
        <p class="page-sub">Chưa sẵn sàng làm cả đề? Luyện 10 câu không bấm giờ — chọn xong biết ngay đúng sai và vì sao. Câu sai tự vào Sổ câu sai để ôn lại.</p>
        <div class="tabs"><a class="tab ${!wrongMode ? "active" : ""}" href="#/gym">Luyện nhanh</a><a class="tab ${wrongMode ? "active" : ""}" href="#/gym/wrong">Sổ câu sai (${wrong.length})</a></div>
        <div id="gymBody"></div>
      </div></div>`;
    const body = app.querySelector("#gymBody");
    if (!wrongMode) {
      const opts = [["mix", "🎲", "Trộn tất cả", "Grammar, Reading, Listening"], ["grammar", "🧩", "Grammar & Vocab", "Ngữ pháp + từ vựng"], ["reading", "📖", "Reading Part 1", "Điền từ vào đoạn văn"], ["listening", "🎧", "Listening Part 1", "Nghe đoạn ngắn, nghe không giới hạn"]];
      body.innerHTML = `<div class="grid grid-2">${opts.map(([k, ic, n, d]) => `<button class="card skill-card" data-src="${k}" style="text-align:left;cursor:pointer;font:inherit"><div class="icon">${ic}</div><h3>${n}</h3><p class="mb-0">${d} · ${gymPool(k).length} câu</p></button>`).join("")}</div>`;
      body.querySelectorAll("[data-src]").forEach((b) => (b.onclick = () => gymSession(FA.shuffle(gymPool(b.dataset.src)).slice(0, 10), false, body)));
    } else {
      if (!wrong.length) { body.innerHTML = `<div class="empty card"><div class="big">📒</div><p>Sổ câu sai đang trống. Làm đề hoặc vào Luyện nhanh — câu nào sai sẽ tự lưu ở đây.</p><a class="btn btn-primary" href="#/gym">Luyện nhanh</a></div>`; return; }
      body.innerHTML = `<div class="row mb-2"><button class="btn btn-primary" id="reviewAll">Ôn lại ${Math.min(10, wrong.length)} câu</button><div class="spacer"></div><button class="btn btn-ghost btn-sm" id="clearAll">Xóa hết</button></div>
        ${wrong.map((w) => `<div class="card mb-2" style="padding:14px 16px"><div class="row"><span class="pill gray">${esc(w.src)}</span><div class="spacer"></div><button class="btn btn-ghost btn-sm" data-del="${esc(w.id)}">Bỏ khỏi sổ</button></div>
          <div class="mt-1"><b>${esc(w.q)}</b></div><div style="font-size:.92rem;color:#166534">Đáp án: ${esc(w.o[w.a])}</div><div class="muted" style="font-size:.88rem">${esc(w.e)}</div></div>`).join("")}`;
      body.querySelector("#reviewAll").onclick = () => gymSession(FA.shuffle(wrong).slice(0, 10), true, body);
      body.querySelector("#clearAll").onclick = () => { if (confirm("Xóa toàn bộ Sổ câu sai?")) { FA.store.set("wrongbook", []); viewGym(true); } };
      body.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => { FA.removeWrong(b.dataset.del); viewGym(true); }));
    }
  }

  function gymSession(items, fromWrong, body) {
    let i = 0, correct = 0, chosen = null;
    const draw = () => {
      if (i >= items.length) {
        body.innerHTML = `<div class="card center"><div class="ring-lg" style="--p:${Math.round((correct / items.length) * 100)};margin:0 auto"><div><b>${correct}</b><span>/${items.length}</span></div></div>
          <h2 class="mt-2">${correct === items.length ? "Hoàn hảo! 🎉" : "Xong một hiệp! 💪"}</h2><p class="muted">${fromWrong ? "Câu đúng đã được gỡ khỏi Sổ câu sai." : "Câu sai đã được lưu vào Sổ câu sai."}</p>
          <div class="row" style="justify-content:center"><a class="btn btn-primary" href="${fromWrong ? "#/gym/wrong" : "#/gym"}" id="again">Tập tiếp</a></div></div>`;
        body.querySelector("#again").onclick = (e) => { e.preventDefault(); viewGym(fromWrong); };
        return;
      }
      const it = items[i];
      const ans = chosen != null;
      body.innerHTML = `
        <div class="progress"><i style="width:${(i / items.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Câu ${i + 1}/${items.length}</span><span>Đúng ${correct}</span></div>
        <div class="q-card">
          <div class="q-part">${esc(it.src)}</div>
          ${it.instr ? `<div class="q-instr">${esc(it.instr)}</div>` : ""}
          ${it.passage ? `<div class="passage">${it.passage}</div>` : ""}
          ${it.script ? `<div class="audio-box"><button class="play-btn" id="gplay">▶</button><div class="info"><b>Nghe đoạn hội thoại</b><br>Phòng gym: nghe không giới hạn</div></div>` : ""}
          <div class="q-text">${esc(it.q)}</div>
          ${it.o.map((o, k) => `<button class="opt ${ans ? (k === it.a ? "correct" : k === chosen ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
          ${ans ? `<div class="explain"><b>${chosen === it.a ? "✅ Chính xác!" : "❌ Chưa đúng."}</b> ${esc(it.e)}</div>${it.script ? `<div class="transcript">${transcriptHTML(it.script)}</div>` : ""}` : ""}
        </div>
        ${ans ? `<div class="exam-nav"><span></span><button class="btn btn-primary" id="gnext">${i < items.length - 1 ? "Câu tiếp →" : "Xem kết quả"}</button></div>` : ""}`;
      const gp = body.querySelector("#gplay");
      if (gp) gp.onclick = () => FA.speak(it.script).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."));
      body.querySelectorAll(".opt[data-k]").forEach((b) => (b.onclick = () => {
        chosen = +b.dataset.k;
        if (chosen === it.a) { correct++; if (fromWrong) FA.removeWrong(it.id); }
        else FA.addWrong(it);
        draw();
      }));
      const gn = body.querySelector("#gnext");
      if (gn) gn.onclick = () => { FA.stopSpeak(); i++; chosen = null; draw(); };
    };
    draw();
  }

  route();
})();
