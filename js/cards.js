// 🔮 Datos de las 78 cartas de Tarot
// Cada carta tiene: id, nombre, nombre_en, palo, significado, significado_invertido, imagen

const ARCANOS_MAYORES = [
  { id: 0, nombre: "El Loco", nombre_en: "The Fool", palo: "mayor", significado: "Nuevos comienzos, espontaneidad, libertad. Un viaje sin rumbo definido pero lleno de posibilidades.", significado_invertido: "Imprudencia, riesgo innecesario, falta de dirección. Actuar sin pensar en las consecuencias.", numero: "0" },
  { id: 1, nombre: "El Mago", nombre_en: "The Magician", palo: "mayor", significado: "Habilidad, recursos, concentración. Tienes todo lo que necesitas para manifestar tu desires.", significado_invertido: "Manipulación, engaño, falta de habilidad. Usar el talento para fines incorrectos.", numero: "I" },
  { id: 2, nombre: "La Sacerdotisa", nombre_en: "The High Priestess", palo: "mayor", significado: "Intuición, misterio, conocimiento oculto. Escuchar tu voz interior, confiar en tus instintos.", significado_invertido: "Secretos revelados, confusión, falta de intuición. Ignorar las señales internas.", numero: "II" },
  { id: 3, nombre: "La Emperatriz", nombre_en: "The Empress", palo: "mayor", significado: "Abundancia, fertilidad, naturaleza. Creatividad, sensualidad, provisioning maternal.", significado_invertido: "Dependencia, carencia, bloqueo creativo. Falta de atención al cuerpo o la naturaleza.", numero: "III" },
  { id: 4, nombre: "El Emperador", nombre_en: "The Emperor", palo: "mayor", significado: "Autoridad, estructura, liderazgo. Disciplina, estabilidad, protección.", significado_invertido: "Tiranía, rigidez, abuso de poder. Falta de autoridad o exceso de control.", numero: "IV" },
  { id: 5, nombre: "El Papa", nombre_en: "The Hierophant", palo: "mayor", significado: "Tradición, espiritualidad, enseñanza. Buscar guía, seguir un camino establecido.", significado_invertido: "Rebelión, unconventional, romper tradiciones. Cuestionar las normas establecidas.", numero: "V" },
  { id: 6, nombre: "Los Enamorados", nombre_en: "The Lovers", palo: "mayor", significado: "Amor, armonía, elección. Relaciones significativas, alineación de valores.", significado_invertido: "Desequilibrio, conflicto, mala elección. Duda en una relación importante.", numero: "VI" },
  { id: 7, nombre: "El Carro", nombre_en: "The Chariot", palo: "mayor", significado: "Victoria, determinación, voluntad. Superar obstáculos, avanzar con fuerza.", significado_invertido: "Falta de control, agresión, derrota. Perder el rumbo por exceso de fuerza.", numero: "VII" },
  { id: 8, nombre: "La Fuerza", nombre_en: "Strength", palo: "mayor", significado: "Valor, persuasión, influencia interna. Domar los impulsos, paciencia, compasión.", significado_invertido: "Debilidad, inseguridad, falta de autocontrol. Miedo a enfrentar situaciones difíciles.", numero: "VIII" },
  { id: 9, nombre: "El Ermitaño", nombre_en: "The Hermit", palo: "mayor", significado: "Introspección, soledad, guía interior. Buscar respuestas dentro de ti, retiro espiritual.", significado_invertido: "Aislamiento, soledad no deseada, negatividad. Evitar la compañía o el consejo.", numero: "IX" },
  { id: 10, nombre: "La Rueda de la Fortuna", nombre_en: "Wheel of Fortune", palo: "mayor", significado: "Cambio, ciclo, destino. La rueda gira, buenos tiempos por venir.", significado_invertido: "Mala racha, resistencia al cambio, mala suerte. Período difícil que pasará.", numero: "X" },
  { id: 11, nombre: "La Justicia", nombre_en: "Justice", palo: "mayor", significado: "Equidad, verdad, ley. Consecuencias justas, honestidad, objetividad.", significado_invertido: "Injusticia, deshonestidad, sesgo. Falta de equidad o consecuencias injustas.", numero: "XI" },
  { id: 12, nombre: "El Colgado", nombre_en: "The Hanged Man", palo: "mayor", significado: "Sacrificio, espera, nueva perspectiva. Soltar, ver las cosas desde otro ángulo.", significado_invertido: "Estancamiento, indecisión, sacrificio innecesario. Resistencia a cambiar de perspectiva.", numero: "XII" },
  { id: 13, nombre: "La Muerte", nombre_en: "Death", palo: "mayor", significado: "Transformación, final, renacimiento. Fin de un ciclo, liberación, cambio profundo.", significado_invertido: "Resistencia al cambio, estancamiento, miedo. Aferrarse a lo que ya no funciona.", numero: "XIII" },
  { id: 14, nombre: "La Templanza", nombre_en: "Temperance", palo: "mayor", significado: "Equilibrio, moderación, paciencia. Armonía, curación, síntesis de opuestos.", significado_invertido: "Desequilibrio, excesos, impaciencia. Falta de armonía en la vida.", numero: "XIV" },
  { id: 15, nombre: "El Diablo", nombre_en: "The Devil", palo: "mayor", significado: "Dependencia, materialismo, sombras. Apego, tentación, cadenas autoimpuestas.", significado_invertido: "Liberación, ruptura de cadenas, despertar. Soltar dependencias, encontrar libertad.", numero: "XV" },
  { id: 16, nombre: "La Torre", nombre_en: "The Tower", palo: "mayor", significado: "Destrucción, revelación, cambio súbito. Derrumbe de estructuras falsas, verdad repentina.", significado_invertido: "Evitar el desastre, resistencia al cambio, miedo. Postergar lo inevitable.", numero: "XVI" },
  { id: 17, nombre: "La Estrella", nombre_en: "The Star", palo: "mayor", significado: "Esperanza, inspiración, serenidad. Fe en el futuro, sanación, renovación.", significado_invertido: "Desesperanza, falta de fe, desilusión. Perder la conexión con lo espiritual.", numero: "XVII" },
  { id: 18, nombre: "La Luna", nombre_en: "The Moon", palo: "mayor", significado: "Ilusión, miedo, subconsciente. Sueños, intuición, lo oculto se revela.", significado_invertido: "Superar miedos, confusión aclarada, verdad. Salir de la confusión, ver con claridad.", numero: "XVIII" },
  { id: 19, nombre: "El Sol", nombre_en: "The Sun", palo: "mayor", significado: "Éxito, vitalidad, alegría. Logros, vitalidad, claridad, energía positiva.", significado_invertido: "Tristeza, fracaso temporal, falta de vitalidad. Período oscuro antes del amanecer.", numero: "XIX" },
  { id: 20, nombre: "El Juicio", nombre_en: "Judgement", palo: "mayor", significado: "Renacimiento, llamado, reflexión. Segunda oportunidad, despertar espiritual.", significado_invertido: "Autocrítica excesiva, negación, falta de reflexión. Ignorar las lecciones del pasado.", numero: "XX" },
  { id: 21, nombre: "El Mundo", nombre_en: "The World", palo: "mayor", significado: "Completitud, logro, viaje. Fin de un ciclo exitoso, integración, plenitud.", significado_invertido: "Falta de cierre, incompletitud, estancamiento. No completar un proyecto importante.", numero: "XXI" }
];

const PALOS = {
  copas: { nombre: "Copas", emoji: "🏆", elemento: "Agua", significado: "Emociones, relaciones, intuición" },
  espadas: { nombre: "Espadas", emoji: "⚔️", elemento: "Aire", significado: "Mente, conflictos, verdad" },
  bastos: { nombre: "Bastos", emoji: "🔥", elemento: "Fuego", significado: "Acción, creatividad, pasión" },
  oros: { nombre: "Oros", emoji: "💰", elemento: "Tierra", significado: "Trabajo, dinero, salud" }
};

const ARCROS_MENORES = [
  // COPAS
  { id: 22, nombre: "As de Copas", nombre_en: "Ace of Cups", palo: "copas", significado: "Nuevas emociones, amor, compasión. Un nuevo comienzo emocional, derramamiento de sentimientos.", significado_invertido: "Emociones reprimidas, vacío, negatividad. Cerrar el corazón, no expresar sentimientos.", numero: "As" },
  { id: 23, nombre: "Dos de Copas", nombre_en: "Two of Cups", palo: "copas", significado: "Unión, armonía, amor mutuo. Conexión profunda, atracción, equilibrio en relaciones.", significado_invertido: "Desconexión, desequilibrio, ruptura. Conflicto en una relación importante.", numero: "II" },
  { id: 24, nombre: "Tres de Copas", nombre_en: "Three of Cups", palo: "copas", significado: "Celebración, amistad, comunidad. Alegría compartida, éxito grupal, creatividad.", significado_invertido: "Soledad, excesos, traición. Falta de apoyo, celebración excesiva.", numero: "III" },
  { id: 25, nombre: "Cuatro de Copas", nombre_en: "Four of Cups", palo: "copas", significado: "Apatía, contemplación, rechazo. Indiferencia, falta de motivación, oportunidad ignorada.", significado_invertido: "Acción, motivación, nuevos sentimientos. Salir del estancamiento emocional.", numero: "IV" },
  { id: 26, nombre: "Cinco de Copas", nombre_en: "Five of Cups", palo: "copas", significado: "Pérdida, lamento, decepción. Duelo, arrepentimiento, enfocarse en lo perdido.", significado_invertido: "Aceptación, perdón, avanzar. Soltar el pasado, encontrar paz.", numero: "V" },
  { id: 27, nombre: "Seis de Copas", nombre_en: "Six of Cups", palo: "copas", significado: "Nostalgia, inocencia, recuerdos. Conexión con el pasado, niños, bondad.", significado_invertido: "Vivir en el pasado, inmadurez, idealización. Aferrarse a recuerdos.", numero: "VI" },
  { id: 28, nombre: "Siete de Copas", nombre_en: "Seven of Cups", palo: "copas", significado: "Fantasía, elección, ilusión. Opciones tentadoras, sueños, fantasías.", significado_invertido: "Claridad, decisión, acción. Elegir un camino, ser realista.", numero: "VII" },
  { id: 29, nombre: "Ocho de Copas", nombre_en: "Eight of Cups", palo: "copas", significado: "Abandono, búsqueda, desilusión. Dejar atrás, buscar algo más profundo.", significado_invertido: "Estancamiento, miedo al cambio, apego. No soltar lo que ya no funciona.", numero: "VIII" },
  { id: 30, nombre: "Nueve de Copas", nombre_en: "Nine of Cups", palo: "copas", significado: "Satisfacción, logro, contentamiento. Deseos cumplidos, gratitud, bienestar.", significado_invertido: "Insatisfacción, codicia, arrogancia. Nunca es suficiente, querer más.", numero: "IX" },
  { id: 31, nombre: "Diez de Copas", nombre_en: "Ten of Cups", palo: "copas", significado: "Felicidad, armonía familiar, amor. Realización emocional, hogar, comunidad.", significado_invertido: "Conflicto familiar, desilusión, separación. Problemas en el hogar.", numero: "X" },
  { id: 32, nombre: "Sota de Copas", nombre_en: "Page of Cups", palo: "copas", significado: "Intuición, creatividad, mensaje emocional. Noticias inesperadas, inspiración.", significado_invertido: "Inmadurez emocional, falta de creatividad, noticias malas.", numero: "Sota" },
  { id: 33, nombre: "Caballo de Copas", nombre_en: "Knight of Cups", palo: "copas", significado: "Romanticismo, creatividad, embajador. Ofrecer corazón, arte, poesía.", significado_invertido: "Celos, manipulación, fantasías irreales.", numero: "Caballo" },
  { id: 34, nombre: "Reina de Copas", nombre_en: "Queen of Cups", palo: "copas", significado: "Compasión, intuición, serenidad. Mujer empática, sanadora, intuitiva.", significado_invertido: "Dependencia emocional, inseguridad, negatividad.", numero: "Reina" },
  { id: 35, nombre: "Rey de Copas", nombre_en: "King of Cups", palo: "copas", significado: "Control emocional, diplomacia, sabiduría. Hombre emocionalmente estable, negociador.", significado_invertido: "Manipulación, agresión emocional, falta de control.", numero: "Rey" },

  // ESPADAS
  { id: 36, nombre: "As de Espadas", nombre_en: "Ace of Swords", palo: "espadas", significado: "Claridad mental, verdad, breakthrough. Nueva idea, insight, justicia.", significado_invertido: "Confusión, malentendidos, falta de claridad.", numero: "As" },
  { id: 37, nombre: "Dos de Espadas", nombre_en: "Two of Swords", palo: "espadas", significado: "Indecisión, equilibrio, bloqueo. Difícil elección, ceguera temporal.", significado_invertido: "Decisión tomada, información revelada, claridad.", numero: "II" },
  { id: 38, nombre: "Tres de Espadas", nombre_en: "Three of Swords", palo: "espadas", significado: "Dolor, traición, decepción. Corazón roto, tristeza profunda, betrayl.", significado_invertido: "Perdón, recuperación, superación. Sanar heridas, encontrar paz.", numero: "III" },
  { id: 39, nombre: "Cuatro de Espadas", nombre_en: "Four of Swords", palo: "espadas", significado: "Descanso, recuperación, meditación. Necesidad de pausa, restauración.", significado_invertido: "Agitación, ansiedad, falta de descanso. Burnout, estrés.", numero: "IV" },
  { id: 40, nombre: "Cinco de Espadas", nombre_en: "Five of Swords", palo: "espadas", significado: "Conflicto, derrota, ego. Victoria a costa de otros, pérdida.", significado_invertido: "Reconciliación, perdón, aprendizaje. Superar el conflicto.", numero: "V" },
  { id: 41, nombre: "Seis de Espadas", nombre_en: "Six of Swords", palo: "espadas", significado: "Transición, viaje, recuperación. Dejar atrás dificultades, avanzar.", significado_invertido: "Estancamiento, resistencia al cambio, bagaje emocional.", numero: "VI" },
  { id: 42, nombre: "Siete de Espadas", nombre_en: "Seven of Swords", palo: "espadas", significado: "Estrategia, astucia, secretos. Engaño,偷盗, acting alone.", significado_invertido: "Confesión, honestidad, arrepentimiento.", numero: "VII" },
  { id: 43, nombre: "Ocho de Espadas", nombre_en: "Eight of Swords", palo: "espadas", significado: "Restricción, encarcelamiento, impotencia. Atado por circunstancias, victimismo.", significado_invertido: "Liberación, clarity, empowerment. Romper cadenas, ver opciones.", numero: "VIII" },
  { id: 44, nombre: "Nueve de Espadas", nombre_en: "Nine of Swords", palo: "espadas", significado: "Ansiedad, pesadillas, culpa. Insomnio, preocupación excesiva, miedo.", significado_invertido: "Esperanza, recovery, release. Los peores momentos pasan.", numero: "IX" },
  { id: 45, nombre: "Diez de Espadas", nombre_en: "Ten of Swords", palo: "espadas", significado: "Fin, traición, rock bottom. Final doloroso, pero nuevo amanecer.", significado_invertido: "Recuperación, resistencia, segundoamanecer. Resistir el fin.", numero: "X" },
  { id: 46, nombre: "Sota de Espadas", nombre_en: "Page of Swords", palo: "espadas", significado: "Curiosidad, vigilancia, nuevos Ideas. Observar, planificar, comunicar.", significado_invertido: "Espionaje, críticas, falta de dirección.", numero: "Sota" },
  { id: 47, nombre: "Caballo de Espadas", nombre_en: "Knight of Swords", palo: "espadas", significado: "Acción, determinación, velocidad. Avanzar rápido, perseguir metas.", significado_invertido: "Impulsividad, agresión, falta de tacto.", numero: "Caballo" },
  { id: 48, nombre: "Reina de Espadas", nombre_en: "Queen of Swords", palo: "espadas", significado: "Independencia, claridad, honestidad. Mujer directa, observadora, justa.", significado_invertido: "Crueldad, fríaldad, manipulación.", numero: "Reina" },
  { id: 49, nombre: "Rey de Espadas", nombre_en: "King of Swords", palo: "espadas", significado: "Autoridad intelectual, justicia, liderazgo. Hombre brillante, estratega.", significado_invertido: "Tiranía, abuso de poder,冷酷.", numero: "Rey" },

  // BASTOS
  { id: 50, nombre: "As de Bastos", nombre_en: "Ace of Wands", palo: "bastos", significado: "Inspiración, nuevo comienzo, potencial. Chispa creativa, energía, pasión.", significado_invertido: "Falta de dirección, retrasos, pérdida de interés.", numero: "As" },
  { id: 51, nombre: "Dos de Bastos", nombre_en: "Two of Wands", palo: "bastos", significado: "Planificación, decisiones, mundo abierto. Mirar hacia el futuro, planificar.", significado_invertido: "Miedo al cambio, estancamiento, falta de visión.", numero: "II" },
  { id: 52, nombre: "Tres de Bastos", nombre_en: "Three of Wands", palo: "bastos", significado: "Expansión, exploración, visión. Ver oportunidades, anticipar el futuro.", significado_invertido: "Frustración, retrasos, falta de preparación.", numero: "III" },
  { id: 53, nombre: "Cuatro de Bastos", nombre_en: "Four of Wands", palo: "bastos", significado: "Celebración, hogar, armonía. Evento feliz, logro, estabilidad.", significado_invertido: "Transición, inestabilidad, falta de celebración.", numero: "IV" },
  { id: 54, nombre: "Cinco de Bastos", nombre_en: "Five of Wands", palo: "bastos", significado: "Conflicto, competencia, desacuerdo. Desafío, rivalidad, crecimiento a través del conflicto.", significado_invertido: "Evitar conflicto, acuerdo, armonía.", numero: "V" },
  { id: 55, nombre: "Seis de Bastos", nombre_en: "Six of Wands", palo: "bastos", significado: "Victoria, éxito, reconocimiento. Ganador, confianza, logros públicos.", significado_invertido: "Derrota, arrogancia, falta de reconocimiento.", numero: "VI" },
  { id: 56, nombre: "Siete de Bastos", nombre_en: "Seven of Wands", palo: "bastos", significado: "Defensa, perseverancia, desafío. Mantener posiciones, luchar por creencias.", significado_invertido: "Rendirse, agotamiento, derrota.", numero: "VII" },
  { id: 57, nombre: "Ocho de Bastos", nombre_en: "Eight of Wands", palo: "bastos", significado: "Velocidad, movimiento, acción. Rapidez, viajes, noticias llegando.", significado_invertido: "Retrasos, estancamiento, frustración.", numero: "VIII" },
  { id: 58, nombre: "Nueve de Bastos", nombre_en: "Nine of Wands", palo: "bastos", significado: "Resiliencia, persistencia, defensa. Aguantar, fortaleza, resistencia.", significado_invertido: "Agotamiento, paranoia, desconfianza.", numero: "IX" },
  { id: 59, nombre: "Diez de Bastos", nombre_en: "Ten of Wands", palo: "bastos", significado: "Carga, responsabilidad, estrés. Sobrecarga, deber, agotamiento.", significado_invertido: "Liberación, delegación, alivio. Soltar cargas innecesarias.", numero: "X" },
  { id: 60, nombre: "Sota de Bastos", nombre_en: "Page of Wands", palo: "bastos", significado: "Entusiasmo, exploración, aventura. Energía joven, curiosidad, descubrimiento.", significado_invertido: "Falta de dirección, inmadurez, retrasos.", numero: "Sota" },
  { id: 61, nombre: "Caballo de Bastos", nombre_en: "Knight of Wands", palo: "bastos", significado: "Pasión, energía, aventura. Acción audaz, entusiasmo, viaje.", significado_invertido: "Impulsividad, arrogancia, energía desperdiciada.", numero: "Caballo" },
  { id: 62, nombre: "Reina de Bastos", nombre_en: "Queen of Wands", palo: "bastos", significado: "Confianza, calidez, determinación. Mujer segura, carismática, independiente.", significado_invertido: "Celos, egoísmo, inseguridad.", numero: "Reina" },
  { id: 63, nombre: "Rey de Bastos", nombre_en: "King of Wands", palo: "bastos", significado: "Liderazgo natural, visión, emprendimiento. Hombre inspirador, líder nato.", significado_invertido: "Tiranía, impulsividad, falta de visión.", numero: "Rey" },

  // OROS
  { id: 64, nombre: "As de Oros", nombre_en: "Ace of Pentacles", palo: "oros", significado: "Nueva oportunidad, prosperidad, estabilidad. Inicio de proyecto exitoso, abundancia.", significado_invertido: "Oportunidad perdida, falta de planificación, pobreza.", numero: "As" },
  { id: 65, nombre: "Dos de Oros", nombre_en: "Two of Pentacles", palo: "oros", significado: "Equilibrio, adaptabilidad, gestión. Equilibrar prioridades, flexibilidad.", significado_invertido: "Desequilibrio, sobrecarga, mala gestión.", numero: "II" },
  { id: 66, nombre: "Tres de Oros", nombre_en: "Three of Pentacles", palo: "oros", significado: "Trabajo en equipo, maestría, colaboración. Éxito grupal, habilidad técnica.", significado_invertido: "Falta de trabajo, mediocridad, desacuerdo.", numero: "III" },
  { id: 67, nombre: "Cuatro de Oros", nombre_en: "Four of Pentacles", palo: "oros", significado: "Control, seguridad, ahorro. Proteger recursos, estabilidad financiera.", significado_invertido: "Avaricia, miedo a perder, generosidad excesiva.", numero: "IV" },
  { id: 68, nombre: "Cinco de Oros", nombre_en: "Five of Pentacles", palo: "oros", significado: "Pobreza, necesidad, aislamiento. Dificultad financiera, exclusión.", significado_invertido: "Recuperación, ayuda, esperanza. Superar困难, recibir apoyo.", numero: "V" },
  { id: 69, nombre: "Seis de Oros", nombre_en: "Six of Pentacles", palo: "oros", significado: "Generosidad, caridad, equilibrio. Dar y recibir, justicia social.", significado_invertido: "Deudas, dependencia, generosidad falsa.", numero: "VI" },
  { id: 70, nombre: "Siete de Oros", nombre_en: "Seven of Pentacles", palo: "oros", significado: "Paciencia, inversión, espera. Evaluar progreso, recompensa futura.", significado_invertido: "Falta de paciencia, resultado insatisfactorio, malgasto.", numero: "VII" },
  { id: 71, nombre: "Ocho de Oros", nombre_en: "Eight of Pentacles", palo: "oros", significado: "Dedicación, maestría, trabajo. Aprendizaje, habilidad, perfeccionamiento.", significado_invertido: "Mediocridad, falta de dedicación, aburrimiento.", numero: "VIII" },
  { id: 72, nombre: "Nueve de Oros", nombre_en: "Nine of Pentacles", palo: "oros", significado: "Independencia, lujo, logro. Autosuficiencia, elegancia, éxito financiero.", significado_invertido: "Dependencia, excesos, superficialidad.", numero: "IX" },
  { id: 73, nombre: "Diez de Oros", nombre_en: "Ten of Pentacles", palo: "oros", significado: "Legado, familia, estabilidad. Riqueza generacional, tradición, hogar.", significado_invertido: "Pérdida financiera, problemas familiares, inestabilidad.", numero: "X" },
  { id: 74, nombre: "Sota de Oros", nombre_en: "Page of Pentacles", palo: "oros", significado: "Estudio, ambición, oportunidad. Nuevos proyectos, aprendizaje práctico.", significado_invertido: "Falta de progreso, pereza, oportunidad perdida.", numero: "Sota" },
  { id: 75, nombre: "Caballo de Oros", nombre_en: "Knight of Pentacles", palo: "oros", significado: "Diligencia, rutina, perseverancia. Trabajo constante, confiabilidad.", significado_invertido: "Pereza, estancamiento, falta de progreso.", numero: "Caballo" },
  { id: 76, nombre: "Reina de Oros", nombre_en: "Queen of Pentacles", palo: "oros", significado: "Abundancia, nutrición, praktisch. Mujer práctica, generosa, conectada a la tierra.", significado_invertido: "Dependencia material, descuido, negatividad.", numero: "Reina" },
  { id: 77, nombre: "Rey de Oros", nombre_en: "King of Pentacles", palo: "oros", significado: "Éxito financiero, liderazgo práctico, abundancia. Hombre próspero, generoso.", significado_invertido: "Avaricia, materialismo, corrupción.", numero: "Rey" }
];

// Combinar todas las cartas
const TODAS_LAS_CARTAS = [...ARCANOS_MAYORES, ...ARCROS_MENORES];

// Mazos disponibles
const MAZOS = {
  rider: { nombre: "Rider-Waite", año: 1909, estilo: "Clásico anglonorteamericano" },
  marsella: { nombre: "Marsella", año: 1450, estilo: "Tradicional francés" },
  thoth: { nombre: "Thoth", año: 1943, estilo: "Ocultismo de Aleister Crowley" },
  valle: { nombre: "El Valle", año: 1980, estilo: "Estilo español contemporáneo" }
};

// Tipos de tirada
const TIRADAS = {
  una: { nombre: "Una Carta", cantidad: 1, descripcion: "Respuesta rápida a una pregunta" },
  dos: { nombre: "Dos Cartas (Vínculo)", cantidad: 3, descripcion: "Vínculo — Tu energía, Su energía, Consejo" },
  tres: { nombre: "Tres Cartas", cantidad: 3, descripcion: "Pasado, Presente, Futuro" },
  cruz: { nombre: "Cruz Simple", cantidad: 5, descripcion: "Situación, Obstáculo, Consejo" },
  amor: { nombre: "Tirada del Amor", cantidad: 7, descripcion: "Relaciones y sentimientos — Solo Arcanos Mayores" },
  celtica: { nombre: "Celta", cantidad: 10, descripcion: "Tirada completa y detallada" },
  arbol: { nombre: "Árbol de la Vida", cantidad: 10, descripcion: "Tirada kabbalística — Los 10 Sephirot" }
};
