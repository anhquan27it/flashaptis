/* Mẫu cấu hình AI chấm nội dung Writing — file này ĐƯỢC commit, nên KHÔNG dán key thật vào đây.
   Sao chép thành `ai-config.js` cùng thư mục (file đó đã được .gitignore) rồi điền key của bạn.
   Không có `ai-config.js` thì web dùng kiểm tra từ khóa offline (relevance.js). */
window.FA_AI = {
  endpoint: "https://openrouter.ai/api/v1", // API tương thích OpenAI (POST {endpoint}/chat/completions)
  apiKey: "YOUR_OPENROUTER_KEY",            // dạng sk-or-v1-…, tạo ở https://openrouter.ai → Keys (nên đặt credit limit)
  model: "openrouter/free",                 // router tự chọn model miễn phí; hoặc tên model cụ thể có đuôi ":free"
  // fallbackApiKey: "KEY_DU_PHONG",        // (tùy chọn) chỉ dùng khi apiKey hết hạn mức (HTTP 401/402/403/429); có thể dùng mảng fallbackApiKeys: [...]
  timeoutMs: 120000,
};
