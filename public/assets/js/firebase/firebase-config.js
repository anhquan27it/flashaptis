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
  // OTP xác nhận email khi tạo tài khoản, gửi qua EmailJS (https://www.emailjs.com — gói Free). Để trống → tạo tài khoản không cần OTP.
  // Public key của EmailJS được thiết kế để nằm ở trình duyệt (không phải bí mật). Template dùng các biến:
  // {{passcode}} (mã 6 số), {{time}} (giờ hết hạn), {{email}} hoặc {{to_email}} (đặt ở ô "To Email"), {{name}}/{{to_name}}, {{expire_minutes}}.
  otp: {
    serviceId: "service_of39spc",     // Email Services → Service ID
    templateId: "template_csegzyf",   // Email Templates → Template ID
    publicKey: "GVr5L24ae6COAtocE",   // Account → General → Public Key
  },
};
