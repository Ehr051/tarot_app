// 🏆 Sistema de Logros y Medallas

const ACHIEVEMENTS = {
  // === APRENDIZAJE ===
  primera_carta: {
    id: 'primera_carta',
    nombre: 'Primera Carta',
    descripcion: 'Aprendiste tu primera carta',
    icono: '🌟',
    categoria: 'aprendizaje',
    condicion: (state) => state.dominadas.length >= 1
  },
  diez_cartas: {
    id: 'diez_cartas',
    nombre: 'Estudiante Dedicado',
    descripcion: 'Dominaste 10 cartas',
    icono: '📚',
    categoria: 'aprendizaje',
    condicion: (state) => state.dominadas.length >= 10
  },
  veinte_cartas: {
    id: 'veinte_cartas',
    nombre: 'Maestro del Tarot',
    descripcion: 'Dominaste 20 cartas',
    icono: '🔮',
    categoria: 'aprendizaje',
    condicion: (state) => state.dominadas.length >= 20
  },
  arcanos_completos: {
    id: 'arcanos_completos',
    nombre: 'Guardián de los Arcanos',
    descripcion: 'Dominaste todos los Arcanos Mayores',
    icono: '🌙',
    categoria: 'aprendizaje',
    condicion: (state) => {
      const arcanos = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
      return arcanos.every(id => state.dominadas.includes(id));
    }
  },
  palo_completo: {
    id: 'palo_completo',
    nombre: 'Maestro de Palo',
    descripcion: 'Dominaste todas las cartas de un palo',
    icono: '⚔️',
    categoria: 'aprendizaje',
    condicion: (state) => {
      const palos = {
        copas: TODAS_LAS_CARTAS.filter(c => c.palo === 'copas').map(c => c.id),
        espadas: TODAS_LAS_CARTAS.filter(c => c.palo === 'espadas').map(c => c.id),
        bastos: TODAS_LAS_CARTAS.filter(c => c.palo === 'bastos').map(c => c.id),
        oros: TODAS_LAS_CARTAS.filter(c => c.palo === 'oros').map(c => c.id)
      };
      return Object.values(palos).some(palo => palo.every(id => state.dominadas.includes(id)));
    }
  },

  // === QUIZ ===
  primer_quiz: {
    id: 'primer_quiz',
    nombre: 'Primer Intento',
    descripcion: 'Completaste tu primer quiz',
    icono: '🎯',
    categoria: 'quiz',
    condicion: (state) => state.quizzesCompletados >= 1
  },
  quiz_perfecto: {
    id: 'quiz_perfecto',
    nombre: 'Perfección',
    descripcion: 'Sacaste 10/10 en un quiz',
    icono: '💯',
    categoria: 'quiz',
    condicion: (state) => state.mejorPuntuacion === 10
  },
  cinco_quizzes: {
    id: 'cinco_quizzes',
    nombre: 'Practicante Activo',
    descripcion: 'Completaste 5 quizzes',
    icono: '🎓',
    categoria: 'quiz',
    condicion: (state) => state.quizzesCompletados >= 5
  },
  diez_quizzes: {
    id: 'diez_quizzes',
    nombre: 'Quiz Master',
    descripcion: 'Completaste 10 quizzes',
    icono: '🧠',
    categoria: 'quiz',
    condicion: (state) => state.quizzesCompletados >= 10
  },

  // === LECTURAS ===
  primera_lectura: {
    id: 'primera_lectura',
    nombre: 'Primera Tirada',
    descripcion: 'Completaste tu primera lectura',
    icono: '🃏',
    categoria: 'lectura',
    condicion: (state) => state.lecturasCompletadas >= 1
  },
  cinco_lecturas: {
    id: 'cinco_lecturas',
    nombre: 'Lector Hábil',
    descripcion: 'Completaste 5 lecturas',
    icono: '🔮',
    categoria: 'lectura',
    condicion: (state) => state.lecturasCompletadas >= 5
  },
  lectura_perfecta: {
    id: 'lectura_perfecta',
    nombre: 'Vidente',
    descripcion: 'Sacaste 100% en una lectura',
    icono: '✨',
    categoria: 'lectura',
    condicion: (state) => state.mejorLectura === 100
  },

  // === RACHA ===
  racha_3: {
    id: 'racha_3',
    nombre: 'En Racha',
    descripcion: '3 días consecutivos practicando',
    icono: '🔥',
    categoria: 'racha',
    condicion: (state) => state.racha >= 3
  },
  racha_7: {
    id: 'racha_7',
    nombre: 'Devoción',
    descripcion: '7 días consecutivos practicando',
    icono: '💫',
    categoria: 'racha',
    condicion: (state) => state.racha >= 7
  }
};

// Estado del usuario
function getAchievementState() {
  const dominadas = JSON.parse(localStorage.getItem('tarot_dominadas') || '[]');
  const quizzesCompletados = parseInt(localStorage.getItem('tarot_quizzes_completados') || '0');
  const mejorPuntuacion = parseInt(localStorage.getItem('tarot_mejor_puntuacion') || '0');
  const lecturasCompletadas = parseInt(localStorage.getItem('tarot_lecturas_completadas') || '0');
  const mejorLectura = parseInt(localStorage.getItem('tarot_mejor_lectura') || '0');
  const racha = calcularRacha();
  
  return { dominadas, quizzesCompletados, mejorPuntuacion, lecturasCompletadas, mejorLectura, racha };
}

function calcularRacha() {
  const lastPractice = localStorage.getItem('tarot_last_practice');
  if (!lastPractice) return 0;
  
  const last = new Date(lastPractice);
  const today = new Date();
  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1) return 0;
  
  let racha = parseInt(localStorage.getItem('tarot_racha') || '0');
  return racha;
}

function registrarPractica() {
  const today = new Date().toDateString();
  const lastPractice = localStorage.getItem('tarot_last_practice');
  
  if (lastPractice === today) return;
  
  const last = new Date(lastPractice);
  const todayDate = new Date();
  const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));
  
  let racha = parseInt(localStorage.getItem('tarot_racha') || '0');
  
  if (diffDays === 1) {
    racha++;
  } else if (diffDays > 1) {
    racha = 1;
  } else {
    racha = 1;
  }
  
  localStorage.setItem('tarot_racha', racha.toString());
  localStorage.setItem('tarot_last_practice', today);
}

function incrementarQuizzes() {
  const count = parseInt(localStorage.getItem('tarot_quizzes_completados') || '0') + 1;
  localStorage.setItem('tarot_quizzes_completados', count.toString());
}

function actualizarMejorPuntuacion(score) {
  const current = parseInt(localStorage.getItem('tarot_mejor_puntuacion') || '0');
  if (score > current) {
    localStorage.setItem('tarot_mejor_puntuacion', score.toString());
  }
}

function incrementarLecturas() {
  const count = parseInt(localStorage.getItem('tarot_lecturas_completadas') || '0') + 1;
  localStorage.setItem('tarot_lecturas_completadas', count.toString());
}

function actualizarMejorLectura(percent) {
  const current = parseInt(localStorage.getItem('tarot_mejor_lectura') || '0');
  if (percent > current) {
    localStorage.setItem('tarot_mejor_lectura', percent.toString());
  }
}

// Verificar y otorgar logros
function checkAchievements() {
  const state = getAchievementState();
  const unlocked = JSON.parse(localStorage.getItem('tarot_achievements') || '[]');
  const newAchievements = [];
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!unlocked.includes(achievement.id) && achievement.condicion(state)) {
      unlocked.push(achievement.id);
      newAchievements.push(achievement);
    }
  });
  
  if (newAchievements.length > 0) {
    localStorage.setItem('tarot_achievements', JSON.stringify(unlocked));
    newAchievements.forEach(a => showAchievementToast(a));
  }
  
  return newAchievements;
}

function showAchievementToast(achievement) {
  showToast(`🏆 ¡Logro desbloqueado! ${achievement.icono} ${achievement.nombre}`);
}

function getUnlockedAchievements() {
  return JSON.parse(localStorage.getItem('tarot_achievements') || '[]');
}

function renderAchievements() {
  const container = document.getElementById('achievements-container');
  if (!container) return;
  
  const unlocked = getUnlockedAchievements();
  container.innerHTML = '';
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    const isUnlocked = unlocked.includes(achievement.id);
    const div = document.createElement('div');
    div.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    div.innerHTML = `
      <div class="achievement-icon">${isUnlocked ? achievement.icono : '🔒'}</div>
      <div class="achievement-info">
        <h4>${achievement.nombre}</h4>
        <p>${achievement.descripcion}</p>
      </div>
    `;
    container.appendChild(div);
  });
}
