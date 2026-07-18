/* ══════════════════════════════════════════
   DEENADHAYALAN M — Portfolio Script
   ══════════════════════════════════════════ */

// ── Year ──
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Nav Toggle ──
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Nav scroll shadow ──
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav?.classList.add("nav-scrolled");
  } else {
    nav?.classList.remove("nav-scrolled");
  }
}, { passive: true });

// ── Custom Cursor ──
const cursorDot  = document.createElement("div");
const cursorRing = document.createElement("div");
cursorDot.className  = "cursor-dot";
cursorRing.className = "cursor-ring";
document.body.append(cursorDot, cursorRing);

let mouseX = window.innerWidth  / 2;
let mouseY = window.innerHeight / 2;
let ringX  = mouseX;
let ringY  = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

const tickCursor = () => {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(tickCursor);
};
tickCursor();

// Hover state for cursor
const hoverTargets = "a, button, .proj-card, .about-card, .svc-card, .skill-card, .cert-card, .t-card, .ach-item, .a-stat, .hero-chips span, .caps-grid span, .skill-pills span, .proj-tags span, .t-tags span";
document.querySelectorAll(hoverTargets).forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ── Back to Top ──
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Work "View Screens" Toggles ──
const screenBtns  = document.querySelectorAll(".proj-screens-btn");
const shotPanels  = document.querySelectorAll(".work-shots");

screenBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.project;
    const panel = document.querySelector(`.work-shots[data-project="${id}"]`);
    if (!panel) return;

    const isActive = panel.classList.contains("active");

    // Close all
    shotPanels.forEach((p) => p.classList.remove("active"));
    screenBtns.forEach((b) => b.classList.remove("active"));

    // Toggle
    if (!isActive) {
      panel.classList.add("active");
      btn.classList.add("active");
      btn.textContent = "Hide Screens ↑";
      setTimeout(() => {
        panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    } else {
      btn.textContent = "View Screens ↓";
    }
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll("section[id], .section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// Add active nav link styles via JS-added class
const styleTag = document.createElement("style");
styleTag.textContent = `
  .nav-links a.active {
    background: var(--blue-dim);
    color: var(--blue);
  }
  .nav.nav-scrolled {
    box-shadow: 0 4px 30px rgba(0,0,0,0.5);
  }
`;
document.head.appendChild(styleTag);

// ── Hero load animation trigger ──
window.addEventListener("load", () => {
  document.documentElement.classList.add("hero-loaded");
});
// ══ HELLO LOADER ══
(function () {
  const loader = document.getElementById('hello-loader');
  if (!loader) return; // no loader in DOM, don't touch scroll at all
  document.body.classList.add('hello-loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hello-loader-hidden');
      document.body.classList.remove('hello-loading');
      setTimeout(() => loader.remove(), 700);
    }, 1900);
  });
})();
