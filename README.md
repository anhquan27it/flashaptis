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
- `data/writing.js`, `data/speaking.js`, `data/vocab.js`

Thứ tự đáp án trắc nghiệm được xáo trộn tự động mỗi lần tải trang, nên cứ nhập đáp án theo thứ tự bất kỳ.

## Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub và push toàn bộ thư mục này lên.
2. Vào **Settings → Pages**, chọn branch `main`, thư mục `/ (root)`.
3. Web sẽ có ở `https://<tên-tài-khoản>.github.io/<tên-repo>/`.

---
**Made by FPT University.** © 2026 FlashAptis. Bảo lưu mọi quyền.

Aptis là nhãn hiệu của British Council. FlashAptis là dự án học tập độc lập, không liên kết với British Council. Toàn bộ câu hỏi do FlashAptis tự biên soạn; điểm số chỉ mang tính ước lượng.
