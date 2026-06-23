// Sistema de Niveles y XP

const LEVELS = [
  { nivel: 1, xp: 0, nombre: 'Aprendiz', icono: '🌙' },
  { nivel: 2, xp: 100, nombre: 'Estudiante', icono: '📖' },
  { nivel: 3, xp: 250, nombre: 'Practicante', icono: '🔮' },
  { nivel: 4, xp: 500, nombre: 'Vidente', icono: '👁️' },
  { nivel: 5, xp: 800, nombre: 'Místico', icono: '✨' },
  { nivel: 6, xp: 1200, nombre: 'Sabio', icono: '🌟' },
  { nivel: 7, xp: 1800, nombre: 'Maestro', icono: '👑' },
  { nivel: 8, xp: 2500, nombre: 'Gran Maestro', icono: '🔥' },
  { nivel: 9, xp: 3500, nombre: 'Iluminado', icono: '💫' },
  { nivel: 10, xp: 5000, nombre: 'Arcano Supremo', icono: '🏆' }
];

function getXp() {
  return parseInt(localStorage.getItem('tarot_xp') || '0');
}

function addXp(amount) {
  const currentXp = getXp();
  const newXp = currentXp + amount;
  localStorage.setItem('tarot_xp', newXp.toString());
  
  // Check level up
  const currentLevel = getLevel();
  const newLevel = LEVELS.findLast(l => newXp >= l.xp);
  
  if (newLevel && newLevel.nivel > currentLevel.nivel) {
    localStorage.setItem('tarot_level', newLevel.nivel.toString());
    showToast(`🎉 ¡Subiste al nivel ${newLevel.nivel}: ${newLevel.nombre}!`);
  }
  
  updateLevelDisplay();
  return newXp;
}

function getLevel() {
  const levelNum = parseInt(localStorage.getItem('tarot_level') || '1');
  return LEVELS.find(l => l.nivel === levelNum) || LEVELS[0];
}

function getNextLevel() {
  const current = getLevel();
  return LEVELS.find(l => l.nivel === current.nivel + 1);
}

function updateLevelDisplay() {
  const badge = document.getElementById('level-badge');
  const title = document.getElementById('level-title');
  const fill = document.getElementById('xp-fill');
  const text = document.getElementById('xp-text');
  
  if (!badge) return;
  
  const level = getLevel();
  const xp = getXp();
  const nextLevel = getNextLevel();
  
  badge.textContent = level.nivel;
  title.textContent = `${level.icono} ${level.nombre}`;
  
  if (nextLevel) {
    const progress = ((xp - level.xp) / (nextLevel.xp - level.xp)) * 100;
    fill.style.width = Math.min(progress, 100) + '%';
    text.textContent = `${xp} / ${nextLevel.xp} XP`;
  } else {
    fill.style.width = '100%';
    text.textContent = `${xp} XP — ¡Nivel máximo!`;
  }
}

// XP rewards
const XP_REWARDS = {
  quiz_completado: 10,
  quiz_perfecto: 25,
  lectura_completada: 15,
  carta_dominada: 5,
  carta_primeravez: 3,
  racha_diaria: 20
};
