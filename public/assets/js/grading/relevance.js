/* FlashAptis — chấm mức độ BÁM SÁT CÂU HỎI của bài Writing (chạy offline, không dùng AI).
   Đây là bộ kiểm tra từ khóa/ý đơn giản, KHÔNG phải Harper (Harper chỉ kiểm tra ngôn ngữ).
   - Part 1: kiểm tra kiểu câu trả lời theo câu hỏi (tuổi → số, giờ → giờ giấc, thời tiết → từ thời tiết…).
   - Part 2–4: mỗi đề khai báo vài "nhóm ý" bắt buộc (data/writing.js); điểm = tỉ lệ nhóm ý có mặt.
   - Phạt chép lại câu hỏi/thông báo. */
(function () {
  const FA = (window.FA = window.FA || {});

  const words = (s) => String(s || "").toLowerCase().match(/[\p{L}\p{N}]+(?:['’]\p{L}+)?/gu) || [];

  /* từ không mang nội dung: có/không, chào hỏi, đại từ, trợ động từ… */
  const STOP = new Set(("question yes no ok okay maybe hello hi hey thanks thank you please sorry i me my mine we our am is are was were be been the a an it its it's this that these those " +
    "do does did don't doesn't didn't not nothing nope yeah yep sure well um uh er hmm know dunno idk what who where when why how which and or but to of in on at for with " +
    "like love want have has had can will would just very so too really also i'm i'd i've").split(" "));

  const NUM = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred";
  const DAY = "monday tuesday wednesday thursday friday saturday sunday";
  const RE = {
    num: new RegExp(`\\d|\\b(${NUM.replace(/ /g, "|")})\\b`, "i"),
    time: new RegExp(`\\d|o'?clock|\\b(a\\.?m|p\\.?m|noon|midnight|dawn|sunrise|half|quarter|past|morning|${NUM.replace(/ /g, "|")})\\b`, "i"),
    when: new RegExp(`\\d|o'?clock|\\b(a\\.?m|p\\.?m|noon|midnight|morning|afternoon|evening|night|bed|bedtime|weekends?|before|after|every|daily|lunch|dinner|breakfast|free|holidays?|days?|always|usually|often|sometimes|school|work|class|time|${DAY.replace(/ /g, "|")})\\b`, "i"),
    freq: new RegExp(`\\d|\\b(once|twice|times?|every|daily|weekly|monthly|often|sometimes|usually|always|never|rarely|seldom|occasionally|hardly|days?|weeks?|months?|years?|weekends?|mornings?|evenings?|nights?|${NUM.replace(/ /g, "|")}|${DAY.replace(/ /g, "|")})\\b`, "i"),
    weather: /\b(sunny|sun|hot|cold|cool|warm|rain\w*|cloud\w*|windy|wind|storm\w*|snow\w*|fog\w*|humid|wet|dry|nice|fine|lovely|beautiful|bad|terrible|awful|freezing|chilly|hazy|misty|drizzl\w*|thunder\w*|clear|bright|gloomy|muggy|stuffy|pleasant|sweltering)\b/i,
    placeNoun: /\b(home|house|apartment|flat|city|town|village|street|district|province|dormitory|dorm|hostel|campus|suburbs?|countryside|center|centre|ward|road|country|building|room|area)\b/i,
    placeStrong: /\b(in|at|near|on|from|around|inside|outside|next to|close to)\s+(?!the\s*$)\S+/i,
  };

  const TYPE_WHY = {
    age: "câu hỏi về tuổi — cần một con số (vd: twenty-two)",
    time: "câu hỏi về giờ — cần nêu giờ (vd: at six o'clock)",
    when: "câu hỏi “khi nào” — cần nêu thời điểm (vd: in the evening)",
    freq: "câu hỏi về tần suất — cần nêu số lần/mức độ (vd: three times a week)",
    weather: "câu hỏi về thời tiết — cần từ chỉ thời tiết (vd: sunny, rainy)",
    place: "câu hỏi về nơi ở — cần nêu địa điểm (vd: in Hanoi)",
    open: "câu trả lời chưa nêu thông tin nào ứng với câu hỏi",
  };

  /* ---- chống "chép lại câu hỏi" ở Part 1 ---- */
  // so khớp không phân biệt dấu nháy và số ít/số nhiều: what's = whats, book = books
  const key = (w) => {
    w = w.replace(/['’]/g, "");
    if (w.length > 3 && /ies$/.test(w)) return w.slice(0, -3) + "y";
    return w.length > 3 && /s$/.test(w) && !/(ss|us|is)$/.test(w) ? w.slice(0, -1) : w;
  };
  const WORD_RE = /[\p{L}\p{N}]+(?:['’]\p{L}+)?/gu;
  const tokenize = (s) => {
    const out = [];
    let m;
    WORD_RE.lastIndex = 0;
    while ((m = WORD_RE.exec(s))) { const w = m[0].toLowerCase(); out.push({ w, k: key(w), i: m.index, e: m.index + m[0].length }); }
    return out;
  };
  // số thứ tự / nhãn đầu dòng người dùng gõ kèm ("2.", "2)", "Q2:", "Question 2:") không phải nội dung trả lời
  const LABEL = /^\s*(?:(?:question|q|câu)\s*\.?\s*)?\(?\d{1,2}\s*[.):]\s*/i;
  const stripLabel = (s) => { const r = s.replace(LABEL, ""); return r.trim() ? r : s; };
  // thay các đoạn ≥ minRun từ liền nhau trùng với câu hỏi bằng khoảng trắng → trả về phần còn lại của câu trả lời
  function stripEcho(text, qToks, minRun) {
    const toks = tokenize(text);
    const drop = new Array(toks.length).fill(false);
    for (let a = 0; a < toks.length; a++) for (let b = 0; b < qToks.length; b++) {
      let n = 0;
      while (a + n < toks.length && b + n < qToks.length && toks[a + n].k === qToks[b + n].k) n++;
      if (n >= minRun) for (let x = 0; x < n; x++) drop[a + x] = true;
    }
    let rest = text;
    for (let x = toks.length - 1; x >= 0; x--) if (drop[x]) rest = rest.slice(0, toks[x].i) + " ".repeat(toks[x].e - toks[x].i) + rest.slice(toks[x].e);
    return { rest, kept: toks.filter((_, x) => !drop[x]) };
  }
  const NAME_STOP = new Set("my name is am i im i'm me the a it its it's this that yes no ok okay hello hi hey you your what whats what's call called".split(" "));
  const NUMERIC_TYPES = new Set(["age", "time", "when", "freq"]);

  /* Part 1: trả về { score: 0 | 0.5 | 1, why } */
  function p1(type, q, text) {
    if (!String(text || "").trim()) return { score: 1, why: "" }; // bỏ trống do nơi gọi xử lý
    const t = stripLabel(String(text)).trim();
    const qToks = tokenize(q);
    const qs = new Set(qToks.map((x) => x.k));
    const toks = tokenize(t);
    const numOK = NUMERIC_TYPES.has(type) || /\bhow (many|much|old|long|far|tall)\b/i.test(q); // chỉ những câu hỏi này mới cho phép trả lời bằng chữ số
    const stop = type === "name" ? NAME_STOP : STOP;
    // từ mang nội dung mới: không phải từ đệm, không lấy từ câu hỏi, không chỉ là chữ số (trừ khi câu hỏi cần số).
    // Ngoại lệ: một từ lẻ trùng câu hỏi nhưng chính là đáp án của loại câu hỏi đó ("Often" cho “How often…?”) vẫn được tính — miễn là không nằm trong đoạn chép ≥ 2 từ liền nhau.
    const typeRe = { age: RE.num, time: RE.time, when: RE.when, freq: RE.freq, weather: RE.weather }[type];
    const lone = new Set(stripEcho(t, qToks, Math.min(2, qToks.length)).kept.map((x) => x.i));
    const fresh = toks.filter((x) => !stop.has(x.w) && !stop.has(x.k) && (numOK || !/^\d+$/.test(x.w)) &&
      (!qs.has(x.k) || (typeRe && lone.has(x.i) && !/^\d+$/.test(x.w) && typeRe.test(x.w)))).map((x) => x.w);
    const echoed = toks.length && toks.every((x) => qs.has(x.k) || stop.has(x.w) || /^\d+$/.test(x.w));
    // echo: true = chắc chắn chỉ chép lại câu hỏi → kể cả khi có AI chấm vẫn giữ 0 điểm
    if (!fresh.length) return { score: 0, echo: !!echoed, why: echoed ? "chỉ chép lại câu hỏi hoặc trả lời “yes/no”, chưa trả lời thông tin được hỏi" : TYPE_WHY.open };
    if (type === "name") return { score: 1, why: "" };
    // bỏ phần chép lại câu hỏi trước khi dò từ khóa, để “How often…” trong câu hỏi không tự thỏa mãn yêu cầu về tần suất
    const t0 = stripEcho(t, qToks, Math.min(3, qToks.length)).rest.trim() || t;
    const need = (re, key) => (re.test(t0) ? { score: 1, why: "" } : { score: 0, why: TYPE_WHY[key] });
    switch (type) {
      case "age": return need(RE.num, "age");
      case "time": return need(RE.time, "time");
      case "when": return need(RE.when, "when");
      case "freq": return need(RE.freq, "freq");
      case "weather": return need(RE.weather, "weather");
      case "place": {
        // chỉ toàn từ chung chung ("home", "Home", "a flat") mà không có "in/at + nơi" → mơ hồ, nửa điểm
        if (!RE.placeStrong.test(t0) && fresh.every((w) => RE.placeNoun.test(w))) return { score: 0.5, why: "địa điểm còn chung chung — nên nêu cụ thể hơn (vd: in Hanoi)" };
        if (RE.placeStrong.test(t0) || /(^|\s)\p{Lu}\p{L}+/u.test(t0.replace(/^(My|The|A|An|I|I'm|It|It's)(?![\p{L}'])/u, ""))) return { score: 1, why: "" };
        if (RE.placeNoun.test(t0) || toks.length <= 3) return { score: 0.5, why: "địa điểm còn chung chung — nên nêu cụ thể hơn (vd: in Hanoi)" };
        return { score: 0, why: TYPE_WHY.place };
      }
      default: return { score: 1, why: "" };
    }
  }

  /* Part 2–4: groups = [[nhãn ý, regex, trọng số?], …] → { frac, missing[] } */
  function ideas(groups, text) {
    const t = String(text || "");
    if (!groups || !groups.length) return { frac: 1, missing: [] };
    const w = (g) => g[2] || 1; // nhóm cốt lõi (chủ đề của đề) có trọng số cao hơn
    const miss = groups.filter((g) => !g[1].test(t));
    const total = groups.reduce((n, g) => n + w(g), 0);
    return { frac: (total - miss.reduce((n, g) => n + w(g), 0)) / total, missing: miss.map((g) => g[0]) };
  }

  /* tỉ lệ cặp từ liền nhau của bài viết trùng với đề bài (dấu hiệu chép lại câu hỏi) */
  function copyRatio(source, text) {
    const a = words(text), s = words(source);
    if (a.length < 7 || s.length < 2) return 0;
    const set = new Set(s.slice(1).map((w, i) => s[i] + " " + w));
    const bg = a.slice(1).map((w, i) => a[i] + " " + w);
    return bg.filter((b) => set.has(b)).length / bg.length;
  }

  /* hệ số nội dung cho bài Part 2–4: 0.4 → 1 theo số ý đủ, nhân hệ số chép đề */
  const COPY_FROM = 0.3;
  // ai = { frac, missing } (tùy chọn): kết quả từ AI thay cho kiểm tra từ khóa; phạt chép đề vẫn do code này tính
  function factor(groups, source, text, ai) {
    const r = ai ? { frac: ai.frac, missing: ai.missing || [] } : ideas(groups, text);
    const cr = copyRatio(source, text);
    const cf = cr > COPY_FROM ? Math.max(0.3, 1 - (cr - COPY_FROM) * 1.5) : 1;
    return { factor: (0.4 + 0.6 * r.frac) * cf, frac: r.frac, missing: r.missing, copy: cr, copied: cf < 1 };
  }

  FA.rel = { p1, ideas, copyRatio, factor };
})();
