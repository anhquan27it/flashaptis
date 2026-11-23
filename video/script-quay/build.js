// Ghép các take thành MP4: node build.js out.mp4 take1,take2,...
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ff = require("ffmpeg-static");
const out = process.argv[2] || "out.mp4";
const list = (process.argv[3] || "intro,login,home,hub,grammar,writing,gym,flash,lesson,dash,calc,mock,outro").split(",");
const FR = 1 / 30;
const fwd = (p) => p.split(path.sep).join("/");
const lines = ["ffconcat version 1.0"];
let total = 0, lastFile = null;
const marks = [];
for (const name of list) {
  const fr = JSON.parse(fs.readFileSync(path.join(__dirname, "frames", name + ".json"), "utf8"));
  marks.push([name, total]);
  for (let i = 0; i < fr.length - 1; i++) {
    const f = fr[i];
    if (!f.keep || !f.file) continue;
    const nx = fr[i + 1];
    let d = nx.t - f.t; // khung giữ tới khung kế tiếp hoặc tới mốc pause
    d = Math.max(0.001, Math.min(d, 30));
    lines.push(`file '${fwd(f.file)}'`, `duration ${d.toFixed(4)}`);
    total += d; lastFile = f.file;
  }
}
lines.push(`file '${fwd(lastFile)}'`);
const txt = path.join(__dirname, "concat.txt");
fs.writeFileSync(txt, lines.join("\n"));
fs.writeFileSync(path.join(__dirname, "marks.json"), JSON.stringify(marks));
execFileSync(ff, ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", txt,
  "-vf", "fps=30,scale=1920:1080:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-movflags", "+faststart", out], { stdio: "inherit" });
marks.forEach(([n, t]) => console.log(n.padEnd(8), t.toFixed(1) + "s"));
console.log("xong:", out, total.toFixed(1) + "s");
