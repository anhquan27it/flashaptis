/* FlashAptis — Full Test (thi thử trọn bộ, có giờ, chế độ phòng thi khóa).
   Mỗi bộ chỉ THAM CHIẾU tới đề lẻ đã có trong data/*.js theo id (không chép nội dung):
   Grammar → Listening → Reading → Writing → Speaking, mỗi phần giữ đúng giờ của đề lẻ.
   Bộ bị khóa với tài khoản Free nếu có bất kỳ đề thành phần nào là đề Pro (exam.js: mockLocked). */
window.FA_MOCK = [
  {
    id: "m1",
    title: "Full Test 1",
    desc: "Ghép từ bộ đề số 2 của từng kỹ năng (Reading đủ 2 bài sắp xếp) — làm được với gói Free.",
    parts: { grammar: "g2", listening: "l2", reading: "r2", writing: "w2", speaking: "s2" },
  },
  {
    id: "m2",
    title: "Full Test 2",
    desc: "Ghép từ bộ đề số 3 của từng kỹ năng (Reading đủ 2 bài sắp xếp).",
    parts: { grammar: "g3", listening: "l3", reading: "r3", writing: "w3", speaking: "s3" },
  },
  {
    id: "m3",
    title: "Full Test 3",
    desc: "Bộ đề tổng hợp số 4: Daily life, environment & learning from mistakes.",
    parts: { grammar: "g4", listening: "l4", reading: "r4", writing: "w4", speaking: "s4" },
  },
  {
    id: "m4",
    title: "Full Test 4",
    desc: "Bộ đề tổng hợp số 5: Environment, beauty & saving money.",
    parts: { grammar: "g5", listening: "l5", reading: "r5", writing: "w5", speaking: "s5" },
  },
  {
    id: "m5",
    title: "Full Test 5",
    desc: "Bộ đề tổng hợp số 6: Music habits, technology & asking good questions.",
    parts: { grammar: "g6", listening: "l6", reading: "r6", writing: "w6", speaking: "s6" },
  },
  {
    id: "m6",
    title: "Full Test 6",
    desc: "Bộ đề tổng hợp số 7: Online shopping, everyday life & reading books.",
    parts: { grammar: "g7", listening: "l7", reading: "r7", writing: "w7", speaking: "s7" },
  },
  {
    id: "m7",
    title: "Full Test 7",
    desc: "Bộ đề tổng hợp số 8: Hobbies, technology & art.",
    parts: { grammar: "g8", listening: "l8", reading: "r8", writing: "w8", speaking: "s8" },
  },
  {
    id: "m8",
    title: "Full Test 8",
    desc: "Bộ đề tổng hợp số 9: Travel, free time & making choices.",
    parts: { grammar: "g9", listening: "l9", reading: "r9", writing: "w9", speaking: "s9" },
  },
  {
    id: "m9",
    title: "Full Test 9",
    desc: "Bộ đề tổng hợp số 10: Jobs, art & working together.",
    parts: { grammar: "g10", listening: "l11", reading: "r10", writing: "w10", speaking: "s10" },
  },
  {
    id: "m10",
    title: "Full Test 10",
    desc: "Bộ đề tổng hợp số 11: Study spaces, communities & extreme sports.",
    parts: { grammar: "g11", listening: "l12", reading: "r11", writing: "w11", speaking: "s11" },
  },
];
