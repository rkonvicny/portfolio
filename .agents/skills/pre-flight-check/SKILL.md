---
name: pre-flight-check
description: Runs strict validation checks before committing or deploying code.
---

# Skill: Předletová příprava na nasazení (Pre-flight Check)

Tento skill slouží jako kontrolní seznam a akce před tím, než se projekt pushne na git nebo nasadí na Vercel.

## Kroky ke spuštění:
1. **Ověření buildu a lintingu:**
   - Spusť na pozadí příkaz `pnpm tsc --noEmit && pnpm lint`.
   - Úkol nesmí projít, dokud nevyladíš všechny varování a chyby z ESLintu. Nesmí tam zůstat zbytečné `eslint-disable`.
2. **Kontrola datových struktur:**
   - Otevři `src/data/portfolio.json`.
   - Zkontroluj, zda u všech položek v polích existuje platné unikátní `id` a data nepůsobí jako prázdné vzory.
3. **Kontrola "zbytkového" kódu (Console logs & Mocks):**
   - Projdi rychlým grepem kód pro `console.log`. Pokud se nachází jinde než v zachytávání chyb (`catch`), varuj uživatele a navrhni smazání.
   - Ujisti se, že klíče v `next.config.ts` nenarušují produkční prostředí (např. povolené lokální dev origins).
4. **Report:**
   - Jakmile provedeš kontroly, vygeneruj uživateli stručný markdown artefakt nebo odpověď se stavem projektu (tzv. "Green Light" nebo seznam věcí k opravení před nasazením).
