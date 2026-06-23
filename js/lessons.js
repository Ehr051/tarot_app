// 📖 Sistema de Lecciones Narrativas — "El Viaje del Loco"
// Versión con progresión visual basada en cartas

const CHAPTERS = [
  // ═══════════════ CAPÍTULO 1: LOS ARCAnOS MAYORES ═══════════════
  {
    id: 'arcanos',
    titulo: 'El Viaje del Loco',
    descripcion: 'Los 22 Arcanos Mayores cuentan la historia de una vida. Desde la inocencia hasta la sabiduría.',
    icono: '🌟',
    color: '#d4af37',
    unlockAt: 0.5,
    escenas: [
      {
        titulo: 'El Loco',
        cartaEnsenar: 0,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Loco en posición upright?', carta: 0, opciones: ['Inocencia, nuevos comienzos, libertad', 'Sabiduría, conocimiento profundo', 'Poder y dominio sobre otros', 'Muerte y transformación'], correcta: 0 },
          { tipo: 'direccion', pregunta: 'Si El Loco está invertido, ¿qué podría indicar?', carta: 0, invertida: true, opciones: ['Temor al cambio, irresponsabilidad, caos', 'Alegría y celebración', 'Confusión total', 'Éxito asegurado'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué número tiene El Loco en el tarot?', opciones: ['XXI', '0 (sin número)', 'I', 'XIII'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El perro que acompaña al Loco representa:', opciones: ['El peligro y la amenaza', 'La naturaleza salvaje', 'Los instintos que nos guían y protegen', 'La obediencia ciega'], correcta: 2 },
          { tipo: 'historia', pregunta: '¿Por qué El Loco no tiene un número fijo?', opciones: ['Porque es el más débil', 'Porque representa el potencial puro, antes de toda definición', 'Porque fue un error del creador', 'Porque es el más poderoso'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Mago',
        cartaEnsenar: 1,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Mago?', carta: 1, opciones: ['Manifestación, poder personal, habilidad', 'Misterio y conocimiento oculto', 'Fertilidad y abundancia', 'Lucha y conflicto'], correcta: 0 },
          { tipo: 'identificar', pregunta: 'El Mago sostiene un bastón hacia arriba. ¿Qué simboliza?', opciones: ['Sumisión ante Dios', 'Canalizar la energía divina hacia la tierra', 'Amenaza', 'Nada en particular'], correcta: 1 },
          { tipo: 'direccion', pregunta: '¿Qué indica El Mago invertido?', carta: 1, invertida: true, opciones: ['Manipulación, engaño, talento mal used', 'Generosidad extrema', 'Fuerza física', 'Paciencia'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Los cuatro símbolos en la mesa del Mago representan:', opciones: ['Las estaciones del año', 'Los cuatro palos del tarot y sus elementos', 'Los puntos cardinales', 'Las edades de la vida'], correcta: 1 },
          { tipo: 'significado', pregunta: 'En una lectura, El Mago sugiere que tenés:', carta: 1, opciones: ['Todos los recursos necesarios para empezar', 'Necesidad de descansar', 'Un enemigo oculto', 'Pérdida económica'], correcta: 0 }
        ]
      },
      {
        titulo: 'La Sacerdotisa',
        cartaEnsenar: 2,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Sacerdotisa?', carta: 2, opciones: ['Acción inmediata', 'Intuición, conocimiento interior, paciencia', 'Riqueza material', 'Conflicto armado'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'Las columnas detrás de la Sacerdotisa se llaman:', opciones: ['Blanca y negra (Jachin y Boaz)', 'Roja y azul', 'Dorada y plateada', 'Verde y morada'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El rollo que sostiene representa:', opciones: ['Un mapa del tesoro', 'El conocimiento oculto que solo se revela con intuición', 'Una carta de amor', 'Un contrato legal'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Sacerdotisa en posición invertida sugiere:', carta: 2, invertida: true, opciones: ['Secretos ocultos, intuición bloqueada, confusión', 'Claridad mental total', 'Éxito financiero', 'Viaje largo'], correcta: 0 },
          { tipo: 'historia', pregunta: 'La Sacerdotisa es la carta opuesta a:', opciones: ['El Loco', 'El Mago', 'La Emperatriz', 'El Ermitaño'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Emperatriz',
        cartaEnsenar: 3,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Emperatriz?', carta: 3, opciones: ['Disciplina y reglas', 'Fertilidad, creatividad, abundancia natural', 'Guerra y conquista', 'Soledad y meditación'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'El escudo de La Emperatriz tiene el símbolo de:', opciones: ['Marte ♂', 'Venus ♀', 'Júpiter ♃', 'Saturno ♄'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La Emperatriz representa el arquetipo de:', opciones: ['El padre severo', 'La madre nutricia y la naturaleza generosa', 'El guerrero', 'El ermitaño'], correcta: 1 },
          { tipo: 'significado', pregunta: 'En amor, La Emperatriz sugiere:', carta: 3, opciones: ['Separación', 'Fertilidad, romance, conexión profunda', 'Celos', 'Aventura'], correcta: 1 },
          { tipo: 'direccion', pregunta: 'La Emperatriz invertida puede indicar:', carta: 3, invertida: true, opciones: ['Dependencia, bloqueo creativo, esterilidad emocional', 'Independencia total', 'Fuerza física', 'Alegría desbordante'], correcta: 0 }
        ]
      },
      {
        titulo: 'El Emperador',
        cartaEnsenar: 4,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Emperador?', carta: 4, opciones: ['Emociones y sentimientos', 'Autoridad, liderazgo, estabilidad, estructura', 'Muerte y renacimiento', 'Viaje espiritual'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'El Emperador tiene nums en su trono. ¿Cuántos?', opciones: ['2', '4', '6', '8'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El Emperador y La Emperatriz son complementarios porque:', opciones: ['Él es la acción, ella es la recepción', 'Él es el fuego, ella es el agua', 'Él es la estructura, ella es la naturaleza', 'Todas las anteriores'], correcta: 3 },
          { tipo: 'significado', pregunta: 'El Emperador invertido puede indicar:', carta: 4, invertida: true, opciones: ['Tiranía, rigidez extrema, abuso de poder', 'Generosidad', 'Creatividad', 'Paciencia'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El número IV (4) en el tarot representa:', opciones: ['Cambio y transformación', 'Estabilidad, fundamentos, estructura', 'Suerte y oportunidad', 'Completitud'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Hierofante',
        cartaEnsenar: 5,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Hierofante?', carta: 5, opciones: ['Rebeldía y cambio', 'Tradición, enseñanza espiritual, conformidad', 'Misterio y ocultismo', 'Riqueza material'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'Las dos llaves que cruza El Hierofante representan:', opciones: ['Llaves del cielo y la tierra', 'El bien y el mal', 'El pasado y el futuro', 'Lo masculino y lo femenino'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El Hierofante es el opuesto de:', opciones: ['El Mago', 'La Sacerdotisa', 'La Emperatriz', 'El Emperador'], correcta: 1 },
          { tipo: 'significado', pregunta: 'En posición invertida, El Hierofante sugiere:', carta: 5, invertida: true, opciones: ['Rebelión contra la autoridad, nuevas ideas', 'Obediencia ciega', 'Fuerza física', 'Paz interior'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Qué enseña El Hierofante?', opciones: ['A cuestionar todo', 'A seguir las tradiciones y buscar guía espiritual', 'A ser violento', 'A acumular riqueza'], correcta: 1 }
        ]
      },
      {
        titulo: 'Los Enamorados',
        cartaEnsenar: 6,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa Los Enamorados?', carta: 6, opciones: ['Solo amor romántico', 'Elección, armonía, valores en conflicto', 'Soledad', 'Poder'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La elección de Los Enamorados no es solo entre personas, sino entre:', opciones: ['Dos trabajos', 'Dos caminos de vida, valores y creencias', 'Dos restaurantes', 'Dos ciudades'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Quién observa desde arriba en Los Enamorados?', opciones: ['La Muerte', 'El Diablo', 'Un ángel (Rafael)', 'La Estrella'], correcta: 2 },
          { tipo: 'significado', pregunta: 'Los Enamorados invertidos pueden indicar:', carta: 6, invertida: true, opciones: ['Desarme, mala elección, confusión de valores', 'Amor perfecto', 'Éxito total', 'Paz'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El número VI (6) en el tarot representa:', opciones: ['Conflicto', 'Armonía, equilibrio, belleza', 'Muerte', 'Cambio'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Fuerza',
        cartaEnsenar: 8,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Fuerza?', carta: 8, opciones: ['Agresividad y violencia', 'Courage interior, paciencia, dominio propio', 'Debilidad', 'Velocidad'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La mujer domestica al león sin armas. Esto enseña que:', opciones: ['La fuerza física es lo más importante', 'La paciencia y la calma pueden con lo más salvaje', 'Los animales son débiles', 'Hay que ser cruel'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué símbolo tiene el cinturón de la mujer de La Fuerza?', opciones: ['El infinito (∞)', 'Una estrella', 'Una luna', 'Un sol'], correcta: 0 },
          { tipo: 'significado', pregunta: 'La Fuerza invertida puede indicar:', carta: 8, invertida: true, opciones: ['Inseguridad, debilidad interior, falta de control', 'Superpoderes', 'Riqueza', 'Viaje'], correcta: 0 },
          { tipo: 'historia', pregunta: 'En el Rider-Waite, La Fuerza es el número:', opciones: ['VIII (8)', 'XI (11)', 'XIII (13)', 'VII (7)'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Ermitaño',
        cartaEnsenar: 9,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Ermitaño?', carta: 9, opciones: ['Fiesta y diversión', 'Búsqueda espiritual, guía interior, soledad reflexiva', 'Guerra', 'Riqueza'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La linterna del Ermitaño contiene:', opciones: ['Fuego real', 'La estrella de David, símbolo de la verdad', 'Una vela', 'Un diamante'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué número tiene El Ermitaño?', opciones: ['VII', 'VIII', 'IX', 'X'], correcta: 2 },
          { tipo: 'significado', pregunta: 'El Ermitaño invertido puede indicar:', carta: 9, invertida: true, opciones: ['Aislamiento forzado, soledad no deseada', 'Fiesta', 'Éxito social', 'Rápido cambio'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Por qué El Ermitaño sube solo la montaña?', opciones: ['Porque odia a la gente', 'Porque la verdad solo se encuentra en la introspección', 'Porque está perdido', 'Porque tiene miedo'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Rueda de la Fortuna',
        cartaEnsenar: 10,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Rueda de la Fortuna?', carta: 10, opciones: ['Estancamiento', 'Ciclos, destino, giros inesperados de la fortuna', 'Muerte', 'Amor'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La serpiente que baja en la rueda representa:', opciones: ['El bien', 'Tontón, la materia cayendo al abismo', 'La vida', 'La muerte'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué seres rodean la rueda?', opciones: ['Cuatro ángeles', 'Un esfphinx, un perro/Tontón, una serpiente y un ángel', 'Cuatro demonios', 'Cuatro reyes'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Rueda invertida puede significar:', carta: 10, invertida: true, opciones: ['Mala racha, resistencia al cambio', 'Buena suerte', 'Paz', 'Amor'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Las letras hebreas en la rueda son:', opciones: ['Yod, He, Vav, He (el nombre de Dios)', 'A, B, C, D', 'Nada significativo', 'Los cuatro palos'], correcta: 0 }
        ]
      },
      {
        titulo: 'La Justicia',
        cartaEnsenar: 11,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Justicia?', carta: 11, options: ['Venganza personal', 'Equidad, verdad, causas y consecuencias', 'Amor', 'Riqueza'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La espada de La Justicia apunta hacia:', opciones: ['Arriba', 'Abajo', 'Los dos lados a la vez', 'Ningún lado'], correcta: 2 },
          { tipo: 'identificar', pregunta: 'La Justicia tiene los ojos:', options: ['Vendados (como la Justicia ciega)', 'Abiertos, mirando directamente', 'Cerrados', 'Mirando hacia arriba'], correcta: 1 },
          { tipo: 'significado', pregunta: 'En una lectura, La Justicia indica:', carta: 11, options: ['Que todo saldrá bien sin esfuerzo', 'Que las acciones tienen consecuencias, equilibrio', 'Que hay un juicio legal', 'Que debes vengarte'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La Justicia es el equilibrio entre:', options: ['Bien y mal', 'Razón y emoción', 'Pasado y futuro', 'Cielo e infierno'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Colgado',
        cartaEnsenar: 12,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Colgado?', carta: 12, options: ['Dolor y sufrimiento', 'Sacrificio, nueva perspectiva, pausa necesaria', 'Velocidad', 'Alegría'], correcta: 1 },
          { tipo: 'historia', pregunta: '¿Por qué El Colgado sonríe?', options: ['Porque es masoquista', 'Porque encontró la paz en la espera y la rendición', 'Porque está loco', 'Porque tiene miedo'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'La luz alrededor de la cabeza de El Colgado es:', options: ['Una corona', 'Un halo de iluminación', 'Un sombrero', 'Fuego'], correcta: 1 },
          { tipo: 'significado', pregunta: 'El Colgado invertido puede indicar:', carta: 12, invertida: true, options: ['Estancamiento, resistencia al cambio, egoísmo', 'Acción inmediata', 'Éxito', 'Paz'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El Colgado enseña que a veces hay que:', options: ['Actuar rápido', 'Soltar el control y ver las cosas desde otro ángulo', 'Escapar', 'Luchar'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Muerte',
        cartaEnsenar: 13,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Muerte en el tarot?', carta: 13, options: ['Fin físico literal', 'Transformación profunda, fin de una etapa, renacimiento', 'Enfermedad', 'Dolor'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La Muerte pisa a un rey y a un niño. Esto enseña que:', options: ['Los pobres sufren más', 'La muerte no distingue clases sociales', 'Los niños son más débiles', 'Los reyes son malos'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'En el horizonte de La Muerte se ve:', options: ['Una luna', 'El sol naciendo entre dos torres', 'Un ángel', 'Oscuridad total'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Muerte invertida puede indicar:', carta: 13, invertida: true, options: ['Resistencia al cambio, estancamiento', 'Certeza de muerte', 'Felicidad', 'Poder'], correcta: 0 },
          { tipo: 'historia', pregunta: 'La carta XIII NO significa muerte literal. Significa:', options: ['El fin de algo para que algo nuevo comience', 'Nada importante', 'Suerte', 'Viaje largo'], correcta: 0 }
        ]
      },
      {
        titulo: 'La Templanza',
        cartaEnsenar: 14,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Templanza?', carta: 14, options: ['Exceso y descontrol', 'Paciencia, equilibrio, moderación, curación', 'Velocidad', 'Soledad'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El agua que mezcla el ángel nunca se derrama. Esto representa:', options: ['Magia real', 'El dominio perfecto del equilibrio', 'Un truco', 'Que el agua no es real'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué tiene el ángel en la frente?', options: ['Una corona', 'Un triángulo (símbolo de fuego divino)', 'Una estrella', 'Nada'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Templanza invertida puede indicar:', carta: 14, invertida: true, options: ['Desequilibrio, exceso, impaciencia', 'Paz perfecta', 'Riqueza', 'Amor'], correcta: 0 },
          { tipo: 'historia', pregunta: 'La Templanza sigue a La Muerte porque:', options: ['Es coincidencia', 'Después de toda transformación viene el equilibrio', 'No tienen relación', 'Porque es más fuerte'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Diablo',
        cartaEnsenar: 15,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Diablo?', carta: 15, options: ['El mal absoluto', 'Dependencia, ataduras materiales, sombras internas', 'Amor', 'Paz'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Las cadenas de El Diablo son sueltas porque:', options: ['Es un error del dibujo', 'La liberación es posible, solo hay que quererla', 'Son de plástico', 'No significan nada'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'El Diablo tiene una antorcha invertida en la cola. Representa:', options: ['Fuego destructivo', 'La energía mal canalizada', 'Amor', 'Paz'], correcta: 1 },
          { tipo: 'significado', pregunta: 'El Diablo invertido puede indicar:', carta: 15, invertida: true, options: ['Liberación de ataduras, despertar', 'Mayor esclavitud', 'Muerte', 'Riqueza'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El Diablo es el opuesto de:', options: ['La Estrella', 'El Colgado', 'La Templanza', 'El Loco'], correcta: 2 }
        ]
      },
      {
        titulo: 'La Torre',
        cartaEnsenar: 16,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Torre?', carta: 16, options: ['Construcción', 'Destrucción súbita, revelación, cambio forzado', 'Amor', 'Paz'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La corona que sale volando representa:', options: ['Un tesoro', 'El ego y las estructuras falsas de poder', 'Una corona real', 'Nada'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué golpea La Torre?', options: ['Una ola', 'Un rayo (fuego divino)', 'Un terremoto', 'Un lobo'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Torre invertida puede significar:', carta: 16, invertida: true, options: ['Evitar la destrucción, cambio interno', 'Mayor destrucción', 'Paz', 'Amor'], correcta: 0 },
          { tipo: 'historia', pregunta: 'La Torre es necesaria porque:', options: ['Es divertida destruir', 'Lo que se construyó sobre cimientos falsos debe caer', 'No hay razón', 'Es el fin del mundo'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Estrella',
        cartaEnsenar: 17,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Estrella?', carta: 17, options: ['Oscuridad', 'Esperanza, inspiración, sanación, renovación', 'Miedo', 'Conflicto'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La Estrella viene después de La Torre porque:', options: ['Es coincidencia', 'Siempre hay esperanza después de la destrucción', 'No tienen relación', 'Para asustar'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Cuántas estrellas grandes hay en la carta?', options: ['1 grande y 7 pequeñas', '5', '10', '2'], correcta: 0 },
          { tipo: 'significado', pregunta: 'La Estrella invertida puede indicar:', carta: 17, invertida: true, options: ['Desesperanza, falta de fe', 'Más esperanza', 'Riqueza', 'Poder'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El agua que vierte la mujer representa:', options: ['Inundación', 'La vida nutriendo la tierra, sanación emocional', 'Lluvia', 'Un río'], correcta: 1 }
        ]
      },
      {
        titulo: 'La Luna',
        cartaEnsenar: 18,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa La Luna?', carta: 18, options: ['Claridad', 'Ilusión, miedos, subconsciente, confusión', 'Amor', 'Paz'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El perro y el lobo representan:', options: ['Mascotas', 'La parte domesticada y la salvaje de nuestra naturaleza', 'Peligro', 'Nada'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'La langosta que sale del agua representa:', options: ['Vida marina', 'Los miedos primitivos que emergen del subconsciente', 'Comida', 'Viaje'], correcta: 1 },
          { tipo: 'significado', pregunta: 'La Luna invertida puede indicar:', carta: 18, invertida: true, options: ['Claridad emergente, miedos superados', 'Mayor confusión', 'Paz', 'Riqueza'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El camino entre las dos torres de La Luna representa:', options: ['Un atajo', 'El viaje oscuro del subconsciente hacia la consciencia', 'Una trampa', 'Nada'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Sol',
        cartaEnsenar: 19,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Sol?', carta: 19, options: ['Tristeza', 'Alegría, vitalidad, éxito, claridad', 'Miedo', 'Conflicto'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El niño sobre el caballo representa:', options: ['Un príncipe', 'La inocencia y la alegría pura, sin baggage', 'Un soldado', 'Nada'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'Los girasoles en la carta representan:', options: ['Decoración', 'La vida floreciendo, abundancia', 'Muerte', 'Invierno'], correcta: 1 },
          { tipo: 'significado', pregunta: 'El Sol invertido puede indicar:', carta: 19, invertida: true, options: ['Tristeza temporal, nubes pasajeras', 'Oscuridad eterna', 'Muerte', 'Poder'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El Sol es la carta más positiva del tarot porque representa:', options: ['La muerte', 'La vida en su máxima expresión de alegría', 'El poder', 'El dinero'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Juicio',
        cartaEnsenar: 20,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Juicio?', carta: 20, options: ['Condena eterna', 'Despertar, renacimiento, llamado a una nueva vida', 'Pecado', 'Culpa'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Las figuras que se levantan representan:', options: ['Fantasmas', 'Nosotros, despertando a nuestro verdadero ser', 'Muertos reales', 'Demonios'], correcta: 1 },
          { tipo: 'identificar', pregunta: '¿Qué instrumento toca el ángel?', options: ['Una flauta', 'Una trompeta', 'Un tambor', 'Un violín'], correcta: 1 },
          { tipo: 'significado', pregunta: 'El Juicio invertido puede indicar:', carta: 20, invertida: true, options: ['Duda, autocrítica excesiva, negación del llamado', 'Aceptación total', 'Paz', 'Riqueza'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Por qué El Juicio no es una condena sino un regalo?', options: ['Porque es divertido', 'Porque es la oportunidad de renacer y ser quien realmente somos', 'Porque no significa nada', 'Porque da miedo'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Mundo',
        cartaEnsenar: 21,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa El Mundo?', carta: 21, options: ['El fin triste', 'Completitud, logro, integración, fin de un ciclo', 'Un nuevo problema', 'La muerte'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La corona de laurel representa:', options: ['Una trampa', 'La victoria y la completitud del viaje', 'Una rueda', 'Un collar'], correcta: 1 },
          { tipo: 'identificar', pregunta: 'Los cuatro seres vivos son los mismos que aparecen en:', options: ['Los four Evangelistas', 'La Rueda de la Fortuna y Los Enamorados', 'Ninguna otra carta', 'Todas las cartas'], correcta: 1 },
          { tipo: 'significado', pregunta: 'El Mundo invertido puede indicar:', carta: 21, invertida: true, options: ['Falta de cierre, incompletitud, estancamiento', 'Perfección', 'Paz', 'Riqueza'], correcta: 0 },
          { tipo: 'historia', pregunta: 'El Mundo es el último Arcano porque:', options: ['No hay más cartas', 'Representa la integración de todo lo aprendido en el viaje', 'Es el más fácil', 'No tiene significado especial'], correcta: 1 }
        ]
      }
    ]
  },

  // ═══════════════ CAPÍTULO 2: LOS CUATRO PALOS ═══════════════
  {
    id: 'palos',
    titulo: 'Los Cuatro Palos',
    descripcion: 'Espadas, Copas, Oros y Bastos. Cada palo representa un elemento y un área de la vida.',
    icono: '⚔️',
    color: '#8e44ad',
    unlockAt: 0.5,
    escenas: [
      {
        titulo: 'Las Espadas',
        cartaEnsenar: 36,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Con qué se asocian las Espadas?', carta: 36, opciones: ['Mente, conflictos, verdad', 'Emociones, amor, intuicion', 'Trabajo, dinero, salud', 'Accion, creatividad, pasion'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Qué elemento representan las Espadas?', opciones: ['El aire y los pensamientos', 'El agua y los sentimientos', 'La tierra y los bienes', 'El fuego y la accion'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Las Espadas hablan de:', opciones: ['Pensamientos y decisiones', 'Emociones y relaciones', 'Dinero y posesiones', 'Accion y creatividad'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué tipo de energia tienen las Espadas?', carta: 36, opciones: ['Mental y analitica', 'Romantica y sensible', 'Practica y material', 'Fisica y activa'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo se oppone a las Espadas?', opciones: ['Bastos por ser fuego', 'Copas por ser agua', 'Oros por ser tierra', 'Ninguno se oppone'], correcta: 0 }
        ]
      },
      {
        titulo: 'Las Copas',
        cartaEnsenar: 22,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Con qué se asocian las Copas?', carta: 22, opciones: ['Emociones, relaciones, intuicion', 'Trabajo, dinero, salud', 'Mente, conflictos, verdad', 'Accion, creatividad, pasion'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Qué elemento representan las Copas?', opciones: ['El agua y los sentimientos', 'El aire y los pensamientos', 'La tierra y los bienes', 'El fuego y la accion'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Las Copas hablan de:', opciones: ['Lo que sentimos y amamos', 'Lo que pensamos y decidimos', 'Lo que tenemos y construimos', 'Lo que hacemos y creamos'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué tipo de energia tienen las Copas?', carta: 22, opciones: ['Emocional y sensible', 'Mental y analitica', 'Practica y material', 'Fisica y activa'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo complementa a las Copas?', opciones: ['Oros por ser tierra', 'Espadas por ser aire', 'Bastos por ser fuego', 'Ninguno complementa'], correcta: 0 }
        ]
      },
      {
        titulo: 'Los Oros',
        cartaEnsenar: 64,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Con qué se asocian los Oros?', carta: 64, opciones: ['Trabajo, dinero, salud', 'Emociones, relaciones, intuicion', 'Mente, conflictos, verdad', 'Accion, creatividad, pasion'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Qué elemento representan los Oros?', opciones: ['La tierra y los bienes', 'El agua y los sentimientos', 'El aire y los pensamientos', 'El fuego y la accion'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Los Oros hablan de:', opciones: ['Lo que tenemos y construimos', 'Lo que sentimos y amamos', 'Lo que pensamos y decidimos', 'Lo que hacemos y creamos'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué tipo de energia tienen los Oros?', carta: 64, opciones: ['Practica y estable', 'Emocional y sensible', 'Mental y analitica', 'Fisica y activa'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo se asocia con lo material?', opciones: ['Los Oros y la tierra', 'Las Copas y el agua', 'Los Bastos y el fuego', 'Las Espadas y el aire'], correcta: 0 }
        ]
      },
      {
        titulo: 'Los Bastos',
        cartaEnsenar: 50,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Con qué se asocian los Bastos?', carta: 50, opciones: ['Accion, creatividad, pasion', 'Trabajo, dinero, salud', 'Mente, conflictos, verdad', 'Emociones, relaciones, intuicion'], correcta: 0 },
          { tipo: 'historia', pregunta: '¿Qué elemento representan los Bastos?', opciones: ['El fuego y la accion', 'El agua y los sentimientos', 'El aire y los pensamientos', 'La tierra y los bienes'], correcta: 0 },
          { tipo: 'historia', pregunta: 'Los Bastos hablan de:', opciones: ['Lo que hacemos y creamos', 'Lo que tenemos y construimos', 'Lo que sentimos y amamos', 'Lo que pensamos y decidimos'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué tipo de energia tienen los Bastos?', carta: 50, opciones: ['Activa y creativa', 'Pasiva y tranquila', 'Mental y analitica', 'Emocional y sensible'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo se oppone a los Bastos?', opciones: ['Copas por ser agua', 'Oros por ser tierra', 'Espadas por ser aire', 'Ninguno se oppone'], correcta: 0 }
        ]
      },
      {
        titulo: 'Los Cuatro Palos Juntos',
        cartaEnsenar: 0,
        ejercicios: [
          { tipo: 'historia', pregunta: '¿Cuántos palos tiene el tarot?', opciones: ['Cuatro palos distintos', 'Tres palos distintos', 'Cinco palos distintos', 'Seis palos distintos'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo es agua?', opciones: ['El palo de Copas', 'El palo de Espadas', 'El palo de Oros', 'El palo de Bastos'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo es fuego?', opciones: ['El palo de Bastos', 'El palo de Copas', 'El palo de Espadas', 'El palo de Oros'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo es tierra?', opciones: ['El palo de Oros', 'El palo de Copas', 'El palo de Bastos', 'El palo de Espadas'], correcta: 0 },
          { tipo: 'identificar', pregunta: '¿Qué palo es aire?', opciones: ['El palo de Espadas', 'El palo de Oros', 'El palo de Copas', 'El palo de Bastos'], correcta: 0 }
        ]
      }
    ]
  },

  // ═══════════════ CAPÍTULO 3: LAS CORTES ═══════════════
  {
    id: 'cortes',
    titulo: 'Las Cortes del Tarot',
    descripcion: 'Los Reyes, Reinas, Caballeros y Pajes. Cada palo tiene su corte: personas, personalidades, energías.',
    icono: '👑',
    color: '#c0392b',
    unlockAt: 0.5,
    escenas: [
      {
        titulo: 'Los Reyes',
        cartaEnsenar: 35,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa el Rey de Copas?', carta: 35, opciones: ['Control emocional, diplomacia, sabiduria', 'Agresividad, violencia, conflicto', 'Pobreza, carencia, perdida', 'Miedo, incertidumbre, duda'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa el Rey de Espadas?', carta: 49, opciones: ['Emociones, amor, intuicion', 'Claridad mental, intelecto, verdad', 'Dinero, trabajo, salud', 'Accion, creatividad, pasion'], correcta: 1 },
          { tipo: 'historia', pregunta: '¿Cuántos Reyes hay en total en el tarot?', opciones: ['Dos Reyes por palo', 'Cuatro Reyes por palo', 'Seis Reyes por palo', 'Ocho Reyes por palo'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El Rey representa en una lectura:', opciones: ['Energia masculina, autoridad, maestria', 'Energia femenina, nutricion', 'Movimiento, accion, viaje', 'Aprendizaje, mensajes'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa el Rey de Bastos?', carta: 63, opciones: ['Liderazgo natural, vision, pasion creativa', 'Paciencia, estabilidad, abundance', 'Conflicto, guerra, decision', 'Emociones, sentimientos, amor'], correcta: 0 }
        ]
      },
      {
        titulo: 'Las Reinas',
        cartaEnsenar: 34,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa la Reina de Copas?', carta: 34, opciones: ['Compasion, intuicion, serenidad', 'Guerra, conflicto, poder', 'Dinero, trabajo, posesiones', 'Accion, velocidad, movimiento'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa la Reina de Espadas?', carta: 48, opciones: ['Independencia, claridad, honestidad', 'Emociones, amor, compas', 'Riqueza, abundancia, confort', 'Pasion, creatividad, energia'], correcta: 0 },
          { tipo: 'historia', pregunta: 'La diferencia entre un Rey y una Reina es:', opciones: ['El Rey es activo, la Reina es receptiva', 'El Rey es hombre, la Reina es mujer', 'No hay ninguna diferencia', 'La Reina es mas debil'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa la Reina de Oros?', carta: 76, opciones: ['Conflicto, guerra, duda', 'Abundancia material, nutricion, confort', 'Viaje, movimiento, cambio', 'Misterio, intuicion, secreto'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Las Reinas en una lectura representan:', opciones: ['Energia femenina, nutricion, intuicion', 'Accion rapida, movimiento, viaje', 'Autoridad, poder, liderazgo', 'Aprendizaje, curiosidad, mensajes'], correcta: 0 }
        ]
      },
      {
        titulo: 'Los Caballeros',
        cartaEnsenar: 33,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa el Caballero de Copas?', carta: 33, opciones: ['Romanticismo, creatividad, embajador del amor', 'Paciencia, estabilidad, calma', 'Sabiduria, autoridad, control', 'Entusiasmo, aprendizaje, mensaje'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa el Caballero de Espadas?', carta: 47, opciones: ['Amor, compasion, sentimientos', 'Determinacion, intelecto en accion, valentia', 'Dinero, trabajo, posesiones', 'Pasion, energia, creatividad'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Los Caballeros representan:', opciones: ['Energia en movimiento, accion, alguien que llega', 'Estabilidad, calma, paciencia', 'La muerte, el fin de un ciclo', 'Riqueza, abundancia, posesiones'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa el Caballero de Bastos?', carta: 61, opciones: ['Paciencia, estabilidad, abundance', 'Accion, pasion, aventura, energia pura', 'Emociones, sentimientos, amor', 'Mente, intelecto, verdad'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El Caballero siempre esta:', opciones: ['En movimiento, yendo hacia algo', 'Sentado, esperando', 'Durmiendo', 'Corriendo sin rumbo'], correcta: 0 }
        ]
      },
      {
        titulo: 'Las Sotas',
        cartaEnsenar: 32,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa la Sota de Copas?', carta: 32, opciones: ['Intuicion, creatividad, mensaje emocional', 'Madurez, autoridad, sabiduria', 'Conflicto, accion, velocidad', 'Dinero, trabajo, salud'], correcta: 0 },
          { tipo: 'significado', pregunta: '¿Qué representa la Sota de Espadas?', carta: 46, opciones: ['Fuerza, poder, control', 'Curiosidad intelectual, espionaje, mensaje', 'Amor, compas, sentimientos', 'Riqueza, abundancia, confort'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Las Sotas son el equivalente humano de:', opciones: ['Los Reyes, los maestros', 'Los Ases, los comienzos', 'Los ninos, los que aprenden', 'Los ancianos, los sabios'], correcta: 2 },
          { tipo: 'significado', pregunta: '¿Qué representa la Sota de Bastos?', carta: 60, opciones: ['Estabilidad, calma, paciencia', 'Entusiasmo, nuevos comienzos, curiosidad', 'Emociones, sentimientos, intuicion', 'Mente, intelecto, verdad'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Las Sotas en una lectura suelen indicar:', opciones: ['Un mensaje o noticia que llega', 'Un fin de ciclo', 'Una decision importante', 'Un viaje largo'], correcta: 0 }
        ]
      },
      {
        titulo: 'La Corte Completa',
        cartaEnsenar: 36,
        ejercicios: [
          { tipo: 'historia', pregunta: '¿Cuántas cartas de corte hay por palo?', opciones: ['Dos cartas por palo', 'Tres cartas por palo', 'Cuatro cartas por palo', 'Cinco cartas por palo'], correcta: 2 },
          { tipo: 'historia', pregunta: '¿Cuántas cartas de corte hay en total?', opciones: ['Ocho cartas en total', 'Doce cartas en total', 'Dieciseis cartas en total', 'Veinte cartas en total'], correcta: 2 },
          { tipo: 'historia', pregunta: 'Si una lectura muestra un Rey y una Reina del mismo palo, podria indicar:', opciones: ['Conflicto, guerra, destruccion', 'Union de energias complementarias', 'La muerte, un fin repentino', 'Nada, no tiene importancia'], correcta: 1 },
          { tipo: 'historia', pregunta: 'La Sota aparece en una lectura cuando:', opciones: ['Hay un viaje largo y peligroso', 'Alguien esta aprendiendo o llega un mensaje', 'Hay una guerra inminente', 'Es de noche y no se ve nada'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Los Caballeros en una lectura suelen representar:', opciones: ['Paz, calma, estabilidad', 'Accion, movimiento, alguien que llega o va', 'Estancamiento, nada cambia', 'Riqueza, abundancia, dinero'], correcta: 1 }
        ]
      }
    ]
  },

  // ═══════════════ CAPÍTULO 4: LOS NÚMEROS ═══════════════
  {
    id: 'numeros',
    titulo: 'Los Números del Tarot',
    descripcion: 'Del As al Diez, cada número cuenta una parte de la historia. Aprender sus significados es la base de toda lectura.',
    icono: '🔢',
    color: '#27ae60',
    unlockAt: 0.5,
    escenas: [
      {
        titulo: 'Los Ases',
        cartaEnsenar: 22,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa el As de Copas?', carta: 22, opciones: ['Guerra, conflicto, poder', 'Nuevos comienzos emocionales, amor, intuicion', 'Dinero, trabajo, salud', 'Cambio, transformacion, muerte'], correcta: 1 },
          { tipo: 'historia', pregunta: '¿Por qué el As es el inicio?', opciones: ['Porque es el primer numero', 'Porque representa el potencial puro antes de manifestarse', 'Porque es el mas debil', 'No tiene razon de ser'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el As de Espadas?', carta: 36, opciones: ['Emociones, amor, intuicion', 'Claridad mental, verdad, breakthrough', 'Trabajo, dinero, salud', 'Accion, creatividad, pasion'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el As de Bastos?', carta: 50, opciones: ['Paz, calma, estabilidad', 'Inspiracion, chispa creativa, nuevo impulso', 'Conflicto, guerra, poder', 'Pérdida, tristeza, duelo'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Todos los Ases comparten una cosa en comun:', opciones: ['Son el final de algo', 'Representan un nuevo comienzo, potencial puro', 'Son cartas de conflicto', 'No tienen nada en comun'], correcta: 1 }
        ]
      },
      {
        titulo: 'Los Numeros Bajos (2-5)',
        cartaEnsenar: 23,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa el 2 de Copas?', carta: 23, opciones: ['Soledad, aislamiento, perdida', 'Union, conexion, armonia entre dos personas', 'Conflicto, guerra, victoria', 'Viaje, movimiento, cambio'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 3 de Oros?', carta: 66, opciones: ['Perdida total, destruccion', 'Creatividad, colaboracion, trabajo en equipo', 'Muerte, fin de ciclo', 'Miedo, incertidumbre, duda'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 4 de Bastos?', carta: 53, opciones: ['Conflicto, guerra, poder', 'Celebracion, hogar, armonia', 'Paz, calma, estabilidad', 'Pérdida, tristeza, duelo'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 5 de Espadas?', carta: 40, opciones: ['Victoria, exito, logro', 'Conflicto, perdida, victoria a cualquier costo', 'Amor, compas, sentimientos', 'Trabajo, dinero, salud'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Los numeros del 2 al 5 representan:', opciones: ['El final de un ciclo', 'El desarrollo de una situacion, crecimiento', 'La muerte, el fin', 'No representan nada'], correcta: 1 }
        ]
      },
      {
        titulo: 'Los Numeros Altos (6-10)',
        cartaEnsenar: 27,
        ejercicios: [
          { tipo: 'significado', pregunta: '¿Qué representa el 6 de Copas?', carta: 27, opciones: ['Guerra, conflicto, poder', 'Nostalgia, recuerdos, inocencia, ninos', 'Dinero, trabajo, salud', 'Miedo, incertidumbre, duda'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 7 de Oros?', carta: 70, opciones: ['Perdida total, destruccion', 'Paciencia, cosecha esperando, fruto del esfuerzo', 'Velocidad, movimiento, cambio', 'Conflicto, guerra, victoria'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 8 de Bastos?', carta: 57, opciones: ['Estabilidad, calma, paciencia', 'Velocidad, movimiento, accion rapida', 'Emociones, sentimientos, amor', 'Mente, intelecto, verdad'], correcta: 1 },
          { tipo: 'significado', pregunta: '¿Qué representa el 10 de Espadas?', carta: 45, opciones: ['Nuevo comienzo, inspiracion', 'Fin doloroso, traicion, agotamiento total', 'Amor, compas, sentimientos', 'Exito, logro, reconocimiento'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Los numeros del 6 al 10 representan:', opciones: ['El comienzo de algo', 'El climax y cierre de una situacion', 'La muerte, el fin total', 'No representan nada'], correcta: 1 }
        ]
      },
      {
        titulo: 'El Ciclo del Numero',
        cartaEnsenar: 22,
        ejercicios: [
          { tipo: 'historia', pregunta: '¿Cuántas cartas numericas hay por palo?', opciones: ['Ocho cartas por palo', 'Nueve cartas por palo', 'Diez cartas por palo', 'Once cartas por palo'], correcta: 2 },
          { tipo: 'historia', pregunta: 'El numero 1 (As) representa:', opciones: ['El final de todo', 'El potencial puro, la semilla', 'El conflicto, la guerra', 'La muerte, el fin'], correcta: 1 },
          { tipo: 'historia', pregunta: 'El numero 10 representa:', opciones: ['El comienzo de algo nuevo', 'La completitud de un ciclo', 'El medio del camino', 'Nada importante'], correcta: 1 },
          { tipo: 'historia', pregunta: 'Despues del 10, ¿que viene?', opciones: ['El 11, un numero nuevo', 'Un nuevo As, un nuevo ciclo', 'Nada mas, se acabo', 'El 0, el vacio'], correcta: 1 },
          { tipo: 'historia', pregunta: '¿Cuántas cartas numericas hay en total en el tarot?', opciones: ['Veinte cartas en total', 'Treinta y seis cartas en total', 'Cuarenta cartas en total', 'Cuarenta y cuatro cartas en total'], correcta: 2 }
        ]
      }
    ]
  }
];

// ═══════════════ ESTADO ═══════════════
let storyState = {
  capituloActual: 0,
  escenaActual: 0,
  ejerciciosCompletados: 0,
  ejerciciosCorrectos: 0,
  enProgreso: false,
  respuestas: []
};

function getStoryProgress() {
  return JSON.parse(localStorage.getItem('tarot_story_progress') || '{}');
}

function saveStoryProgress(progress) {
  localStorage.setItem('tarot_story_progress', JSON.stringify(progress));
}

function getChapterProgress(chapterId) {
  const progress = getStoryProgress();
  return progress[chapterId] || { completado: false, escenasCompletadas: 0, estrellas: 0 };
}

function saveChapterProgress(chapterId, data) {
  const progress = getStoryProgress();
  progress[chapterId] = data;
  saveStoryProgress(progress);
}

function isChapterUnlocked(index) {
  if (index === 0) return true;
  const prevChapter = CHAPTERS[index - 1];
  const prevProgress = getChapterProgress(prevChapter.id);
  if (prevProgress.completado) return true;
  // Unlock at threshold
  const totalScenes = prevChapter.escenas.length;
  const threshold = Math.ceil(totalScenes * (prevChapter.unlockAt || 0.5));
  return (prevProgress.escenasCompletadas || 0) >= threshold;
}

function getChapterStars(chapterId) {
  const progress = getChapterProgress(chapterId);
  return progress.estrellas || 0;
}

function renderChapters() {
  const container = document.getElementById('chapters-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const allCompleted = CHAPTERS.every(ch => getChapterProgress(ch.id).completado);
  
  if (allCompleted) {
    container.innerHTML = `
      <div class="story-complete-banner">
        <div class="story-complete-icon">🏆</div>
        <p>Ya conoces todas las cartas de tarot, ahora completa los ejercicios de practica y pon a prueba tus conocimientos.</p>
        <button class="btn-primary" onclick="irA('aprendizaje'); document.querySelector('[onclick*=iniciarPractica]').click();" style="margin-top:1rem">
          Ir a Práctica
        </button>
      </div>
    `;
  }
  
  CHAPTERS.forEach((chapter, i) => {
    const unlocked = isChapterUnlocked(i);
    const progress = getChapterProgress(chapter.id);
    const totalScenes = chapter.escenas.length;
    const completedScenes = progress.escenasCompletadas || 0;
    const estrellas = progress.estrellas || 0;
    const totalEstrellas = totalScenes * 3;
    const porcentaje = Math.round((completedScenes / totalScenes) * 100);
    
    const div = document.createElement('div');
    div.className = `chapter-card ${unlocked ? '' : 'locked'} ${progress.completado ? 'completed' : ''}`;
    div.style.setProperty('--chapter-color', chapter.color);
    
    if (unlocked) {
      div.onclick = () => iniciarCapitulo(i);
    }
    
    // Card thumbnails
    let cardsHTML = '';
    if (unlocked) {
      const cardsToShow = chapter.escenas.slice(0, 8);
      cardsHTML = `<div class="chapter-cards-preview">`;
      cardsToShow.forEach((escena, j) => {
        const carta = TODAS_LAS_CARTAS.find(c => c.id === escena.cartaEnsenar);
        const isCompleted = j < completedScenes;
        const imgUrl = getCardImageUrl(escena.cartaEnsenar, mazoReferencia);
        cardsHTML += `
          <div class="chapter-card-thumb ${isCompleted ? 'done' : ''}" title="${escena.titulo}">
            <img src="${imgUrl}" alt="${carta?.nombre}" onerror="this.style.display='none'">
          </div>
        `;
      });
      if (totalScenes > 8) {
        cardsHTML += `<div class="chapter-card-more">+${totalScenes - 8}</div>`;
      }
      cardsHTML += `</div>`;
    }
    
    div.innerHTML = `
      <div class="chapter-left">
        <div class="chapter-icon">${unlocked ? chapter.icono : '🔒'}</div>
        <div class="chapter-info">
          <h3 class="chapter-title">${chapter.titulo}</h3>
          <p class="chapter-desc">${chapter.descripcion}</p>
          <div class="chapter-progress-bar">
            <div class="chapter-progress-fill" style="width: ${porcentaje}%"></div>
          </div>
          <div class="chapter-stats">
            <span>${completedScenes}/${totalScenes} escenas</span>
            ${estrellas > 0 ? `<span>${'⭐'.repeat(Math.min(estrellas, 3))}</span>` : ''}
            ${progress.completado ? `<span class="chapter-done-badge">✅</span>` : ''}
          </div>
        </div>
      </div>
      ${cardsHTML}
      <div class="chapter-arrow">${unlocked ? '→' : ''}</div>
    `;
    
    container.appendChild(div);
  });
}

function iniciarCapitulo(index) {
  storyState.capituloActual = index;
  storyState.escenaActual = 0;
  storyState.enProgreso = true;
  
  const chapter = CHAPTERS[index];
  const progress = getChapterProgress(chapter.id);
  if (progress.escenasCompletadas && progress.escenasCompletadas < chapter.escenas.length) {
    storyState.escenaActual = progress.escenasCompletadas;
  }
  
  mostrarPantallaHistoria();
}

function mostrarPantallaHistoria() {
  const chapter = CHAPTERS[storyState.capituloActual];
  const escena = chapter.escenas[storyState.escenaActual];
  
  if (!escena) {
    completarCapitulo();
    return;
  }
  
  document.getElementById('chapters-container').classList.add('hidden');
  const storyScreen = document.getElementById('story-screen');
  storyScreen.classList.remove('hidden');
  
  document.getElementById('story-chapter-title').textContent = `${chapter.icono} ${chapter.titulo}`;
  
  // Scene navigation dots
  const dotsHTML = chapter.escenas.map((_, i) => {
    const done = i < (getChapterProgress(chapter.id).escenasCompletadas || 0);
    const current = i === storyState.escenaActual;
    return `<span class="story-dot ${done ? 'done' : ''} ${current ? 'current' : ''}"></span>`;
  }).join('');
  document.getElementById('story-chapter-title').innerHTML = `${chapter.icono} ${chapter.titulo} <div class="story-dots">${dotsHTML}</div>`;
  
  document.getElementById('story-scene-title').textContent = escena.titulo;
  document.getElementById('story-narrative').textContent = `Escena ${storyState.escenaActual + 1} de ${chapter.escenas.length}`;
  
  const carta = TODAS_LAS_CARTAS.find(c => c.id === escena.cartaEnsenar);
  const imgUrl = getCardImageUrl(escena.cartaEnsenar, mazoReferencia);
  document.getElementById('story-card-img').innerHTML = `<img src="${imgUrl}" alt="${carta?.nombre}" onerror="this.style.display='none'">`;
  document.getElementById('story-card-name').textContent = carta?.nombre || '';
  
  storyState.ejerciciosCompletados = 0;
  storyState.ejerciciosCorrectos = 0;
  storyState.respuestas = [];
  
  document.getElementById('story-score').textContent = `0/${escena.ejercicios.length}`;
  document.getElementById('story-exercise-area').classList.add('hidden');
  document.getElementById('story-narrative-area').classList.remove('hidden');
  document.getElementById('story-result').classList.add('hidden');
  
  if (typeof gsap !== 'undefined') {
    gsap.from('#story-screen', { opacity: 0, y: 20, duration: 0.5 });
  }
}

function iniciarEjercicio() {
  document.getElementById('story-narrative-area').classList.add('hidden');
  document.getElementById('story-exercise-area').classList.remove('hidden');
  
  const chapter = CHAPTERS[storyState.capituloActual];
  const escena = chapter.escenas[storyState.escenaActual];
  mostrarEjercicio(escena);
}

function mostrarEjercicio(escena) {
  const ejIndex = storyState.ejerciciosCompletados;
  if (ejIndex >= escena.ejercicios.length) {
    finalizarEscena();
    return;
  }
  
  const ejercicio = escena.ejercicios[ejIndex];
  const container = document.getElementById('story-exercise-content');
  
  let opcionesHTML = '';
  ejercicio.opciones.forEach((opt, i) => {
    const texto = typeof opt === 'number' ? (TODAS_LAS_CARTAS.find(c => c.id === opt)?.nombre || `Carta ${opt}`) : opt;
    opcionesHTML += `
      <button class="story-option" data-index="${i}" onclick="verificarEjercicioHistoria(this, ${i}, ${ejercicio.correcta})">
        ${texto}
      </button>
    `;
  });
  
  container.innerHTML = `
    <div class="story-exercise-header">
      <span class="story-exercise-type">${getEjercicioTipoLabel(ejercicio.tipo)}</span>
      <span class="story-exercise-count">${ejIndex + 1}/${escena.ejercicios.length}</span>
    </div>
    <p class="story-question">${ejercicio.pregunta}</p>
    <div class="story-options">${opcionesHTML}</div>
  `;
  
  if (typeof gsap !== 'undefined') {
    gsap.from('.story-option', { y: 10, stagger: 0.08, duration: 0.3, clearProps: 'all' });
  }
}

function getEjercicioTipoLabel(tipo) {
  const labels = {
    identificar: '🔍 Identificar',
    significado: '📖 Significado',
    direccion: '🔄 Dirección',
    orden: '📋 Orden',
    historia: '📜 Historia'
  };
  return labels[tipo] || '❓ Pregunta';
}

function verificarEjercicioHistoria(btn, selectedIndex, correctIndex) {
  const buttons = document.querySelectorAll('.story-option');
  buttons.forEach(b => b.disabled = true);
  
  const isCorrect = selectedIndex === correctIndex;
  storyState.respuestas.push(isCorrect);
  storyState.ejerciciosCompletados++;
  
  btn.classList.add('selected');
  btn.classList.add(isCorrect ? 'correct' : 'wrong');
  
  if (!isCorrect) {
    buttons[correctIndex].classList.add('show-correct');
  }
  storyState.ejerciciosCorrectos += isCorrect ? 1 : 0;
  
  if (isCorrect) {
    showToast('✅ ¡Correcto!');
    if (typeof addXp === 'function') addXp(5);
  } else {
    showToast('❌ La respuesta correcta era la otra');
  }
  
  const chapter = CHAPTERS[storyState.capituloActual];
  const escena = chapter.escenas[storyState.escenaActual];
  document.getElementById('story-score').textContent = `${storyState.ejerciciosCorrectos}/${escena.ejercicios.length}`;
  
  setTimeout(() => {
    mostrarEjercicio(escena);
  }, 1500);
}

function finalizarEscena() {
  const chapter = CHAPTERS[storyState.capituloActual];
  const escena = chapter.escenas[storyState.escenaActual];
  const total = escena.ejercicios.length;
  const correctos = storyState.ejerciciosCorrectos;
  const porcentaje = Math.round((correctos / total) * 100);
  
  let estrellas = 0;
  if (porcentaje === 100) estrellas = 3;
  else if (porcentaje >= 70) estrellas = 2;
  else if (porcentaje >= 50) estrellas = 1;
  
  const progress = getChapterProgress(chapter.id);
  progress.escenasCompletadas = Math.max(progress.escenasCompletadas || 0, storyState.escenaActual + 1);
  progress.estrellas = Math.max(progress.estrellas || 0, estrellas);
  saveChapterProgress(chapter.id, progress);
  
  if (typeof addXp === 'function') addXp(estrellas * 10);
  if (typeof registrarPractica === 'function') registrarPractica();
  if (typeof checkAchievements === 'function') checkAchievements();
  
  document.getElementById('story-exercise-area').classList.add('hidden');
  document.getElementById('story-result').classList.remove('hidden');
  
  document.getElementById('story-result-icon').textContent = estrellas === 3 ? '🌟' : estrellas === 2 ? '⭐' : estrellas >= 1 ? '✨' : '📚';
  document.getElementById('story-result-title').textContent = estrellas === 3 ? '¡Perfecto!' : estrellas >= 2 ? '¡Muy bien!' : estrellas >= 1 ? 'Bien' : 'Seguí practicando';
  document.getElementById('story-result-score').textContent = `${correctos}/${total} (${porcentaje}%)`;
  document.getElementById('story-result-stars').textContent = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);
  
  // Check if next chapter should unlock
  const chapterIndex = storyState.capituloActual;
  const nextChapterUnlocked = isChapterUnlocked(chapterIndex + 1);
  const wasLockedBefore = chapterIndex + 1 < CHAPTERS.length && !isChapterUnlocked(chapterIndex + 1);
  
  let nextBtn = document.getElementById('story-next-btn');
  if (storyState.escenaActual < chapter.escenas.length - 1) {
    nextBtn.textContent = 'Siguiente escena →';
    nextBtn.onclick = () => {
      storyState.escenaActual++;
      mostrarPantallaHistoria();
    };
  } else {
    nextBtn.textContent = 'Ver resultados del capítulo';
    nextBtn.onclick = completarCapitulo;
  }
  
  // Show unlock notification
  if (nextChapterUnlocked && chapterIndex + 1 < CHAPTERS.length) {
    const nextChapter = CHAPTERS[chapterIndex + 1];
    const notif = document.createElement('div');
    notif.className = 'story-unlock-notif';
    notif.innerHTML = `🔓 ¡Nuevo capítulo desbloqueado: <strong>${nextChapter.titulo}</strong>!`;
    document.getElementById('story-result').appendChild(notif);
  }
}

function completarCapitulo() {
  const chapter = CHAPTERS[storyState.capituloActual];
  const progress = getChapterProgress(chapter.id);
  progress.completado = true;
  saveChapterProgress(chapter.id, progress);
  
  showToast(`🎉 ¡Capítulo "${chapter.titulo}" completado!`);
  
  document.getElementById('story-screen').classList.add('hidden');
  document.getElementById('story-result').classList.add('hidden');
  document.getElementById('story-narrative-area').classList.remove('hidden');
  document.getElementById('chapters-container').classList.remove('hidden');
  renderChapters();
}

function cerrarHistoria() {
  document.getElementById('story-screen').classList.add('hidden');
  document.getElementById('story-result').classList.add('hidden');
  document.getElementById('story-narrative-area').classList.remove('hidden');
  document.getElementById('chapters-container').classList.remove('hidden');
  renderChapters();
}
