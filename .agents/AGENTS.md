# Projektová a Komunikační Pravidla (Portfolio)

## 1. Striktní komunikace v Češtině
- Se samotným uživatelem komunikuj VŽDY výhradně v českém jazyce. 
- Toto pravidlo je absolutní a platí pro běžnou konverzaci, návrhy i všechny systémové odpovědi. Aplikuje se i na výstupy slash příkazů.

## 2. Clean Architecture a Konvence Projektu
- Projekt striktně využívá Clean Architecture.
- Struktury kontraktů (rozhraní datových modelů) musí být uloženy ve složce `src/domain/entities`.
- Všechny porty pro repozitáře a externí služby musí být výhradně v doménové vrstvě (`src/domain/ports` nebo `src/domain/repositories`), nikoliv v Application vrstvě.
- Soubory i třídy musí dodržovat jmenné konvence stanovené projektem (např. `kebab-case` pro názvy souborů jako `validation-error.ts`).
- Témata (Dark/Light mode) se řídí primárně přes CSS proměnné a nativní možnosti Tailwind CSS. Vyvaruj se vytváření vlastního těžkopádného ThemeContextu.

## 3. Defensive Programming u 1D/2D polí v Canvasu a Framer Motion
- Při mapování 1D pole do 2D prostoru (mřížky) pomocí operací modulo (`i % cols`, `Math.floor(i / cols)`) VŽDY aplikuj "defensive programming".
- Nikdy nespoléhej čistě na hraniční podmínky smyček. Před přistupováním k vlastnostem souseda (např. `rightNode.x`, `bottomRight.y`) zkontroluj existenci takového objektu pomocí explicitní podmínky (např. `if (rightNode)`).
- Pokud to neuděláš, dojde nevyhnutelně k asynchronnímu pádu typu `TypeError: Cannot read properties of undefined` na pravých a spodních okrajích generovaných mřížek.
