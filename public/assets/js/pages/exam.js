/* FlashAptis — ứng dụng luyện đề (định tuyến bằng hash)
   #/                     chọn kỹ năng
   #/{skill}              danh sách đề
   #/{skill}/{testId}     giới thiệu + làm bài + kết quả
   #/gym, #/gym/wrong     ôn tập & sổ câu sai
   #/mock                 danh sách Full Test
   #/mock/{id}            giới thiệu Full Test (mở phòng thi ở cửa sổ mới)
   #/mock/{id}/run        phòng thi Full Test: 5 phần liền mạch, toàn màn hình, đếm vi phạm rời màn hình */
(function () {
  const FA = window.FA;
  const esc = FA.esc;
  const app = document.getElementById("app");

  const SKILLS = {
    speaking: { name: "Speaking", icon: "🎙️", data: window.FA_SPEAKING, time: 12, meta: "4 part · ghi âm trên trình duyệt",
      desc: "• Thời gian đếm ngược như phòng thi, máy đọc câu hỏi<br>• Điểm chấm dựa trên thu âm câu trả lời của bạn<br>• Bạn có thể nghe lại và so với bài mẫu" },
    listening: { name: "Listening", icon: "🎧", data: window.FA_LISTENING, time: 40, meta: "17 câu hỏi (25 ý) · 40 phút",
      desc: "• Đủ 4 part: 13 câu ngắn, 4 người nói, hội thoại, 2 bài độc thoại<br> • Mỗi đoạn nghe tối đa 2 lần, có transcript tô đậm câu chủ chốt" },
    grammar: { name: "Grammar & Vocabulary", short: "Grammar", icon: "🧩", data: window.FA_GRAMMAR, time: 25, meta: "50 câu trắc nghiệm · 25 phút",
      desc: "• Format: 25 câu ngữ pháp + 25 câu từ vựng<br>• Có lời giải cho các câu sai và chưa làm" },
    reading: { name: "Reading", icon: "📖", data: window.FA_READING, time: 35, meta: "4–5 part · 35 phút",
      desc: "• Điền từ, sắp xếp câu, ghép ý kiến, chọn tiêu đề đoạn văn <br> • Có lời giải cho các câu sai và chưa làm" },
    writing: { name: "Writing", icon: "✍️", data: window.FA_WRITING, time: 50, meta: "4 part · 50 phút",
      desc: "• Đủ 4 part như thi thật, đếm từ tự động <br>• Có thể xem bài mẫu và điểm ước lượng sau khi nộp bài" },
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
  let mockRun = null; // Full Test đang diễn ra (kể cả lúc chuyển giữa 2 phần, khi running = false)
  let curTest = null; // {skill, test} đang làm — để nút "Báo lỗi" biết vị trí
  function clearRun() {
    cleanup.forEach((f) => { try { f(); } catch (e) {} });
    cleanup = [];
    FA.stopSpeak();
    running = false;
  }
  window.addEventListener("beforeunload", (e) => {
    if (running || mockRun) { e.preventDefault(); e.returnValue = ""; }
  });
  window.addEventListener("hashchange", async () => {
    if (ignoreHash) { ignoreHash = false; return; }
    if (running || mockRun) {
      const target = location.hash;
      if (location.hash !== lastHash) { ignoreHash = true; location.hash = lastHash; }
      const msg = mockRun ? "Bạn đang thi Full Test. Thoát ra sẽ kết thúc bài thi — các phần chưa làm tính 0 điểm. Vẫn thoát?" : "Bạn đang làm bài. Thoát ra sẽ mất bài làm hiện tại. Vẫn thoát?";
      if (await FA.confirm(msg, { title: mockRun ? "Bỏ Full Test?" : "Thoát bài thi?", okText: "Vẫn thoát", cancelText: "Làm tiếp", danger: true })) {
        ignoreHash = false;
        if (mockRun) mockEnd("aborted", false);
        clearRun();
        if (location.hash !== target) location.hash = target; else route();
      }
      return;
    }
    route();
  });

  /* ---------- gói Free / Pro (FA.plan, plan.js) ---------- */
  const isLocked = (skill, test) => !!(FA.plan && FA.plan.locked(SKILLS[skill].data.indexOf(test)));
  /* Làm bài (kể cả đề Free) bắt buộc đăng nhập để lưu tiến trình và đồng bộ giữa các thiết bị.
     Không cấu hình Firebase (chạy local không có cloud) thì không chặn. Đang chờ Firebase xác nhận → màn "đang kiểm tra". */
  const needLogin = () => !!(FA.cloud && FA.cloud.enabled() && !FA.cloud.cachedUser());
  const authPending = () => !!(FA.cloud && FA.cloud.enabled() && !FA.cloud.authKnown() && !FA.cloud.cachedUser());
  let authWaitTimedOut = false;
  setTimeout(() => { authWaitTimedOut = true; if (!running && view === "login") route(); }, 6000);
  if (FA.cloud) FA.cloud.onChange(() => { if (!running && (view === "login" || view === "list" || view === "hub")) route(); });
  let view = ""; // màn hình hiện tại — chỉ vẽ lại khi chưa vào bài / chưa ở màn kết quả
  if (FA.plan) FA.plan.onChange(() => { if (!running && (view === "list" || view === "locked" || view === "progress")) route(); });
  // đồng bộ xong → vẽ lại màn danh sách; KHÔNG vẽ lại khi đang thi Full Test, phòng chờ hay màn kết quả Full Test (sẽ mất bài)
  window.addEventListener("fa:synced", () => { if (!running && !mockRun && view && !/^mock(Room|Result|Break)$/.test(view)) route(); });

  let speakUrls = [];
  function revokeSpeakUrls() { speakUrls.forEach((u) => { try { URL.revokeObjectURL(u); } catch (e) {} }); speakUrls = []; }

  function route() {
    clearRun();
    revokeSpeakUrls();
    view = "";
    lastHash = location.hash;
    window.scrollTo(0, 0);
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (!parts.length) return viewHub();
    if (parts[0] === "progress") return viewProgress();
    if (parts[0] === "gym") {
      if (needLogin()) return viewLogin(null, null);
      if (parts[1] !== "wrong") return viewGym(false);
      return parts[2] ? viewWrongAttempt(parts[2], parts[3]) : viewGym(true);
    }
    if (parts[0] === "mock") {
      const m = parts[1] && MOCKS.find((x) => x.id === parts[1]);
      if (!m) return viewMockList();
      if (needLogin()) return viewLogin(null, null, m.title);
      if (mockLocked(m)) return viewMockLocked(m);
      return parts[2] === "run" ? viewMockRoom(m) : viewMockIntro(m);
    }
    const skill = parts[0];
    if (!SKILLS[skill]) return viewHub();
    if (!parts[1]) return viewList(skill);
    const test = SKILLS[skill].data.find((t) => t.id === parts[1]);
    if (!test) return viewList(skill);
    if (needLogin()) return viewLogin(skill, test);
    if (isLocked(skill, test)) return viewLocked(skill, test);
    viewIntro(skill, test);
  }

  /* chưa đăng nhập → phải đăng nhập mới được làm bài */
  /* skill/test = null → màn Ôn tập nhanh (#/gym) cũng phải đăng nhập */
  function viewLogin(skill, test, label) {
    view = "login";
    const S = skill ? SKILLS[skill] : null;
    const back = skill ? `#/${skill}` : "#/";
    const checking = authPending() && !authWaitTimedOut;
    const name = label || "Ôn tập nhanh";
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs">${skill ? `<a href="#/${skill}">← Chọn đề</a> / ${esc(test.title)}` : `<a href="#/">← Kỹ năng</a> / ${esc(name)}`}</div>
        <div class="card empty">
          <div class="big">${checking ? "⏳" : "🔐"}</div>
          <h2>${skill ? `${esc(test.title)} — ${esc(S.name)}` : esc(name)}</h2>
          ${checking ? `<p>Đang kiểm tra đăng nhập…</p>` : `
          <p>Hãy <b>đăng nhập</b> để làm bài. Tiến trình của bạn (đề nào đang làm dở, đề nào đã hoàn thành, điểm số) sẽ được lưu theo tài khoản và <b>đồng bộ khi bạn dùng thiết bị khác</b>.</p>
          <p class="muted" style="font-size:.9rem">Đăng nhập bằng Google hoặc email — miễn phí, chỉ mất vài giây. Đề Free vẫn miễn phí.</p>
          <div class="row" style="justify-content:center"><button class="btn btn-primary" id="loginBtn">Đăng nhập</button><button class="btn btn-outline" id="signupBtn">Tạo tài khoản</button><a class="btn btn-ghost" href="${back}">${skill ? "← Chọn đề khác" : "← Về trang kỹ năng"}</a></div>`}
        </div>
      </div></div>`;
    const lb = app.querySelector("#loginBtn"), sb = app.querySelector("#signupBtn");
    if (lb) lb.onclick = () => FA.cloud.signIn("in");
    if (sb) sb.onclick = () => FA.cloud.signIn("up");
  }

  /* đề Pro mà người dùng chưa có Pro */
  function viewLocked(skill, test) {
    view = "locked";
    const S = SKILLS[skill], P = FA.PLAN;
    const checking = !FA.plan.loaded();
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/${skill}">← Chọn đề</a> / ${esc(test.title)}</div>
        <div class="card empty">
          <div class="big">${checking ? "⏳" : "🔒"}</div>
          <h2>${esc(test.title)} — ${esc(S.name)}</h2>
          ${checking ? `<p>Đang kiểm tra gói tài khoản…</p>` : `
          <p>Đề này dành cho gói <b>Pro</b>. Gói Free làm được ${P.freeTests} đề đầu của mỗi kỹ năng.</p>
          <p>Pro: toàn bộ đề + AI chấm Writing ${P.aiPerDay.pro} lượt/ngày — chỉ ${FA.plan.fmtVND(P.price)}/${P.days} ngày.</p>
          <div class="row" style="justify-content:center"><a class="btn btn-primary" href="pricing.html">Nâng cấp Pro</a><a class="btn btn-ghost" href="#/${skill}">Chọn đề Free</a></div>`}
        </div>
      </div></div>`;
  }

  function startTimer(sec, el, onEnd) {
    const end = Date.now() + sec * 1000;
    let id;
    const stop = () => clearInterval(id);
    const leftSec = () => Math.max(0, Math.round((end - Date.now()) / 1000));
    const tick = () => {
      const left = (end - Date.now()) / 1000;
      el.textContent = FA.fmtTime(left);
      el.classList.toggle("warn", left < 60);
      if (left <= 0) { stop(); onEnd(); }
    };
    id = setInterval(tick, 500);
    tick();
    cleanup.push(stop);
    return leftSec;
  }

  /* thanh trên cùng của phòng thi */
  function examShell(title, timeMin) {
    app.innerHTML = `
      <div class="page"><div class="container narrow" id="examContainer">
        ${mockRun ? mockStripHTML() : ""}
        <div class="exam-top row">
          <div><div class="crumbs mb-0">${esc(title)}</div></div>
          <div class="spacer"></div>
          <div class="exam-bar">
            ${timeMin ? `<div class="timer" id="timer">--:--</div>` : ""}
            ${FA.reportBtn({ live: true }, "Báo lỗi")}
            <button class="btn btn-primary btn-sm" id="submitBtn">Nộp bài</button>
            <button class="btn btn-ghost btn-sm" id="exitBtn">${mockRun ? "Bỏ thi" : "Thoát"}</button>
          </div>
        </div>
        <div id="stage"></div>
      </div></div>`;
    running = true;
    app.querySelector("#exitBtn").onclick = async () => {
      if (mockRun) {
        if (await FA.confirm("Kết thúc Full Test ngay? Phần đang làm và các phần chưa làm tính 0 điểm.", { title: "Bỏ Full Test?", okText: "Kết thúc", cancelText: "Làm tiếp", danger: true })) { clearRun(); mockEnd("aborted"); }
        return;
      }
      const seg = location.hash.replace(/^#\/?/, "").split("/")[0];
      location.hash = "#/" + (seg || "");
    };
    return { box: app.querySelector("#examContainer"), stage: app.querySelector("#stage"), timer: app.querySelector("#timer"), submit: app.querySelector("#submitBtn") };
  }

  /* ======================================================
     HUB & TIẾN ĐỘ TỔNG HỢP
     ====================================================== */
  const CORE_SKILLS = ["listening", "reading", "speaking", "writing"];
  function progressStats() {
    const all = FA.store.get("attempts", {});
    const bySkill = {}, timeline = [];
    Object.keys(SKILLS).forEach((skill) => {
      const list = [];
      let doneTests = 0;
      SKILLS[skill].data.forEach((test) => {
        const recs = all[skill + ":" + test.id] || [];
        if (recs.length) doneTests++;
        recs.forEach((r) => {
          const item = Object.assign({ skill, test }, r);
          list.push(item);
          timeline.push(item);
        });
      });
      list.sort((a, b) => b.at - a.at);
      const best = list.slice().sort((a, b) => b.score - a.score || b.at - a.at)[0] || null;
      bySkill[skill] = { list, latest: list[0] || null, best, doneTests, totalTests: SKILLS[skill].data.length };
    });
    timeline.sort((a, b) => b.at - a.at);
    const overall = (mode) => CORE_SKILLS.reduce((n, k) => n + (bySkill[k][mode] ? bySkill[k][mode].score : 0), 0);
    const doneCore = CORE_SKILLS.filter((k) => bySkill[k].latest).length;
    return { bySkill, timeline, overall, doneCore };
  }

  /* ---------- trang chính Luyện đề: thấy toàn cảnh kho đề + gợi ý đề nên làm tiếp ---------- */
  const EXAM_ORDER = ["grammar", "listening", "reading", "writing", "speaking"]; // đúng thứ tự một buổi thi Aptis
  const HUB_FACTS = [
    ["🧩", "Grammar & Vocabulary <b>không cộng vào điểm Overall</b>, nhưng được dùng để xét khi điểm một kỹ năng nằm sát ngưỡng giữa hai bậc."],
    ["🎧", "Mỗi đoạn Listening chỉ được nghe <b>tối đa 2 lần</b> — lần đầu nắm ý chính, lần hai bắt chi tiết."],
    ["🎯", "Muốn đạt <b>B2</b> cần Overall khoảng <b>120/200</b> — trung bình 30/50 mỗi kỹ năng là bạn đã chạm ngưỡng."],
    ["✍️", "Writing Part 4 chiếm <b>40% điểm Writing</b>: một email thân mật ~50 từ và một email trang trọng 120–150 từ."],
    ["🎙️", "Speaking Part 4 cho <b>1 phút chuẩn bị, 2 phút nói</b> — ghi từ khóa thay vì viết câu sẽ nói trôi hơn nhiều."],
    ["📖", "Reading có bài <b>sắp xếp câu</b>: tìm câu mở đầu trước — câu không bắt đầu bằng từ nối hay đại từ (However, Then, This, He…) thường đứng đầu."],
    ["⏱️", "Cả bài thi Aptis đủ 5 phần mất khoảng <b>2 giờ 40 phút</b> — Full Test giúp bạn quen nhịp độ đó trước ngày thi."],
    ["🔁", "Câu bạn làm sai được tự lưu vào <b>Sổ câu sai</b> — ôn lại đến khi đúng thì câu đó tự biến mất."],
  ];
  function hubSuggest(stats) {
    // 1) bài đang làm dở  2) kỹ năng chưa thử lần nào (theo thứ tự buổi thi)  3) kỹ năng chính có điểm gần nhất thấp nhất
    for (const k of EXAM_ORDER) {
      const t = SKILLS[k].data.find((x) => !isLocked(k, x) && DRAFT_SKILLS.includes(k) && getDraft(k, x.id));
      if (t) return { k, t, why: "Bạn đang làm dở đề này — làm tiếp kẻo quên nhé!", cta: "▶ Làm tiếp" };
    }
    const fresh = EXAM_ORDER.find((k) => !stats.bySkill[k].latest);
    const k = fresh || CORE_SKILLS.slice().sort((a, b) => stats.bySkill[a].latest.score - stats.bySkill[b].latest.score)[0];
    const open = SKILLS[k].data.filter((x) => !isLocked(k, x));
    const t = open.find((x) => !FA.getAttempts(k, x.id).length) || open[0];
    if (!t) return null;
    const why = !stats.timeline.length ? "Bắt đầu từ phần đầu tiên của bài thi thật — 25 phút là biết mình đang ở đâu."
      : fresh ? `Bạn chưa thử ${short(k)} lần nào — làm một đề để biết điểm xuất phát.`
      : `${short(k)} đang là kỹ năng thấp nhất của bạn (${stats.bySkill[k].latest.score}/50) — luyện thêm để kéo Overall lên.`;
    return { k, t, why, cta: "Làm ngay →" };
  }

  function viewHub() {
    view = "hub";
    const wrongN = FA.getWrongbook().length;
    const stats = progressStats();
    const ov = stats.overall("latest");
    const totalTests = EXAM_ORDER.reduce((n, k) => n + SKILLS[k].data.length, 0);
    const doneTests = EXAM_ORDER.reduce((n, k) => n + stats.bySkill[k].doneTests, 0);
    const totalQ = window.FA_GRAMMAR.reduce((n, t) => n + t.questions.length, 0) + window.FA_LISTENING.length * 17;
    const sg = hubSuggest(stats);
    const fact = HUB_FACTS[Math.floor(Math.random() * HUB_FACTS.length)];
    const minutes = (k) => (k === "speaking" ? "~12" : SKILLS[k].time);
    const mockDone = MOCKS.flatMap((m) => mockHist(m.id)).filter((x) => x.status === "done" && !x.speakPending);
    const mockBest = mockDone.length ? Math.max(...mockDone.map((x) => x.overall)) : null;
    app.innerHTML = `
      <div class="page"><div class="container">
        ${needLogin() ? LOGIN_NOTE : ""}
        <section class="hub-hero">
          <div class="hub-hero-l">
            <span class="eyebrow">Luyện đề Aptis</span>
            <h1 class="page-title">Kho đề Aptis <span class="nowrap">đủ 5 kỹ năng.</span><br><span class="hub-accent">Làm xong biết điểm ngay.</span></h1>
            <p class="page-sub mb-2">Đúng format thi thật trên máy, bấm giờ từng phần, chấm điểm và giải thích từng câu. Chọn một kỹ năng bên dưới — hoặc để FlashAptis gợi ý đề hợp với bạn.</p>
            <div class="hub-stats">
              <div><b>${totalTests}</b><span>đề lẻ</span></div>
              <div><b>${MOCKS.length}</b><span>Full Test</span></div>
              <div><b>${totalQ.toLocaleString("vi-VN")}+</b><span>câu hỏi</span></div>
              <div><b>${doneTests}</b><span>đề bạn đã làm</span></div>
            </div>
          </div>
          <div class="hub-hero-r">
            ${sg ? `<div class="hub-suggest">
              <span class="hub-tag">✨ Gợi ý cho bạn</span>
              <div class="hub-sg-skill">${SKILLS[sg.k].icon} ${esc(SKILLS[sg.k].name)}</div>
              <div class="hub-sg-test">${esc(sg.t.title)}${sg.t.club ? ` · ${esc(sg.t.club)}` : ""}</div>
              <p>${esc(sg.why)}</p>
              <div class="row"><a class="btn btn-primary" href="#/${sg.k}/${sg.t.id}">${sg.cta}</a><span class="muted" style="font-size:.88rem">⏱ ${minutes(sg.k)} phút</span></div>
            </div>` : ""}
            ${stats.timeline.length ? `<a class="hub-overall" href="#/progress">
              <div class="ring" style="--p:${Math.round((ov / 200) * 100)}" data-label="${ov}"></div>
              <div><b>Overall ước lượng ${ov}/200 · ${FA.toCEFR("overall", ov)}</b><span>Đã làm ${stats.doneCore}/4 kỹ năng chính · xem bảng tiến độ →</span></div>
            </a>` : ""}
          </div>
        </section>

        <section class="hub-journey">
          <div class="row mb-1"><h2 class="mb-0">🗺️ Một buổi thi Aptis diễn ra thế nào?</h2><div class="spacer"></div><a class="muted" href="guide.html" style="font-size:.9rem">Xem cấu trúc chi tiết →</a></div>
          <p class="muted mb-2" style="font-size:.92rem">5 phần liên tiếp trên máy tính — bấm vào phần bất kỳ để luyện riêng phần đó.</p>
          <ol class="hub-steps">
            ${EXAM_ORDER.map((k, i) => `<li><a href="#/${k}">
              <span class="hub-step-n">${i + 1}</span><span class="hub-step-ic">${SKILLS[k].icon}</span>
              <b>${esc(short(k))}</b><span class="muted">${minutes(k)} phút</span>
            </a></li>`).join("")}
          </ol>
        </section>

        <div class="row mt-4 mb-2"><h2 class="mb-0">Luyện theo kỹ năng</h2><div class="spacer"></div><a class="btn btn-ghost btn-sm" href="#/progress">📊 Bảng tiến độ & lịch sử</a></div>
        <div class="hub-skills">
          ${EXAM_ORDER.map((k) => {
            const s = SKILLS[k], b = stats.bySkill[k], n = s.data.length;
            const freeN = FA.plan ? s.data.filter((t) => !isLocked(k, t)).length : n;
            const best = b.best ? b.best.score : null, lv = best != null && FA.CEFR[k] ? FA.toCEFR(k, best) : "";
            const left = n - b.doneTests;
            return `<a class="card hub-skill" href="#/${k}">
              <div class="hub-skill-top"><span class="hub-skill-ic">${s.icon}</span>
                ${best != null ? `<span class="hub-best" title="Điểm cao nhất của bạn">🏆 ${best}/50${lv ? ` · ${lv}` : ""}</span>` : `<span class="pill hot">Chưa thử</span>`}</div>
              <h3>${esc(s.name)}</h3>
              <div class="muted hub-meta">${esc(s.meta)}</div>
              <p>${s.desc}</p>
              <div class="hub-prog"><div class="progress bar"><i style="width:${(b.doneTests / n) * 100}%"></i></div><span>${b.doneTests}/${n} đề</span></div>
              <div class="hub-skill-foot"><span class="muted">${left ? `🔥 ${left} đề chưa làm` : "🎉 Đã làm hết"}${FA.plan && freeN < n ? ` · ${freeN} đề Free` : ""}</span><span class="go">Vào luyện →</span></div>
            </a>`;
          }).join("")}
          <a class="card hub-skill hub-mock" href="#/mock">
            <div class="hub-skill-top"><span class="hub-skill-ic">🏁</span><span class="hub-best hub-best-hot">Thử thách lớn</span></div>
            <h3>Full Test — thi như thật</h3>
            <div class="muted hub-meta">5 phần liền mạch · khoảng ${MOCK_MIN} phút · ${MOCKS.length} đề</div>
            <p>Bấm giờ từng phần, phòng thi toàn màn hình, rời màn hình là bị cảnh báo. Cuối bài ra Overall /200 và bậc CEFR. <b>Bạn trụ được bao lâu?</b></p>
            <div class="hub-skill-foot"><span class="muted">${mockBest != null ? `🏆 Cao nhất ${mockBest}/200` : "🎯 Bạn chưa thử lần nào"}</span><span class="go">Vào Full Test →</span></div>
          </a>
        </div>

        <div class="hub-tiles">
          <a class="card hub-tile" href="#/gym"><span class="hub-tile-ic">⚡</span><div><b>Ôn tập nhanh</b><span>10 câu, không bấm giờ, chọn là biết đúng sai</span></div></a>
          <a class="card hub-tile" href="#/gym/wrong"><span class="hub-tile-ic">📒</span><div><b>Sổ câu sai${wrongN ? ` <span class="pill">${wrongN}</span>` : ""}</b><span>${wrongN ? "Ôn lại các câu từng làm sai" : "Câu làm sai sẽ tự lưu vào đây"}</span></div></a>
          <a class="card hub-tile" href="grammar.html"><span class="hub-tile-ic">📘</span><div><b>Học ngữ pháp</b><span>101 chủ điểm A1–C2 trước khi vào đề</span></div></a>
        </div>

        <div class="card hub-fact">
          <span class="hub-fact-ic" id="factIc">${fact[0]}</span>
          <div style="flex:1"><span class="hub-tag">💡 Bạn có biết?</span><p class="mb-0" id="factTx">${fact[1]}</p></div>
          <button class="btn btn-ghost btn-sm" id="factNext" type="button">Mẹo khác ↻</button>
        </div>
      </div></div>`;
    bindLoginLinks();
    let fi = HUB_FACTS.indexOf(fact);
    app.querySelector("#factNext").onclick = () => {
      fi = (fi + 1) % HUB_FACTS.length;
      app.querySelector("#factIc").textContent = HUB_FACTS[fi][0];
      app.querySelector("#factTx").innerHTML = HUB_FACTS[fi][1];
      FA.fxIn(app.querySelector(".hub-fact"));
    };
  }

  function viewProgress() {
    view = "progress";
    const stats = progressStats();
    let mode = "latest";
    const wrongN = FA.getWrongbook().length;
    const fcN = Object.keys(FA.store.get("fc-known", {})).length;
    const tipN = FA.store.get("tips-done", []).length;
    const ovNext = (ov) => {
      const t = FA.CEFR.overall.slice().reverse();
      const nx = t.find(([min]) => ov < min);
      return nx ? `còn ${nx[0] - ov} điểm lên ${nx[1]}` : "đã đạt bậc cao nhất";
    };

    const draw = () => {
      const ov = stats.overall(mode);
      const ovLv = FA.toCEFR("overall", ov);
      const miss = CORE_SKILLS.filter((k) => !stats.bySkill[k].latest).map((k) => short(k));
      app.innerHTML = `
        <div class="page"><div class="container narrow">
          <div class="crumbs"><a href="#/">← Kỹ năng</a> / Tiến độ & lịch sử</div>
          <div class="row mb-2">
            <div><h1 class="page-title mb-0">📊 Bảng tiến độ học tập</h1></div>
            <div class="spacer"></div>
            <div class="tabs mb-0">
              <button class="tab ${mode === "latest" ? "active" : ""}" data-m="latest">Điểm gần nhất</button>
              <button class="tab ${mode === "best" ? "active" : ""}" data-m="best">Điểm cao nhất</button>
            </div>
          </div>

          <div class="card">
            <div class="result-hero">
              <div class="ring-lg" style="--p:${Math.round((ov / 200) * 100)}"><div><b>${ov}</b><span>/200</span></div></div>
              <div>
                <span class="eyebrow">Overall ước lượng (${mode === "latest" ? "lần gần nhất" : "điểm cao nhất"})</span>
                <div class="row"><span class="cefr-badge">${ovLv}</span><span class="muted">· ${ovNext(ov)}</span></div>
                <p class="muted mt-1 mb-0" style="font-size:.9rem">${miss.length ? `Còn ${miss.length} kỹ năng chưa thi (${esc(miss.join(", "))}) — hoàn thành đủ 4 kỹ năng chính để ước lượng Overall sát hơn.` : "Đã có điểm cả 4 kỹ năng chính (Listening + Reading + Speaking + Writing)."}</p>
                <div class="breakdown">
                  ${CORE_SKILLS.map((k) => {
                    const pick = stats.bySkill[k][mode];
                    const sc = pick ? pick.score : 0;
                    return `<div class="bar-row"><span>${SKILLS[k].icon} ${esc(short(k))}</span><div class="progress"><i style="width:${sc * 2}%"></i></div><b>${pick ? `${sc}/50` : "—"}</b></div>`;
                  }).join("")}
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <a class="btn btn-outline btn-sm" href="calculator.html">🧮 Mở máy tính CEFR</a>
              <a class="btn btn-ghost btn-sm" href="#/gym/wrong">📒 Sổ câu sai (${wrongN})</a>
              <a class="btn btn-ghost btn-sm" href="flashcards.html">⚡ Flashcard (${fcN} từ đã thuộc)</a>
              <a class="btn btn-ghost btn-sm" href="tips.html">💡 Mẹo (${tipN}/20)</a>
            </div>
          </div>

          ${(() => {
            const doing = [];
            Object.entries(SKILLS).forEach(([k, s]) => DRAFT_SKILLS.includes(k) && s.data.forEach((t) => { const d = getDraft(k, t.id); if (d) doing.push({ k, s, t, d }); }));
            doing.sort((x, y) => y.d.savedAt - x.d.savedAt);
            return doing.length ? `<h2 class="mt-4">⏸ Bài đang làm dở (${doing.length})</h2>
              <div class="tbl-wrap"><table class="tbl"><tr><th>Kỹ năng</th><th>Đề</th><th>Lưu lúc</th><th>Thời gian còn</th><th></th></tr>
              ${doing.map((x) => `<tr><td>${x.s.icon} ${esc(short(x.k))}</td><td>${esc(x.t.title)}</td><td>${FA.fmtDate(x.d.savedAt)}</td><td>${FA.fmtTime(x.d.leftSec || 0)}</td>
                <td>${isLocked(x.k, x.t) ? `<a class="pill pro" href="pricing.html">🔒 Pro</a>` : `<a class="btn btn-primary btn-sm" href="#/${x.k}/${esc(x.t.id)}">▶ Làm tiếp</a>`}</td></tr>`).join("")}
              </table></div>
              <p class="muted" style="font-size:.85rem">Bản nháp lưu trên máy này tối đa 24 giờ.</p>` : "";
          })()}

          <h2 class="mt-4">Chi tiết theo kỹ năng</h2>
          <div class="grid grid-2">
            ${Object.entries(SKILLS).map(([k, s]) => {
              const b = stats.bySkill[k];
              const pick = b[mode];
              const trend = b.list.slice(0, 6).reverse();
              return `<div class="card" style="padding:18px">
                <div class="row"><span style="font-size:1.3rem">${s.icon}</span><b>${esc(s.name)}</b><div class="spacer"></div><span class="pill ${b.doneTests ? "green" : "gray"}">${b.doneTests}/${b.totalTests} đề</span></div>
                <div class="progress mt-1" style="height:6px" title="Đã hoàn thành ${b.doneTests}/${b.totalTests} đề"><i style="width:${b.totalTests ? Math.round((b.doneTests / b.totalTests) * 100) : 0}%"></i></div>
                ${(() => { const n = DRAFT_SKILLS.includes(k) ? s.data.filter((t) => getDraft(k, t.id)).length : 0; return n ? `<div class="muted mt-1" style="font-size:.84rem">⏸ ${n} đề đang làm dở</div>` : ""; })()}
                ${pick ? `
                  <div class="row mt-2" style="align-items:baseline">
                    <b style="font-family:var(--font-head);font-size:1.7rem;color:var(--orange-600)">${pick.score}</b><span class="muted">/50</span>
                    ${pick.cefr ? `<span class="pill">${esc(pick.cefr)}</span>` : ""}
                    <span class="muted" style="font-size:.82rem">· ${esc(pick.test.title)}</span>
                  </div>
                  <div class="muted" style="font-size:.84rem">Gần nhất: <b>${b.latest.score}</b> · Cao nhất: <b>${b.best.score}</b> · Tổng ${b.list.length} lượt</div>
                  ${trend.length > 1 ? `<div class="row mt-1" style="gap:4px">${trend.map((x) => `<span class="pill gray" title="${FA.fmtDate(x.at)}: ${x.score}/50">${x.score}</span>`).join("")}</div>` : ""}
                ` : `<p class="muted mt-2 mb-0" style="font-size:.9rem">Chưa làm đề nào.</p>`}
                <div class="row mt-2">
                  <a class="btn btn-primary btn-sm" href="#/${k}">${pick ? "Làm tiếp →" : "Luyện đề ngay →"}</a>
                  ${pick && pick.ans && !isLocked(k, pick.test) ? `<button class="btn btn-outline btn-sm" data-preplay="${k}:${esc(pick.test.id)}:${pick.at}">👁 Xem lại</button>` : ""}
                </div>
              </div>`;
            }).join("")}
          </div>

          <h2 class="mt-4">Lịch sử làm bài gần đây</h2>
          ${stats.timeline.length ? `<div class="tbl-wrap"><table class="tbl">
            <tr><th>Thời gian</th><th>Kỹ năng</th><th>Đề</th><th>Điểm</th><th></th></tr>
            ${stats.timeline.slice(0, 15).map((r) => `<tr>
              <td>${FA.fmtDate(r.at)}</td>
              <td>${SKILLS[r.skill].icon} ${esc(short(r.skill))}</td>
              <td>${esc(r.test.title)}</td>
              <td><b>${r.score}</b>/50${r.cefr ? ` · ${esc(r.cefr)}` : ""}</td>
              <td>${r.ans ? (isLocked(r.skill, r.test) ? `<a class="pill pro" href="pricing.html">🔒 Pro</a>` : `<button class="btn btn-outline btn-sm" data-preplay="${r.skill}:${esc(r.test.id)}:${r.at}">👁 Xem lại</button>`) : `<span class="muted">—</span>`}</td>
            </tr>`).join("")}
          </table></div>` : `<div class="card empty"><div class="big">📝</div><p>Bạn chưa có lượt làm bài nào. Chọn một kỹ năng để bắt đầu!</p><a class="btn btn-primary" href="#/">Chọn kỹ năng</a></div>`}
        </div></div>`;

      app.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { mode = b.dataset.m; draw(); }));
      app.querySelectorAll("[data-preplay]").forEach((b) => (b.onclick = () => {
        const [sk, tid, at] = b.dataset.preplay.split(":");
        const test = SKILLS[sk] && SKILLS[sk].data.find((t) => t.id === tid);
        const rec = stats.timeline.find((x) => x.skill === sk && x.test.id === tid && String(x.at) === at);
        if (test && rec && !isLocked(sk, test)) RUNNERS[sk](test, rec);
      }));
    };
    draw();
  }

  /* ======================================================
     DANH SÁCH ĐỀ
     ====================================================== */
  /* trạng thái một đề: chưa làm / đang làm dở (có bản nháp) / đã hoàn thành (có lượt nộp bài) */
  const DRAFT_SKILLS = ["grammar", "reading", "listening", "writing"];
  function testStatus(skill, t) {
    const hist = FA.getAttempts(skill, t.id);
    const draft = DRAFT_SKILLS.includes(skill) ? getDraft(skill, t.id) : null;
    const best = hist.reduce((m, h) => (m == null || h.score > m ? h.score : m), null);
    return { hist, draft, best, latest: hist[0] || null, state: draft ? "doing" : hist.length ? "done" : "new" };
  }
  const LOGIN_NOTE = `<div class="explain mb-2">🔐 Bạn cần <b>đăng nhập</b> để làm bài — tiến trình (đề đang làm dở, đã hoàn thành, điểm số) được lưu theo tài khoản và đồng bộ giữa các thiết bị. <a href="#" data-login="in">Đăng nhập</a> · <a href="#" data-login="up">Tạo tài khoản</a></div>`;
  const LIST_FILTERS = [["all", "Tất cả"], ["new", "Chưa làm"], ["doing", "Đang làm dở"], ["done", "Đã hoàn thành"]];
  const listFilterKey = (skill) => "flashaptis:listFilter:" + skill;

  function viewList(skill) {
    view = "list";
    const S = SKILLS[skill];
    const rows = S.data.map((t, i) => Object.assign({ t, i, locked: isLocked(skill, t), pro: !!(FA.plan && i >= FA.PLAN.freeTests) }, testStatus(skill, t)));
    const count = (st) => rows.filter((r) => st === "all" || r.state === st).length;
    const done = rows.filter((r) => r.hist.length).length;
    const bests = rows.filter((r) => r.best != null).map((r) => r.best);
    const avg = bests.length ? Math.round(bests.reduce((x, y) => x + y, 0) / bests.length) : null;
    const next = rows.find((r) => r.state === "doing" && !r.locked) || rows.find((r) => r.state === "new" && !r.locked);
    let filter = "all";
    try { filter = localStorage.getItem(listFilterKey(skill)) || "all"; } catch (e) {}
    if (!LIST_FILTERS.some(([k]) => k === filter)) filter = "all";

    const card = (r) => {
      const t = r.t;
      const badge = r.pro ? `<span class="pill pro">${r.locked ? "🔒 " : ""}⭐ Pro</span>` : t.hot ? `<span class="pill hot">🔥 Đề trọng điểm</span>` : `<span class="pill green">Miễn phí</span>`;
      const status = r.state === "doing"
        ? `<span class="tc-status doing">⏸ Đang làm dở</span><span class="muted">lưu lúc ${FA.fmtDate(r.draft.savedAt)}${r.hist.length ? ` · đã nộp ${r.hist.length} lần` : ""}</span>`
        : r.state === "done"
          ? `<span class="tc-status done">✓ Đã hoàn thành</span><span class="muted">cao nhất <b>${r.best}/50</b> · ${r.hist.length} lần · gần nhất ${FA.fmtDate(r.latest.at)}</span>`
          : `<span class="tc-status new">○ Chưa làm</span>`;
      const cta = r.locked ? "Nâng cấp Pro để làm" : r.state === "doing" ? "Làm tiếp →" : r.state === "done" ? "Làm lại / xem lịch sử →" : "Bắt đầu →";
      return `<a class="card test-card state-${r.state}${r.locked ? " locked" : ""}" href="#/${skill}/${t.id}">
        <div class="row" style="gap:6px">${badge}${r.latest && r.latest.cefr ? `<span class="pill gray">${esc(r.latest.cefr)}</span>` : ""}</div>
        <h3>${esc(t.title)}</h3>
        <div class="meta">${S.meta}</div>
        <div class="tc-line">${status}</div>
        ${r.best != null ? `<div class="progress tc-bar" title="Điểm cao nhất ${r.best}/50"><i style="width:${r.best * 2}%"></i></div>` : ""}
        <div class="go">${cta}</div>
      </a>`;
    };

    const draw = () => {
      const shown = rows.filter((r) => filter === "all" || r.state === filter);
      app.innerHTML = `
      <div class="page"><div class="container">
        <div class="crumbs"><a href="#/">← Kỹ năng</a> / ${esc(S.name)}</div>
        <h1 class="page-title">${S.icon}  ${esc(short(skill))}</h1>
        <p class="page-sub">${S.desc}</p>
        ${needLogin() ? LOGIN_NOTE : ""}
        <div class="card list-summary">
          <div class="ls-main">
            <div class="row" style="align-items:baseline;gap:8px"><b class="ls-num">${done}/${rows.length}</b><span class="muted">đề đã hoàn thành</span></div>
            <div class="progress mt-1"><i style="width:${rows.length ? Math.round((done / rows.length) * 100) : 0}%"></i></div>
            <div class="muted mt-1" style="font-size:.88rem">${count("doing") ? `⏸ ${count("doing")} đề đang làm dở · ` : ""}${avg != null ? `Điểm cao nhất trung bình <b>${avg}/50</b>` : "Bạn chưa nộp đề nào ở kỹ năng này."}</div>
          </div>
          ${next ? `<a class="btn btn-primary" href="#/${skill}/${next.t.id}">${next.state === "doing" ? "▶ Làm tiếp" : "▶ Làm đề tiếp theo"}: ${esc(next.t.title.split(" — ")[0])}</a>` : ""}
        </div>
        <div class="tabs mt-3" role="tablist">${LIST_FILTERS.map(([k, label]) => `<button class="tab ${filter === k ? "active" : ""}" data-f="${k}" role="tab" aria-selected="${filter === k}">${label} <span class="tab-n">${count(k)}</span></button>`).join("")}</div>
        ${shown.length ? `<div class="grid grid-3">${shown.map(card).join("")}</div>`
          : `<div class="card empty"><div class="big">${filter === "doing" ? "⏸" : filter === "done" ? "🏁" : "🎉"}</div><p>${filter === "doing" ? "Không có đề nào đang làm dở." : filter === "done" ? "Bạn chưa hoàn thành đề nào — bắt đầu một đề nhé!" : "Bạn đã làm hết các đề!"}</p></div>`}
      </div></div>`;
      app.querySelectorAll("[data-login]").forEach((a) => (a.onclick = (e) => { e.preventDefault(); FA.cloud.signIn(a.dataset.login); }));
      app.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => {
        filter = b.dataset.f;
        try { localStorage.setItem(listFilterKey(skill), filter); } catch (e) {}
        draw();
      }));
    };
    draw();
  }

  /* ======================================================
     GIỚI THIỆU ĐỀ
     ====================================================== */
  const INTRO = {
    grammar: ["50 câu trắc nghiệm, mỗi lần một câu — giống format thi trên máy.", "Đồng hồ 25 phút. Hết giờ bài tự nộp.", "Bấm phím 1–4 hoặc A–D để chọn nhanh, ← → để chuyển câu.", "Nộp bài xong có điểm thang 0–50 và giải thích từng câu."],
    reading: ["4 part: điền từ, sắp xếp câu (Part 2 có 1–2 bài), ghép ý kiến, chọn tiêu đề.", "Đồng hồ 35 phút. Chuyển part bằng thanh số ở dưới.", "Part 2: dùng nút ▲ ▼ hoặc kéo thả để đổi vị trí câu.", "Nộp bài xong có điểm thang 0–50 và đáp án từng ý."],
    listening: ["17 câu hỏi (25 ý chấm điểm) chia 4 part như đề thật: Part 1 13 câu, Part 2–3 mỗi part 1 câu 4 ý, Part 4 2 câu × 2 ý.", "Mỗi đoạn nghe được phát tối đa 2 lần (giọng đọc máy của trình duyệt).", "Đồng hồ 40 phút. Nên dùng tai nghe và Chrome/Edge để giọng đọc rõ nhất.", "Nộp xong xem transcript với câu chốt đáp án được tô sáng."],
    writing: ["4 part: trả lời ngắn, điền form, chat 3 câu, viết 2 email.", "Đồng hồ 50 phút, đếm từ tự động cho từng câu.", "Nộp xong có điểm ước lượng tự động + bài mẫu đặt cạnh bài của bạn.", "Writing thật do giám khảo chấm; điểm ở đây là ước lượng tự động dựa trên độ dài, cấu trúc, từ nối — chỉ để tham khảo.", "Bài bị trừ điểm khi sai chính tả, sai ngữ pháp (kiểm tra bằng Harper — cần mạng, tải ~8 MB lần đầu, chạy trên máy bạn) hoặc trả lời lạc đề/thiếu ý so với câu hỏi (kiểm tra từ khóa offline, hoặc do AI chấm nếu đã cấu hình — khi đó bài viết được gửi tới máy chủ AI)."],
    speaking: ["4 part, khoảng 12 phút. Máy đọc câu hỏi, sau đó đồng hồ đếm ngược thời gian nói.", "Trình duyệt sẽ xin quyền micro để thu âm. Khi bật AI, bản nhận dạng giọng nói được gửi đi để chấm.", "Part 1: 30 giây/câu · Part 2–3: 45 giây/câu · Part 4: 1 phút chuẩn bị + 2 phút nói.", "Xong bài, xem điểm AI và nghe lại câu trả lời. Câu bỏ trống nhận 0 điểm và được đánh dấu Chưa hoàn thành."],
  };
  /* ---------- lưu nháp bài làm dở (chỉ cục bộ trên máy, tối đa 24 giờ) ---------- */
  const DRAFT_TTL = 24 * 3600 * 1000;
  const draftKey = (skill, id) => "draft:" + skill + ":" + id;
  function getDraft(skill, id) {
    const d = FA.store.get(draftKey(skill, id), null);
    if (!d || !d.savedAt || Date.now() - d.savedAt > DRAFT_TTL) return null;
    return d;
  }
  function saveDraft(skill, id, data) { FA.store.set(draftKey(skill, id), Object.assign({}, data, { savedAt: Date.now() })); }
  function clearDraft(skill, id) { try { localStorage.removeItem("flashaptis:" + draftKey(skill, id)); } catch (e) {} }
  function makeAutoSave(skill, id, payloadFn, leftFn) {
    if (mockRun) return { flush() {}, schedule() {} }; // Full Test không lưu nháp vào đề lẻ (tránh "bài làm dở" lạc chỗ)
    let t = null;
    const flush = () => {
      clearTimeout(t); t = null;
      if (running) saveDraft(skill, id, Object.assign(payloadFn(), { leftSec: leftFn() }));
    };
    const schedule = () => { if (!t) t = setTimeout(flush, 400); };
    window.addEventListener("pagehide", flush);
    cleanup.push(() => { clearTimeout(t); window.removeEventListener("pagehide", flush); });
    return { flush, schedule };
  }

  function viewIntro(skill, test) {
    view = "intro";
    const S = SKILLS[skill];
    const ttsWarn = (skill === "listening" || skill === "speaking") && !FA.ttsSupported();
    const hist = FA.getAttempts(skill, test.id);
    const draft = ["grammar", "reading", "listening", "writing"].includes(skill) ? getDraft(skill, test.id) : null;
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/${skill}">← Chọn đề</a> / ${esc(test.title)}</div>
        <h1 class="page-title">${esc(test.title)} — ${esc(S.name)}</h1>
        <div class="card intro-box mt-2"><ul>${INTRO[skill].map((x) => `<li>${x}</li>`).join("")}</ul></div>
        ${ttsWarn ? `<div class="explain">⚠️ Trình duyệt của bạn không hỗ trợ giọng đọc. Hãy dùng Chrome, Edge hoặc Safari bản mới.</div>` : ""}
        ${draft ? `<div class="explain">💾 Có bản nháp lưu lúc <b>${FA.fmtDate(draft.savedAt)}</b> (còn <b>${FA.fmtTime(draft.leftSec || 0)}</b>). Bạn có thể làm tiếp ngay.</div>` : ""}
        <div class="row mt-3">
          ${draft ? `<button class="btn btn-primary btn-lg" id="resumeBtn">▶ Tiếp tục bài làm dở</button><button class="btn btn-outline btn-lg" id="startBtn">Làm mới từ đầu</button><button class="btn btn-ghost btn-sm" id="dropDraft">Xóa bản nháp</button>`
            : `<button class="btn btn-primary btn-lg" id="startBtn">Bắt đầu tính giờ</button>`}
        </div>
        ${hist.length ? `<div class="mt-4"><h3>Lịch sử làm bài</h3><div class="tbl-wrap"><table class="tbl"><tr><th>Thời gian</th><th>Điểm</th><th>Bài làm</th></tr>${hist.map((h, i) => `<tr><td>${FA.fmtDate(h.at)}</td><td><b>${h.score}</b>/50 ${h.cefr ? `· ${h.cefr}` : ""}</td><td>${h.ans ? `<button class="btn btn-outline btn-sm" data-replay="${i}">👁 Xem lại</button>` : `<span class="muted" style="font-size:.85rem" title="Lượt làm này được lưu trước khi có tính năng xem lại">—</span>`}</td></tr>`).join("")}</table></div></div>` : ""}
      </div></div>`;
    if (draft) {
      app.querySelector("#resumeBtn").onclick = () => RUNNERS[skill](test, null, draft);
      app.querySelector("#dropDraft").onclick = () => { clearDraft(skill, test.id); viewIntro(skill, test); };
    }
    app.querySelector("#startBtn").onclick = async () => {
      if (draft && !(await FA.confirm("Bắt đầu lại sẽ xóa bản nháp bài làm dở. Tiếp tục?", { title: "Làm mới từ đầu", okText: "Làm mới", danger: true }))) return;
      clearDraft(skill, test.id);
      RUNNERS[skill](test);
    };
    app.querySelectorAll("[data-replay]").forEach((b) => (b.onclick = () => RUNNERS[skill](test, hist[+b.dataset.replay])));
  }

  /* Đáp án trắc nghiệm được xáo thứ tự mỗi lần tải trang → lưu NỘI DUNG đáp án chứ không lưu chỉ số, để xem lại sau vẫn đúng */
  const optText = (list, a) => (a == null ? null : list[a] == null ? null : list[a]);
  const optIdx = (list, t) => { const i = t == null ? -1 : list.indexOf(t); return i < 0 ? null : i; };

  /* ======================================================
     KẾT QUẢ (dùng chung)
     ====================================================== */
  /* kỷ lục / bậc CEFR cao nhất trước lượt này của một kỹ năng */
  const LV_RANK = ["A0", "A1", "A2", "B1", "B2", "C"];
  const ACE_SCORE = 45; // 90% của thang 50 → pháo giấy chúc mừng
  function skillPrev(skill) {
    const all = FA.store.get("attempts", {});
    let n = 0, best = null, lv = -1;
    SKILLS[skill].data.forEach((t) => (all[skill + ":" + t.id] || []).forEach((r) => {
      n++;
      if (best == null || r.score > best) best = r.score;
      lv = Math.max(lv, LV_RANK.indexOf(FA.toCEFR(skill, r.score)));
    }));
    return { n, best, lv };
  }
  function celebrateResult(skill, score, prev) {
    if (!FA.celebrate) return;
    const nm = short(skill), lvl = FA.toCEFR(skill, score), rank = LV_RANK.indexOf(lvl);
    // đúng từ 90% trở lên (≥ 45/50) → luôn bắn pháo giấy, gộp luôn thông tin kỷ lục / lên bậc vào một banner
    if (score >= ACE_SCORE) {
      const extra = !prev.n ? "Bài đầu tiên mà đã quá đỉnh!" : FA.CEFR[skill] && rank > prev.lv && rank > 0 ? `Lên bậc ${lvl} ${nm}!` : score > prev.best ? `Kỷ lục mới (trước đây ${prev.best}/50).` : "Giữ phong độ này nhé!";
      FA.celebrate({ icon: "🎆", title: `Xuất sắc! ${nm} ${score}/50 — đúng ${Math.round((score / 50) * 100)}%`, sub: extra, confetti: true });
    } else if (!prev.n) FA.celebrate({ icon: SKILLS[skill].icon, title: `Bài ${nm} đầu tiên — ${score}/50!`, sub: "Đây là điểm xuất phát của bạn. Làm thêm đề để thấy mình tiến bộ.", confetti: false });
    else if (FA.CEFR[skill] && rank > prev.lv && rank > 0) FA.celebrate({ icon: "⬆️", title: `Lên bậc ${lvl} ${nm}!`, sub: score > prev.best ? `Kỷ lục mới ${score}/50 (trước đây cao nhất ${prev.best}/50)` : `${score}/50 — lần đầu bạn đạt bậc này` });
    else if (score > prev.best) FA.celebrate({ icon: "🏆", title: `Kỷ lục mới ${nm}: ${score}/50`, sub: `Hơn kỷ lục cũ ${score - prev.best} điểm (${prev.best}/50). Tiếp tục nhé!` });
    if (FA.roadmap) FA.roadmap.celebrateStages();
  }

  function saveExamAttempt(o, extra) {
    o.attemptAt = FA.saveAttempt(o.skill, o.test.id, o.score, { cefr: o.cefr, ans: o.ans, ...extra });
    (o.wrongItems || []).forEach((item) => FA.addWrong({ ...item, attemptAt: o.attemptAt }));
  }

  function renderResult(o) {
    // o: {skill, test, score, cefr, note, breakdown:[{label,got,total}], review(el)}
    running = false;
    view = "";
    FA.stopSpeak();
    if (mockRun && !o.replay) return mockCollect(o); // Full Test: lưu lượt rồi sang phần kế tiếp, kết quả xem ở cuối
    // o.replay: đang xem lại một lượt đã làm → không lưu thêm lượt mới, o.attemptAt là lượt đó
    let prevStats = null;
    if (!o.replay) {
      prevStats = skillPrev(o.skill); // chụp lại trước khi lưu để biết có kỷ lục / lên bậc không
      if (FA.roadmap) FA.roadmap.primeSeen();
      clearDraft(o.skill, o.test.id);
      saveExamAttempt(o);
    }
    /* ăn mừng khi điểm đã "chốt": trắc nghiệm chốt ngay; Writing chờ Harper/AI, Speaking tự chấm chờ người dùng lưu điểm
       → đợi 2,5 giây sau lần cập nhật điểm cuối cùng, và chỉ báo một lần cho mỗi lượt nộp */
    let celebT = null, celebrated = false;
    const canCelebrate = () => !o.speakPending && !o.selfScore && !(o.skill === "speaking" && o.score === 0);
    const armCeleb = (ms) => {
      if (!prevStats || celebrated || !canCelebrate()) return;
      clearTimeout(celebT);
      celebT = setTimeout(() => { celebrated = true; celebrateResult(o.skill, o.score, prevStats); }, ms);
    };
    if (canCelebrate()) armCeleb(o.skill === "writing" ? 2500 : 900);
    const titleOf = (s) => (s >= 40 ? "Xuất sắc! 🎉" : s >= 26 ? "Làm tốt lắm! 💪" : "Cố lên, luyện thêm nhé! 🔥");
    const cefrHTML = (c) => (c ? `<span class="cefr-badge">${c}</span><span class="muted">bậc CEFR ước lượng</span>` : `<span class="muted">Grammar & Vocabulary không quy đổi CEFR riêng</span>`);
    const breakHTML = (bd) => (bd || []).map((b) => `
                <div class="bar-row"><span>${esc(b.label)}</span><div class="progress"><i style="width:${b.total ? Math.round((b.got / b.total) * 100) : 0}%"></i></div><b>${b.got}/${b.total}</b></div>`).join("");
    app.innerHTML = `
      <div class="page"><div class="container ${o.skill === "writing" ? "wide-exam" : "narrow"}">
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
            ${o.reviewQuestion ? '<a class="btn btn-outline" href="#/gym/wrong">← Về Sổ câu sai</a>'
              : o.replay ? '<button class="btn btn-outline" id="backHist">← Về lịch sử</button>' : ""}
            <button class="btn btn-primary" id="retryBtn">Làm lại đề này</button>
            <a class="btn btn-outline" href="#/${o.skill}">Chọn đề khác</a>
            ${["grammar", "reading", "listening"].includes(o.skill) ? `<a class="btn btn-ghost" href="#/gym/wrong">Ôn Sổ câu sai</a>` : ""}
          </div>
        </div>
        <h2 class="mt-4">Xem lại bài làm</h2>
        <div id="review"></div>
      </div></div>`;
    window.scrollTo(0, 0);
    app.querySelector("#retryBtn").onclick = () => { revokeSpeakUrls(); RUNNERS[o.skill](o.test); };
    const back = app.querySelector("#backHist");
    if (back) back.onclick = () => viewIntro(o.skill, o.test);
    // cập nhật điểm sau khi đã hiển thị (vd: Writing bị trừ điểm chính tả, hoặc người dùng bỏ qua một tên riêng)
    const update = (n) => {
      Object.assign(o, n);
      armCeleb(2500);
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
    const rv = app.querySelector("#review");
    watchReports(rv, o.skill, o.test);
    o.review(rv, update);
    if (o.reviewQuestion) {
      const target = Array.from(rv.querySelectorAll("[data-review-question]")).find((el) => el.dataset.reviewQuestion === o.reviewQuestion);
      if (target) {
        target.classList.add("review-target");
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start" });
      }
    }
  }

  /* gắn nút "⚠️ Báo lỗi" vào từng thẻ câu hỏi ở phần xem lại (kể cả khi phần xem lại vẽ lại, vd. đổi tab lọc) */
  function watchReports(el, skill, test) {
    const add = () => el.querySelectorAll(".q-card").forEach((c) => {
      if (c.querySelector(":scope > .rep-btn") || c.classList.contains("checklist") || c.querySelector('input[type="range"]')) return;
      const part = c.querySelector(".q-part");
      if (!part) return;
      const ref = part.textContent.replace(/[✅❌]/g, "").replace(/\s+/g, " ").trim();
      c.classList.add("has-rep");
      c.insertAdjacentHTML("afterbegin", FA.reportBtn({ skill, testId: test.id, testTitle: test.title + " — " + SKILLS[skill].name, ref }));
    });
    add();
    if (window.MutationObserver) {
      let pending = false;
      new MutationObserver(() => { if (!pending) { pending = true; setTimeout(() => { pending = false; add(); }, 0); } }).observe(el, { childList: true, subtree: true });
    }
  }
  /* nút "Báo lỗi" trên thanh phòng thi → lấy vị trí đang làm (part / câu hiện tại) */
  FA.reportCtx = (ctx) => {
    if (!ctx.live || !curTest) return ctx;
    const stage = document.getElementById("stage");
    const part = stage && stage.querySelector(".q-part"), meta = stage && stage.querySelector(".progress-meta span");
    const ref = [meta && meta.textContent, part && part.textContent].filter(Boolean).map((s) => s.replace(/\s+/g, " ").trim()).join(" · ");
    return { skill: curTest.skill, testId: curTest.test.id, testTitle: curTest.test.title + " — " + SKILLS[curTest.skill].name, ref: ref + " (đang làm bài)" };
  };

  /* ======================================================
     GRAMMAR & VOCABULARY
     ====================================================== */
  function runGrammar(test, replay, draft) {
    clearRun();
    const Q = test.questions;
    const st = { i: 0, ans: Array(Q.length).fill(null), flags: new Set() };
    if (replay) { st.ans = Q.map((q, k) => optIdx(q.o, (replay.ans || [])[k])); return finish(); }
    if (draft) {
      st.ans = Q.map((q, k) => optIdx(q.o, (draft.ans || [])[k]));
      st.i = Math.max(0, Math.min(Q.length - 1, +draft.i || 0));
      if (Array.isArray(draft.flags)) st.flags = new Set(draft.flags);
    }
    const sh = examShell(`${test.title} — Grammar & Vocabulary`, 25);
    const leftSec = startTimer(draft ? Math.max(10, +draft.leftSec || 25 * 60) : 25 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    const auto = makeAutoSave("grammar", test.id, () => ({ i: st.i, ans: st.ans.map((a, k) => optText(Q[k].o, a)), flags: Array.from(st.flags) }), leftSec);
    sh.submit.onclick = async () => {
      const left = st.ans.filter((x) => x == null).length;
      if (left && !(await FA.confirm(`Bạn còn ${left} câu chưa trả lời. Vẫn nộp bài?`, { title: "Nộp bài Grammar", okText: "Nộp bài" }))) return;
      finish();
    };
    const toggleFlag = () => {
      if (st.flags.has(st.i)) st.flags.delete(st.i); else st.flags.add(st.i);
      auto.flush(); render();
    };
    const onKey = (e) => {
      if (e.target.matches("input,textarea,select")) return;
      const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
      const k = e.key.toLowerCase();
      if (k in map && map[k] < Q[st.i].o.length) { st.ans[st.i] = map[k]; auto.flush(); render(); }
      else if (k === "f") toggleFlag();
      else if (e.key === "ArrowRight" && st.i < Q.length - 1) { st.i++; auto.flush(); render(); }
      else if (e.key === "ArrowLeft" && st.i > 0) { st.i--; auto.flush(); render(); }
    };
    document.addEventListener("keydown", onKey);
    cleanup.push(() => document.removeEventListener("keydown", onKey));

    function render() {
      const q = Q[st.i];
      const done = st.ans.filter((x) => x != null).length;
      const flagged = st.flags.has(st.i);
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / Q.length) * 100}%"></i></div>
        <div class="progress-meta"><span>Câu ${st.i + 1}/${Q.length}</span><span>Đã trả lời ${done}${st.flags.size ? ` · 🚩 ${st.flags.size} câu đánh dấu` : ""}</span></div>
        <div class="q-card">
          <div class="row mb-1"><div class="q-part mb-0">${q.sec === "grammar" ? "Grammar" : "Vocabulary"}</div><div class="spacer"></div>
            <button type="button" class="flag-btn ${flagged ? "on" : ""}" id="flagBtn" title="Phím tắt: F">${flagged ? "🚩 Đã đánh dấu" : "🏳️ Đánh dấu xem lại"}</button></div>
          ${q.instr ? `<div class="q-instr">${esc(q.instr)}</div>` : ""}
          <div class="q-text" ${q.sec === "vocab" && q.q.split(" ").length < 4 ? 'style="font-size:1.5rem"' : ""}>${esc(q.q).replace(/_{3,}/g, '<span style="letter-spacing:2px">______</span>')}</div>
          ${q.o.map((o, k) => `<button class="opt ${st.ans[st.i] === k ? "selected" : ""}" data-k="${k}"><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
        </div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Trước</button>
          ${st.i < Q.length - 1 ? `<button class="btn btn-primary" id="next">Tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${Q.map((_, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""} ${st.ans[k] != null ? "done" : ""} ${st.flags.has(k) ? "flagged" : ""}">${k + 1}</button>`).join("")}</div>`;
      sh.stage.querySelector("#flagBtn").onclick = toggleFlag;
      sh.stage.querySelectorAll(".opt").forEach((b) => (b.onclick = () => { st.ans[st.i] = +b.dataset.k; auto.flush(); render(); }));
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => { st.i = +b.dataset.j; auto.flush(); render(); }));
      const p = sh.stage.querySelector("#prev"), n = sh.stage.querySelector("#next"), f = sh.stage.querySelector("#fin");
      if (p) p.onclick = () => { st.i--; auto.flush(); render(); };
      if (n) n.onclick = () => { st.i++; auto.flush(); render(); };
      if (f) f.onclick = () => sh.submit.click();
    }
    render();

    function finish() {
      clearRun();
      let g = 0, v = 0;
      const wrongItems = [];
      Q.forEach((q, k) => {
        const answer = st.ans[k];
        const ok = answer === q.a;
        if (ok) q.sec === "grammar" ? g++ : v++;
        else if (!replay && answer != null) wrongItems.push({ id: `${test.id}-q${k}`, src: "Grammar · " + test.title, q: q.q, o: q.o, a: q.a, e: q.e, instr: q.instr });
      });
      const nG = Q.filter((q) => q.sec === "grammar").length;
      const score = Math.round(((g + v) / Q.length) * 50);
      renderResult({
        skill: "grammar", test, score, cefr: "", replay: !!replay, attemptAt: replay && replay.at, reviewQuestion: replay && replay.reviewQuestion, wrongItems,
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
                return `<div class="q-card mb-2" data-review-question="${test.id}-q${k}">
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

  function readingPartHTML(p, ans, review, questionPrefix) {
    const L = "ABCDEFGH";
    if (p.type === "gap") {
      return `<div class="passage">${fillGaps(p.text, p.gaps, (k, g) => {
        if (review) {
          const ok = ans[k] === g.a;
          return `<b data-review-question="${questionPrefix}-g${k}" style="color:${ok ? "var(--green)" : "var(--red)"}">[${k + 1}] ${esc(ans[k] != null ? g.o[ans[k]] : "—")}</b>${ok ? "" : ` <span class="fix">→ ${esc(g.o[g.a])}</span>`}`;
        }
        return `<select class="sel inline" data-gap="${k}"><option value="">(${k + 1}) chọn…</option>${g.o.map((o, j) => `<option value="${j}" ${ans[k] === j ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
      })}</div>${review ? p.gaps.map((g, k) => `<div class="explain"><b>(${k + 1})</b> ${esc(g.e)}</div>`).join("") : ""}`;
    }
    if (p.type === "order") {
      return `<div class="muted mb-2"><b>Chủ đề:</b> ${esc(p.topic)}${review ? "" : " · Kéo thả câu hoặc bấm ▲ ▼ để sắp xếp"}</div>
        <ol class="order-list">
          <li class="order-item fixed"><span class="num">1</span><span class="txt">${esc(p.first)}</span></li>
          ${ans.map((si, pos) => {
            const cls = review ? (si === pos ? "ok" : "bad") : "";
            return `<li class="order-item ${cls}" ${review ? "" : `draggable="true" data-ord="${pos}"`}><span class="num">${pos + 2}</span><span class="txt">${esc(p.sentences[si])}${review && si !== pos ? `<div class="fix">Vị trí đúng: ${si + 2}</div>` : ""}</span>
              ${review ? "" : `<span class="mv"><button data-up="${pos}" ${pos === 0 ? "disabled" : ""} aria-label="Lên">▲</button><button data-down="${pos}" ${pos === ans.length - 1 ? "disabled" : ""} aria-label="Xuống">▼</button></span>`}</li>`;
          }).join("")}
        </ol>
        ${review ? `<div class="explain"><b>Thứ tự đúng:</b><br>${[p.first, ...p.sentences].map((s, i) => `${i + 1}. ${esc(s)}`).join("<br>")}<br><br>${esc(p.tip || "")}</div>` : ""}`;
    }
    if (p.type === "opinion") {
      const left = `<div class="${review ? "people" : "split-left"}">${p.people.map((pp, i) => `<div class="person ${review ? "" : "mb-2"}"><b>${pp.name ? `${L[i]}. ${esc(pp.name)}` : `Person ${L[i]}`}</b><br>${esc(pp.text)}</div>`).join("")}</div>`;
      const right = `<div>${p.questions.map((q, k) => {
        const ok = ans[k] === q.a;
        return `<div class="match-row ${review ? (ok ? "ok" : "bad") : ""}"><span>${k + 1}. ${esc(q.q)}</span>
          <div><select class="sel" data-op="${k}" ${review ? "disabled" : ""}><option value="">Chọn người…</option>${p.people.map((pp, i) => `<option value="${i}" ${ans[k] === i ? "selected" : ""}>${pp.name ? `${L[i]}. ${esc(pp.name)}` : `Person ${L[i]}`}</option>`).join("")}</select>
          ${review && !ok ? `<div class="fix">Đáp án: ${p.people[q.a].name ? `${L[q.a]}. ${esc(p.people[q.a].name)}` : `Person ${L[q.a]}`}</div>` : ""}${review && q.e ? `<div class="explain mt-1">${esc(q.e)}</div>` : ""}</div></div>`;
      }).join("")}</div>`;
      return review ? left + right : `<div class="split-2">${left}${right}</div>`;
    }
    if (p.type === "heading") {
      const left = `<div class="${review ? "" : "split-left"}"><div class="muted mb-2"><b>Chủ đề:</b> ${esc(p.topic)}</div>
        <div class="passage" style="line-height:1.7"><b>Các tiêu đề:</b><br>${p.headings.map((h, i) => `${L[i]}. ${esc(h)}`).join("<br>")}</div></div>`;
      const right = `<div>${p.paragraphs.map((pa, k) => {
        const ok = ans[k] === pa.a;
        return `<div class="card mb-2" style="padding:16px;${review ? `border-color:${ok ? "var(--green)" : "var(--red)"}` : ""}">
          <div class="row mb-2"><b>Đoạn ${k + 1}</b><div class="spacer"></div>
            <select class="sel" style="max-width:340px" data-hd="${k}" ${review ? "disabled" : ""}><option value="">Chọn tiêu đề…</option>${p.headings.map((h, i) => `<option value="${i}" ${ans[k] === i ? "selected" : ""}>${L[i]}. ${esc(h)}</option>`).join("")}</select></div>
          <div style="color:var(--ink-2)">${esc(pa.text)}</div>
          ${review && !ok ? `<div class="fix mt-1">Đáp án: ${L[pa.a]}. ${esc(p.headings[pa.a])}</div>` : ""}${review && pa.e ? `<div class="explain mt-1">${esc(pa.e)}</div>` : ""}
        </div>`;
      }).join("")}</div>`;
      return review ? left + right : `<div class="split-2">${left}${right}</div>`;
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

  function runReading(test, replay, draft) {
    clearRun();
    const P = test.parts;
    const st = { i: 0, ans: P.map((p) => (p.type === "order" ? shuffledOrder(p.sentences.length) : Array(readingItems(p)).fill(null))) };
    const restoreAns = (sv) => P.map((p, i) => (p.type === "gap" ? p.gaps.map((g, k) => optIdx(g.o, sv[i] && sv[i][k])) : Array.isArray(sv[i]) && sv[i].length === st.ans[i].length ? sv[i] : st.ans[i]));
    if (replay) { st.ans = restoreAns(replay.ans || []); return finish(); }
    if (draft) {
      st.ans = restoreAns(draft.ans || []);
      st.i = Math.max(0, Math.min(P.length - 1, +draft.i || 0));
    }
    const sh = examShell(`${test.title} — Reading`, 35);
    const leftSec = startTimer(draft ? Math.max(10, +draft.leftSec || 35 * 60) : 35 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    const encodeAns = () => st.ans.map((a, i) => (P[i].type === "gap" ? a.map((x, k) => optText(P[i].gaps[k].o, x)) : a.slice()));
    const auto = makeAutoSave("reading", test.id, () => ({ i: st.i, ans: encodeAns() }), leftSec);
    sh.submit.onclick = async () => { if (await FA.confirm("Nộp bài Reading?", { title: "Nộp bài Reading", okText: "Nộp bài" })) finish(); };

    function render() {
      const p = P[st.i];
      if (sh.box) sh.box.className = "container " + (p.type === "opinion" || p.type === "heading" ? "wide-exam" : "narrow");
      const partLabel = (part, idx) => (part.title ? part.title.split("·")[0].trim() : `Part ${idx + 1}`);
      sh.stage.innerHTML = `
        <div class="progress"><i style="width:${((st.i + 1) / P.length) * 100}%"></i></div>
        <div class="progress-meta"><span>${esc(partLabel(p, st.i))} (${st.i + 1}/${P.length})</span><span>${esc(p.title)}</span></div>
        <div class="q-card">
          <div class="q-part">${esc(p.title)}</div>
          <div class="q-instr">${esc(p.instr)}</div>
          ${readingPartHTML(p, st.ans[st.i], false)}
        </div>
        <div class="exam-nav">
          <button class="btn btn-outline" id="prev" ${st.i === 0 ? "disabled" : ""}>← Phần trước</button>
          ${st.i < P.length - 1 ? `<button class="btn btn-primary" id="next">Phần tiếp →</button>` : `<button class="btn btn-primary" id="fin">Nộp bài</button>`}
        </div>
        <div class="qgrid">${P.map((pt, k) => `<button data-j="${k}" class="${k === st.i ? "current" : ""}" style="width:auto;padding:0 12px">${esc(partLabel(pt, k))}</button>`).join("")}</div>`;
      const a = st.ans[st.i];
      sh.stage.querySelectorAll("select[data-gap]").forEach((s) => (s.onchange = () => { a[+s.dataset.gap] = s.value === "" ? null : +s.value; auto.flush(); }));
      sh.stage.querySelectorAll("select[data-op]").forEach((s) => (s.onchange = () => { a[+s.dataset.op] = s.value === "" ? null : +s.value; auto.flush(); }));
      sh.stage.querySelectorAll("select[data-hd]").forEach((s) => (s.onchange = () => { a[+s.dataset.hd] = s.value === "" ? null : +s.value; auto.flush(); }));
      sh.stage.querySelectorAll("[data-up]").forEach((b) => (b.onclick = () => { const k = +b.dataset.up; [a[k - 1], a[k]] = [a[k], a[k - 1]]; auto.flush(); render(); }));
      sh.stage.querySelectorAll("[data-down]").forEach((b) => (b.onclick = () => { const k = +b.dataset.down; [a[k + 1], a[k]] = [a[k], a[k + 1]]; auto.flush(); render(); }));
      let dragPos = -1;
      sh.stage.querySelectorAll("[data-ord]").forEach((li) => {
        const pos = +li.dataset.ord;
        li.ondragstart = (e) => { dragPos = pos; li.classList.add("dragging"); if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; };
        li.ondragend = () => { dragPos = -1; sh.stage.querySelectorAll(".order-item").forEach((x) => x.classList.remove("dragging", "drag-over")); };
        li.ondragover = (e) => { e.preventDefault(); if (dragPos >= 0 && dragPos !== pos) li.classList.add("drag-over"); };
        li.ondragleave = () => li.classList.remove("drag-over");
        li.ondrop = (e) => {
          e.preventDefault();
          if (dragPos < 0 || dragPos === pos) return;
          const [mv] = a.splice(dragPos, 1);
          a.splice(pos, 0, mv);
          auto.flush(); render();
        };
      });
      const go = (k) => { st.i = k; auto.flush(); render(); window.scrollTo(0, 0); };
      sh.stage.querySelectorAll(".qgrid button").forEach((b) => (b.onclick = () => go(+b.dataset.j)));
      const pv = sh.stage.querySelector("#prev"), nx = sh.stage.querySelector("#next"), fn = sh.stage.querySelector("#fin");
      if (pv) pv.onclick = () => go(st.i - 1);
      if (nx) nx.onclick = () => go(st.i + 1);
      if (fn) fn.onclick = () => sh.submit.click();
    }
    render();

    function finish() {
      clearRun();
      let got = 0, total = 0;
      const wrongItems = [];
      const breakdown = P.map((p, i) => {
        const c = readingCorrect(p, st.ans[i]), t = readingItems(p);
        got += c; total += t;
        if (p.type === "gap" && !replay) p.gaps.forEach((g, k) => {
          const answer = st.ans[i][k];
          if (answer != null && answer !== g.a) wrongItems.push(gapItem(test, i, p, k));
        });
        return { label: p.title.split("·")[0].trim(), got: c, total: t };
      });
      const score = Math.round((got / total) * 50);
      renderResult({
        skill: "reading", test, score, cefr: FA.toCEFR("reading", (got / total) * 50), breakdown, replay: !!replay, attemptAt: replay && replay.at, reviewQuestion: replay && replay.reviewQuestion, wrongItems,
        ans: st.ans.map((a, i) => (P[i].type === "gap" ? a.map((x, k) => optText(P[i].gaps[k].o, x)) : a.slice())),
        note: `Bạn đúng <b>${got}/${total}</b> ý → quy ra thang 50 (đúng ÷ ${total} × 50). Bậc CEFR ước lượng theo ngưỡng quy đổi từ bảng tham khảo 25 câu (≈ B1 từ 52%, B2 từ 76%, C từ 92%), không phải kết quả chính thức.`,
        review(el) {
          el.innerHTML = P.map((p, i) => `<div class="q-card mb-2"><div class="q-part">${esc(p.title)} · ${readingCorrect(p, st.ans[i])}/${readingItems(p)}</div>${readingPartHTML(p, st.ans[i], true, `${test.id}-p${i}`)}</div>`).join("");
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
  function audioBox(id, plays, maxPlays, playingId) {
    const left = maxPlays - (plays[id] || 0);
    const active = playingId === id;
    return `<div class="audio-box"><button class="play-btn" data-play="${id}" ${left <= 0 || playingId ? "disabled" : ""} aria-label="Phát">▶</button>
      <div class="info"><b>${active ? "Đang phát…" : left > 0 ? "Bấm để nghe" : "Đã hết lượt nghe"}</b><br>Còn ${Math.max(0, left)}/${maxPlays} lượt
        ${active ? `<div class="audio-prog"><i data-prog="${id}"></i></div>` : ""}
      </div>
      ${active ? `<button type="button" class="btn btn-outline btn-sm" data-stop="${id}">⏹ Dừng</button>` : ""}
      <div class="wave ${active ? "on" : ""}" data-wave="${id}">${"<i></i>".repeat(12)}</div></div>`;
  }

  function listeningScreens(test) {
    const screens = [];
    test.parts.forEach((p, pi) => {
      if (p.type === "mcq") p.items.forEach((it, k) => screens.push({ kind: "mcq", p, pi, it, k, label: `Câu ${k + 1}` }));
      if (p.type === "speakers") screens.push({ kind: "speakers", p, pi, label: "Câu 14" });
      if (p.type === "conv") screens.push({ kind: "conv", p, pi, label: "Câu 15" });
      if (p.type === "mono") p.talks.forEach((tk, k) => screens.push({ kind: "mono", p, pi, tk, k, label: `Câu ${16 + k}` }));
    });
    return screens;
  }

  function runListening(test, replay, draft) {
    clearRun();
    const screens = listeningScreens(test);
    const st = { i: 0, plays: {}, ans: screens.map((s) => (s.kind === "mcq" ? null : s.kind === "speakers" ? Array(4).fill(null) : s.kind === "conv" ? Array(s.p.statements.length).fill(null) : Array(s.tk.questions.length).fill(null))), playing: false };
    const restoreAns = (sv) => screens.map((s, i) => {
      const v = sv[i];
      if (s.kind === "mcq") return optIdx(s.it.o, v);
      if (s.kind === "mono") return s.tk.questions.map((q, k) => optIdx(q.o, v && v[k]));
      return Array.isArray(v) && v.length === st.ans[i].length ? v : st.ans[i]; // speakers / conv: chỉ số cố định, không bị xáo
    });
    if (replay) { st.ans = restoreAns(replay.ans || []); return finish(); }
    if (draft) {
      st.ans = restoreAns(draft.ans || []);
      if (draft.plays && typeof draft.plays === "object") st.plays = draft.plays;
      st.i = Math.max(0, Math.min(screens.length - 1, +draft.i || 0));
    }
    const sh = examShell(`${test.title} — Listening`, 40);
    const leftSec = startTimer(draft ? Math.max(10, +draft.leftSec || 40 * 60) : 40 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    const encodeAns = () => screens.map((s, i) => (s.kind === "mcq" ? optText(s.it.o, st.ans[i]) : s.kind === "mono" ? st.ans[i].map((x, k) => optText(s.tk.questions[k].o, x)) : st.ans[i].slice()));
    const auto = makeAutoSave("listening", test.id, () => ({ i: st.i, plays: st.plays, ans: encodeAns() }), leftSec);
    sh.submit.onclick = async () => { if (await FA.confirm("Nộp bài Listening?", { title: "Nộp bài Listening", okText: "Nộp bài" })) finish(); };

    function play(id, script) {
      if (st.playing) return;
      if ((st.plays[id] || 0) >= 2) return;
      st.plays[id] = (st.plays[id] || 0) + 1;
      auto.flush();
      st.playing = id;
      render();
      FA.speak(script, {
        onProgress(pct) {
          const bar = sh.stage.querySelector(`[data-prog="${id}"]`);
          if (bar) bar.style.width = pct + "%";
        },
      }).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc.")).then(() => {
        if (st.playing !== id) return; // đã chuyển câu hoặc tự dừng
        st.playing = false;
        if (running) render();
      });
    }

    function render() {
      const s = screens[st.i];
      const a = st.ans;
      let body = "";
      if (s.kind === "mcq") {
        body = `${audioBox("s" + st.i, st.plays, 2, st.playing)}<div class="q-text">${esc(s.it.q)}</div>
          ${s.it.o.map((o, k) => `<button class="opt ${a[st.i] === k ? "selected" : ""}" data-k="${k}"><span class="key">${"ABC"[k]}</span>${esc(o)}</button>`).join("")}`;
      } else if (s.kind === "speakers") {
        body = s.p.speakers.map((sp, k) => `<div class="card mb-2" style="padding:14px"><div class="row"><b>Speaker ${"ABCD"[k]}</b><div class="spacer"></div>
            <select class="sel" style="max-width:340px" data-sp="${k}"><option value="">Chọn…</option>${s.p.options.map((o, j) => `<option value="${j}" ${a[st.i][k] === j ? "selected" : ""}>${esc(o)}</option>`).join("")}</select></div>
            <div class="mt-1">${audioBox("s" + st.i + "-" + k, st.plays, 2, st.playing)}</div></div>`).join("");
      } else if (s.kind === "conv") {
        body = audioBox("s" + st.i, st.plays, 2, st.playing) + s.p.statements.map((x, k) => `<div class="match-row"><span>${k + 1}. ${esc(x.q)}</span>
            <select class="sel" data-cv="${k}"><option value="">Chọn…</option>${["Man", "Woman", "Both"].map((o) => `<option ${a[st.i][k] === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>`).join("");
      } else {
        body = `<div class="muted mb-2"><b>Chủ đề:</b> ${esc(s.tk.topic)}</div>${audioBox("s" + st.i, st.plays, 2, st.playing)}` +
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
      sh.stage.querySelectorAll("[data-stop]").forEach((b) => (b.onclick = () => { FA.stopSpeak(); st.playing = false; render(); }));
      sh.stage.querySelectorAll(".opt[data-k]:not([data-mq])").forEach((b) => (b.onclick = () => { a[st.i] = +b.dataset.k; auto.flush(); render(); }));
      sh.stage.querySelectorAll("[data-mq]").forEach((b) => (b.onclick = () => { a[st.i][+b.dataset.mq] = +b.dataset.k; auto.flush(); render(); }));
      sh.stage.querySelectorAll("[data-sp]").forEach((x) => (x.onchange = () => { a[st.i][+x.dataset.sp] = x.value === "" ? null : +x.value; auto.flush(); }));
      sh.stage.querySelectorAll("[data-cv]").forEach((x) => (x.onchange = () => { a[st.i][+x.dataset.cv] = x.value || null; auto.flush(); }));
      const go = (k) => { if (st.playing) { FA.stopSpeak(); st.playing = false; } st.i = k; auto.flush(); render(); };
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
      const wrongItems = [];
      screens.forEach((s, i) => {
        const a = st.ans[i];
        let c = 0, t = 0;
        if (s.kind === "mcq") {
          t = 1; c = a === s.it.a ? 1 : 0;
          if (!replay && a != null && !c) wrongItems.push({ id: `${test.id}-p${s.pi}-i${s.k}`, src: "Listening · " + test.title, q: s.it.q, o: s.it.o, a: s.it.a, e: s.it.e, script: s.it.script });
        } else if (s.kind === "speakers") { t = 4; c = s.p.speakers.filter((sp, k) => a[k] === sp.a).length; }
        else if (s.kind === "conv") { t = s.p.statements.length; c = s.p.statements.filter((x, k) => a[k] === x.a).length; }
        else { t = s.tk.questions.length; c = s.tk.questions.filter((q, k) => a[k] === q.a).length; }
        const key = s.p.title.split("·")[0].trim();
        parts[key] = parts[key] || { label: key, got: 0, total: 0 };
        parts[key].got += c; parts[key].total += t; got += c; total += t;
      });
      const score = Math.round((got / total) * 50);
      renderResult({
        skill: "listening", test, score, cefr: FA.toCEFR("listening", (got / total) * 50), breakdown: Object.values(parts), replay: !!replay, attemptAt: replay && replay.at, reviewQuestion: replay && replay.reviewQuestion, wrongItems,
        ans: screens.map((s, i) => (s.kind === "mcq" ? optText(s.it.o, st.ans[i]) : s.kind === "mono" ? st.ans[i].map((x, k) => optText(s.tk.questions[k].o, x)) : st.ans[i].slice())),
        note: `Bạn đúng <b>${got}/${total}</b> ý (mỗi ý 1 điểm) → quy ra thang 50. Bậc CEFR ước lượng theo ngưỡng tham khảo: B1 từ 12 ý đúng, B2 từ 17, C từ 21 (trên 25 ý) — không phải kết quả chính thức.`,
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
                <div><select class="sel" disabled><option>${a[k] != null ? esc(s.p.options[a[k]]) : "(bỏ trống)"}</option></select>${a[k] !== sp.a ? `<div class="fix">Đáp án: ${esc(s.p.options[sp.a])}</div>` : ""}${sp.e ? `<div class="explain mt-1">${esc(sp.e)}</div>` : ""}</div></div>`).join("");
            } else if (s.kind === "conv") {
              inner = s.p.statements.map((x, k) => `<div class="match-row ${a[k] === x.a ? "ok" : "bad"}"><span>${k + 1}. ${esc(x.q)}</span><div><select class="sel" disabled><option>${esc(a[k] || "(bỏ trống)")}</option></select>${a[k] !== x.a ? `<div class="fix">Đáp án: ${x.a}</div>` : ""}${x.e ? `<div class="explain mt-1">${esc(x.e)}</div>` : ""}</div></div>`).join("") +
                `<div class="transcript">${transcriptHTML(s.p.script)}</div>`;
            } else {
              inner = `<div class="muted">${esc(s.tk.topic)}</div>` + s.tk.questions.map((q, k) => `<div class="mt-2"><div class="q-text" style="font-size:1rem">${k + 1}. ${esc(q.q)} ${a[k] === q.a ? "✅" : "❌"}</div>
                ${q.o.map((o, j) => `<button class="opt ${j === q.a ? "correct" : a[k] === j ? "wrong" : ""}" disabled><span class="key">${"ABC"[j]}</span>${esc(o)}</button>`).join("")}
                <div class="explain"><b>Giải thích:</b> ${esc(q.e)}</div></div>`).join("") +
                `<div class="transcript">${transcriptHTML(s.tk.script, s.tk.questions.map((q) => q.e))}</div>`;
            }
            return `<div class="q-card mb-2"${s.kind === "mcq" ? ` data-review-question="${test.id}-p${s.pi}-i${s.k}"` : ""}><div class="q-part">${s.label} · ${esc(s.p.title)}</div>${inner}</div>`;
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

  function runWriting(test, replay, draft) {
    clearRun();
    const st = { i: 0, p1: Array(5).fill(""), p2: "", p3: Array(3).fill(""), p4a: "", p4b: "" };
    // xem lại: nạp bài đã viết rồi chấm lại như lúc nộp (chính tả/ngữ pháp cần Harper, nội dung chạy offline)
    if (replay && replay.ans) { const a = replay.ans; Object.assign(st, { p1: a.p1 || st.p1, p2: a.p2 || "", p3: a.p3 || st.p3, p4a: a.p4a || "", p4b: a.p4b || "" }); return finish(); }
    if (draft) {
      if (Array.isArray(draft.p1) && draft.p1.length === 5) st.p1 = draft.p1.slice();
      if (typeof draft.p2 === "string") st.p2 = draft.p2;
      if (Array.isArray(draft.p3) && draft.p3.length === 3) st.p3 = draft.p3.slice();
      if (typeof draft.p4a === "string") st.p4a = draft.p4a;
      if (typeof draft.p4b === "string") st.p4b = draft.p4b;
      st.i = Math.max(0, Math.min(3, +draft.i || 0));
    }
    const sh = examShell(`${test.title} — Writing`, 50);
    if (FA.spell) FA.spell.warm(); // tải sẵn bộ kiểm tra chính tả (Harper) để lúc xem lại có ngay
    const leftSec = startTimer(draft ? Math.max(10, +draft.leftSec || 50 * 60) : 50 * 60, sh.timer, () => { FA.toast("Hết giờ! Bài đã được nộp tự động."); finish(); });
    const auto = makeAutoSave("writing", test.id, () => ({ i: st.i, p1: st.p1.slice(), p2: st.p2, p3: st.p3.slice(), p4a: st.p4a, p4b: st.p4b }), leftSec);
    sh.submit.onclick = async () => { if (await FA.confirm("Nộp bài Writing?", { title: "Nộp bài Writing", okText: "Nộp bài" })) finish(); };
    const titles = ["Part 1 · Word-level writing", "Part 2 · Short text", "Part 3 · Three written responses", "Part 4 · Formal & informal emails"];

    function ta(key, idx, min, max, rows) {
      const val = idx == null ? st[key] : st[key][idx];
      return `<textarea class="inp" data-key="${key}" ${idx != null ? `data-idx="${idx}"` : ""} style="min-height:${rows || 140}px" spellcheck="false">${esc(val)}</textarea>
        <div class="wc" data-wc="${key}${idx != null ? idx : ""}" data-min="${min}" data-max="${max}"></div>`;
    }
    function render() {
      const T = test;
      if (sh.box) sh.box.className = "container " + (st.i === 3 ? "wide-exam" : "narrow");
      let body = "";
      if (st.i === 0) body = `<div class="q-instr">${esc(T.p1.instr)}</div>` + T.p1.questions.map((q, k) => `<div class="mb-2"><div style="font-weight:600;margin-bottom:6px">${k + 1}. ${esc(q.q)}</div><input class="inp" data-key="p1" data-idx="${k}" value="${esc(st.p1[k])}" spellcheck="false"><div class="wc" data-wc="p1${k}" data-min="1" data-max="5"></div></div>`).join("");
      if (st.i === 1) body = `<div class="q-instr">${esc(T.p2.instr)}</div><div class="q-text">${esc(T.p2.q)}</div>${ta("p2", null, T.p2.min, T.p2.max, 120)}`;
      if (st.i === 2) body = `<div class="q-instr">${esc(T.p3.instr)}</div>` + T.p3.questions.map((q, k) => `<div class="mb-2"><div class="chat-bubble"><div class="who">${esc(q.who)}</div>${esc(q.q)}</div>${ta("p3", k, T.p3.min, T.p3.max, 110)}</div>`).join("");
      if (st.i === 3) body = `<div class="split-2">
        <div class="split-left"><div class="sample-label mb-1" style="color:var(--orange-700)">Thông báo từ câu lạc bộ</div><div class="passage mb-0" style="white-space:pre-line;line-height:1.7">${esc(T.p4.notice)}</div></div>
        <div>
          <div class="q-text" style="font-size:1rem">Email 1 (informal)</div><div class="q-instr">${esc(T.p4.informal.instr)}</div>${ta("p4a", null, T.p4.informal.min, T.p4.informal.max, 140)}
          <div class="q-text mt-3" style="font-size:1rem">Email 2 (formal)</div><div class="q-instr">${esc(T.p4.formal.instr)}</div>${ta("p4b", null, T.p4.formal.min, T.p4.formal.max, 240)}
        </div></div>`;
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
      sh.stage.querySelectorAll("[data-key]").forEach((el) => { el.oninput = () => { upd(el); auto.schedule(); }; upd(el); });
      const go = (k) => { st.i = k; auto.flush(); render(); window.scrollTo(0, 0); };
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
      let useAI = !replay && !!(FA.ai && FA.ai.enabled());
      const savedAI = replay && replay.ans && replay.ans.ai && typeof replay.ans.ai === "object" ? replay.ans.ai : null;
      let aiErr = "", aiQuota = "";
      // giới hạn lượt AI theo gói (plan.js): Free 3, Pro 6 lượt/ngày; hết lượt / chưa đăng nhập → chấm từ khóa
      if (useAI && FA.plan) {
        app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty"><div class="big">⏳</div><p>Đang kiểm tra lượt AI…</p></div></div></div>`;
        const q = await FA.plan.useAI();
        if (!q.ok) { useAI = false; aiQuota = q.reason; }
        else if (q.limit) aiQuota = `Đã dùng ${q.used}/${q.limit} lượt AI hôm nay.`;
      }
      const markStep = (id, text, ok) => {
        const el = app.querySelector("#" + id);
        if (!el) return;
        el.textContent = text;
        if (ok) el.classList.add("done");
      };
      const aiP = useAI ? FA.ai.grade(T, { p1: st.p1, p2: st.p2, p3: st.p3, p4a: st.p4a, p4b: st.p4b })
        .then((r) => { if (FA.plan) FA.plan.reload(); markStep("stepAI", "✓ Đã xong bước chấm nội dung bằng AI", true); return r; })
        .catch((e) => { aiErr = (e && e.message) || "lỗi"; if (FA.plan) FA.plan.refundAI(); markStep("stepAI", "⚠️ Chuyển sang chấm nội dung bằng từ khóa", true); return null; }) : null;

      // quét chính tả bằng Harper trước khi chấm (bộ kiểm tra đã được tải sẵn từ lúc bắt đầu làm bài)
      app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty">
        <div class="big">⏳</div>
        <h3 class="mb-0">Đang chấm bài Writing…</h3>
        <div class="step-list">
          <div class="step-row" id="stepSpell">⏳ 1. Kiểm tra chính tả & ngữ pháp (Harper)…</div>
          ${useAI ? `<div class="step-row" id="stepAI">⏳ 2. AI (${esc(FA.ai.model("writing"))}) chấm mức bám sát câu hỏi (10–40 giây)…</div>` : `<div class="step-row done">✓ 2. Chấm nội dung bám sát câu hỏi (từ khóa)</div>`}
        </div>
      </div></div></div>`;
      let spellOk = false;
      if (FA.spell) {
        try {
          const res = await Promise.all(keys.map((k) => (J[k].opts.skip || !J[k].t.trim() ? [] : FA.spell.check(J[k].t, Object.assign({ timeoutMs: 60000 }, J[k].opts)))));
          keys.forEach((k, i) => { J[k].allIssues = res[i]; J[k].issues = FA.spell.filterIgnored(res[i]); });
          spellOk = true;
          markStep("stepSpell", "✓ 1. Đã xong kiểm tra chính tả & ngữ pháp", true);
        } catch (e) { markStep("stepSpell", "⚠️ Không tải được Harper — bỏ qua trừ lỗi chính tả", true); }
      } else markStep("stepSpell", "✓ 1. Hoàn tất", true);
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
          (useAI && !ai ? `⚠️ Không gọi được AI chấm nội dung (${esc(aiErr)}) nên dùng kiểm tra từ khóa thay thế${/hết lượt/i.test(aiErr) ? "" : " (lượt AI đã được hoàn lại)"}. ` : ai ? (savedAI ? "Nội dung do AI chấm lúc nộp bài (kết quả đã lưu, không gọi lại AI). " : `Nội dung do AI (${esc(FA.ai.model("writing"))}) chấm. ${esc(aiQuota)} `) : replay ? "Lượt này không có kết quả AI đã lưu nên nội dung được kiểm tra bằng từ khóa (không gọi lại AI). " : aiQuota ? `ℹ️ ${esc(aiQuota)} Nội dung được kiểm tra bằng từ khóa. ${FA.plan && !FA.plan.isPro() ? `<a href="pricing.html">Xem gói Pro</a>. ` : ""}` : "") +
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
          const yours = (t, min, max, k) => `<div><div class="sample-label" style="color:var(--orange-700)">Bài của bạn · ${FA.wordCount(t)} từ (yêu cầu ${min}–${max})</div><div class="passage" style="white-space:pre-line;line-height:1.7;margin:6px 0 0">${esc(t) || '<span class="muted">(bỏ trống)</span>'}</div>${spellBox(k)}${relBox(k)}</div>`;
          const sample = (s) => `<div class="sample"><div class="sample-label">Bài mẫu tham khảo</div>${esc(s)}</div>`;
          el.innerHTML = `
            <div class="q-card mb-2"><div class="q-part">Part 1</div>${T.p1.questions.map((q, k) => `<div class="mb-2"><b>${k + 1}. ${esc(q.q)}</b><div>Bạn: ${esc(st.p1[k]) || '<span class="muted">(bỏ trống)</span>'}</div>${spellBox("p1-" + k)}${relBox("p1-" + k)}<div class="txt-ok">Mẫu: ${esc(q.s)}</div></div>`).join("")}</div>
            <div class="q-card mb-2"><div class="q-part">Part 2</div><div class="q-text">${esc(T.p2.q)}</div><div class="review-split">${yours(st.p2, T.p2.min, T.p2.max, "p2")}${sample(T.p2.s)}</div></div>
            <div class="q-card mb-2"><div class="q-part">Part 3</div>${T.p3.questions.map((q, k) => `<div class="mb-2"><div class="chat-bubble"><div class="who">${esc(q.who)}</div>${esc(q.q)}</div><div class="review-split">${yours(st.p3[k], T.p3.min, T.p3.max, "p3-" + k)}${sample(q.s)}</div></div>`).join("")}</div>
            <div class="q-card mb-2"><div class="q-part">Part 4</div><div class="passage" style="white-space:pre-line">${esc(T.p4.notice)}</div>
              <h3>Email informal</h3><div class="review-split">${yours(st.p4a, T.p4.informal.min, T.p4.informal.max, "p4a")}${sample(T.p4.informal.s)}</div>
              <h3 class="mt-3">Email formal</h3><div class="review-split">${yours(st.p4b, T.p4.formal.min, T.p4.formal.max, "p4b")}${sample(T.p4.formal.s)}</div></div>
            <div class="q-card checklist"><div class="q-part">Checklist tự soát</div>
              ${["Trả lời đúng và đủ ý tất cả câu hỏi", "Đủ số từ yêu cầu ở mọi part", "Email formal có Dear… / Yours faithfully, không viết tắt (I'm → I am)", "Email informal thân mật, có hỏi lại bạn", "Dùng từ nối: Firstly, However, In addition, Therefore…", "Có ít nhất 1 câu phức (because, although, if, which…)", "Viết hoa đầu câu, chấm câu đầy đủ, không sai chính tả cơ bản", "Đưa ra đề xuất/giải pháp cụ thể ở email formal"].map((x) => `<label><input type="checkbox"> ${x}</label>`).join("")}
            </div>
            <p class="muted" style="font-size:.8rem">Kiểm tra chính tả & ngữ pháp bởi <a href="https://github.com/Automattic/harper" target="_blank" rel="noopener">Harper</a> (Apache-2.0). ${ai ? `Mức bám sát câu hỏi do AI chấm${savedAI ? " lúc nộp bài (xem lại không gửi bài đi nữa)" : ` (${esc(FA.ai.model("writing"))}): nội dung bài viết được gửi tới máy chủ AI`}; Harper vẫn chạy ngay trên máy bạn.` : "Mức bám sát câu hỏi do FlashAptis kiểm tra bằng từ khóa. Tất cả chạy ngay trên máy bạn — bài viết không bị gửi đi đâu."}</p>`;
          const boxes = {};
          el.querySelectorAll("[data-spell]").forEach((b) => (boxes[b.dataset.spell] = b));
          const mountAll = () => keys.forEach((k) => {
            if (!FA.spell) return;
            const o = Object.assign({}, J[k].opts);
            if (spellOk) { o.issues = J[k].issues; o.allIssues = J[k].allIssues; o.onIgnore = refresh; }
            FA.spell.mount(boxes[k], J[k].t, o);
          });
          // người dùng bấm "bỏ qua" hoặc "hoàn tác" → lọc lại từ danh sách gốc và tính lại điểm
          function refresh() {
            keys.forEach((k) => (J[k].issues = FA.spell.filterIgnored(J[k].allIssues || J[k].issues)));
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
    revokeSpeakUrls();
    const steps = [];
    test.p1.forEach((q, k) => steps.push({ part: 1, label: `Part 1 · Câu ${k + 1}`, q: q.q, s: q.s, time: 30 }));
    test.p2.questions.forEach((q, k) => steps.push({ part: 2, label: `Part 2 · Câu ${k + 1}`, q: q.q, s: q.s, time: 45, photo: test.p2.photo }));
    test.p3.questions.forEach((q, k) => steps.push({ part: 3, label: `Part 3 · Câu ${k + 1}`, q: q.q, s: q.s, time: 45, photos: test.p3.photos }));
    steps.push({ part: 4, label: "Part 4", qs: test.p4.questions, s: test.p4.s, prep: 60, time: test.p4.time || 120, photo: test.p4.photo });

    const st = { i: 0, recs: [], stream: null, phase: "idle" };
    const sh = replay ? {} : examShell(`${test.title} — Speaking`, 0);
    if (!replay) {
      sh.submit.textContent = "Kết thúc";
      sh.submit.onclick = async () => { if (await FA.confirm("Kết thúc bài Speaking và xem kết quả?", { title: "Kết thúc Speaking", okText: "Xem kết quả" })) finish(); };
    }

    const photoHTML = (p) => p.img
      ? `<figure class="photo photo-img"><img src="${esc(p.img)}" alt="${esc(p.cap)}" loading="lazy"></figure>`
      : `<div class="photo"><div><div class="emo">${p.emo}</div><button type="button" class="btn btn-ghost btn-sm cap-btn">👁 Gợi ý ngữ cảnh</button><div class="cap hidden">${esc(p.cap)}</div></div></div>`;
    let stopTick = null, recorder = null, chunks = [], meterRaf = 0, meterCtx = null;
    function stopMeter() {
      if (typeof cancelAnimationFrame === "function") cancelAnimationFrame(meterRaf);
      meterRaf = 0;
      if (meterCtx) { try { meterCtx.close(); } catch (e) {} meterCtx = null; }
      const m = sh.stage && sh.stage.querySelector && sh.stage.querySelector("#micMeter");
      if (m) m.classList.add("hidden");
    }
    function startMeter() {
      stopMeter();
      const m = sh.stage.querySelector("#micMeter"), fill = sh.stage.querySelector("#micFill");
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!st.stream || !m || !fill || !Ctx) return;
      try {
        meterCtx = new Ctx();
        const an = meterCtx.createAnalyser();
        an.fftSize = 256;
        meterCtx.createMediaStreamSource(st.stream).connect(an);
        const buf = new Uint8Array(an.frequencyBinCount);
        m.classList.remove("hidden");
        const loop = () => {
          an.getByteTimeDomainData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
          fill.style.width = Math.min(100, Math.round(Math.sqrt(sum / buf.length) * 380)) + "%";
          meterRaf = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {}
    }

    async function getMic() {
      if (st.stream || !navigator.mediaDevices || !window.MediaRecorder) return;
      try {
        st.stream = await navigator.mediaDevices.getUserMedia({ audio: { noiseSuppression: true } });
        cleanup.push(() => st.stream && st.stream.getTracks().forEach((t) => t.stop()));
      }
      catch (e) { FA.toast("Không có quyền micro — bạn vẫn luyện được nhưng không ghi âm."); }
    }
    const recDone = []; // mỗi lần ghi âm một promise, xong khi MediaRecorder.onstop chạy (finish() chờ để không mất bản ghi câu cuối)
    function startRec() {
      if (!st.stream) return;
      chunks = [];
      let done;
      recDone.push(new Promise((r) => (done = r)));
      try {
        const rec = (recorder = new MediaRecorder(st.stream));
        const myChunks = (chunks = []);
        rec.ondataavailable = (e) => e.data.size && myChunks.push(e.data);
        const idx = st.i;
        rec.onstop = () => {
          if (myChunks.length) {
            const u = URL.createObjectURL(new Blob(myChunks, { type: rec.mimeType || "audio/webm" }));
            st.recs[idx] = u;
            speakUrls.push(u);
          }
          done();
        };
        rec.onerror = () => done();
        rec.start();
        startMeter();
      } catch (e) { done(); recorder = null; }
    }
    function stopRec() { stopMeter(); if (recorder && recorder.state !== "inactive") recorder.stop(); recorder = null; }
    cleanup.push(stopRec);

    /* Nhận dạng giọng nói chạy song song với ghi âm; cuối bài gửi bản chữ cho AI chấm. */
    const SRc = FA.speakAI && FA.speakAI.SR && FA.speakAI.SR();
    const sttOn = () => !!(SRc && FA.speakAI.enabled());
    st.trans = [];
    const speech = [], silence = [], recognitionFailed = [], attempted = [];
    let recog = null, recogOn = false, finishing = false;
    function startSTT(idx) {
      if (!sttOn()) return;
      let finals = "";
      st.trans[idx] = "";
      recogOn = true;
      const mk = () => {
        const r = new SRc();
        r.lang = "en-US"; r.continuous = true; r.interimResults = true;
        r.onspeechstart = () => { speech[idx] = true; };
        r.onresult = (e) => {
          let interim = "";
          for (let k = e.resultIndex; k < e.results.length; k++) {
            const t = e.results[k][0].transcript;
            if (e.results[k].isFinal) finals += t + " "; else interim += t;
          }
          st.trans[idx] = (finals + interim).trim(); // kết quả cuối có thể về sau khi đã stop() → vẫn ghi đúng bước idx
        };
        r.onerror = (e) => {
          if (e.error && e.error !== "aborted") st.sttErr = e.error; // ghi lại mã lỗi để báo người dùng (no-speech = im lặng quá lâu)
          if (e.error === "no-speech") silence[idx] = true;
          if (["not-allowed", "service-not-allowed", "audio-capture", "network", "language-not-supported"].includes(e.error)) {
            recognitionFailed[idx] = true;
            recogOn = false;
          }
        };
        r.onend = () => { if (recogOn && recog === r) { try { mk(); } catch (e) { recogOn = false; } } }; // Chrome tự ngắt khi im lặng → bật lại cho tới khi hết câu
        recog = r;
        // Dùng cùng track với bản ghi để bộ nhận dạng cũng nhận âm thanh đã lọc.
        const track = st.stream?.getAudioTracks().find((t) => t.readyState === "live");
        if (track) {
          try {
            r.start(track);
            return;
          } catch (e) {
            // Trình duyệt không nhận track trực tiếp: dùng mic mặc định như trước.
          }
        }
        try { r.start(); } catch (e) { recognitionFailed[idx] = true; recogOn = false; }
      };
      mk();
    }
    function stopSTT() { recogOn = false; if (recog) { try { recog.stop(); } catch (e) {} recog = null; } }
    cleanup.push(stopSTT);
    if (replay) return finish(); // xem lại: bản ghi âm không được lưu, chỉ còn điểm, bản nhận dạng + nhận xét AI đã lưu và bài mẫu

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
            <div><div class="stage-label" id="stageLabel">Sẵn sàng</div><div class="big-timer" id="bigTimer">${FA.fmtTime(s.time)}</div><div class="mic-meter hidden mt-1" id="micMeter" title="Mức âm lượng micro"><i id="micFill"></i></div></div>
            <div class="spacer"></div>
            <button class="btn btn-primary" id="goBtn">▶ Bắt đầu câu này</button>
            <button class="btn btn-outline hidden" id="doneBtn">Xong, câu tiếp →</button>
          </div>
          <div class="muted" style="font-size:.88rem">Máy sẽ đọc câu hỏi, sau đó đồng hồ chạy và ghi âm tự động. ${s.prep ? "Part 4 có 1 phút chuẩn bị (có thể ghi chú ra giấy). " : ""}${sttOn() ? "Trình duyệt đồng thời chuyển lời nói thành chữ để AI chấm (cần mạng, hãy nói rõ và gần micro)." : FA.ai && FA.ai.ready && FA.ai.ready("speaking") && FA.speakAI && !FA.speakAI.supported() ? "Trình duyệt này không hỗ trợ nhận dạng giọng nói — dùng Chrome hoặc Edge để AI chấm Speaking." : ""}</div>
        </div>`;
      sh.stage.querySelector("#goBtn").onclick = start;
      sh.stage.querySelector("#doneBtn").onclick = next;
      sh.stage.querySelectorAll(".cap-btn").forEach((b) => (b.onclick = () => { b.nextElementSibling.classList.remove("hidden"); b.remove(); }));
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
        attempted[st.i] = true;
        done.textContent = "Xong, câu tiếp →";
        done.onclick = next;
        done.classList.remove("hidden");
        startRec();
        startSTT(st.i);
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
      stopSTT();
      FA.stopSpeak();
      if (st.i < steps.length - 1) { st.i++; setTimeout(render, 150); }
      else setTimeout(finish, 300);
    }
    render();

    async function finish() {
      if (finishing) return;
      finishing = true;
      const hash0 = location.hash;
      const sttUsed = !replay && sttOn();
      stopRec();
      stopSTT();
      if (!replay) {
        // chờ MediaRecorder.onstop hoàn tất (tối đa 1,5 giây); nếu có nhận dạng giọng nói thì chờ đủ 1,5 giây để kết quả cuối của câu cuối kịp về
        await Promise.all([
          Promise.race([Promise.all(recDone), new Promise((r) => setTimeout(r, 1500))]),
          new Promise((r) => setTimeout(r, sttUsed ? 1500 : 0)),
        ]);
      }
      if (location.hash !== hash0) return; // người dùng đã rời trang
      {
        const recs = st.recs.slice();
        clearRun();

        /* AI chấm bản nhận dạng giọng nói (tùy chọn). Xem lại bài cũ: KHÔNG gọi AI nữa — dùng đúng kết quả đã lưu (ans.ai, ans.trans). */
        const sv = (replay && replay.ans) || {};
        const trans = replay ? (Array.isArray(sv.trans) ? sv.trans.map((x) => String(x || "")) : []) : steps.map((_, i) => st.trans[i] || "");
        let ai = replay && sv.ai && typeof sv.ai === "object" ? sv.ai : null;
        let aiNote = "";
        // có cấu hình AI Speaking nhưng trình duyệt không nhận dạng được giọng nói (Brave, Firefox, Safari…) → nói rõ lý do thay vì im lặng
        if (!replay && !sttUsed && FA.ai && FA.ai.ready && FA.ai.ready("speaking") && FA.speakAI && !FA.speakAI.supported())
          aiNote = window.navigator && window.navigator.brave
            ? "AI chưa chấm vì Brave không hỗ trợ nhận dạng giọng nói — hãy làm bài bằng Chrome hoặc Edge để AI chấm Speaking."
            : "AI chưa chấm vì trình duyệt này không hỗ trợ nhận dạng giọng nói — hãy làm bài bằng Chrome hoặc Edge để AI chấm Speaking.";
        if (sttUsed) {
          if (!trans.some((t) => FA.speakAI.words(t) > 0)) {
            aiNote = st.sttErr === "not-allowed" ? "Trình duyệt không cho dùng nhận dạng giọng nói (hãy cho phép micro) nên AI chưa chấm được." : st.sttErr === "network" ? "Nhận dạng giọng nói bị lỗi kết nối nên AI chưa chấm được (kiểm tra mạng; trình duyệt như Brave, Opera, Cốc Cốc thường không hỗ trợ dịch vụ này — hãy dùng Chrome hoặc Edge)." : st.sttErr === "service-not-allowed" || st.sttErr === "language-not-supported" ? `Trình duyệt chặn dịch vụ nhận dạng giọng nói (mã lỗi: ${st.sttErr}) nên AI chưa chấm được — với Edge, bật Windows Settings → Privacy & security → Speech → Online speech recognition, hoặc dùng Chrome.`
              : "Không nhận dạng được lời nói nào nên AI chưa chấm được" + (st.sttErr ? ` (mã lỗi: ${st.sttErr})` : " — hãy nói rõ, to và gần micro hơn") + ".";
          } else {
            app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty"><div class="big">⏳</div><p>AI đang chấm điểm Speaking…<br>Bạn đã làm rất tốt! Điểm của bạn sẽ có ngay sau đây!</p></div></div></div>`;
            let ok = true;
            if (FA.plan) {
              const q = await FA.plan.useAI();
              if (!q.ok) { ok = false; aiNote = q.reason; }
              else if (q.limit) aiNote = `Đã dùng ${q.used}/${q.limit} lượt AI hôm nay.`;
            }
            if (ok) {
              try {
                ai = await FA.speakAI.grade(steps, trans);
                ai.model = FA.ai.model("speaking");
              } catch (e) {
                aiNote = `AI chưa chấm được bài (${(e && e.message) || "không rõ"}).`;
                if (FA.plan) FA.plan.refundAI();
              }
            }
            if (location.hash !== hash0) return;
          }
        }
        const legacy = replay && !Array.isArray(sv.responses);
        const selfMode = replay ? !!sv.selfMode : !sttUsed;
        const responses = replay
          ? (legacy ? trans.map((t) => t.trim() ? true : null) : sv.responses)
          : sttUsed
            ? steps.map((_, i) => !!(trans[i].trim() || speech[i] || (recs[i] && (!silence[i] || recognitionFailed[i]))))
            : steps.map((_, i) => !!(recs[i] || (!st.stream && attempted[i])));
        const gradedItems = ai?.items || {};
        // Bản cũ tạo sẵn điểm 0 cho bản chép lời dưới ba từ, kể cả khi AI không chấm câu đó.
        const items = legacy ? Object.fromEntries(Object.entries(gradedItems).filter(([i]) => FA.speakAI.words(trans[i]) >= 3)) : gradedItems;
        const result = FA.speakAI.summarize(steps, responses, items);
        const canRate = result.rates.map((_, k) => steps.some((step, i) => step.part === k + 1 && result.questions[i].status !== "blank"));
        const manualRating = (rate, k) => canRate[k] ? Math.max(0, Math.min(5, Math.round(rate))) : 0;
        const manual = Array.isArray(sv.manualRates) && sv.manualRates.length === 4
          && sv.manualRates.every((n) => Number.isFinite(n) && n >= 0 && n <= 5);
        const rates = manual ? sv.manualRates.map(manualRating) : legacy && sv.rates?.length === 4 ? sv.rates : result.rates;
        const score = legacy && !manual ? replay.score : FA.speakingTo50(rates.reduce((sum, rate) => sum + rate, 0));
        const ans = legacy ? { ...sv, rates } : { rates, responses };
        if (selfMode) ans.selfMode = true;
        if (manual) ans.manualRates = sv.manualRates.slice();
        if (trans.some(Boolean)) ans.trans = trans;
        if (ai) ans.ai = ai;
        const PARTS = [
          ["Part 1", "3 câu về bản thân"],
          ["Part 2", "mô tả 1 tranh + 2 câu hỏi"],
          ["Part 3", "so sánh 2 tranh + 2 câu hỏi"],
          ["Part 4", "3 câu về chủ đề trừu tượng (nói 2 phút)"],
        ];
        const breakdown = (values) => values.map((rate, k) => ({ label: PARTS[k][0], got: Math.round(rate * 10) / 10, total: 5 }));
        const hasRatedContent = canRate.some(Boolean);
        const selfScore = selfMode && !manual && !legacy && hasRatedContent;
        const speakPending = !selfMode && !manual && !legacy && result.pending;
        const manualNote = "Điểm tổng Speaking dùng điểm bạn tự chấm (0–5 điểm/part, quy ra thang 50)." + (ai ? " Điểm AI và nhận xét từng câu hiển thị bên dưới." : "");
        const autoNote = selfMode
          ? (hasRatedContent
            ? "Chế độ tự chấm (không dùng AI): nghe lại bản ghi, so với bài mẫu rồi chọn điểm 0–5 cho từng part bên dưới và bấm <b>Lưu điểm tự chấm</b>."
            : "Bạn chưa trả lời câu nào trong bài Speaking này (0/50).")
          : "AI chấm từng câu từ bản nhận dạng giọng nói. Câu bỏ trống tính 0 điểm."
            + (result.pending ? " Điểm tổng đang tạm tính từ các câu đã chấm được — bạn có thể tự chấm bù ở bên dưới." : "");
        const questionResult = (q) => {
          if (q.status === "blank") return '<b>0/5</b> · <span class="pill gray">Chưa hoàn thành</span>';
          if (q.status === "graded") return `<b>AI chấm: ${q.score}/5</b>${q.comment ? ` — ${esc(q.comment)}` : ""}`;
          if (q.status === "ungraded") return selfMode ? '<span class="muted">Nghe lại bản ghi, so với bài mẫu rồi tự chấm theo part ở trên.</span>' : '<span class="pill gray">AI chưa chấm được</span>';
          return '<span class="muted">Lượt cũ chưa lưu kết quả AI cho câu này.</span>';
        };
        renderResult({
          skill: "speaking", test, score, cefr: FA.toCEFR("speaking", score), replay: !!replay, attemptAt: replay && replay.at, ans, selfScore, speakPending,
          note: (manual ? manualNote : legacy ? "Điểm của lượt làm trước được giữ theo lịch sử." : autoNote) + (aiNote ? `<br>${esc(aiNote)}` : ""),
          breakdown: breakdown(rates),
          review(el, update) {
            const showSelfRate = selfMode || result.pending || manual;
            const draft = rates.map(manualRating);
            const manualScore = () => FA.speakingTo50(draft.reduce((sum, rate) => sum + rate, 0));
            const selfRateHTML = showSelfRate ? `<details class="q-card mb-2" ${!manual && hasRatedContent && (selfMode || result.pending) ? "open" : ""}>
              <summary><b>Tự chấm Speaking</b></summary>
              <p class="muted mt-1">Nghe lại bản ghi, rồi chọn điểm nguyên từ 0 đến 5 cho từng part (<b>0</b> không trả lời/không hiểu được · <b>1–2</b> rất hạn chế · <b>3</b> truyền đạt được ý chính · <b>4</b> khá tốt · <b>5</b> đầy đủ, rõ ràng). Part bỏ trống hoàn toàn giữ 0 điểm.</p>
              ${PARTS.map((p, k) => `<label class="calc-row"><span><b>${p[0]}</b> · ${p[1]}</span><input type="range" min="0" max="5" step="1" value="${draft[k]}" data-self-rate="${k}" ${canRate[k] ? "" : "disabled"}><output class="lv" data-self-value="${k}">${draft[k]}/5</output><span></span></label>`).join("")}
              <div class="row mt-2"><b>Điểm tự chấm: <span data-self-total>${manualScore()}</span>/50</b> · <span class="pill" id="selfCefr" data-self-cefr>${FA.toCEFR("speaking", manualScore())}</span><span class="spacer"></span><button class="btn btn-primary btn-sm" type="button" data-save-self ${hasRatedContent ? "" : "disabled"}>Lưu điểm tự chấm</button></div>
            </details>` : "";
            el.innerHTML = selfRateHTML + steps.map((s, i) => `<div class="q-card mb-2"><div class="q-part">${s.label}</div>
                ${[].concat(s.photo || [], s.photos || []).some((ph) => ph.img) ? `<div class="photo-thumbs">${[].concat(s.photo || [], s.photos || []).filter((ph) => ph.img).map((ph) => `<img src="${esc(ph.img)}" alt="${esc(ph.cap)}" loading="lazy">`).join("")}</div>` : ""}
                ${s.qs ? `<ol style="padding-left:20px">${s.qs.map((q) => `<li><b>${esc(q)}</b></li>`).join("")}</ol>` : `<div class="q-text">${esc(s.q)}</div>`}
                ${recs[i] ? `<div class="sample-label" style="color:var(--orange-700)">Bản ghi của bạn</div><audio controls src="${recs[i]}" style="width:100%;margin:6px 0"></audio>` : `<div class="muted" style="font-size:.9rem">${replay ? "Bản ghi âm không được lưu lại sau khi rời trang." : "Không có bản ghi cho câu này."}</div>`}
                ${trans[i] ? `<div class="sample-label" style="margin-top:6px">Máy nghe được bạn nói (nhận dạng giọng nói)</div><div class="muted" style="font-size:.92rem;margin-bottom:6px">${esc(trans[i])}</div>` : ""}
                <div class="mb-1">${questionResult(result.questions[i])}</div>
                <div class="sample"><div class="row"><span class="sample-label">Bài mẫu tham khảo</span><div class="spacer"></div><button class="btn btn-ghost btn-sm" data-say="${i}">🔊 Nghe mẫu</button></div>${esc(s.s)}</div></div>`).join("");
            el.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => FA.speak(steps[+b.dataset.say].s, { gender: "m" })));
            if (showSelfRate) {
              const total = el.querySelector("[data-self-total]"), cefrEl = el.querySelector("[data-self-cefr]");
              el.querySelectorAll("[data-self-rate]").forEach((input) => {
                const k = Number(input.dataset.selfRate);
                input.oninput = () => {
                  draft[k] = manualRating(Number(input.value), k);
                  el.querySelector(`[data-self-value="${k}"]`).textContent = `${draft[k]}/5`;
                  const s = manualScore();
                  total.textContent = s;
                  if (cefrEl) cefrEl.textContent = FA.toCEFR("speaking", s);
                };
              });
              const saveBtn = el.querySelector("[data-save-self]");
              if (saveBtn) saveBtn.onclick = () => {
                const score = manualScore(), manualRates = draft.slice();
                FA.store.set("speakRate:" + test.id, manualRates);
                update({ score, cefr: FA.toCEFR("speaking", score), ans: { ...ans, manualRates }, breakdown: breakdown(manualRates), note: manualNote, selfScore: false, speakPending: false });
                FA.toast("Đã lưu điểm tự chấm Speaking.");
              };
            }
          },
        });
      }
    }
  }

  const RUNNERS = {};
  Object.entries({ grammar: runGrammar, reading: runReading, listening: runListening, writing: runWriting, speaking: runSpeaking })
    .forEach(([k, fn]) => (RUNNERS[k] = (test, ...rest) => { curTest = { skill: k, test }; return fn(test, ...rest); }));

  /* ======================================================
     ÔN TẬP & SỔ CÂU SAI
     ====================================================== */
  function gymPool(src) {
    const pool = [];
    // chỉ lấy câu từ các đề người dùng được mở (đề Pro bị khóa thì không đưa vào gym)
    const open = (skill) => SKILLS[skill].data.filter((t) => !isLocked(skill, t));
    if (src === "grammar" || src === "mix") open("grammar").forEach((t) => t.questions.forEach((q, k) => pool.push({ id: `${t.id}-q${k}`, src: "Grammar · " + t.title, q: q.q, o: q.o, a: q.a, e: q.e, instr: q.instr })));
    if (src === "reading" || src === "mix") open("reading").forEach((t) => t.parts.forEach((p, pi) => p.type === "gap" && p.gaps.forEach((g, k) => pool.push(gapItem(t, pi, p, k)))));
    if (src === "listening" || src === "mix") open("listening").forEach((t) => t.parts.forEach((p, pi) => p.type === "mcq" && p.items.forEach((it, k) => pool.push({ id: `${t.id}-p${pi}-i${k}`, src: "Listening · " + t.title, q: it.q, o: it.o, a: it.a, e: it.e, script: it.script }))));
    return pool;
  }

  /* ---------- Ôn tập từ vựng: bộ CEFR A1–C2 (data/vocab/c-*.js, tải khi chọn) → câu "chọn nghĩa đúng" ---------- */
  const VOCAB_LV = (window.FA_VOCAB_INDEX || []).filter((d) => d.section === "cefr");
  function loadVocabDeck(id) {
    const got = () => (window.FA_VOCAB_DECKS || {})[id];
    if (got()) return Promise.resolve(got());
    const m = VOCAB_LV.find((d) => d.id === id);
    if (!m) return Promise.reject(new Error("deck"));
    return new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = m.file;
      s.onload = () => (got() ? ok(got()) : fail(new Error("deck")));
      s.onerror = () => { s.remove(); fail(new Error("load")); };
      document.head.appendChild(s);
    });
  }
  function vocabItems(deck, n) {
    const cards = deck.cards.filter((c) => c.w && c.m);
    return FA.shuffle(cards.slice()).slice(0, n).map((c) => {
      const wrong = FA.shuffle(Array.from(new Set(cards.filter((x) => x.m !== c.m && x.w !== c.w).map((x) => x.m)))).slice(0, 3);
      const o = FA.shuffle([c.m].concat(wrong));
      return { id: `v-${deck.id}-${c.w}`, src: "Từ vựng · " + deck.name, q: `“${c.w}” (${c.t}) nghĩa là gì?`, o, a: o.indexOf(c.m),
        e: [c.u, c.x ? "Ví dụ: " + c.x : ""].filter(Boolean).join(" · ") };
    });
  }
  const GYM_SRC = [
    ["mix", "🎲", "Trộn tất cả", "Grammar, Reading, Listening xen kẽ"],
    ["grammar", "🧩", "Grammar & Vocab", "Câu trắc nghiệm ngữ pháp + từ vựng"],
    ["reading", "📖", "Reading Part 1", "Điền từ vào đoạn văn"],
    ["listening", "🎧", "Listening Part 1", "Nghe đoạn ngắn, nghe không giới hạn"],
  ];
  let gymKind = ""; // bộ lọc nguồn đang chọn ở Sổ câu sai
  const wrongKind = (w) => { const s = String(w.src || "").split("·")[0].trim(); return s || "Khác"; };

  function wrongAttempt(item, requestedAt) {
    const match = /^(g\d+)-q(\d+)$|^([rl]\d+)-p(\d+)-([gi])(\d+)$/.exec(item.id);
    if (!match) return null;
    const [, grammarId, grammarIndex, testId, partIndex, type, itemIndex] = match;
    const skill = grammarId ? "grammar" : testId.startsWith("r") && type === "g" ? "reading"
      : testId.startsWith("l") && type === "i" ? "listening" : "";
    const test = SKILLS[skill]?.data.find((t) => t.id === (grammarId || testId));
    if (!test) return null;

    const pi = Number(partIndex), k = Number(grammarId ? grammarIndex : itemIndex);
    const part = test.parts?.[pi];
    const question = skill === "grammar" ? test.questions[k] : skill === "reading" ? part?.gaps?.[k] : part?.items?.[k];
    if (!question || (skill !== "reading" && question.q !== item.q) || question.o[question.a] !== item.o[item.a]) return null;

    const index = skill === "listening" ? listeningScreens(test).findIndex((s) => s.kind === "mcq" && s.pi === pi && s.k === k) : k;
    const at = requestedAt ?? item.attemptAt;
    const attempt = FA.getAttempts(skill, test.id).find((entry) => {
      if (!entry || !Number.isSafeInteger(entry.at) || !Array.isArray(entry.ans) || (at != null && String(entry.at) !== String(at))) return false;
      const answer = skill === "reading" ? entry.ans[pi]?.[k] : entry.ans[index];
      const selected = optIdx(question.o, answer);
      return selected != null && selected !== question.a;
    });
    return attempt ? { skill, test, attempt } : null;
  }

  function viewWrongAttempt(encodedId, at) {
    if (!/^\d+$/.test(at || "")) return viewGym(true);
    let id;
    try { id = decodeURIComponent(encodedId); } catch (e) { return viewGym(true); }
    const item = FA.getWrongbook().find((w) => w.id === id);
    const source = item && wrongAttempt(item, at);
    if (!source) return viewGym(true, "Lượt làm bài này không còn trong lịch sử.");
    const { skill, test, attempt } = source;
    if (isLocked(skill, test)) {
      if (FA.plan && !FA.plan.loaded()) return viewLocked(skill, test);
      return viewGym(true, "Đề của lượt làm này hiện yêu cầu gói Pro.");
    }
    RUNNERS[skill](test, { ...attempt, reviewQuestion: item.id });
  }

  function wrongCard(item) {
    const source = wrongAttempt(item);
    const title = esc(item.q);
    const passage = typeof item.passage === "string" ? item.passage.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "") : "";
    const content = source
      ? `<a class="wrong-open" href="#/gym/wrong/${encodeURIComponent(item.id)}/${source.attempt.at}">
          <b>${title}</b><span>${item.attemptAt ? "Xem lượt làm bài" : "Xem lượt sai tìm thấy"} · ${esc(FA.fmtDate(source.attempt.at))} →</span>
        </a>`
      : `<details class="wrong-context"><summary><b>${title}</b> <span class="muted">· Xem ngữ cảnh</span></summary>
          ${passage ? `<div class="passage mt-1">${esc(passage).replace(/\n/g, "<br>")}</div>` : ""}
          ${Array.isArray(item.script) ? `<div class="transcript">${transcriptHTML(item.script.filter((line) => typeof line?.t === "string"))}</div>` : ""}
          <div class="txt-ok mt-1">Đáp án: ${esc(item.o[item.a])}</div>
          <div class="muted">${esc(item.e)}</div>
        </details>`;
    return `<div class="card wrong-card mb-2"><div class="row"><span class="pill gray">${esc(item.src)}</span><div class="spacer"></div><button class="btn btn-ghost btn-sm" data-del="${esc(item.id)}">Bỏ khỏi sổ</button></div>${content}</div>`;
  }

  function viewGym(wrongMode, notice) {
    view = "gym";
    const wrong = FA.getWrongbook();
    const len = [10, 20].includes(FA.store.get("gym-len", 10)) ? FA.store.get("gym-len", 10) : 10;
    const today = FA.daily ? FA.daily.today() : 0, goal = FA.daily ? FA.daily.goal() : 0, streak = FA.daily ? FA.daily.streak() : 0;
    const roadmap = FA.store.get("roadmap", {}) || {};
    const suggestLv = { B1: "A2", B2: "B1", C1: "B2" }[roadmap.target || "B2"] || "B1";
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/">← Luyện đề</a> / Ôn tập</div>
        <section class="gym-hero">
          <div style="flex:1;min-width:230px">
            <span class="eyebrow">Ôn tập nhanh</span>
            <h1 class="page-title">⚡ Mỗi ngày một hiệp ngắn</h1>
            <p class="page-sub mb-0">Không bấm giờ — chọn xong biết ngay đúng sai và vì sao. Câu sai tự vào <b>Sổ câu sai</b>; ôn lại đúng thì tự gỡ ra.</p>
          </div>
          ${FA.daily ? `<div class="gym-goal">
            <div class="ring" style="--p:${goal ? Math.min(100, Math.round((today / goal) * 100)) : 0}" data-label="${today}"></div>
            <div><b>${today >= goal ? "Đã đạt mục tiêu hôm nay ✓" : `Còn ${goal - today} điểm nữa đạt mục tiêu`}</b><span>Hôm nay ${today}/${goal} điểm học · 🔥 chuỗi ${streak} ngày</span><span>Mỗi câu ôn = 1 điểm</span></div>
          </div>` : ""}
        </section>
        <div class="tabs"><a class="tab ${!wrongMode ? "active" : ""}" href="#/gym">⚡ Luyện nhanh</a><a class="tab ${wrongMode ? "active" : ""}" href="#/gym/wrong">📒 Sổ câu sai (${wrong.length})</a></div>
        ${notice ? `<p class="explain" role="status">${esc(notice)} <a href="#/gym/wrong">Về Sổ câu sai</a></p>` : ""}
        <div id="gymBody"></div>
      </div></div>`;
    const body = app.querySelector("#gymBody");
    if (!wrongMode) {
      body.innerHTML = `
        <div class="row mb-2" style="gap:8px"><span class="muted" style="font-size:.9rem">Số câu mỗi hiệp:</span>
          ${[10, 20].map((n) => `<button type="button" class="chip ${n === len ? "active" : ""}" data-len="${n}">${n} câu</button>`).join("")}</div>
        <h3 class="gym-h">Câu hỏi từ đề thi</h3>
        <div class="gym-srcs">${GYM_SRC.map(([k, ic, n, d]) => `<button type="button" class="card gym-src" data-src="${k}"><span class="gym-src-ic">${ic}</span><div><b>${n}</b><span>${d}</span><span class="gym-n">${gymPool(k).length.toLocaleString("vi-VN")} câu</span></div></button>`).join("")}</div>
        ${VOCAB_LV.length ? `<h3 class="gym-h">Từ vựng theo cấp độ CEFR <span class="muted" style="font-weight:400;font-size:.88rem">· chọn nghĩa đúng của từ</span></h3>
        <div class="gym-lvs">${VOCAB_LV.map((d) => `<button type="button" class="gym-lv ${d.en === suggestLv ? "sug" : ""}" data-deck="${d.id}"><b>${d.emoji} ${esc(d.en)}</b><span>${d.n.toLocaleString("vi-VN")} từ</span>${d.en === suggestLv ? `<em>Gợi ý</em>` : ""}</button>`).join("")}</div>` : ""}
        <div class="gym-links">
          <a href="grammar.html">📘 Chưa chắc lý thuyết? Học ngữ pháp A1–C2 →</a>
          <a href="flashcards.html">🃏 Học thẻ từ vựng & ôn từ khó →</a>
          <a href="#/">⚡ Sẵn sàng làm cả đề? Vào Luyện đề →</a>
        </div>`;
      body.querySelectorAll("[data-len]").forEach((b) => (b.onclick = () => { FA.store.set("gym-len", +b.dataset.len); viewGym(false); }));
      body.querySelectorAll("[data-src]").forEach((b) => (b.onclick = () => gymSession(FA.shuffle(gymPool(b.dataset.src)).slice(0, len), false, body)));
      body.querySelectorAll("[data-deck]").forEach((b) => (b.onclick = async () => {
        b.disabled = true;
        const old = b.innerHTML;
        b.innerHTML = "<b>⏳ Đang tải…</b>";
        try { const deck = await loadVocabDeck(b.dataset.deck); if (view === "gym") gymSession(vocabItems(deck, len), false, body); }
        catch (e) { FA.toast("Không tải được bộ từ — kiểm tra mạng rồi thử lại."); b.disabled = false; b.innerHTML = old; }
      }));
    } else {
      if (!wrong.length) { body.innerHTML = `<div class="empty card"><div class="big">📒</div><p>Sổ câu sai đang trống. Làm đề hoặc vào Luyện nhanh — câu nào sai sẽ tự lưu ở đây.</p><a class="btn btn-primary" href="#/gym">Luyện nhanh</a></div>`; return; }
      // lọc theo nguồn câu (Grammar / Reading / Listening / Từ vựng…)
      const kinds = {};
      wrong.forEach((w) => (kinds[wrongKind(w)] = (kinds[wrongKind(w)] || 0) + 1));
      if (!kinds[gymKind]) gymKind = ""; // nguồn đang lọc đã hết câu → về "Tất cả"
      let kind = gymKind; // nhớ bộ lọc khi "Bỏ khỏi sổ" vẽ lại màn
      const draw = () => {
        const list = kind ? wrong.filter((w) => wrongKind(w) === kind) : wrong;
        body.innerHTML = `
          <div class="row mb-2" style="gap:6px">${[["", "Tất cả", wrong.length]].concat(Object.entries(kinds).map(([k, n]) => [k, k, n])).map(([k, lb, n]) => `<button type="button" class="chip ${k === kind ? "active" : ""}" data-kind="${esc(k)}">${esc(lb)} · ${n}</button>`).join("")}</div>
          <div class="row mb-2"><button class="btn btn-primary" id="reviewAll">Ôn lại ${Math.min(len, list.length)} câu${kind ? " " + esc(kind) : ""}</button><div class="spacer"></div><button class="btn btn-ghost btn-sm" id="clearAll">Xóa hết</button></div>
          ${list.map(wrongCard).join("")}`;
        body.querySelectorAll("[data-kind]").forEach((b) => (b.onclick = () => { kind = gymKind = b.dataset.kind; draw(); }));
        body.querySelector("#reviewAll").onclick = () => gymSession(FA.shuffle(list.slice()).slice(0, len), true, body);
        body.querySelector("#clearAll").onclick = async () => { if (await FA.confirm("Xóa toàn bộ Sổ câu sai?", { title: "Xóa Sổ câu sai", okText: "Xóa hết", danger: true })) { FA.store.set("wrongbook", []); viewGym(true); } };
        body.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => { FA.removeWrong(b.dataset.del); viewGym(true); }));
      };
      draw();
    }
  }

  /* vị trí câu trong đề gốc từ id của câu ôn tập: g3-q12 → Câu 13; r1-p0-g2 → Part 1 · chỗ trống 3; l2-p0-i4 → Câu 5 */
  function gymRef(it) {
    const id = String(it.id), q = String(it.q || "").slice(0, 80);
    let m;
    if ((m = id.match(/-q(\d+)$/))) return `Câu ${+m[1] + 1}: ${q}`;
    if ((m = id.match(/-p(\d+)-g(\d+)$/))) return `Part ${+m[1] + 1} · chỗ trống (${+m[2] + 1})`;
    if ((m = id.match(/-p(\d+)-i(\d+)$/))) return `Câu ${+m[2] + 1}: ${q}`;
    return q;
  }
  function gymSession(items, fromWrong, body) {
    view = "";
    let i = 0, correct = 0, chosen = null;
    const draw = () => {
      if (i >= items.length) {
        body.innerHTML = `<div class="card center"><div class="ring-lg" style="--p:${Math.round((correct / items.length) * 100)};margin:0 auto"><div><b>${correct}</b><span>/${items.length}</span></div></div>
          <h2 class="mt-2">${correct === items.length ? "Hoàn hảo! 🎉" : "Xong một hiệp! 💪"}</h2><p class="muted">${fromWrong ? "Câu đúng đã được gỡ khỏi Sổ câu sai." : "Câu sai đã được lưu vào Sổ câu sai."}</p>
          <div class="row" style="justify-content:center"><a class="btn btn-primary" href="${fromWrong ? "#/gym/wrong" : "#/gym"}" id="again">Tập tiếp</a></div></div>`;
        body.querySelector("#again").onclick = (e) => { e.preventDefault(); viewGym(fromWrong); };
        if (items.length >= 5 && correct / items.length >= 0.9 && FA.celebrate) FA.celebrate({ icon: "🎆", title: `Xuất sắc! Đúng ${correct}/${items.length} câu`, sub: correct === items.length ? "Không sai câu nào — hoàn hảo!" : "Đạt từ 90% trở lên — tiếp tục nhé!", confetti: true });
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
          ${it.script ? `<div class="audio-box"><button class="play-btn" id="gplay">▶</button><div class="info"><b>Nghe đoạn hội thoại</b><br>Ôn tập: nghe không giới hạn</div></div>` : ""}
          <div class="q-text">${esc(it.q)}</div>
          ${it.o.map((o, k) => `<button class="opt ${ans ? (k === it.a ? "correct" : k === chosen ? "wrong" : "") : ""}" data-k="${k}" ${ans ? "disabled" : ""}><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
          ${ans ? `<div class="explain"><b>${chosen === it.a ? "✅ Chính xác!" : "❌ Chưa đúng."}</b> ${esc(it.e)}</div>${it.script ? `<div class="transcript">${transcriptHTML(it.script)}</div>` : ""}
          <div class="row mt-1"><div class="spacer"></div>${FA.reportBtn({ skill: (it.src.split("·")[0] || "").trim().toLowerCase(), testId: String(it.id).split("-")[0], testTitle: it.src, ref: gymRef(it) }, "Báo lỗi câu này")}</div>` : ""}
        </div>
        ${ans ? `<div class="exam-nav"><span></span><button class="btn btn-primary" id="gnext">${i < items.length - 1 ? "Câu tiếp →" : "Xem kết quả"}</button></div>` : ""}`;
      const gp = body.querySelector("#gplay");
      if (gp) gp.onclick = () => FA.speak(it.script).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."));
      body.querySelectorAll(".opt[data-k]").forEach((b) => (b.onclick = () => {
        chosen = +b.dataset.k;
        FA.daily.add(FA.daily.PTS.item);
        if (chosen === it.a) { correct++; if (fromWrong) FA.removeWrong(it.id); }
        else FA.addWrong(it);
        draw();
      }));
      const gn = body.querySelector("#gnext");
      if (gn) gn.onclick = () => { FA.stopSpeak(); i++; chosen = null; draw(); };
    };
    draw();
  }

  /* ======================================================
     FULL TEST — thi trọn bộ 5 phần, có giờ, phòng thi khóa
     Mỗi phần chạy bằng đúng runner của đề lẻ (giờ riêng từng phần như thi thật); renderResult thấy mockRun
     → lưu lượt vào lịch sử đề lẻ rồi gọi mockCollect thay vì hiện kết quả. Cuối cùng: Overall = L+R+S+W (/200).
     "Khóa trình duyệt" chỉ là răn đe ở mức web cho phép: toàn màn hình + đếm lần rời màn hình (đổi tab, mất tiêu điểm,
     thoát toàn màn hình) + chặn chuột phải / sao chép / dán / phím DevTools. Không chặn được điện thoại thứ hai
     hay Alt+Tab ở mức hệ điều hành — chỉ phát hiện và ghi lại. ====================================================== */
  const MOCK_ORDER = ["grammar", "listening", "reading", "writing", "speaking"];
  const mockTest = (m, k) => SKILLS[k].data.find((t) => t.id === m.parts[k]);
  const MOCKS = (window.FA_MOCK || []).filter((m) => m && m.parts && MOCK_ORDER.every((k) => mockTest(m, k)));
  const mockLocked = (m) => MOCK_ORDER.some((k) => isLocked(k, mockTest(m, k))); // khóa nếu có đề thành phần là đề Pro
  const MOCK_MAX_STRIKES = 2; // lần rời màn hình thi (đổi tab, sang ứng dụng khác, thoát toàn màn hình) thứ 1 → cảnh báo; thứ 2 → tự nộp bài và kết thúc
  const MOCK_MIN = MOCK_ORDER.reduce((n, k) => n + SKILLS[k].time, 0);
  const MOCK_STATUS = { done: "✅ Hoàn thành", aborted: "⏹ Kết thúc sớm", terminated: "⛔ Bị dừng (rời màn hình)" };
  const mockHist = (id) => ((FA.store.get("mock", {}) || {})[id] || []).slice().sort((a, b) => b.at - a.at);
  function saveMockRec(id, rec) {
    const all = FA.store.get("mock", {}) || {};
    const list = (all[id] || []).filter((r) => r.at !== rec.at);
    list.unshift(Object.assign({}, rec));
    all[id] = list.sort((a, b) => b.at - a.at).slice(0, 10);
    FA.store.set("mock", all);
  }
  function mockRecord(run, status) {
    const scores = {}, cefrs = {};
    const sp = run.os.speaking;
    const selfWait = !!(sp && sp.selfScore && !run.speakSaved);
    const pend = !!(sp && (sp.speakPending || selfWait));
    MOCK_ORDER.forEach((k) => {
      const o = run.os[k];
      const hide = k === "speaking" && selfWait;
      scores[k] = o && !hide ? o.score : null;
      cefrs[k] = o && !hide ? o.cefr || "" : ""; // CEFR của runner (Listening/Reading xét trên điểm chưa làm tròn)
    });
    const overall = CORE_SKILLS.reduce((n, k) => n + (scores[k] || 0), 0);
    return { at: run.at, finishedAt: Date.now(), status, strikes: run.strikes || 0, scores, cefrs, overall, cefr: FA.toCEFR("overall", overall), speakPending: pend || undefined };
  }
  // đóng tab / tải lại giữa Full Test → vẫn ghi lại lượt thi (kết thúc sớm, giữ số lần vi phạm); localStorage ghi đồng bộ nên kịp lưu
  window.addEventListener("pagehide", () => { if (mockRun) mockEnd("aborted", false); });
  // tab mở phòng thi cập nhật lịch sử → tab gốc (đang ở trang giới thiệu) vẽ lại
  window.addEventListener("storage", (e) => {
    if (e.key === "flashaptis:mock" && !running && !mockRun && (view === "mockIntro" || view === "mockList")) route();
  });

  function mockStripHTML() {
    const r = mockRun;
    return `<div class="mock-strip">
      <b class="mock-name">🏁 ${esc(r.m.title)}</b>
      <div class="mock-steps">${MOCK_ORDER.map((k, i) => `<span class="${i < r.idx ? "done" : i === r.idx ? "cur" : ""}">${i < r.idx ? "✓" : i + 1}. ${esc(short(k))}</span>`).join("")}</div>
      ${MOCK_MAX_STRIKES === 1
        ? `<span class="mock-warn on" title="Rời màn hình thi (đổi tab, sang ứng dụng khác, thoát toàn màn hình) là bài thi tự nộp ngay">🔒 Không rời màn hình</span>`
        : `<span class="mock-warn ${r.strikes ? "on" : ""}" id="mockStrikes" title="Số lần rời màn hình thi — tới ${MOCK_MAX_STRIKES} lần bài thi tự nộp">⚠️ ${r.strikes}/${MOCK_MAX_STRIKES}</span>`}
    </div>`;
  }

  function viewMockList() {
    view = "mockList";
    app.innerHTML = `
      <div class="page"><div class="container">
        <div class="crumbs"><a href="#/">← Kỹ năng</a> / Full Test</div>
        <span class="eyebrow">Thi thử trọn bộ</span>
        <h1 class="page-title">🏁 Full Test Aptis</h1>
        <p class="page-sub">Làm liền 5 phần như ngày thi thật: Grammar & Vocabulary → Listening → Reading → Writing → Speaking (khoảng ${MOCK_MIN} phút). Mỗi phần bấm giờ riêng, nộp xong tự sang phần kế. Phòng thi mở ở tab mới, toàn màn hình, rời màn hình bị ghi lại. Cuối bài ra điểm <b>Overall /200</b> và bậc CEFR.</p>
        ${needLogin() ? LOGIN_NOTE : ""}
        <div class="grid grid-2">
          ${MOCKS.map((m) => {
            const h = mockHist(m.id), best = h.filter((r) => r.status === "done" && !r.speakPending).sort((a, b) => b.overall - a.overall)[0], locked = mockLocked(m);
            return `<a class="card skill-card" href="#/mock/${m.id}">
              <div class="icon">${locked ? "🔒" : "🏁"}</div>
              ${locked ? `<span class="pill">PRO</span>` : `<span class="pill green">Free</span>`} ${h.length ? `<span class="pill gray">Đã thi ${h.length} lần</span>` : ""}
              <h3>${esc(m.title)}</h3>
              <p>${esc(m.desc || "")}</p>
              ${best ? `<p class="mb-0"><b>Cao nhất: ${best.overall}/200 · ${esc(best.cefr)}</b></p>` : ""}
              <span class="go">${locked ? "Xem chi tiết →" : "Vào thi →"}</span>
            </a>`;
          }).join("")}
        </div>
      </div></div>`;
    bindLoginLinks();
  }
  function bindLoginLinks() {
    app.querySelectorAll("[data-login]").forEach((a) => (a.onclick = (e) => { e.preventDefault(); FA.cloud.signIn(a.dataset.login); }));
  }

  function viewMockLocked(m) {
    view = "locked";
    const P = FA.PLAN, checking = FA.plan && !FA.plan.loaded();
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/mock">← Full Test</a> / ${esc(m.title)}</div>
        <div class="card empty">
          <div class="big">${checking ? "⏳" : "🔒"}</div>
          <h2>${esc(m.title)}</h2>
          ${checking ? `<p>Đang kiểm tra gói tài khoản…</p>` : `
          <p>Full Test này ghép từ các đề dành cho gói <b>Pro</b>.</p>
          <p>Pro: toàn bộ đề lẻ + mọi Full Test + AI chấm Writing ${P.aiPerDay.pro} lượt/ngày — chỉ ${FA.plan.fmtVND(P.price)}/${P.days} ngày.</p>
          <div class="row" style="justify-content:center"><a class="btn btn-primary" href="pricing.html">Nâng cấp Pro</a><a class="btn btn-ghost" href="#/mock">Chọn Full Test khác</a></div>`}
        </div>
      </div></div>`;
  }

  const MOCK_RULES = [
    "Làm liền 5 phần theo thứ tự <b>Grammar & Vocabulary → Listening → Reading → Writing → Speaking</b>; mỗi phần có đồng hồ riêng, hết giờ tự nộp. Nộp phần nào là khóa phần đó (không quay lại được).",
    "Phòng thi mở ở <b>tab mới, toàn màn hình</b>. Thanh menu, nút hỗ trợ, chuột phải, sao chép/dán và phím mở công cụ nhà phát triển bị tắt.",
    MOCK_MAX_STRIKES === 1
      ? `<b>Rời khỏi màn hình thi dù chỉ 1 lần</b> (đổi tab, bấm sang ứng dụng/cửa sổ khác, thoát toàn màn hình) là bài thi <b>tự nộp ngay và kết thúc</b> — các phần chưa làm tính 0 điểm. Không có cảnh báo trước.`
      : `Mỗi lần <b>rời khỏi màn hình thi</b> (đổi tab, bấm sang ứng dụng khác, thoát toàn màn hình) bị tính 1 lần vi phạm. Đến <b>lần thứ ${MOCK_MAX_STRIKES}</b> bài thi tự nộp phần đang làm và kết thúc — các phần chưa làm tính 0 điểm.`,
    "Phần Speaking cần <b>micro</b> — hãy kiểm tra micro trước khi vào phòng thi. Nên đeo tai nghe cho phần Listening.",
    "Kết quả: điểm từng phần (/50), <b>Overall = Listening + Reading + Speaking + Writing (/200)</b> và bậc CEFR. Grammar & Vocabulary tính riêng như thi thật.",
  ];

  function viewMockIntro(m) {
    view = "mockIntro";
    const hist = mockHist(m.id);
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#/mock">← Full Test</a> / ${esc(m.title)}</div>
        <h1 class="page-title">🏁 ${esc(m.title)}</h1>
        <p class="page-sub">${esc(m.desc || "")} Tổng thời gian khoảng <b>${MOCK_MIN} phút</b> — hãy chọn lúc rảnh, chỗ yên tĩnh.</p>
        <div class="card mb-2"><div class="tbl-wrap"><table class="tbl"><tr><th>#</th><th>Phần thi</th><th>Đề</th><th>Thời gian</th></tr>
          ${MOCK_ORDER.map((k, i) => `<tr><td>${i + 1}</td><td>${SKILLS[k].icon} ${esc(SKILLS[k].name)}</td><td>${esc(mockTest(m, k).title)}</td><td>${k === "speaking" ? "≈ 12 phút (máy tự chuyển câu)" : SKILLS[k].time + " phút"}</td></tr>`).join("")}
        </table></div></div>
        <div class="card intro-box"><ul>${MOCK_RULES.map((x) => `<li>${x}</li>`).join("")}</ul></div>
        <div class="row mt-3">
          <button class="btn btn-primary btn-lg" id="openRoom">🚀 Mở phòng thi</button>
          <a class="btn btn-ghost" href="#/mock">← Chọn Full Test khác</a>
        </div>
        <div id="roomNote"></div>
        ${hist.length ? `<div class="mt-4"><h3>Lịch sử Full Test</h3><div class="tbl-wrap"><table class="tbl"><tr><th>Thời gian</th><th>Overall</th><th>L · R · S · W</th><th>Grammar</th><th>Trạng thái</th></tr>
          ${hist.map((r) => `<tr><td>${FA.fmtDate(r.at)}</td><td><b>${r.overall}</b>/200 · ${esc(r.cefr)}${r.speakPending ? `<br><span class="muted" style="font-size:.82rem">${r.scores.speaking == null ? "tạm tính, chưa gồm Speaking" : "tạm tính, Speaking chưa chấm đủ"}</span>` : ""}</td><td>${CORE_SKILLS.map((k) => (r.scores[k] == null ? "–" : r.scores[k])).join(" · ")}</td><td>${r.scores.grammar == null ? "–" : r.scores.grammar + "/50"}</td><td>${MOCK_STATUS[r.status] || esc(r.status)}${r.strikes ? `<br><span class="muted" style="font-size:.85rem">⚠️ ${r.strikes} lần rời màn hình</span>` : ""}</td></tr>`).join("")}
        </table></div><p class="muted" style="font-size:.85rem">Muốn xem lại bài làm từng phần: vào đề lẻ tương ứng → Lịch sử làm bài → Xem lại.</p></div>` : ""}
      </div></div>`;
    app.querySelector("#openRoom").onclick = () => {
      const url = location.pathname + location.search + "#/mock/" + m.id + "/run";
      let w = null;
      try { w = window.open(url, "flashaptis-mock-" + m.id); } catch (e) {}
      if (!w) { location.hash = "#/mock/" + m.id + "/run"; return; } // trình duyệt chặn mở tab → vào phòng thi ngay tại tab này
      app.querySelector("#roomNote").innerHTML = `<div class="explain mt-2">🪟 Phòng thi đã mở ở <b>tab mới</b>. Làm bài ở tab đó — tab này sẽ tự cập nhật lịch sử khi bạn thi xong.</div>`;
    };
  }

  /* phòng chờ: kiểm tra micro, đồng ý nội quy → vào toàn màn hình và bắt đầu phần 1 */
  function viewMockRoom(m) {
    view = "mockRoom";
    const fsOK = lock.fsOK();
    const micOK = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="card mock-room">
          <span class="eyebrow">Phòng thi</span>
          <h1 class="page-title mb-1">🏁 ${esc(m.title)}</h1>
          <p class="muted">5 phần · khoảng ${MOCK_MIN} phút · ${MOCK_MAX_STRIKES === 1 ? "<b>rời màn hình thi là tự nộp bài ngay</b>" : `tối đa ${MOCK_MAX_STRIKES - 1} lần cảnh báo rời màn hình`}.</p>
          <ul class="mock-check">
            <li id="ckMic">${micOK ? `🎙️ Micro (bắt buộc kiểm tra — để hộp xin quyền không bật lên giữa giờ thi và bị tính là rời màn hình): <button type="button" class="btn btn-outline btn-sm" id="micBtn">Kiểm tra micro</button> <span id="micSt" class="muted"></span>
              <label class="mock-agree" style="margin-top:6px;font-weight:400"><input type="checkbox" id="noMic"> Tôi không có micro — thi Speaking không ghi âm</label>` : `⚠️ Trình duyệt không hỗ trợ ghi âm — phần Speaking vẫn làm được nhưng không ghi âm (nên dùng Chrome/Edge).`}</li>
            <li>${fsOK ? `🖥️ Phòng thi sẽ chuyển sang <b>toàn màn hình</b>. ${lock.kbOK() ? "Phím <b>Esc bị khóa</b> (muốn thoát phải giữ Esc vài giây) — thoát toàn màn hình hay chuyển tab đều bị tính vi phạm." : "Đừng bấm <b>Esc</b> hay chuyển tab — mỗi lần thoát toàn màn hình bị tính 1 lần vi phạm."}` :"⚠️ Trình duyệt này không hỗ trợ toàn màn hình — vẫn thi được, nhưng mọi lần chuyển tab/ứng dụng đều bị ghi lại."}</li>
            <li>🎧 Bật loa/tai nghe cho phần Listening.</li>
          </ul>
          <div class="card intro-box mt-2"><ul>${MOCK_RULES.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          <label class="mock-agree"><input type="checkbox" id="agree"> Tôi đã đọc nội quy và tự làm bài, không tra cứu tài liệu hay dùng AI.</label>
          <div class="row mt-2">
            <button class="btn btn-primary btn-lg" id="enterBtn" disabled>Vào phòng thi & bắt đầu</button>
            <a class="btn btn-ghost" href="#/mock/${m.id}">Hủy</a>
          </div>
        </div>
      </div></div>`;
    const agree = app.querySelector("#agree"), enter = app.querySelector("#enterBtn"), noMic = app.querySelector("#noMic");
    let micReady = !micOK; // trình duyệt không ghi âm được → không cần kiểm tra
    const sync = () => (enter.disabled = !(agree.checked && (micReady || (noMic && noMic.checked))));
    const mb = app.querySelector("#micBtn");
    if (mb) mb.onclick = async () => {
      const stEl = app.querySelector("#micSt");
      stEl.textContent = "Đang xin quyền…";
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        s.getTracks().forEach((t) => t.stop());
        micReady = true;
        stEl.innerHTML = `<span class="txt-ok">✓ Micro hoạt động</span>`;
      } catch (e) { stEl.textContent = "✗ Chưa có quyền micro — bấm biểu tượng 🔒 trên thanh địa chỉ để cho phép, rồi thử lại."; }
      sync();
    };
    agree.onchange = sync;
    if (noMic) noMic.onchange = sync;
    enter.onclick = () => {
      if (mockLocked(m) || needLogin()) return route();
      mockRun = { m, idx: 0, os: {}, strikes: 0, at: Date.now(), terminated: false, inBreak: false };
      document.body.classList.add("mock-on");
      lock.start(); // trong cùng cú bấm → được phép bật toàn màn hình
      mockSection(0);
    };
  }

  function mockSection(i) {
    if (!mockRun) return;
    mockRun.idx = i;
    mockRun.inBreak = false;
    lock.grace(2500); // xin quyền micro / chuyển màn có thể làm cửa sổ mất tiêu điểm trong chốc lát
    window.scrollTo(0, 0);
    const k = MOCK_ORDER[i];
    RUNNERS[k](mockTest(mockRun.m, k));
  }

  /* một phần vừa nộp (renderResult gọi tới) */
  function mockCollect(o) {
    const run = mockRun;
    clearDraft(o.skill, o.test.id);
    saveExamAttempt(o, { mock: run.m.id });
    run.os[o.skill] = o;
    const next = run.idx + 1;
    if (run.terminated) return mockEnd("terminated");
    if (next >= MOCK_ORDER.length) return mockEnd("done");
    mockBreak(next);
  }

  /* màn chuyển phần: cú bấm "Bắt đầu" là thao tác người dùng mới → bật lại toàn màn hình / giọng đọc / micro hợp lệ */
  function mockBreak(i) {
    view = "mockBreak";
    mockRun.idx = i;
    mockRun.inBreak = true;
    const k = MOCK_ORDER[i], S = SKILLS[k], prev = MOCK_ORDER[i - 1];
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        ${mockStripHTML()}
        <div class="card empty mock-break">
          <div class="big">${S.icon}</div>
          <p class="txt-ok mb-1">✓ Đã nộp phần ${esc(SKILLS[prev].name)}</p>
          <h2>Phần ${i + 1}/${MOCK_ORDER.length}: ${esc(S.name)}</h2>
          <p class="muted">${esc(S.meta)}${k === "speaking" ? " · máy đọc câu hỏi và tự chuyển câu" : ""}</p>
          <p style="font-size:.92rem">Hít thở, sẵn sàng thì bấm bắt đầu — đồng hồ phần này chỉ chạy khi bạn bấm.</p>
          <button class="btn btn-primary btn-lg" id="goNext">Bắt đầu phần ${esc(short(k))} →</button>
        </div>
      </div></div>`;
    window.scrollTo(0, 0);
    app.querySelector("#goNext").onclick = () => { lock.enterFS(); mockSection(i); };
  }

  /* vi phạm lần cuối → tự nộp phần đang làm (bỏ qua hộp xác nhận) rồi kết thúc */
  function mockTerminate(reason) {
    const run = mockRun;
    if (!run || run.terminated) return;
    run.terminated = true;
    run.endReason = reason || "";
    if (running) {
      const b = document.getElementById("submitBtn");
      const c = FA.confirm;
      FA.confirm = () => Promise.resolve(true); // các nút Nộp bài gọi FA.confirm ngay đầu hàm → trả "đồng ý" luôn
      try { if (b) b.click(); else { clearRun(); mockEnd("terminated"); } } finally { FA.confirm = c; }
      FA.toast(MOCK_MAX_STRIKES === 1 ? "Bạn đã rời màn hình thi — bài thi đã tự nộp." : `Bạn đã rời màn hình thi ${MOCK_MAX_STRIKES} lần — bài thi đã tự nộp.`);
    } else if (run.inBreak) mockEnd("terminated");
    // đang chấm (Writing/Speaking chờ AI) → mockCollect sẽ kết thúc khi chấm xong
  }

  function mockEnd(status, render) {
    const run = mockRun;
    if (!run) return;
    mockRun = null;
    running = false;
    lock.stop();
    document.body.classList.remove("mock-on");
    FA.stopSpeak();
    const rec = mockRecord(run, status);
    saveMockRec(run.m.id, rec);
    if (render === false) return;
    viewMockResult(run, rec);
    if (status === "done" && FA.celebrate) {
      const selfWait = !!(run.os.speaking && run.os.speaking.selfScore);
      FA.celebrate(rec.speakPending
        ? { icon: "🏁", title: `Hoàn thành ${run.m.title}!`, sub: selfWait ? "Tự chấm Speaking ở tab bên dưới để có điểm Overall đầy đủ." : "Mở tab Speaking để xem câu nào AI chưa chấm được." }
        : rec.overall >= 180
          ? { icon: "🎆", title: `Xuất sắc! ${run.m.title}: ${rec.overall}/200 (${Math.round(rec.overall / 2)}%)`, sub: `Bậc CEFR ước lượng ${rec.cefr} — quá đỉnh!`, confetti: true }
          : { icon: "🏁", title: `Hoàn thành ${run.m.title}: ${rec.overall}/200`, sub: `Bậc CEFR ước lượng ${rec.cefr} — xem chi tiết từng phần bên dưới.`, confetti: false });
    }
  }

  function viewMockResult(run, rec) {
    view = "mockResult";
    const m = run.m;
    const tileNote = (k) => (k === "speaking" && rec.speakPending ? (rec.scores[k] == null ? "chờ tự chấm" : "điểm tạm tính") : rec.scores[k] == null ? "chưa làm" : k === "grammar" ? "không cộng Overall" : esc((rec.cefrs && rec.cefrs[k]) || ""));
    const summary = () => `
      <div class="result-hero">
        <div class="ring-lg" style="--p:${Math.round((rec.overall / 200) * 100)}"><div><b>${rec.overall}</b><span>/200</span></div></div>
        <div style="flex:1">
          <span class="eyebrow">Kết quả Full Test · ${esc(m.title)}</span>
          <h2 class="mb-0">${rec.status === "done" ? "Hoàn thành bài thi! 🎉" : rec.status === "terminated" ? "Bài thi bị dừng" : "Bài thi kết thúc sớm"}</h2>
          <div class="row mt-1"><span class="cefr-badge">${esc(rec.cefr)}</span><span class="muted">bậc CEFR Overall ước lượng (Listening + Reading + Speaking + Writing)</span></div>
          <div class="mock-scores">${MOCK_ORDER.map((k) => `<div class="${k === "grammar" ? "g" : ""}"><span>${SKILLS[k].icon} ${esc(short(k))}</span><b>${rec.scores[k] == null ? "–" : rec.scores[k]}<small>/50</small></b><em>${tileNote(k)}</em></div>`).join("")}</div>
          ${rec.status === "terminated" ? `<div class="explain mt-1">⛔ ${rec.strikes > 1 ? `Bạn đã rời màn hình thi ${rec.strikes} lần` : "Bạn đã rời màn hình thi"}${run.endReason ? ` (${esc(run.endReason.replace(/\.$/, ""))})` : ""} nên bài thi tự nộp phần đang làm và dừng. Các phần chưa làm tính 0 điểm.</div>` : rec.status === "aborted" ? `<div class="explain mt-1">⏹ Bạn đã kết thúc sớm — các phần chưa làm tính 0 điểm.</div>` : ""}
          ${rec.strikes && rec.status !== "terminated" ? `<p class="muted mb-0 mt-1" style="font-size:.88rem">⚠️ Ghi nhận ${rec.strikes} lần rời màn hình trong lúc thi.</p>` : ""}
          ${rec.speakPending ? `<div class="explain mt-1">🎙️ <b>Overall đang tạm tính${rec.scores.speaking == null ? ", chưa gồm Speaking" : ""}.</b> ${rec.scores.speaking == null ? "Không dùng AI nên bạn cần tự chấm: mở tab Speaking bên dưới, nghe lại bản ghi, chọn điểm từng part rồi bấm <b>Lưu điểm tự chấm</b> — Overall và bậc CEFR sẽ tự cập nhật." : "AI chưa chấm được một số câu Speaking. Mở tab Speaking để xem hoặc tự chấm bù."}</div>` : ""}
        </div>
      </div>`;
    const done = MOCK_ORDER.filter((k) => run.os[k]);
    app.innerHTML = `
      <div class="page"><div class="container narrow" id="mockRes">
        <div class="crumbs"><a href="#/mock">← Full Test</a> / ${esc(m.title)} / Kết quả</div>
        <div class="card" id="mockSum">${summary()}
          <div class="row mt-3">
            ${window.opener ? `<button class="btn btn-primary" id="closeWin">Đóng phòng thi</button>` : ""}
            <a class="btn ${window.opener ? "btn-outline" : "btn-primary"}" href="#/mock/${m.id}">Về trang ${esc(m.title)}</a>
            <a class="btn btn-ghost" href="#/mock">Full Test khác</a>
          </div>
        </div>
        ${done.length ? `<h2 class="mt-4">Xem lại bài làm từng phần</h2>
        <div class="tabs" id="mockTabs">${done.map((k, i) => `<button class="tab ${i === 0 ? "active" : ""}" data-mt="${k}">${SKILLS[k].icon} ${esc(short(k))} · ${run.os[k].score}/50</button>`).join("")}</div>
        <div id="mockPanels">${done.map((k, i) => `<div data-mp="${k}" ${i ? "hidden" : ""}><div class="card mb-2" data-mnote="${k}"></div><div data-mrev="${k}"></div></div>`).join("")}</div>` : ""}
      </div></div>`;
    window.scrollTo(0, 0);
    const cw = app.querySelector("#closeWin");
    if (cw) cw.onclick = () => window.close();
    const noteHTML = (o) => `<b>${esc(SKILLS[o.skill].name)}: ${o.score}/50</b>${o.cefr ? ` · <span class="pill">${esc(o.cefr)}</span>` : ""}
      <p class="muted mt-1 mb-0" style="font-size:.88rem">${o.note || ""}</p>
      <div class="breakdown">${(o.breakdown || []).map((b) => `<div class="bar-row"><span>${esc(b.label)}</span><div class="progress"><i style="width:${b.total ? Math.round((b.got / b.total) * 100) : 0}%"></i></div><b>${b.got}/${b.total}</b></div>`).join("")}</div>`;
    const mounted = {};
    const mount = (k) => {
      if (mounted[k]) return;
      mounted[k] = true;
      const o = run.os[k];
      const noteEl = app.querySelector(`[data-mnote="${k}"]`), rv = app.querySelector(`[data-mrev="${k}"]`);
      noteEl.innerHTML = noteHTML(o);
      const update = (n) => {
        const wasPending = !!rec.speakPending;
        Object.assign(o, n);
        if (k === "speaking") run.speakSaved = true; // người dùng đã tự chấm → tính Speaking vào Overall
        if (o.attemptAt) FA.updateAttempt(o.skill, o.test.id, o.attemptAt, Object.assign({ score: o.score, cefr: o.cefr }, n.ans ? { ans: n.ans } : {}));
        const r2 = mockRecord(run, rec.status);
        Object.assign(rec, { scores: r2.scores, cefrs: r2.cefrs, overall: r2.overall, cefr: r2.cefr, speakPending: r2.speakPending });
        saveMockRec(m.id, rec);
        const sum = app.querySelector("#mockSum .result-hero");
        if (sum) sum.outerHTML = summary();
        noteEl.innerHTML = noteHTML(o);
        const tb = app.querySelector(`[data-mt="${k}"]`);
        if (tb) tb.textContent = `${SKILLS[k].icon} ${short(k)} · ${o.score}/50`;
        if (rec.status === "done" && k === "speaking" && wasPending && !rec.speakPending && FA.celebrate) {
          FA.celebrate({ icon: rec.overall >= 180 ? "🎆" : "🏁", title: `Overall ${run.m.title}: ${rec.overall}/200`, sub: `Đã gồm Speaking — bậc CEFR ước lượng ${rec.cefr}.${rec.overall >= 180 ? " Xuất sắc!" : ""}`, confetti: rec.overall >= 180 });
        }
      };
      watchReports(rv, k, o.test);
      o.review(rv, update);
    };
    if (done.length) mount(done[0]);
    app.querySelectorAll("[data-mt]").forEach((b) => (b.onclick = () => {
      app.querySelectorAll("[data-mt]").forEach((x) => x.classList.toggle("active", x === b));
      app.querySelectorAll("[data-mp]").forEach((p) => (p.hidden = p.dataset.mp !== b.dataset.mt));
      mount(b.dataset.mt);
    }));
  }

  /* ---------- khóa phòng thi ---------- */
  const lock = {
    on: false, graceUntil: 0, blurT: 0, ov: null,
    fsOK() { const d = document.documentElement; return !!(d.requestFullscreen || d.webkitRequestFullscreen); },
    inFS() { return !!(document.fullscreenElement || document.webkitFullscreenElement); },
    /* Keyboard Lock (Chrome/Edge/Brave/Opera… trên máy tính, cần https hoặc localhost): khi đang toàn màn hình,
       bấm Esc một lần KHÔNG thoát nữa — phải GIỮ Esc ~2 giây (trình duyệt tự hiện hướng dẫn). Firefox/Safari chưa hỗ trợ:
       Esc vẫn thoát ngay → bị tính 1 lần vi phạm (onFS). Không trình duyệt nào cho web chặn hẳn Esc. */
    kbOK() { return !!(navigator.keyboard && navigator.keyboard.lock); },
    kbLock() { if (lock.kbOK() && lock.inFS()) navigator.keyboard.lock(["Escape"]).catch(() => {}); },
    enterFS() {
      if (!lock.fsOK()) return;
      if (lock.inFS()) return lock.kbLock();
      const d = document.documentElement;
      try {
        const p = (d.requestFullscreen || d.webkitRequestFullscreen).call(d, { navigationUI: "hide" });
        if (p && p.then) p.then(lock.kbLock, () => {});
      } catch (e) {}
    },
    exitFS() {
      if (lock.kbOK()) { try { navigator.keyboard.unlock(); } catch (e) {} }
      if (!lock.inFS()) return;
      try { const p = (document.exitFullscreen || document.webkitExitFullscreen).call(document); if (p && p.catch) p.catch(() => {}); } catch (e) {}
    },
    grace(ms) { lock.graceUntil = Math.max(lock.graceUntil, Date.now() + ms); },
    start() {
      lock.on = true;
      lock.grace(2000);
      document.addEventListener("visibilitychange", lock.onVis);
      window.addEventListener("blur", lock.onBlur);
      window.addEventListener("focus", lock.onFocus);
      document.addEventListener("fullscreenchange", lock.onFS);
      document.addEventListener("webkitfullscreenchange", lock.onFS);
      window.addEventListener("keydown", lock.onKey, true);
      ["copy", "cut", "paste", "contextmenu", "drop"].forEach((t) => document.addEventListener(t, lock.onClip, true));
      lock.enterFS();
    },
    stop() {
      lock.on = false;
      clearTimeout(lock.blurT);
      document.removeEventListener("visibilitychange", lock.onVis);
      window.removeEventListener("blur", lock.onBlur);
      window.removeEventListener("focus", lock.onFocus);
      document.removeEventListener("fullscreenchange", lock.onFS);
      document.removeEventListener("webkitfullscreenchange", lock.onFS);
      window.removeEventListener("keydown", lock.onKey, true);
      ["copy", "cut", "paste", "contextmenu", "drop"].forEach((t) => document.removeEventListener(t, lock.onClip, true));
      if (lock.ov) { lock.ov.remove(); lock.ov = null; }
      lock.exitFS();
    },
    onVis() { if (document.visibilityState === "hidden") lock.strike("Bạn đã chuyển sang tab hoặc ứng dụng khác."); },
    onBlur() {
      clearTimeout(lock.blurT);
      lock.blurT = setTimeout(() => {
        const a = document.activeElement;
        if (a && (a.tagName === "SELECT" || a.tagName === "IFRAME")) return; // hộp chọn đáp án đang mở
        if (!document.hasFocus()) lock.strike("Cửa sổ bài thi bị mất tiêu điểm — bạn đã bấm sang cửa sổ hoặc ứng dụng khác.");
      }, 1500);
    },
    onFocus() { clearTimeout(lock.blurT); },
    onFS() { if (lock.on && lock.fsOK() && !lock.inFS()) lock.strike("Bạn đã thoát chế độ toàn màn hình."); },
    onKey(e) {
      const k = (e.key || "").toLowerCase(), mod = e.ctrlKey || e.metaKey;
      const bad = k === "f12" || k === "f5" || (mod && e.shiftKey && ["i", "j", "c", "k", "r"].includes(k)) || (mod && !e.shiftKey && ["u", "s", "p", "c", "x", "v", "r"].includes(k));
      if (!bad) return;
      e.preventDefault();
      e.stopPropagation();
      FA.toast("Phím tắt này bị khóa trong phòng thi.");
    },
    onClip(e) {
      if (e.type === "drop" && !(e.target && e.target.matches && e.target.matches("input, textarea"))) return; // kéo thả sắp xếp câu (Reading) vẫn dùng được
      e.preventDefault();
      if (e.type === "paste" || e.type === "drop") FA.toast("Không được dán văn bản trong phòng thi.");
      else if (e.type !== "contextmenu") FA.toast("Không được sao chép nội dung đề trong phòng thi.");
    },
    strike(reason) {
      const run = mockRun;
      if (!lock.on || !run || run.terminated || lock.ov || Date.now() < lock.graceUntil) return;
      run.strikes++;
      const b = document.getElementById("mockStrikes");
      if (b) { b.textContent = `⚠️ ${run.strikes}/${MOCK_MAX_STRIKES}`; b.classList.add("on"); }
      if (run.strikes >= MOCK_MAX_STRIKES) return mockTerminate(reason);
      const left = MOCK_MAX_STRIKES - run.strikes;
      const ov = (lock.ov = document.createElement("div"));
      ov.className = "lock-ov";
      ov.innerHTML = `<div class="lock-box" role="alertdialog" aria-modal="true">
        <div class="big">⚠️</div>
        <h2>Cảnh báo ${run.strikes}/${MOCK_MAX_STRIKES}: bạn đã rời màn hình thi</h2>
        <p>${esc(reason)}</p>
        <p><b>${left === 1 ? "Lần vi phạm tiếp theo bài thi sẽ tự nộp và kết thúc." : `Còn ${left} lần nữa bài thi sẽ tự nộp và kết thúc.`}</b> Đồng hồ vẫn đang chạy.</p>
        <button class="btn btn-primary btn-lg" type="button">Quay lại bài thi</button>
      </div>`;
      document.body.append(ov);
      const btn = ov.querySelector("button");
      btn.onclick = () => { ov.remove(); lock.ov = null; lock.grace(1500); lock.enterFS(); };
      setTimeout(() => btn.focus(), 0);
    },
  };

  route();
})();
