/* FlashAptis — Flashcard từ vựng: học lật thẻ + trắc nghiệm nhanh */
(function () {
  const FA = window.FA, esc = FA.esc;
  const app = document.getElementById("app");
  const DECKS = window.FA_VOCAB;
  const known = () => FA.store.get("fc-known", {});
  const isKnown = (deck, w) => !!known()[deck + "|" + w];
  const setKnown = (deck, w, v) => {
    const k = known();
    if (v) k[deck + "|" + w] = Date.now(); else delete k[deck + "|" + w];
    FA.store.set("fc-known", k);
  };
  const deckKnown = (d) => d.cards.filter((c) => isKnown(d.id, c.w)).length;
  let keyHandler = null;
  const setKeys = (fn) => {
    if (keyHandler) document.removeEventListener("keydown", keyHandler);
    keyHandler = fn;
    if (fn) document.addEventListener("keydown", fn);
  };

  function route() {
    setKeys(null);
    FA.stopSpeak();
    const [deckId, mode] = location.hash.replace(/^#\/?/, "").split("/");
    const deck = DECKS.find((d) => d.id === deckId);
    window.scrollTo(0, 0);
    if (!deck) return viewDecks();
    if (mode === "quiz") return viewQuiz(deck);
    viewStudy(deck);
  }
  window.addEventListener("hashchange", route);

  /* ---------- danh sách bộ thẻ ---------- */
  function viewDecks() {
    const total = DECKS.reduce((n, d) => n + d.cards.length, 0);
    const k = DECKS.reduce((n, d) => n + deckKnown(d), 0);
    app.innerHTML = `
      <div class="page"><div class="container">
        <span class="eyebrow">Flashcard</span>
        <h1 class="page-title">⚡ Học từ vựng nhanh như chớp</h1>
        <p class="page-sub">Lật thẻ để xem nghĩa, nghe phát âm, đánh dấu từ đã thuộc. Từ chưa nhớ sẽ quay lại cuối bộ để bạn ôn thêm.</p>
        <div class="card mb-2" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
          <div class="ring" style="--p:${Math.round((k / total) * 100)}" data-label="${Math.round((k / total) * 100)}%"></div>
          <div><b style="font-family:var(--font-head);font-size:1.2rem">${k}/${total} từ đã thuộc</b><div class="muted">Tiến độ được lưu trên máy của bạn.</div></div>
        </div>
        <div class="grid grid-4">
          ${DECKS.map((d) => {
            const n = deckKnown(d);
            return `<div class="card deck-card">
              <div class="emoji">${d.emoji}</div>
              <h3 class="mt-1">${esc(d.name)}</h3>
              <div class="muted" style="font-size:.9rem">${d.cards.length} thẻ · đã thuộc ${n}</div>
              <div class="progress bar"><i style="width:${(n / d.cards.length) * 100}%"></i></div>
              <div class="row mt-2"><a class="btn btn-primary btn-sm" href="#${d.id}">Học thẻ</a><a class="btn btn-outline btn-sm" href="#${d.id}/quiz">Kiểm tra</a></div>
            </div>`;
          }).join("")}
        </div>
      </div></div>`;
  }

  /* ---------- chế độ học lật thẻ ---------- */
  function viewStudy(deck) {
    let onlyNew = deck.cards.some((c) => !isKnown(deck.id, c.w)) && deckKnown(deck) > 0;
    let reverse = false;
    let queue, flipped = false, seen = 0;
    const build = () => {
      queue = FA.shuffle(deck.cards.filter((c) => !onlyNew || !isKnown(deck.id, c.w)));
      seen = 0;
    };
    build();

    function draw() {
      flipped = false;
      const n = deckKnown(deck);
      if (!queue.length) {
        app.innerHTML = shell(`<div class="card empty"><div class="big">🎉</div><h2>Xong bộ thẻ!</h2><p>Bạn đã thuộc ${n}/${deck.cards.length} từ trong bộ “${esc(deck.name)}”.</p>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="restart">Học lại cả bộ</button><a class="btn btn-outline" href="#${deck.id}/quiz">Kiểm tra nhanh</a><a class="btn btn-ghost" href="#">Bộ khác</a></div></div>`);
        app.querySelector("#restart").onclick = () => { onlyNew = false; build(); draw(); };
        bindTop();
        return;
      }
      const c = queue[0];
      const front = reverse ? `<div class="fc-mean" style="font-size:1.8rem">${esc(c.m)}</div><div class="fc-type"><span class="pill gray">${esc(c.t)}</span></div>`
        : `<div class="fc-word">${esc(c.w)}</div>${c.p ? `<div class="fc-ipa">${esc(c.p)}</div>` : ""}<div class="fc-type"><span class="pill gray">${esc(c.t)}</span></div>`;
      const back = reverse ? `<div class="fc-word" style="font-size:2rem">${esc(c.w)}</div>${c.p ? `<div class="fc-ipa">${esc(c.p)}</div>` : ""}<div class="fc-ex mt-2">“${esc(c.x)}”</div>`
        : `<div class="fc-mean">${esc(c.m)}</div><div class="fc-ex">“${esc(c.x)}”</div>`;
      app.innerHTML = shell(`
        <div class="progress-meta" style="max-width:560px;margin:0 auto 10px"><span>Còn ${queue.length} thẻ</span><span>${isKnown(deck.id, c.w) ? "✅ Đã thuộc" : ""}</span></div>
        <div class="fc-wrap">
          <div class="fc" id="fc">
            <div class="fc-face fc-front"><button class="speak-btn" title="Nghe phát âm">🔊</button>${front}<div class="fc-hint">Bấm vào thẻ hoặc phím <kbd>Space</kbd> để lật</div></div>
            <div class="fc-face fc-back"><button class="speak-btn" title="Nghe phát âm">🔊</button>${back}<div class="fc-hint">Đã nhớ chưa?</div></div>
          </div>
        </div>
        <div class="fc-actions">
          <button class="btn btn-red" id="again">😵 Chưa nhớ <kbd>1</kbd></button>
          <button class="btn btn-outline" id="flip">🔄 Lật <kbd>Space</kbd></button>
          <button class="btn btn-green" id="got">✅ Đã thuộc <kbd>2</kbd></button>
        </div>`);
      const fc = app.querySelector("#fc");
      const flip = () => { flipped = !flipped; fc.classList.toggle("flipped", flipped); };
      fc.onclick = (e) => { if (!e.target.closest(".speak-btn")) flip(); };
      app.querySelectorAll(".speak-btn").forEach((b) => (b.onclick = () => FA.speak(c.w + ". " + c.x, { gender: "f", rate: 0.9 }).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."))));
      const again = () => { setKnown(deck.id, c.w, false); queue.push(queue.shift()); draw(); };
      const got = () => { setKnown(deck.id, c.w, true); queue.shift(); draw(); };
      app.querySelector("#flip").onclick = flip;
      app.querySelector("#again").onclick = again;
      app.querySelector("#got").onclick = got;
      setKeys((e) => {
        if (e.code === "Space") { e.preventDefault(); flip(); }
        else if (e.key === "1") again();
        else if (e.key === "2") got();
      });
      bindTop();
    }
    function shell(inner) {
      return `<div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#">← Bộ thẻ</a> / ${esc(deck.name)}</div>
        <div class="row mb-2"><h1 class="page-title mb-0" style="font-size:1.8rem">${deck.emoji} ${esc(deck.name)}</h1><div class="spacer"></div><a class="btn btn-outline btn-sm" href="#${deck.id}/quiz">Kiểm tra nhanh</a></div>
        <div class="tabs">
          <button class="tab ${!reverse ? "active" : ""}" data-rev="0">Anh → Việt</button>
          <button class="tab ${reverse ? "active" : ""}" data-rev="1">Việt → Anh</button>
          <button class="tab ${onlyNew ? "active" : ""}" id="onlyNew">Chỉ từ chưa thuộc</button>
        </div>
        ${inner}
      </div></div>`;
    }
    function bindTop() {
      app.querySelectorAll("[data-rev]").forEach((b) => (b.onclick = () => { reverse = b.dataset.rev === "1"; draw(); }));
      const on = app.querySelector("#onlyNew");
      if (on) on.onclick = () => { onlyNew = !onlyNew; build(); draw(); };
    }
    draw();
  }

  /* ---------- kiểm tra nhanh (trắc nghiệm nghĩa) ---------- */
  function viewQuiz(deck) {
    const qs = FA.shuffle(deck.cards).slice(0, 10).map((c) => {
      const wrong = FA.shuffle(deck.cards.filter((x) => x.w !== c.w)).slice(0, 3).map((x) => x.m);
      const o = FA.shuffle([c.m, ...wrong]);
      return { c, o, a: o.indexOf(c.m) };
    });
    let i = 0, score = 0, chosen = null;
    function draw() {
      if (i >= qs.length) {
        app.innerHTML = wrap(`<div class="card center"><div class="ring-lg" style="--p:${score * 10};margin:0 auto"><div><b>${score}</b><span>/10</span></div></div>
          <h2 class="mt-2">${score >= 8 ? "Tuyệt vời! ⚡" : score >= 5 ? "Khá lắm! 💪" : "Ôn thêm chút nhé! 📚"}</h2>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="redo">Làm lại</button><a class="btn btn-outline" href="#${deck.id}">Học thẻ</a><a class="btn btn-ghost" href="#">Bộ khác</a></div></div>`);
        app.querySelector("#redo").onclick = () => viewQuiz(deck);
        setKeys(null);
        return;
      }
      const q = qs[i], ans = chosen != null;
      app.innerHTML = wrap(`
        <div class="progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Câu ${i + 1}/10</span><span>Đúng ${score}</span></div>
        <div class="q-card">
          <div class="q-part">Chọn nghĩa đúng</div>
          <div class="row"><div class="fc-word" style="font-size:2rem">${esc(q.c.w)}</div><button class="btn btn-ghost btn-sm" id="say">🔊</button></div>
          ${q.c.p ? `<div class="fc-ipa mb-2">${esc(q.c.p)}</div>` : `<div class="mb-2"></div>`}
          ${q.o.map((o, k) => `<button class="opt ${ans ? (k === q.a ? "correct" : k === chosen ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
          ${ans ? `<div class="explain">${chosen === q.a ? "✅ Chính xác!" : "❌ Chưa đúng."} <i>“${esc(q.c.x)}”</i></div>` : ""}
        </div>
        ${ans ? `<div class="exam-nav"><span></span><button class="btn btn-primary" id="next">${i < 9 ? "Câu tiếp →" : "Xem kết quả"}</button></div>` : ""}`);
      app.querySelector("#say").onclick = () => FA.speak(q.c.w, { gender: "f" }).catch(() => {});
      const pick = (k) => {
        if (chosen != null) return;
        chosen = k;
        if (k === q.a) { score++; setKnown(deck.id, q.c.w, true); } else setKnown(deck.id, q.c.w, false);
        draw();
      };
      app.querySelectorAll(".opt[data-k]").forEach((b) => (b.onclick = () => pick(+b.dataset.k)));
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

  route();
})();
