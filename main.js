/* StellarStark interactions: blueprint slider, live accent demo, scroll reveals. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero blueprint slider ---------- */

  var hero = document.querySelector(".hero");
  var handle = document.getElementById("heroHandle");
  var cut = 62; // percent of finished design revealed

  function setCut(value) {
    cut = Math.min(100, Math.max(0, value));
    hero.style.setProperty("--cut", cut + "%");
    handle.setAttribute("aria-valuenow", String(Math.round(cut)));
  }

  function posToPercent(clientX) {
    var rect = hero.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  var dragging = false;

  handle.addEventListener("pointerdown", function (e) {
    if (dragging) return; // ignore extra touch points
    dragging = true;
    handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    setCut(posToPercent(e.clientX));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    if (handle.hasPointerCapture(e.pointerId)) {
      handle.releasePointerCapture(e.pointerId);
    }
  }
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);

  handle.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setCut(cut - 5);
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setCut(cut + 5);
      e.preventDefault();
    } else if (e.key === "Home") {
      setCut(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setCut(100);
      e.preventDefault();
    }
  });

  /* Intro sweep: the page "builds itself" once on load. */
  if (!reduceMotion) {
    setCut(6);
    var start = null;
    var from = 6;
    var to = 62;
    var duration = 1500;
    var delay = 350;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function sweep(ts) {
      if (dragging) return; // user took over, stop the intro
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      setCut(from + (to - from) * easeOutCubic(t));
      if (t < 1) requestAnimationFrame(sweep);
    }

    window.setTimeout(function () {
      requestAnimationFrame(sweep);
    }, delay);

    /* If rAF is throttled (hidden tab), land on the resting position anyway. */
    window.setTimeout(function () {
      if (!dragging && cut < to) setCut(to);
    }, delay + duration + 600);
  } else {
    setCut(62);
  }

  /* ---------- Live accent demo ---------- */

  var swatches = Array.prototype.slice.call(document.querySelectorAll(".swatch"));
  var status = document.getElementById("demoStatus");
  var deployBar = document.getElementById("deployBar");

  function deploySweep() {
    if (reduceMotion || !deployBar.animate) return;
    deployBar.animate(
      [
        { transform: "scaleX(0)", opacity: 1 },
        { transform: "scaleX(1)", opacity: 1, offset: 0.7 },
        { transform: "scaleX(1)", opacity: 0 }
      ],
      { duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    );
  }

  swatches.forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.documentElement.style.setProperty("--accent", btn.dataset.accent);
      swatches.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      status.textContent = btn.textContent.trim() + " is live, on every section of this page.";
      status.classList.add("confirmed");
      deploySweep();
    });
  });

  /* ---------- Scroll reveals ---------- */

  var revealItems = document.querySelectorAll(".reveal");
  var care = document.querySelector(".care");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );
    revealItems.forEach(function (el) { io.observe(el); });

    var ioCare = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            care.classList.add("in-view");
            ioCare.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    ioCare.observe(care);
  } else {
    revealItems.forEach(function (el) { el.classList.add("in"); });
    care.classList.add("in-view");
  }
})();
