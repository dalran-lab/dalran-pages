/* Denmark Daily — favourites, stored per-device in localStorage. */
(function () {
  var KEY = "dd_favorites";
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save(a) { localStorage.setItem(KEY, JSON.stringify(a)); }
  function isFav(s) { return get().indexOf(s) >= 0; }
  function toggle(s) {
    var a = get(), i = a.indexOf(s);
    if (i >= 0) a.splice(i, 1); else a.push(s);
    save(a); return i < 0;
  }
  window.ddFav = { get: get, isFav: isFav, toggle: toggle };

  function paint(btn) {
    var on = isFav(btn.getAttribute("data-slug"));
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = on ? "★" : "☆"; // ★ / ☆
  }
  function paintAll() { document.querySelectorAll(".star").forEach(paint); }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".star");
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    toggle(btn.getAttribute("data-slug"));
    paint(btn);
    document.dispatchEvent(new CustomEvent("dd-fav-changed"));
  });
  document.addEventListener("DOMContentLoaded", paintAll);
  // expose for dynamically-rendered lists (archive)
  window.ddFavPaintAll = paintAll;
})();
