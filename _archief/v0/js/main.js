// Johan & Martine — onepager

// Openingsuren per dag (0 = zondag). null = gesloten. Tijden in minuten.
const UREN = {
  0: [7 * 60 + 30, 12 * 60 + 30],
  1: [7 * 60 + 30, 18 * 60 + 30],
  2: [7 * 60 + 30, 18 * 60 + 30],
  3: [7 * 60 + 30, 18 * 60 + 30],
  4: null,
  5: [7 * 60 + 30, 18 * 60 + 30],
  6: [7 * 60 + 30, 18 * 60 + 30],
};

const DAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

const fmt = (min) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

// Uur in België, ook als de bezoeker in een andere tijdzone zit
function nuInBelgie() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const dag = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dag, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

function volgendeOpening(dag, min) {
  for (let i = 0; i < 8; i++) {
    const d = (dag + i) % 7;
    const u = UREN[d];
    if (!u) continue;
    if (i === 0 && min >= u[0]) continue;
    const wanneer = i === 0 ? "vandaag" : i === 1 ? "morgen" : DAGEN[d];
    return `${wanneer} om ${fmt(u[0])}`;
  }
  return "";
}

function toonStatus() {
  const { dag, min } = nuInBelgie();
  const u = UREN[dag];
  const open = u && min >= u[0] && min < u[1];

  const tekst = open
    ? `Nu open, tot ${fmt(u[1])}.`
    : `Nu gesloten. We zijn terug open ${volgendeOpening(dag, min)}.`;

  document.querySelectorAll("[data-open-status]").forEach((el) => (el.textContent = tekst));
  document.querySelector(`.hours tr[data-day="${dag}"]`)?.classList.add("is-today");
}

// Mobiel menu
function menu() {
  const knop = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!knop || !nav) return;

  const zet = (open) => {
    nav.classList.toggle("is-open", open);
    knop.setAttribute("aria-expanded", String(open));
    knop.querySelector(".nav-toggle__label").textContent = open ? "Sluit" : "Menu";
  };

  knop.addEventListener("click", () => zet(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => e.target.closest("a") && zet(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && zet(false));
}

// Header: lijntje bij scrollen, klein logo pas als het grote uit beeld is
function header() {
  const kop = document.querySelector(".site-header");
  const heroLogo = document.querySelector(".hero__logo");
  if (!kop) return;

  const opScroll = () => kop.classList.toggle("is-scrolled", window.scrollY > 8);
  opScroll();
  window.addEventListener("scroll", opScroll, { passive: true });

  if (heroLogo && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => kop.classList.toggle("hero-visible", e.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    }).observe(heroLogo);
  }
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
toonStatus();
menu();
header();
