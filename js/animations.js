// 🔮 TAROT — Animaciones GSAP

// ═══════════════ ANIMACIÓN DEL FAN ═══════════════
function animarFan() {
  const fanCards = document.querySelectorAll('.fan-card');
  
  fanCards.forEach((card, index) => {
    gsap.fromTo(card, 
      { 
        opacity: 0,
        y: 100,
        rotation: 0
      },
      {
        opacity: 1,
        y: 0,
        rotation: card._rotation || 0,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'back.out(1.7)'
      }
    );
  });
}

// ═══════════════ ANIMACIÓN DE REVELACIÓN ═══════════════
function animarRevelacion(cardElement, delay = 0) {
  gsap.to(cardElement, {
    rotationY: 180,
    duration: 0.6,
    delay: delay,
    ease: 'power2.inOut'
  });
}

// ═══════════════ ANIMACIÓN DE SELECCIÓN ═══════════════
function animarSeleccion(cardElement) {
  gsap.to(cardElement, {
    y: -30,
    scale: 1.1,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });
}

// ═══════════════ ANIMACIÓN DE COLOCACIÓN ═══════════════
function animarColocacion(cardElement, targetX, targetY) {
  gsap.to(cardElement, {
    x: targetX,
    y: targetY,
    duration: 0.5,
    ease: 'power2.out'
  });
}

// ═══════════════ ANIMACIÓN DE SHUFFLE ═══════════════
function animarShuffle(cards) {
  cards.forEach((card, index) => {
    gsap.to(card, {
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 30,
      rotation: (Math.random() - 0.5) * 20,
      duration: 0.3,
      delay: index * 0.02,
      ease: 'power2.out'
    });
  });
  
  // Volver a posición
  setTimeout(() => {
    cards.forEach((card, index) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        delay: index * 0.02,
        ease: 'power2.out'
      });
    });
  }, 500);
}

// ═══════════════ ANIMACIÓN DE PULSO ═══════════════
function animarPulso(element) {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
}

// ═══════════════ ANIMACIÓN DE BRILLO ═══════════════
function animarBrillo(element) {
  gsap.fromTo(element,
    { boxShadow: '0 0 0 rgba(212, 175, 55, 0)' },
    {
      boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    }
  );
}

// ═══════════════ ANIMACIÓN DE FLIP 3D ═══════════════
function flipCard(cardElement) {
  const tl = gsap.timeline();
  
  tl.to(cardElement, {
    scaleX: 0.1,
    duration: 0.2,
    ease: 'power2.in'
  })
  .set(cardElement, { rotationY: 180 })
  .to(cardElement, {
    scaleX: 1,
    duration: 0.2,
    ease: 'power2.out'
  });
  
  return tl;
}

// ═══════════════ ANIMACIÓN DE ENTRADA ═══════════════
function animarEntrada(element, tipo = 'fade') {
  switch(tipo) {
    case 'fade':
      gsap.fromTo(element,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      break;
    case 'slide':
      gsap.fromTo(element,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
      break;
    case 'scale':
      gsap.fromTo(element,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
      break;
  }
}

// ═══════════════ ANIMACIÓN DE SALIDA ═══════════════
function animarSalida(element, tipo = 'fade') {
  return new Promise(resolve => {
    switch(tipo) {
      case 'fade':
        gsap.to(element, {
          opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
          onComplete: resolve
        });
        break;
      case 'slide':
        gsap.to(element, {
          opacity: 0, x: -50, duration: 0.3, ease: 'power2.in',
          onComplete: resolve
        });
        break;
      case 'scale':
        gsap.to(element, {
          opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in',
          onComplete: resolve
        });
        break;
    }
  });
}
