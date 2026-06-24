# Vývojová a technická dokumentace

Tento dokument slouží jako technický manuál a přehled architektury pro vývojáře, kteří chtějí projekt sestavit, modifikovat nebo pochopit jeho vnitřní fungování.

## 🏗️ Architektura: Clean Architecture

Aplikace je striktně rozdělena podle principů **Clean Architecture** (Package-by-Layer), aby byla zajištěna maximální testovatelnost, oddělení zodpovědností a nezávislost na vnějších frameworcích (např. nezávislost logiky na Next.js routeru).

### Vrstvy

1. **Domain (`src/domain/`)**
   - Obsahuje čisté datové modely (`entities`) a kontrakty rozhraní (`ports`).
   - _Pravidlo:_ Nesmí mít žádné závislosti na jiných vrstvách ani na externích knihovnách.
2. **Application (`src/application/`)**
   - Obsahuje aplikační logiku (`use-cases`).
   - Koordinuje tok dat mezi doménou a infrastrukturou.
   - _Pravidlo:_ Závisí pouze na vrstvě Domain. Volá databáze/e-maily přes rozhraní (Ports).
3. **Infrastructure (`src/infrastructure/`)**
   - Specifické implementace rozhraní (např. odesílání přes SMTP server, čtení z `portfolio.json`).
   - Obsahuje Dependency Injection kontejner (`di.ts`), který propojuje Use Casy s konkrétními repozitáři.
4. **Presentation / UI (`src/components/`, `src/app/`)**
   - Zodpovídá výhradně za vykreslování dat a sběr uživatelského vstupu.
   - React komponenty a Next.js App Router.

---

## 🚀 Rychlý start a spuštění

Projekt využívá balíčkovací manažer **pnpm**.

### Instalace závislostí

```bash
pnpm install
```

### Konfigurace prostředí

V kořenu projektu vytvořte soubor `.env` pro zprovoznění odesílání e-mailů:

```env
SMTP_USER="vas@email.cz"
SMTP_PASS="vase_heslo"
```

_(Bez těchto proměnných bude formulář vypisovat zprávy pouze do lokální konzole jako Mock)_.

### Spuštění vývojového serveru

```bash
pnpm dev
```

Web běží na `http://localhost:3000`.

---

## 🎨 Vlastnosti a rendering

- **Striktní data-driven UI a `pageSettings`:** Veškerý obsah je definován v jediném centrálním souboru `src/data/portfolio.json`. Tento soubor obsahuje nejen data (zkušenosti, skilly), ale také dedikovaný blok `"pageSettings"`, kterým lze zapínat a vypínat vizuální bloky a chování bez zásahu do kódu:
  - `enableNameGlow` a `enableNameGradient`: Přepínače pro efekty na jménu v Hero sekci.
  - `enableTypewriterSection`: Zapíná/vypíná dynamický text.
  - `enableButtonBar`: Viditelnost CTA tlačítek v Hero.
  - `enableExtendedSectionHeader`: Přepínání plné verze nadpisů s podtitulkem.
  - `enableThemeSwitcher`: Zobrazení přepínače tmavého motivu v menu.

- **Zpracování e-mailů:** Kontaktní formulář využívá serverovou akci `submitContactFormUseCase` a knihovnu `nodemailer`, která zprávy odesílá přímo pomocí specifikovaného SMTP (např. Seznam.cz).

- **Motivy (Light/Dark mode):** O theme management se stará knihovna `next-themes` s využitím standardních Tailwind CSS variables. Původní custom ThemeContext byl nahrazen pro vyšší spolehlivost a eliminaci problému s problikáváním motivu ("hydration mismatch").

- **Opakovaně použitelné komponenty:** Veškeré hlavičky sekcí byly refaktorovány do centrální komponenty `<SectionHeader />`, což zajišťuje konzistentní a snadno spravovatelný design napříč stránkami.

- **Scroll Spy navigace:** Robustní detekce aktuální sekce v menu pomocí sledování offsetů (i pro krátké patičkové sekce).

---

## 📁 Struktura projektu

```text
portfolio/
├── docs/                   # Technická dokumentace (tento soubor)
├── public/                 # Statické assety
├── src/
│   ├── app/                # Next.js 14 App Router, page.tsx
│   ├── application/        # Clean Architecture: Use Cases
│   ├── components/         # React Komponenty a UI (Hero, Contact, Navbar...)
│   ├── data/               # Statická data (portfolio.json)
│   ├── domain/             # Clean Architecture: Entities a Ports
│   └── infrastructure/     # Služby (SmtpEmailService), repozitáře a DI kontejner
├── pnpm-workspace.yaml     # Konfigurace pnpm
└── tailwind.config.js / postcss # Definice designového systému Tailwind v4
```
