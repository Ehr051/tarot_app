# 🔮 TAROT — Instrucciones para Agentes

## Visión General
App de Tarot estilo RUNES — aprender, tirar cartas, diario personal. Cartas que se abren en abanico y el usuario las elige.

## Tech Stack
- HTML + CSS + JS vanilla (sin frameworks)
- Firebase Hosting + Auth + Firestore
- GSAP para animaciones de cartas
- Canvas o SVG para cartas

## Mazos Soportados
1. **Rider-Waite** — El clásico (1909)
2. **Marsella** — El francés (tradición europea)
3. **Thoth** — Aleister Crowley
4. **El Valle** — Estilo español

## Estructura de Cartas
- 22 Arcanos Mayores (0-XXI)
- 56 Arcanos Menores (4 palos × 14 cartas)
- Cada carta: nombre, significado upright, significado reversed, imagen

## Animaciones Clave
1. **Abanico** — cartas se extienden como abanico
2. **Selección** — usuario clickea cartas del abanico
3. **Revelación** — carta gira (flip 3D) para mostrar imagen
4. **Posicionamiento** — carta se coloca en el spread

## Paleta de Colores
- Fondo: terciopelo oscuro (#1a1a2e)
- Acento: dorado místico (#d4af37)
- Texto: blanco hueso (#f5f5dc)
- Cartas: marco dorado, fondo crema

## Archivos
- `index.html` — pantalla principal
- `css/styles.css` — estilos
- `js/app.js` — lógica principal
- `js/cards.js` — datos de cartas
- `js/animations.js` — animaciones GSAP
