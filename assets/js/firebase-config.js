/* Cấu hình Firebase (web). Các giá trị này KHÔNG phải bí mật — chỉ định danh project;
   bảo mật nằm ở Firestore Rules (firestore.rules) và Authentication, nên file này được commit. */
window.FA_FIREBASE = {
  apiKey: "AIzaSyAtU2rUtHGn2AY7G7KWnNcTkAIdDW3btS8",
  authDomain: "flashaptis.firebaseapp.com",
  projectId: "flashaptis",
  storageBucket: "flashaptis.firebasestorage.app",
  messagingSenderId: "719380882486",
  appId: "1:719380882486:web:39509c23e8e6a6e3996497",
  // --- tùy chọn của FlashAptis ---
  functionsRegion: "asia-southeast1", // vùng đặt Cloud Function gradeWriting
  useCloudAI: false,                  // true: khi đã đăng nhập, AI chấm Writing qua Cloud Function (không lộ API key). Chỉ bật sau khi đã deploy functions/.
  aiLabel: "AI",                      // tên hiển thị khi AI chấm qua Cloud Function
};
