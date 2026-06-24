# Plán a Stav Implementace: Moderní portfolio vývojáře

Tento dokument slouží jako živý přehled architektury, provedených rozhodnutí a stavu implementace moderního, interaktivního portfolia v Next.js.

## 📋 Přehled rozhodnutí a technologií

* **Technologický stoh:** Next.js (App Router), TypeScript, pnpm.
* **Architektura:** Striktní Clean Architecture.
  * **Domain Layer:** `src/domain/entities` (datové modely, kebab-case jmenné konvence, např. `validation-error.ts`), `src/domain/ports` a `src/domain/repositories` (rozhraní pro infrastrukturu).
  * **Application Layer:** `src/application/use-cases` (obchodní logika nezávislá na frameworku).
  * **Infrastructure Layer:** `src/infrastructure/repositories` (InMemory repozitáře čtoucí z centrálního JSON), `src/infrastructure/services` (MockEmailService), Dependency Injection kontejner (`di.ts`).
* **Data-Driven Design:** Veškerý obsah (zkušenosti, projekty, dovednosti) je centralizován do `src/data/portfolio.json`.
* **Styling:** Tailwind CSS verze 4 s hybridním Light/Dark režimem řízeným primárně nativně přes CSS proměnné a `next-themes` (vyhýbáme se custom ThemeContextu).
* **Animace a Interakce:** Framer Motion (`motion/react`) a vysoce výkonný HTML5 Canvas pro interaktivní paralaxy a magnetické sítě.

---

## 🛠️ Stav implementace

### ✅ Krok 1: Inicializace a architektura
- [x] Základní projekt v Next.js (App Router, TS, Tailwind v4).
- [x] Nastavení Clean Architecture vrstev (Domain, Application, Infrastructure).
- [x] Vytvoření repozitářů, use-casů a entit s dodržením kebab-case konvence.
- [x] Konfigurace centralizovaného datového zdroje (`portfolio.json`).

### ✅ Krok 2: Vizuální identita a Témata
- [x] Nastavení barevné palety a CSS proměnných v `globals.css` (Tailwind v4 styl).
- [x] Implementace Light/Dark režimu bez zbytečných React Context wrapperů.

### ✅ Krok 3: Unifikované komponenty a Layout
- [x] Společný Layout s integrací lokálních optimalizovaných fontů (např. přes `next/font`).
- [x] **Navigace (`Navbar`)** a **Patička (`Footer`)**: Propojené s dynamickými daty.
- [x] Globální zavedení Glassmorphism prvků.

### ✅ Krok 4: Interaktivní sekce Hero
- [x] Komponenta `Hero` napojená na `portfolio.json` (dynamický podtitulek).
- [x] **Magnetic Triangular Mesh (Canvas):** Pokročilá komponenta `HeroBackground` vykreslující přes HTML5 `<canvas>` a `useAnimationFrame` (Framer Motion) magneticky se deformující mřížku. 
- [x] Aplikováno defensive programming pro bezpečné mapování 1D polí do 2D prostoru (prevence chyb na okrajích plátna).

### ⏳ Krok 5: Zbylé stránky a sekce (Čeká na revizi)
- [ ] **Sekce Dovedností (Skills):** Napojit existující komponentu na data.
- [ ] **Sekce Projektů (Projects):** Dokončit zobrazení karet s projekty a případné filtrování.
- [ ] **Časová osa zkušeností (Timeline):** Vizuální vykreslení historie z JSON dat.

### ✅ Krok 6: API a Kontakt
- [x] Serverová Next.js routa `/api/contact/route.ts`.
- [x] `SubmitContactFormUseCase` pro zpracování a validaci zprávy (`ValidationError`).
- [x] Mock služby pro odesílání e-mailů.

### ✅ Krok 7: Optimalizace a Pravidla (SEO / Agents)
- [x] Metadata a SEO nastavení v `layout.tsx` čtoucí globální data.
- [x] Zavedena pevná AI pravidla ve složce `.agents/AGENTS.md` (striktní čeština, ochrana proti pádům v Canvasu, Clean Architecture pravidla).

---

## 📅 Následující kroky (To-Do)

1. Dokončit a vizuálně vyladit zbylé sekce stránky (Projects, Skills, Timeline).
2. Propojit kontaktní formulář v UI s připraveným API endpointem.
3. Připravit projekt na nasazení (Deployment na Vercel/Netlify).
