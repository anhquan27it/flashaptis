# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

FlashAptis là web luyện thi Aptis ESOL: site tĩnh thuần HTML/CSS/JS, **không có bước build, không có linter, không có test suite** trong repo. Giao diện và comment viết bằng tiếng Việt — giữ nguyên văn phong khi sửa.

## Chạy

```bash
npm start                      # http-server phục vụ thư mục public/ ở cổng 5501, tắt cache, tự mở trình duyệt
cd public && python -m http.server 5500   # cách khác
npm run deploy                 # firebase deploy --only hosting,firestore
```

Phải mở qua **server http(s)**, không mở thẳng file `index.html`: Harper (WASM, kiểm tra chính tả/ngữ pháp Writing) và `fetch` tới AI không chạy ở `file://`. Harper (`harper.js@3.0.0`) nạp từ jsDelivr nên cần mạng. Dùng đúng **`localhost`** (không `127.0.0.1`/IP LAN) vì Firebase Auth chỉ cho phép `localhost` và `flashaptis.web.app` làm domain đăng nhập.

**Người cùng phát triển không cần setup Firebase**: `public/assets/js/firebase/firebase-config.js` đã được commit, chỉ cần `git checkout <branch>` + `npm start`, đăng nhập bằng tài khoản Google của mình (dữ liệu tách theo uid). Mỗi người làm branch riêng; không commit `public/assets/js/grading/ai-config.js`. Chỉ chủ project (hoặc thành viên Editor) mới deploy: `firebase deploy --only hosting[,firestore]` chạy trên code đã merge — chi tiết trong README mục "Triển khai lên Firebase". Đừng tự ý tạo project Firebase khác hay đổi `firebase-config.js` / `firestore.rules` mà chưa hỏi.

Không có lệnh test. Cách đã dùng để kiểm tra hành vi: script Node + `jsdom` (`JSDOM.fromURL` trỏ vào một static server cục bộ, `runScripts: "dangerously"`, `resources: "usable"`), đặt **ngoài repo** (thư mục scratchpad), mô phỏng làm bài rồi đọc DOM / `localStorage`.

## Kiến trúc

```
flashaptis/
├── public/                     # Web tĩnh — CHỈ thư mục này được deploy lên Firebase Hosting
│   ├── index.html  exam.html  flashcards.html  tips.html  guide.html
│   ├── calculator.html  pricing.html  admin.html  dashboard.html
│   ├── assets/
│   │   ├── css/style.css
│   │   └── js/
│   │       ├── core/           common.js — namespace FA, header/footer, lưu trữ, CEFR · roadmap.js — tính lộ trình học (FA.roadmap)
│   │       ├── firebase/       firebase-config.js, cloud.js (đăng nhập + đồng bộ), plan.js (Free/Pro)
│   │       ├── grading/        ai-grader.js, speaking-grader.js, relevance.js, spellcheck.js, ai-config.example.js
│   │       └── pages/          exam.js, flashcards.js, dashboard.js — logic riêng của từng trang
│   └── data/                   Ngân hàng đề: grammar, reading, listening, writing (+ writing-rel), speaking, vocab
├── functions/                  Cloud Function gradeWriting (Node 20) — proxy AI giữ API key
├── firebase.json  .firebaserc  firestore.rules
├── package.json                npm start · npm run deploy · npm run deploy:functions
└── README.md  CLAUDE.md
```

Mọi đường dẫn trong HTML là tương đối so với `public/` (vd. `assets/js/core/common.js`). Dời/đổi tên file JS thì sửa thẻ `<script>` ở mọi trang dùng nó.

- Mỗi trang (`index`, `exam`, `flashcards`, `tips`, `guide`, `calculator`, `pricing`, `admin`) là một file HTML độc lập nạp `<script>` thủ công — thứ tự nạp là phần của kiến trúc. Mọi thứ nằm dưới namespace global `FA`.
- [public/assets/js/core/common.js](public/assets/js/core/common.js): `FA` — header/footer (`FA.renderShell`), `FA.store` (localStorage, tiền tố `flashaptis:`), lịch sử làm bài (`FA.saveAttempt` / `FA.updateAttempt`), sổ câu sai, và **bảng quy đổi điểm → CEFR** (`FA.CEFR`, `FA.toCEFR`, `FA.speakingTo50`). Đổi thang điểm thì sửa ở đây rồi cập nhật `calculator.html`, `guide.html`, README cho khớp.
- [exam.html](public/exam.html) + [public/assets/js/pages/exam.js](public/assets/js/pages/exam.js): SPA định tuyến bằng hash (`#/<skill>/<testId>`, `#/gym`). `RUNNERS[skill](test, replay?)` cho 5 kỹ năng (grammar, reading, listening, writing, speaking), tất cả kết thúc bằng `renderResult(o)`. Thứ tự script trong `exam.html`: `common.js` → `data/*.js` → `relevance.js` → `ai-config.js` → `ai-grader.js` → `speaking-grader.js` → `spellcheck.js` → `exam.js`.
- `data/*.js`: ngân hàng đề, gán vào biến global (`FA_WRITING`, …). Hiện có 28 đề Grammar, 13 Reading, 24 Listening, 28 Writing, 27 Speaking (đề 1–3 mỗi kỹ năng là bản gốc FlashAptis tự biên soạn; các đề sau chuyển từ thư mục `Đề/` — PDF/DOCX nguồn, 25 bộ + 25 đề grammar/vocab). Khi chuyển đề: Grammar vocab được đổi từ dạng nối (5 câu/10 lựa chọn) sang trắc nghiệm 4 lựa chọn; Reading/Listening gốc không có đáp án nên đáp án do người chuyển tự giải rồi **kiểm tra chéo bằng một lượt giải độc lập**; Listening Part 2 (6 lựa chọn) / Part 3 (4 nhận định Man/Woman/Both) đã viết lại cho khớp transcript vì file gốc thiếu/lạc đề; Reading bộ 10–23 thực chất cùng một đề (chỉ xáo thứ tự) nên chỉ lấy một. Reading có 4 part (1 bài sắp xếp) hoặc 5 part (2 bài). Speaking Part 2–3 dùng ảnh thật ở `public/assets/img/speaking/` (trường `photo.img`, đề cũ vẫn dùng emoji `photo.emo`); `p4.time` là thời gian nói (mặc định 120 giây). 3 đề Listening (bộ 7, 11, 14 của thư mục nguồn) bị thiếu hẳn phần nội dung gốc nên **chưa đưa lên**. Trường `notes`/`src` của dữ liệu chuyển đề không được đưa vào `data/*.js`. Thêm đề Writing mới phải khai báo tiêu chí nội dung tương ứng trong [public/data/writing-rel.js](public/data/writing-rel.js) (`REL.<id>`), nếu không đề đó không được chấm bám sát câu hỏi.

### Dashboard lộ trình (dashboard.html)
- [public/dashboard.html](public/dashboard.html) + [pages/dashboard.js](public/assets/js/pages/dashboard.js) (chỉ vẽ UI) + [core/roadmap.js](public/assets/js/core/roadmap.js) (`FA.roadmap.compute`, thuần dữ liệu → có test trong `tests/test.js`). Người dùng chọn bậc mục tiêu B1/B2/C1 + ngày thi (`FA.store` khóa `roadmap`, đã thêm vào `KV_KEYS` của cloud.js nên đồng bộ theo tài khoản). Ngưỡng điểm mục tiêu lấy từ `FA.CEFR` (đổi thang điểm ở common.js là dashboard tự theo). 4 giai đoạn (Nền tảng → Khởi động 4 kỹ năng → Luyện sâu → Chạm mục tiêu) với các việc tự tick theo `attempts` / `fc-known` / `tips-done`; số đề yêu cầu bị giới hạn bởi số đề gói hiện tại mở (`FA.plan.locked`) để người dùng Free không bị kẹt. Thứ tự script: `common.js` → cloud/plan → `data/*.js` → `roadmap.js` → `dashboard.js`.
- **Bắt buộc đăng nhập** (Firebase đã cấu hình mà chưa có người dùng): dashboard, mọi đề thi (`viewLogin` trong exam.js) và Ôn tập nhanh `#/gym` đều hiện màn đăng nhập; không cấu hình Firebase (chạy local không cloud) thì không chặn. Flashcard và Mẹo vẫn mở tự do.

### Động lực học: chuỗi ngày, mục tiêu ngày, ăn mừng, từ khó
- **`FA.daily`** (common.js): "điểm học" mỗi ngày — nộp 1 đề = 10 (gọi trong `FA.saveAttempt`, nên lượt xem lại không cộng), 1 câu Ôn tập / 1 thẻ flashcard / 1 câu kiểm tra từ vựng = 1. Nhật ký `activity` {"YYYY-MM-DD": điểm}; ngày chưa có nhật ký suy ra từ `attempts` + `fc-known`. Chuỗi = ngày liên tiếp có học (hôm nay chưa học thì tính tới hôm qua). Mục tiêu 10/20/40 (`daily.goal`, mặc định 20). Widget 🔥 nằm ở `.streak-slot` trên header (`FA.daily.paint()`); `roadmap.compute` nhận `activity: FA.daily.perDay()` để dashboard cùng nguồn với header.
- **`FA.celebrate({icon,title,sub,confetti})`** (common.js): banner + pháo giấy, xếp hàng từng cái; tôn trọng prefers-reduced-motion. Gọi khi: vừa đạt mục tiêu ngày; kết quả bài thi (`celebrateResult` trong exam.js — bài đầu tiên của kỹ năng, lên bậc CEFR, kỷ lục mới; chụp `skillPrev` **trước** `saveAttempt`, chờ điểm chốt: trắc nghiệm 0,9s, Writing 2,5s sau lần `update` cuối, Speaking tự chấm (`selfScore`) chỉ sau khi người dùng chỉnh điểm); xong giai đoạn lộ trình (`FA.roadmap.celebrateStages` so với `roadmap-seen` lưu trên máy — lần đầu chỉ ghi nhận; giai đoạn 4 gắn theo bậc mục tiêu). exam.html nạp thêm `roadmap.js` cho việc này.
- **Flashcard ⭐ từ khó**: nút ☆ góc thẻ / phím S / trong danh sách từ / sau mỗi câu kiểm tra → `fc-starred` {"bộ|từ": ts}. Bộ ảo `#starred` "Từ khó của tôi" (thẻ mang `_d` = bộ gốc nên trạng thái thuộc/sao vẫn gắn với bộ gốc); kiểm tra bộ ít thẻ lấy nghĩa nhiễu từ mọi bộ.

### Lịch sử & xem lại bài
- Lượt làm bài lưu theo khóa `skill:testId` (tối đa 10, mới nhất đứng đầu), mỗi lượt có `at` (tăng nghiêm ngặt, dùng làm khóa) và `ans` (bài làm). Nút "Xem lại" ở bảng lịch sử gọi `RUNNERS[skill](test, attempt)`: runner nạp lại `ans`, **không lưu lượt mới**, không thêm vào sổ câu sai.
- Đáp án trắc nghiệm bị **xáo thứ tự mỗi lần tải trang** → `ans` phải lưu **văn bản** lựa chọn, không lưu chỉ số (xem `optText` / `optIdx`).
- Speaking không lưu bản ghi âm (lưu điểm 4 part × 0–5, và nếu có AI thì kèm `ans.trans` + `ans.ai`, xem mục "AI chấm Speaking").

### Chấm Writing (phần phức tạp nhất)
Điểm Writing = chất lượng văn bản × hệ số chính tả (Harper) × hệ số ngữ pháp (Harper) × hệ số nội dung, tính trong `finish()` của `runWriting`:
1. **Chính tả/ngữ pháp**: `FA.spell` ([public/assets/js/grading/spellcheck.js](public/assets/js/grading/spellcheck.js)) bọc Harper. Không tải được Harper → không trừ điểm, có ghi chú.
2. **Nội dung bám câu hỏi**: `FA.rel` ([public/assets/js/grading/relevance.js](public/assets/js/grading/relevance.js)) chấm từ khóa offline (`p1`, `factor`, `ideas`, chống chép lại câu hỏi); nếu bật AI thì `FA.ai` ([public/assets/js/grading/ai-grader.js](public/assets/js/grading/ai-grader.js)) chấm thay — một request cho cả bài, mục nào AI không trả về thì rơi về từ khóa, lỗi mạng/quá giờ thì cả bài dùng từ khóa. Phần AI chạy song song với Harper.
3. **Kết quả AI được lưu vào `ans.ai`** của lượt làm bài; xem lại **không gọi AI lại**, dùng đúng kết quả đã lưu (lượt cũ không có `ans.ai` thì dùng từ khóa). Đừng đưa lời gọi AI vào đường replay.
4. Bấm "✕ bỏ qua" ở màn xem lại gọi `update(calc())` → `FA.updateAttempt` ghi đè điểm của lượt đó.

### AI chấm (tùy chọn)
`public/assets/js/grading/ai-config.js` (đặt `window.FA_AI = {endpoint, apiKey, model, timeoutMs, writing?, speaking?}`, API kiểu OpenAI, `stream:false`; khối `writing: {…}` / `speaking: {…}` ghi đè phần chung cho từng kỹ năng qua `roleCfg()` trong `ai-grader.js` (`wcfg()` / `scfg()`): `model`, `fallbackModels` (thử lần lượt khi model trước lỗi), `timeoutMs`, và cả `endpoint`/`apiKey` nếu dùng nhà cung cấp khác — khi đó key dự phòng chung không được thừa hưởng; hiển thị tên model dùng `FA.ai.model("writing"|"speaking")`, trả về model **thực sự đã chấm** lần gần nhất) **nằm trong `.gitignore` vì chứa API key** — không commit, không đưa lên GitHub Pages. Mẫu: `ai-config.example.js`. Không có file này thì `FA.ai.enabled()` là false và mọi thứ chạy offline. Prompt của AI chỉ chấm nội dung (không chấm chính tả/ngữ pháp để khỏi trừ hai lần) và có chống prompt-injection từ bài viết. Prompt có quy tắc "phải thực sự cung cấp nội dung được hỏi" (từ chối/né tránh như "I don't have a trip" → tối đa 0.25) vì trước đây AI từng cho điểm nội dung tối đa cho câu trả lời kiểu đó.
- **Cấu hình hiện tại: hai nhà cung cấp riêng** (hạn mức tách nhau):
  - **Writing → OpenRouter** (endpoint + key phần chung): `writing.model: openrouter/free` (router tự chọn model miễn phí còn rảnh, điểm có thể lệch giữa các lần).
  - **Speaking → Google AI Studio**: khối `speaking` có `endpoint: https://generativelanguage.googleapis.com/v1beta/openai`, `apiKey` riêng (key Google, để trống → `FA.ai.ready("speaking")` false → Speaking tự chấm, không báo lỗi), `model: gemini-3.5-flash-lite`, `fallbackModels: [gemini-3.1-flash-lite]` (free ~15 RPM / ~500 RPD theo key, mọi người dùng chung key).
  - Đã thử: `google/gemma-3-27b-it:free` trên OpenRouter **hết miễn phí** (404); `google/gemma-4-31b-it:free` / `gemma-4-26b-a4b-it:free` hay 429 "rate-limited upstream". Model tên chứa `gemma` được gộp chỉ dẫn vào tin nhắn **user** (`callModels`).
  - Mọi lỗi (429, 503, timeout, JSON hỏng) → rơi về chấm từ khóa (Writing) / điểm tự chấm (Speaking). `postLocal` thử lại 1 lần sau 2,5s với 500/502/503; `postLocal` và `chatJSON` trong `ai-grader.js` dùng chung cho cả hai.
  - Từng thử `gemma-4-31b-it`: xuất phần suy luận trong `<thought>…</thought>` trước JSON (không chỉnh được mức suy nghĩ, `reasoning_effort` bị 400), chậm 30–60 giây/request, TPM chỉ 16K → `parseJSON` vẫn bỏ thẻ `<thought>` phòng khi dùng lại model kiểu này.
- **AI chấm Speaking** ([speaking-grader.js](public/assets/js/grading/speaking-grader.js), `FA.speakAI`): `runSpeaking` chạy Web Speech API (`webkitSpeechRecognition`, `en-US`, Chrome/Edge) song song với ghi âm → `st.trans[bước]`; cuối bài gửi **chữ** (không phải âm thanh) cho AI, **4 request song song (mỗi part một)** — chia như vậy vì Gemma từng rất chậm, nhưng nó tốn 4 RPM/bài (Gemini Flash Lite nhanh nên có thể gộp 1 request nếu cần tiết kiệm RPM); AI chấm 0–5 từng câu, điểm part = trung bình làm tròn, **điền sẵn vào thanh tự chấm** (người dùng vẫn chỉnh được). Part nào request lỗi thì giữ điểm mặc định. AI **không chấm phát âm**, bản nhận dạng có thể sai chữ (prompt đã dặn). Chỉ chạy khi có `ai-config.js` (chưa có Cloud Function cho Speaking) và trình duyệt hỗ trợ nhận dạng; trừ 1 lượt AI/ngày như Writing (`FA.plan.useAI`, lỗi thì `refundAI`). Kết quả lưu trong `ans.trans` + `ans.ai` (nút "Lưu điểm" phải giữ cả hai qua `mkAns()`); xem lại **không gọi AI lại**. Không hỗ trợ nhận dạng/không có AI thì Speaking tự chấm như cũ. Chưa thử được trên trình duyệt thật (chỉ jsdom với `SpeechRecognition` giả). Speaking luôn dùng cấu hình chung của `FA_AI` (không đọc khối `writing`).
- **Chấm theo độ sâu, không chỉ đúng chủ đề**: mỗi mục Part 2–4 gửi kèm `words` (số từ đã viết) và `required_words` (khoảng đề yêu cầu, vd `20-30`), lấy từ `buildItems` (`len()`); Cloud Function phải chuyển tiếp hai trường này (đã có trong `clean`). Prompt giới hạn điểm: dưới 50% số từ tối thiểu → tối đa 0.4, dưới 75% → tối đa 0.7; chỉ nhắc lại câu hỏi/không nêu lý do ("I love travel" cho câu "Why…?") → tối đa 0.3; một lý do chung chung không giải thích → tối đa 0.6. Trước đây prompt ghi "Short but complete answers are fine" nên bài 3 từ vẫn được điểm tối đa. Đây là trần về *nội dung còn thiếu*, không phải chấm lại độ dài (độ dài/từ nối vẫn do `textQuality` chấm riêng). Các lượt đã lưu không đổi (xem lại không gọi AI).
- **Key dự phòng**: `ai-config.js` có thêm `fallbackApiKey` (hoặc mảng `fallbackApiKeys`); `ai-grader.js` gọi bằng `apiKey` trước, chỉ khi nhận HTTP 401/402/403/429 (hết hạn mức/bị từ chối) mới thử key dự phòng. Chỉ áp dụng cho đường gọi thẳng (dev), không áp dụng Cloud Function.
- Cấu hình cũ (vẫn dùng được, xem `ai-config.example.js`): Gemini qua `https://generativelanguage.googleapis.com/v1beta/openai`, `model: gemini-3.1-flash-lite`. Tên model Gemini thay đổi nhanh: kiểm tra danh sách bằng `GET {endpoint}/models` với header `Authorization: Bearer <key>`. Đã gặp: `gemini-2.5-flash` → 404 (không còn cho key mới), `gemini-3.8-flash` → treo không trả lời, `gemini-flash-latest` → 503 quá tải; `gemini-3.5-flash` và `gemini-3.1-flash-lite` chạy được. Lỗi 503 thì web tự rơi về chấm từ khóa offline.
- Key nằm ở client nên ai mở DevTools cũng thấy → chỉ dùng khi chạy local; deploy thật thì đặt key trong Cloud Function (secret `AI_API_KEY`). Không dán key vào CLAUDE.md, README hay file được commit.

### Firebase (project `flashaptis`)
- [public/assets/js/firebase/firebase-config.js](public/assets/js/firebase/firebase-config.js) (`window.FA_FIREBASE`, **được commit**: config web không phải bí mật, bảo mật nằm ở `firestore.rules`) → [public/assets/js/firebase/cloud.js](public/assets/js/firebase/cloud.js) (`FA.cloud`), nạp ngay sau `common.js` ở mọi trang HTML (kể cả `pricing.html`, `admin.html`). SDK là bản **compat** 10.14.1 nạp từ gstatic (không build).
- Đăng nhập: nút ở `.auth-slot` mở hộp thoại `signIn(tab)` trong cloud.js — Google (popup) **hoặc email/mật khẩu** (tạo tài khoản kèm họ tên → `updateProfile`, gửi email xác minh không bắt buộc; quên mật khẩu → `sendPasswordResetEmail`). Cần bật provider Email/Password trong Console. Lỗi Firebase được dịch sang tiếng Việt ở bảng `ERR`. **OTP khi tạo tài khoản**: nếu `FA_FIREBASE.otp` (EmailJS: serviceId, templateId, publicKey) được điền thì bấm "Tạo tài khoản" → gửi mã 6 số qua EmailJS REST (`sendOtp`) → chế độ `otp` → đúng mã mới `createAccount`. Mã chỉ giữ dạng SHA-256+muối trong bộ nhớ, 15 phút (khớp mẫu "One-Time Password" của EmailJS; gửi cả biến `passcode`, `time` lẫn `otp_code`, `expire_minutes`), 5 lần sai, gửi lại sau 60s; là kiểm tra phía trình duyệt (lách được), muốn chặn thật phải chuyển sang Cloud Function. Để trống `otp` → tạo tài khoản ngay, không OTP. `FA.store` vẫn là nguồn chính; cloud.js bọc `FA.store.set` để đẩy lên Firestore (`users/{uid}/attempts|kv/{khóa}`, giá trị là chuỗi JSON vì Firestore cấm mảng lồng mảng). Đăng nhập → gộp (không mất bên nào); đăng xuất → xóa bản sao cục bộ. Khóa được đồng bộ: `attempts`, `wrongbook`, `fc-known`, `fc-starred`, `tips-done`, `calc`, `roadmap`, `activity` (gộp theo ngày lấy số lớn hơn), `daily`, `speakRate:*` — thêm khóa mới cần sửa `KV_KEYS` ở cloud.js.
- Hosting: `firebase.json` (`"public": "public"` — chỉ thư mục `public/` được deploy; ⚠️ TẠM THỜI `ai-config.js` (chứa API key) ĐƯỢC deploy để test nội bộ — trước khi công khai phải thêm lại vào `ignore` và chuyển AI sang Cloud Function), deploy `firebase deploy --only hosting,firestore`.
- AI qua Cloud Function `gradeWriting` ([functions/index.js](functions/index.js), cần gói Blaze, secret `AI_API_KEY`, endpoint AI phải public): bật bằng `useCloudAI: true`. Có `ai-config.js` thì vẫn ưu tiên gọi thẳng (dev). Prompt nằm ở cả `ai-grader.js` và `functions/index.js` — sửa phải sửa cả hai.

### Gói Free / Pro
- [public/assets/js/firebase/plan.js](public/assets/js/firebase/plan.js) (`FA.plan`, cấu hình ở `FA.PLAN`: `freeTests`, `aiPerDay`, `price`, `days`, `bank`), nạp sau `cloud.js` ở mọi trang. Free: `freeTests` (=2) đề **đầu** mỗi kỹ năng (theo thứ tự trong `data/*.js` → thêm đề mới vào cuối mảng là thành đề Pro), AI 3 lượt/ngày. Pro: mọi đề, AI 6 lượt/ngày. Khách chưa đăng nhập = Free nhưng không có AI.
- Firestore: `plans/{uid}.proUntil` (ms, **chỉ admin ghi**), `aiUsage/{uid}` {day (giờ VN), n}, `payments/{id}` (người dùng tạo `pending`), `admins/{uid}` (tạo tay trong Console). Rules ở `firestore.rules`.
- Chặn **phía trình duyệt** (người dùng đã chọn): `exam.js` khóa đề Pro (`isLocked` → `viewLocked`, gym bỏ câu của đề khóa), `finish()` của Writing gọi `FA.plan.useAI()` trước khi gọi AI, AI lỗi thì `refundAI()`. Đề Pro vẫn nằm trong `data/*.js` công khai. Lượt AI qua Cloud Function được đếm lại ở server (`checkQuota`, `AI_PER_DAY` phải khớp `FA.PLAN.aiPerDay`).
- `exam.js` vẽ lại khi gói thay đổi **chỉ** ở màn `list`/`locked` (biến `view`), không đụng bài đang làm hay màn kết quả.
- Thanh toán: [pricing.html](public/pricing.html) hiện VietQR (`img.vietqr.io`, nội dung `FLASHAPTIS FA<8 ký tự đầu uid>`) → "Tôi đã chuyển khoản" tạo `payments` pending → admin duyệt ở [admin.html](public/admin.html) (transaction: cộng `days` ngày nối tiếp vào `proUntil`). Chưa có duyệt tự động.

## Thang điểm

Overall = Listening + Reading + Speaking + Writing (mỗi kỹ năng 0–50, tối đa 200); Grammar & Vocabulary **không cộng vào Overall**. Listening/Reading xét bậc CEFR trên điểm **chưa làm tròn** `(đúng/tổng)*50`. Nguồn ngưỡng là prepedu.com (không phải bảng chính thức của British Council); các mốc trùng nhau (80/120/160) tính vào bậc cao hơn, C2 từ 181. Ngưỡng Writing/Speaking và A1/A2 từng kỹ năng là ước lượng.
