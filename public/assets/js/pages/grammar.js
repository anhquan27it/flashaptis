/* FlashAptis — Học ngữ pháp A1–C2 (định tuyến bằng hash)
   #            6 cấp độ + tra nhanh chủ điểm
   #a1          danh sách chủ điểm của cấp
   #a1-01       bài học một chủ điểm
   Dữ liệu: data/grammar-index.js (FA_GRAMMAR_INDEX — mục lục) + data/grammar-lessons/<cấp>.js (tải khi mở cấp đó,
   FA_GRAMMAR_LESSONS[cấp] = [{id, n, title, sections:[{h, items:[{p} | {table:[[ô…]…]}]}]}]) — sinh bởi tools/build-grammar.py.
   Tiến độ: FA.store "grammar-done" {idChủĐiểm: thời điểm} (đồng bộ theo tài khoản qua cloud.js). */
(function () {
  const FA = window.FA, esc = FA.esc;
  const app = document.getElementById("app");
  const INDEX = window.FA_GRAMMAR_INDEX || [];
  const done = () => FA.store.get("grammar-done", {}) || {};
  const setDone = (id, v) => {
    const d = done();
    if (v) d[id] = Date.now(); else delete d[id];
    FA.store.set("grammar-done", d);
  };
  const levelOf = (lv) => INDEX.find((x) => x.lv.toLowerCase() === String(lv).toLowerCase());
  const lessons = (lv) => (window.FA_GRAMMAR_LESSONS || {})[lv];

  /* ---------- tải nội dung một cấp khi cần ---------- */
  const loading = {};
  function loadLevel(L) {
    if (lessons(L.lv)) return Promise.resolve(lessons(L.lv));
    return (loading[L.lv] = loading[L.lv] || new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = L.file;
      s.onload = () => ok(lessons(L.lv));
      s.onerror = () => { delete loading[L.lv]; s.remove(); fail(new Error("load")); };
      document.head.appendChild(s);
    }));
  }

  let seq = 0;
  async function route() {
    FA.stopSpeak();
    const my = ++seq;
    const h = location.hash.replace(/^#\/?/, "").toLowerCase();
    window.scrollTo(0, 0);
    const m = h.match(/^(a1|a2|b1|b2|c1|c2)(?:-(\d+))?$/);
    if (!m) return viewLevels();
    const L = levelOf(m[1]);
    if (!L) return viewLevels();
    if (!lessons(L.lv)) {
      app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty"><div class="big">${L.emoji}</div><p>Đang tải ngữ pháp ${esc(L.lv)}…</p></div></div></div>`;
      try { await loadLevel(L); } catch (e) {
        if (my !== seq) return;
        app.innerHTML = `<div class="page"><div class="container narrow"><div class="card empty"><div class="big">📡</div><p>Không tải được bài học — kiểm tra kết nối mạng rồi thử lại.</p><div class="row" style="justify-content:center"><button class="btn btn-primary" id="retry">Thử lại</button><a class="btn btn-ghost" href="#">Về danh sách</a></div></div></div></div>`;
        app.querySelector("#retry").onclick = route;
        return;
      }
      if (my !== seq) return;
    }
    if (!m[2]) return viewLevel(L);
    const t = lessons(L.lv).find((x) => x.n === +m[2]);
    return t ? viewLesson(L, t) : viewLevel(L);
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("fa:synced", () => { if (!/-\d+$/.test(location.hash)) route(); });

  /* ---------- 6 cấp độ ---------- */
  const VI_TERMS = [
    ["câu điều kiện", "conditional"], ["điều kiện", "conditional"], ["bị động", "passive"], ["mệnh đề quan hệ", "relative"], ["quan hệ", "relative"],
    ["so sánh", "compar"], ["hiện tại hoàn thành", "present perfect"], ["hiện tại đơn", "present simple"], ["hiện tại tiếp diễn", "present continuous"],
    ["quá khứ hoàn thành", "past perfect"], ["quá khứ", "past"], ["tương lai", "future"], ["tường thuật", "reported"], ["câu gián tiếp", "reported"],
    ["đảo ngữ", "inversion"], ["mạo từ", "a, an"], ["giới từ", "preposition"], ["khuyết thiếu", "modal"], ["câu hỏi", "question"],
    ["danh từ", "noun"], ["tính từ", "adjective"], ["trạng từ", "adverb"], ["đại từ", "pronoun"], ["liên từ", "conjunction"], ["từ nối", "link"],
    ["sở hữu", "possessive"], ["số nhiều", "plural"], ["đếm được", "countable"], ["mệnh lệnh", "imperative"], ["danh động từ", "-ing"],
    ["nhấn mạnh", "cleft"], ["câu chẻ", "cleft"], ["giả định", "subjunctive"], ["ước", "wish"], ["phủ định", "negative"], ["thì", "tense"],
  ];
  let q = "";
  function viewLevels() {
    const D = done();
    const total = INDEX.reduce((n, L) => n + L.topics.length, 0);
    const k = INDEX.reduce((n, L) => n + L.topics.filter((t) => D[t.id]).length, 0);
    app.innerHTML = `
      <div class="page"><div class="container">
        <span class="eyebrow">Học ngữ pháp</span>
        <h1 class="page-title">📘 Ngữ pháp tiếng Anh A1 → C2</h1>
        <p class="page-sub">${total} chủ điểm chia theo 6 cấp độ CEFR. Mỗi bài có trọng tâm, công thức, ví dụ giảng giải từng câu và lỗi người Việt hay mắc. Học xong bấm “Đã học” để theo dõi tiến độ.</p>
        <div class="card mb-2" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
          <div class="ring" style="--p:${total ? Math.round((k / total) * 100) : 0}" data-label="${total ? Math.round((k / total) * 100) : 0}%"></div>
          <div style="flex:1;min-width:200px"><b style="font-family:var(--font-head);font-size:1.15rem">${k}/${total} chủ điểm đã học</b>
            <div class="muted" style="font-size:.9rem">Mẹo: bắt đầu từ cấp thấp hơn mục tiêu một bậc — muốn đạt B2 thì ôn chắc B1 trước.</div></div>
          <a class="btn btn-outline btn-sm" href="exam.html#/grammar">Luyện đề Grammar →</a>
        </div>
        <input class="inp mb-2" id="gSearch" value="${esc(q)}" placeholder="🔍 Tìm chủ điểm (vd: present perfect, câu điều kiện, passive…)">
        <div id="gRes"></div>
        <div class="grid grid-3" id="gLevels">
          ${INDEX.map((L) => {
            const n = L.topics.filter((t) => D[t.id]).length;
            return `<a class="card gr-level" href="#${L.lv.toLowerCase()}">
              <div class="gr-lv-top"><span class="gr-lv-badge">${esc(L.lv)}</span><span class="gr-lv-emo">${L.emoji}</span></div>
              <h3 class="mb-0 mt-1">${esc(L.lv)} · ${esc(L.name)}</h3>
              <p class="muted mb-1" style="font-size:.9rem">${esc(L.desc)}</p>
              <div class="muted" style="font-size:.88rem">${L.topics.length} chủ điểm · đã học ${n}</div>
              <div class="progress bar"><i style="width:${(n / L.topics.length) * 100}%"></i></div>
            </a>`;
          }).join("")}
        </div>
      </div></div>`;
    const inp = app.querySelector("#gSearch"), res = app.querySelector("#gRes");
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
    const search = () => {
      q = inp.value;
      const s = norm(q.trim());
      if (s.length < 2) { res.innerHTML = ""; return; }
      // tên chủ điểm là tiếng Anh → gõ thuật ngữ tiếng Việt thì đổi sang từ khóa tiếng Anh tương ứng
      const keys = [s].concat(VI_TERMS.filter(([vi]) => s.includes(norm(vi)) || norm(vi).includes(s)).map(([, en]) => en));
      const hits = [];
      INDEX.forEach((L) => L.topics.forEach((t) => { const tt = norm(t.title); if (keys.some((k) => tt.includes(k))) hits.push([L, t]); }));
      res.innerHTML = `<div class="card mb-2" style="padding:8px 14px">${hits.length ? hits.slice(0, 40).map(([L, t]) => `<a class="gr-hit" href="#${t.id}"><span class="gr-lv-badge sm">${esc(L.lv)}</span><span>${t.n}. ${esc(t.title)}</span>${D[t.id] ? `<span class="txt-ok">✓</span>` : ""}</a>`).join("")
        : `<p class="muted mb-0">Không có chủ điểm nào khớp “${esc(q)}” (tên chủ điểm viết bằng tiếng Anh, vd: <i>conditionals</i>, <i>passive</i>, <i>relative clauses</i>).</p>`}</div>`;
    };
    inp.oninput = search;
    if (q) search();
  }

  /* ---------- danh sách chủ điểm một cấp ---------- */
  function viewLevel(L) {
    const D = done(), ts = lessons(L.lv);
    const n = ts.filter((t) => D[t.id]).length;
    const next = ts.find((t) => !D[t.id]);
    app.innerHTML = `
      <div class="page"><div class="container narrow">
        <div class="crumbs"><a href="#">← Ngữ pháp</a> / ${esc(L.lv)}</div>
        <h1 class="page-title">${L.emoji} Ngữ pháp ${esc(L.lv)} · ${esc(L.name)}</h1>
        <p class="page-sub">${esc(L.desc)}</p>
        <div class="card mb-2 row" style="gap:14px">
          <div style="flex:1;min-width:200px"><b>${n}/${ts.length} chủ điểm đã học</b><div class="progress bar mt-1"><i style="width:${(n / ts.length) * 100}%"></i></div></div>
          ${next ? `<a class="btn btn-primary" href="#${next.id}">${n ? "Học tiếp" : "Bắt đầu"}: ${next.n}. ${esc(next.title)} →</a>` : `<span class="pill green">🎉 Đã học hết cấp ${esc(L.lv)}</span>`}
        </div>
        <ol class="gr-topics">
          ${ts.map((t) => `<li><a href="#${t.id}" class="${D[t.id] ? "done" : ""}"><span class="gr-num">${D[t.id] ? "✓" : t.n}</span><span class="gr-t">${esc(t.title)}</span><span class="gr-go">→</span></a></li>`).join("")}
        </ol>
        <div class="row mt-3">
          ${INDEX.map((x) => `<a class="chip ${x.lv === L.lv ? "active" : ""}" href="#${x.lv.toLowerCase()}">${x.emoji} ${esc(x.lv)}</a>`).join("")}
        </div>
      </div></div>`;
  }

  /* ---------- bài học ---------- */
  const SEC_ICON = [[/TRỌNG TÂM/, "🎯"], [/CHỨC NĂNG/, "🧭"], [/CẤU TRÚC/, "🧱"], [/TRÌNH TỰ|PHÂN TÍCH/, "🪜"], [/VÍ DỤ/, "💬"], [/ĐỐI CHIẾU|TỰ SỬA/, "🛠️"]];
  const secIcon = (h) => (SEC_ICON.find(([re]) => re.test(h)) || [0, "📌"])[1];
  const titleCase = (h) => h.charAt(0) + h.slice(1).toLowerCase(); // "TRỌNG TÂM" → "Trọng tâm"
  // tô đậm phần trước dấu ":" đầu tiên (nhãn ngắn)
  const labelled = (s) => {
    const m = s.match(/^([^:()]{2,70}):\s+([\s\S]*)$/);
    return m ? `<b>${esc(m[1])}:</b> ${fmt(m[2])}` : fmt(s);
  };
  // ví dụ tiếng Anh trong ngoặc cuối câu "(I am a student. / She is…)" → in nghiêng
  const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i; // ngoặc chứa chữ Việt = chú thích, không phải câu ví dụ
  const fmt = (s) => esc(s).replace(/\(([^()]*[A-Za-z][^()]*)\)\s*$/, (m0, inner) => (VI.test(inner) ? m0 : `<span class="gr-ex">(${inner})</span>`));

  function itemHTML(it, ctx) {
    if (it.table) {
      const [head, ...rows] = it.table;
      const cell = (c, tag, j) => {
        const lines = String(c || "").split("\n");
        const html = lines.map((ln) => (ln.startsWith("(") ? `<span class="gr-tr">${esc(ln)}</span>` : esc(ln))).join("<br>");
        // cột câu ví dụ có bản dịch → nút nghe câu tiếng Anh
        const say = tag === "td" && j > 0 && lines.length > 1 && lines[1].startsWith("(") && /[A-Za-z]/.test(lines[0]) ? `<button type="button" class="gr-say" data-say="${esc(lines[0])}" title="Nghe câu này">🔊</button>` : "";
        return `<${tag}>${html}${say}</${tag}>`;
      };
      return `<div class="tbl-wrap gr-tbl"><table class="tbl"><tr>${head.map((c) => cell(c, "th")).join("")}</tr>${rows.map((r) => `<tr>${r.map((c, j) => cell(c, "td", j)).join("")}</tr>`).join("")}</table></div>`;
    }
    const p = it.p;
    let m;
    if ((m = p.match(/^Ghi nhớ:\s*(.*)$/))) return `<div class="gr-note">📝 <b>Ghi nhớ:</b> ${fmt(m[1])}</div>`;
    if ((m = p.match(/^(Cấu trúc chính|Công thức chính):\s*(.*)$/))) return `<div class="gr-formula"><span>${esc(m[1])}</span><code>${esc(m[2])}</code></div>`;
    if ((m = p.match(/^(Ví dụ mở đầu)[^:]*:\s*(.*)$/))) return `<div class="gr-intro">💡 <b>${esc(m[1])}:</b> ${fmt(m[2])}</div>`;
    if ((m = p.match(/^Chưa đúng:\s*(.*?)\s*→\s*Đã sửa:\s*(.*?)\s+—\s+(.*)$/)))
      return `<div class="gr-err"><div><span class="bad">✗</span> <s>${esc(m[1])}</s></div><div><span class="ok">✓</span> <b>${esc(m[2])}</b></div><div class="muted">${esc(m[3])}</div></div>`;
    if ((m = p.match(/^(\d{2})\.\s+([^:]+):\s*(.*)$/))) return `<div class="gr-step"><span class="gr-step-n">${m[1]}</span><div><b>${esc(m[2])}</b><div>${fmt(m[3])}</div></div></div>`;
    if (/:$/.test(p)) { ctx.list = true; return `<h4 class="gr-sub">${esc(p.replace(/:$/, ""))}</h4>`; }
    if (/^(Đối chiếu|Tự sửa):/.test(p)) { ctx.list = false; return `<h4 class="gr-sub">${labelled(p)}</h4>`; }
    if (ctx.list) return `<label class="gr-check"><input type="checkbox"> <span>${fmt(p)}</span></label>`;
    if (ctx.func && /^[^:()]{2,70}:\s/.test(p)) return `<div class="gr-func">${labelled(p)}</div>`;
    return `<p>${fmt(p)}</p>`;
  }

  function viewLesson(L, t) {
    const ts = lessons(L.lv), i = ts.indexOf(t);
    const prev = ts[i - 1], next = ts[i + 1] || null;
    const nextLv = !next ? INDEX[INDEX.indexOf(L) + 1] : null;
    const isDone = () => !!done()[t.id];
    const secs = t.sections.filter((s) => s.items.length);
    app.innerHTML = `
      <div class="page"><div class="container gr-wrap">
        <div class="crumbs"><a href="#">Ngữ pháp</a> / <a href="#${L.lv.toLowerCase()}">${esc(L.lv)}</a> / ${t.n}. ${esc(t.title)}</div>
        <div class="gr-layout">
          <aside class="gr-toc">
            <div class="gr-toc-in">
              <b>${esc(L.lv)} · Chủ điểm ${t.n}/${ts.length}</b>
              ${secs.map((s, k) => `<a href="#${t.id}" data-sec="${k}">${secIcon(s.h)} ${esc(titleCase(s.h.replace(/\s*\(.*\)$/, "")) || "Nội dung")}</a>`).join("")}
            </div>
          </aside>
          <article class="gr-article">
            <span class="eyebrow">Ngữ pháp ${esc(L.lv)} · Chủ điểm ${t.n}</span>
            <h1 class="page-title">${esc(t.title)}</h1>
            ${secs.map((s, k) => {
              const ctx = { list: false, func: /CHỨC NĂNG/.test(s.h) };
              const sub = (s.h.match(/\((.*)\)$/) || [])[1];
              return `<section class="card gr-sec" id="sec-${k}">
                ${s.h ? `<h2>${secIcon(s.h)} ${esc(titleCase(s.h.replace(/\s*\(.*\)$/, "")))}</h2>${sub ? `<div class="muted gr-sec-sub">${esc(sub.charAt(0) + sub.slice(1).toLowerCase())}</div>` : ""}` : ""}
                ${s.items.map((it) => itemHTML(it, ctx)).join("")}
              </section>`;
            }).join("")}
            <div class="card gr-end">
              <button class="btn ${isDone() ? "btn-green" : "btn-primary"} btn-lg" id="doneBtn">${isDone() ? "✓ Đã học chủ điểm này" : "✅ Đánh dấu đã học"}</button>
              <div class="row">
                ${prev ? `<a class="btn btn-outline" href="#${prev.id}">← ${prev.n}. ${esc(prev.title)}</a>` : ""}
                ${next ? `<a class="btn btn-outline" href="#${next.id}">${next.n}. ${esc(next.title)} →</a>` : nextLv ? `<a class="btn btn-outline" href="#${nextLv.lv.toLowerCase()}">Sang cấp ${esc(nextLv.lv)} →</a>` : ""}
              </div>
              <p class="muted mb-0" style="font-size:.88rem">Học xong lý thuyết? Luyện ngay với <a href="exam.html#/gym">Ôn tập nhanh</a> hoặc <a href="exam.html#/grammar">đề Grammar & Vocabulary</a>.</p>
            </div>
          </article>
        </div>
      </div></div>`;
    app.querySelectorAll("[data-sec]").forEach((a) => (a.onclick = (e) => {
      e.preventDefault();
      const el = app.querySelector("#sec-" + a.dataset.sec);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    }));
    app.querySelectorAll(".gr-say").forEach((b) => (b.onclick = () => FA.speak(b.dataset.say, { gender: "f", rate: 0.9 }).catch(() => FA.toast("Trình duyệt không hỗ trợ giọng đọc."))));
    const db = app.querySelector("#doneBtn");
    db.onclick = () => {
      const v = !isDone();
      setDone(t.id, v);
      if (v && FA.daily) FA.daily.add(FA.daily.PTS.item * 3);
      db.className = "btn " + (v ? "btn-green" : "btn-primary") + " btn-lg";
      db.textContent = v ? "✓ Đã học chủ điểm này" : "✅ Đánh dấu đã học";
      if (v) {
        const D = done();
        if (ts.every((x) => D[x.id]) && FA.celebrate) FA.celebrate({ icon: L.emoji, title: `Hoàn thành ngữ pháp ${L.lv}!`, sub: `Bạn đã học hết ${ts.length} chủ điểm cấp ${L.lv}.` });
        else FA.toast(next ? `Đã học! Tiếp theo: ${next.title}` : "Đã học!");
      }
    };
  }

  route();
})();
