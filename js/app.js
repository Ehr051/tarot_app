// 🔮 TAROT — App principal

// ═══════════════ FIREBASE CONFIG ═══════════════
const firebaseConfig = {
  apiKey: "AIzaSyD00Hg_wAMADTnCZTxn94fNoRynvhpMLBU",
  authDomain: "runes-90d8b.firebaseapp.com",
  projectId: "runes-90d8b",
  storageBucket: "runes-90d8b.firebasestorage.app",
  messagingSenderId: "137879650199",
  appId: "1:137879650199:web:d0347276884c2d365c4ed2",
  measurementId: "G-75SCS3SHDB"
};

let firebaseApp = null, auth = null, db = null, analytics = null, currentUser = null;

// Init Firebase immediately (like RUNES)
try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    try { analytics = firebase.analytics(); } catch(e) {}
  }
} catch(e) {
  console.log('Firebase init skipped:', e.message);
}

function initAuth() {
  if (!auth) { console.log('[AUTH] No auth instance'); return; }
  console.log('[AUTH] initAuth: registering onAuthStateChanged');
  
  auth.onAuthStateChanged((user) => {
    console.log('[AUTH] onAuthStateChanged:', user ? 'LOGGED IN ' + user.uid : 'LOGGED OUT');
    if (user) {
      currentUser = user;
      document.getElementById('user-name').textContent = user.displayName || 'Vidente';
      afterLogin();
    } else {
      currentUser = null;
      document.getElementById('app').classList.add('hidden');
      const loginEl = document.getElementById('pantalla-login');
      loginEl.style.display = '';
      loginEl.classList.add('activa');
    }
  });
}

function afterLogin() {
  const loginEl = document.getElementById('pantalla-login');
  loginEl.classList.remove('activa');
  loginEl.style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('app').style.display = '';
  initApp();
}

async function loginWithEmail(email, password) {
  if (!auth) { showToast('Firebase no configurado', 'error'); return; }
  try {
    await auth.signInWithEmailAndPassword(email, password);
    showToast('¡Bienvenido!', 'success');
  } catch(e) {
    showToast(getAuthError(e.code), 'error');
  }
}

async function registerWithEmail(name, email, password) {
  if (!auth) { showToast('Firebase no configurado', 'error'); return; }
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    document.getElementById('user-name').textContent = name;
    showToast('¡Cuenta creada!', 'success');
  } catch(e) {
    showToast(getAuthError(e.code), 'error');
  }
}

async function loginWithGoogle() {
  if (!auth) { showToast('Firebase no configurado', 'error'); return; }
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  } catch(e) {
    console.log('[AUTH] loginWithGoogle error:', e.code);
    if (e.code === 'auth/popup-blocked') {
      showToast('El popup fue bloqueado. Permití popups para este sitio.', 'error');
    } else {
      showToast(getAuthError(e.code), 'error');
    }
  }
}

async function logoutApp() {
  if (auth) await auth.signOut();
  currentUser = null;
  const loginEl = document.getElementById('pantalla-login');
  loginEl.style.display = '';
  loginEl.classList.add('activa');
}

function getAuthError(code) {
  const errors = {
    'auth/user-not-found': 'No existe una cuenta con este correo',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'Este correo ya está registrado',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/invalid-email': 'Correo inválido',
    'auth/too-many-requests': 'Demasiados intentos. Esperá un momento',
    'auth/invalid-credential': 'Correo o contraseña incorrectos',
    'auth/invalid-login-credentials': 'Correo o contraseña incorrectos',
    'auth/popup-blocked': 'El popup fue bloqueado. Permití popups para este sitio.',
    'auth/popup-closed-by-user': 'Cerraste la ventana. Intentá de nuevo.',
    'auth/network-request-failed': 'Error de red. Verificá tu conexión.',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con este correo usando otro método de ingreso.',
  };
  return errors[code] || 'Error al autenticar: ' + (code || 'desconocido');
}

// ═══════════════ SIGNIFICADOS POR MAZO ═══════════════
const SIGNIFICADOS_POR_MAZO = {
  rider: SIGNIFICADOS_RIDER,
  marsella: SIGNIFICADOS_MARSELLA,
  thoth: SIGNIFICADOS_THOTH,
  valle: SIGNIFICADOS_VALLE
};

function getSignificado(cartaId, mazo, invertida = false) {
  const idStr = String(cartaId).padStart(2, '0');
  const significados = SIGNIFICADOS_POR_MAZO[mazo]?.[idStr];
  if (!significados) return 'Significado no disponible';
  return invertida ? significados.reversed : significados.upright;
}

function getSignificadoReversed(cartaId, mazo) {
  const idStr = String(cartaId).padStart(2, '0');
  const significados = SIGNIFICADOS_POR_MAZO[mazo]?.[idStr];
  if (!significados) return 'Significado no disponible';
  return significados.reversed;
}

// ═══════════════ VARIABLES GLOBALES ═══════════════
let mazoActual = 'rider';
let mazoReferencia = 'rider';
let tiradaActual = 'una';
let cartasEnMazo = [...TODAS_LAS_CARTAS];
let cartasSeleccionadas = [];
let tiradaEnCurso = false;

// ═══════════════ INICIALIZACIÓN ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  console.log('[AUTH] DOMContentLoaded fired');
  initLoadingCards();
  
  // Init Firebase auth here so redirect isn't consumed by early firebase.auth()
  if (typeof firebase !== 'undefined' && firebase.initializeApp && !auth) {
    auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }
  console.log('[AUTH] auth instance:', auth ? 'OK' : 'NULL');
  initAuth();
  
  // Setup login events
  setupLoginEvents();
  
  // Loading screen - fast like RUNES
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 400);
});

function setupLoginEvents() {
  document.getElementById('btn-login-email')?.addEventListener('click', () => {
    loginWithEmail(
      document.getElementById('login-email').value,
      document.getElementById('login-password').value
    );
  });
  
  document.getElementById('btn-register-email')?.addEventListener('click', () => {
    registerWithEmail(
      document.getElementById('register-name').value,
      document.getElementById('register-email').value,
      document.getElementById('register-password').value
    );
  });
  
  document.getElementById('btn-login-google')?.addEventListener('click', loginWithGoogle);
  
  document.getElementById('btn-saltar-login')?.addEventListener('click', () => {
    const loginEl = document.getElementById('pantalla-login');
    loginEl.classList.remove('activa');
    loginEl.style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    initApp();
  });
  
  document.getElementById('btn-show-register')?.addEventListener('click', () => {
    document.getElementById('login-email-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
  });
  
  document.getElementById('btn-show-login')?.addEventListener('click', () => {
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-email-section').classList.remove('hidden');
  });
}

function initLoadingCards() {
  const majorArcana = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  
  function setupCards(selector, startIndices) {
    const cards = document.querySelectorAll(selector);
    let indices = [...startIndices];
    
    cards.forEach((card, i) => {
      const carta = TODAS_LAS_CARTAS.find(c => c.id === indices[i]);
      if (carta) {
        const url = getCardImageUrl(carta.id, 'rider');
        card.innerHTML = `<img src="${url}" alt="${carta.nombre}" onerror="this.style.display='none'">`;
      }
    });
    
    setInterval(() => {
      indices = indices.map(idx => (idx + 1) % majorArcana.length);
      cards.forEach((card, i) => {
        const carta = TODAS_LAS_CARTAS.find(c => c.id === indices[i]);
        if (carta) {
          const url = getCardImageUrl(carta.id, 'rider');
          card.innerHTML = `<img src="${url}" alt="${carta.nombre}" onerror="this.style.display='none'">`;
        }
      });
    }, 2400);
  }
  
  setupCards('.loading-card', [0, 7, 14]);
  setupCards('.login-card', [3, 10, 17]);
}

// ═══════════════ FALLING CARDS BACKGROUND ═══════════════
function initFallingCards() {
  const container = document.getElementById('falling-cards-bg');
  if (!container) return;
  
  const majorIds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  let cardCount = 0;
  const MAX_CARDS = 8;
  
  function spawnCard() {
    if (cardCount >= MAX_CARDS) return;
    
    const card = document.createElement('div');
    card.className = 'falling-card';
    
    const cartaId = majorIds[Math.floor(Math.random() * majorIds.length)];
    const carta = TODAS_LAS_CARTAS.find(c => c.id === cartaId);
    const imgUrl = getCardImageUrl(cartaId, 'rider');
    
    const startX = Math.random() * 100;
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * 2;
    const rotStart = -30 + Math.random() * 60;
    const rotEnd = rotStart + (-180 + Math.random() * 360);
    const maxOpacity = 0.15 + Math.random() * 0.2;
    
    card.style.left = startX + '%';
    card.style.setProperty('--rot-start', rotStart + 'deg');
    card.style.setProperty('--rot-end', rotEnd + 'deg');
    card.style.setProperty('--max-opacity', maxOpacity);
    card.style.animationDuration = duration + 's';
    card.style.animationDelay = delay + 's';
    
    card.innerHTML = `<img src="${imgUrl}" alt="${carta?.nombre || ''}" loading="lazy" onerror="this.style.display='none'">`;
    
    container.appendChild(card);
    cardCount++;
    
    setTimeout(() => {
      card.classList.add('revealed');
    }, (delay + duration * 0.15) * 1000);
    
    setTimeout(() => {
      card.remove();
      cardCount--;
    }, (delay + duration) * 1000);
  }
  
  for (let i = 0; i < 4; i++) {
    setTimeout(() => spawnCard(), i * 1500);
  }
  
  setInterval(spawnCard, 3000);
}

let _appInitialized = false;
function initApp() {
  if (_appInitialized) return;
  _appInitialized = true;
  initFallingCards();
  setupNavigation();
  setupDeckSelector();
  setupRefDeckSelector();
  setupSpreadSelector();
  setupFilterTabs();
  loadCardsGrid();
  loadRecentReadings();
  initCardBacks();
  actualizarProgreso();
  initDailyCard();
  if (typeof updateLevelDisplay === 'function') updateLevelDisplay();
  actualizarPerfil();
  if (typeof renderChapters === 'function') renderChapters();
  
  // Edit profile modal
  document.getElementById('btn-edit-profile')?.addEventListener('click', () => {
    document.getElementById('edit-profile-name').value = currentUser?.displayName || '';
    document.getElementById('modal-edit-profile').classList.remove('hidden');
  });
  document.getElementById('btn-save-profile')?.addEventListener('click', async () => {
    const newName = document.getElementById('edit-profile-name').value.trim();
    if (!newName) { showToast('El nombre no puede estar vacío'); return; }
    if (currentUser) {
      try {
        await currentUser.updateProfile({ displayName: newName });
        document.getElementById('user-name').textContent = newName;
      } catch(e) { console.warn('Profile update failed:', e); }
    }
    document.getElementById('modal-edit-profile').classList.add('hidden');
    showToast('Perfil actualizado');
  });
}

function actualizarPerfil() {
  const statReadings = document.getElementById('stat-readings');
  const statCards = document.getElementById('stat-cards');
  const statPractice = document.getElementById('stat-practice');
  const statStreak = document.getElementById('stat-streak');
  const userLevel = document.getElementById('user-level');
  const userLevelName = document.getElementById('user-level-name');
  const xpFill = document.getElementById('xp-fill-profile');
  const xpText = document.getElementById('xp-text');
  
  if (statReadings) statReadings.textContent = localStorage.getItem('tarot_lecturas_completadas') || '0';
  if (statCards) statCards.textContent = (JSON.parse(localStorage.getItem('tarot_dominadas') || '[]')).length;
  if (statPractice) statPractice.textContent = localStorage.getItem('tarot_quizzes_completados') || '0';
  if (statStreak) statStreak.textContent = localStorage.getItem('tarot_racha') || '0';
  
  if (userLevel && typeof getLevel === 'function') {
    const level = getLevel();
    userLevel.textContent = level.nivel;
    if (userLevelName) userLevelName.textContent = level.nombre;
    if (xpFill && typeof getXp === 'function') {
      const currentXp = getXp();
      const nextLevel = typeof getNextLevel === 'function' ? getNextLevel() : null;
      const xpMin = level.xp;
      const xpMax = nextLevel ? nextLevel.xp : level.xp + 100;
      const xpInLevel = currentXp - xpMin;
      const xpNeeded = xpMax - xpMin;
      const pct = xpNeeded > 0 ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 0;
      xpFill.style.width = pct + '%';
      if (xpText) xpText.textContent = `${currentXp} / ${xpMax} XP`;
    }
  }
  
  // Story progress
  const storyList = document.getElementById('story-progress-list');
  if (storyList && typeof CHAPTERS !== 'undefined') {
    storyList.innerHTML = CHAPTERS.map(ch => {
      const progress = typeof getChapterProgress === 'function' ? getChapterProgress(ch.id) : {};
      const completed = progress.escenasCompletadas || 0;
      const total = ch.escenas.length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      return `
        <div class="story-progress-item">
          <span class="sp-icon">${ch.icono}</span>
          <div class="sp-info">
            <div class="sp-title">${ch.titulo}</div>
            <div class="sp-bar"><div class="sp-fill" style="width:${pct}%"></div></div>
          </div>
          <span class="sp-pct">${pct}%</span>
        </div>`;
    }).join('');
  }
  
  // Achievements
  const achList = document.getElementById('achievements-list');
  if (achList && typeof ACHIEVEMENTS !== 'undefined') {
    const unlocked = JSON.parse(localStorage.getItem('tarot_achievements') || '[]');
    achList.innerHTML = Object.values(ACHIEVEMENTS).map(a => {
      const isUnlocked = unlocked.includes(a.id);
      return `
        <div class="ach-item ${isUnlocked ? '' : 'locked'}">
          <span class="ach-icon">${a.icono}</span>
          <span class="ach-name">${a.nombre}</span>
        </div>`;
    }).join('');
  }
}

function initDailyCard() {
  const flipFront = document.getElementById('daily-flip-front');
  const flipBack = document.getElementById('daily-flip-back');
  const flipper = document.getElementById('daily-flipper');
  const dailyText = document.getElementById('daily-card-text');
  
  flipFront.innerHTML = getCardBackSVG('rider');
  
  const diaria = localStorage.getItem('tarot_carta_diaria');
  const fechaHoy = new Date().toDateString();
  
  if (diaria) {
    const data = JSON.parse(diaria);
    if (data.fecha === fechaHoy) {
      const carta = TODAS_LAS_CARTAS.find(c => c.id === data.cartaId);
      if (carta) {
        const imgUrl = getCardImageUrl(carta.id, data.mazo || 'rider');
        flipBack.innerHTML = `<img src="${imgUrl}" alt="${carta.nombre}">`;
        flipper.classList.add('flipped');
        dailyText.textContent = carta.nombre + ' — Tocá para ver';
        return;
      }
    }
  }
  
  flipBack.innerHTML = '';
  flipper.classList.remove('flipped');
  dailyText.textContent = 'Tocá para revelar';
}

// ═══════════════ NAVEGACIÓN ═══════════════
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pantalla = btn.dataset.pantalla;
      irA(pantalla);
    });
  });
}

function irA(pantalla) {
  document.querySelectorAll('.pantalla').forEach(p => {
    p.classList.remove('activa');
    p.classList.add('hidden');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('activa'));
  
  const target = document.getElementById(`pantalla-${pantalla}`);
  target.classList.remove('hidden');
  target.classList.add('activa');
  document.querySelector(`[data-pantalla="${pantalla}"]`).classList.add('activa');
  
  if (pantalla === 'tirada') {
    prepararFan();
  }
  if (pantalla === 'perfil') {
    actualizarPerfil();
  }
  if (pantalla === 'aprendizaje') {
    if (typeof renderChapters === 'function') renderChapters();
  }
}

// ═══════════════ SELECTOR DE MAZO (TIRADA) ═══════════════
function setupDeckSelector() {
  // Render card back SVGs in deck icons
  Object.keys(MAZOS).forEach(deck => {
    const el = document.getElementById(`deck-icon-${deck}`);
    if (el) {
      const svgStr = getCardBackSVG(deck);
      // Wrap SVG in a mini-card container
      el.innerHTML = svgStr;
    }
  });
  
  document.querySelectorAll('.deck-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.deck-option').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      mazoActual = btn.dataset.deck;
      showToast(`Mazo: ${MAZOS[mazoActual].nombre}`);
    });
  });
}

// ═══════════════ SELECTOR DE MAZO (REFERENCIA) ═══════════════
function setupRefDeckSelector() {
  document.querySelectorAll('.ref-deck-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ref-deck-option').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      mazoReferencia = btn.dataset.deck;
      // Sync practice deck selector
      const practiceDeckSelect = document.getElementById('practice-deck-select');
      if (practiceDeckSelect) practiceDeckSelect.value = mazoReferencia;
      loadCardsGrid();
      showToast(`Mazo: ${MAZOS[mazoReferencia].nombre}`);
    });
  });
}

// ═══════════════ INICIALIZAR REVERSOS ═══════════════
function initCardBacks() {
  ['rider', 'marsella', 'thoth', 'valle'].forEach(deck => {
    const container = document.getElementById(`ref-back-${deck}`);
    if (container) {
      container.innerHTML = getCardBackSVG(deck);
    }
  });
}

// ═══════════════ SELECTOR DE TIRADA ═══════════════
function setupSpreadSelector() {
  document.querySelectorAll('.spread-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.spread-option').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      tiradaActual = btn.dataset.spread;
      prepararFan();
    });
  });
}

// ═══════════════ FILTROS DE REFERENCIA ═══════════════
function setupFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      filterCards(btn.dataset.filter);
    });
  });
}

function filterCards(filter) {
  document.querySelectorAll('.card-item').forEach(card => {
    if (filter === 'todos' || card.dataset.palo === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ═══════════════ CARGAR GRID DE CARTAS ═══════════════
function loadCardsGrid() {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';
  
  TODAS_LAS_CARTAS.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'card-item';
    div.dataset.palo = carta.palo;
    div.dataset.id = carta.id;
    
    const paddedId = String(carta.id).padStart(2, '0');
    const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
    
    div.innerHTML = `
      <div class="card-item-img">
        <img src="${imgUrl}" alt="${carta.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="card-item-fallback" style="display:none;">${getCartaEmoji(carta)}</div>
      </div>
      <div class="card-item-name">${carta.nombre}</div>
    `;
    div.onclick = () => mostrarCarta(carta);
    grid.appendChild(div);
  });
}

function getCartaEmoji(carta) {
  if (carta.palo === 'mayor') return '🌟';
  if (carta.palo === 'copas') return '🏆';
  if (carta.palo === 'espadas') return '⚔️';
  if (carta.palo === 'bastos') return '🔥';
  if (carta.palo === 'oros') return '💰';
  return '🃏';
}

function getCardImageUrl(cartaId, deck) {
  const paddedId = String(cartaId).padStart(2, '0');
  
  // Para el mazo Marsella, usar JPG generados
  if (deck === 'marsella') {
    return `images/marsella/${paddedId}.jpg`;
  }
  
  // Para el resto, usar JPG
  return `images/${deck}/${paddedId}.jpg`;
}

// ═══════════════ MOSTRAR CARTA (MODAL) ═══════════════
let modalCartaState = { cartaId: null, invertida: false };

function mostrarCarta(carta) {
  modalCartaState = { cartaId: carta.id, invertida: false };
  
  const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
  const imgContainer = document.getElementById('modal-carta-img');
  
  imgContainer.innerHTML = `
    <img src="${imgUrl}" alt="${carta.nombre}" id="modal-carta-real-img"
         onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:4rem;\\'>${getCartaEmoji(carta)}</span>';">
  `;
  
  document.getElementById('modal-carta-nombre').textContent = carta.nombre;
  document.getElementById('modal-carta-palo').textContent = getNombrePalo(carta.palo);
  document.getElementById('modal-carta-upright').textContent = getSignificado(carta.id, mazoReferencia);
  document.getElementById('modal-carta-reversed').textContent = getSignificado(carta.id, mazoReferencia, true);
  
  const invertBtn = document.getElementById('modal-carta-invert-btn');
  if (invertBtn) {
    invertBtn.classList.remove('active');
    invertBtn.textContent = '🔄 Ver invertida';
  }
  
  document.getElementById('modal-carta').classList.remove('hidden');
}

function toggleModalInvert() {
  modalCartaState.invertida = !modalCartaState.invertida;
  const img = document.getElementById('modal-carta-real-img');
  const btn = document.getElementById('modal-carta-invert-btn');
  
  if (img) {
    img.classList.toggle('inverted', modalCartaState.invertida);
  }
  if (btn) {
    btn.classList.toggle('active', modalCartaState.invertida);
    btn.textContent = modalCartaState.invertida ? '🔄 Ver normal' : '🔄 Ver invertida';
  }
}

function getNombrePalo(palo) {
  if (palo === 'mayor') return 'Arcano Mayor';
  return PALOS[palo]?.nombre || palo;
}

function cerrarModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

// ═══════════════ FAN DE CARTAS ═══════════════
function prepararFan() {
  const fanContainer = document.getElementById('fan-cards');
  const cantidad = TIRADAS[tiradaActual].cantidad;
  
  cartasEnMazo = shuffleArray([...TODAS_LAS_CARTAS]);
  cartasSeleccionadas = [];
  
  const totalCards = 28;
  const backSVG = getCardBackSVG(mazoActual);
  
  animarBarajado(fanContainer, backSVG, () => {
    desplegarFanTirada(fanContainer, totalCards, backSVG);
  });
  
  prepararTablero(cantidad);
}

function desplegarFanTirada(container, totalCards, backSVG) {
  container.innerHTML = '';
  container.style.height = '180px';
  
  const cardWidth = 85;
  const overlap = 12;
  const totalWidth = (totalCards - 1) * (cardWidth - overlap) + cardWidth;
  
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.className = 'fan-card';
    card.style.zIndex = i;
    card.style.opacity = '0';
    
    const centerX = totalWidth / 2;
    const cardCenter = i * (cardWidth - overlap) + cardWidth / 2;
    const xFromCenter = cardCenter - centerX;
    const normalizedPos = xFromCenter / (totalWidth / 2);
    
    // Arco invertido: centro abajo (hacia el paño), bordes arriba
    const yOffset = Math.pow(Math.abs(normalizedPos), 1.5) * 55;
    const rotation = normalizedPos * 12;
    
    card.style.position = 'absolute';
    card.style.left = `${50 + (xFromCenter / totalWidth) * 100}%`;
    card.style.transform = `translateX(-50%) rotate(${rotation}deg) translateY(${yOffset}px)`;
    card.dataset.index = i;
    
    card.innerHTML = `<div class="fan-card-back">${backSVG}</div>`;
    card.onclick = () => seleccionarCarta(i);
    container.appendChild(card);
    
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: i * 0.03,
      ease: 'back.out(1.4)'
    });
  }
}

function seleccionarCarta(index) {
  const cantidad = TIRADAS[tiradaActual].cantidad;
  
  if (cartasSeleccionadas.length >= cantidad) {
    showToast('Ya tenés todas las cartas seleccionadas');
    return;
  }
  
  if (cartasSeleccionadas.includes(index)) {
    showToast('Esta carta ya fue seleccionada');
    return;
  }
  
  cartasSeleccionadas.push(index);
  
  // Animar carta seleccionada
  const fanCards = document.querySelectorAll('.fan-card');
  const card = fanCards[index];
  
  gsap.to(card, {
    y: -50,
    scale: 1.2,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });
  
  // Colocar en tablero
  colocarCartaEnTablero(cartasEnMazo[index], cartasSeleccionadas.length - 1);
  
  showToast(`Carta ${cartasSeleccionadas.length} de ${cantidad} seleccionada`);
  
  // Si completó la selección
  if (cartasSeleccionadas.length === cantidad) {
    setTimeout(() => {
      revelarTodasLasCartas();
    }, 500);
  }
}

// ═══════════════ TABLERO DE TIRADA ═══════════════
function prepararTablero(cantidad) {
  const board = document.getElementById('spread-board');
  board.innerHTML = '';
  
  const positions = getSpreadPositions(tiradaActual);
  
  positions.forEach((pos, i) => {
    const slot = document.createElement('div');
    slot.className = 'spread-position';
    slot.id = `slot-${i}`;
    slot.style.left = pos.x + '%';
    slot.style.top = pos.y + '%';
    slot.innerHTML = `
      <span class="spread-position-label">${pos.label}</span>
    `;
    board.appendChild(slot);
  });
}

function getSpreadPositions(tipo) {
  switch(tipo) {
    case 'una':
      return [{ x: 50, y: 50, label: 'Carta' }];
    case 'dos':
      return [
        { x: 25, y: 35, label: 'Tu energía' },
        { x: 75, y: 35, label: 'Su energía' },
        { x: 50, y: 72, label: 'Consejo' }
      ];
    case 'tres':
      return [
        { x: 20, y: 50, label: 'Pasado' },
        { x: 50, y: 50, label: 'Presente' },
        { x: 80, y: 50, label: 'Futuro' }
      ];
    case 'cruz':
      return [
        { x: 50, y: 25, label: 'Situación' },
        { x: 20, y: 50, label: 'Obstáculo' },
        { x: 80, y: 50, label: 'Consejo' },
        { x: 50, y: 75, label: 'Resultado' },
        { x: 50, y: 50, label: 'Fondo' }
      ];
    case 'amor':
      return [
        { x: 50, y: 12, label: 'Tú' },
        { x: 15, y: 32, label: 'Tu pareja' },
        { x: 85, y: 32, label: 'La relación' },
        { x: 25, y: 58, label: 'Deseos' },
        { x: 75, y: 58, label: 'Miedos' },
        { x: 30, y: 82, label: 'Pasado' },
        { x: 70, y: 82, label: 'Futuro' }
      ];
    case 'arbol':
      // Árbol de la Vida — 10 Sephirot
      return [
        { x: 50, y: 5, label: '1. Keter (Corona)' },     // Corona
        { x: 30, y: 18, label: '2. Chokmah (Sabiduría)' }, // Sabiduría
        { x: 70, y: 18, label: '3. Binah (Entendimiento)' }, // Entendimiento
        { x: 30, y: 38, label: '4. Chesed (Gracia)' },   // Gracia
        { x: 70, y: 38, label: '5. Gevurah (Severidad)' }, // Severidad
        { x: 50, y: 50, label: '6. Tiferet (Belleza)' },  // Belleza
        { x: 30, y: 65, label: '7. Netzach (Victoria)' }, // Victoria
        { x: 70, y: 65, label: '8. Hod (Esplendor)' },    // Esplendor
        { x: 50, y: 80, label: '9. Yesod (Cimiento)' },   // Cimiento
        { x: 50, y: 95, label: '10. Malkuth (Reino)' }    // Reino
      ];
    case 'celtica':
      return [
        { x: 50, y: 15, label: 'Presente' },
        { x: 50, y: 35, label: 'Desafío' },
        { x: 50, y: 55, label: 'Futuro' },
        { x: 15, y: 25, label: 'Pasado' },
        { x: 85, y: 25, label: 'Futuro cercano' },
        { x: 15, y: 65, label: 'Tú' },
        { x: 85, y: 65, label: 'Entorno' },
        { x: 50, y: 75, label: 'Esperanzas' },
        { x: 15, y: 88, label: 'Miedos' },
        { x: 85, y: 88, label: 'Resultado' }
      ];
    default:
      return [{ x: 50, y: 50, label: 'Carta' }];
  }
}

function colocarCartaEnTablero(carta, index) {
  const slot = document.getElementById(`slot-${index}`);
  if (!slot) return;
  
  const paddedId = String(carta.id).padStart(2, '0');
  const imgUrl = `images/${mazoActual}/${paddedId}.jpg`;
  const backSVG = getCardBackSVG(mazoActual);
  
  slot.classList.add('filled');
  slot.innerHTML = `
    <div class="revealed-card" id="card-${index}" onclick="mostrarCarta(TODAS_LAS_CARTAS.find(c => c.id === ${carta.id}))" title="Tocá para ver grande">
      <div class="card-face card-back">
        ${backSVG}
      </div>
      <div class="card-face card-front">
        <img src="${imgUrl}" alt="${carta.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="card-front-symbol" style="display:none;">${getCartaEmoji(carta)}</span>
        <span class="card-front-name">${carta.nombre}</span>
      </div>
    </div>
  `;
}

// ═══════════════ REVELAR CARTAS ═══════════════
function revelarTodasLasCartas() {
  const cantidad = cartasSeleccionadas.length;
  
  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      const card = document.getElementById(`card-${i}`);
      if (card) {
        card.classList.add('flipped');
      }
    }, i * 300);
  }
  
  // Mostrar interpretación después de las revelaciones
  setTimeout(() => {
    mostrarInterpretacion();
  }, cantidad * 300 + 500);
}

function mostrarInterpretacion() {
  const resultDiv = document.getElementById('reading-result');
  const cantidad = cartasSeleccionadas.length;
  
  let html = `<h3>📜 Tu Lectura</h3>`;
  
  const positions = getSpreadPositions(tiradaActual);
  
  for (let i = 0; i < cantidad; i++) {
    const carta = cartasEnMazo[cartasSeleccionadas[i]];
    const pos = positions[i] || { label: `Extra ${i - TIRADAS[tiradaActual].cantidad + 1}` };
    
    html += `
      <div class="reading-card-info">
        <h4 class="reading-card-name">${getCartaEmoji(carta)} ${carta.nombre}</h4>
        <p class="reading-card-position">${pos.label}</p>
        <p class="reading-card-meaning">${getSignificado(carta.id, mazoActual)}</p>
      </div>
    `;
  }
  
  html += `
    <div class="reading-combined">
      <h4>🔮 Interpretación Combinada</h4>
      <p>${generarInterpretacionCombinada()}</p>
    </div>
  `;
  
  if (cartasSeleccionadas.length < 10) {
    const restantes = 28 - cartasSeleccionadas.length;
    html += `
      <button class="btn-secondary" onclick="seguirTirando()" style="margin-top: 1rem;">
        ✚ Seguir tirando una carta más
      </button>
    `;
  }
  
  html += `
    <button class="btn-primary" onclick="guardarLectura()" style="margin-top: 0.5rem;">
      💾 Guardar Lectura
    </button>
  `;
  
  resultDiv.innerHTML = html;
  resultDiv.classList.add('visible');
  
  // Scroll al resultado
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function generarInterpretacionCombinada() {
  const cantidad = cartasSeleccionadas.length;
  const positions = getSpreadPositions(tiradaActual);
  let resumen = [];
  for (let i = 0; i < cantidad; i++) {
    const carta = cartasEnMazo[cartasSeleccionadas[i]];
    const label = positions[i] ? positions[i].label : `Extra ${i - TIRADAS[tiradaActual].cantidad + 1}`;
    resumen.push(`${label}: ${carta.nombre}`);
  }
  return `Esta tirada combina: ${resumen.join(', ')}. ` +
    `La narrativa general surge de cómo estas cartas se relacionan entre sí, ` +
    `creando una historia única para tu consulta. Reflexioná sobre el mensaje ` +
    `de cada posición y cómo se conectan entre ellas.`;
}

function seguirTirando() {
  const cantidad = TIRADAS[tiradaActual].cantidad;
  const fanCards = document.querySelectorAll('.fan-card');
  const disponibles = [];
  fanCards.forEach((card, idx) => {
    if (!cartasSeleccionadas.includes(idx)) disponibles.push(idx);
  });
  if (disponibles.length === 0) {
    showToast('No quedan más cartas disponibles');
    return;
  }
  const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];
  cartasSeleccionadas.push(elegido);
  
  // Crear slot dinámico si excede la cantidad original
  const board = document.getElementById('spread-board');
  const nuevoIndex = cartasSeleccionadas.length - 1;
  if (nuevoIndex >= cantidad) {
    const slot = document.createElement('div');
    slot.className = 'spread-position';
    slot.id = `slot-${nuevoIndex}`;
    slot.style.left = `${10 + (nuevoIndex - cantidad) * 12}%`;
    slot.style.bottom = '5%';
    slot.innerHTML = `<span class="spread-position-label">Extra ${nuevoIndex - cantidad + 1}</span>`;
    board.appendChild(slot);
  }
  
  colocarCartaEnTablero(cartasEnMazo[elegido], nuevoIndex);
  
  const slot = document.getElementById(`slot-${nuevoIndex}`);
  if (slot) {
    setTimeout(() => {
      slot.classList.add('filled');
      const revealed = slot.querySelector('.revealed-card');
      if (revealed) revealed.classList.add('flipped');
    }, 100);
  }
  
  setTimeout(() => {
    mostrarInterpretacion();
  }, 600);
}

// ═══════════════ INICIAR TIRADA ═══════════════
function iniciarTirada() {
  prepararFan();
  showToast('Tocá las cartas del abanico para seleccionar');
}

// ═══════════════ GUARDAR LECTURA ═══════════════
function guardarLectura() {
  const lectura = {
    fecha: new Date().toLocaleString(),
    mazo: MAZOS[mazoActual].nombre,
    tirada: TIRADAS[tiradaActual].nombre,
    cartas: cartasSeleccionadas.map((idx, i) => ({
      nombre: cartasEnMazo[idx].nombre,
      posicion: getSpreadPositions(tiradaActual)[i].label
    }))
  };
  
  const diario = JSON.parse(localStorage.getItem('tarot_diario') || '[]');
  diario.unshift(lectura);
  localStorage.setItem('tarot_diario', JSON.stringify(diario));
  
  showToast('Lectura guardada en tu diario');
  loadRecentReadings();
}

function loadRecentReadings() {
  const diario = JSON.parse(localStorage.getItem('tarot_diario') || '[]');
  const container = document.getElementById('recent-readings');
  
  if (diario.length === 0) {
    container.innerHTML = '<p class="empty-state">Aún no tenés lecturas guardadas</p>';
    return;
  }
  
  container.innerHTML = diario.slice(0, 5).map(lectura => `
    <div class="reading-card-info" style="margin-bottom: 0.5rem;">
      <p style="font-size: 0.8rem; color: var(--text-muted);">${lectura.fecha}</p>
      <p style="font-size: 0.9rem;">${lectura.tirada} — ${lectura.mazo}</p>
      <p style="font-size: 0.8rem; color: var(--text-dim);">${lectura.cartas.map(c => c.nombre).join(', ')}</p>
    </div>
  `).join('');
}

// ═══════════════ CARTA DEL DÍA ═══════════════
function revelarCartaDiaria() {
  const diaria = localStorage.getItem('tarot_carta_diaria');
  const fechaHoy = new Date().toDateString();
  
  if (diaria) {
    const data = JSON.parse(diaria);
    if (data.fecha === fechaHoy) {
      // Ya está revelada — abrir zoom
      const carta = TODAS_LAS_CARTAS.find(c => c.id === data.cartaId);
      if (carta) mostrarCarta(carta);
      return;
    }
  }
  
  const randomIndex = Math.floor(Math.random() * TODAS_LAS_CARTAS.length);
  const carta = TODAS_LAS_CARTAS[randomIndex];
  
  localStorage.setItem('tarot_carta_diaria', JSON.stringify({
    fecha: fechaHoy,
    cartaId: carta.id,
    mazo: mazoReferencia
  }));
  
  const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
  const flipBack = document.getElementById('daily-flip-back');
  const flipper = document.getElementById('daily-flipper');
  const dailyText = document.getElementById('daily-card-text');
  
  flipBack.innerHTML = `<img src="${imgUrl}" alt="${carta.nombre}">`;
  flipper.classList.add('flipped');
  dailyText.textContent = carta.nombre + ' — Tocá para ver';
}

// ═══════════════ LECCIONES ═══════════════
let lessonState = {
  tipo: '',
  cartas: [],
  indice: 0,
  dominadas: JSON.parse(localStorage.getItem('tarot_dominadas') || '[]')
};

function iniciarLeccion(tipo) {
  lessonState.tipo = tipo;
  lessonState.indice = 0;
  
  switch(tipo) {
    case 'arcanos-mayores':
      lessonState.cartas = ARCANOS_MAYORES;
      break;
    case 'copas':
      lessonState.cartas = TODAS_LAS_CARTAS.filter(c => c.palo === 'copas');
      break;
    case 'espadas':
      lessonState.cartas = TODAS_LAS_CARTAS.filter(c => c.palo === 'espadas');
      break;
    case 'bastos':
      lessonState.cartas = TODAS_LAS_CARTAS.filter(c => c.palo === 'bastos');
      break;
    case 'oros':
      lessonState.cartas = TODAS_LAS_CARTAS.filter(c => c.palo === 'oros');
      break;
    default:
      lessonState.cartas = TODAS_LAS_CARTAS;
  }
  
  // Ocultar lecciones y quizzes, mostrar práctica
  const lessonsSection = document.getElementById('lessons-section');
  const quizzesSection = document.getElementById('quizzes-section');
  const progressSection = document.querySelector('.learning-progress');
  
  if (lessonsSection) lessonsSection.classList.add('hidden');
  if (quizzesSection) quizzesSection.classList.add('hidden');
  if (progressSection) progressSection.classList.add('hidden');
  
  mostrarLeccion();
}

function mostrarLeccion() {
  if (lessonState.indice >= lessonState.cartas.length) {
    completarLeccion();
    return;
  }
  
  const carta = lessonState.cartas[lessonState.indice];
  const content = document.getElementById('practice-content');
  const title = document.getElementById('practice-title');
  
  title.textContent = getLessonTitle(lessonState.tipo);
  document.getElementById('practice-area').classList.remove('hidden');
  
  const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
  const isDominada = lessonState.dominadas.includes(carta.id);
  
  content.innerHTML = `
    <div class="lesson-card-detail">
      <div class="lesson-card-header">
        <span class="lesson-card-number">${lessonState.indice + 1} / ${lessonState.cartas.length}</span>
        ${isDominada ? '<span class="lesson-dominada-badge">⭐ Dominada</span>' : ''}
      </div>
      
      <div class="lesson-card-img" onclick="mostrarCarta(TODAS_LAS_CARTAS.find(c => c.id === ${carta.id}))" style="cursor:pointer;" title="Tocá para ver grande">
        <img src="${imgUrl}" alt="${carta.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="lesson-card-fallback" style="display:none;">${getCartaEmoji(carta)}</div>
      </div>
      
      <h3 class="lesson-card-name">${carta.nombre}</h3>
      <p class="lesson-card-en">${carta.nombre_en}</p>
      
      <div class="lesson-significado">
        <h4>⬆️ Significado Upright</h4>
        <p>${getSignificado(carta.id, mazoReferencia)}</p>
      </div>
      
      <div class="lesson-significado">
        <h4>⬇️ Significado Reversed</h4>
        <p>${getSignificado(carta.id, mazoReferencia, true)}</p>
      </div>
      
      <div class="lesson-actions">
        <button class="btn-lesson btn-dominar" onclick="marcarDominada(${carta.id})">
          ${isDominada ? '✅ Ya la dominás' : '⭐ Marcar como dominada'}
        </button>
        <button class="btn-lesson btn-siguiente" onclick="siguienteCartaLeccion()">
          Siguiente →
        </button>
      </div>
    </div>
  `;
}

function getLessonTitle(tipo) {
  switch(tipo) {
    case 'arcanos-mayores': return '🌟 Arcanos Mayores';
    case 'copas': return '🏆 Palo de Copas';
    case 'espadas': return '⚔️ Palo de Espadas';
    case 'bastos': return '🔥 Palo de Bastos';
    case 'oros': return '💰 Palo de Oros';
    default: return '📖 Lección';
  }
}

function marcarDominada(cartaId) {
  if (!lessonState.dominadas.includes(cartaId)) {
    lessonState.dominadas.push(cartaId);
    localStorage.setItem('tarot_dominadas', JSON.stringify(lessonState.dominadas));
    registrarPractica();
    checkAchievements();
    if (typeof addXp === 'function') addXp(XP_REWARDS.carta_dominada);
  } else {
    lessonState.dominadas = lessonState.dominadas.filter(id => id !== cartaId);
    localStorage.setItem('tarot_dominadas', JSON.stringify(lessonState.dominadas));
    showToast('Carta desmarcada');
  }
  mostrarLeccion();
  actualizarProgreso();
}

function siguienteCartaLeccion() {
  lessonState.indice++;
  mostrarLeccion();
}

function completarLeccion() {
  const content = document.getElementById('practice-content');
  content.innerHTML = `
    <div class="lesson-complete">
      <div class="lesson-complete-icon">🎉</div>
      <h3>¡Lección Completada!</h3>
      <p>Revisaste todas las cartas de esta lección.</p>
      <button class="btn-primary" onclick="cerrarPractica()">Volver</button>
    </div>
  `;
}

function actualizarProgreso() {
  // Update lesson progress bars
  const lessons = {
    'arcanos-mayores': ARCANOS_MAYORES,
    'copas': TODAS_LAS_CARTAS.filter(c => c.palo === 'copas'),
    'espadas': TODAS_LAS_CARTAS.filter(c => c.palo === 'espadas'),
    'bastos': TODAS_LAS_CARTAS.filter(c => c.palo === 'bastos'),
    'oros': TODAS_LAS_CARTAS.filter(c => c.palo === 'oros')
  };
  
  let totalDominadas = 0;
  let totalCartas = 0;
  
  Object.entries(lessons).forEach(([tipo, cartas]) => {
    const dominadas = cartas.filter(c => lessonState.dominadas.includes(c.id)).length;
    const percent = Math.round((dominadas / cartas.length) * 100);
    totalDominadas += dominadas;
    totalCartas += cartas.length;
    
    // Update progress bar in lesson list
    const lessonCard = document.querySelector(`.lesson-card[data-lesson="${tipo}"]`);
    if (lessonCard) {
      const bar = lessonCard.querySelector('.lesson-progress-bar');
      if (bar) bar.style.width = percent + '%';
    }
  });
  
  // Update stats
  document.getElementById('learned-count').textContent = totalDominadas;
  document.getElementById('mastered-count').textContent = lessonState.dominadas.length;
  const accuracy = totalCartas > 0 ? Math.round((totalDominadas / totalCartas) * 100) : 0;
  document.getElementById('accuracy-percent').textContent = accuracy + '%';
}

// ═══════════════ PRÁCTICA (Duolingo-style) ═══════════════
let practiceState = {
  tipo: '',
  cartas: [],
  indice: 0,
  correctas: 0,
  total: 0,
  opciones: [],
  timer: null,
  timeLeft: 30
};

function iniciarPractica(tipo) {
  // Clear any existing timer
  if (practiceState.timer) {
    clearInterval(practiceState.timer);
    practiceState.timer = null;
  }
  
  practiceState.tipo = tipo;
  practiceState.indice = 0;
  practiceState.correctas = 0;
  practiceState.total = 10;
  practiceState.cartas = shuffleArray([...TODAS_LAS_CARTAS]).slice(0, 10);
  practiceState.timeLeft = 30;
  
  const lessonsSection = document.getElementById('lessons-section');
  const quizzesSection = document.getElementById('quizzes-section');
  const progressSection = document.querySelector('.learning-progress');
  
  if (lessonsSection) lessonsSection.classList.add('hidden');
  if (quizzesSection) quizzesSection.classList.add('hidden');
  if (progressSection) progressSection.classList.add('hidden');
  
  document.getElementById('practice-area').classList.remove('hidden');
  document.getElementById('practice-title').textContent = getPracticeTitle(tipo);
  document.getElementById('practice-score').textContent = `0/${practiceState.total}`;
  document.getElementById('practice-next').textContent = 'Siguiente';
  document.getElementById('practice-next').onclick = () => siguientePregunta();
  
  // Timer for quiz rápido
  const timerEl = document.getElementById('practice-timer');
  if (tipo === 'rapido') {
    timerEl.classList.remove('hidden');
    timerEl.textContent = '⏱ 30s';
    practiceState.timeLeft = 30;
    practiceState.timer = setInterval(() => {
      practiceState.timeLeft--;
      timerEl.textContent = `⏱ ${practiceState.timeLeft}s`;
      if (practiceState.timeLeft <= 10) {
        timerEl.style.color = '#e74c3c';
      }
      if (practiceState.timeLeft <= 0) {
        clearInterval(practiceState.timer);
        practiceState.timer = null;
        mostrarResultadoFinal();
      }
    }, 1000);
  } else {
    timerEl.classList.add('hidden');
  }
  
  mostrarPregunta();
}

function getPracticeTitle(tipo) {
  switch(tipo) {
    case 'significado': return 'Conectá carta con significado';
    case 'identificar': return 'Identificá la carta';
    case 'inversa': return 'Upright o Reversed';
    case 'rapido': return 'Quiz Rápido';
    default: return 'Práctica';
  }
}

// ─── Generador de preguntas ───
function mostrarPregunta() {
  if (practiceState.indice >= practiceState.total) {
    mostrarResultadoFinal();
    return;
  }
  
  const carta = practiceState.cartas[practiceState.indice];
  const content = document.getElementById('practice-content');
  
  // Quiz rápido mezcla todos los tipos, los demás usan su tipo específico
  let qType;
  if (practiceState.tipo === 'rapido') {
    const questionTypes = ['carta_a_significado', 'significado_a_carta', 'nombre_a_carta', 'upright_o_reversed'];
    qType = questionTypes[practiceState.indice % questionTypes.length];
  } else {
    // Mapear tipo de botón a tipo de pregunta
    const typeMap = {
      'significado': 'carta_a_significado',
      'identificar': 'significado_a_carta',
      'inversa': 'upright_o_reversed'
    };
    qType = typeMap[practiceState.tipo] || 'carta_a_significado';
  }
  
  switch(qType) {
    case 'carta_a_significado':
      quizCartaASignificado(carta, content);
      break;
    case 'significado_a_carta':
      quizSignificadoACarta(carta, content);
      break;
    case 'nombre_a_carta':
      quizNombreACarta(carta, content);
      break;
    case 'upright_o_reversed':
      quizUprightOReversed(carta, content);
      break;
  }
  
  updateScore();
}

// ─── Tipo 1: Mostrá la CARTA, elegí el SIGNIFICADO ───
function quizCartaASignificado(carta, content) {
  const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
  const significadoActual = getSignificado(carta.id, mazoReferencia);
  
  const samePalo = TODAS_LAS_CARTAS.filter(c => c.palo === carta.palo && c.id !== carta.id);
  const otherPalo = TODAS_LAS_CARTAS.filter(c => c.palo !== carta.palo && c.id !== carta.id);
  const wrongFromSame = shuffleArray(samePalo).slice(0, 2).map(c => getSignificado(c.id, mazoReferencia));
  const wrongFromOther = shuffleArray(otherPalo).slice(0, 1).map(c => getSignificado(c.id, mazoReferencia));
  const allOptions = shuffleArray([significadoActual, ...wrongFromSame, ...wrongFromOther]);
  
  content.innerHTML = `
    <div class="practice-card-display">
      <p class="practice-instruction">¿Qué significa esta carta?</p>
      <div class="practice-card-img">
        <img src="${imgUrl}" alt="${carta.nombre}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="practice-img-fallback" style="display:none;font-size:3rem;align-items:center;justify-content:center;height:100%;">${getCartaEmoji(carta)}</span>
      </div>
      <p class="practice-card-label">${carta.nombre}</p>
    </div>
    <div class="practice-options-grid">
      ${allOptions.map(opt => `
        <button class="practice-option" data-answer="${opt === significadoActual ? 'correct' : 'wrong'}" onclick="verificarQuiz(this)">${opt}</button>
      `).join('')}
    </div>
  `;
}

// ─── Tipo 2: Mostrá el SIGNIFICADO, elegí la CARTA ───
function quizSignificadoACarta(carta, content) {
  const significadoActual = getSignificado(carta.id, mazoReferencia);
  const wrongCards = getWrongCards(carta, 3);
  const allCards = shuffleArray([carta, ...wrongCards]);
  
  content.innerHTML = `
    <div class="practice-card-display">
      <p class="practice-instruction">¿Qué carta es?</p>
      <div class="practice-meaning-box">
        <p class="practice-meaning-text">"${significadoActual}"</p>
      </div>
    </div>
    <div class="practice-options-grid">
      ${allCards.map(c => `
        <button class="practice-option" data-answer="${c.id === carta.id ? 'correct' : 'wrong'}" onclick="verificarQuiz(this)">
          <span style="font-size:1.1rem; margin-right:0.3rem;">${getCartaEmoji(c)}</span> ${c.nombre}
        </button>
      `).join('')}
    </div>
  `;
}

// ─── Tipo 3: Mostrá el NOMBRE, elegí la IMAGEN ───
function quizNombreACarta(carta, content) {
  const wrongCards = getWrongCards(carta, 3);
  const allCards = shuffleArray([carta, ...wrongCards]);
  
  content.innerHTML = `
    <div class="practice-card-display">
      <p class="practice-instruction">¿Cómo se ve esta carta?</p>
      <h3 class="practice-card-name">${carta.nombre}</h3>
    </div>
    <div class="practice-options-images">
      ${allCards.map(c => {
        const img = getCardImageUrl(c.id, mazoReferencia);
        const emoji = getCartaEmoji(c);
        return `
          <button class="practice-option-img" data-answer="${c.id === carta.id ? 'correct' : 'wrong'}" onclick="verificarQuiz(this)">
            <img src="${img}" alt="${c.nombre}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="practice-img-fallback" style="display:none;font-size:2rem;align-items:center;justify-content:center;height:100%;">${emoji}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

// ─── Tipo 4: CARTA + SIGNIFICADO → ¿Upright o Reversed? ───
function quizUprightOReversed(carta, content) {
  const imgUrl = getCardImageUrl(carta.id, mazoReferencia);
  const significadoActual = getSignificado(carta.id, mazoReferencia);
  const isInverted = Math.random() > 0.5;
  const significadoReversed = getSignificadoReversed(carta.id, mazoReferencia);
  
  content.innerHTML = `
    <div class="practice-card-display">
      <p class="practice-instruction">¿Esta carta está derecha o invertida?</p>
      <div class="practice-card-img" style="${isInverted ? 'transform: rotate(180deg);' : ''}">
        <img src="${imgUrl}" alt="${carta.nombre}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="practice-img-fallback" style="display:none;font-size:3rem;align-items:center;justify-content:center;height:100%;">${getCartaEmoji(carta)}</span>
      </div>
      <p class="practice-card-label">${carta.nombre}</p>
      <div class="practice-meaning-box" style="margin-top:0.8rem;">
        <p class="practice-meaning-text">"${isInverted ? significadoReversed : significadoActual}"</p>
      </div>
    </div>
    <div class="practice-options-grid" style="grid-template-columns: 1fr 1fr;">
      <button class="practice-option" data-answer="${!isInverted ? 'correct' : 'wrong'}" onclick="verificarQuiz(this)">
        ⬆️ Derecha
      </button>
      <button class="practice-option" data-answer="${isInverted ? 'correct' : 'wrong'}" onclick="verificarQuiz(this)">
        🔄 Invertida
      </button>
    </div>
  `;
}

// ─── Verificación unificada ───
function verificarQuiz(btn) {
  const container = btn.closest('.practice-options-grid') || btn.closest('.practice-options-images');
  if (!container) return;
  const options = container.querySelectorAll('.practice-option, .practice-option-img');
  options.forEach(opt => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
    if (opt.dataset.answer === 'correct') {
      opt.classList.add('correct');
    }
  });
  
  if (btn.dataset.answer === 'correct') {
    btn.classList.add('correct');
    practiceState.correctas++;
  } else {
    btn.classList.add('wrong');
  }
  
  practiceState.indice++;
  updateScore();
}

function updateScore() {
  document.getElementById('practice-score').textContent = `${practiceState.correctas}/${practiceState.total}`;
}

function siguientePregunta() {
  mostrarPregunta();
}

function mostrarResultadoFinal() {
  // Clear timer
  if (practiceState.timer) {
    clearInterval(practiceState.timer);
    practiceState.timer = null;
  }
  
  const content = document.getElementById('practice-content');
  const percentage = Math.round((practiceState.correctas / practiceState.total) * 100);
  
  // Achievement hooks
  if (typeof incrementarQuizzes === 'function') {
    incrementarQuizzes();
    actualizarMejorPuntuacion(practiceState.correctas);
    registrarPractica();
    checkAchievements();
  }
  
  // XP rewards
  if (typeof addXp === 'function') {
    addXp(XP_REWARDS.quiz_completado);
    if (percentage === 100) addXp(XP_REWARDS.quiz_perfecto);
  }
  
  content.innerHTML = `
    <div class="practice-result">
      <div class="result-icon">${percentage >= 70 ? '🎉' : '📚'}</div>
      <h3 class="result-title">${percentage >= 70 ? '¡Excelente!' : 'Seguí practicando'}</h3>
      <p class="result-score">${practiceState.correctas}/${practiceState.total} (${percentage}%)</p>
      <p class="result-message">${getResultMessage(percentage)}</p>
    </div>
  `;
  
  document.getElementById('practice-timer').classList.add('hidden');
  document.getElementById('practice-timer').style.color = '';
  document.getElementById('practice-next').textContent = 'Volver a Intentar';
  document.getElementById('practice-next').onclick = () => {
    document.getElementById('practice-area').classList.add('hidden');
    const lessonsSection = document.getElementById('lessons-section');
    const quizzesSection = document.getElementById('quizzes-section');
    const progressSection = document.querySelector('.learning-progress');
    if (lessonsSection) lessonsSection.classList.remove('hidden');
    if (quizzesSection) quizzesSection.classList.remove('hidden');
    if (progressSection) progressSection.classList.remove('hidden');
  };
}

function getResultMessage(percentage) {
  if (percentage >= 90) return '¡Dominás las cartas! Sos un verdadero vidente.';
  if (percentage >= 70) return 'Muy bien. Seguí así y serás un maestro.';
  if (percentage >= 50) return 'No está mal. Repasá las cartas que fallaste.';
  return 'Tranquilo, el tarot toma tiempo. ¡Seguí practicando!';
}

function getWrongCards(carta, count) {
  return TODAS_LAS_CARTAS
    .filter(c => c.id !== carta.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// ═══════════════ PRÁCTICA DE LECTURA (con fan) ═══════════════
let lecturaState = {
  tipo: 'una',
  indice: 0,
  correctas: 0,
  total: 0,
  lecturas: [],
  escenarioActual: null,
  cartasSeleccionadas: [],
  seleccionando: false
};

function iniciarLectura(tipo) {
  if (practiceState.timer) {
    clearInterval(practiceState.timer);
    practiceState.timer = null;
  }
  
  lecturaState.tipo = tipo || 'una';
  lecturaState.indice = 0;
  lecturaState.correctas = 0;
  lecturaState.total = 5; // 5 escenarios por sesión
  lecturaState.lecturas = generarEscenariosLectura(lecturaState.tipo, lecturaState.total);
  if (!lecturaState.lecturas || lecturaState.lecturas.length === 0) {
    showToast('Tipo de tirada no disponible');
    return;
  }
  lecturaState.cartasSeleccionadas = [];
  
  // Navegar a pantalla de lectura
  document.querySelectorAll('.pantalla').forEach(p => {
    p.classList.remove('activa');
    p.classList.add('hidden');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('activa'));
  const lecturaScreen = document.getElementById('pantalla-lectura');
  lecturaScreen.classList.remove('hidden');
  lecturaScreen.classList.add('activa');
  document.getElementById('lectura-title').textContent = `🔮 ${TIRADAS[lecturaState.tipo]?.nombre || 'Una Carta'}`;
  document.getElementById('lectura-score').textContent = `0/${lecturaState.total}`;
  
  mostrarEscenarioLectura();
}

function mostrarEscenarioLectura() {
  if (lecturaState.indice >= lecturaState.total) {
    mostrarResultadoLectura();
    return;
  }
  
  const escenario = lecturaState.lecturas[lecturaState.indice];
  lecturaState.escenarioActual = escenario;
  lecturaState.cartasSeleccionadas = [];
  lecturaState.seleccionando = true;
  
  const numCartas = escenario.cartas.length;
  
  // Mostrar instrucción
  document.getElementById('lectura-instruction').textContent = `Elegí ${numCartas} carta${numCartas > 1 ? 's' : ''} del abanico`;
  document.getElementById('lectura-instruction').classList.remove('hidden');
  document.getElementById('lectura-question-area').classList.add('hidden');
  document.getElementById('lectura-explanation').classList.add('hidden');
  document.getElementById('lectura-next').classList.add('hidden');
  
  // Preparar tablero
  prepararTableroLectura(numCartas);
  
  // Preparar fan con cartas del pool
  prepararFanLectura(escenario);
}

function prepararTableroLectura(cantidad) {
  const board = document.getElementById('lectura-board');
  board.innerHTML = '';
  
  const posiciones = getPosicionesLectura(lecturaState.tipo);
  
  posiciones.forEach((pos, i) => {
    const slot = document.createElement('div');
    slot.className = 'spread-position';
    slot.id = `lectura-slot-${i}`;
    slot.style.left = pos.x + '%';
    slot.style.top = pos.y + '%';
    slot.innerHTML = `
      <span class="spread-position-label">${pos.label}</span>
    `;
    board.appendChild(slot);
  });
}

function prepararFanLectura(escenario) {
  const fanContainer = document.getElementById('lectura-fan');
  fanContainer.innerHTML = '';
  
  const totalFanCards = 21;
  const backSVG = getCardBackSVG(mazoReferencia);
  
  // Mezclar todas las cartas para el fan
  const todasCartas = shuffleArray([...TODAS_LAS_CARTAS]);
  const cartasParaFan = todasCartas.slice(0, totalFanCards);
  
  // Animación de barajado primero
  animarBarajado(fanContainer, backSVG, () => {
    // Después del barajado, desplegar abanico
    desplegarFanLectura(fanContainer, totalFanCards, backSVG, cartasParaFan, escenario);
  });
}

function animarBarajado(container, backSVG, callback) {
  container.innerHTML = '';
  container.style.height = '120px';
  
  // Dos pilas de cartas
  const pileLeft = document.createElement('div');
  const pileRight = document.createElement('div');
  pileLeft.className = 'shuffle-pile';
  pileRight.className = 'shuffle-pile';
  
  const numCards = 10;
  
  for (let i = 0; i < numCards; i++) {
    const cardL = document.createElement('div');
    cardL.className = 'shuffle-card';
    cardL.innerHTML = backSVG;
    cardL.style.transform = `translateY(${-i * 2}px)`;
    pileLeft.appendChild(cardL);
    
    const cardR = document.createElement('div');
    cardR.className = 'shuffle-card';
    cardR.innerHTML = backSVG;
    cardR.style.transform = `translateY(${-i * 2}px)`;
    pileRight.appendChild(cardR);
  }
  
  container.appendChild(pileLeft);
  container.appendChild(pileRight);
  
  // Animación de barajado
  const tl = gsap.timeline({ onComplete: callback });
  
  // Separar las pilas
  tl.to(pileLeft, { x: -60, duration: 0.3, ease: 'power2.out' });
  tl.to(pileRight, { x: 60, duration: 0.3, ease: 'power2.out' }, '<');
  
  // Mezclar (3 veces)
  for (let i = 0; i < 3; i++) {
    tl.to(pileLeft, { x: 20, duration: 0.15, ease: 'power2.inOut' });
    tl.to(pileRight, { x: -20, duration: 0.15, ease: 'power2.inOut' }, '<');
    tl.to(pileLeft, { x: -20, duration: 0.15, ease: 'power2.inOut' });
    tl.to(pileRight, { x: 20, duration: 0.15, ease: 'power2.inOut' }, '<');
  }
  
  // Unir las pilas
  tl.to(pileLeft, { x: 0, duration: 0.2, ease: 'power2.inOut' });
  tl.to(pileRight, { x: 0, duration: 0.2, ease: 'power2.inOut' }, '<');
  
  // Fade out
  tl.to([pileLeft, pileRight], { opacity: 0, duration: 0.3 });
}

function desplegarFanLectura(container, totalCards, backSVG, cartasParaFan, escenario) {
  container.innerHTML = '';
  container.style.height = '180px';
  
  const cardWidth = 85;
  const overlap = 12;
  const totalWidth = (totalCards - 1) * (cardWidth - overlap) + cardWidth;
  
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.className = 'fan-card';
    card.style.zIndex = i;
    card.style.opacity = '0';
    
    const centerX = totalWidth / 2;
    const cardCenter = i * (cardWidth - overlap) + cardWidth / 2;
    const xFromCenter = cardCenter - centerX;
    const normalizedPos = xFromCenter / (totalWidth / 2);
    const yOffset = Math.pow(Math.abs(normalizedPos), 1.5) * 55;
    const rotation = normalizedPos * 12;
    
    card.style.position = 'absolute';
    card.style.left = `${50 + (xFromCenter / totalWidth) * 100}%`;
    card.style.transform = `translateX(-50%) rotate(${rotation}deg) translateY(${yOffset}px)`;
    card.dataset.index = i;
    
    card.innerHTML = `<div class="fan-card-back">${backSVG}</div>`;
    card.onclick = () => seleccionarCartaLectura(i, cartasParaFan[i]);
    container.appendChild(card);
    
    // Animación staggered
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: i * 0.03,
      ease: 'back.out(1.4)'
    });
  }
}

function seleccionarCartaLectura(index, cartaReal) {
  if (!lecturaState.seleccionando) return;
  if (lecturaState.cartasSeleccionadas.length >= lecturaState.escenarioActual.cartas.length) return;
  if (lecturaState.cartasSeleccionadas.find(s => s.index === index)) return;
  
  const numSeleccionadas = lecturaState.cartasSeleccionadas.length;
  const escenario = lecturaState.escenarioActual;
  
  // Asignar la carta real del escenario a esta posición
  const cartaAsignada = escenario.cartas[numSeleccionadas];
  const invertida = escenario.invertidas[numSeleccionadas];
  
  lecturaState.cartasSeleccionadas.push({ index, cartaReal: cartaAsignada, invertida });
  
  // Animar carta seleccionada
  const fanCards = document.querySelectorAll('.lectura-fan .fan-card');
  const card = fanCards[index];
  
  gsap.to(card, {
    y: -50,
    scale: 1.2,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });
  
  // Colocar en tablero
  colocarCartaEnTableroLectura(cartaAsignada, invertida, numSeleccionadas);
  
  showToast(`Carta ${numSeleccionadas + 1} de ${escenario.cartas.length} seleccionada`);
  
  // Si completó la selección
  if (lecturaState.cartasSeleccionadas.length === escenario.cartas.length) {
    lecturaState.seleccionando = false;
    setTimeout(() => {
      mostrarPreguntaLectura();
    }, 800);
  }
}

function colocarCartaEnTableroLectura(cartaId, invertida, posicion) {
  const slot = document.getElementById(`lectura-slot-${posicion}`);
  if (!slot) return;
  
  const carta = TODAS_LAS_CARTAS.find(c => c.id === cartaId);
  const imgUrl = getCardImageUrl(cartaId, mazoReferencia);
  
  slot.innerHTML = `
    <div class="spread-card" style="${invertida ? 'transform: rotate(180deg);' : ''}" onclick="mostrarCarta(TODAS_LAS_CARTAS.find(c => c.id === ${cartaId}))" title="Tocá para ver grande">
      <img src="${imgUrl}" alt="${carta?.nombre}" onerror="this.style.display='none';">
    </div>
    <span class="spread-position-label">${lecturaState.escenarioActual.posiciones[posicion]}${invertida ? ' 🔄' : ''}</span>
  `;
  
  gsap.from(slot, {
    scale: 0,
    rotation: 360,
    duration: 0.5,
    ease: 'back.out(1.7)'
  });
}

function mostrarPreguntaLectura() {
  const escenario = lecturaState.escenarioActual;
  
  // Ocultar fan e instrucción
  document.getElementById('lectura-instruction').classList.add('hidden');
  document.getElementById('lectura-fan').innerHTML = '';
  
  // Mostrar pregunta
  const questionArea = document.getElementById('lectura-question-area');
  questionArea.classList.remove('hidden');
  
  document.getElementById('lectura-question').textContent = escenario.pregunta;
  
  const opcionesContainer = document.getElementById('lectura-options');
  opcionesContainer.innerHTML = '';
  
  const opcionesShuffled = shuffleArray([...escenario.opciones]);
  opcionesShuffled.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'lectura-option';
    btn.dataset.correct = opt.correcta;
    // Formatear texto con saltos de línea para lecturas multi-carta
    const textoFormateado = opt.texto
      .replace(/\. (Tu energía|Su energía|Pasado|Presente|Futuro|Situación|Obstáculo|Consejo|Lo que viene|Resultado|Conexión)/g, '<br><br>$1')
      .replace(/^/, '');
    btn.innerHTML = textoFormateado;
    btn.onclick = () => verificarLectura(btn, opt.correcta);
    opcionesContainer.appendChild(btn);
  });
}

function verificarLectura(btn, esCorrecta) {
  const options = document.querySelectorAll('#lectura-options .lectura-option');
  options.forEach(opt => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
    if (opt.dataset.correct === 'true') {
      opt.classList.add('correct');
    }
  });
  
  if (esCorrecta) {
    btn.classList.add('correct');
    lecturaState.correctas++;
  } else {
    btn.classList.add('wrong');
  }
  
  // Mostrar explicación
  const escenario = lecturaState.escenarioActual;
  const explicacion = document.getElementById('lectura-explanation');
  explicacion.innerHTML = `
    <h4>📖 ¿Por qué?</h4>
    <p>${escenario.explicacion}</p>
  `;
  explicacion.classList.remove('hidden');
  
  // Mostrar botón siguiente
  document.getElementById('lectura-next').classList.remove('hidden');
  
  lecturaState.indice++;
  document.getElementById('lectura-score').textContent = `${lecturaState.correctas}/${lecturaState.total}`;
}

function siguienteLectura() {
  mostrarEscenarioLectura();
}

function mostrarResultadoLectura() {
  const percentage = Math.round((lecturaState.correctas / lecturaState.total) * 100);
  
  // Achievement hooks
  if (typeof incrementarLecturas === 'function') {
    incrementarLecturas();
    actualizarMejorLectura(percentage);
    registrarPractica();
    checkAchievements();
  }
  
  // XP rewards
  if (typeof addXp === 'function') {
    addXp(XP_REWARDS.lectura_completada);
    if (percentage === 100) addXp(XP_REWARDS.quiz_perfecto);
  }
  
  document.getElementById('lectura-fan').innerHTML = '';
  document.getElementById('lectura-board').innerHTML = '';
  document.getElementById('lectura-instruction').classList.add('hidden');
  document.getElementById('lectura-question-area').classList.add('hidden');
  
  document.getElementById('lectura-question-area').classList.remove('hidden');
  document.getElementById('lectura-question').textContent = '';
  document.getElementById('lectura-options').innerHTML = `
    <div class="practice-result">
      <div class="result-icon">${percentage >= 70 ? '🔮' : '📚'}</div>
      <h3 class="result-title">${percentage >= 70 ? '¡Sos una vidente!' : 'Seguí practicando'}</h3>
      <p class="result-score">${lecturaState.correctas}/${lecturaState.total} (${percentage}%)</p>
      <p class="result-message">${getResultMessage(percentage)}</p>
    </div>
  `;
  document.getElementById('lectura-explanation').classList.add('hidden');
  document.getElementById('lectura-next').classList.add('hidden');
}

function cerrarLectura() {
  document.getElementById('pantalla-lectura').classList.remove('activa');
  document.getElementById('pantalla-lectura').classList.add('hidden');
  irA('aprendizaje');
}

function escapeHtml(text) {
  return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});

function cerrarPractica() {
  document.getElementById('practice-area').classList.add('hidden');
  
  const lessonsSection = document.getElementById('lessons-section');
  const quizzesSection = document.getElementById('quizzes-section');
  const progressSection = document.querySelector('.learning-progress');
  
  if (lessonsSection) lessonsSection.classList.remove('hidden');
  if (quizzesSection) quizzesSection.classList.remove('hidden');
  if (progressSection) progressSection.classList.remove('hidden');
}

function cambiarMazoPractica(mazo) {
  mazoReferencia = mazo;
  // Sync main deck selector
  document.querySelectorAll('.ref-deck-option').forEach(b => {
    b.classList.toggle('activo', b.dataset.deck === mazo);
  });
  loadCardsGrid();
  // Restart practice with new deck if in progress
  if (!document.getElementById('practice-area').classList.contains('hidden')) {
    iniciarPractica(practiceState.tipo);
  }
}

function cerrarLeccion() {
  cerrarPractica();
}

// ═══════════════ UTILIDADES ═══════════════
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

function exportarDiario() {
  showToast('Exportando diario...');
  // TODO: Implementar exportación
}

function togglePremium() {
  document.getElementById('modal-premium').classList.remove('hidden');
}

function abrirGumroad() {
  window.open('https://exekiel2.gumroad.com/l/TAROT', '_blank');
}

// ═══════════════ MUSIC PLAYER ═══════════════
let musicPlaying = false;
let currentTrack = 'audio/Tarot.mp3';

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const toggle = document.getElementById('music-toggle');
  
  if (musicPlaying) {
    audio.pause();
    toggle.textContent = '🔇';
    musicPlaying = false;
  } else {
    audio.src = currentTrack;
    audio.volume = 0.15;
    audio.play().then(() => {
      toggle.textContent = '🔊';
      musicPlaying = true;
    }).catch(e => {
      console.log('Autoplay blocked:', e);
    });
  }
}

function playTrack(track, btn) {
  currentTrack = track;
  const audio = document.getElementById('bg-music');
  const toggle = document.getElementById('music-toggle');
  
  document.querySelectorAll('.music-track').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  
  audio.src = track;
  audio.volume = 0.15;
  audio.play().then(() => {
    toggle.textContent = '🔊';
    musicPlaying = true;
  }).catch(e => {
    console.log('Play blocked:', e);
  });
}
