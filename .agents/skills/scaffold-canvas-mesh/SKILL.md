---
name: scaffold-canvas-mesh
description: Generates a high-performance interactive triangular canvas mesh using Framer Motion.
---

# Skill: Tvorba interaktivního Canvas pozadí (Mesh)

Tento skill použij, když je potřeba oživit pozadí nějaké sekce interaktivní mřížkou, která reaguje na kurzor myši.

## Klíčová pravidla pro implementaci:

1. **Technologie:** Použij HTML5 `<canvas>` a animuj ho přes `useAnimationFrame` z `motion/react`.
2. **Defensive Programming (Kritické!):**
   - Při iterování mřížky ve vykreslovací smyčce a hledání sousedů (`rightNode`, `bottomNode`, `bottomRight`, `bottomLeft`), VŽDY zkontroluj, zda bod existuje, než přečteš jeho vlastnosti `x` a `y`.
   - Příklad špatně: `ctx.lineTo(rightNode.x, rightNode.y)`
   - Příklad správně: `if (rightNode) { ctx.lineTo(rightNode.x, rightNode.y) }`
3. **Výpočet sloupců a řádků:**
   - Dej pozor, aby se počet sloupců smyčky generátoru shodoval s tím, který používáš pro `i % numCols` v render smyčce. K vygenerování bezchybné mřížky využij konstantu `numCols = cols + 1;`
4. **Témata (Dark/Light):**
   - Ve vykreslovací smyčce dynamicky ověřuj `resolvedTheme` pomocí `next-themes` a použij fallback pro přímé SSR `window.matchMedia` tak, aby barvy čar (`ctx.strokeStyle`) odpovídaly aktuálnímu tématu.
5. **DPI a Resize:** Načti a aplikuj `window.devicePixelRatio`, aby plátno nebylo rozmazané na Retina displejích.
6. **Parametrizace:** Komponenta musí vždy přijímat parametry s výchozími hodnotami (např. `spacing`, `pullRadius`, `pullStrength`).
