# Johan & Martine — Styleguide web

Slagerij • Traiteur, Beervelde-dorp 87, 9080 Lochristi.
Dit document beschrijft hoe de site eruitziet en klinkt. De waarden zelf staan in `css/tokens.css`. Die file is de bron: pas daar aan, niet in `style.css`.

---

## 1. Merk in één zin

Een familieslagerij die doet wat ze belooft. Rustig, ambachtelijk, geen poespas. Het drukwerk (visitekaartje, cadeaubon) is de referentie: veel beige, bruin als tegenkleur, wijd gespatieerde kapitalen en dunne lijntjes.

---

## 2. Kleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--jm-beige` | `#d6d2c4` | Hoofdkleur. Standaard achtergrond. |
| `--jm-bruin` | `#382f2d` | Hoofdkleur. Tekst, knoppen, donkere vlakken. |
| `--jm-beige-licht` | `#e4e1d6` | Afwisselende sectie op beige (Aanbod, Contact). |
| `--jm-beige-lijn` | `#b9b3a2` | Dunne scheidingslijnen op beige. |
| `--jm-bruin-zacht` | `#5c514e` | Secundaire tekst op beige. |
| `--jm-bruin-diep` | `#2b2422` | Footer, hover van bruine knop. |
| `--jm-beige-op-bruin` | beige 72% | Secundaire tekst op bruin. |
| `--jm-lijn-op-bruin` | beige 28% | Dunne lijnen op bruin. |

**Combinaties (contrast gemeten, WCAG AA gehaald):**

- Bruin op beige: 8.6:1, voor alle tekst
- Bruin-zacht op beige: 5.1:1, voor lopende tekst en bijschriften
- Beige op bruin: 8.6:1, voor alle tekst
- Beige 72% op bruin: 5.3:1, voor lopende tekst

**Regels**
- Enkel deze kleuren. Geen rood voor "vlees", geen groen, geen gradients.
- Verhouding ongeveer 70% beige, 30% bruin. Bruin is een accent (band, events, uren, footer), geen achtergrond voor de hele pagina.
- Foto's brengen de warme kleur. Het kader blijft neutraal.

---

## 3. Typografie

**Lettertype:** DM Sans (Google Fonts), gewichten 300 tot 600.
**Logo:** het handgeschreven script is het logo en geen lettertype. Nooit nazetten in een scriptfont, altijd het SVG-bestand gebruiken.

| Rol | Token | Grootte | Gewicht | Extra |
|---|---|---|---|---|
| H1 (hero) | `--fs-display` | 44 → 88px | 500 | letter-spacing -0.025em, line-height 1.04 |
| H2 (sectie) | `--fs-h2` | 32 → 56px | 500 | letter-spacing -0.015em |
| H3 | `--fs-h3` | 22 → 28px | 500 | |
| Lead | `--fs-lead` | 18 → 21px | 400 | line-height 1.5 |
| Body | `--fs-body` | 17px | 400 | line-height 1.6, max 60 tekens breed |
| Klein | `--fs-small` | 15px | 400 | knoppen, meta |
| Eyebrow | `--fs-eyebrow` | 13px | 400 | HOOFDLETTERS, letter-spacing 0.28em |

**De eyebrow** is het herkenbaarste element uit het drukwerk ("SLAGERIJ • TRAITEUR", "KWALITEIT, VAKMANSCHAP…"). Gebruik die boven elke sectietitel en voor korte labels, maar nooit voor langere zinnen.

Het scheidingsteken is een bullet `•` met spaties errond, zoals op het kaartje.

---

## 4. Logo

| Bestand | Gebruik |
|---|---|
| `Assets/Branding/Logo-1.svg` | Bruin logo, op beige |
| `Assets/Branding/Logo-Beige.svg` | Beige logo, op bruin |

- Minimale breedte op scherm: 100px.
- Vrije ruimte rond het logo: minstens de hoogte van de "&".
- Onder het logo mag "SLAGERIJ • TRAITEUR" in eyebrow-stijl staan.
- Niet vervormen, niet inkleuren buiten bruin/beige, geen schaduw.
- Op de site staat het grote logo in de hero. Het kleine logo in de header verschijnt pas als het grote uit beeld is gescrold.

---

## 5. Illustratie

`Assets/Illustraties/koe-gravure.svg` is de gegraveerde koe van de cadeaubon.

- De koe is bewust afgesneden aan de rechterkant. Zet ze daarom altijd tegen een rand, zoals op de bon.
- Ze wordt als CSS-mask ingeladen, zodat de kleur uit de tokens komt (bruin op beige, of beige op bruin).
- Spaarzaam gebruiken: één keer per pagina.

---

## 6. Vorm, lijnen, ruimte

- **Hoeken:** recht (`--radius: 0`). Voelt als drukwerk.
- **Lijnen:** 1px, dun. Tussen lijstitems, boven nummers, rond de cadeaubon.
- **Streepje:** een kort lijntje van 40px (`.dash`), overgenomen van het visitekaartje. Gebruik het als pauze in een tekstblok.
- **Schaduwen:** geen.
- **Spacing:** basis 8px (`--space-1` t.e.m. `--space-8`). Secties krijgen veel lucht (`--space-section`, 72 → 144px).
- **Breedte:** container 1200px, gutter 16 → 40px.

---

## 7. Knoppen

| Klasse | Waar |
|---|---|
| `.btn` | Bruin vlak, beige tekst. Hoofdactie op beige. |
| `.btn--ghost` | Bruine rand, transparant. Tweede actie op beige. |
| `.btn--light` | Beige vlak, bruine tekst. Hoofdactie op bruin. |
| `.btn--ghost-light` | Beige rand. Tweede actie op bruin. |
| `.btn--small` | Header. |

De tekst op een knop zegt wat er gebeurt: "Bel 09 355 56 86", "Route plannen", "Mail ons". Dus geen "Meer info" en geen "Ontdek".

---

## 8. Foto's

- Warm, natuurlijk licht, hout, echt vlees. Liefst close-up of in de winkel.
- Geen witte studio-achtergronden, geen gestileerde food-porn met rook en druppels.
- Altijd `object-fit: cover` in een vaste verhouding (4:5, 4:3 of 1:1).
- **Nu zijn het stockfoto's (Unsplash-licentie, vrij te gebruiken).** Vervang ze zo snel mogelijk door echte foto's van de winkel, de toog en de familie. Dat verschil ziet iedereen.

| Bestand | Plaats | Bron |
|---|---|---|
| `hero-steaks.jpg` | Hero | unsplash.com/photos/3pCrvi2JH-M |
| `toonbank.jpg` | De familie | unsplash.com/photos/QxkjTCUjoLc |
| `vakmanschap-snijden.jpg` | Aanbod: vers vlees | unsplash.com/photos/BT43Yl3m_xs |
| `gerecht-stoverij-puree.jpg` | Aanbod: gerechten | unsplash.com/photos/IQs7dTT28zk |
| `bbq-worsten.jpg` | Events | unsplash.com/photos/wq8xzzoj_sE |
| `bbq-vuur.jpg` | Events | unsplash.com/photos/ul_m5dHThaM |

---

## 9. Tone of voice

Schrijf zoals Johan of Martine het aan de toog zou zeggen.

**Wel**
- Vlaams, spreektalig maar netjes: "ge", "uw", "toog", "rap", "de gasten", "voor hoeveel man".
- Korte zinnen. Concreet: wat ligt er, wanneer zijn we open, hoe bestelt ge.
- Eén idee per zin.
- Rustige humor mag: "Iedereen eet."

**Niet**
- Marketingtaal: "passie", "beleving", "ontdek", "uniek", "de perfecte keuze", "met liefde bereid".
- Opsommingen van drie bijvoeglijke naamwoorden ("vers, lokaal en duurzaam").
- Beloftes die we niet kunnen waarmaken, zoals namen van boeren, labels of prijzen die we niet kennen.
- Hollands: "je", "lekker makkelijk", "gezellig borrelen".
- Uitroeptekens.

**Voorbeelden**

| Niet | Wel |
|---|---|
| Ontdek onze passie voor ambachtelijk vlees! | Belgisch vlees, hier versneden en gekruid. |
| Wij verzorgen uw event van A tot Z. | Laat weten wat ge van plan zijt en voor hoeveel man. |
| Het perfecte cadeau voor elke vleesliefhebber. | Iedereen eet. |

---

## 10. Nog in te vullen

- [ ] Namen van de zonen (`index.html`, sectie De familie, gemarkeerd met `.placeholder`)
- [ ] Wat de events juist inhouden (formules, vanaf hoeveel personen, prijzen?)
- [ ] Specialiteiten of vaste gerechten, als ze die willen noemen
- [ ] Echte foto's
- [ ] Facebook / Instagram, als die er zijn
