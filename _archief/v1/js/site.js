// Johan & Martine — site

// Openingsuren in minuten. 0 = zondag. null = gesloten.
const UREN = {
  0: [450, 750],   // 07:30 – 12:30
  1: [450, 1110],  // 07:30 – 18:30
  2: [450, 1110],
  3: [450, 1110],
  4: null,
  5: [450, 1110],
  6: [450, 1110],
};
const DAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

const uur = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

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
  let tekst;

  if (vandaag && min >= vandaag[0] && min < vandaag[1]) {
    tekst = `Nu open tot ${uur(vandaag[1])}`;
  } else {
    for (let i = 0; i < 8; i++) {
      const d = (dag + i) % 7;
      const u = UREN[d];
      if (!u || (i === 0 && min >= u[0])) continue;
      const wanneer = i === 0 ? "vandaag" : i === 1 ? "morgen" : DAGEN[d];
      tekst = `${wanneer[0].toUpperCase() + wanneer.slice(1)} open om ${uur(u[0])}`;
      break;
    }
  }

  document.querySelectorAll("[data-status]").forEach((el) => (el.textContent = tekst));
  document.querySelectorAll(`.uren [data-dag="${dag}"]`).forEach((el) => el.classList.add("is-vandaag"));
}

function kop() {
  const kop = document.querySelector(".kop");
  const groot = document.querySelector(".voorkant .logo");
  const knop = document.querySelector(".kop__menu");
  const nav = document.getElementById("menu");

  const scroll = () => kop.classList.toggle("is-los", window.scrollY > 4);
  scroll();
  addEventListener("scroll", scroll, { passive: true });

  // Klein logo pas tonen als het grote logo uit beeld is
  if (groot && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => kop.classList.toggle("logo-verborgen", e.isIntersecting), {
      rootMargin: "-68px 0px 0px 0px",
    }).observe(groot);
  } else {
    kop.classList.remove("logo-verborgen");
  }

  const zet = (open) => {
    nav.classList.toggle("is-open", open);
    knop.setAttribute("aria-expanded", String(open));
    knop.textContent = open ? "Sluit" : "Menu";
  };
  knop.addEventListener("click", () => zet(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => e.target.closest("a") && zet(false));
  addEventListener("keydown", (e) => e.key === "Escape" && zet(false));
}

// Aanvraag voor een event: stelt een mail op, geen server nodig
function aanvraag() {
  const form = document.querySelector("[data-aanvraag]");
  if (!form) return;
  const fout = form.querySelector("[data-fout]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));

    if (!d.naam.trim()) {
      fout.textContent = "Vul uw naam in, dan weten we wie we mogen terugbellen.";
      form.querySelector("#a-naam").focus();
      return;
    }
    fout.textContent = "";

    const gegevens = [
      `Naam: ${d.naam}`,
      d.telefoon && `Telefoon: ${d.telefoon}`,
      d.datum && `Datum: ${d.datum}`,
      d.personen && `Aantal personen: ${d.personen}`,
    ].filter(Boolean).join("\n");
    const tekst = d.wat ? `${gegevens}\n\n${d.wat}` : gegevens;

    const onderwerp = `Aanvraag event${d.datum ? ` op ${d.datum}` : ""}`;
    location.href =
      `mailto:info@johanenmartine.be?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(tekst)}`;
  });

  // Tekstvak groeit mee, zodat het een lijn blijft tot ge meer typt
  const wat = form.querySelector("textarea");
  wat.addEventListener("input", () => {
    wat.style.height = "auto";
    wat.style.height = `${wat.scrollHeight}px`;
  });
}

document.querySelectorAll("[data-jaar]").forEach((el) => (el.textContent = new Date().getFullYear()));
status();
kop();
aanvraag();
