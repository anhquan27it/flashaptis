# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

FlashAptis là web luyện thi Aptis ESOL: site tĩnh thuần HTML/CSS/JS, **không có bước build, không có linter, không có test suite** trong repo. Giao diện và comment viết bằng tiếng Việt — giữ nguyên văn phong khi sửa.

## Chạy

```bash
npm start                      # http-server cổng 5501 (npx), tắt cache, tự mở trình duyệt
python -m http.server 5500     # cách khác
```

Phải mở qua **server http(s)**, không mở thẳng file `index.html`: Harper (WASM, kiểm tra chính tả/ngữ pháp Writing) và `fetch` tới AI không chạy ở `file://`. Harper (`harper.js@3.0.0`) nạp từ jsDelivr nên cần mạng. Dùng đúng **`localhost`** (không `127.0.0.1`/IP LAN) vì Firebase Auth chỉ cho phép `localhost` và `flashaptis.web.app` làm domain đăng nhập.

**Người cùng phát triển không cần setup Firebase**: `assets/js/firebase-config.js` đã được commit, chỉ cần `git checkout <branch>` + `npm start`, đăng nhập bằng tài khoản Google của mình (dữ liệu tách theo uid). Mỗi người làm branch riêng; không commit `assets/js/ai-config.js`. Chỉ chủ project (hoặc thành viên Editor) mới deploy: `firebase deploy --only hosting[,firestore]` chạy trên code đã merge — chi tiết trong README mục "Triển khai lên Firebase". Đừng tự ý tạo project Firebase khác hay đổi `firebase-config.js` / `firestore.rules` mà chưa hỏi.

Không có lệnh test. Cách đã dùng để kiểm tra hành vi: script Node + `jsdom` (`JSDOM.fromURL` trỏ vào một static server cục bộ, `runScripts: "dangerously"`, `resources: "usable"`), đặt **ngoài repo** (thư mục scratchpad), mô phỏng làm bài rồi đọc DOM / `localStorage`.

## Kiến trúc

- Mỗi trang (`index`, `exam`, `flashcards`, `tips`, `guide`, `calculator`) là một file HTML độc lập nạp `<script>` thủ công — thứ tự nạp là phần của kiến trúc. Mọi thứ nằm dưới namespace global `FA`.
- [assets/js/common.js](assets/js/common.js): `FA` — header/footer (`FA.renderShell`), `FA.store` (localStorage, tiền tố `flashaptis:`), lịch sử làm bài (`FA.saveAttempt` / `FA.updateAttempt`), sổ câu sai, và **bảng quy đổi điểm → CEFR** (`FA.CEFR`, `FA.toCEFR`, `FA.speakingTo50`). Đổi thang điểm thì sửa ở đây rồi cập nhật `calculator.html`, `guide.html`, README cho khớp.
- [exam.html](exam.html) + [assets/js/exam.js](assets/js/exam.js): SPA định tuyến bằng hash (`#/<skill>/<testId>`, `#/gym`). `RUNNERS[skill](test, replay?)` cho 5 kỹ năng (grammar, reading, listening, writing, speaking), tất cả kết thúc bằng `renderResult(o)`. Thứ tự script trong `exam.html`: `common.js` → `data/*.js` → `relevance.js` → `ai-config.js` → `ai-grader.js` → `spellcheck.js` → `exam.js`.
- `data/*.js`: ngân hàng đề, gán vào biến global (`FA_WRITING`, …). Thêm đề Writing mới phải khai báo tiêu chí nội dung tương ứng trong [data/writing-rel.js](data/writing-rel.js) (`REL.<id>`), nếu không đề đó không được chấm bám sát câu hỏi.

### Lịch sử & xem lại bài
- Lượt làm bài lưu theo khóa `skill:testId` (tối đa 10, mới nhất đứng đầu), mỗi lượt có `at` (tăng nghiêm ngặt, dùng làm khóa) và `ans` (bài làm). Nút "Xem lại" ở bảng lịch sử gọi `RUNNERS[skill](test, attempt)`: runner nạp lại `ans`, **không lưu lượt mới**, không thêm vào sổ câu sai.
- Đáp án trắc nghiệm bị **xáo thứ tự mỗi lần tải trang** → `ans` phải lưu **văn bản** lựa chọn, không lưu chỉ số (xem `optText` / `optIdx`).
- Speaking không lưu bản ghi âm (chỉ lưu điểm tự chấm 4 part × 0–5).

### Chấm Writing (phần phức tạp nhất)
Điểm Writing = chất lượng văn bản × hệ số chính tả (Harper) × hệ số ngữ pháp (Harper) × hệ số nội dung, tính trong `finish()` của `runWriting`:
1. **Chính tả/ngữ pháp**: `FA.spell` ([assets/js/spellcheck.js](assets/js/spellcheck.js)) bọc Harper. Không tải được Harper → không trừ điểm, có ghi chú.
2. **Nội dung bám câu hỏi**: `FA.rel` ([assets/js/relevance.js](assets/js/relevance.js)) chấm từ khóa offline (`p1`, `factor`, `ideas`, chống chép lại câu hỏi); nếu bật AI thì `FA.ai` ([assets/js/ai-grader.js](assets/js/ai-grader.js)) chấm thay — một request cho cả bài, mục nào AI không trả về thì rơi về từ khóa, lỗi mạng/quá giờ thì cả bài dùng từ khóa. Phần AI chạy song song với Harper.
3. **Kết quả AI được lưu vào `ans.ai`** của lượt làm bài; xem lại **không gọi AI lại**, dùng đúng kết quả đã lưu (lượt cũ không có `ans.ai` thì dùng từ khóa). Đừng đưa lời gọi AI vào đường replay.
4. Bấm "✕ bỏ qua" ở màn xem lại gọi `update(calc())` → `FA.updateAttempt` ghi đè điểm của lượt đó.

### AI chấm (tùy chọn)
`assets/js/ai-config.js` (đặt `window.FA_AI = {endpoint, apiKey, model, timeoutMs}`, API kiểu OpenAI, `stream:false`) **nằm trong `.gitignore` vì chứa API key** — không commit, không đưa lên GitHub Pages. Mẫu: `ai-config.example.js`. Không có file này thì `FA.ai.enabled()` là false và mọi thứ chạy offline. Prompt của AI chỉ chấm nội dung (không chấm chính tả/ngữ pháp để khỏi trừ hai lần) và có chống prompt-injection từ bài viết.

### Firebase (project `flashaptis`)
- [assets/js/firebase-config.js](assets/js/firebase-config.js) (`window.FA_FIREBASE`, **được commit**: config web không phải bí mật, bảo mật nằm ở `firestore.rules`) → [assets/js/cloud.js](assets/js/cloud.js) (`FA.cloud`), nạp ngay sau `common.js` ở cả 6 trang. SDK là bản **compat** 10.14.1 nạp từ gstatic (không build).
- Đăng nhập Google (nút ở `.auth-slot` trong header). `FA.store` vẫn là nguồn chính; cloud.js bọc `FA.store.set` để đẩy lên Firestore (`users/{uid}/attempts|kv/{khóa}`, giá trị là chuỗi JSON vì Firestore cấm mảng lồng mảng). Đăng nhập → gộp (không mất bên nào); đăng xuất → xóa bản sao cục bộ. Khóa được đồng bộ: `attempts`, `wrongbook`, `fc-known`, `tips-done`, `calc`, `speakRate:*` — thêm khóa mới cần sửa `KV_KEYS` ở cloud.js.
- Hosting: `firebase.json` (public = thư mục gốc, **ignore `ai-config.js`**), deploy `firebase deploy --only hosting,firestore`.
- AI qua Cloud Function `gradeWriting` ([functions/index.js](functions/index.js), cần gói Blaze, secret `AI_API_KEY`, endpoint AI phải public): bật bằng `useCloudAI: true`. Có `ai-config.js` thì vẫn ưu tiên gọi thẳng (dev). Prompt nằm ở cả `ai-grader.js` và `functions/index.js` — sửa phải sửa cả hai.

## Thang điểm

Overall = Listening + Reading + Speaking + Writing (mỗi kỹ năng 0–50, tối đa 200); Grammar & Vocabulary **không cộng vào Overall**. Listening/Reading xét bậc CEFR trên điểm **chưa làm tròn** `(đúng/tổng)*50`. Nguồn ngưỡng là prepedu.com (không phải bảng chính thức của British Council); các mốc trùng nhau (80/120/160) tính vào bậc cao hơn, C2 từ 181. Ngưỡng Writing/Speaking và A1/A2 từng kỹ năng là ước lượng.
