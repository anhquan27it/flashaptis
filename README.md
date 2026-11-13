# ⚡ FlashAptis

Web luyện thi chứng chỉ **Aptis ESOL** — tông cam & trắng, miễn phí, không cần đăng ký.
Web tĩnh thuần HTML/CSS/JS, không cần build, chạy được trên GitHub Pages.

## Tính năng

| Trang | Nội dung |
|---|---|
| `index.html` | Trang chủ, giới thiệu, chọn nhanh kỹ năng |
| `exam.html` | Thi thử 5 kỹ năng có đồng hồ, chấm điểm 0–50, quy đổi CEFR ước lượng, xem lại + giải thích |
| `exam.html#/gym` | Phòng gym: luyện 10 câu không bấm giờ + **Sổ câu sai** |
| `flashcards.html` | 8 bộ flashcard theo chủ đề (120 thẻ), lật thẻ, nghe phát âm, kiểm tra nhanh |
| `tips.html` | Lộ trình 20 mẹo có nhiệm vụ, mở khóa lần lượt |
| `guide.html` | Cấu trúc bài thi Aptis |
| `calculator.html` | Tính điểm Aptis → CEFR |

- **Grammar & Vocabulary**: 2 đề × 50 câu, có giải thích tiếng Việt.
- **Reading**: 2 đề đủ 5 part (điền từ, sắp xếp câu ×2, ghép ý kiến, chọn tiêu đề).
- **Listening**: 2 đề đủ 4 part / 17 câu, đọc bằng giọng máy của trình duyệt (Web Speech API), giới hạn 2 lần nghe, transcript tô câu chốt.
- **Writing**: 3 đề đủ 4 part, đếm từ, điểm ước lượng tự động, bài mẫu + checklist.
- **Speaking**: 2 đề đủ 4 part, máy đọc câu hỏi, đếm ngược, ghi âm bằng micro, nghe lại, bài mẫu, tự chấm theo 5 tiêu chí.

- **Chấm điểm Writing theo 3 tiêu chí** (ngoài độ dài, dấu câu, từ nối, từ vựng):
  - **Chính tả** — kiểm tra bằng [Harper](https://github.com/Automattic/harper) (Apache-2.0, chạy bằng WebAssembly ngay trên máy, chính tả Anh-Anh). Part 1: câu sai chính tả không được điểm; Part 2–4: nhân hệ số theo tỉ lệ lỗi/số từ (tối thiểu 30%).
  - **Ngữ pháp** — cũng do Harper (các loại lỗi Agreement, Grammar, Miscellaneous, Repetition, WordChoice, BoundaryError), trừ nhẹ hơn chính tả (hệ số tối thiểu 60%), chỉ áp dụng Part 2–4. Lỗi viết hoa/dấu câu/gợi ý văn phong chỉ hiển thị tham khảo.
  - **Nội dung bám sát câu hỏi** — Harper *không* làm việc này (nó chỉ kiểm tra ngôn ngữ). FlashAptis tự kiểm tra bằng từ khóa, chạy offline (`assets/js/relevance.js` + tiêu chí từng đề ở `data/writing-rel.js`): Part 1 xét kiểu câu trả lời (hỏi tuổi → phải có số, hỏi thời tiết → từ chỉ thời tiết, “yes/no” → không điểm…); Part 2–4 xét các “ý” bắt buộc của từng đề và phạt chép lại câu hỏi/thông báo. Đây chỉ là kiểm tra từ khóa, không hiểu nghĩa như giám khảo hay AI.
  - **AI chấm nội dung (tùy chọn):** nếu có file `assets/js/ai-config.js` (sao chép từ `ai-config.example.js`, điền `endpoint`, `apiKey`, `model` của một API tương thích OpenAI) thì phần “bám sát câu hỏi” do model AI chấm thay cho từ khóa — một request cho cả bài, AI chỉ xét nội dung (không xét chính tả/ngữ pháp để khỏi trừ điểm hai lần) và được dặn bỏ qua mọi lệnh chèn trong bài viết. Lỗi mạng/quá giờ thì tự quay về kiểm tra từ khóa. ⚠️ Khi bật, **nội dung bài viết được gửi tới máy chủ AI đó**. `ai-config.js` chứa API key và đã nằm trong `.gitignore` — đừng commit hay đưa lên GitHub Pages (key trong file JS tĩnh ai cũng đọc được; muốn công khai thì phải qua một server trung gian giữ key).
  - Harper báo nhầm tên riêng/câu đúng? Bấm “✕ bỏ qua” ở màn hình xem lại, điểm tính lại ngay (từ chính tả được nhớ lâu dài, lỗi ngữ pháp chỉ trong phiên này). Mỗi mục có ghi rõ lý do bị trừ điểm nội dung.
  - Nếu không tải được Harper thì không trừ điểm chính tả/ngữ pháp (phần nội dung vẫn chấm). Harper cần **có mạng và chạy qua server http** (xem mục “Chạy trên máy”, ví dụ `python -m http.server 5500`); thư viện `harper.js@3.0.0` nạp từ jsDelivr (~8 MB lần đầu). Mở thẳng file `index.html` thì bỏ qua bước này.

**Thang điểm** (theo bảng tham khảo của [prepedu.com](https://prepedu.com/vi/blog/thang-diem-aptis), không phải bảng chính thức của British Council): Overall = Listening + Reading + Speaking + Writing, mỗi kỹ năng 0–50 → tối đa 200; Grammar & Vocabulary (50 câu) **không cộng vào tổng**. Listening/Reading: B1/B2/C từ 12/17/21 và 13/19/23 câu đúng trên 25 câu. Speaking tự chấm 4 part × 0–5 = 20, quy ra thang 50. Overall: <40 A1 · 40–79 A2 · 80–119 B1 · 120–159 B2 · 160–180 C1 · >180 C2. Bảng ở `FA.CEFR` trong `assets/js/common.js`.

Lịch sử làm bài, sổ câu sai, tiến độ flashcard & mẹo được lưu trong `localStorage` của trình duyệt.

## Chạy trên máy

Mở thẳng `index.html` bằng trình duyệt là dùng được. Hoặc chạy server tĩnh:

```bash
python -m http.server 5500
```

rồi vào http://localhost:5500. Nên dùng Chrome/Edge để có giọng đọc tiếng Anh tốt nhất.

## Thêm/sửa đề

Toàn bộ ngân hàng đề nằm trong thư mục `data/`:

- `data/grammar.js` — `{ sec, q, o: [...], a: chỉ số đáp án đúng, e: giải thích }`
- `data/reading.js` — các part `gap`, `order`, `opinion`, `heading`
- `data/listening.js` — các part `mcq`, `speakers`, `conv`, `mono` (lời thoại `s: 'm'|'f'`)
- `data/writing.js` (+ `data/writing-rel.js`: tiêu chí “bám sát câu hỏi” cho từng đề — đề mới nên khai báo thêm để được chấm nội dung), `data/speaking.js`, `data/vocab.js`

Thứ tự đáp án trắc nghiệm được xáo trộn tự động mỗi lần tải trang, nên cứ nhập đáp án theo thứ tự bất kỳ.

## Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub và push toàn bộ thư mục này lên.
2. Vào **Settings → Pages**, chọn branch `main`, thư mục `/ (root)`.
3. Web sẽ có ở `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

---
**Made by FPT University.** © 2026 FlashAptis. Bảo lưu mọi quyền.

Aptis là nhãn hiệu của British Council. FlashAptis là dự án học tập độc lập, không liên kết với British Council. Toàn bộ câu hỏi do FlashAptis tự biên soạn; điểm số chỉ mang tính ước lượng.
