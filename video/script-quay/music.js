// Tự tổng hợp nhạc nền nhẹ (pad + arpeggio + bass), không dùng mẫu có bản quyền.
// node music.js out.wav giây
const fs = require("fs");
const out = process.argv[2] || "music.wav", LEN = +(process.argv[3] || 180);
const SR = 44100, N = Math.ceil(LEN * SR);
const L = new Float32Array(N), R = new Float32Array(N);
const BPM = 84, BEAT = 60 / BPM, BAR = BEAT * 4;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
// Cmaj7 – Am7 – Fmaj7 – G6, mỗi hợp âm 2 ô nhịp
const CHORDS = [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 64]];
const BASS = [36, 33, 29, 31];
const add = (buf, i, v) => { if (i >= 0 && i < N) buf[i] += v; };

function note(t0, dur, f, amp, pan, kind) {
  const s0 = Math.floor(t0 * SR), n = Math.floor((dur + (kind === "pad" ? 1.5 : 1.2)) * SR);
  const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  for (let k = 0; k < n; k++) {
    const t = k / SR;
    let env;
    if (kind === "pad") { const a = 1.2, r = 1.5; env = t < a ? t / a : t < dur ? 1 : Math.max(0, 1 - (t - dur) / r); env *= env; }
    else if (kind === "pluck") env = Math.min(1, t / 0.008) * Math.exp(-t * 3.2);
    else env = Math.min(1, t / 0.03) * Math.exp(-t * 1.1);
    if (env < 1e-4 && t > 0.1) { if (kind !== "pad" || t > dur) break; }
    let v;
    const ph = 2 * Math.PI * f * t;
    if (kind === "pad") v = Math.sin(ph) + 0.5 * Math.sin(ph * 1.003 + 1) + 0.18 * Math.sin(2 * ph) + 0.06 * Math.sin(3 * ph);
    else if (kind === "pluck") v = Math.sin(ph) + 0.25 * Math.sin(2 * ph) * Math.exp(-t * 6) + 0.08 * Math.sin(3 * ph) * Math.exp(-t * 9);
    else v = Math.sin(ph) + 0.15 * Math.sin(2 * ph);
    v *= amp * env;
    add(L, s0 + k, v * gl); add(R, s0 + k, v * gr);
  }
}

const ARP = [0, 2, 1, 3, 2, 1, 3, 2]; // chỉ số nốt trong hợp âm, nốt móc đơn
let bar = 0;
for (let t = 0; t < LEN; t += BAR * 2, bar += 2) {
  const ci = (bar / 2) % 4, ch = CHORDS[ci];
  ch.forEach((m, j) => note(t, BAR * 2 - 0.2, hz(m), 0.05, -0.5 + j / 3, "pad"));
  note(t, BAR * 2, hz(BASS[ci]), 0.09, 0, "bass");
  note(t + BAR, BAR, hz(BASS[ci] + 7), 0.05, 0, "bass");
  if (t > 4) // arpeggio vào sau phần mở đầu
    for (let b = 0; b < 16; b++) {
      const m = ch[ARP[b % 8]] + 12;
      note(t + b * BEAT / 2, BEAT / 2, hz(m), (b % 2 ? 0.028 : 0.04) * (0.85 + 0.3 * Math.random()), b % 2 ? 0.35 : -0.35, "pluck");
    }
}

// tiếng vang đơn giản (feedback delay) cho mềm
const D1 = Math.floor(0.37 * SR), D2 = Math.floor(0.29 * SR);
for (let i = 0; i < N; i++) { if (i >= D1) L[i] += 0.28 * R[i - D1]; if (i >= D2) R[i] += 0.28 * L[i - D2]; }
// lọc thông thấp 1 cực cho ấm + chuẩn hóa
let pl = 0, pr = 0, peak = 0; const a = 0.22;
for (let i = 0; i < N; i++) { pl += a * (L[i] - pl); pr += a * (R[i] - pr); L[i] = pl; R[i] = pr; peak = Math.max(peak, Math.abs(pl), Math.abs(pr)); }
const g = 0.8 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4); }
fs.writeFileSync(out, buf);
console.log("xong", out, LEN + "s");
