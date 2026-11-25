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

  // Trình duyệt không có hiệu ứng gốc: mờ ra rồi mới chuyển
  if (!nativeVT && !lite) {
    window.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!internal(a)) return;
      e.preventDefault();
      d.classList.add("fx-leaving");
      setTimeout(function () { location.href = a.href; }, 120);
      // bị hủy (vd. hộp "Bạn đang làm bài, vẫn thoát?") → hiện lại trang
      setTimeout(function () { d.classList.remove("fx-leaving"); }, 900);
    });
  }
  // quay lại bằng nút Back (trang lấy từ bộ nhớ đệm) → không để trang bị mờ
  window.addEventListener("pageshow", function () { d.classList.remove("fx-leaving"); });

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
