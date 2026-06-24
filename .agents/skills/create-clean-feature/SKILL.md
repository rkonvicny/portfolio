---
name: create-clean-feature
description: Creates a new feature end-to-end following the project's strict Clean Architecture guidelines.
---

# Skill: Tvorba Clean Architecture Feature

Tento skill slouží k přidání nové datové entity a repozitáře do portfolia.

## Kdy použít:

Když uživatel požádá o vytvoření nové funkce, datové sekce nebo modelu (např. Blog, Certifikáty, Reference).

## Postup (vždy splň v tomto pořadí):

1. **Entity (Domain):** Vytvoř rozhraní/třídu pro datový model ve složce `src/domain/entities/`. Soubor musí být v `kebab-case` (např. `blog-post.ts`).
2. **Port (Domain):** Vytvoř repozitářový port ve složce `src/domain/repositories/` (např. `IBlogRepository.ts`). Musí importovat entitu a definovat čisté asynchronní metody.
3. **Mock/Data (Data):** Pokud feature získává data z JSONu, přidej prázdné pole nebo ukázková data do `src/data/portfolio.json`.
4. **Adapter (Infrastructure):** Vytvoř implementaci ve složce `src/infrastructure/repositories/` (např. `InMemoryBlogRepository.ts`). Tato implementace načítá data z `portfolio.json` a implementuje port.
5. **DI Container:** Aktualizuj `src/infrastructure/di.ts` a přidej novou instanci repozitáře do exportovaného kontejneru.

## Kontrola po dokončení:

- Žádná závislost na frameworku (`next`, `react`) ve vrstvě `domain`.
- Soubory entit a portů nepoužívají `PascalCase`, ale `kebab-case`.
