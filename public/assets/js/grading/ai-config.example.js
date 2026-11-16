/* Mẫu cấu hình AI chấm nội dung Writing.
   Sao chép file này thành `ai-config.js` (file đó đã được .gitignore) rồi điền endpoint, apiKey, model của bạn.
   Không có `ai-config.js` thì web dùng kiểm tra từ khóa offline (assets/js/relevance.js). */
window.FA_AI = {
  endpoint: "https://generativelanguage.googleapis.com/v1beta/openai", // API tương thích OpenAI (POST {endpoint}/chat/completions); ví dụ này là Gemini
  apiKey: "YOUR_API_KEY", // lấy ở https://aistudio.google.com/apikey
  model: "gemini-3.5-flash",
  // fallbackApiKey: "KEY_DU_PHONG", // (tùy chọn) chỉ dùng khi apiKey hết hạn mức (HTTP 401/402/403/429); có thể dùng mảng fallbackApiKeys: [...]
  timeoutMs: 120000,
};
