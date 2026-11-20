/* FlashAptis — tính toán Lộ trình học (dashboard.html). Thuần dữ liệu, không đụng DOM → kiểm thử được bằng Node (tests/test.js).
   Nguồn dữ liệu: lượt làm bài (FA.store "attempts"), flashcard đã thuộc ("fc-known"), mẹo đã xong ("tips-done"), mục tiêu người dùng ("roadmap").
   Mục tiêu = bậc CEFR (B1/B2/C1) → ngưỡng điểm từng kỹ năng + Overall lấy từ FA.CEFR (common.js), nên đổi thang điểm ở đó là đủ. */
(function () {
  const FA = (window.FA = window.FA || {});
  const CORE = ["listening", "reading", "speaking", "writing"];
  const LEVELS = ["B1", "B2", "C1"];
  const DAY = 86400000;

  /* ngưỡng điểm cho một bậc: Overall (thang 200) và từng kỹ năng (thang 50). Bảng kỹ năng ghi C1/C2 chung là "C". */
  function targets(level) {
    const lv = LEVELS.indexOf(level) > -1 ? level : "B2";
    const skillLabel = lv === "C1" ? "C" : lv;
    const skills = {};
    CORE.forEach((k) => {
      const row = FA.CEFR[k].find((r) => r[1] === skillLabel);
      skills[k] = row ? row[0] : 0;
    });
    const ov = FA.CEFR.overall.find((r) => r[1] === lv);
    return { level: lv, overall: ov ? ov[0] : 0, skills };
  }

  const dayKey = (ts) => {
    const d = new Date(ts);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };

  /* in: {
       goal: {target, examDate:'YYYY-MM-DD'|''}, banks: {skill: [testId,...]} (theo thứ tự đề), openCount: {skill: số đề được mở với gói hiện tại — đề Free/Pro},
       attempts, fcKnown, tipsDone: [], vocabTotal, tipsTotal, now } */
  function compute(inp) {
    const now = inp.now || Date.now();
    const goal = inp.goal || {};
    const T = targets(goal.target);
    const attempts = inp.attempts || {};
    const banks = inp.banks || {};
    const openCount = inp.openCount || {};

    /* --- từng kỹ năng --- */
    const skills = {};
    Object.keys(banks).forEach((k) => {
      const ids = banks[k];
      let done = 0, latest = null, best = null;
      ids.forEach((id) => {
        const recs = attempts[k + ":" + id] || [];
        if (recs.length) done++;
        recs.forEach((r) => {
          if (typeof r.score !== "number") return;
          if (!latest || r.at > latest.at) latest = r;
          if (best == null || r.score > best) best = r.score;
        });
      });
      const cap = openCount[k] != null ? Math.min(openCount[k], ids.length) : ids.length;
      const target = T.skills[k] || 0;
      const lastScore = latest ? latest.score : null;
      skills[k] = {
        done, total: ids.length, cap, latest: lastScore, best, target,
        pct: target && lastScore != null ? Math.min(100, Math.round((lastScore / target) * 100)) : 0,
        reached: !!(target && lastScore != null && lastScore >= target),
        nextId: ids.slice(0, cap).find((id) => !(attempts[k + ":" + id] || []).length) || ids[0] || null,
      };
    });

    const ovOf = (mode) => CORE.reduce((n, k) => n + ((skills[k] && skills[k][mode]) || 0), 0);
    const overall = { latest: ovOf("latest"), best: ovOf("best"), target: T.overall, scored: CORE.filter((k) => skills[k] && skills[k].latest != null).length };
    overall.reached = overall.scored === 4 && overall.latest >= overall.target;
    overall.pct = overall.target ? Math.min(100, Math.round((overall.latest / overall.target) * 100)) : 0;

    /* --- các giai đoạn lộ trình (mỗi việc tự tick theo dữ liệu thật) --- */
    const fcN = Object.keys(inp.fcKnown || {}).length;
    const tipN = (inp.tipsDone || []).length;
    const href = (k) => (skills[k] && skills[k].nextId ? "exam.html#/" + k + "/" + skills[k].nextId : "exam.html#/" + k);
    const need = (k, n) => Math.min(n, (skills[k] && skills[k].cap) || n);
    const name = { listening: "Listening", reading: "Reading", speaking: "Speaking", writing: "Writing", grammar: "Grammar & Vocabulary" };
    const task = (id, label, have, needN, to) => ({ id, label, have: Math.min(have, needN), need: needN, done: needN > 0 ? have >= needN : true, href: to });

    const stages = [
      { id: "s1", icon: "🌱", title: "Nền tảng", weeks: "Tuần 1", desc: "Làm quen định dạng đề, nạp từ vựng và mẹo cơ bản.", tasks: [
        task("g1", "Làm 1 đề Grammar & Vocabulary", (skills.grammar || {}).done || 0, need("grammar", 1), href("grammar")),
        task("fc", "Thuộc 30 flashcard", fcN, Math.min(30, inp.vocabTotal || 30), "flashcards.html"),
        task("tip", "Hoàn thành 5 mẹo đầu", tipN, Math.min(5, inp.tipsTotal || 5), "tips.html"),
      ] },
      { id: "s2", icon: "🧭", title: "Khởi động 4 kỹ năng", weeks: "Tuần 2", desc: "Thử đủ Listening, Reading, Speaking, Writing để biết điểm xuất phát.",
        tasks: CORE.map((k) => task("w1" + k, "Làm 1 đề " + name[k], (skills[k] || {}).done || 0, need(k, 1), href(k))) },
      { id: "s3", icon: "🏋️", title: "Luyện sâu", weeks: "Tuần 3–6", desc: "Làm nhiều đề mỗi kỹ năng, ôn lại câu sai để nâng điểm yếu.",
        tasks: CORE.map((k) => task("w3" + k, "Làm 3 đề " + name[k], (skills[k] || {}).done || 0, need(k, 3), href(k))) },
      { id: "s4", icon: "🎯", title: "Chạm mục tiêu " + T.level, weeks: "Tuần 7+", desc: "Thi thử đủ 4 kỹ năng, mỗi kỹ năng đạt ngưỡng " + T.level + " ở lần làm gần nhất.",
        tasks: CORE.map((k) => task("t" + k, name[k] + " ≥ " + T.skills[k] + "/50", (skills[k] || {}).reached ? 1 : 0, 1, href(k))).concat([
          task("tov", "Overall ≥ " + T.overall + "/200", overall.reached ? 1 : 0, 1, "exam.html#/progress"),
        ]) },
    ];
    stages.forEach((s) => {
      s.doneTasks = s.tasks.filter((t) => t.done).length;
      s.done = s.doneTasks === s.tasks.length;
      s.pct = Math.round((s.doneTasks / s.tasks.length) * 100);
    });
    const cur = stages.findIndex((s) => !s.done);
    stages.forEach((s, i) => { s.state = s.done ? "done" : i === cur ? "current" : "todo"; });
    const totalTasks = stages.reduce((n, s) => n + s.tasks.length, 0);
    const doneTasks = stages.reduce((n, s) => n + s.doneTasks, 0);

    /* --- hoạt động 14 ngày + chuỗi ngày học --- */
    // inp.activity = FA.daily.perDay() (điểm học theo ngày, cùng nguồn với chuỗi ngày trên header); không có thì tự suy ra
    const perDay = inp.activity ? Object.assign({}, inp.activity) : {};
    if (!inp.activity) {
      const bump = (ts) => { if (typeof ts === "number" && ts > 0) { const k = dayKey(ts); perDay[k] = (perDay[k] || 0) + 1; } };
      Object.keys(attempts).forEach((k) => (attempts[k] || []).forEach((r) => bump(r.at)));
      Object.keys(inp.fcKnown || {}).forEach((k) => bump(inp.fcKnown[k]));
    }
    const days = [];
    for (let i = 13; i >= 0; i--) { const t = now - i * DAY; days.push({ key: dayKey(t), ts: t, n: perDay[dayKey(t)] || 0 }); }
    let streak = 0;
    for (let i = perDay[dayKey(now)] ? 0 : 1; ; i++) { // hôm nay chưa học thì chuỗi tính tới hôm qua
      if (perDay[dayKey(now - i * DAY)]) streak++; else break;
      if (i > 3650) break;
    }

    /* --- ngày thi & nhịp học gợi ý --- */
    let daysLeft = null;
    if (goal.examDate && /^\d{4}-\d{2}-\d{2}$/.test(goal.examDate)) {
      const end = new Date(goal.examDate + "T23:59:59").getTime();
      if (!isNaN(end)) daysLeft = Math.ceil((end - now) / DAY);
    }
    const s3 = stages[2];
    const remainingTests = s3.tasks.reduce((n, t) => n + (t.need - t.have), 0);
    const pace = daysLeft != null && daysLeft > 0 && remainingTests > 0 ? Math.max(1, Math.ceil(remainingTests / Math.max(1, Math.ceil(daysLeft / 7)))) : null;

    /* --- kỹ năng yếu nhất (so với mục tiêu) --- */
    const scored = CORE.filter((k) => skills[k] && skills[k].latest != null && !skills[k].reached);
    const weakest = scored.sort((a, b) => skills[a].pct - skills[b].pct)[0] || null;

    /* --- việc nên làm tiếp: các việc chưa xong của giai đoạn hiện tại --- */
    const next = cur > -1 ? stages[cur].tasks.filter((t) => !t.done).slice(0, 3) : [];

    return {
      target: T, skills, overall, stages, currentStage: cur, complete: cur === -1,
      pct: totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0, doneTasks, totalTasks,
      days, streak, activeDays: days.filter((d) => d.n).length, daysLeft, pace, remainingTests, weakest, next,
      fcN, tipN,
    };
  }

  /* tính lộ trình từ dữ liệu đang có trên trang (cần đủ 5 ngân hàng đề global) — null nếu trang không nạp đề */
  function fromStore(now) {
    const G = { listening: window.FA_LISTENING, reading: window.FA_READING, speaking: window.FA_SPEAKING, writing: window.FA_WRITING, grammar: window.FA_GRAMMAR };
    if (Object.keys(G).some((k) => !Array.isArray(G[k]))) return null;
    const banks = {}, openCount = {};
    Object.keys(G).forEach((k) => {
      banks[k] = G[k].map((t) => t.id);
      openCount[k] = G[k].filter((t, i) => !(FA.plan && FA.plan.locked(i))).length;
    });
    return compute({
      goal: Object.assign({ target: "B2", examDate: "" }, FA.store.get("roadmap", {})), banks, openCount,
      attempts: FA.store.get("attempts", {}), fcKnown: FA.store.get("fc-known", {}), tipsDone: FA.store.get("tips-done", []),
      vocabTotal: (window.FA_VOCAB || []).reduce((n, d) => n + d.cards.length, 0) || undefined, tipsTotal: 20,
      activity: FA.daily ? FA.daily.perDay() : undefined, now: now || Date.now(),
    });
  }
  /* giai đoạn vừa hoàn thành từ lần kiểm tra trước (lưu "roadmap-seen" trên máy). Lần đầu chỉ ghi nhận, không báo —
     tránh ăn mừng lại những giai đoạn người dùng đã xong từ trước khi có tính năng này. Giai đoạn 4 gắn với bậc mục tiêu. */
  const seenId = (s, r) => (s.id === "s4" ? "s4:" + r.target.level : s.id);
  function newlyDone(r) {
    r = r || fromStore();
    if (!r) return [];
    const doneIds = r.stages.filter((s) => s.done).map((s) => seenId(s, r));
    const seen = FA.store.get("roadmap-seen", null);
    if (!Array.isArray(seen)) { FA.store.set("roadmap-seen", doneIds); return []; }
    const fresh = r.stages.filter((s) => s.done && seen.indexOf(seenId(s, r)) < 0);
    if (fresh.length) FA.store.set("roadmap-seen", Array.from(new Set(seen.concat(doneIds))));
    return fresh;
  }
  /* gọi trước khi ghi dữ liệu mới để lần đầu dùng tính năng vẫn có mốc so sánh */
  function primeSeen() { if (!Array.isArray(FA.store.get("roadmap-seen", null))) newlyDone(); }
  function celebrateStages(r) {
    if (!FA.celebrate) return;
    newlyDone(r).forEach((s) => FA.celebrate({ icon: s.icon, title: "Hoàn thành giai đoạn: " + s.title, sub: s.id === "s4" ? "Bạn đã chạm mục tiêu " + (r || fromStore()).target.level + " — tuyệt vời!" : "Giai đoạn tiếp theo đã mở trong Lộ trình học." }));
  }

  FA.roadmap = { CORE, LEVELS, targets, compute, fromStore, newlyDone, primeSeen, celebrateStages };
})();
