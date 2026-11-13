/* FlashAptis — kiểm tra chính tả & ngữ pháp bài Writing bằng Harper (https://github.com/Automattic/harper)
   Harper chạy hoàn toàn trên máy người dùng (WebAssembly), giấy phép Apache-2.0.
   - Nạp lười từ jsDelivr, ghim đúng phiên bản (API của harper.js còn "early access").
   - Kết quả được dùng để TRỪ ĐIỂM (exam.js): lỗi chính tả (Spelling/Typo) và lỗi ngữ pháp (GRAMMAR_KINDS).
     Các loại Capitalization/Punctuation/Enhancement… chỉ hiển thị tham khảo (đã có điểm dấu câu riêng / chỉ là gợi ý văn phong).
   - Harper KHÔNG hiểu nghĩa: mức bám sát câu hỏi do assets/js/relevance.js chấm, không phải Harper.
   - Dùng bản `binary` (wasm tải riêng ~7,5 MB nén) thay vì `binaryInlined` (JS 27 MB). */
(function () {
  const FA = (window.FA = window.FA || {});
  const esc = FA.esc;

  const HARPER_BASE = "https://cdn.jsdelivr.net/npm/harper.js@3.0.0/dist/";
  const LOAD_TIMEOUT_MS = 90000;

  /* ---------- nạp bộ kiểm tra (singleton) ---------- */
  let linterP = null;
  function getLinter() {
    if (linterP) return linterP;
    // mở thẳng file (file://) trình duyệt chặn nạp module/worker từ CDN → báo ngay, không bắt người dùng chờ
    if (location.protocol === "file:") return Promise.reject(new Error("file-protocol"));
    const load = (async () => {
      const [H, B] = await Promise.all([import(HARPER_BASE + "index.js"), import(HARPER_BASE + "binary.js")]);
      // Aptis là của British Council → dùng chính tả Anh-Anh (favourite, realised, colour…)
      const linter = new H.WorkerLinter({ binary: B.binary, dialect: H.Dialect.British });
      await linter.setup();
      return linter;
    })();
    linterP = load;
    load.catch(() => { if (linterP === load) linterP = null; }); // chỉ khi tải thật sự lỗi mới cho thử lại (tránh tải 8 MB lần hai)
    return linterP;
  }
  // chờ tối đa LOAD_TIMEOUT_MS để hiện cảnh báo; việc tải vẫn tiếp tục chạy nền nếu mạng chậm
  function getLinterWithin(ms) {
    return Promise.race([getLinter(), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms || LOAD_TIMEOUT_MS))]);
  }

  /* ---------- chạy kiểm tra, trả về dữ liệu thuần (không giữ đối tượng WASM) ---------- */
  const SPELLING_KINDS = new Set(["Spelling", "Typo"]);
  const NON_ENGLISH = /[^\u0000-\u007F‘’“”–—]/; // ký tự ngoài ASCII/dấu câu thường gặp (vd: tiếng Việt có dấu)

  /* Từ người dùng đã bấm "bỏ qua" (tên riêng, địa danh…) — lưu lâu dài trên máy */
  const IGNORE_KEY = "spell-ignore";
  const getIgnored = () => new Set((FA.store ? FA.store.get(IGNORE_KEY, []) : []).map((w) => String(w).toLowerCase()));
  function addIgnored(word) {
    if (!FA.store) return;
    const list = FA.store.get(IGNORE_KEY, []);
    const w = String(word).toLowerCase();
    if (!list.includes(w)) FA.store.set(IGNORE_KEY, list.concat(w).slice(-500));
  }

  /* Loại lỗi ngữ pháp bị trừ điểm — chọn theo kết quả chạy thật trên toàn bộ bài mẫu (không có lỗi nào bị báo nhầm):
     Agreement (he don't), Grammar (their/there), Miscellaneous (a/an, then/than, since…), Repetition (the the),
     WordChoice (should of), BoundaryError (alot). KHÔNG tính: Capitalization/Punctuation (đã có điểm riêng), Enhancement/Style (gợi ý văn phong). */
  const GRAMMAR_KINDS = new Set(["Agreement", "Grammar", "Miscellaneous", "Repetition", "WordChoice", "BoundaryError"]);

  const isSpelling = (it) => SPELLING_KINDS.has(it.kind);
  const isGrammar = (it) => GRAMMAR_KINDS.has(it.kind);
  /* loại khỏi danh sách: từ chính tả người dùng đã "bỏ qua" (lưu lâu dài) và lỗi ngữ pháp đã bỏ qua (chỉ trong phiên này) */
  function filterIgnored(issues) {
    const ig = getIgnored();
    return issues.filter((it) => !it.dismissed && !(isSpelling(it) && ig.has(it.problem.toLowerCase())));
  }

  async function check(text, opts) {
    opts = opts || {};
    const linter = await getLinterWithin(opts.timeoutMs);
    const lints = await linter.lint(text);
    const out = [];
    const ignored = getIgnored();
    for (const l of lints) {
      const s = l.span();
      const item = {
        start: s.start, end: s.end, kind: l.lint_kind(), message: l.message(), problem: l.get_problem_text(),
        suggestions: l.suggestions().map((x) => ({ remove: x.kind() === 1, text: x.get_replacement_text() })),
      };
      try { l.free(); } catch (e) {}
      if (opts.spellingOnly && !SPELLING_KINDS.has(item.kind)) continue;
      if (NON_ENGLISH.test(item.problem)) continue; // từ tiếng Việt chen vào bài → bỏ qua
      if (SPELLING_KINDS.has(item.kind) && ignored.has(item.problem.toLowerCase())) continue; // người dùng đã bỏ qua từ này
      // tên riêng giữa câu (Minh, Hanoi…) hay bị báo sai chính tả
      if (item.kind === "Spelling" && /^[A-Z][A-Za-z'’-]*$/.test(item.problem) && !/(^|[.!?]\s*|\n\s*)$/.test(text.slice(0, item.start))) continue;
      // tên trong lời chào ("Hi Lan,") hoặc dòng chữ ký ("Nguyen Van Minh") của email
      if (item.kind === "Spelling" && /^[A-Z][A-Za-z'’-]*$/.test(item.problem)) {
        const lineStart = text.lastIndexOf("\n", item.start - 1) + 1;
        const lineEnd = text.indexOf("\n", item.end) < 0 ? text.length : text.indexOf("\n", item.end);
        const lineToks = text.slice(lineStart, lineEnd).trim().split(/\s+/);
        const signature = lineStart > 0 && lineToks.length <= 4 && lineToks.every((w) => /^[A-Z][A-Za-z'’-]*[,.!]?$/.test(w));
        const greeted = /\b(?:[Hh]i|[Hh]ello|[Hh]ey|[Dd]ear)\s+(?:[A-Z][A-Za-z'’-]*\s+)*$/.test(text.slice(lineStart, item.start));
        if (signature || greeted) continue;
      }
      // từ nằm ngay sau dấu nháy mở (vd: 'xin chào', "pho") là từ nước ngoài được trích dẫn
      if (item.kind === "Spelling" && /['"‘“]$/.test(text.slice(Math.max(0, item.start - 1), item.start))) continue;
      out.push(item);
    }
    return out.sort((a, b) => a.start - b.start);
  }

  /* ---------- hiển thị ---------- */
  function highlight(text, issues) {
    let html = "", pos = 0;
    issues.forEach((it, n) => {
      if (it.start < pos) return; // bỏ lỗi chồng lấn
      html += esc(text.slice(pos, it.start)) + `<mark class="spell-mark${isSpelling(it) ? "" : " gram"}" title="${esc(it.message)}">${esc(text.slice(it.start, it.end))}<sup>${n + 1}</sup></mark>`;
      pos = it.end;
    });
    return html + esc(text.slice(pos));
  }

  function suggestText(it) {
    const s = it.suggestions.slice(0, 3).map((x) => (x.remove ? "<i>xóa từ này</i>" : /^[^A-Za-z0-9]+$/.test(x.text) ? `thêm <b>“${esc(x.text.trim())}”</b>` : `<b>${esc(x.text)}</b>`));
    return s.length ? `Gợi ý: ${s.join(" · ")}` : "";
  }

  const kindLabel = (it) => (isSpelling(it) ? "Chính tả" : isGrammar(it) ? "Ngữ pháp" : it.kind === "Punctuation" ? "Dấu câu" : it.kind === "Capitalization" ? "Viết hoa" : "Gợi ý");
  /* chính tả: "bỏ qua" nhớ lâu dài (tên riêng…); ngữ pháp: chỉ trong phiên này vì phụ thuộc ngữ cảnh. n = vị trí trong danh sách đang hiển thị */
  const ignoreBtn = (it, n) =>
    isSpelling(it) ? ` <button type="button" class="spell-ignore" data-ignore="${esc(it.problem)}" title="Đây là tên riêng / từ đúng — không báo lại">✕ bỏ qua</button>`
    : isGrammar(it) ? ` <button type="button" class="spell-ignore" data-gi="${n}" title="Câu này đúng ngữ pháp — không tính lỗi này">✕ bỏ qua</button>` : "";
  const penalized = (it) => isSpelling(it) || isGrammar(it);

  /* Gắn kết quả kiểm tra vào phần tử `el`.
     opts: { spellingOnly, quiet, skip, issues, onIgnore }
       issues   — kết quả đã quét sẵn (bỏ qua bước kiểm tra lại)
       onIgnore — gọi sau khi người dùng bấm "bỏ qua" (để nơi gọi tính lại điểm); không có thì tự vẽ lại
       quiet — không hiện gì nếu không có lỗi hoặc không tải được
       skip  — không kiểm tra (vd: câu hỏi về tên người, đáp án toàn tên riêng) */
  async function mount(el, text, opts) {
    opts = opts || {};
    if (opts.skip || !text || !text.trim()) { el.innerHTML = ""; return; }
    if (!el.dataset.spellBound) {
      el.dataset.spellBound = "1";
      el.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ignore],[data-gi]");
        if (!b) return;
        if (b.dataset.gi != null) { const it = (el.__issues || [])[+b.dataset.gi]; if (it) it.dismissed = true; }
        else addIgnored(b.dataset.ignore);
        const prev = el.previousElementSibling;
        if (prev && prev.classList.contains("passage")) prev.style.display = "";
        if (opts.onIgnore) opts.onIgnore();
        else mount(el, text, Object.assign({}, opts, { issues: el.__issues ? filterIgnored(el.__issues) : opts.issues && filterIgnored(opts.issues) })); // vẽ lại, từ vừa bỏ qua sẽ biến mất
      });
    }
    if (!opts.quiet && !opts.issues) el.innerHTML = `<div class="spell-note">⏳ Đang kiểm tra chính tả & ngữ pháp… (lần đầu cần tải bộ kiểm tra ~8 MB)</div>`;
    let issues;
    try {
      issues = opts.issues || (await check(text, opts));
    } catch (e) {
      if (!el.isConnected) return;
      el.innerHTML = opts.quiet ? "" : `<div class="spell-note">⚠️ Không tải được bộ kiểm tra chính tả. Cần có mạng và mở web qua server http (không mở thẳng file) — xem mục “Chạy trên máy” trong README.</div>`;
      return;
    }
    if (!el.isConnected) return; // người dùng đã chuyển trang / làm lại
    el.__issues = issues;
    if (!issues.length) {
      el.innerHTML = opts.quiet ? "" : `<div class="spell-note ok">✅ Harper không phát hiện lỗi chính tả hay ngữ pháp rõ ràng.</div>`;
      return;
    }
    if (!opts.quiet) { // bản có tô lỗi thay cho khung bài viết gốc ngay phía trên, tránh hiện hai lần
      const prev = el.previousElementSibling;
      if (prev && prev.classList.contains("passage")) prev.style.display = "none";
    }
    el.innerHTML = opts.quiet
      ?`<div class="spell-list quiet">${issues.map((it, n) => `<span class="spell-chip"><s>${esc(it.problem)}</s> ${suggestText(it).replace("Gợi ý: ", "→ ")}${ignoreBtn(it, n)}</span>`).join("")}</div>`
      : `<div class="spell-note bad">🔍 Harper phát hiện <b>${issues.length}</b> chỗ cần xem lại:</div>
         <div class="passage spell-text">${highlight(text, issues)}</div>
         <ol class="spell-list">${issues.map((it, n) => `<li><b>${esc(it.problem)}</b> <span class="muted">(${kindLabel(it)}${penalized(it) ? " · bị trừ điểm" : ""})</span> — ${esc(it.message)} ${suggestText(it)}${ignoreBtn(it, n)}</li>`).join("")}</ol>`;
  }

  /* Tải trước bộ kiểm tra trong lúc người dùng đang làm bài (im lặng nếu lỗi) */
  function warm() { getLinter().catch(() => {}); }

  FA.spell = { check, mount, warm, isSpelling, isGrammar, filterIgnored };
})();
