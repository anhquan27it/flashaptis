# Kịch bản clip giới thiệu FlashAptis (3:23, có giọng đọc và nhạc nền)

| File | Nội dung |
|---|---|
| `flashaptis-gioi-thieu.mp4` | Bản chính: 1920×1080, 30 fps, phụ đề in sẵn trên hình, giọng đọc AI tiếng Việt (nữ, `vi-VN-HoaiMyNeural` của Microsoft Edge TTS) và nhạc nền nhẹ |
| `flashaptis-gioi-thieu-khong-nhac.mp4` | Như bản chính nhưng không có nhạc nền |
| `flashaptis-gioi-thieu.srt` | Phụ đề rời theo đúng mốc của bản chính (để tải lên YouTube/Facebook nếu muốn) |
| `flashaptis-gioi-thieu-khong-tieng.mp4` | Bản cũ, không tiếng (2:57) |

Lời đọc ngắn hơn phụ đề trên hình: phụ đề đầy đủ để đọc, giọng chỉ nói ý chính để clip không quá 3 phút.

| Mốc | Cảnh | Lời đọc |
|---|---|---|
| 0:00 | Mở đầu | Flash Aptis: luyện thi Aptis online, chấm điểm liền tay. |
| 0:04 | Đăng nhập | Lần đầu làm đề, bạn đăng nhập bằng Google hoặc email. Tiến trình học được đồng bộ theo tài khoản. |
| 0:12 | Trang chủ | Đây là trang chủ Flash Aptis, luyện đủ 5 kỹ năng. Thử ngay một câu mẫu. Kho đề có 1.400 câu Grammar và gần 10 nghìn thẻ từ vựng. |
| 0:25 | Luyện đề | Vào Luyện đề trên menu. Web tự gợi ý đề nên làm và ước lượng điểm Overall. Buổi thi gồm 5 phần, từ Grammar đến Speaking. Mỗi kỹ năng có tiến độ, điểm cao nhất và bậc CEFR. |
| 0:42 | Làm đề Grammar | Chọn đề. Gói Free làm được 2 đề đầu mỗi kỹ năng. Bấm Bắt đầu, đồng hồ 25 phút như thi thật. Mỗi lần một câu, chọn đáp án rồi bấm Tiếp. Câu chưa chắc thì đánh dấu để xem lại. Tua nhanh. Nộp bài là có điểm ngay. Điểm cao còn có pháo giấy chúc mừng. Bên dưới là đáp án và giải thích từng câu. |
| 1:22 | Writing | Writing: viết thẳng trên web, có đếm số từ. Web tự chấm chính tả, ngữ pháp và mức bám sát câu hỏi, có AI hỗ trợ. |
| 1:36 | Ôn tập nhanh | Ôn tập nhanh: 10 câu mỗi ngày, chọn là biết đúng sai. Câu sai được lưu để ôn lại. |
| 1:53 | Flashcard | Flashcard: từ vựng theo bậc CEFR và 23 chủ đề Aptis. Bấm thẻ để lật xem nghĩa và ví dụ. Nhớ rồi bấm Đã thuộc, từ khó thì gắn sao. |
| 2:17 | Học ngữ pháp | Học ngữ pháp: 101 chủ điểm, giảng bằng tiếng Việt. Mỗi bài có cấu trúc, ví dụ và phần tự sửa lỗi. |
| 2:32 | Dashboard | Dashboard: đặt mục tiêu và ngày thi. Web tự tick việc đã làm và gợi ý học gì tiếp. Chuỗi ngày học giữ động lực mỗi ngày. |
| 2:48 | Tính điểm | Tính điểm: quy đổi sang Overall và bậc CEFR. |
| 2:37 | Full Test | Full Test: thi thử trọn bộ 5 phần, giống hệt một buổi thi thật. Làm liền 5 phần, mỗi phần có đồng hồ riêng, nộp phần nào là khóa phần đó. Vào phòng thi, bạn kiểm tra micro và cam kết tự làm bài, không tra cứu hay dùng AI. Phòng thi chuyển toàn màn hình, khóa menu, chuột phải, sao chép và dán. Nếu cố tình chuyển tab hay thoát toàn màn hình, lần đầu sẽ bị cảnh báo. Vi phạm lần hai, bài thi tự nộp và dừng ngay lập tức. Phần chưa làm tính 0 điểm. |
| 3:20 | Gói Pro | Gói Free dùng ngay, Pro mở toàn bộ đề. |
| 3:24 | Kết | Luyện mỗi ngày một chút, đỗ Aptis nhẹ nhàng. Vào flashaptis chấm web chấm app nhé! |

Các mốc trên là trước khi tua nhanh. Trong bản cuối, những đoạn im lặng dài được tua nhanh tối đa 2 lần, nên mọi mốc sớm hơn vài giây (xem file `.srt` để biết mốc chính xác).

## Cách quay lại

Script nằm ở `script-quay/` (Playwright + Edge headless, quay qua CDP screencast, ghép bằng ffmpeg, đọc bằng edge-tts):

1. Tạo một thư mục **ngoài repo**, chép các file trong `script-quay/` vào thư mục con `rec/`, rồi chạy `npm i playwright ffmpeg-static` trong `rec/`.
2. Tạo môi trường Python cạnh `rec/`: `python -m venv tts`, sau đó `tts/Scripts/pip install edge-tts` (`build-voice.js` gọi `../tts/Scripts/python.exe`).
3. Chạy server từ thư mục gốc dự án: `npx http-server public -a localhost -p 5502 -c-1`.
4. `node record.js` quay mọi cảnh (khoảng 4 phút), hoặc `node record.js grammar,gym` để quay lại riêng vài cảnh.
5. Ghép bản có giọng đọc: `node build-voice.js out.mp4`. Lời đọc của từng phụ đề nằm trong bảng `SAY` của file này. Ghép bản không tiếng: `node build.js out.mp4`.
   - Dịch vụ đọc của Microsoft thỉnh thoảng trả lỗi `NoAudioReceived`. Script tự thử lại, và các câu đã tạo được lưu sẵn, nên chỉ cần chạy lại lệnh.

## Nhạc nền

Nhạc nền do `music.js` tự tổng hợp: vòng hợp âm Cmaj7 – Am7 – Fmaj7 – G6, 84 BPM, gồm pad, arpeggio và bass. Không dùng mẫu nhạc của ai nên không vướng bản quyền. Nhạc nhỏ hơn giọng đọc khoảng 13 dB, tự nhỏ thêm khi có giọng đọc (sidechain), mở dần 2 giây ở đầu và tắt dần 4 giây ở cuối:

```
node music.js music.wav 206
ffmpeg -i video-co-giong.mp4 -i music.wav -filter_complex "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[v][sc];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=-19dB,afade=t=in:d=2,afade=t=out:st=<độ dài video − 4>:d=4[m];[m][sc]sidechaincompress=threshold=0.02:ratio=4:attack=30:release=700[md];[v][md]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest out.mp4
```

Muốn nhạc to hoặc nhỏ hơn thì đổi `volume=-19dB` (ví dụ `-16dB` to hơn, `-22dB` nhỏ hơn).

Khi quay, script tắt Firebase (để không bị chặn đăng nhập) và AI (không gọi API), rồi nạp dữ liệu mẫu của một người học khoảng 2 tuần (5 đề đã làm, chuỗi 10 ngày, mục tiêu B2). Riêng cảnh "Đăng nhập" chạy với Firebase thật.
