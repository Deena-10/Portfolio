const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = navLinks.classList.contains("open");
    navToggle.setAttribute("aria-expanded", String(expanded));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".section, .hero-card, .project-card, .timeline-content, .resume-card")
  .forEach((el) => {
  el.classList.add("reveal-ready");
  observer.observe(el);
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const resumeGrid = document.querySelector(".resume-card-grid");
if (resumeGrid) {
  /**
   * Change DEFAULT_RESUME_ROLE or update the file map below when
   * the recommended resume or file paths change.
   */
  const DEFAULT_RESUME_ROLE = "software-developer";

  const RESUME_ROLES = [
    {
      id: "software-developer",
      title: "Software Developer",
      subtitle: "Full Stack Developer",
      highlights: [
        "Experienced in end-to-end web applications across UI, API, and data layers.",
        "Works closely with teams to deliver reliable, measurable improvements."
      ],
      file: "assets/Deena_Software_Developer.pdf"
    },
    {
      id: "full-stack-developer",
      title: "Full Stack Developer",
      subtitle: "Product & cloud focus",
      highlights: [
        "Builds responsive front ends backed by resilient cloud-native services.",
        "Comfortable owning CI/CD pipelines and post-production monitoring."
      ],
      file: "assets/Deena_FSD.pdf"
    },
    {
      id: "java-full-stack",
      title: "Java Full Stack Developer",
      subtitle: "Spring Boot + React",
      highlights: [
        "Delivers secure REST APIs with Spring ecosystems and Hibernate.",
        "Integrates JVM backends with modern UI frameworks and testing suites."
      ],
      file: "assets/Deena_JFSD.pdf"
    },
    {
      id: "qa-engineer",
      title: "QA / Testing Engineer",
      subtitle: "Automation & manual expertise",
      highlights: [
        "Designs robust Selenium/UI automation and API regression suites.",
        "Advocates for shift-left testing, release readiness, and observability."
      ],
      file: "assets/Deena_QA.pdf"
    }
  ];

  RESUME_ROLES.forEach((role) => {
    const card = document.createElement("article");
    card.className = "resume-card";
    card.setAttribute("role", "radio");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-checked", "false");
    card.dataset.id = role.id;
    card.dataset.file = role.file;

    const header = document.createElement("div");
    header.className = "resume-role-header";

    const title = document.createElement("h3");
    title.className = "resume-title";
    title.textContent = role.title;

    const subtitle = document.createElement("p");
    subtitle.className = "resume-subtitle";
    subtitle.textContent = role.subtitle;

    header.append(title, subtitle);

    const list = document.createElement("ul");
    list.className = "resume-highlights";
    role.highlights.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      list.append(li);
    });

    const actions = document.createElement("div");
    actions.className = "resume-actions";

    const view = document.createElement("a");
    view.className = "resume-btn view";
    view.href = role.file;
    view.target = "_blank";
    view.rel = "noopener";
    view.textContent = "View Resume";

    const download = document.createElement("a");
    download.className = "resume-btn download";
    download.href = role.file;
    download.download = "";
    download.textContent = "Download Resume";

    actions.append(view, download);
    card.append(header, list, actions);
    resumeGrid.append(card);
  });

  const resumeCards = Array.from(document.querySelectorAll(".resume-card"));

  function selectResume(card) {
    resumeCards.forEach((node) => {
      const selected = node === card;
      node.toggleAttribute("selected", selected);
      node.setAttribute("aria-checked", String(selected));
    });
  }

  resumeCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectResume(card);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectResume(card);
      }
    });
    card.classList.add("reveal-ready");
    observer.observe(card);
  });

  const defaultResume =
    resumeCards.find((card) => card.dataset.id === DEFAULT_RESUME_ROLE) || resumeCards[0];
  if (defaultResume) {
    selectResume(defaultResume);
  }
}
