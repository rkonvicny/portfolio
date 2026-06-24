# Snapshot Konverzace (Portfolio)

**ID aktuální konverzace:** `f1f69f67-9890-468f-859d-2b26e7b9f9f3`
**Datum vytvoření snapshotu:** 19. června 2026

Pokud se budeš chtít v budoucnu (z jiného okna nebo nové konverzace) odvolat na vše, co jsme tady řešili a vymysleli, stačí v nové konverzaci napsat na začátek:
**`@f1f69f67-9890-468f-859d-2b26e7b9f9f3`** (případně zadat toto ID do načítání kontextu).

## 🚀 Co všechno jsme v této konverzaci udělali a vyřešili:
1. **Clean Architecture Refaktoring:** Celý Next.js projekt jsme přeskládali podle striktních pravidel Clean Architecture (Entities, Ports, Use Cases, Infrastracture/InMemory reps).
2. **Data-Driven Portfolio:** Přesunuli jsme obsah do centralizovaného `src/data/portfolio.json`.
3. **HeroBackground & Canvas:** Vytvořili jsme neuvěřitelně výkonné pozadí (`scaffold-canvas-mesh`) pomocí HTML5 Canvasu a `motion/react`, reagující na pohyb myši.
4. **Opravy Grid Indexů (Defensive Programming):** Vyřešili jsme komplexní `TypeError` pády při procházení mřížky na jejích okrajích díky přesnému výpočtu iterací (`numCols`) a podmínkám pro existenci sousedů.
5. **AI Učení (.agents):** Vygenerovali jsme složku `.agents`, ve které:
   - Je uloženo **pravidlo** pro striktní komunikaci v Češtině a architekturu (`AGENTS.md`).
   - Jsou nadefinovány **4 plnohodnotné Skills**: `create-clean-feature`, `create-use-case`, `scaffold-canvas-mesh`, `pre-flight-check`.
6. **Plán Implementace:** Aktualizovali jsme `plan_implementace.md` v kořenu projektu se zaškrtanými hotovými kroky.

## 📁 Kde leží logy a paměť této konverzace?
Kompletní paměť a skripty této relace jsou na tvém disku uloženy v:
`/home/konr/.gemini/antigravity-cli/brain/f1f69f67-9890-468f-859d-2b26e7b9f9f3/`
