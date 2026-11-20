/* FlashAptis — Flashcard từ vựng: học lật thẻ + trắc nghiệm nhanh */
(function () {
  const FA = window.FA, esc = FA.esc;
  const app = document.getElementById("app");
  // bộ cơ bản (data/vocab.js) + 23 chủ đề × 200 từ (data/vocab-topics.js, group: "topic")
  const BASIC = window.FA_VOCAB || [], TOPICS = window.FA_VOCAB_TOPICS || [];
  const DECKS = BASIC.concat(TOPICS);
  const known = () => FA.store.get("fc-known", {});
  const isKnown = (deck, w) => !!known()[deck + "|" + w];
  const setKnown = (deck, w, v) => {
    const k = known();
    if (v) k[deck + "|" + w] = Date.now(); else delete k[deck + "|" + w];
    FA.store.set("fc-known", k);
  };
  /* thẻ trong bộ "Từ khó của tôi" mang theo _d = bộ gốc → trạng thái thuộc/sao luôn gắn với bộ gốc */
  const did = (deck, c) => c._d || deck.id;
  // K: bảng fc-known đọc sẵn một lần (4.600+ thẻ → không parse localStorage cho từng thẻ)
  const deckKnown = (d, K) => { K = K || known(); return d.cards.filter((c) => K[did(d, c) + "|" + c.w]).length; };
  const exHTML = (c) => `“${esc(c.x)}”${c.x2 ? `<br>“${esc(c.x2)}”` : ""}`;
  /* ⭐ từ khó: FA.store "fc-starred" {"bộ|từ": thời điểm gắn sao} (đồng bộ theo tài khoản qua cloud.js) */
  const starred = () => FA.store.get("fc-starred", {});
  const isStar = (deck, w) => !!starred()[deck + "|" + w];
  const toggleStar = (deck, w) => {
    const st = starred(), k = deck + "|" + w;
    if (st[k]) delete st[k]; else st[k] = Date.now();
    FA.store.set("fc-starred", st);
    FA.toast(st[k] ? "⭐ Đã lưu vào “Từ khó của tôi”" : "Đã bỏ khỏi “Từ khó của tôi”");
    return !!st[k];
  };
  const STAR_ID = "starred";
  function starDeck() {
    const st = starred(), cards = [];
    Object.keys(st).sort((a, b) => st[b] - st[a]).forEach((k) => {
      const i = k.indexOf("|"), d = DECKS.find((x) => x.id === k.slice(0, i));
      const c = d && d.cards.find((x) => x.w === k.slice(i + 1));
      if (c) cards.push(Object.assign({ _d: d.id, _dn: d.name }, c));
    });
    return { id: STAR_ID, name: "Từ khó của tôi", emoji: "⭐", cards, virtual: true };
  }
  const starBtn = (deck, c) => { const on = isStar(did(deck, c), c.w); return `<button type="button" class="star-btn${on ? " on" : ""}" aria-pressed="${on}" title="${on ? "Bỏ khỏi" : "Lưu vào"} Từ khó (phím S)">${on ? "★" : "☆"}</button>`; };
  let keyHandler = null;
  const setKeys = (fn) => {
    if (keyHandler) document.removeEventListener("keydown", keyHandler);
    keyHandler = fn;
    if (fn) document.addEventListener("keydown", fn);
  };

  function route() {
    setKeys(null);
    FA.stopSpeak();
    const [deckId, mode, arg] = location.hash.replace(/^#\/?/, "").split("/");
    const deck = deckId === STAR_ID ? starDeck() : DECKS.find((d) => d.id === deckId);
    window.scrollTo(0, 0);
    if (!deck) return viewDecks();
    if (!deck.cards.length) return viewStarEmpty();
    if (mode === "quiz") return viewQuiz(deck);
    // #bộ/list/từ → mở thẳng danh sách từ, lọc sẵn theo từ (từ ô tra nhanh ở trang bộ thẻ)
    let q = "";
    try { q = decodeURIComponent(arg || ""); } catch (e) {}
    viewStudy(deck, mode === "list" ? { list: true, search: q } : null);
  }
  window.addEventListener("hashchange", route);

  /* ---------- danh sách bộ thẻ ---------- */
  let deckSearch = "";
  function viewDecks() {
    const K = known();
    const total = DECKS.reduce((n, d) => n + d.cards.length, 0);
    const k = DECKS.reduce((n, d) => n + deckKnown(d, K), 0);
    const deckCard = (d) => {
      const n = deckKnown(d, K);
      return `<div class="card deck-card">
        <div class="emoji">${d.emoji}</div>
        <h3 class="mt-1">${esc(d.name)}</h3>
        ${d.en ? `<div class="muted" style="font-size:.82rem;margin-top:-4px">${esc(d.en)}</div>` : ""}
        <div class="muted" style="font-size:.9rem">${d.cards.length} thẻ · đã thuộc ${n}</div>
        <div class="progress bar"><i style="width:${(n / d.cards.length) * 100}%"></i></div>
        <div class="row mt-2"><a class="btn btn-primary btn-sm" href="#${d.id}">Học thẻ</a><a class="btn btn-outline btn-sm" href="#${d.id}/quiz">Kiểm tra</a></div>
      </div>`;
    };
    app.innerHTML = `
      <div class="page"><div class="container">
        <span class="eyebrow">Flashcard</span>
        <h1 class="page-title">⚡ Học từ vựng nhanh như chớp</h1>
        <p class="page-sub">Lật thẻ để xem nghĩa, nghe phát âm, đánh dấu từ đã thuộc. Từ chưa nhớ sẽ quay lại cuối bộ để bạn ôn thêm.</p>
        <div class="card mb-2" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
          <div class="ring" style="--p:${Math.round((k / total) * 100)}" data-label="${Math.round((k / total) * 100)}%"></div>
          <div><b style="font-family:var(--font-head);font-size:1.2rem">${k}/${total} từ đã thuộc</b><div class="muted">Tiến độ được lưu trên máy của bạn.</div></div>
        </div>
        <input class="inp mb-2" id="allSearch" value="${esc(deckSearch)}" placeholder="🔍 Tra nhanh trong ${total.toLocaleString("vi-VN")} từ (tiếng Anh hoặc nghĩa tiếng Việt)…">
        <div id="allRes"></div>
        ${(() => {
          const sd = starDeck(), n = sd.cards.length, kn = deckKnown(sd, K);
          return `<div class="card star-deck mb-2">
            <div class="emoji">⭐</div>
            <div style="flex:1;min-width:200px">
              <h3 class="mb-0">Từ khó của tôi</h3>
              <div class="muted" style="font-size:.9rem">${n ? `${n} từ đã gắn sao · đã thuộc ${kn}` : "Bấm ☆ trên thẻ (hoặc phím S) khi học để gom các từ khó vào đây và ôn riêng."}</div>
            </div>
            ${n ? `<div class="row"><a class="btn btn-primary btn-sm" href="#${STAR_ID}">Ôn từ khó</a><a class="btn btn-outline btn-sm" href="#${STAR_ID}/quiz">Kiểm tra</a></div>` : ""}
          </div>`;
        })()}
        <h2 class="mt-3 mb-1">Bộ cơ bản</h2>
        <p class="muted mb-2" style="font-size:.92rem">Từ vựng nền tảng, có phiên âm — học trước nếu bạn mới bắt đầu.</p>
        <div class="grid grid-4">${BASIC.map(deckCard).join("")}</div>
        ${TOPICS.length ? `
        <h2 class="mt-4 mb-1">Từ vựng theo chủ đề Aptis</h2>
        <p class="muted mb-2" style="font-size:.92rem">${TOPICS.length} chủ đề hay gặp trong Speaking & Writing, mỗi chủ đề ${Math.round(TOPICS.reduce((n, d) => n + d.cards.length, 0) / TOPICS.length)} từ — kèm cấu trúc/cách dùng và 2 câu ví dụ. Mẹo: bật “Chỉ từ chưa thuộc” để học dần từng đợt.</p>
        <div class="grid grid-4">${TOPICS.map(deckCard).join("")}</div>` : ""}
      </div></div>`;
    // tra nhanh mọi bộ: hiện tối đa 30 kết quả, bấm để mở danh sách từ của bộ đó
    const inp = app.querySelector("#allSearch"), res = app.querySelector("#allRes");
    const search = () => {
      deckSearch = inp.value;
      const q = deckSearch.trim().toLowerCase();
      if (q.length < 2) { res.innerHTML = ""; return; }
      const hits = [];
      for (const d of DECKS) {
        for (const c of d.cards) {
          if (c.w.toLowerCase().includes(q) || c.m.toLowerCase().includes(q)) hits.push([d, c]);
          if (hits.length >= 31) break;
        }
        if (hits.length >= 31) break;
      }
      res.innerHTML = `<div class="card mb-2" style="padding:10px 14px">${hits.length ? hits.slice(0, 30).map(([d, c]) => `<div class="fc-vocab-row">
          <div style="min-width:0"><div><b>${esc(c.w)}</b> <span class="pill gray">${esc(c.t)}</span> <a class="pill" href="#${d.id}/list/${encodeURIComponent(c.w)}">${d.emoji} ${esc(d.name)}</a></div>
            <div style="color:var(--orange-700);font-weight:600;font-size:.94rem">${esc(c.m)}</div>
            ${c.u ? `<div class="muted" style="font-size:.84rem">${esc(c.u)}</div>` : ""}
            <div class="muted" style="font-size:.84rem;font-style:italic">“${esc(c.x)}”</div></div>
          <button type="button" class="btn btn-ghost btn-sm" data-say="${esc(c.w)}" title="Nghe phát âm">🔊</button></div>`).join("") + (hits.length > 30 ? `<p class="muted mb-0 mt-1" style="font-size:.85rem">Còn nữa — gõ cụ thể hơn để thu hẹp.</p>` : "")
        : `<p class="muted mb-0">Không tìm thấy “${esc(deckSearch)}”.</p>`}</div>`;
      res.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => FA.speak(b.dataset.say, { gender: "f", rate: 0.9 }).catch(() => {})));
    };
    inp.oninput = search;
    if (deckSearch) search();
  }

  /* ---------- chế độ học lật thẻ ---------- */
  function viewStudy(deck, opt) {
    const K0 = known();
    let onlyNew = deck.cards.some((c) => !K0[did(deck, c) + "|" + c.w]) && deckKnown(deck, K0) > 0;
    let reverse = false, showList = !!(opt && opt.list), search = (opt && opt.search) || "", slide = false;
    let queue, flipped = false;
    const build = () => {
      const K = known();
      queue = FA.shuffle(deck.cards.filter((c) => !onlyNew || !K[did(deck, c) + "|" + c.w]));
    };
    build();

    function drawList() {
      setKeys(null);
      const q = search.trim().toLowerCase();
      const all = deck.cards.filter((c) => !q || c.w.toLowerCase().includes(q) || c.m.toLowerCase().includes(q));
      const LIMIT = 300, rows = all.slice(0, LIMIT); // bộ lớn: vẽ tối đa 300 dòng cho nhẹ máy
      const KL = known();
      app.innerHTML = shell(`
        <input class="inp mb-2" id="fcSearch" value="${esc(search)}" placeholder="🔍 Tìm từ tiếng Anh hoặc nghĩa tiếng Việt…">
        <div class="fc-vocab-list">
          ${rows.length ? rows.map((c, idx) => {
            const kn = !!KL[did(deck, c) + "|" + c.w];
            return `<div class="fc-vocab-row">
              <div style="min-width:0">
                <div><b>${esc(c.w)}</b> ${c.p ? `<span class="muted" style="font-size:.86rem">${esc(c.p)}</span>` : ""} <span class="pill gray">${esc(c.t)}</span>${c._dn ? ` <span class="pill">${esc(c._dn)}</span>` : ""}</div>
                <div style="color:var(--orange-700);font-weight:600;font-size:.94rem">${esc(c.m)}</div>
                ${c.u ? `<div class="muted" style="font-size:.84rem">📐 ${esc(c.u)}</div>` : ""}
                <div class="muted" style="font-size:.84rem;font-style:italic">${exHTML(c)}</div>
              </div>
              <div class="row" style="flex-shrink:0">
                <button type="button" class="btn btn-ghost btn-sm star-toggle${isStar(did(deck, c), c.w) ? " on" : ""}" data-star="${idx}" title="Gắn sao từ khó">${isStar(did(deck, c), c.w) ? "★" : "☆"}</button>
                <button type="button" class="btn btn-ghost btn-sm" data-say="${idx}" title="Nghe phát âm">🔊</button>
                <button type="button" class="btn ${kn ? "btn-green" : "btn-outline"} btn-sm" data-kn="${idx}">${kn ? "✓ Thuộc" : "Đánh dấu"}</button>
              </div>
            </div>`;
          }).join("") : `<div class="card empty"><p class="mb-0">Không tìm thấy từ nào khớp “${esc(search)}”.</p></div>`}
        </div>
        ${all.length > LIMIT ? `<p class="muted center" style="font-size:.88rem">Đang hiện ${LIMIT}/${all.length} từ — gõ vào ô tìm kiếm để lọc.</p>` : ""}`);
      const inp = app.querySelector("#fcSearch");
      inp.oninput = () => {
        search = inp.value;
        const pos = inp.selectionStart;
        drawList();
        const ni = app.querySelector("#fcSearch");
        if (ni) { ni.focus(); ni.setSelectionRange(pos, pos); }
      };
      app.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => {
        const c = rows[+b.dataset.say];
        FA.speak(c.w + ". " + c.x, { gender: "f", rate: 0.9 }).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."));
      }));
      app.querySelectorAll("[data-star]").forEach((b) => (b.onclick = () => {
        const c = rows[+b.dataset.star];
        toggleStar(did(deck, c), c.w);
        drawList();
      }));
      app.querySelectorAll("[data-kn]").forEach((b) => (b.onclick = () => {
        const c = rows[+b.dataset.kn];
        setKnown(did(deck, c), c.w, !isKnown(did(deck, c), c.w));
        build();
        drawList();
      }));
      bindTop();
    }

    function draw() {
      if (showList) return drawList();
      flipped = false;
      const n = deckKnown(deck);
      if (!queue.length) {
        setKeys(null);
        app.innerHTML = shell(`<div class="card empty"><div class="big">🎉</div><h2>Xong bộ thẻ!</h2><p>Bạn đã thuộc ${n}/${deck.cards.length} từ trong bộ “${esc(deck.name)}”.</p>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="restart">Học lại cả bộ</button><a class="btn btn-outline" href="#${deck.id}/quiz">Kiểm tra nhanh</a>${!deck.virtual && starDeck().cards.length ? `<a class="btn btn-outline" href="#${STAR_ID}">⭐ Ôn từ khó (${starDeck().cards.length})</a>` : ""}<a class="btn btn-ghost" href="#">Bộ khác</a></div></div>`);
        app.querySelector("#restart").onclick = () => { onlyNew = false; build(); draw(); };
        bindTop();
        return;
      }
      const c = queue[0];
      const front = reverse ? `<div class="fc-mean" style="font-size:1.8rem">${esc(c.m)}</div><div class="fc-type"><span class="pill gray">${esc(c.t)}</span></div>`
        : `<div class="fc-word">${esc(c.w)}</div>${c.p ? `<div class="fc-ipa">${esc(c.p)}</div>` : ""}<div class="fc-type"><span class="pill gray">${esc(c.t)}</span></div>`;
      const usage = c.u ? `<div class="fc-use">📐 ${esc(c.u)}</div>` : "";
      const back = reverse ? `<div class="fc-word" style="font-size:2rem">${esc(c.w)}</div>${c.p ? `<div class="fc-ipa">${esc(c.p)}</div>` : ""}${usage}<div class="fc-ex mt-2">${exHTML(c)}</div>`
        : `<div class="fc-mean">${esc(c.m)}</div>${usage}<div class="fc-ex">${exHTML(c)}</div>`;
      app.innerHTML = shell(`
        <div class="progress-meta" style="max-width:720px;margin:0 auto 10px"><span>Còn ${queue.length} thẻ${c._dn ? ` · ${esc(c._dn)}` : ""}</span><span>${isKnown(did(deck, c), c.w) ? "✅ Đã thuộc" : ""}</span></div>
        <div class="fc-wrap">
          <div class="fc ${slide ? "fc-slide" : ""}" id="fc">
            <div class="fc-face fc-front">${starBtn(deck, c)}<button class="speak-btn" title="Nghe phát âm">🔊</button>${front}<div class="fc-hint">Bấm vào thẻ hoặc phím <kbd>Space</kbd> để lật</div></div>
            <div class="fc-face fc-back">${starBtn(deck, c)}<button class="speak-btn" title="Nghe phát âm">🔊</button>${back}<div class="fc-hint">Đã nhớ chưa?</div></div>
          </div>
        </div>
        <div class="fc-actions">
          <button class="btn btn-red" id="again">😵 Chưa nhớ <kbd>1</kbd></button>
          <button class="btn btn-outline" id="flip">🔄 Lật <kbd>Space</kbd></button>
          <button class="btn btn-green" id="got">✅ Đã thuộc <kbd>2</kbd></button>
        </div>
        <p class="muted center" style="font-size:.85rem">Từ này khó? Bấm <b>☆</b> trên thẻ hoặc phím <kbd>S</kbd> để lưu vào bộ “⭐ Từ khó của tôi”.</p>`);
      slide = false;
      const fc = app.querySelector("#fc");
      const flip = () => { flipped = !flipped; fc.classList.toggle("flipped", flipped); };
      fc.onclick = (e) => { if (!e.target.closest(".speak-btn, .star-btn")) flip(); };
      const star = () => {
        const on = toggleStar(did(deck, c), c.w);
        app.querySelectorAll(".star-btn").forEach((b) => { b.classList.toggle("on", on); b.textContent = on ? "★" : "☆"; b.setAttribute("aria-pressed", String(on)); b.title = (on ? "Bỏ khỏi" : "Lưu vào") + " Từ khó (phím S)"; });
      };
      app.querySelectorAll(".star-btn").forEach((b) => (b.onclick = (e) => { e.stopPropagation(); star(); }));
      app.querySelectorAll(".speak-btn").forEach((b) => (b.onclick = () => FA.speak(c.w + ". " + c.x, { gender: "f", rate: 0.9 }).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."))));
      const again = () => { setKnown(did(deck, c), c.w, false); FA.daily.add(FA.daily.PTS.item); queue.push(queue.shift()); slide = true; draw(); };
      const got = () => { setKnown(did(deck, c), c.w, true); FA.daily.add(FA.daily.PTS.item); queue.shift(); slide = true; draw(); };
      app.querySelector("#flip").onclick = flip;
      app.querySelector("#again").onclick = again;
      app.querySelector("#got").onclick = got;
      setKeys((e) => {
        if (e.target.matches("input,textarea,select")) return;
        if (e.code === "Space") { e.preventDefault(); flip(); }
        else if (e.key === "1") again();
        else if (e.key === "2") got();
        else if (e.key === "s" || e.key === "S") star();
      });
      bindTop();
    }
    function shell(inner) {
      return `<div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#">← Bộ thẻ</a> / ${esc(deck.name)}</div>
        <div class="row mb-2"><h1 class="page-title mb-0" style="font-size:1.8rem">${deck.emoji} ${esc(deck.name)}</h1><div class="spacer"></div><a class="btn btn-outline btn-sm" href="#${deck.id}/quiz">Kiểm tra nhanh</a></div>
        <div class="tabs">
          <button class="tab ${!showList && !reverse ? "active" : ""}" data-rev="0">Anh → Việt</button>
          <button class="tab ${!showList && reverse ? "active" : ""}" data-rev="1">Việt → Anh</button>
          <button class="tab ${!showList && onlyNew ? "active" : ""}" id="onlyNew">Chỉ từ chưa thuộc</button>
          <button class="tab ${showList ? "active" : ""}" id="listTab">📖 Danh sách từ (${deck.cards.length})</button>
        </div>
        ${inner}
      </div></div>`;
    }
    function bindTop() {
      app.querySelectorAll("[data-rev]").forEach((b) => (b.onclick = () => { showList = false; reverse = b.dataset.rev === "1"; draw(); }));
      const on = app.querySelector("#onlyNew");
      if (on) on.onclick = () => { showList = false; onlyNew = !onlyNew; build(); draw(); };
      const lt = app.querySelector("#listTab");
      if (lt) lt.onclick = () => { showList = !showList; draw(); };
    }
    draw();
  }

  function viewStarEmpty() {
    app.innerHTML = `<div class="page"><div class="container narrow">
      <div class="crumbs"><a href="#">← Bộ thẻ</a> / Từ khó của tôi</div>
      <div class="card empty"><div class="big">⭐</div><h2>Chưa có từ khó nào</h2>
        <p>Khi học thẻ, gặp từ khó thì bấm <b>☆</b> ở góc thẻ (hoặc phím <kbd>S</kbd>) — từ đó sẽ được gom vào đây để bạn ôn riêng.</p>
        <a class="btn btn-primary" href="#">Chọn bộ thẻ để học</a></div>
    </div></div>`;
  }

  /* ---------- kiểm tra nhanh (trắc nghiệm nghĩa) ---------- */
  function viewQuiz(deck) {
    // bộ ít thẻ (vd. Từ khó mới gắn vài sao) thì lấy nghĩa nhiễu từ mọi bộ
    const pool = deck.virtual || deck.cards.length < 4 ? DECKS.reduce((a, d) => a.concat(d.cards), []) : deck.cards;
    const qs = FA.shuffle(deck.cards).slice(0, 10).map((c) => {
      const wrong = FA.shuffle(Array.from(new Set(pool.filter((x) => x.w !== c.w && x.m !== c.m).map((x) => x.m)))).slice(0, 3);
      const o = FA.shuffle([c.m, ...wrong]);
      return { c, o, a: o.indexOf(c.m) };
    });
    let i = 0, score = 0, chosen = null;
    function draw() {
      if (i >= qs.length) {
        const pc = Math.round((score / qs.length) * 100);
        app.innerHTML = wrap(`<div class="card center"><div class="ring-lg" style="--p:${pc};margin:0 auto"><div><b>${score}</b><span>/${qs.length}</span></div></div>
          <h2 class="mt-2">${pc >= 80 ? "Tuyệt vời! ⚡" : pc >= 50 ? "Khá lắm! 💪" : "Ôn thêm chút nhé! 📚"}</h2>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="redo">Làm lại</button><a class="btn btn-outline" href="#${deck.id}">Học thẻ</a><a class="btn btn-ghost" href="#">Bộ khác</a></div></div>`);
        app.querySelector("#redo").onclick = () => viewQuiz(deck);
        setKeys(null);
        return;
      }
      const q = qs[i], ans = chosen != null;
      app.innerHTML = wrap(`
        <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Câu ${i + 1}/${qs.length}</span><span>Đúng ${score}</span></div>
        <div class="q-card">
          <div class="q-part">Chọn nghĩa đúng</div>
          <div class="row"><div class="fc-word" style="font-size:2rem">${esc(q.c.w)}</div><button class="btn btn-ghost btn-sm" id="say">🔊</button></div>
          ${q.c.p ? `<div class="fc-ipa mb-2">${esc(q.c.p)}</div>` : `<div class="mb-2"></div>`}
          ${q.o.map((o, k) => `<button class="opt ${ans ? (k === q.a ? "correct" : k === chosen ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
          ${ans ? `<div class="explain">${chosen === q.a ? "✅ Chính xác!" : "❌ Chưa đúng."} <i>“${esc(q.c.x)}”</i></div>` : ""}
        </div>
        ${ans ? `<div class="exam-nav"><button class="btn btn-ghost btn-sm star-toggle${isStar(did(deck, q.c), q.c.w) ? " on" : ""}" id="qstar">${isStar(did(deck, q.c), q.c.w) ? "★ Đã lưu từ khó" : "☆ Lưu vào Từ khó"}</button><button class="btn btn-primary" id="next">${i < qs.length - 1 ? "Câu tiếp →" : "Xem kết quả"}</button></div>` : ""}`);
      app.querySelector("#say").onclick = () => FA.speak(q.c.w, { gender: "f" }).catch(() => {});
      const pick = (k) => {
        if (chosen != null) return;
        chosen = k;
        FA.daily.add(FA.daily.PTS.item);
        if (k === q.a) { score++; setKnown(did(deck, q.c), q.c.w, true); } else setKnown(did(deck, q.c), q.c.w, false);
        draw();
      };
      app.querySelectorAll(".opt[data-k]").forEach((b) => (b.onclick = () => pick(+b.dataset.k)));
      const qst = app.querySelector("#qstar");
      if (qst) qst.onclick = () => { toggleStar(did(deck, q.c), q.c.w); draw(); };
      const nx = app.querySelector("#next");
      const go = () => { i++; chosen = null; draw(); };
      if (nx) nx.onclick = go;
      setKeys((e) => {
        const m = { 1: 0, 2: 1, 3: 2, 4: 3 };
        if (e.key in m && chosen == null) pick(m[e.key]);
        else if (e.key === "Enter" && chosen != null) go();
      });
    }
    const wrap = (inner) => `<div class="page"><div class="container narrow"><div class="crumbs"><a href="#${deck.id}">← ${esc(deck.name)}</a> / Kiểm tra nhanh</div><h1 class="page-title" style="font-size:1.8rem">${deck.emoji} Kiểm tra: ${esc(deck.name)}</h1>${inner}</div></div>`;
    draw();
  }

  window.addEventListener("fa:synced", () => { if (!location.hash || location.hash === "#") route(); });
  route();
})();
