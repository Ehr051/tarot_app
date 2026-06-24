// 🔮 Práctica de Lectura — Pools de cartas por categoría y escenarios
// Combinaciones masivas: 4 mazos × (78+78×77+78×77×76+22×21×20×19×18) = BILLONES
// + Dirección de figuras importa (Rey mira a otra carta o hacia afuera)

// Arcanos Mayores (0-21) — solo estos se usan en tiradas amor y celta
const ARCOS_MAYORES = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

// Cartas con figuras (Reyes, Reinas, Caballeros, Pajes)
const CARTAS_CON_FIGURA = [
  '64', '65', '66', '67', // Rey de Oros, Copas, Espadas, Bastos
  '68', '69', '70', '71', // Reina de Oros, Copas, Espadas, Bastos
  '72', '73', '74', '75', // Caballero de Oros, Copas, Espadas, Bastos
  '76', '77', '78', '79'  // Sota de Oros, Copas, Espadas, Bastos
];

function esCartaConFigura(cartaId) {
  return CARTAS_CON_FIGURA.includes(cartaId);
}

function getDireccionFigura(cartaId, invertida, posicionEnTirada, totalCartas) {
  if (!esCartaConFigura(cartaId)) return null;
  
  // La dirección depende de:
  // 1. Upright/Reversed
  // 2. Posición en la tirada (izquierda a derecha)
  // 3. Si es la primera o última carta
  
  const esPrimera = posicionEnTirada === 0;
  const esUltima = posicionEnTirada === totalCartas - 1;
  
  if (!invertida) {
    // Upright: mira hacia la siguiente carta (o hacia afuera si es la última)
    if (esUltima) return 'hacia_afuera';
    return 'hacia_siguiente';
  } else {
    // Reversed: mira hacia la carta anterior (o hacia afuera si es la primera)
    if (esPrimera) return 'hacia_afuera';
    return 'hacia_anterior';
  }
}

function interpretarDireccionFigura(carta, posicion, totalCartas, invertida) {
  if (!carta || !esCartaConFigura(String(carta.id))) return '';
  
  const nombre = carta.nombre || carta;
  const direccion = getDireccionFigura(carta.id, invertida, posicion, totalCartas);
  
  if (direccion === 'hacia_afuera') {
    return `${nombre} está mirando hacia afuera —的能量 no está dirigida a esta lectura.`;
  } else if (direccion === 'hacia_siguiente') {
    return `${nombre} está mirando hacia la siguiente carta —的能量 está dirigida hacia lo que viene.`;
  } else if (direccion === 'hacia_anterior') {
    return `${nombre} está mirando hacia la carta anterior —的能量 está conectada con el pasado.`;
  }
  
  return '';
}

const LECTURA_POOLS = {
  una: {
    nombre: 'Una Carta',
    preguntas: [
      '¿Qué me dice el tarot hoy?',
      '¿Qué energía me rodea?',
      '¿Qué debo saber ahora?',
      '¿Qué me depara el día?',
      '¿Qué me dice mi intuición?',
      '¿Qué debo tener en cuenta?'
    ],
    cartas: ARCOS_MAYORES
  },
  dos: {
    nombre: 'Vínculo',
    preguntas: [
      '¿Cómo está mi relación?',
      '¿Qué siente esa persona por mí?',
      '¿Hay reciprocidad en lo que siento?',
      '¿Debería dar un paso en esta relación?',
      '¿Qué obstáculos tiene esta conexión?',
      '¿Qué me dice el tarot sobre nosotros?'
    ],
    cartas: ARCOS_MAYORES
  },
  tres: {
    nombre: 'Pasado, Presente, Futuro',
    preguntas: [
      '¿Qué me espera en el amor?',
      '¿Cómo evolucionará mi situación?',
      '¿Qué camino debo tomar?',
      '¿Qué me depara el futuro?',
      '¿Cómo está mi situación financiera?',
      '¿Qué viene para mí?'
    ],
    cartas: ARCOS_MAYORES
  },
  cruz: {
    nombre: 'Cruz Simple',
    preguntas: [
      '¿Qué me dice mi futuro amoroso?',
      '¿Qué obstáculo tengo en el trabajo?',
      '¿Qué me dice el tarot sobre mi vida?',
      '¿Qué debo saber ahora?',
      '¿Qué energía me rodea?',
      '¿Qué me depara el día?'
    ],
    cartas: ARCOS_MAYORES
  },
  amor7: {
    nombre: 'Tirada del Amor',
    preguntas: [
      '¿Qué dice mi futuro amoroso?',
      '¿Cómo se siente esa persona por mí?',
      '¿Qué me espera en el amor?',
      '¿Debería dar un paso en esta relación?',
      '¿Qué obstáculos tengo en el amor?',
      '¿Hay reciprocidad en lo que siento?',
      '¿Volveré con mi ex?',
      '¿Qué me dice el tarot sobre mi pareja?'
    ],
    cartas: ARCOS_MAYORES
  }
};

// ═══════════════ Generador de escenarios dinámicos ═══════════════
function generarEscenariosLectura(tipo, cantidad) {
  const pool = LECTURA_POOLS[tipo];
  if (!pool) return [];
  
  const escenarios = [];
  const preguntasUsadas = [];
  
  for (let i = 0; i < cantidad; i++) {
    // Elegir pregunta no usada
    let pregunta;
    do {
      pregunta = pool.preguntas[Math.floor(Math.random() * pool.preguntas.length)];
    } while (preguntasUsadas.includes(pregunta) && preguntasUsadas.length < pool.preguntas.length);
    preguntasUsadas.push(pregunta);
    
    // Elegir cartas de las 78 completas (sin duplicados)
    const numCartas = tipo === 'cruz' ? 5 : tipo === 'amor7' ? 7 : tipo === 'tres' ? 3 : tipo === 'dos' ? 2 : 1;
    const cartasElegidas = shuffleArray([...pool.cartas]).slice(0, numCartas);
    const invertidas = cartasElegidas.map(() => Math.random() > 0.5);
    
    // Determinar posiciones según tirada
    const posiciones = getPosicionesLectura(tipo);
    
    escenarios.push({
      categoria: tipo,
      pregunta: `Alguien pregunta: "${pregunta}"`,
      cartas: cartasElegidas,
      invertidas: invertidas,
      posiciones: posiciones.map(p => p.label),
      opciones: generarOpcionesDinamicas(cartasElegidas, invertidas, tipo),
      explicacion: generarExplicacionDinamica(cartasElegidas, invertidas, tipo)
    });
  }
  
  return escenarios;
}

function getPosicionesLectura(tipo) {
  switch(tipo) {
    case 'dos': return [
      { x: 35, y: 50, label: 'Tu energía' },
      { x: 65, y: 50, label: 'Su energía' }
    ];
    case 'tres': return [
      { x: 20, y: 50, label: 'Pasado' },
      { x: 50, y: 50, label: 'Presente' },
      { x: 80, y: 50, label: 'Futuro' }
    ];
    case 'cruz': return [
      { x: 50, y: 25, label: 'Situación' },
      { x: 20, y: 50, label: 'Obstáculo' },
      { x: 80, y: 50, label: 'Consejo' },
      { x: 50, y: 75, label: 'Lo que viene' },
      { x: 50, y: 50, label: 'Resultado' }
    ];
    case 'amor7': return [
      { x: 15, y: 30, label: 'Situación' },
      { x: 35, y: 30, label: 'Obstáculo' },
      { x: 55, y: 30, label: 'Pasado' },
      { x: 75, y: 30, label: 'Presente' },
      { x: 25, y: 70, label: 'Futuro' },
      { x: 50, y: 70, label: 'Tu energía' },
      { x: 75, y: 70, label: 'Consejo' }
    ];
    default: return [{ x: 50, y: 50, label: 'Mensaje' }];
  }
}

function generarOpcionesDinamicas(cartas, invertidas, tipo) {
  // Obtener significados de las cartas
  const significados = cartas.map((id, i) => {
    const carta = TODAS_LAS_CARTAS.find(c => c.id === id);
    const significado = getSignificado(id, mazoReferencia, invertidas[i]);
    return { carta, significado, invertida: invertidas[i] };
  });
  
  const posiciones = getPosicionesLectura(tipo);
  
  // Función para generar una lectura completa con todas las cartas
  function generarLecturaCompleta(significadosArr, cartasArr, invertidasArr, posicionesArr, tipoTirada) {
    const labels = posicionesArr.map(p => p.label);
    let texto = '';
    
    if (tipoTirada === 'una') {
      const s = significadosArr[0];
      texto = `${s.carta?.nombre} — ${s.significado.split('.')[0]}`;
      const dir = interpretarDireccionFigura(s.carta, 0, cartasArr.length, invertidasArr[0]);
      if (dir) texto += ` ${dir}`;
    } else if (tipoTirada === 'dos') {
      texto = significadosArr.map((s, i) => {
        let part = `${labels[i]}: ${s.carta?.nombre} — ${s.significado.split('.')[0]}`;
        const dir = interpretarDireccionFigura(s.carta, i, cartasArr.length, invertidasArr[i]);
        if (dir) part += ` ${dir}`;
        return part;
      }).join('. ');
      // Agregar interpretación de conexión
      const c1 = significadosArr[0].carta;
      const c2 = significadosArr[1].carta;
      const inv1 = invertidasArr[0];
      const inv2 = invertidasArr[1];
      const templatesConexion = [
        `Conexión entre ${labels[0]} y ${labels[1]}: ${c1?.nombre} se encuentra con ${c2?.nombre}. ${c1?.nombre} ${inv1 ? 'viene con energía bloqueada, necesita ser liberada antes de' : 'fluye hacia'} ${c2?.nombre}, que ${inv2 ? 'pide revisión interna' : 'responde con claridad'}. La dinámica te pide observar cómo se complementan o desafían.`,
        `${labels[0]} y ${labels[1]} dialogan: ${c1?.nombre} ${inv1 ? 'en modo sombra' : 'en plena luz'} y ${c2?.nombre} ${inv2 ? 'en modo sombra' : 'en plena luz'}. La lectura te invita a ver la relación entre estas dos energías y cómo se influyen mutuamente.`,
        `Vínculo entre posiciones: mientras ${c1?.nombre} representa ${inv1 ? 'un aspecto que hoy está bloqueado o mirando hacia adentro' : 'una energía activa y disponible'}, ${c2?.nombre} aparece como ${inv2 ? 'una lección que mirar con cuidado' : 'una fuerza que acompaña'}. La conexión entre ambas es el mensaje más profundo de esta lectura.`
      ];
      texto += `. ${templatesConexion[Math.floor(Math.random() * templatesConexion.length)]}`;
    } else {
      texto = significadosArr.map((s, i) => {
        let part = `${labels[i]}: ${s.carta?.nombre} — ${s.significado.split('.')[0]}`;
        const dir = interpretarDireccionFigura(s.carta, i, cartasArr.length, invertidasArr[i]);
        if (dir) part += ` ${dir}`;
        return part;
      }).join('. ');
    }
    
    return texto;
  }
  
  // Crear opción correcta
  const textoCorrecto = generarLecturaCompleta(significados, cartas, invertidas, posiciones, tipo);
  
  // Crear opciones incorrectas (combinaciones completas de cartas al azar)
  const wrongTexts = [];
  const cartasDisponibles = LECTURA_POOLS[tipo].cartas.filter(id => !cartas.includes(id));
  const numCartas = cartas.length;
  
  for (let i = 0; i < 3; i++) {
    // Elegir cartas al azar para esta opción incorrecta
    const wrongIds = shuffleArray([...cartasDisponibles]).slice(0, numCartas);
    const wrongInvertidas = wrongIds.map(() => Math.random() > 0.5);
    const wrongSignificados = wrongIds.map((id, idx) => {
      const carta = TODAS_LAS_CARTAS.find(c => c.id === id);
      const significado = getSignificado(id, mazoReferencia, wrongInvertidas[idx]);
      return { carta, significado, invertida: wrongInvertidas[idx] };
    });
    
    const wrongText = generarLecturaCompleta(wrongSignificados, wrongIds, wrongInvertidas, posiciones, tipo);
    wrongTexts.push(wrongText);
  }
  
  const opciones = shuffleArray([
    { texto: textoCorrecto, correcta: true },
    ...wrongTexts.map(t => ({ texto: t, correcta: false }))
  ]);
  
  return opciones;
}

function generarExplicacionDinamica(cartas, invertidas, tipo) {
  const posiciones = getPosicionesLectura(tipo);
  let explicacion = '';
  
  cartas.forEach((id, i) => {
    const carta = TODAS_LAS_CARTAS.find(c => c.id === id);
    const significado = getSignificado(id, mazoReferencia, invertidas[i]);
    const estado = invertidas[i] ? 'invertida' : 'derecha';
    
    explicacion += `${posiciones[i].label}: ${carta?.nombre} (${estado}) — ${significado}`;
    
    // Agregar interpretación de dirección si es carta con figura
    const interpretacionDireccion = interpretarDireccionFigura(carta, i, cartas.length, invertidas[i]);
    if (interpretacionDireccion) {
      explicacion += `. ${interpretacionDireccion}`;
    }
    
    explicacion += '. ';
  });
  
  return explicacion;
}

// ═══════════════ Estadísticas de combinaciones ═══════════════
function mostrarEstadisticasCombinaciones() {
  const stats = {
    una: { cartas: 78, invertidas: 2, total: 156 },
    dos: { cartas: 78 * 77, invertidas: 4, total: 24024 },
    tres: { cartas: 78 * 77 * 76, invertidas: 8, total: 3651072 },
    cruz: { cartas: 22 * 21 * 20 * 19 * 18, invertidas: 32, total: 53239200 },
    amor7: { cartas: 22 * 21 * 20 * 19 * 18 * 17 * 16, invertidas: 128, total: 978817536000 }
  };
  
  return stats;
}
