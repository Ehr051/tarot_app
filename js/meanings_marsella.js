// 🔮 Significados Tarot de Marsella (tradición francesa)
// Estilo numerológico-arquetípico: el número + el palo definen la esencia
// Sin narrativa de escenas ni personificaciones — puro simbolismo estructural

const SIGNIFICADOS_MARSELLA = {
  // ═══════════════ ARCANOS MAYORES ═══════════════
  // Arquetipos puros — el viaje del espíritu a través de la materia
  "00": { upright: "Impulso primigenio sin destino. Espíritu que busca forma. Locura divina, salto al vacío creador.", reversed: "Atrapado en lo material. El llamado se ignora. Locura mundana, repetición sin conciencia." },
  "01": { upright: "Voluntad que organiza el caos. Manos que transforman. Dominio de los cuatro elementos: la creación consciente.", reversed: "Voluntad dispersa, trucos que reemplazan esencia. Manipulación, ambición sin norte." },
  "02": { upright: "Gnosis silenciosa. El velo entre mundos. Saber que no necesita hablar. Intuición como órgano de percepción.", reversed: "Saber superficial. Dogma sin comprensión. El velo se espesa, la verdad se oculta." },
  "03": { upright: "Naturaleza que da sin medida. Crecimiento orgánico, ciclo que se cumple. Fertilidad del tiempo y la paciencia.", reversed: "Exceso que asfixia. Dependencia de la abundancia externa. El jardín crece sin orden." },
  "04": { upright: "Orden que funda mundos. Estructura sagrada, poder que sirve a la totalidad. Autoridad del que construye.", reversed: "Estructura que oprime. Poder que olvida su propósito. Tiranía del orden vacío." },
  "05": { upright: "Voz de la tradición. Sabiduría que atraviesa generaciones. El rito que conecta con lo eterno.", reversed: "Herejía necesaria. Dogma que ya no sirve. Romper para encontrar el propio camino." },
  "06": { upright: "Punto de bifurcación. Dos caminos, una conciencia. La prueba del discernimiento: elegir el ser sobre el tener.", reversed: "Atrapado entre opciones. Indecisión que paraliza. Engaño de la elección fácil." },
  "07": { upright: "Dominio sobre las fuerzas opuestas. Voluntad que conquista a la inercia. Avance, superación del obstáculo.", reversed: "Fuerza mal dirigida. Exceso de voluntad que destruye. Caída tras el triunfo." },
  "08": { upright: "Equilibrio que no fuerza. La justicia como orden natural. Cada acción pesa en la balanza cósmica.", reversed: "Desequilibrio, deuda kármica. Justicia humana que falla. Consecuencias no asumidas." },
  "09": { upright: "Retiro que ilumina. Soledad fértil, la luz interior basta. Sabiduría del que se conoce a sí mismo.", reversed: "Aislamiento estéril. Miedo al contacto, luz que se apaga en la soledad." },
  "10": { upright: "Rueda que siempre gira. Arriba y abajo, todo vuelve. Ciclo inevitable, oportunidad del cambio.", reversed: "Resistencia al flujo. Agarrarse al pasado mientras todo se mueve. Bloqueo del ciclo natural." },
  "11": { upright: "Fuerza que no domina, comprende. La energía vital puesta al servicio del espíritu. Dominio sereno.", reversed: "Fuerza bruta sin conciencia. Descontrol de pasiones, voluntad que esclaviza." },
  "12": { upright: "Visión invertida. La suspensión revela lo invisible. Sacrificio del hacer para contemplar el ser.", reversed: "Sacrificio sin propósito. Sufrimiento que no enseña. Aferrarse a la posición que duele." },
  "13": { upright: "Lo que muere para que nazca lo nuevo. Siega inevitable, transformación total. El fin como umbral.", reversed: "Resistencia al fin necesario. Aferrarse a lo podrido. Estancamiento, muerte en vida." },
  "14": { upright: "Mezcla de opuestos sin conflicto. El flujo entre extremos. Paciencia alquímica: el tiempo transforma.", reversed: "Separación forzada. Extremos que chocan. Impaciencia que rompe el proceso natural." },
  "15": { upright: "Atadura consentida. Poder que se entrega a lo inferior. Sombra que hipnotiza, deseo que ata.", reversed: "Ruptura de la cadena. Luz que disipa la ilusión. Toma de conciencia liberadora." },
  "16": { upright: "Derrumbe de lo que parecía sólido. Verdad que irrumpe violenta. Caída que revela el cielo.", reversed: "Edificio que se sostiene en el engaño. Postergación de la verdad inevitable." },
  "17": { upright: "Luz en la oscuridad. Guía que brilla quieta. Renovación desde adentro, fe que restaura.", reversed: "Luz que se apaga. Esperanza perdida, desilusión. Falta de confianza en el flujo." },
  "18": { upright: "Reino de lo oculto. La mente inconsciente teje sus imágenes. Miedo y fantasía bailan en la sombra.", reversed: "Lo oculto se revela. Fantasmas reconocidos, miedos vistos de frente. Claridad en la oscuridad." },
  "19": { upright: "Conciencia plena. La luz que todo lo alcanza. Vitalidad radiante, verdad sin sombras.", reversed: "Luz cegadora. Exceso de claridad que quema. Sol que agota en vez de nutrir." },
  "20": { upright: "Llamado a despertar. Lo que estuvo muerto vuelve. Juicio interior: evaluación del camino recorrido.", reversed: "Sordera al llamado. Negación de la oportunidad de renacer. Autoengaño." },
  "21": { upright: "Totalidad realizada. El viaje completo, todas las piezas en su lugar. Integración de opuestos, plenitud.", reversed: "Círculo que no cierra. Fragmentación, logro parcial. Lecciones que faltan integrar." },

  // ═══════════════ COPAS ═══════════════
  // Elemento Agua — emociones, relaciones, vínculos
  "22": { upright: "Apertura del canal emocional. Receptividad pura, corazón que se ofrece. Potencial de vínculo.", reversed: "Cierre del canal. Emoción bloqueada, corazón que no se abre. Estancamiento afectivo." },
  "23": { upright: "Reconocimiento mutuo. Dos corazones en sintonía. Atracción equilibrada, espejo emocional.", reversed: "Desequilibrio afectivo. Uno da, otro recibe. Desencuentro emocional." },
  "24": { upright: "Celebración compartida. El grupo como fuente de alegría. Abundancia emocional colectiva.", reversed: "Exceso en la celebración. Alegría que oculta vacío. Dependencia del grupo." },
  "25": { upright: "Pausa emocional. Oferta que no se recibe. Tiempo de introspección afectiva.", reversed: "Reactivación emocional. Sentimientos que vuelven a fluir. Nueva oferta aceptada." },
  "26": { upright: "Pérdida que enseña. Emoción que se retira para crear espacio. Vacío necesario.", reversed: "Aceptación de lo perdido. Emoción procesada, cicatriz que sana." },
  "27": { upright: "Mirar atrás con cariño. Memoria emocional, lo vivido aún resuena. Inocencia recordada.", reversed: "Anclado en el pasado. Recuerdo que impide el presente. Idealización infantil." },
  "28": { upright: "Multiplicidad de opciones sentimentales. Todo parece posible. Fantasía que florece.", reversed: "Realidad concreta. Decisión tomada, fin de la ilusión. Claridad emocional." },
  "29": { upright: "Dejar ir lo conocido. Retiro voluntario de la emoción. Búsqueda de un afecto más profundo.", reversed: "Apego a lo que se va. Miedo a soltar, retención emocional." },
  "30": { upright: "Plenitud emocional alcanzada. Deseo cumplido, gratitud sincera. Bienestar del corazón.", reversed: "Insatisfacción crónica. Logro que no llena. Querer siempre más." },
  "31": { upright: "Realización familiar. Armonía del hogar, linaje emocional. Amor que abraza la totalidad.", reversed: "Ruptura familiar. Tensión en el hogar, desarmonía que separa." },
  "32": { upright: "Mensaje del corazón. Noticia que despierta emoción. Palabra que llega de quien importa.", reversed: "Mala nueva afectiva. Mensaje que duele, comunicación torpe." },
  "33": { upright: "Ofrenda romántica. Belleza que busca compartirse. Arte del cortejo, poesía del encuentro.", reversed: "Falsedad romántica. Halago que manipula, emoción fingida." },
  "34": { upright: "Receptividad femenina sabia. Escucha profunda, intuición que acoge. Contenedora emocional.", reversed: "Dependencia emocional. Necesidad que se aferra, entrega que pierde límites." },
  "35": { upright: "Contención masculina sensible. Templanza afectiva, palabra que calma. Guía emocional serena.", reversed: "Manipulación afectiva. Uso del vínculo para control. Agresión emocional disfrazada." },

  // ═══════════════ ESPADAS ═══════════════
  // Elemento Aire — mente, verdad, comunicación
  "36": { upright: "Idea que irrumpe. Verdad que corta la confusión. Pensamiento puro, inicio mental.", reversed: "Mente nublada. Idea falsa que parece verdad. Confusión mental inicial." },
  "37": { upright: "Dos verdades en conflicto. Decisión que requiere análisis. Mente en equilibrio inestable.", reversed: "Decisión que se impone. Verdad que supera la duda. Claridad alcanzada." },
  "38": { upright: "Duelo mental. Pensamiento que duele, verdad que separa. Procesamiento del dolor intelectual.", reversed: "Mente que sana. Aceptación de la verdad, dolor procesado. Perdón mental." },
  "39": { upright: "Mente en reposo. El pensamiento se aquieta. Descanso de la batalla intelectual.", reversed: "Mente agitada. Descanso que no llega. Ansiedad galopante." },
  "40": { upright: "Choque de perspectivas. Dos mentes que no se encuentran. Conflicto intelectual.", reversed: "Resolución del conflicto. Mentes que acuerdan. Paz mental." },
  "41": { upright: "Transición del pensamiento. Salir de una zona mental conocida. Nuevos esquemas mentales.", reversed: "Atrapado en viejos patrones. Resistencia a cambiar de opinión." },
  "42": { upright: "Estrategia silenciosa. Mente que planea sin ser vista. Movimiento calculado.", reversed: "Secreto revelado. Verdad que sale a la luz. Honestidad forzada." },
  "43": { upright: "Mente atada. Pensamiento limitado por creencias. Atadura de la autocrítica.", reversed: "Mente liberada. Ruptura de esquemas limitantes. Nuevo espacio mental." },
  "44": { upright: "Pesadilla de la conciencia. Preocupación excesiva, mente cargada de temores.", reversed: "Alivio mental. Preocupación que cesa. Esperanza que retorna." },
  "45": { upright: "Fondo del pozo mental. Punto más bajo del pensamiento. El fin de una forma de entender.", reversed: "Recuperación mental. Emerger de la oscuridad. Nueva perspectiva nace." },
  "46": { upright: "Vigilia mental. Observación sin intervención. Mente que aprende mirando.", reversed: "Intrusión mental. Mirada que viola. Crítica que desgasta." },
  "47": { upright: "Ataque del pensamiento. Decisión urgente. Acción mental que no espera.", reversed: "Impulso destructivo. Acción sin pensarse. Agresión mental innecesaria." },
  "48": { upright: "Claridad femenina. Percepción que distingue sin juzgar. Mente que ve nítido.", reversed: "Frial dad mental. Claridad sin compasión. Verdad que hiere." },
  "49": { upright: "Autoridad del conocimiento. Liderazgo mental. Poder de la palabra clara.", reversed: "Abuso de autoridad intelectual. Poder mental que oprime." },

  // ═══════════════ BASTOS ═══════════════
  // Elemento Fuego — energía, acción, propósito
  "50": { upright: "Chispa inicial. Potencia sin dirección aún. Energía que busca canalizarse.", reversed: "Energía bloqueada. Entusiasmo que no encuentra cauce. Retraso inicial." },
  "51": { upright: "Evaluación del camino. Decisión de acción pendiente. Plan que busca ejecutarse.", reversed: "Miedo a decidir. Análisis que paraliza. Oportunidad que espera." },
  "52": { upright: "Expansión segura. Visión que abarca horizontes. Confianza en el propio camino.", reversed: "Frustración expansiva. Meta que se aleja. Avance bloqueado temporalmente." },
  "53": { upright: "Celebración del logro. Estabilidad después del movimiento. Recompensa merecida.", reversed: "Logro que se desestabiliza. Cambio no deseado tras la estabilidad." },
  "54": { upright: "Tensión constructiva. Dos voluntades que miden fuerzas. Conflicto que impulsa.", reversed: "Conflicto evadido. Acuerdo que no resuelve. Evitación del enfrentamiento." },
  "55": { upright: "Victoria pública. Reconocimiento merecido. Triunfo que otros celebran.", reversed: "Derrota que humilla. Reconocimiento perdido. Orgullo herido." },
  "56": { upright: "Defensa de la posición. Mantener el terreno ganado. Perseverancia necesaria.", reversed: "Rendición ante la presión. Defensa que cede. Agotamiento del luchador." },
  "57": { upright: "Velocidad del fuego. Avance rápido, acción sin demora. Momento de atacar.", reversed: "Avance bloqueado. Velocidad que se frena. Impaciencia contenida." },
  "58": { upright: "Resistencia en la lucha. Fortaleza ante la adversidad. Paciencia activa.", reversed: "Paranoia del luchador. Desconfianza que agota. Sospecha destructiva." },
  "59": { upright: "Carga del responsable. Peso que se lleva con honor. Responsabilidad asumida.", reversed: "Carga que agobia. Peso que no corresponde. Delegación liberadora." },
  "60": { upright: "Exploración juvenil. Curiosidad sin miedo. Descubrimiento del mundo.", reversed: "Dirección perdida. Exploración sin propósito. Inmadurez que desorienta." },
  "61": { upright: "Fuego en movimiento. Pasión que se expresa sin reserva. Audacia del guerrero.", reversed: "Fuego que quema. Pasión sin control. Energía desperdiciada en impulso." },
  "62": { upright: "Seguridad ardiente. Carisma que no necesita demostrar. Presencia que impacta.", reversed: "Ego que ciega. Seguridad falsa, vanidad. Carisma vacío." },
  "63": { upright: "Visión que guía. Liderazgo natural. El que camina adelante con claridad.", reversed: "Liderazgo despótico. Visión que no consulta. Poder que aísla." },

  // ═══════════════ OROS ═══════════════
  // Elemento Tierra — materia, cuerpo, manifestación
  "64": { upright: "Germen material. Oportunidad tangible que brota. Semilla de prosperidad.", reversed: "Oportunidad no vista. Tierra que no recibe semilla. Potencial sin activar." },
  "65": { upright: "Flujo y reflujo material. Adaptación al cambio financiero. Gestión del ciclo.", reversed: "Desequilibrio financiero. Exceso o falta. Gestión inadecuada del recurso." },
  "66": { upright: "Maestría compartida. Saber que se multiplica en equipo. Oficio que crece.", reversed: "Equipo que no funciona. Talento individual sin sinergia. Colaboración fallida." },
  "67": { upright: "Acumulación protectora. Recurso guardado para el futuro. Seguridad material.", reversed: "Avaricia que aísla. Recurso retenido que no fluye. Miedo a la carencia." },
  "68": { upright: "Carencia material temporal. Privación que enseña. Necesidad que purifica.", reversed: "Alivio que llega. Necesidad cubierta. Ayuda externa que salva." },
  "69": { upright: "Equilibrio del dar y recibir. Recurso que circula. Generosidad consciente.", reversed: "Deuda que ata. Generosidad falsa que espera retorno. Intercambio desequilibrado." },
  "70": { upright: "Paciencia del agricultor. Tiempo de espera activa. Cosecha que madura.", reversed: "Impaciencia financiera. Resultado que no llega. Siembra sin cuidado." },
  "71": { upright: "Dedicación al oficio. Maestría que requiere repetición. Perfección en el detalle.", reversed: "Mediocridad por falta de dedicación. Talento no cultivado. Rutina vacía." },
  "72": { upright: "Logro material autónomo. Independencia financiera. Cima de la manifestación.", reversed: "Dependencia dorada. Lujo que ata. Superficialidad material." },
  "73": { upright: "Transmisión generacional. Bien que trasciende al individuo. Legado que queda.", reversed: "Pérdida de herencia. Legado que se malgasta. Ruptura generacional." },
  "74": { upright: "Estudio aplicado. Conocimiento que se vuelve práctico. Preparación diligente.", reversed: "Progreso lento. Pereza que retrasa. Oportunidad de estudio perdida." },
  "75": { upright: "Persistencia cotidiana. Trabajo constante que acumula. Rutina que construye.", reversed: "Desgana. Trabajo que no se hace. Rutina que aplasta." },
  "76": { upright: "Nutrición material. Recurso que da vida. Generosidad práctica.", reversed: "Descuido del cuerpo. Mala gestión que desgasta. Negligencia material." },
  "77": { upright: "Cima del mundo material. Abundancia que culmina. Poder terrenal manifestado.", reversed: "Corrupción del poder. Materialismo vacío. Abundancia sin propósito." }
};
