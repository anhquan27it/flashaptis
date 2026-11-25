/* Chuyển các file Excel từ vựng → dữ liệu flashcard tải theo từng bộ.
   Chạy: npm run build:vocab   (cần Python 3 — chỉ dùng thư viện chuẩn, không cần cài gì thêm)

   Nguồn (nằm ngoài public/ nên không bị deploy):
     "Từ vựng chủ đề/*.xlsx"  — 23 chủ đề × 200 từ (cột: STT, Từ, Loại từ, Nghĩa, Cấu trúc, Ví dụ (2 dòng), Chủ đề)
     "EXCEL/*TongHop*.xlsx"    — CEFR A1–C2, sheet "Tất cả từ" (ID, CEFR, Từ, Nghĩa, Loại từ, Pattern, Ví dụ 1, Ví dụ 2, …)
   Kết quả:
     public/data/vocab/<idBộ>.js  — mỗi bộ một file, flashcards.js chỉ tải khi mở bộ đó
     public/data/vocab-index.js   — danh sách bộ (tên, emoji, số thẻ, file) — nhỏ, nạp ở flashcards.html + index.html
   Thẻ: w từ · t loại từ · m nghĩa · u cấu trúc/cách dùng · x ví dụ 1 · x2 ví dụ 2 (không có phiên âm). */
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/data/vocab");
const PY = process.env.PYTHON || (process.platform === "win32" ? "python" : "python3");

function readDir(dir) {
  const tmp = path.join(os.tmpdir(), "fa-vocab-" + process.pid + ".json");
  execFileSync(PY, ["-I", path.join(__dirname, "xlsx-to-json.py"), dir, tmp], { stdio: "inherit" });
  const data = JSON.parse(fs.readFileSync(tmp, "utf8"));
  fs.unlinkSync(tmp);
  return data;
}
const clean = (s) => String(s == null ? "" : s).replace(/\s+/g, " ").trim();
const POS = {
  "Danh từ": "n", "Cụm danh từ": "n phr", "Động từ": "v", "Tính từ": "adj", "Cụm tính từ": "adj phr", "Cụm động từ": "phr v",
  "Thành ngữ": "idiom", "Cụm giới từ": "prep phr", "Trạng từ": "adv", "Giới từ": "prep", "Mạo từ": "art", "Từ hạn định": "det",
  "Liên từ": "conj", "Đại từ": "pron", "Thán từ": "interj", "Động từ khuyết thiếu": "modal", "Số từ": "num",
};
const pos = (t, where) => { const v = POS[clean(t)]; if (!v) throw new Error(`Loại từ lạ "${t}" (${where}) — thêm vào bảng POS trong tools/build-vocab.js`); return v; };
function addCard(cards, seen, where, c) {
  if (!c.w || !c.m || !c.x) throw new Error(`${where}: thiếu từ/nghĩa/ví dụ ${JSON.stringify(c)}`);
  const k = c.w.toLowerCase();
  if (seen.has(k)) throw new Error(`${where}: trùng từ "${c.w}"`);
  seen.add(k);
  if (!c.x2) delete c.x2;
  if (!c.u) delete c.u;
  cards.push(c);
}

/* ---------- 23 chủ đề ---------- */
const TOPIC_META = {
  "Cities & Urban Life": ["t-cities", "Thành phố & Đời sống đô thị", "🏙️"],
  "Crime & Justice": ["t-crime", "Tội phạm & Công lý", "⚖️"],
  "Culture & Heritage": ["t-culture", "Văn hóa & Di sản", "🏛️"],
  "Economy & Consumerism": ["t-economy", "Kinh tế & Tiêu dùng", "💰"],
  "Education & Learning": ["t-education", "Giáo dục & Học tập", "🎓"],
  "Energy & Resources": ["t-energy", "Năng lượng & Tài nguyên", "🔋"],
  "Environment & Climate": ["t-environment", "Môi trường & Khí hậu", "🌍"],
  "Equality & Social Change": ["t-equality", "Bình đẳng & Thay đổi xã hội", "🤝"],
  "Family & Children": ["t-family", "Gia đình & Trẻ em", "👨‍👩‍👧"],
  "Food & Agriculture": ["t-food", "Ẩm thực & Nông nghiệp", "🌾"],
  "Globalisation & Trade": ["t-global", "Toàn cầu hóa & Thương mại", "🌐"],
  "Government & Policy": ["t-government", "Chính phủ & Chính sách", "📜"],
  "Health & Well-Being": ["t-health", "Sức khỏe & Hạnh phúc", "🩺"],
  "Housing & Communities": ["t-housing", "Nhà ở & Cộng đồng", "🏘️"],
  "Language & Communication": ["t-language", "Ngôn ngữ & Giao tiếp", "💬"],
  "Media & Advertising": ["t-media", "Truyền thông & Quảng cáo", "📺"],
  "Population & Migration": ["t-population", "Dân số & Di cư", "🧳"],
  "Science & Research": ["t-science", "Khoa học & Nghiên cứu", "🔬"],
  "Sport & Active Lifestyles": ["t-sport", "Thể thao & Lối sống năng động", "⚽"],
  "Technology & Digital Life": ["t-tech", "Công nghệ & Đời sống số", "💻"],
  "Tourism & Travel": ["t-tourism", "Du lịch & Lữ hành", "✈️"],
  "Transport & Mobility": ["t-transport", "Giao thông & Đi lại", "🚆"],
  "Work & Employment": ["t-work", "Công việc & Việc làm", "👔"],
};
// sửa câu ví dụ không chứa từ cần học (phát hiện khi kiểm tra dữ liệu)
const FIX = {
  "Education & Learning|set homework": ["She sets homework every Friday, usually a short reading task."],
  "Sport & Active Lifestyles|jigsaw puzzle": [null, "A jigsaw puzzle of nine hundred pieces takes two evenings."],
  "Language & Communication|noticeboard": [null, "Nine notices cover the noticeboard and nobody reads them."],
};
function buildTopics() {
  const raw = readDir(path.join(ROOT, "Từ vựng chủ đề"));
  const decks = [];
  for (const [file, sheets] of Object.entries(raw)) {
    const meta = TOPIC_META[file];
    if (!meta) throw new Error("Chưa khai báo id/tên/emoji cho chủ đề: " + file + " (thêm vào TOPIC_META)");
    const rows = sheets[0][1];
    const head = rows.findIndex((r) => r && String(r[1] || "").startsWith("Từ vựng"));
    if (head < 0) throw new Error("Không thấy dòng tiêu đề trong " + file);
    const cards = [], seen = new Set();
    for (const r of rows.slice(head + 1)) {
      const [, w0, t0, m0, u0, x0] = r || [];
      const w = clean(w0);
      if (!w && !clean(m0)) continue;
      const ex = String(x0 || "").split(/\n+/).map(clean).filter(Boolean);
      (FIX[file + "|" + w] || []).forEach((e, i) => { if (e) ex[i] = e; });
      addCard(cards, seen, file, { w, t: pos(t0, file + " · " + w), m: clean(m0), u: clean(u0), x: ex[0], x2: ex[1] });
    }
    decks.push({ id: meta[0], name: meta[1], en: file, emoji: meta[2], section: "topic", cards });
  }
  return decks.sort((a, b) => a.en.localeCompare(b.en));
}

/* ---------- CEFR A1–C2 ---------- */
const CEFR_META = {
  A1: ["Beginner", "🌱", "Từ vựng nền tảng: chào hỏi, gia đình, số đếm, đồ vật quen thuộc."],
  A2: ["Elementary", "🌿", "Sinh hoạt hằng ngày: mua sắm, đi lại, công việc đơn giản."],
  B1: ["Intermediate", "🌳", "Giao tiếp độc lập — mức nhiều trường yêu cầu khi thi Aptis."],
  B2: ["Upper Intermediate", "🚀", "Diễn đạt quan điểm, bàn luận chủ đề xã hội."],
  C1: ["Advanced", "🏆", "Từ học thuật & công việc chuyên môn — để bứt lên bậc C."],
  C2: ["Proficiency", "👑", "Từ hiếm, sắc thái tinh tế — gần như người bản xứ."],
};
function buildCefr() {
  const raw = readDir(path.join(ROOT, "EXCEL"));
  const file = Object.keys(raw).find((k) => /TongHop/i.test(k));
  if (!file) throw new Error('Không thấy file tổng hợp CEFR (tên chứa "TongHop") trong EXCEL/');
  const sheet = raw[file].find(([n]) => /Tất cả từ/i.test(n));
  if (!sheet) throw new Error('File tổng hợp CEFR thiếu sheet "Tất cả từ"');
  const [hdr, ...rows] = sheet[1];
  const col = (re) => { const i = hdr.findIndex((h) => re.test(String(h || ""))); if (i < 0) throw new Error("Thiếu cột " + re); return i; };
  const C = { lv: col(/^CEFR$/), w: col(/Từ tiếng Anh/), m: col(/Nghĩa/), t: col(/Từ loại/), u: col(/Cách dùng|Pattern/), x: col(/Ví dụ 1/), x2: col(/Ví dụ 2/) };
  const byLv = {};
  for (const r of rows) {
    const w = clean(r[C.w]);
    if (!w) continue;
    const lv = clean(r[C.lv]);
    if (!CEFR_META[lv]) throw new Error("Bậc CEFR lạ: " + lv + " (" + w + ")");
    const d = (byLv[lv] = byLv[lv] || { cards: [], seen: new Set() });
    addCard(d.cards, d.seen, "CEFR " + lv, { w, t: pos(r[C.t], lv + " · " + w), m: clean(r[C.m]), u: clean(r[C.u]), x: clean(r[C.x]), x2: clean(r[C.x2]) });
  }
  return Object.keys(CEFR_META).filter((lv) => byLv[lv]).map((lv) => ({
    id: "c-" + lv.toLowerCase(), name: `CEFR ${lv} · ${CEFR_META[lv][0]}`, en: lv, emoji: CEFR_META[lv][1], desc: CEFR_META[lv][2], section: "cefr", cards: byLv[lv].cards,
  }));
}

/* ---------- ghi file ---------- */
const decks = [...buildCefr(), ...buildTopics()];
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
const js = (v) => JSON.stringify(v);
const index = [];
let total = 0;
for (const d of decks) {
  const { cards, ...meta } = d;
  const body = `/* Bộ flashcard "${d.name}" — sinh tự động bởi tools/build-vocab.js, đừng sửa tay (sửa file Excel gốc rồi chạy npm run build:vocab) */\n` +
    `(window.FA_VOCAB_DECKS = window.FA_VOCAB_DECKS || {})[${js(d.id)}] = {\n  ${Object.entries(meta).map(([k, v]) => `${k}: ${js(v)}`).join(", ")},\n  cards: [\n` +
    cards.map((c) => "    " + js(c)).join(",\n") + "\n  ],\n};\n";
  fs.writeFileSync(path.join(OUT_DIR, d.id + ".js"), body);
  index.push(Object.assign({}, meta, { n: cards.length, file: "data/vocab/" + d.id + ".js" }));
  total += cards.length;
}
fs.writeFileSync(path.join(ROOT, "public/data/vocab-index.js"),
  `/* Danh sách bộ flashcard tải theo yêu cầu (data/vocab/<id>.js) — sinh tự động bởi tools/build-vocab.js (npm run build:vocab), đừng sửa tay.\n` +
  `   section: "cefr" (A1–C2) | "topic" (23 chủ đề Aptis). n = số thẻ. Tổng: ${total} thẻ. */\n` +
  `window.FA_VOCAB_INDEX = [\n${index.map((d) => "  " + js(d)).join(",\n")}\n];\n`);
console.log(`✓ ${decks.length} bộ, ${total} thẻ → public/data/vocab/*.js + public/data/vocab-index.js`);
