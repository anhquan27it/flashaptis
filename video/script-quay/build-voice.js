// Ghép video + giọng đọc AI: node build-voice.js out.mp4 [take,...]
// Mỗi phụ đề → một câu đọc (edge-tts). Câu đọc dài hơn đoạn hình thì giữ khung cuối lâu hơn cho kịp đọc.
const fs = require("fs"), path = require("path"), crypto = require("crypto"), { execFileSync } = require("child_process");
const ff = require("ffmpeg-static");
const out = process.argv[2] || "final-voice.mp4";
const list = (process.argv[3] || "intro,login,home,hub,grammar,writing,gym,flash,lesson,dash,calc,mock,outro").split(",");
const PY = path.join(__dirname, "..", "tts", "Scripts", "python.exe");
const TTS_DIR = path.join(__dirname, "tts-cache");
const GAP = 0.35; // nghỉ giữa hai câu đọc
const fwd = (p) => p.split(path.sep).join("/");

/* lời đọc ngắn gọn hơn phụ đề (khóa = đầu câu phụ đề) */
const SAY = [
  ["FlashAptis — luyện thi", "Flash Aptis: luyện thi Aptis online, chấm điểm liền tay."],
  ["Lần đầu vào làm đề", "Lần đầu làm đề, bạn đăng nhập bằng Google hoặc email."],
  ["Đăng nhập xong", "Tiến trình học được đồng bộ theo tài khoản."],
  ["Đây là FlashAptis", "Đây là trang chủ Flash Aptis, luyện đủ 5 kỹ năng."],
  ["Thử ngay một câu", "Thử ngay một câu mẫu."],
  ["Kho đề lớn", "Kho đề có 1.400 câu Grammar và gần 10 nghìn thẻ từ vựng."],
  ["Bấm ⚡ Luyện đề", "Vào Luyện đề trên menu."],
  ["Web tự gợi ý", "Web tự gợi ý đề nên làm và ước lượng điểm Overall."],
  ["Một buổi thi Aptis", "Buổi thi gồm 5 phần, từ Grammar đến Speaking."],
  ["Mỗi kỹ năng có tiến độ", "Mỗi kỹ năng có tiến độ, điểm cao nhất và bậc CEFR."],
  ["Chọn kỹ năng → chọn đề", "Chọn đề. Gói Free làm được 2 đề đầu mỗi kỹ năng."],
  ["Đọc hướng dẫn", "Bấm Bắt đầu, đồng hồ 25 phút như thi thật."],
  ["Mỗi lần một câu", "Mỗi lần một câu, chọn đáp án rồi bấm Tiếp."],
  ["Câu chưa chắc", "Câu chưa chắc thì đánh dấu để xem lại."],
  ["⏩", "Tua nhanh."],
  ["Xong thì bấm", "Nộp bài là có điểm ngay."],
  ["Kết quả:", "Điểm cao còn có pháo giấy chúc mừng."],
  ["Bên dưới là", "Bên dưới là đáp án và giải thích từng câu."],
  ["Writing: viết", "Writing: viết thẳng trên web, có đếm số từ."],
  ["Nộp bài, web", "Web tự chấm chính tả, ngữ pháp và mức bám sát câu hỏi, có AI hỗ trợ."],
  ["Ôn tập nhanh", "Ôn tập nhanh: 10 câu mỗi ngày, chọn là biết đúng sai."],
  ["Có giải thích", "Câu sai được lưu để ôn lại."],
  ["Flashcard:", "Flashcard: từ vựng theo bậc CEFR và 23 chủ đề Aptis."],
  ["Bấm vào thẻ", "Bấm thẻ để lật xem nghĩa và ví dụ."],
  ["Nhớ rồi thì bấm", "Nhớ rồi bấm Đã thuộc, từ khó thì gắn sao."],
  ["Học ngữ pháp", "Học ngữ pháp: 101 chủ điểm, giảng bằng tiếng Việt."],
  ["Mỗi bài có", "Mỗi bài có cấu trúc, ví dụ và phần tự sửa lỗi."],
  ["Dashboard lộ trình", "Dashboard: đặt mục tiêu và ngày thi."],
  ["Web tự tick", "Web tự tick việc đã làm và gợi ý học gì tiếp."],
  ["🔥", "Chuỗi ngày học giữ động lực mỗi ngày."],
  ["Tính điểm", "Tính điểm: quy đổi sang Overall và bậc CEFR."],
  ["Full Test:", "Full Test: thi thử trọn bộ 5 phần, giống hệt một buổi thi thật."],
  ["Làm liền 5 phần", "Làm liền 5 phần, mỗi phần có đồng hồ riêng, nộp phần nào là khóa phần đó."],
  ["Vào phòng thi", "Vào phòng thi, bạn kiểm tra micro và cam kết tự làm bài, không tra cứu hay dùng AI."],
  ["Phòng thi chuyển", "Phòng thi chuyển toàn màn hình, khóa menu, chuột phải, sao chép và dán."],
  ["Cố tình", "Nếu cố tình chuyển tab hay thoát toàn màn hình, lần đầu sẽ bị cảnh báo."],
  ["Vi phạm lần 2", "Vi phạm lần hai, bài thi tự nộp và dừng ngay lập tức. Phần chưa làm tính 0 điểm."],
  ["Gói ", "Gói Free dùng ngay, Pro mở toàn bộ đề."],
  ["Luyện mỗi ngày", "Luyện mỗi ngày một chút, đỗ Aptis nhẹ nhàng. Vào flashaptis chấm web chấm app nhé!"],
];
function speech(html) {
  const plain = html.replace(/<[^>]+>/g, "").trim();
  const hit = SAY.find(([k]) => plain.startsWith(k));
  if (hit) return hit[1];
  console.log("CHƯA CÓ LỜI ĐỌC NGẮN:", plain);
  let s = plain;
  s = s.replace(/0–50/g, "0 đến 50").replace(/A1–C2/g, "A1 đến C2").replace(/A1 đến C2/g, "A1 đến C2")
    .replace(/\/200/g, " trên 200").replace(/B1\/B2\/C1/g, "B1, B2 hoặc C1")
    .replace(/FlashAptis/g, "Flash Aptis").replace(/Aptis ESOL/g, "Aptis")
    .replace(/1–5/g, "1 đến 5").replace(/→/g, ",").replace(/ — /g, ", ").replace(/…/g, ".")
    .replace(/[()]/g, ", ").replace(/[⏩⚡🏳️⭐✅🔥🎆🚩💪🎉]/gu, "").replace(/️/g, "")
    .replace(/\s+,/g, ",").replace(/,\s*,/g, ",").replace(/\s{2,}/g, " ").trim();
  if (s.startsWith("Tua nhanh")) s = "Tua nhanh đến câu cuối.";
  return s.replace(/,\s*$/, ".");
}

/* 1. dòng thời gian: khung hình + mốc phụ đề */
const items = [], caps = [];
for (const name of list) {
  const fr = JSON.parse(fs.readFileSync(path.join(__dirname, "frames", name + ".json"), "utf8"));
  const timed = fr.filter((x) => !x.ev);
  let k = 0; // chỉ số trong timed
  for (let i = 0; i < fr.length; i++) {
    const f = fr[i];
    if (f.ev) { caps.push({ idx: items.length, html: f.cap, take: name }); continue; }
    k++;
    if (!f.keep || !f.file) continue;
    const nx = timed[k]; // phần tử thời gian kế tiếp (khung hoặc mốc pause)
    if (!nx) continue;
    items.push({ file: f.file, d: Math.max(0.001, Math.min(nx.t - f.t, 30)) });
  }
}

/* 2. giọng đọc (có cache theo nội dung) */
fs.mkdirSync(TTS_DIR, { recursive: true });
caps.forEach((c) => { c.text = speech(c.html); c.id = crypto.createHash("md5").update(c.text).digest("hex").slice(0, 12); });
const todo = caps.filter((c) => !fs.existsSync(path.join(TTS_DIR, c.id + ".mp3")) || !fs.statSync(path.join(TTS_DIR, c.id + ".mp3")).size);
if (todo.length) {
  fs.writeFileSync(path.join(__dirname, "tts-lines.json"), JSON.stringify(todo.map((c) => ({ id: c.id, text: c.text }))));
  execFileSync(PY, ["-I", path.join(__dirname, "tts.py"), path.join(__dirname, "tts-lines.json"), TTS_DIR], { stdio: "inherit" });
}
// thời lượng thật: giải mã hết file, lấy mốc time= cuối cùng
const dur = (f) => { const e = String(require("child_process").spawnSync(ff, ["-hide_banner", "-i", f, "-f", "null", "-"]).stderr); const m = [...e.matchAll(/time=(\d+):(\d+):([\d.]+)/g)].pop(); return +m[1] * 3600 + +m[2] * 60 + +m[3]; };
caps.forEach((c) => { c.file = path.join(TTS_DIR, c.id + ".mp3"); if (!fs.statSync(c.file).size) throw new Error("thiếu giọng đọc: " + c.text); c.len = dur(c.file); });

/* 3. giữ hình cho đủ thời gian đọc */
let frozen = 0;
caps.forEach((c, j) => {
  const end = j + 1 < caps.length ? caps[j + 1].idx : items.length;
  let seg = 0; for (let i = c.idx; i < end; i++) seg += items[i].d;
  const need = c.len + GAP;
  if (need > seg && end > 0) { items[end - 1].d += need - seg; frozen += need - seg; }
});
// đoạn im lặng dài sau câu đọc → tua nhanh tối đa 2x (giữ lại ~2,2 s nghỉ tự nhiên)
const KEEP_SLACK = 1.5, MAX_SPEED = 2.5;
let saved = 0;
caps.forEach((c, j) => {
  const end = j + 1 < caps.length ? caps[j + 1].idx : items.length;
  const need = c.len + GAP;
  let acc = 0; const tail = [];
  for (let i = c.idx; i < end; i++) { if (acc >= need) tail.push(i); acc += items[i].d; }
  const tailLen = tail.reduce((x, i) => x + items[i].d, 0);
  const excess = tailLen - KEEP_SLACK;
  if (excess <= 0.3) return;
  const f = Math.max(1 / MAX_SPEED, (tailLen - excess) / tailLen);
  tail.forEach((i) => { saved += items[i].d * (1 - f); items[i].d *= f; });
});
// mốc bắt đầu của từng câu
const startAt = []; let t = 0;
for (let i = 0, j = 0; i <= items.length; i++) {
  while (j < caps.length && caps[j].idx === i) caps[j++].at = t;
  if (i < items.length) t += items[i].d;
}
const total = t;

/* 4. video */
const lines = ["ffconcat version 1.0"];
items.forEach((it) => lines.push(`file '${fwd(it.file)}'`, `duration ${it.d.toFixed(4)}`));
lines.push(`file '${fwd(items[items.length - 1].file)}'`);
fs.writeFileSync(path.join(__dirname, "concat.txt"), lines.join("\n"));
const vid = path.join(__dirname, "video-only.mp4");
execFileSync(ff, ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(__dirname, "concat.txt"),
  "-vf", "fps=30,scale=1920:1080:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "18", vid], { stdio: "inherit" });

/* 5. âm thanh: đặt từng câu đúng mốc rồi trộn */
const args = ["-y", "-loglevel", "error"];
caps.forEach((c) => args.push("-i", c.file));
const fil = caps.map((c, i) => `[${i}:a]aresample=48000,adelay=${Math.round(c.at * 1000 + 120)}:all=1[a${i}]`).join(";") +
  ";" + caps.map((_, i) => `[a${i}]`).join("") + `amix=inputs=${caps.length}:normalize=0:dropout_transition=0,apad,atrim=0:${total.toFixed(3)},loudnorm=I=-16:TP=-1.5:LRA=11[aout]`;
const aud = path.join(__dirname, "voice.m4a");
fs.writeFileSync(path.join(__dirname, "filter.txt"), fil);
execFileSync(ff, [...args, "-filter_complex_script", path.join(__dirname, "filter.txt"), "-map", "[aout]", "-ar", "48000", "-c:a", "aac", "-b:a", "160k", aud], { stdio: "inherit" });

execFileSync(ff, ["-y", "-loglevel", "error", "-i", vid, "-i", aud, "-map", "0:v", "-map", "1:a", "-c", "copy", "-shortest", "-movflags", "+faststart", out], { stdio: "inherit" });

/* phụ đề SRT để tải lên YouTube/Facebook nếu cần */
const ts = (x) => { const ms = Math.round(x * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; };
fs.writeFileSync(out.replace(/\.mp4$/, ".srt"), caps.map((c, i) => `${i + 1}\n${ts(c.at)} --> ${ts(Math.min(total, i + 1 < caps.length ? caps[i + 1].at : total))}\n${c.html.replace(/<[^>]+>/g, "")}\n`).join("\n"));
caps.forEach((c) => console.log(ts(c.at).slice(3, 8), c.len.toFixed(1) + "s", c.text));
console.log(`xong: ${out} ${total.toFixed(1)}s (giữ hình thêm ${frozen.toFixed(1)}s cho kịp đọc, tua nhanh bớt ${saved.toFixed(1)}s), ${caps.length} câu đọc`);
