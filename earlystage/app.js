window.__PQ_DATA__ = {"modal": "<div class=\"fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center\" role=\"dialog\" aria-modal=\"true\"[...]"}
/* Prequate engagement story — static export (vanilla JS) */
(function () {
  "use strict";
  var D = window.__PQ_DATA__;
  var overlays = document.getElementById("pq-overlays");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    "main article, main [data-callout], main section h2, main section > .grid > p"
  );
  if ("IntersectionObserver" in window && !reduce) {
    Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add("rv"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(revealTargets, function (el) { io.observe(el); });
  }

  /* ---------- scroll progress + month ticks ---------- */
  var yFills = document.querySelectorAll('[data-progress="y"]');
  var xFills = document.querySelectorAll('[data-progress="x"]');
  var railBtns = document.querySelectorAll("[data-goto]");
  function onScroll() {
    var total = document.body.scrollHeight - window.innerHeight;
    var p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    Array.prototype.forEach.call(yFills, function (e) { e.style.transform = "scaleY(" + p + ")"; });
    Array.prototype.forEach.call(xFills, function (e) { e.style.transform = "scaleX(" + p + ")"; });
    var active = Math.round(p * 8);
    Array.prototype.forEach.call(railBtns, function (b, i) {
      var idx = i % 9;
      var dot = b.querySelector("span");
      var label = b.querySelectorAll("span")[1];
      var on = idx <= active && !b.classList.contains("pq-muted");
      if (dot) {
        dot.className = on
          ? "relative z-10 block size-[11px] rounded-full border transition-all duration-300 scale-110 border-orange bg-orange shadow-[0_0_0_4px_rgba(255,150,51,0.18)]"
          : "relative z-10 block size-[11px] rounded-full border transition-all duration-300 border-hairline bg-paper";
      }
      if (label) {
        label.className = on
          ? "eyebrow text-[10px] transition-all duration-300 text-orange-deep"
          : "eyebrow text-[10px] transition-all duration-300 text-grey/50 group-hover:text-grey";
      }
    });
  }
  Array.prototype.forEach.call(railBtns, function (b) {
    b.addEventListener("click", function () {
      var t = document.getElementById(b.getAttribute("data-goto"));
      if (t) t.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    });
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ... rest of app.js ... */
})();
