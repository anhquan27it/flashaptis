/* Kiểm thử tự động cho FlashAptis: kiểm tra ngân hàng đề (public/data/*.js) và các hàm chấm điểm/CEFR.
   Chạy bằng: npm test */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");

function createSandbox() {
  const store = new Map();
  const mkEl = () => ({
    className: "", innerHTML: "", value: "", textContent: "", dataset: {}, style: {},
    classList: { toggle() {}, add() {}, remove() {} },
    querySelectorAll: () => [], querySelector: () => null,
    prepend() {}, append() {}, setAttribute() {},
  });
  const sandbox = {
    console, setTimeout, clearTimeout, setInterval, clearInterval,
    Date, Math, JSON, Promise, Object, Array, Number, String, Boolean, Error, RegExp, Set, Map, encodeURIComponent,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
      get length() { return store.size; },
      key: (i) => Array.from(store.keys())[i],
    },
    document: {
      createElement: mkEl, body: mkEl(), head: mkEl(),
      getElementById: () => null, querySelectorAll: () => [], querySelector: () => null,
      addEventListener() {}, removeEventListener() {},
    },
    location: { protocol: "http:", hash: "" },
    addEventListener() {}, removeEventListener() {},
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  return sandbox;
}

function loadScripts(sandbox, relPaths) {
  for (const rel of relPaths) {
    const full = path.join(ROOT, rel);
    vm.runInContext(fs.readFileSync(full, "utf8"), sandbox, { filename: rel });
  }
}

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("  ✓", name);
  } catch (err) {
    console.error("  ✗", name);
    console.error("   ", err.stack || err.message);
    process.exitCode = 1;
  }
}

const sb = createSandbox();
loadScripts(sb, [
  "public/assets/js/core/common.js",
  "public/assets/js/core/roadmap.js",
  "public/data/grammar.js",
  "public/data/reading.js",
  "public/data/listening.js",
  "public/data/writing.js",
  "public/data/writing-rel.js",
  "public/data/speaking.js",
  "public/data/vocab.js",
  "public/assets/js/grading/relevance.js",
  "public/assets/js/grading/speaking-grader.js",
]);

const { FA, FA_GRAMMAR, FA_READING, FA_LISTENING, FA_WRITING, FA_SPEAKING, FA_VOCAB } = sb;

console.log("1. Kiểm tra ngân hàng đề:");

test("Mỗi kỹ năng đều có ít nhất 3 đề (2 Free + Pro)", () => {
  for (const [name, arr] of [["Grammar", FA_GRAMMAR], ["Reading", FA_READING], ["Listening", FA_LISTENING], ["Writing", FA_WRITING], ["Speaking", FA_SPEAKING]]) {
    assert.ok(Array.isArray(arr) && arr.length >= 3, `${name} cần ít nhất 3 đề, hiện có ${arr && arr.length}`);
    const ids = new Set(arr.map((x) => x.id));
    assert.equal(ids.size, arr.length, `${name} có id đề bị trùng`);
  }
});

test("FA_GRAMMAR: 50 câu/đề (25 grammar + 25 vocab), đáp án & giải thích hợp lệ", () => {
  for (const t of FA_GRAMMAR) {
    assert.equal(t.questions.length, 50, `${t.id}: phải có 50 câu`);
    assert.equal(t.questions.filter((q) => q.sec === "grammar").length, 25, `${t.id}: thiếu câu grammar`);
    assert.equal(t.questions.filter((q) => q.sec === "vocab").length, 25, `${t.id}: thiếu câu vocab`);
    t.questions.forEach((q, i) => {
      assert.ok(q.q && q.q.trim(), `${t.id} câu ${i + 1}: thiếu nội dung`);
      assert.ok(Array.isArray(q.o) && q.o.length >= 3 && q.o.length <= 4, `${t.id} câu ${i + 1}: số lựa chọn không hợp lệ`);
      assert.equal(new Set(q.o).size, q.o.length, `${t.id} câu ${i + 1}: có lựa chọn trùng nhau`);
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, `${t.id} câu ${i + 1}: chỉ số đáp án a=${q.a} ngoài phạm vi`);
      assert.ok(q.e && q.e.trim(), `${t.id} câu ${i + 1}: thiếu giải thích`);
    });
  }
});

test("FA_READING: 4–5 part (1–2 bài sắp xếp), chỗ trống/ghép nối/tiêu đề hợp lệ", () => {
  for (const t of FA_READING) {
    const types = t.parts.map((p) => p.type).join(",");
    assert.ok(types === "gap,order,order,opinion,heading" || types === "gap,order,opinion,heading", `${t.id}: sai cấu trúc part (${types})`);
    const p1 = t.parts[0], p4 = t.parts[t.parts.length - 2], p5 = t.parts[t.parts.length - 1];
    p1.gaps.forEach((g, k) => {
      assert.ok(p1.text.includes(`{${k}}`), `${t.id} Part 1: thiếu chỗ trống {${k}}`);
      assert.ok(Number.isInteger(g.a) && g.a >= 0 && g.a < g.o.length, `${t.id} Part 1 gap ${k}: a không hợp lệ`);
      assert.ok(g.e && g.e.trim(), `${t.id} Part 1 gap ${k}: thiếu giải thích`);
    });
    for (const ord of t.parts.filter((p) => p.type === "order")) {
      assert.ok(ord.first && ord.sentences.length >= 4 && ord.sentences.length <= 5, `${t.id} ${ord.title}: phải có 1 câu đầu + 4–5 câu sắp xếp`);
    }
    assert.equal(p4.people.length, 4, `${t.id} Part 4: phải có 4 người`);
    assert.equal(p4.questions.length, 7, `${t.id} Part 4: phải có 7 câu hỏi`);
    p4.questions.forEach((q, k) => assert.ok(q.a >= 0 && q.a < p4.people.length, `${t.id} Part 4 câu ${k + 1}: a không hợp lệ`));
    assert.ok(p5.headings.length >= p5.paragraphs.length, `${t.id} Part 5: thiếu tiêu đề`);
    const usedHeadings = p5.paragraphs.map((p) => p.a);
    usedHeadings.forEach((a, k) => assert.ok(a >= 0 && a < p5.headings.length, `${t.id} Part 5 đoạn ${k + 1}: a không hợp lệ`));
    assert.equal(new Set(usedHeadings).size, p5.paragraphs.length, `${t.id} Part 5: có tiêu đề bị dùng trùng`);
  }
});

test("FA_LISTENING: đủ 4 part (13 mcq, 4 speakers, conv, 2 mono), script & đáp án hợp lệ", () => {
  const checkScript = (sc, label) => {
    assert.ok(Array.isArray(sc) && sc.length > 0, `${label}: script rỗng`);
    sc.forEach((ln) => {
      assert.ok(ln.s === "m" || ln.s === "f", `${label}: giọng '${ln.s}' phải là m hoặc f`);
      assert.ok(ln.t && ln.t.trim(), `${label}: dòng thoại rỗng`);
    });
  };
  for (const t of FA_LISTENING) {
    assert.deepEqual(Array.from(t.parts.map((p) => p.type)), ["mcq", "speakers", "conv", "mono"], `${t.id}: sai cấu trúc 4 part`);
    const [p1, p2, p3, p4] = t.parts;
    assert.equal(p1.items.length, 13, `${t.id} Part 1: phải có 13 câu`);
    p1.items.forEach((it, k) => {
      assert.ok(it.a >= 0 && it.a < it.o.length, `${t.id} Part 1 câu ${k + 1}: a không hợp lệ`);
      checkScript(it.script, `${t.id} Part 1 câu ${k + 1}`);
    });
    assert.equal(p2.speakers.length, 4, `${t.id} Part 2: phải có 4 người nói`);
    assert.equal(p2.options.length, 6, `${t.id} Part 2: phải có 6 lựa chọn`);
    const spAns = p2.speakers.map((s) => s.a);
    assert.equal(new Set(spAns).size, 4, `${t.id} Part 2: đáp án 4 người nói bị trùng`);
    p2.speakers.forEach((sp, k) => {
      assert.ok(sp.a >= 0 && sp.a < p2.options.length, `${t.id} Part 2 speaker ${k}: a không hợp lệ`);
      checkScript(sp.script, `${t.id} Part 2 speaker ${k}`);
    });
    checkScript(p3.script, `${t.id} Part 3`);
    p3.statements.forEach((st, k) => assert.ok(["Man", "Woman", "Both"].includes(st.a), `${t.id} Part 3 câu ${k + 1}: a='${st.a}' không hợp lệ`));
    assert.equal(p4.talks.length, 2, `${t.id} Part 4: phải có 2 bài nói`);
    p4.talks.forEach((tk, k) => {
      checkScript(tk.script, `${t.id} Part 4 talk ${k + 1}`);
      assert.equal(tk.questions.length, 2, `${t.id} Part 4 talk ${k + 1}: phải có 2 câu hỏi`);
      tk.questions.forEach((q, j) => assert.ok(q.a >= 0 && q.a < q.o.length, `${t.id} Part 4 talk ${k + 1} q${j + 1}: a không hợp lệ`));
    });
  }
});

test("FA_WRITING + writing-rel.js: đủ tiêu chí REL và toàn bộ bài mẫu đạt điểm nội dung tối đa", () => {
  for (const t of FA_WRITING) {
    assert.equal(t.p1.questions.length, 5, `${t.id} p1: phải có 5 câu`);
    t.p1.questions.forEach((q, k) => {
      assert.ok(q.t, `${t.id} p1[${k}]: chưa khai báo kiểu trong writing-rel.js`);
      const r = FA.rel.p1(q.t, q.q, q.s);
      assert.equal(r.score, 1, `${t.id} p1[${k}] mẫu "${q.s}" chỉ đạt ${r.score} (${r.why})`);
      const wc = FA.wordCount(q.s);
      assert.ok(wc >= 1 && wc <= 5, `${t.id} p1[${k}] mẫu "${q.s}" có ${wc} từ (yêu cầu 1–5)`);
    });

    assert.ok(Array.isArray(t.p2.r) && t.p2.r.length > 0, `${t.id} p2: thiếu tiêu chí trong writing-rel.js`);
    const r2 = FA.rel.factor(t.p2.r, t.p2.q, t.p2.s);
    assert.equal(r2.frac, 1, `${t.id} p2 mẫu thiếu ý: ${r2.missing.join(", ")}`);
    assert.equal(r2.copied, false, `${t.id} p2 mẫu bị phạt chép đề`);

    assert.equal(t.p3.questions.length, 3, `${t.id} p3: phải có 3 câu`);
    t.p3.questions.forEach((q, k) => {
      assert.ok(Array.isArray(q.r) && q.r.length > 0, `${t.id} p3[${k}]: thiếu tiêu chí trong writing-rel.js`);
      const r3 = FA.rel.factor(q.r, q.q, q.s);
      assert.equal(r3.frac, 1, `${t.id} p3[${k}] mẫu thiếu ý: ${r3.missing.join(", ")}`);
      assert.equal(r3.copied, false, `${t.id} p3[${k}] mẫu bị phạt chép đề`);
    });

    for (const [k, em] of [["p4a", t.p4.informal], ["p4b", t.p4.formal]]) {
      assert.ok(Array.isArray(em.r) && em.r.length > 0, `${t.id} ${k}: thiếu tiêu chí trong writing-rel.js`);
      const r4 = FA.rel.factor(em.r, t.p4.notice, em.s);
      assert.equal(r4.frac, 1, `${t.id} ${k} mẫu thiếu ý: ${r4.missing.join(", ")}`);
      assert.equal(r4.copied, false, `${t.id} ${k} mẫu bị phạt chép đề`);
    }
  }
});

test("FA_SPEAKING & FA_VOCAB: đầy đủ part/thẻ và không trùng từ trong bộ", () => {
  for (const t of FA_SPEAKING) {
    assert.equal(t.p1.length, 3, `${t.id} p1: phải có 3 câu`);
    assert.ok(t.p2.photo && t.p2.photo.cap && t.p2.questions.length === 3, `${t.id} p2 không hợp lệ`);
    assert.ok(t.p3.photos.length === 2 && t.p3.questions.length === 3, `${t.id} p3 không hợp lệ`);
    assert.ok(t.p4.questions.length >= 1 && t.p4.questions.length <= 4 && t.p4.s, `${t.id} p4 không hợp lệ`);
    for (const ph of [t.p2.photo, ...t.p3.photos, t.p4.photo].filter(Boolean)) {
      assert.ok(ph.cap && (ph.emo || ph.img), `${t.id}: ảnh thiếu cap/emo/img`);
      if (ph.img) assert.ok(fs.existsSync(path.join(ROOT, "public", ph.img)), `${t.id}: không có file ảnh ${ph.img}`);
    }
  }
  const deckIds = new Set();
  for (const d of FA_VOCAB) {
    assert.ok(!deckIds.has(d.id), `Trùng deck id: ${d.id}`);
    deckIds.add(d.id);
    const words = new Set();
    for (const c of d.cards) {
      assert.ok(c.w && c.t && c.m && c.x, `Thiếu thông tin thẻ trong deck ${d.id}: ${c.w}`);
      assert.ok(!words.has(c.w), `Trùng từ '${c.w}' trong deck ${d.id}`);
      words.add(c.w);
    }
  }
});

console.log("\n2. Kiểm tra hàm quy đổi CEFR & chấm nội dung:");

test("FA.toCEFR và FA.speakingTo50 đúng ngưỡng quy đổi", () => {
  assert.equal(FA.toCEFR("overall", 39), "A1");
  assert.equal(FA.toCEFR("overall", 40), "A2");
  assert.equal(FA.toCEFR("overall", 80), "B1");
  assert.equal(FA.toCEFR("overall", 120), "B2");
  assert.equal(FA.toCEFR("overall", 160), "C1");
  assert.equal(FA.toCEFR("overall", 180), "C1");
  assert.equal(FA.toCEFR("overall", 181), "C2");
  assert.equal(FA.toCEFR("reading", 25.9), "A2");
  assert.equal(FA.toCEFR("reading", 26), "B1");
  assert.equal(FA.speakingTo50(0), 0);
  assert.equal(FA.speakingTo50(12), 30);
  assert.equal(FA.speakingTo50(20), 50);
  assert.equal(FA.wordCount("Hello, I'm twenty-two!"), 3);
  assert.equal(FA.fmtTime(65), "01:05");
});

test("FA.rel.p1 phạt chép đề, yes/no và chấm đúng kiểu câu trả lời", () => {
  assert.equal(FA.rel.p1("age", "How old are you?", "Yes").score, 0);
  assert.equal(FA.rel.p1("age", "How old are you?", "How old are you").echo, true);
  assert.equal(FA.rel.p1("age", "How old are you?", "I'm twenty-two.").score, 1);
  assert.equal(FA.rel.p1("weather", "What's the weather like today?", "It's sunny and warm.").score, 1);
  assert.equal(FA.rel.p1("weather", "What's the weather like today?", "I like football.").score, 0);
  assert.equal(FA.rel.p1("place", "Where do you live?", "home").score, 0.5);
  assert.equal(FA.rel.p1("place", "Where do you live?", "In Hanoi.").score, 1);
});

test("FA.rel.factor phát hiện chép đề và tích hợp điểm AI hợp lệ", () => {
  const notice = "Due to rising costs, the monthly membership fee will increase from 200,000 VND to 350,000 VND starting next month.";
  const copied = FA.rel.factor(FA_WRITING[2].p4.formal.r, notice, notice);
  assert.equal(copied.copied, true);
  assert.ok(copied.factor < 1);
  const withAI = FA.rel.factor(FA_WRITING[0].p2.r, "Please tell us why...", "Unrelated words", { frac: 0.2, missing: ["thiếu lý do"] });
  assert.ok(Math.abs(withAI.factor - (0.4 + 0.6 * 0.2)) < 1e-9);
  assert.deepEqual(Array.from(withAI.missing), ["thiếu lý do"]);
});

test("FA.speakAI (speaking-grader.js): đếm từ và chỉ bật khi có AI + nhận dạng giọng nói", () => {
  assert.equal(FA.speakAI.words("I'm 20 years old, really!"), 4); // chỉ đếm từ chữ cái
  assert.equal(FA.speakAI.words(""), 0);
  assert.equal(FA.speakAI.enabled(), false); // test không nạp ai-config.js / ai-grader.js
  assert.equal(FA.speakAI.supported(), false); // Node không có SpeechRecognition
});

test("exam.js hiển thị Hub và Bảng tiến độ (#/progress) tính đúng Overall CEFR", () => {
  const s2 = createSandbox();
  const appEl = {
    id: "app", innerHTML: "",
    querySelectorAll: () => [],
    querySelector: () => ({ onclick: null, classList: { toggle() {}, add() {}, remove() {} } }),
  };
  s2.document.getElementById = (id) => (id === "app" ? appEl : null);
  s2.location.hash = "#/progress";
  s2.scrollTo = () => {};
  loadScripts(s2, [
    "public/assets/js/core/common.js",
    "public/data/grammar.js",
    "public/data/reading.js",
    "public/data/listening.js",
    "public/data/writing.js",
    "public/data/writing-rel.js",
    "public/data/speaking.js",
    "public/assets/js/grading/relevance.js",
  ]);
  s2.FA.saveAttempt("listening", "l1", 34, { cefr: "B2" });
  s2.FA.saveAttempt("reading", "r1", 38, { cefr: "B2" });
  s2.FA.saveAttempt("writing", "w1", 32, { cefr: "B1" });
  s2.FA.saveAttempt("speaking", "s1", 30, { cefr: "B1" });
  loadScripts(s2, ["public/assets/js/pages/exam.js"]);
  assert.ok(appEl.innerHTML.includes("Bảng tiến độ học tập"));
  assert.ok(appEl.innerHTML.includes("<b>134</b><span>/200</span>"));
  assert.ok(appEl.innerHTML.includes("còn 26 điểm lên C1"));
});

test("FA.roadmap: ngưỡng mục tiêu, tick lộ trình theo bài đã làm, chuỗi ngày và giới hạn đề Free", () => {
  const T = FA.roadmap.targets("B2");
  assert.equal(T.overall, 120);
  assert.deepEqual(JSON.parse(JSON.stringify(T.skills)), { listening: 34, reading: 38, speaking: 41, writing: 40 });
  assert.equal(FA.roadmap.targets("C1").skills.reading, 46); // C1 dùng bảng "C" của kỹ năng
  assert.equal(FA.roadmap.targets("xyz").level, "B2"); // bậc lạ → mặc định B2

  const NOW = new Date(2026, 5, 15, 12).getTime(), DAY = 86400000;
  const banks = { listening: ["l1", "l2", "l3"], reading: ["r1", "r2", "r3"], speaking: ["s1", "s2", "s3"], writing: ["w1", "w2", "w3"], grammar: ["g1", "g2", "g3"] };
  const openCount = { listening: 2, reading: 2, speaking: 2, writing: 2, grammar: 2 }; // gói Free mở 2 đề đầu
  const base = { goal: { target: "B2", examDate: "2026-07-15" }, banks, openCount, attempts: {}, fcKnown: {}, tipsDone: [], vocabTotal: 100, tipsTotal: 20, now: NOW };

  // chưa làm gì
  let r = FA.roadmap.compute(base);
  assert.equal(r.pct, 0);
  assert.equal(r.currentStage, 0);
  assert.equal(r.streak, 0);
  assert.equal(r.daysLeft, 31);
  assert.equal(r.skills.listening.cap, 2);
  assert.ok(r.stages[2].tasks.every((t) => t.need === 2)); // "làm 3 đề" bị giới hạn còn 2 do gói Free
  assert.equal(r.skills.reading.nextId, "r1");

  // đã làm: Grammar g1, 30 flashcard (hôm nay), 5 mẹo, mỗi kỹ năng chính 1 đề; Listening điểm 40 (đạt mục tiêu 34)
  const fc = {}; for (let i = 0; i < 30; i++) fc["d|w" + i] = NOW;
  const attempts = {
    "grammar:g1": [{ score: 30, at: NOW - 2 * DAY }],
    "listening:l1": [{ score: 20, at: NOW - 3 * DAY }, { score: 40, at: NOW - 1 * DAY }],
    "reading:r1": [{ score: 30, at: NOW - 1 * DAY }],
    "speaking:s1": [{ score: 35, at: NOW - 4 * DAY }],
    "writing:w1": [{ score: 28, at: NOW - 5 * DAY }],
  };
  r = FA.roadmap.compute(Object.assign({}, base, { attempts, fcKnown: fc, tipsDone: [1, 2, 3, 4, 5] }));
  assert.equal(r.stages[0].done, true);
  assert.equal(r.stages[1].done, true);
  assert.equal(r.currentStage, 2);
  assert.equal(r.stages[2].state, "current");
  assert.equal(r.skills.listening.latest, 40); // lượt mới nhất, không phải lượt cao nhất
  assert.equal(r.skills.listening.best, 40);
  assert.equal(r.skills.listening.reached, true);
  assert.equal(r.skills.reading.reached, false);
  assert.equal(r.skills.reading.nextId, "r2"); // đề tiếp theo chưa làm
  assert.equal(r.overall.latest, 40 + 30 + 35 + 28);
  assert.equal(r.overall.reached, true); // 133 ≥ 120, nhưng chưa đủ: từng kỹ năng phải đạt ngưỡng riêng
  assert.equal(r.stages[3].done, false);
  assert.equal(r.weakest, "writing"); // 28/40 = 70% thấp nhất trong các kỹ năng chưa đạt
  assert.equal(r.streak, 6); // hôm nay (flashcard) + hôm qua … 5 ngày trước, liên tục
  assert.ok(r.days.length === 14 && r.days[13].n === 30);
  assert.ok(r.pace >= 1);
  assert.ok(r.next.length > 0 && r.next.every((t) => !t.done));

  // hôm nay chưa học → chuỗi tính tới hôm qua; bỏ một ngày thì chuỗi đứt
  r = FA.roadmap.compute(Object.assign({}, base, { attempts: { "grammar:g1": [{ score: 10, at: NOW - 1 * DAY }, { score: 10, at: NOW - 2 * DAY }, { score: 10, at: NOW - 4 * DAY }] } }));
  assert.equal(r.streak, 2);

  // hoàn thành hết: mỗi kỹ năng đạt ngưỡng
  const all = {};
  Object.keys(banks).forEach((k) => banks[k].slice(0, 3).forEach((id, i) => { all[k + ":" + id] = [{ score: 50, at: NOW - (i + 1) * 3600000 }]; }));
  r = FA.roadmap.compute(Object.assign({}, base, { attempts: all, fcKnown: fc, tipsDone: [1, 2, 3, 4, 5], openCount: { listening: 3, reading: 3, speaking: 3, writing: 3, grammar: 3 } }));
  assert.equal(r.complete, true);
  assert.equal(r.pct, 100);
  assert.equal(r.overall.reached, true);
  assert.equal(r.pace, null);
});

test("dashboard.js vẽ lộ trình, nhận mục tiêu đã lưu và không chặn khi chưa cấu hình Firebase", () => {
  const s2 = createSandbox();
  const appEl = { id: "app", innerHTML: "", querySelectorAll: () => [], querySelector: () => ({ onclick: null, onsubmit: null }) };
  s2.document.getElementById = (id) => (id === "app" ? appEl : null);
  loadScripts(s2, [
    "public/assets/js/core/common.js",
    "public/assets/js/core/roadmap.js",
    "public/data/grammar.js",
    "public/data/reading.js",
    "public/data/listening.js",
    "public/data/writing.js",
    "public/data/speaking.js",
    "public/data/vocab.js",
  ]);
  s2.FA.store.set("roadmap", { target: "C1", examDate: "" });
  s2.FA.saveAttempt("reading", "r1", 30);
  loadScripts(s2, ["public/assets/js/pages/dashboard.js"]);
  assert.ok(appEl.innerHTML.includes("Lộ trình học của bạn"));
  assert.ok(appEl.innerHTML.includes("Mục tiêu C1 · Overall ≥ 160/200"));
  assert.ok(appEl.innerHTML.includes("Các giai đoạn lộ trình"));
  assert.ok(!appEl.innerHTML.includes("Hãy <b>đăng nhập</b>"));
  // có Firebase nhưng chưa đăng nhập → hiện màn đăng nhập thay vì dashboard
  const s3 = createSandbox();
  const app3 = { id: "app", innerHTML: "", querySelectorAll: () => [], querySelector: () => ({ onclick: null }) };
  s3.document.getElementById = (id) => (id === "app" ? app3 : null);
  loadScripts(s3, ["public/assets/js/core/common.js", "public/assets/js/core/roadmap.js", "public/data/grammar.js", "public/data/reading.js", "public/data/listening.js", "public/data/writing.js", "public/data/speaking.js", "public/data/vocab.js"]);
  s3.FA.cloud = { enabled: () => true, cachedUser: () => null, authKnown: () => true, onChange() {}, signIn() {} };
  loadScripts(s3, ["public/assets/js/pages/dashboard.js"]);
  assert.ok(app3.innerHTML.includes("Hãy <b>đăng nhập</b>"));
  assert.ok(!app3.innerHTML.includes("Các giai đoạn lộ trình"));
});

if (process.exitCode) {
  console.error("\nMột số kiểm thử thất bại!");
} else {
  console.log(`\nTất cả ${passed} nhóm kiểm thử đều đạt!`);
}
