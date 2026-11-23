# Chuyển các PDF "Ngữ pháp/A1.pdf … C2.pdf" → dữ liệu trang Học ngữ pháp (public/data/grammar-lessons/*.js)
# Chạy: npm run build:grammar   (cần Python 3 + PyMuPDF: pip install pymupdf)
#
# PDF được in từ HTML (Chromium) nên mỗi chủ điểm có bố cục cố định: tiêu đề "N. Tên (A1)", các mục viết HOA
# (TRỌNG TÂM, CHỨC NĂNG VÀ VÍ DỤ, CẤU TRÚC CÂU…, TRÌNH TỰ…, VÍ DỤ VÀ GIẢNG GIẢI…, ĐỐI CHIẾU VÀ TỰ SỬA), đoạn văn và bảng.
# - Bảng: dò khung bằng find_tables() rồi lấy chữ từng ô bằng get_text(clip) (font Type3 làm mất dấu cách nếu lấy chữ theo bảng).
# - Bảng bị cắt qua trang (Chromium lặp lại hàng tiêu đề) được nối lại.
# - Bỏ trang bìa/mục lục, chân trang "Page x of y" và dòng ghi nguồn của tài liệu gốc.
import sys, os, re, json
import pymupdf

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "Ngữ pháp")
OUT = os.path.join(ROOT, "public", "data", "grammar-lessons")
LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]
LEVEL_META = {
    "A1": ("Beginner", "🌱", "Nền tảng: to be, đại từ, danh từ, hiện tại đơn, câu hỏi cơ bản."),
    "A2": ("Elementary", "🌿", "Quá khứ, tương lai, so sánh, động từ khuyết thiếu thường gặp."),
    "B1": ("Intermediate", "🌳", "Hoàn thành, bị động, câu điều kiện, mệnh đề quan hệ — trọng tâm thi Aptis B1."),
    "B2": ("Upper Intermediate", "🚀", "Cấu trúc phức: câu tường thuật, đảo ngữ cơ bản, mệnh đề rút gọn."),
    "C1": ("Advanced", "🏆", "Ngữ pháp học thuật: nhấn mạnh, đảo ngữ, danh hóa, liên kết nâng cao."),
    "C2": ("Proficiency", "👑", "Sắc thái tinh tế và văn phong trang trọng gần người bản xứ."),
}
FOOTER = re.compile(r"^Tổng hợp Ngữ pháp Tiếng Anh.*\n?Page \d+ of \d+$", re.S)
TOPIC = re.compile(r"^(\d+)\.\s+(.+?)\s+\((A1|A2|B1|B2|C1|C2)\)$")
LINE_START = re.compile(r"^(\(|Ví dụ mở đầu|Cấu trúc chính:|Công thức chính:|Chưa đúng:|Lưu ý:|Ghi nhớ:|\d{2}\.\s|[-•▪●]\s)")


def join_lines(text, keep_paren_break=False):
    """Nối các dòng bị ngắt do xuống dòng tự động; giữ ngắt dòng trước các nhãn đầu dòng (và trước bản dịch "(...)" trong ô bảng)."""
    out = []
    for ln in [l.strip() for l in text.split("\n")]:
        if not ln:
            continue
        starts_new = bool(LINE_START.match(ln)) and (keep_paren_break or not ln.startswith("("))
        if out and not starts_new:
            prev = out[-1]
            out[-1] = prev + ("" if prev.endswith(" -") or prev.endswith("/") or ln.startswith("/") else " ") + ln
        else:
            out.append(ln)
    return [re.sub(r"\s+", " ", l).strip() for l in out]


def is_heading(t):
    t1 = t.replace("\n", " ").strip()
    letters = re.sub(r"[^A-Za-zÀ-ỹĐđ]", "", t1)
    return 3 <= len(t1) <= 140 and letters and t1 == t1.upper() and not TOPIC.match(t1)


def page_items(page):
    tabs = page.find_tables().tables
    items = []
    for t in tabs:
        rows = []
        for r in t.rows:
            cells = []
            for c in r.cells:
                txt = page.get_text("text", clip=pymupdf.Rect(c)).strip() if c else ""
                cells.append("\n".join(join_lines(txt, keep_paren_break=True)))
            if any(cells):
                rows.append(cells)
        items.append({"y": t.bbox[1], "table": rows})
    for b in page.get_text("blocks"):
        x0, y0, x1, y1, txt = b[:5]
        if any(pymupdf.Rect(t.bbox).intersects(pymupdf.Rect(x0, y0, x1, y1)) for t in tabs):
            continue
        txt = txt.strip()
        if not txt or FOOTER.match(txt):
            continue
        items.append({"y": y0, "text": txt})
    items.sort(key=lambda i: i["y"])
    return items


def build_level(lv):
    doc = pymupdf.open(os.path.join(SRC, lv + ".pdf"))
    topics, cur, sec, last_table = [], None, None, None
    for page in doc:
        first_on_page = True
        for it in page_items(page):
            if "table" in it:
                rows = it["table"]
                if cur is None or not rows:
                    continue
                # bảng nối từ trang trước: là phần tử đầu trang và (lặp hàng tiêu đề hoặc cùng số cột)
                if first_on_page and last_table is not None and sec is not None and sec["items"] and sec["items"][-1] is last_table \
                        and len(rows[0]) == len(last_table["table"][0]):
                    if rows[0] == last_table["table"][0]:
                        rows = rows[1:]
                    last_table["table"].extend(rows)
                else:
                    if sec is None:
                        sec = {"h": "", "items": []}
                        cur["sections"].append(sec)
                    last_table = {"table": rows}
                    sec["items"].append(last_table)
                first_on_page = False
                continue
            text = it["text"]
            one = re.sub(r"\s+", " ", text)
            m = TOPIC.match(one)
            if m and m.group(3) == lv:
                cur = {"n": int(m.group(1)), "title": m.group(2), "sections": []}
                topics.append(cur)
                sec, last_table = None, None
            elif cur is None:
                pass  # trang bìa, mục lục, dòng ghi nguồn
            elif is_heading(text):
                sec = {"h": one, "items": []}
                cur["sections"].append(sec)
                last_table = None
            else:
                if sec is None:
                    sec = {"h": "", "items": []}
                    cur["sections"].append(sec)
                for ln in join_lines(text):
                    # đoạn văn bị cắt qua trang: nối vào đoạn cuối nếu dòng trước chưa kết thúc câu
                    prev = sec["items"][-1] if sec["items"] else None
                    if first_on_page and prev and "p" in prev and not re.search(r"[.!?:)”\"]$", prev["p"]) and not LINE_START.match(ln):
                        prev["p"] += " " + ln
                    else:
                        sec["items"].append({"p": ln})
                last_table = None
            first_on_page = False
    meta = doc.metadata.get("title", "")
    expect = re.search(r"\((\d+) Chủ điểm\)", meta)
    if expect and int(expect.group(1)) != len(topics):
        raise SystemExit(f"{lv}: tìm thấy {len(topics)} chủ điểm, tiêu đề PDF ghi {expect.group(1)}")
    for i, t in enumerate(topics):
        if t["n"] != i + 1:
            raise SystemExit(f"{lv}: thứ tự chủ điểm lệch ở #{i + 1} ({t['title']})")
        t["id"] = f"{lv.lower()}-{t['n']:02d}"
    return topics


def main():
    os.makedirs(OUT, exist_ok=True)
    index = []
    for lv in LEVELS:
        topics = build_level(lv)
        name, emoji, desc = LEVEL_META[lv]
        body = (f"/* Ngữ pháp {lv} · {name} — sinh tự động bởi tools/build-grammar.py (npm run build:grammar), đừng sửa tay */\n"
                f"(window.FA_GRAMMAR_LESSONS = window.FA_GRAMMAR_LESSONS || {{}})[{json.dumps(lv)}] = "
                + json.dumps(topics, ensure_ascii=False, separators=(",", ":")) + ";\n")
        with open(os.path.join(OUT, lv.lower() + ".js"), "w", encoding="utf-8") as f:
            f.write(body)
        index.append({"lv": lv, "name": name, "emoji": emoji, "desc": desc, "file": f"data/grammar-lessons/{lv.lower()}.js",
                      "topics": [{"id": t["id"], "n": t["n"], "title": t["title"]} for t in topics]})
        print(f"{lv}: {len(topics)} chủ điểm, {len(body) // 1024} KB")
    with open(os.path.join(ROOT, "public", "data", "grammar-index.js"), "w", encoding="utf-8") as f:
        f.write("/* Mục lục trang Học ngữ pháp — sinh tự động bởi tools/build-grammar.py, đừng sửa tay. Nội dung từng cấp: data/grammar-lessons/<cấp>.js */\n"
                "window.FA_GRAMMAR_INDEX = " + json.dumps(index, ensure_ascii=False, indent=1) + ";\n")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
