/* FlashAptis — Dashboard lộ trình học (dashboard.html). Tính toán nằm ở core/roadmap.js; file này chỉ vẽ giao diện.
   Bắt buộc đăng nhập (giống phòng thi). Mục tiêu người dùng lưu ở FA.store "roadmap" (đồng bộ lên tài khoản qua KV_KEYS của cloud.js). */
(function () {
  const FA = window.FA;
  const esc = FA.esc;
  const app = document.getElementById("app");

  const SKILLS = {
    listening: { name: "Listening", icon: "🎧", data: window.FA_LISTENING },
    reading: { name: "Reading", icon: "📖", data: window.FA_READING },
    speaking: { name: "Speaking", icon: "🎙️", data: window.FA_SPEAKING },
    writing: { name: "Writing", icon: "✍️", data: window.FA_WRITING },
    grammar: { name: "Grammar & Vocabulary", icon: "🧩", data: window.FA_GRAMMAR },
  };
  const VOCAB_TOTAL = (window.FA_VOCAB || []).reduce((n, d) => n + d.cards.length, 0);
  const TIPS_TOTAL = 20;
  const DRAFT_TTL = 24 * 3600 * 1000;

  /* ---- đăng nhập (cùng cơ chế với exam.js) ---- */
  const needLogin = () => !!(FA.cloud && FA.cloud.enabled() && !FA.cloud.cachedUser());
  const authPending = () => !!(FA.cloud && FA.cloud.enabled() && !FA.cloud.authKnown() && !FA.cloud.cachedUser());
  let waitTimedOut = false;
  if (FA.cloud && FA.cloud.enabled()) setTimeout(() => { waitTimedOut = true; draw(); }, 6000);

  const goalNow = () => Object.assign({ target: "B2", examDate: "" }, FA.store.get("roadmap", {}));

  function snapshot() {
    const banks = {}, openCount = {};
    Object.keys(SKILLS).forEach((k) => {
      banks[k] = SKILLS[k].data.map((t) => t.id);
      openCount[k] = SKILLS[k].data.filter((t, i) => !(FA.plan && FA.plan.locked(i))).length;
    });
    return FA.roadmap.compute(Object.assign(FA.roadmap.extras(), {
      goal: goalNow(), banks, openCount,
      attempts: FA.store.get("attempts", {}), fcKnown: FA.store.get("fc-known", {}), tipsDone: FA.store.get("tips-done", []),
      vocabTotal: VOCAB_TOTAL, tipsTotal: TIPS_TOTAL, now: Date.now(), activity: FA.daily ? FA.daily.perDay() : undefined,
    }));
  }

  /* ---- kho học liệu: mỗi khu vực của web kèm tiến độ người học (luyện đề, Full Test, ngữ pháp, từ vựng, từ khó, câu sai, mẹo) ---- */
  function library(r) {
    const all = FA.store.get("attempts", {});
    const testsTotal = Object.keys(SKILLS).reduce((n, k) => n + SKILLS[k].data.length, 0);
    const testsDone = Object.keys(SKILLS).reduce((n, k) => n + SKILLS[k].data.filter((t) => (all[k + ":" + t.id] || []).length).length, 0);
    const mh = FA.store.get("mock", {}) || {};
    const mDone = (window.FA_MOCK || []).flatMap((m) => mh[m.id] || []).filter((x) => x.status === "done" && !x.speakPending);
    const vocabAll = VOCAB_TOTAL + (window.FA_VOCAB_INDEX || []).reduce((n, d) => n + d.n, 0);
    const starN = Object.keys(FA.store.get("fc-starred", {}) || {}).length;
    const wrongN = FA.getWrongbook().length;
    const tile = (href, ic, name, val, sub, pct) => `<a class="card rm-lib" href="${href}">
        <span class="rm-lib-ic">${ic}</span>
        <div style="min-width:0;flex:1"><b>${name}</b><div class="rm-lib-val">${val}</div><div class="muted rm-lib-sub">${sub}</div>
        ${pct != null ? `<div class="progress bar"><i style="width:${Math.min(100, pct)}%"></i></div>` : ""}</div></a>`;
    return [
      tile("exam.html", "⚡", "Luyện đề", `${testsDone}<small>/${testsTotal} đề</small>`, "Đề lẻ 5 kỹ năng, chấm ngay", (testsDone / testsTotal) * 100),
      tile("exam.html#/mock", "🏁", "Full Test", mDone.length ? `${Math.max(...mDone.map((x) => x.overall))}<small>/200</small>` : `<small>Chưa thử</small>`, mDone.length ? `Overall cao nhất · ${mDone.length} lượt` : "Thi trọn 5 phần như thật", null),
      r.grammarTotal ? tile(r.grammarNext || "grammar.html", "📘", "Ngữ pháp", `${r.grammarN}<small>/${r.grammarTotal} chủ điểm</small>`, r.grammarBelow ? `Nên ôn chắc cấp ${r.grammarBelow}` : "A1 → C2", (r.grammarN / r.grammarTotal) * 100) : "",
      tile("flashcards.html", "🃏", "Từ vựng", `${r.fcN.toLocaleString("vi-VN")}<small>/${vocabAll.toLocaleString("vi-VN")} từ</small>`, "Bộ CEFR A1–C2 + 23 chủ đề", (r.fcN / vocabAll) * 100),
      tile(starN ? "flashcards.html#starred" : "flashcards.html", "⭐", "Từ đã lưu", `${starN}<small> từ</small>`, starN ? "Ôn riêng các từ đã gắn sao" : "Bấm ☆ khi học thẻ để gom vào", null),
      tile(wrongN ? "exam.html#/gym/wrong" : "exam.html#/gym", "📒", "Sổ câu sai", `${wrongN}<small> câu</small>`, wrongN ? "Ôn lại đến khi làm đúng" : "Câu làm sai sẽ tự lưu vào đây", null),
      tile("tips.html", "💡", "Lộ trình mẹo", `${r.tipN}<small>/${TIPS_TOTAL} mẹo</small>`, "Mẹo làm bài từng kỹ năng", (r.tipN / TIPS_TOTAL) * 100),
    ].join("");
  }

  /* bài đang làm dở (bản nháp ≤ 24 giờ, xem getDraft trong exam.js) */
  function drafts() {
    const out = [];
    ["grammar", "reading", "listening", "writing"].forEach((k) => SKILLS[k].data.forEach((t, i) => {
      if (FA.plan && FA.plan.locked(i)) return;
      const d = FA.store.get("draft:" + k + ":" + t.id, null);
      if (d && d.savedAt && Date.now() - d.savedAt <= DRAFT_TTL) out.push({ k, t, d });
    }));
    return out.sort((a, b) => b.d.savedAt - a.d.savedAt);
  }

  function drawLogin() {
    const checking = authPending() && !waitTimedOut;
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="card empty">
          <div class="big">${checking ? "⏳" : "🔐"}</div>
          <h2>Lộ trình học & tiến độ</h2>
          ${checking ? `<p>Đang kiểm tra đăng nhập…</p>` : `
          <p>Hãy <b>đăng nhập</b> để đặt mục tiêu, theo dõi lộ trình và làm bài. Lịch sử làm bài, mục tiêu, flashcard, ngữ pháp, mẹo, sổ câu sai và chuỗi ngày được lưu theo tài khoản và <b>đồng bộ giữa các thiết bị</b>. Riêng bản nháp bài làm dở và cài đặt giao diện chỉ lưu trên trình duyệt đang dùng.</p>
          <p class="muted" style="font-size:.9rem">Đăng nhập bằng Google hoặc email — miễn phí, chỉ mất vài giây.</p>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="loginBtn">Đăng nhập</button><button class="btn btn-outline" id="signupBtn">Tạo tài khoản</button></div>`}
        </div>
      </div></div>`;
    const lb = app.querySelector("#loginBtn"), sb = app.querySelector("#signupBtn");
    if (lb) lb.onclick = () => FA.cloud.signIn("in");
    if (sb) sb.onclick = () => FA.cloud.signIn("up");
  }

  const fmtDay = (iso) => { const d = new Date(iso + "T00:00:00"); return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }); };

  function drawDash() {
    const r = snapshot();
    const g = goalNow();
    const saved = FA.store.get("roadmap", null);
    const wrongN = FA.getWrongbook().length;
    const dr = drafts();
    const maxDay = Math.max(1, ...r.days.map((d) => d.n));
    const wk = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const countdown = r.daysLeft == null
      ? `<span class="pill gray">Chưa đặt ngày thi</span>`
      : r.daysLeft < 0 ? `<span class="pill gray">Ngày thi đã qua</span>`
        : r.daysLeft === 0 ? `<span class="pill hot">⏰ Thi hôm nay!</span>`
          : `<span class="pill hot">⏳ Còn ${r.daysLeft} ngày</span>`;

    const taskRow = (t) => `
      <li class="rm-task ${t.done ? "done" : ""}">
        <span class="rm-check">${t.done ? "✓" : ""}</span>
        <span class="rm-label">${esc(t.label)}</span>
        ${t.need > 1 && !t.done ? `<span class="muted rm-count">${t.have}/${t.need}</span>` : ""}
        ${t.done ? "" : `<a class="btn btn-outline btn-sm" href="${esc(t.href)}">Làm ngay →</a>`}
      </li>`;

    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <span class="eyebrow">Dashboard</span>
        <h1 class="page-title">🗺️ Lộ trình học của bạn</h1>
        <p class="page-sub">Đặt mục tiêu bậc CEFR, web tự tick từng việc theo bài bạn đã làm và cho biết nên học gì tiếp theo.</p>

        <div class="card rm-hero">
          <div class="result-hero">
            <div class="ring-lg" style="--p:${r.pct}"><div><b>${r.pct}%</b><span>lộ trình</span></div></div>
            <div style="flex:1;min-width:240px">
              <span class="eyebrow">Mục tiêu ${esc(r.target.level)} · Overall ≥ ${r.target.overall}/200</span>
              <div class="row mb-0" style="gap:8px">${countdown}<span class="pill ${r.streak ? "green" : "gray"}">🔥 Chuỗi ${r.streak} ngày</span><span class="pill gray">📅 ${r.activeDays}/14 ngày có học</span></div>
              <div class="mt-2">
                <div class="row" style="align-items:baseline;gap:8px"><b style="font-family:var(--font-head);font-size:1.7rem;color:var(--orange-600)">${r.overall.latest}</b><span class="muted">/200 ước lượng gần nhất${r.overall.scored < 4 ? ` · mới có điểm ${r.overall.scored}/4 kỹ năng` : ""}</span>${r.overall.reached ? `<span class="pill green">✓ Đạt mục tiêu</span>` : ""}</div>
                <div class="progress mt-1" title="So với mục tiêu ${r.target.overall}"><i style="width:${r.overall.pct}%"></i></div>
              </div>
              ${r.complete ? `<p class="mt-2 mb-0"><b>🎉 Bạn đã hoàn thành toàn bộ lộ trình!</b> Hãy duy trì bằng cách luyện đề đều đặn.</p>`
                : r.pace ? `<p class="muted mt-2 mb-0" style="font-size:.92rem">Để kịp ngày thi, nên làm khoảng <b>${r.pace} đề/tuần</b> (còn ${r.remainingTests} đề ở giai đoạn Luyện sâu).</p>` : ""}
            </div>
          </div>
          <form class="rm-goal mt-3" id="goalForm">
            <label>Bậc mục tiêu
              <select class="sel" id="goalLevel">${FA.roadmap.LEVELS.map((l) => `<option value="${l}" ${g.target === l ? "selected" : ""}>${l}</option>`).join("")}</select>
            </label>
            <label>Ngày thi dự kiến
              <input class="inp" type="date" id="goalDate" value="${esc(g.examDate)}">
            </label>
            <button class="btn btn-primary btn-sm" type="submit">${saved ? "Cập nhật mục tiêu" : "Lưu mục tiêu"}</button>
            ${g.examDate ? `<span class="muted" style="font-size:.88rem">Thi ngày ${fmtDay(g.examDate)}</span>` : ""}
          </form>
          ${saved ? "" : `<p class="muted mb-0 mt-1" style="font-size:.85rem">Đang dùng mục tiêu mặc định B2 — bấm “Lưu mục tiêu” để lưu theo tài khoản.</p>`}
        </div>

        ${dr.length || r.next.length ? `
        <h2 class="mt-4">▶ Việc nên làm tiếp</h2>
        <div class="grid grid-2">
          ${dr.slice(0, 2).map((x) => `
            <div class="card rm-next resume">
              <span class="pill hot">⏸ Đang làm dở</span>
              <h3>${SKILLS[x.k].icon} ${esc(x.t.title)}</h3>
              <p class="muted mb-0" style="font-size:.9rem">${esc(SKILLS[x.k].name)} · lưu lúc ${FA.fmtDate(x.d.savedAt)} · còn ${FA.fmtTime(x.d.leftSec || 0)}</p>
              <a class="btn btn-primary btn-sm mt-2" href="exam.html#/${x.k}/${esc(x.t.id)}">Làm tiếp →</a>
            </div>`).join("")}
          ${r.next.map((t) => `
            <div class="card rm-next">
              <span class="pill">Giai đoạn ${r.currentStage + 1}</span>
              <h3>${esc(t.label)}</h3>
              <p class="muted mb-0" style="font-size:.9rem">${t.need > 1 ? `Đã xong ${t.have}/${t.need}` : "Chưa làm"}</p>
              <a class="btn btn-outline btn-sm mt-2" href="${esc(t.href)}">Bắt đầu →</a>
            </div>`).join("")}
        </div>` : ""}

        <h2 class="mt-4">📚 Kho học liệu của bạn</h2>
        <p class="muted" style="font-size:.92rem;margin-top:-4px">Mọi khu vực học trên FlashAptis và tiến độ của bạn ở từng nơi — bấm để vào học tiếp.</p>
        <div class="rm-libs">${library(r)}</div>

        <h2 class="mt-4">Các giai đoạn lộ trình</h2>
        <div class="road rm-road">
          ${r.stages.map((s, i) => `
            <div class="road-item rm-stage ${s.state}">
              <div class="dot">${s.done ? "✓" : i + 1}</div>
              <div class="card">
                <div class="row">
                  <span style="font-size:1.3rem">${s.icon}</span><b style="font-family:var(--font-head)">${esc(s.title)}</b>
                  <span class="pill gray">${esc(s.weeks)}</span>
                  ${s.state === "current" ? `<span class="pill hot">Bạn đang ở đây</span>` : s.done ? `<span class="pill green">Hoàn thành</span>` : ""}
                  <div class="spacer"></div><b>${s.doneTasks}/${s.tasks.length}</b>
                </div>
                <div class="progress mt-1" style="height:6px"><i style="width:${s.pct}%"></i></div>
                <p class="muted mt-1" style="font-size:.9rem">${esc(s.desc)}</p>
                <ul class="rm-tasks">${s.tasks.map(taskRow).join("")}</ul>
              </div>
            </div>`).join("")}
        </div>

        <h2 class="mt-4">Khoảng cách tới mục tiêu theo kỹ năng</h2>
        <div class="grid grid-2">
          ${FA.roadmap.CORE.map((k) => {
            const s = r.skills[k], S = SKILLS[k];
            return `<div class="card" style="padding:18px">
              <div class="row"><span style="font-size:1.3rem">${S.icon}</span><b>${esc(S.name)}</b><div class="spacer"></div>
                ${s.latest == null ? `<span class="pill gray">Chưa có điểm</span>` : s.reached ? `<span class="pill green">✓ Đạt</span>` : `<span class="pill hot">Còn ${s.target - s.latest} điểm</span>`}</div>
              <div class="rm-gauge mt-2" title="Mục tiêu ${s.target}/50"><i style="width:${s.pct}%"></i></div>
              <div class="row mt-1" style="justify-content:space-between;font-size:.88rem">
                <span class="muted">Gần nhất <b>${s.latest == null ? "—" : s.latest}</b> · Cao nhất <b>${s.best == null ? "—" : s.best}</b></span>
                <span class="muted">Mục tiêu <b>${s.target}</b>/50</span>
              </div>
              <div class="muted mt-1" style="font-size:.84rem">Đã làm ${s.done}/${s.total} đề${s.cap < s.total ? ` (gói của bạn mở ${s.cap} đề)` : ""}</div>
              <a class="btn btn-outline btn-sm mt-2" href="exam.html#/${k}${s.nextId ? "/" + esc(s.nextId) : ""}">${s.done ? "Làm đề tiếp theo →" : "Luyện đề ngay →"}</a>
            </div>`;
          }).join("")}
        </div>
        ${r.weakest ? `<div class="explain">💡 Kỹ năng cần ưu tiên: <b>${esc(SKILLS[r.weakest].name)}</b> — mới đạt ${r.skills[r.weakest].pct}% mục tiêu. Làm thêm đề ${esc(SKILLS[r.weakest].name)} và ôn <a href="exam.html#/gym/wrong">Sổ câu sai</a> để nâng điểm.</div>` : ""}

        <h2 class="mt-4">Hoạt động 14 ngày gần đây</h2>
        <div class="card">
          ${FA.daily ? `<div class="row mb-2" style="gap:8px"><span class="pill ${FA.daily.today() >= FA.daily.goal() ? "green" : "hot"}">🎯 Hôm nay ${FA.daily.today()}/${FA.daily.goal()} điểm học${FA.daily.today() >= FA.daily.goal() ? " ✓" : ""}</span><span class="pill gray">🏅 Chuỗi dài nhất ${FA.daily.bestStreak()} ngày</span></div>` : ""}
          <div class="rm-bars" role="img" aria-label="Điểm học mỗi ngày trong 14 ngày gần nhất">
            ${r.days.map((d) => `<div class="rm-bar-col" title="${esc(wk[new Date(d.ts).getDay()])} ${new Date(d.ts).getDate()}/${new Date(d.ts).getMonth() + 1}: ${d.n} điểm học">
              <div class="rm-bar ${d.n ? "on" : ""}" style="height:${d.n ? Math.max(12, Math.round((d.n / maxDay) * 100)) : 4}%"></div>
              <span>${new Date(d.ts).getDate()}</span></div>`).join("")}
          </div>
          <div class="row mt-2" style="font-size:.88rem">
            <span class="muted">Điểm học: nộp 1 đề = 10 · học 1 chủ điểm ngữ pháp = 3 · 1 thẻ flashcard / 1 câu ôn tập = 1.</span><div class="spacer"></div>
            <a class="btn btn-ghost btn-sm" href="exam.html#/progress">📊 Lịch sử chi tiết</a>
          </div>
        </div>
      </div></div>`;

    FA.roadmap.celebrateStages(r); // giai đoạn vừa xong (vd. nhờ flashcard/mẹo) → ăn mừng một lần
    app.querySelector("#goalForm").onsubmit = (e) => {
      e.preventDefault();
      const level = app.querySelector("#goalLevel").value;
      const date = app.querySelector("#goalDate").value;
      FA.store.set("roadmap", { target: level, examDate: date, updatedAt: Date.now() });
      FA.toast("Đã lưu mục tiêu " + level + " ⚡");
      draw();
    };
  }

  function draw() { if (needLogin()) drawLogin(); else drawDash(); }
  draw();
  if (FA.cloud) FA.cloud.onChange(draw);
  if (FA.plan) FA.plan.onChange(draw);
  window.addEventListener("fa:synced", draw);
})();
