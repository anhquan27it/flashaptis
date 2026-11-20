/* FlashAptis — Full Test (thi thử trọn bộ, có giờ, chế độ phòng thi khóa).
   Mỗi bộ chỉ THAM CHIẾU tới đề lẻ đã có trong data/*.js theo id (không chép nội dung):
   Grammar → Listening → Reading → Writing → Speaking, mỗi phần giữ đúng giờ của đề lẻ.
   Bộ bị khóa với tài khoản Free nếu có bất kỳ đề thành phần nào là đề Pro (exam.js: mockLocked). */
window.FA_MOCK = [
  {
    id: "m1",
    title: "Full Test 1",
    desc: "Ghép từ bộ đề số 2 của từng kỹ năng — làm được với gói Free.",
    parts: { grammar: "g2", listening: "l2", reading: "r2", writing: "w2", speaking: "s2" },
  },
  {
    id: "m2",
    title: "Full Test 2",
    desc: "Ghép từ bộ đề số 3 của từng kỹ năng (Reading 5 part).",
    parts: { grammar: "g3", listening: "l3", reading: "r3", writing: "w3", speaking: "s3" },
  },
];
