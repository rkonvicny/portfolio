# Moderní Next.js Portfolio Vývojáře

Toto portfolio je moderní, vysoce interaktivní a plně responzivní webová prezentace softwarového vývojáře. Je postaveno na frameworku **Next.js** s využitím **TypeScriptu**, **Tailwind CSS v4** a balíčkovacího manažeru **pnpm**.

Web obsahuje úvodní sekci s dynamickým psacím efektem (typewriter), přehled dovedností, interaktivní mřížku projektů s detailními modálními okny, časovou osu profesní a akademické historie a plně funkční kontaktní formulář propojený se serverovým API endpointem.

---

## 🚀 Rychlý start

Pro spuštění projektu lokálně postupujte podle následujících kroků:

### 1. Klonování repozitáře

```bash
git clone <url-repozitare>
cd portfolio
```

### 2. Instalace závislostí (Důležité info k pnpm v11+)

Tento projekt využívá **pnpm** (verze 11+). Vzhledem k novým bezpečnostním pravidlům pnpm jsou ve výchozím nastavení blokovány build skripty závislostí, což v neinteraktivním CLI režimu způsobuje selhání instalace.

Pro vyřešení tohoto problému jsou povolené buildy (konkrétně pro `sharp` a `unrs-resolver`) nadefinovány v `pnpm-workspace.yaml` pomocí `allowBuilds`:

```yaml
allowBuilds:
  sharp: true
  unrs-resolver: true
```

Díky této konfiguraci stačí pro instalaci spustit standardní příkaz:

```bash
pnpm install
```

### 3. Spuštění vývojového serveru

Spusťte vývojový server pomocí Turbopacku:

```bash
pnpm dev
```

Web bude dostupný na adrese [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Dostupné příkazy

V projektu jsou předpřipraveny následující npm skripty:

* `pnpm dev` – Spustí vývojový server Next.js (využívá rychlý Turbopack compiler).
* `pnpm build` – Zkompiluje projekt a připraví optimalizovanou produkční verzi (provádí statický export a kontrolu TypeScriptu).
* `pnpm start` – Spustí produkční verzi serveru Next.js.
* `pnpm lint` – Spustí kontrolu kvality kódu a syntaxe pomocí ESLint.

---

## 📁 Struktura projektu

Projekt má následující adresářovou strukturu:

```text
portfolio/
├── public/                 # Statické soubory (ikony, obrázky projektů)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # Serverové API routy
│   │   │   └── contact/    # API endpoint pro odesílání formuláře
│   │   ├── globals.css     # Globální styly, Tailwind v4 a animace
│   │   ├── layout.tsx      # Hlavní layout (metadat, fonty, theme script)
│   │   └── page.tsx        # Vstupní bod (sestavení hlavní stránky)
│   ├── components/         # Znovupoužitelné React komponenty
│   │   ├── Contact.tsx     # Kontaktní sekce s formulářem
│   │   ├── Experience.tsx  # Časová osa (Timeline) zkušeností
│   │   ├── Footer.tsx      # Patička webu se sociálními sítěmi
│   │   ├── Hero.tsx        # Úvodní sekce s typewriter efektem
│   │   ├── Navbar.tsx      # Navigační panel s přepínačem témat
│   │   ├── Projects.tsx    # Grid projektů s filtrováním a modálním oknem
│   │   └── Skills.tsx      # Sekce dovedností s progress lištami
│   └── context/
│       └── ThemeContext.tsx # Správa motivů (Light/Dark mode) a localStorage
├── pnpm-workspace.yaml     # Konfigurace pnpm včetně allowBuilds
├── tsconfig.json           # Konfigurace TypeScriptu
└── package.json            # Závislosti a skripty projektu
```

---

## 🎨 Klíčové vlastnosti a detaily

* **Hybridní Téma (Light/Dark):** Plná podpora světlého a tmavého režimu s plynulým přechodem. Nastavení se ukládá do `localStorage` a při prvním načtení stránky se okamžitě spouští optimalizovaný inline skript, který eliminuje nežádoucí "bliknutí" nesprávného motivu.
* **Čisté CSS animace:** Všechny animace a přechody (např. vznášení karet, pulzování neonů) jsou napsány v čistém CSS a Tailwind v4 bez nutnosti stahovat těžké JS knihovny.
* **Kontaktní formulář:** Odesílá data asynchronně (fetch POST) na API routu `/api/contact`, kde dochází k validaci parametrů a e-mailové adresy.
* **SEO a Přístupnost:** Respektování sémantické struktury HTML5 nadpisů, definované meta tagy a optimalizovaný výkon načítání stránek.
