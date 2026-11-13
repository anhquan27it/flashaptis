/* Mẫu cấu hình AI chấm nội dung Writing.
   Sao chép file này thành `ai-config.js` (file đó đã được .gitignore) rồi điền endpoint, apiKey, model của bạn.
   Không có `ai-config.js` thì web dùng kiểm tra từ khóa offline (assets/js/relevance.js). */
window.FA_AI = {
  endpoint: "http://localhost:20128/v1", // API tương thích OpenAI (POST {endpoint}/chat/completions)
  apiKey: "YOUR_API_KEY",
  model: "your-model-id",
  timeoutMs: 120000,
};
