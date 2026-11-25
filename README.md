# ⚡ FlashAptis

Web luyện thi chứng chỉ **Aptis ESOL** — tông cam & trắng. Luyện đề 5 kỹ năng có chấm điểm, Full Test, flashcard từ vựng, học ngữ pháp, lộ trình học theo mục tiêu.
Web tĩnh thuần HTML/CSS/JS, không cần build, triển khai trên Firebase Hosting (đăng nhập + đồng bộ bằng Firebase Auth/Firestore).

> **Trạng thái:** đang thử nghiệm nội bộ. Chưa đủ điều kiện mở công khai — xem mục [Định hướng trước khi công khai](#-định-hướng-trước-khi-công-khai).

## Cấu trúc thư mục

```
flashaptis/
├── public/                     # Web tĩnh — CHỈ thư mục này được deploy lên Firebase Hosting
│   ├── index.html  exam.html  flashcards.html  grammar.html  tips.html  guide.html
│   ├── calculator.html  pricing.html  dashboard.html  admin.html
│   ├── assets/
│   │   ├── css/style.css
│   │   ├── img/                brand/ (logo, favicon), speaking/ (ảnh đề Speaking)
│   │   └── js/
│   │       ├── core/           common.js (namespace FA, header/footer, lưu trữ, CEFR) · roadmap.js (lộ trình) · fx.js (hiệu ứng chuyển trang)
│   │       ├── firebase/       firebase-config.js, cloud.js (đăng nhập + đồng bộ), plan.js (Free/Pro)
│   │       ├── grading/        ai-grader.js, speaking-grader.js, relevance.js, spellcheck.js, ai-config.example.js
│   │       └── pages/          exam.js, flashcards.js, grammar.js, dashboard.js — logic riêng của từng trang
│   └── data/                   Ngân hàng đề + học liệu: grammar, reading, listening, writing (+ writing-rel), speaking, mock,
│                               vocab (+ vocab-index, vocab/*), grammar-index (+ grammar-lessons/*)
├── functions/                  Cloud Function gradeWriting / gradeSpeaking (Node 20) — proxy AI giữ API key
├── tools/                      build-vocab.js, xlsx-to-json.py, build-grammar.py — sinh dữ liệu từ file nguồn
├── tests/test.js               kiểm thử dữ liệu + logic thuần (npm test)
├── firebase.json  .firebaserc  firestore.rules
├── package.json
└── README.md  CLAUDE.md        (CLAUDE.md mô tả kiến trúc chi tiết)
```

## Tính năng

| Trang | Nội dung |
|---|---|
| `index.html` | Trang chủ, giới thiệu, chọn nhanh kỹ năng, câu hỏi thường gặp |
| `exam.html` | **Luyện đề** 5 kỹ năng có đồng hồ, chấm 0–50, quy đổi CEFR ước lượng, xem lại + giải thích, báo lỗi câu hỏi |
| `exam.html#/mock` | **Full Test**: 5 phần liên tiếp như buổi thi thật, khóa trình duyệt mức web, Overall /200 |
| `exam.html#/gym` | Ôn tập nhanh 10/20 câu (từ đề + từ vựng CEFR A1–C2) + **Sổ câu sai** |
| `flashcards.html` | 8 bộ cơ bản + 6 bộ CEFR A1–C2 (4.922 từ) + 23 chủ đề Aptis (4.600 từ); lật thẻ, phát âm, kiểm tra, ⭐ từ khó |
| `grammar.html` | 101 chủ điểm ngữ pháp A1–C2, mỗi bài 6 mục + bảng, đánh dấu đã học |
| `dashboard.html` | Lộ trình học theo bậc mục tiêu B1/B2/C1 + ngày thi, 4 giai đoạn tự tick, biểu đồ 14 ngày |
| `tips.html` | Lộ trình 20 mẹo có nhiệm vụ, mở khóa lần lượt |
| `guide.html` · `calculator.html` | Cấu trúc bài thi Aptis · Tính điểm → CEFR |
| `pricing.html` · `admin.html` | Gói Free/Pro, thanh toán VietQR · (Admin) duyệt thanh toán, xử lý báo lỗi đề |

**Ngân hàng đề:** 28 Grammar & Vocabulary · 13 Reading · 24 Listening · 28 Writing · 27 Speaking · 2 Full Test.

- **Listening**: 4 part / 17 câu hỏi (25 ý chấm điểm), đọc bằng giọng máy của trình duyệt (Web Speech API), tối đa 2 lần nghe, transcript tô câu chốt.
- **Speaking**: máy đọc câu hỏi, đếm ngược, ghi âm để nghe lại (không lưu bản ghi), tự chấm 4 part × 0–5; nếu bật AI thì nhận dạng giọng nói thành chữ rồi AI chấm sẵn (người dùng vẫn chỉnh được).
- **Writing** = chất lượng văn bản × hệ số chính tả × hệ số ngữ pháp × hệ số nội dung:
  - Chính tả/ngữ pháp bằng [Harper](https://github.com/Automattic/harper) (Apache-2.0, WebAssembly chạy trên máy, nạp từ jsDelivr). Không tải được thì không trừ điểm.
  - Nội dung bám câu hỏi: kiểm tra từ khóa offline (`relevance.js` + `data/writing-rel.js`), hoặc AI chấm nếu được cấu hình. AI lỗi → tự quay về từ khóa. ⚠️ Khi bật AI, **nội dung bài viết được gửi tới máy chủ AI**.

**Thang điểm** (theo bảng tham khảo của [prepedu.com](https://prepedu.com/vi/blog/thang-diem-aptis), không phải bảng chính thức của British Council): Overall = Listening + Reading + Speaking + Writing, mỗi kỹ năng 0–50 → tối đa 200; Grammar & Vocabulary (50 câu) **không cộng vào tổng**. Listening/Reading: B1/B2/C từ 12/17/21 và 13/19/23 ý đúng trên 25 ý (Listening: 17 câu hỏi = 25 ý). Speaking 4 part × 0–5 = 20, quy ra thang 50. Overall: <40 A1 · 40–79 A2 · 80–119 B1 · 120–159 B2 · 160–180 C1 · >180 C2. Bảng ở `FA.CEFR` trong `public/assets/js/core/common.js`.

**Gói tài khoản:** Free (0đ) làm được 2 đề đầu mỗi kỹ năng, AI chấm 3 lượt/ngày. Pro (50.000đ / 30 ngày) mở toàn bộ đề, AI 6 lượt/ngày. Thanh toán: quét VietQR → "Tôi đã chuyển khoản" → admin đối chiếu và duyệt ở `admin.html`. Cấu hình ở `FA.PLAN` (`public/assets/js/firebase/plan.js`).

### Đăng nhập và dữ liệu
- **Bắt buộc đăng nhập** (Google hoặc email/mật khẩu): Luyện đề, Full Test, Ôn tập, Dashboard. **Dùng tự do**: Flashcard, Ngữ pháp, Mẹo, Cấu trúc đề, Tính điểm.
- `localStorage` là nơi lưu chính; khi đã đăng nhập thì các mục sau được **đồng bộ theo tài khoản** (Firestore `users/{uid}`): lịch sử làm bài (đề đã làm/chưa làm, điểm, bài làm để xem lại), Full Test, sổ câu sai, mục tiêu lộ trình, chuỗi ngày & mục tiêu ngày, flashcard đã thuộc / từ khó, chủ điểm ngữ pháp đã học, mẹo đã làm.
- **Chỉ lưu trên trình duyệt đang dùng**: bản nháp bài làm dở (24 giờ — chưa sang được thiết bị khác), sáng/tối, bộ lọc, từ "bỏ qua" chính tả. Đăng xuất thì xóa bản sao cục bộ của dữ liệu đồng bộ và cả bản nháp bài làm dở.

## Chạy trên máy (dành cho người cùng phát triển)

Cần Node.js. **Không cần cấu hình Firebase** — `public/assets/js/firebase/firebase-config.js` đã nằm trong repo (config web là công khai, không phải bí mật).

```bash
git clone <repo> && cd flashaptis
git checkout <branch>
npm start                  # http-server cổng 5501, tắt cache, tự mở trình duyệt
npm test                   # kiểm thử dữ liệu đề + logic thuần
```

- Phải mở qua **`http://localhost:5501`** (không dùng `127.0.0.1`, IP LAN hay mở thẳng file): Firebase Auth chỉ cho phép `localhost` và `flashaptis.web.app`; Harper và `fetch` AI không chạy ở `file://`. Cần có mạng (Firebase SDK, Harper nạp từ CDN).
- Cách khác: `cd public && python -m http.server 5500`.
- Đăng nhập bằng **tài khoản của chính bạn**; dữ liệu tách theo tài khoản. Nên dùng Chrome/Edge (giọng đọc, nhận dạng giọng nói).
- AI chấm: `public/assets/js/grading/ai-config.js` **không có trong repo** (chứa API key). Muốn thử thì sao chép từ `ai-config.example.js` và điền key của bạn; không có thì chấm offline.
- Sinh lại dữ liệu (chỉ máy có file nguồn): `npm run build:vocab` (cần Python 3), `npm run build:grammar` (cần `pip install pymupdf`). Đừng sửa tay `data/vocab/*`, `vocab-index.js`, `grammar-index.js`, `grammar-lessons/*`.

### Quy trình làm việc chung
1. Mỗi người làm trên **branch riêng**, commit và push lên GitHub.
2. Trước khi commit chạy `git status`, đảm bảo **không** có `ai-config.js` hay file chứa key.
3. Người quản trị pull branch về, thử ở `localhost:5501`, chạy `npm test`, merge rồi mới deploy.

## Triển khai lên Firebase (chỉ người quản trị)

Project Firebase: `flashaptis` · Hosting: https://flashaptis.web.app

Thiết lập một lần:
1. [Firebase Console](https://console.firebase.google.com): **Authentication → Sign-in method → bật Google và Email/Password**; **Firestore Database → Create** (production mode, `asia-southeast1`).
2. `npm i -g firebase-tools` rồi `firebase login`. Thêm người deploy: Project settings → Users and permissions → Add member (Editor).

Mỗi lần cập nhật (trên code đã merge):

```bash
firebase deploy --only hosting            # chỉ đưa web lên
npm run deploy                            # = hosting + firestore (khi sửa firestore.rules)
npm run deploy:functions                  # Cloud Function AI (cần gói Blaze)
```

- Hosting chỉ đưa lên thư mục `public/`. ⚠️ **Hiện tại `ai-config.js` (chứa API key) đang được deploy để test nội bộ** — ai mở DevTools cũng lấy được key. Phải xử lý trước khi công khai (xem bên dưới).
- **AI qua Cloud Function**: `firebase functions:secrets:set AI_API_KEY` → `npm run deploy:functions` → đặt `useCloudAI: true` trong `firebase-config.js` → deploy lại hosting. Lượt AI/ngày đếm ở server (`AI_PER_DAY` phải khớp `FA.PLAN.aiPerDay`).
- **Admin**: mở `admin.html` khi đã đăng nhập để lấy UID → Firestore → collection `admins` → document ID = UID. Điền tài khoản nhận tiền ở `FA.PLAN.bank`.
- Domain khác muốn đăng nhập được phải thêm ở Authentication → Settings → **Authorized domains**.

## 🔒 Định hướng trước khi công khai

Hiện web an toàn ở mức "thử nghiệm nội bộ": dữ liệu người dùng được Firestore Rules bảo vệ đúng (mỗi người chỉ đọc/ghi của mình, chỉ admin cấp Pro), nhưng **đề, đáp án, API key và việc chặn gói Pro đều nằm ở phía trình duyệt**. Các việc cần làm, xếp theo mức ưu tiên:

### Bắt buộc (chặn việc mở công khai)
1. **Gỡ API key khỏi web.**
   - Thêm `"assets/js/grading/ai-config.js"` vào `hosting.ignore` của `firebase.json`, xóa file khỏi bản đã deploy.
   - **Thu hồi và tạo lại** mọi key đã từng deploy (OpenRouter, Google AI Studio, key dự phòng) — coi như đã lộ.
   - Chuyển hẳn sang Cloud Function (`gradeWriting`, `gradeSpeaking` đã có trong `functions/index.js`): bật gói Blaze, đặt secret, `useCloudAI: true`. Đặt **giới hạn ngân sách / cảnh báo chi phí** trên Google Cloud và hạn mức ở nhà cung cấp AI.
2. **Bật Firebase App Check** (reCAPTCHA Enterprise) cho Firestore và Cloud Functions để chặn script gọi thẳng API ngoài web; Cloud Function kiểm tra thêm độ dài input, chống gọi dồn (rate limit theo uid/IP).
3. **Bản quyền nội dung đề.** Phần lớn đề (từ đề 4 trở đi mỗi kỹ năng) được chuyển từ tài liệu bên ngoài (thư mục `Đề/`), từ vựng/ngữ pháp sinh từ file nguồn của bên thứ ba. Trước khi công khai — nhất là khi **thu phí** gói Pro — cần xác nhận quyền sử dụng hoặc thay bằng nội dung tự biên soạn, và sửa lại câu "nội dung do FlashAptis tự biên soạn" ở đầu các file `public/data/*.js` cho đúng thực tế (đây là file công khai).
4. **Chính sách quyền riêng tư & điều khoản**: nêu rõ dữ liệu thu thập (email, tên, lịch sử làm bài), bài viết/bản chữ Speaking được gửi cho nhà cung cấp AI, thời gian lưu, cách xóa tài khoản. Thêm chức năng **xóa tài khoản và dữ liệu**.

### Bảo mật đề và gói Pro
5. **Không gửi đề Pro cho người không có quyền.** Hiện toàn bộ `data/*.js` (kể cả đề Pro và đáp án) công khai — ai biết URL là tải được. Hướng sửa:
   - Chuyển đề Pro vào Firestore (`tests/{skill}/{id}`) với rule chỉ cho đọc khi `plans/{uid}.proUntil > request.time` — hoặc phục vụ qua Cloud Function kiểm tra gói.
   - Tách **đáp án + giải thích** khỏi đề: trình duyệt chỉ nhận câu hỏi; nộp bài thì Cloud Function chấm và trả đáp án. Việc này cũng giúp điểm Full Test đáng tin hơn.
   - Đề Free có thể giữ tĩnh để tải nhanh và chạy offline.
6. **Điểm số do người dùng tự ghi** (`users/{uid}/attempts` cho client ghi tự do) → không dùng làm bảng xếp hạng/chứng nhận. Nếu sau này có xếp hạng thì điểm phải do server chấm và ghi.
7. **Thanh toán tự động**: thay duyệt tay bằng webhook ngân hàng/cổng thanh toán (Casso, SePay, PayOS…) gọi Cloud Function cộng `proUntil`; ghi log giao dịch.
8. OTP khi tạo tài khoản đang kiểm tra ở trình duyệt (lách được) → chuyển sang Cloud Function hoặc dùng xác minh email của Firebase; bật **email enumeration protection** và giới hạn đăng ký trong Firebase Auth.

### Vận hành & chất lượng
9. **Domain riêng + HTTPS** (Firebase Hosting hỗ trợ), thêm vào Authorized domains; thêm header bảo mật trong `firebase.json`: `Content-Security-Policy` (chỉ cho gstatic, jsDelivr, endpoint AI), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (chỉ micro).
10. **Đồng bộ bài làm dở** giữa các thiết bị (hiện bản nháp chỉ nằm trên trình duyệt đang làm; đăng xuất đã xóa nháp).
11. **Giám sát**: bật Firebase Crashlytics/Analytics hoặc ghi lỗi JS vào Firestore; theo dõi số lượt AI, lỗi 429/503; sao lưu Firestore định kỳ (export lên Cloud Storage).
12. **Kiểm thử trước mỗi lần deploy**: `npm test` trong CI (GitHub Actions) + kiểm tra trên điện thoại thật (393/360px); thử AI Speaking trên Chrome/Edge thật (mới chỉ thử bằng jsdom).
13. Xác minh cấu trúc đề và thang điểm với **nguồn chính thức của British Council** (hiện dùng bảng tham khảo prepedu.com) và ghi rõ trên web là điểm ước lượng.
14. Hiệu năng: nạp Harper (~8 MB) và bộ từ vựng lớn chỉ khi cần (đã làm một phần), cân nhắc Service Worker để học offline.

## Thêm/sửa đề

- `public/data/grammar.js` — `{ sec, q, o: [...], a: chỉ số đáp án đúng, e: giải thích }`
- `public/data/reading.js` — các part `gap`, `order`, `opinion`, `heading`
- `public/data/listening.js` — các part `mcq`, `speakers`, `conv`, `mono` (lời thoại `s: 'm'|'f'`)
- `public/data/writing.js` + `public/data/writing-rel.js` (đề mới **phải** khai báo `REL.<id>` để được chấm nội dung), `public/data/speaking.js`
- `public/data/mock.js` — Full Test chỉ tham chiếu id đề lẻ
- Đề mới thêm vào **cuối** mảng (đề thứ 3 trở đi của mỗi kỹ năng là đề Pro). Đáp án trắc nghiệm được xáo tự động mỗi lần tải trang. Chạy `npm test` sau khi sửa.

## Quy ước khi thêm file
- Trang mới → `public/<tên>.html`: nạp `core/fx.js` trong `<head>`, script theo thứ tự `core/common.js` → `firebase/firebase-config.js` → `firebase/cloud.js` → `firebase/plan.js` → script riêng của trang.
- Logic riêng của một trang → `public/assets/js/pages/`; tiện ích dùng chung → `core/`; chấm điểm → `grading/`; Firebase → `firebase/`.
- Khóa `FA.store` mới cần đồng bộ → thêm vào `KV_KEYS` trong `cloud.js`.

---
**Made by FPT University.** © 2026 FlashAptis. Bảo lưu mọi quyền.

Aptis là nhãn hiệu của British Council. FlashAptis là dự án học tập độc lập, không liên kết với British Council. Điểm số chỉ mang tính ước lượng.
