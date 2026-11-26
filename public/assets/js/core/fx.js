/* FlashAptis — hiệu ứng chuyển trang cho mọi trình duyệt (nạp trong <head>, trước khi vẽ trang).
   - Trình duyệt có View Transitions giữa các trang (Chrome/Edge/Brave/Opera 126+, Safari 18.2+):
     dùng hiệu ứng gốc khai báo bằng @view-transition trong style.css (chạy trên GPU, không tốn JS).
   - Trình duyệt khác (Firefox, bản cũ): class .fx-fade → <main> mờ dần vào khi mở trang,
     bấm link nội bộ thì mờ ra 120ms rồi mới chuyển.
   - Máy yếu (RAM ≤ 2GB, ≤ 2 nhân CPU, bật tiết kiệm dữ liệu) hoặc người dùng giảm chuyển động: .fx-lite
     → bỏ hiệu ứng gốc, chỉ mờ nhẹ bằng opacity, không trì hoãn khi bấm link.
   - Rê chuột / chạm vào link nội bộ → tải trước trang đó (prefetch) để chuyển trang nhanh hơn. */
(function () {
  var d = document.documentElement, n = navigator, c = n.connection || {};
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lite = reduce || c.saveData || (n.deviceMemory && n.deviceMemory <= 2) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2);
  var nativeVT = "onpagereveal" in window;
  if (lite) d.classList.add("fx-lite");
  if (!nativeVT || lite) d.classList.add("fx-fade");
  if (nativeVT && lite) {
    // máy yếu: bỏ qua hiệu ứng gốc (chụp ảnh cả trang tốn bộ nhớ)
    window.addEventListener("pagereveal", function (e) { if (e.viewTransition) e.viewTransition.skipTransition(); });
    window.addEventListener("pageswap", function (e) { if (e.viewTransition) e.viewTransition.skipTransition(); });
  }

  // link nội bộ dẫn sang trang khác (không phải #hash cùng trang, không mở tab mới, không tải file)
  function internal(a) {
    if (!a || !a.href || a.target && a.target !== "_self" || a.hasAttribute("download")) return false;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return false; }
    if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return false;
    return u.pathname !== location.pathname || u.search !== location.search;
  }

  // Overlay loading con ếch FlashAptis khi chuyển trang (tránh cảm giác đứng hình / thời gian chết)
  var loaderEl = null, loaderTimer = null;
  function ensureLoader() {
    if (loaderEl || !document.body) return loaderEl;
    var el = document.createElement("div");
    el.id = "faLoader";
    el.className = "fa-loader";
    el.setAttribute("aria-live", "polite");
    el.innerHTML = '<div class="fa-loader-box"><div class="fa-loader-ring"><img src="assets/img/brand/mascot-192.webp" width="64" height="64" alt=""></div><div class="fa-loader-txt">Đang tải…</div></div>';
    document.body.appendChild(el);
    loaderEl = el;
    return el;
  }
  function showLoader(msg) {
    var el = ensureLoader();
    if (!el) return;
    var t = el.querySelector(".fa-loader-txt");
    if (t) t.textContent = msg || "Đang tải…";
    el.classList.add("show");
    clearTimeout(loaderTimer);
    loaderTimer = setTimeout(hideLoader, 6000); // tự ẩn nếu người dùng hủy điều hướng
  }
  function hideLoader() {
    clearTimeout(loaderTimer);
    if (loaderEl) loaderEl.classList.remove("show");
  }
  window.FA_LOADER = { show: showLoader, hide: hideLoader };

  // Bấm link nội bộ sang trang khác → hiện ngay loading con ếch (kể cả khi trình duyệt có View Transitions)
  window.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    if (!internal(a)) return;
    showLoader("Đang mở trang…");
    if (!nativeVT && !lite) {
      e.preventDefault();
      d.classList.add("fx-leaving");
      setTimeout(function () { location.href = a.href; }, 90);
      setTimeout(function () { d.classList.remove("fx-leaving"); hideLoader(); }, 900);
    }
  });
  // quay lại bằng nút Back (trang lấy từ bộ nhớ đệm) hoặc tải xong → ẩn loading ngay
  window.addEventListener("pageshow", function () { d.classList.remove("fx-leaving"); hideLoader(); });
  window.addEventListener("DOMContentLoaded", hideLoader);

  // Tải trước trang khi rê chuột / chạm vào link (bỏ qua khi tiết kiệm dữ liệu)
  if (!c.saveData) {
    var done = {};
    var pre = function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!internal(a)) return;
      var url = a.href.split("#")[0];
      if (done[url]) return;
      done[url] = 1;
      var l = document.createElement("link");
      l.rel = "prefetch";
      l.href = url;
      document.head.appendChild(l);
    };
    document.addEventListener("pointerover", pre, { passive: true });
    document.addEventListener("touchstart", pre, { passive: true });
  }
})();
