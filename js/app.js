// 🔮 TAROT — App principal

// ═══════════════ VARIABLES GLOBALES ═══════════════
let mazoActual = 'rider';
let tiradaActual = 'una';
let cartasEnMazo = [...TODAS_LAS_CARTAS];
let cartasSeleccionadas = [];
let tiradaEnCurso = false;

// ═══════════════ INICIALIZACIÓN ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    initApp();
  }, 2000);
});

function initApp() {
  setupNavigation();
  setupDeckSelector();
  setupSpreadSelector();
  setupFilterTabs();
  loadCardsGrid();
  loadRecentReadings();
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
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('activa'));
  
  document.getElementById(`pantalla-${pantalla}`).classList.add('activa');
  document.querySelector(`[data-pantalla="${pantalla}"]`).classList.add('activa');
  
  if (pantalla === 'tirada') {
    prepararFan();
  }
}

// ═══════════════ SELECTOR DE MAZO ═══════════════
function setupDeckSelector() {
  document.querySelectorAll('.deck-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.deck-option').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      mazoActual = btn.dataset.deck;
      showToast(`Mazo: ${MAZOS[mazoActual].nombre}`);
    });
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
    div.innerHTML = `
      <div class="card-item-symbol">${getCartaEmoji(carta)}</div>
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

// ═══════════════ MOSTRAR CARTA (MODAL) ═══════════════
function mostrarCarta(carta) {
  document.getElementById('modal-carta-img').textContent = getCartaEmoji(carta);
  document.getElementById('modal-carta-nombre').textContent = carta.nombre;
  document.getElementById('modal-carta-palo').textContent = getNombrePalo(carta.palo);
  document.getElementById('modal-carta-upright').textContent = carta.significado;
  document.getElementById('modal-carta-reversed').textContent = carta.significado_invertido;
  document.getElementById('modal-carta').classList.remove('hidden');
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
  
  // Mezclar cartas
  cartasEnMazo = shuffleArray([...TODAS_LAS_CARTAS]);
  cartasSeleccionadas = [];
  
  // Generar fan
  fanContainer.innerHTML = '';
  const totalCards = 24; // Cartas visibles en el abanico
  
  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.className = 'fan-card';
    card.style.zIndex = i;
    
    // Calcular posición en abanico
    const totalAngle = 60; // Grados totales del abanico
    const startAngle = -totalAngle / 2;
    const angle = startAngle + (i * totalAngle / (totalCards - 1));
    const yOffset = Math.abs(angle) * 0.5;
    
    card.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
    card.dataset.index = i;
    
    card.innerHTML = `
      <div class="fan-card-back">
        <span class="fan-card-back-symbol">🌙</span>
      </div>
    `;
    
    card.onclick = () => seleccionarCarta(i);
    fanContainer.appendChild(card);
  }
  
  // Preparar tablero
  prepararTablero(cantidad);
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
    case 'tres':
      return [
        { x: 20, y: 50, label: 'Pasado' },
        { x: 50, y: 50, label: 'Presente' },
        { x: 80, y: 50, label: 'Futuro' }
      ];
    case 'cruz':
      return [
        { x: 50, y: 30, label: 'Situación' },
        { x: 20, y: 50, label: 'Obstáculo' },
        { x: 80, y: 50, label: 'Consejo' },
        { x: 50, y: 70, label: 'Resultado' },
        { x: 50, y: 90, label: 'Fondo' }
      ];
    case 'amor':
      return [
        { x: 50, y: 15, label: 'Tú' },
        { x: 20, y: 35, label: 'Tu pareja' },
        { x: 80, y: 35, label: 'La relación' },
        { x: 30, y: 60, label: 'Deseos' },
        { x: 70, y: 60, label: 'Miedos' },
        { x: 35, y: 85, label: 'Pasado' },
        { x: 65, y: 85, label: 'Futuro' }
      ];
    case 'celtica':
      return [
        { x: 50, y: 20, label: 'Presente' },
        { x: 50, y: 40, label: 'Desafío' },
        { x: 50, y: 60, label: 'Futuro' },
        { x: 20, y: 30, label: 'Pasado' },
        { x: 80, y: 30, label: 'Futuro cercano' },
        { x: 20, y: 70, label: 'Tú' },
        { x: 80, y: 70, label: 'Entorno' },
        { x: 50, y: 80, label: 'Esperanzas' },
        { x: 20, y: 90, label: 'Miedos' },
        { x: 80, y: 90, label: 'Resultado' }
      ];
    default:
      return [{ x: 50, y: 50, label: 'Carta' }];
  }
}

function colocarCartaEnTablero(carta, index) {
  const slot = document.getElementById(`slot-${index}`);
  if (!slot) return;
  
  slot.classList.add('filled');
  slot.innerHTML = `
    <div class="revealed-card" id="card-${index}">
      <div class="card-face card-back">
        <span class="card-back-main-symbol">🌙</span>
      </div>
      <div class="card-face card-front">
        <span class="card-front-symbol">${getCartaEmoji(carta)}</span>
        <span class="card-front-name">${carta.nombre}</span>
      </div>
    </div>
  `;
}

// ═══════════════ REVELAR CARTAS ═══════════════
function revelarTodasLasCartas() {
  const cantidad = TIRADAS[tiradaActual].cantidad;
  
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
  const cantidad = TIRADAS[tiradaActual].cantidad;
  
  let html = `<h3>📜 Tu Lectura</h3>`;
  
  const positions = getSpreadPositions(tiradaActual);
  
  for (let i = 0; i < cantidad; i++) {
    const carta = cartasEnMazo[cartasSeleccionadas[i]];
    const pos = positions[i];
    
    html += `
      <div class="reading-card-info">
        <h4 class="reading-card-name">${getCartaEmoji(carta)} ${carta.nombre}</h4>
        <p class="reading-card-position">${pos.label}</p>
        <p class="reading-card-meaning">${carta.significado}</p>
      </div>
    `;
  }
  
  html += `
    <button class="btn-primary" onclick="guardarLectura()" style="margin-top: 1rem;">
      💾 Guardar Lectura
    </button>
  `;
  
  resultDiv.innerHTML = html;
  resultDiv.classList.add('visible');
  
  // Scroll al resultado
  resultDiv.scrollIntoView({ behavior: 'smooth' });
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
  const randomIndex = Math.floor(Math.random() * TODAS_LAS_CARTAS.length);
  const carta = TODAS_LAS_CARTAS[randomIndex];
  mostrarCarta(carta);
}

// ═══════════════ PRÁCTICA ═══════════════
function iniciarPractica(tipo) {
  showToast(`Modo práctica: ${tipo}`);
  // TODO: Implementar ejercicios
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
