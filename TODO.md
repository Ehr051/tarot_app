# 🔮 TAROT — TODO

## Pendiente para Deploy

### 1. Loading Screen
- [x] Reemplazar bola de cristal por cartas del tarot pasando en ciclo
- [x] Animar cartas con fade/in effect
- [x] Barra de progreso real
- [x] Reusar CSS de RUNES (loading-fill animation)

### 2. Animación de Fondo
- [x] Canvas con cartas cayendo desde arriba
- [x] Rotación lenta entre lomo y frente
- [x] Borde dorado en cada carta
- [x] Traza/estela que desaparece (como hojas de otoño)
- [x] Velocidad lenta, no molesta, funciona en mobile
- [x] Reusar sistema de floating-runes de RUNES como base

### 3. Perfil Completo
- [x] Barra de XP con progreso al siguiente nivel
- [x] Progreso del story mode (capítulos, escenas, estrellas)
- [x] Logros desbloqueados
- [x] Racha de práctica
- [x] Cartas dominadas por mazo
- [x] Actualizar `actualizarPerfil()` en app.js

### 4. Firebase Auth
- [x] Agregar SDK scripts (compat mode) al index.html
- [x] Copiar initAuth, loginWithEmail, registerWithEmail, loginWithGoogle de RUNES
- [x] Crear pantalla de login (HTML + CSS)
- [x] Adaptar eventos de login
- [x] Configurar Firebase config con proyecto runes-90d8b
- [ ] Habilitar Auth en Firebase Console → Authentication → Sign-in method (Google + Email)
- [ ] Protected route pattern
- [ ] Sync datos con Firestore

### 5. Firebase Hosting
- [x] Crear firebase.json
- [x] Crear .firebaserc
- [x] Configurar site: runas
- [x] Deploy — https://runas.web.app ✓
- [x] Analytics: G-75SCS3SHDB

### 6. Testeo General
- [x] Verificar todas las pantallas
- [x] Test login/skip
- [x] Test loading screen
- [x] Test animaciones
- [x] Test deploy — https://aprendetarot.web.app ✓

## Completado

### Loading Screen
- [x] PWA manifest configurado
- [x] Iconos generados (192, 512)
- [x] Service worker básico
- [x] Loading screen con cartas del tarot pasando en ciclo
- [x] Subtítulo "Descubrí los misterios del tarot"

### Animaciones
- [x] Cartas cayendo desde arriba (background)
- [x] Rotación lomo/frente
- [x] Borde dorado
- [x] Trail/estela que desaparece

### Login
- [x] Pantalla de login con email + Google
- [x] Formulario de registro
- [x] Botón "Saltar por ahora"
- [x] Firebase SDK scripts (compat)
- [x] Funciones auth (login, register, google, logout)
- [x] firebase.json configurado
- [x] .firebaserc creado (placeholder)

### Perfil
- [x] Barra de XP con progreso
- [x] Nivel + nombre
- [x] 4 stats (lecturas, cartas, ejercicios, racha)
- [x] Progreso del story mode (4 capítulos)
- [x] 14 logros display

### Funcionalidad Core
- [x] 78 cartas por mazo (4 mazos = 312 cartas)
- [x] Imágenes AI generadas (312)
- [x] Fan de cartas con animación GSAP
- [x] 7 tipos de tirada
- [x] Significados por mazo
- [x] Carta diaria
- [x] Sistema de lectura con opciones

### Learning
- [x] 4 capítulos de story mode
- [x] 155+ ejercicios
- [x] 4 tipos de quiz
- [x] Sistema de niveles (10 niveles)
- [x] 15 logros
- [x] Barra de progreso por capítulo
- [x] Preguntas intuitivas (todas 3-4 palabras)

### UI
- [x] Bottom nav con SVG icons
- [x] Card zoom modal
- [x] Background music (2 tracks)
- [x] Responsive design
- [x] Profile con stats

### Code Quality
- [x] SVG card backs únicos (sin duplicate IDs)
- [x] GSAP clearProps para evitar opacity bugs
- [x] Screen visibility fix (hidden + activa)
- [x] Per-deck meanings (4 archivos)
- [x] Card names stripped from meanings

### Tests
- [x] Playwright tests (46/46)
- [x] Test story mode flow
- [x] Test quiz system
- [x] Test reading practice
- [x] Test card zoom
