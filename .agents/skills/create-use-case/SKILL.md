---
name: create-use-case
description: Scaffolds a new application use case with strict dependency and validation rules.
---

# Skill: Tvorba Use Case

Tento skill použij k vytvoření nové byznys logiky ve vrstvě Application.

## Postup:
1. **Vytvoření souboru:** Založ nový soubor v `src/application/use-cases/`. Název musí být v `kebab-case` a končit na `-use-case.ts` (např. `get-blog-posts-use-case.ts`).
2. **Definice třídy:** Třída musí být pojmenována v PascalCase a implementovat metodu `execute()`.
3. **Závislosti:** Konstruktor smí přijímat pouze rozhraní (Porty) z `src/domain/repositories/` nebo `src/domain/ports/`. Nikdy nepřijímej konkrétní implementace z `infrastructure`!
4. **Validace chyb:** Pokud logika vyžaduje validaci (např. prázdné ID, chybějící data), musí vyhazovat naši vlastní chybu `ValidationError` z `src/domain/errors/validation-error.ts`.
5. **Kontrola importů:**
   - ŽÁDNÉ importy z `next/*` nebo `react`.
   - ŽÁDNÉ importy z `src/infrastructure/*`.
   - Povoleny jsou POUZE importy z `src/domain/*`.
