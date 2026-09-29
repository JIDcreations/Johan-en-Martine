// Johan & Martine — site

// Openingsuren in minuten. 0 = zondag. null = gesloten.
const UREN = {
  0: [450, 750],   // 7:30 - 12:30
  1: [450, 1110],  // 7:30 - 18:30
  2: [450, 1110],
  3: [450, 1110],
  4: null,
  5: [450, 1110],
  6: [450, 1110],
};
const DAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

const uur = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

// Tijd in België, ook als de bezoeker elders zit
function nu() {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const v = (t) => p.find((x) => x.type === t).value;
  return {
    dag: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v("weekday")),
    min: (Number(v("hour")) % 24) * 60 + Number(v("minute")),
  };
}

function status() {
  const { dag, min } = nu();
  const vandaag = UREN[dag];
  const open = Boolean(vandaag && min >= vandaag[0] && min < vandaag[1]);
  let tekst;

  if (open) {
    tekst = `Nu open tot ${uur(vandaag[1])}`;
  } else {
    for (let i = 0; i < 8; i++) {
      const d = (dag + i) % 7;
      const u = UREN[d];
      if (!u || (i === 0 && min >= u[0])) continue;
      const wanneer = i === 0 ? "vandaag" : i === 1 ? "morgen" : DAGEN[d];
      tekst = `Gesloten. ${wanneer[0].toUpperCase() + wanneer.slice(1)} open om ${uur(u[0])}`;
      break;
    }
  }

  document.querySelectorAll("[data-status]").forEach((el) => (el.textContent = tekst));
  document.querySelectorAll("[data-status-groot]").forEach((el) => (el.textContent = tekst));
  document.querySelectorAll(`.uren [data-dag="${dag}"]`).forEach((el) => {
    el.classList.add("is-vandaag");
    el.querySelector("dt").insertAdjacentText("beforeend", " (vandaag)");
  });
}

function kop() {
  const kop = document.querySelector("[data-kop]");
  const hero = document.querySelector(".hero");
  const knop = document.querySelector(".kop__menu");
  const nav = document.getElementById("menu");

  // Kop krijgt een achtergrond zodra de hero bijna uit beeld is
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => kop.classList.toggle("is-los", !e.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
      threshold: 0,
    }).observe(document.querySelector(".hero__titel"));
  } else {
    kop.classList.add("is-los");
  }

  const zet = (open) => {
    nav.classList.toggle("is-open", open);
    knop.setAttribute("aria-expanded", String(open));
    knop.firstElementChild.textContent = open ? "Sluit" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  };
  knop.addEventListener("click", () => zet(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => e.target.closest("a") && zet(false));
  addEventListener("keydown", (e) => e.key === "Escape" && nav.classList.contains("is-open") && (zet(false), knop.focus()));
}

// Webshop draait extern; zolang er geen link is, doet de knop niets
document.querySelectorAll('[data-webshop][href="#"]').forEach((a) =>
  a.addEventListener("click", (e) => e.preventDefault()));

document.querySelectorAll("[data-jaar]").forEach((el) => (el.textContent = new Date().getFullYear()));
status();
kop();
