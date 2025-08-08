// script.js - versión que recalcula posiciones y tamaños (reemplaza tu script.js)

/* ---------- CONFIG BASE (tamaños originales del diseño) ---------- */
const BASE_TABLERO_W = 1880; // ancho del diseño original
const BASE_TABLERO_H = 750;  // alto del diseño original
const BASE_CASILLA = 75;     // diámetro original de una casilla
const BASE_BORDE = 4;        // grosor de borde original
const BASE_FONTSIZE = 16;    // tamaño base texto dentro casilla
const BASE_FICHA = 20;       // diámetro original ficha jugador
const MARGEN_CONTROLES = 140; // espacio reservado bajo tablero (px)

/* ---------- ELEMENTOS ---------- */
const container = document.getElementById('game-container');
const tablero = document.getElementById('tablero');

const totalCasillas = 71;
let posicion1 = 0;
let posicion2 = 0;
let turno = 1;
let esperandoRespuesta = false;
let posicionAnterior1 = 0;
let posicionAnterior2 = 0;

const titulosPorColor = {
  color1: 'ITS',
  color2: 'Orientación Sexual',
  color3: 'Sexualidad',
  color4: 'Mito o Realidad',
  color5: 'Métodos Anticonceptivos',
  color6: 'Derechos sobre la Sexualidad'
};

/* -------------------------
   POSICIONES ORIGINALES
   (usa exactamente las tuyas; si las cambias acá,
   el layout se mantiene)
   ------------------------- */
const posiciones = [
  {x: 10, y: 200}, // INICIO
  {x: 50, y: 115}, {x: 135, y: 50}, {x: 240, y: 30}, {x: 345, y: 40},
  {x: 450, y: 25}, {x: 540, y: 75}, {x: 640, y: 50}, {x: 740, y: 25},
  {x: 840, y: 50}, {x: 940, y: 25}, {x: 1040, y: 50}, {x: 1140, y: 20},
  {x: 1240, y: 50}, {x: 1340, y: 88}, {x: 1440, y: 75}, {x: 1540, y: 45},
  {x: 1640, y: 30}, {x: 1740, y: 20}, {x: 1790, y: 100}, {x: 1710, y: 165},
  {x: 1610, y: 165}, {x: 1510, y: 170}, {x: 1410, y: 200}, {x: 1310, y: 185},
  {x: 1210, y: 220}, {x: 1110, y: 160}, {x: 1010, y: 190}, {x: 910, y: 165},
  {x: 810, y: 170}, {x: 710, y: 218}, {x: 610, y: 175}, {x: 510, y: 200},
  {x: 410, y: 165}, {x: 310, y: 190}, {x: 210, y: 170}, {x: 135, y: 240},
  {x: 55, y: 310}, {x: 20, y: 400}, {x: 95, y: 475}, {x: 185, y: 415},
  {x: 285, y: 370}, {x: 395, y: 400}, {x: 495, y: 360}, {x: 585, y: 420},
  {x: 685, y: 440}, {x: 785, y: 500}, {x: 885, y: 450}, {x: 985, y: 415},
  {x: 1085, y: 350}, {x: 1185, y: 380}, {x: 1285, y: 420}, {x: 1385, y: 450},
  {x: 1485, y: 410}, {x: 1585, y: 380}, {x: 1685, y: 405}, {x: 1765, y: 470},
  {x: 1700, y: 550}, {x: 1600, y: 600}, {x: 1500, y: 650}, {x: 1400, y: 625},
  {x: 1300, y: 550}, {x: 1200, y: 575}, {x: 1100, y: 525}, {x: 1000, y: 550},
  {x: 900, y: 600}, {x: 800, y: 625}, {x: 700, y: 590}, {x: 600, y: 560},
  {x: 500, y: 600}, //69
  {x: 350, y: 580} // FINAL
];

/* -------------------------
   PREGUNTAS: PEGÁ TU OBJETO AQUÍ
   ------------------------- */
const preguntas = /* PREGUNTAS_AQUI */ {
    color1: [
    { tipo: 'vf', texto: 'El virus del herpes solo se transmite cuando hay ampollas visibles.', respuesta: 'Falso' },
    { tipo: 'vf', texto: 'El VIH tiene cura', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'La vasectomía logra impedir que contraigas enfermedades de transmisión sexual', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'El virus papiloma es una ITS', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'El VIH es hereditario', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'El herpes genital no tiene cura', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'La clamidia solamente infecta al pene, la vagina, la uretra, el cuello uterino y el ano', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'El dolor al orinar puede ser síntoma de una ITS', respuesta: 'Falso'},
    {
      tipo: 'opciones',
      texto: '¿Qué parte del cuerpo puede verse afectada por una ITS como la sífilis en etapas avanzadas?',
      opciones: ['Solo la piel', 'Corazón y sistema nervioso', 'Cabello y uñas', 'Articulaciones solamente'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Cuál de estas enfermedades son de transmision sexual?',
      opciones: ['Sífilis', 'Clamidia', 'Papilima humano', 'Todas las anteriores'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Por qué se produce la sífilis?',
      opciones: ['Una bacteria', 'Cortarse cin un metal oxidado', 'Sobredosis de narcóticos'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Qué hongo puede crecer de forma anormal como consecuencia de un cambio del PH vaagina (por un exceso de humedad o de higiene en la zona)?',
      opciones: ['Neisseria Gonorrhoeae,', 'Candida Albicans', 'Pediculus Pubis', 'Chlamydia Trachomatis'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: 'Si las ITS no son tratadas, ¿qué pueden producir?',
      opciones: ['Infertilidad tanto en hombres como mujeres', 'Dolor crónico en la pelvis y abdominal', 'Embarazo ectópico (fuera del utero)', 'Todas las anteriores'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Cuáles de estas ITS no es curable?',
      opciones: ['Gonorrea', 'Sífilies', 'Clamidia', 'VIH'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Qué parte del cuerpo también puede verse afectada por una ITS como la sífilis en etapas avanzadas?',
      opciones: ['Solo la piel', 'El corazón y el sistema nervioso', 'El cabelli y las uñas', 'Las articulaciones solamente'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Cuál de estas ITS puede generar verrugas genitales visibles?',
      opciones: ['Gonorrea', 'Clamidia', 'Virus del papiloma humano (VPH)', 'Herpes'],
      respuesta: 3
    },
  ],

  color2: [
    { tipo: 'vf', texto: 'Ser heterosexual, homosexual o bisexual está relacionado únicamente con las prácticas sexuales.', respuesta: 'Falso' },
    { tipo: 'vf', texto: 'Sexo y género son lo mismo', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'El abuso sexual hace a una persona heterosexual, gay o bisexual', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Las experiencias sexuales tempranas son indicativas de la orientación sexual como adulto', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Las personas que no sienten una atracción sexual y no tienen interés en el sexo suelen llamarse asexuales', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'La transexualidad no es una orientación sexual', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'La terapia cambia la orientación sexual', respuesta: 'Falso'},
    {
      tipo: 'opciones',
      texto: '¿Qué término describe a alguien que no experimenta atracción romántica?',
      opciones: ['Demisexual', 'Pansexual', 'Arromántico', 'Asexual'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿Qué significa ser heterosexual?',
      opciones: ['Que le gusta alguien del género opuesto', 'Que le gusta alguien del mismo genero', 'Que le gusta ambos géneros'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: 'Las personas que se sienten atraídas tanto por hombres como por mujeres suelen llamarse a si mismas:',
      opciones: ['Homosexuales', 'Bisexuales', 'Lesbianas', 'Ninguna de las anteriores'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Qué derecho esta relacionado con vivir libremente la orientación sexual?',
      opciones: ['Derecho al libre pensamiento', 'Derecho a la identidad', 'Derecho a la salud mental', 'Derecho a la auto-persepción'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Qué significa ser pansexual?',
      opciones: ['Sentir atracción por personas del mismo genero', 'Sentir atracción por persona de todos los generos', 'No tener deseo sexual', 'Tener muchas parejas'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Qué termino describe a alguien que no experimenta atracción romantica por otras personas?',
      opciones: ['Demisexual', 'Pansexual', 'Arromántico', 'Asexual'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿Qué significa ser una persona queer?',
      opciones: ['Rechaza etiquetas tradicionales de género u orientación sexual', 'Solo se identifica como homosexual', 'Es un insulto', 'No cree en el amor'],
      respuesta: 1
    },
  ],

  color3: [
    { tipo: 'vf', texto: 'El masturbarse causa ceguera, pelo en las manos y afecta en tu estatura', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Según estudios, ver pornografía de manera incesante es dañino para la mente', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'La función de la próstata es producir una secreción que ayuda a disminuir la acidez de la uretra y vaginam impidiendo la muerte de los espermatozoides', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'Los sueños húmedos son exclusivos de los hombres', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'La eyaculación precoz es la expulsión prematura del semen al poco de haber iniciado el coito (relación sexual', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'En la primera relación sexual no existe el riesgo de contagiaarse de una ITS', respuesta: 'Falso'},
    {
      tipo: 'opciones',
      texto: '¿Cuál es la función del clítoris?',
      opciones: ['Es un órgano que ayuda con la menstruación', 'Es un órgano solamente para producir placer', 'Sirve para evitar infecciones en la vulva'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Qué es la uretra?',
      opciones: ['Es un órgano femenino', 'Es por donde pasa la orina de los hombres', 'Conducto que expulsa la orina, se encuentra en ambos sexos'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿Cuáles son las funciones de la vagina?',
      opciones: ['Recibir el órgano masculina para la fecundación', 'Permitir la salida de la menstruación y eliminar los óvulos no fecundados', 'Ser el conducto de salida del feto durante el parto normal', 'Todas las anteriores'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Cuáles son las zonas erógenas?',
      opciones: ['Pene, clítoris y labios vaginales menores', 'Testículos, entrada de la vagina, zona anal, próstata y pezones', 'Los óvulos de las orejas, labios y cuello', 'Todas las anteriores'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Cuáles son los genitales internos de la mujer?',
      opciones: ['Vagina, útero, trompas de Falopio y ovarios', 'Vulva, clítoris, ovarios y orificio vaginal', 'Clítoris, meato uretal, labios mayores y menores'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Qué es menarca o menarquia?',
      opciones: ['Hemorragia genital', 'Primera menstruaación', 'CIclo en el cual se produce la ovulación'],
      respuesta: 2
    },
  ],

  color4: [
    { tipo: 'vf', texto: 'El himen siempre se rompe la primera vez', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'El VIH no tiene cura, pero se puede vivir con el', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'El consentimiento se puede dar estando borracho', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'La menstruación es algo sucio', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Los metodos hormnoales solo lo usan las mujeres', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Los preservativos se vencen', respuesta: 'Verdadero'},
    {
      tipo: 'opciones',
      texto: '¿Qué metodo previene tanto ITS como embarazo?',
      opciones: ['Pastillas', 'Preservativo', 'DIU', 'Vasectomía'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Cuál es un derecho sexual?',
      opciones: ['Callar tu opinion', 'Reprimir tus deseos', 'Morir callado', 'Vivir tu sexualidad libremente'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Qué signigica ESI?',
      opciones: ['Educación Sexual Integral', 'Educación Sexual Individual', 'Enseñanza Sin Instrucciones'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Cuándo empieza la pubertad?',
      opciones: ['En la niñez', 'En la adultez', 'Es igual para todos', 'En la preadolesencia'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿Qué es el consentimiento?',
      opciones: ['Decir si con presión', 'No decir nada', 'Decir si libremente'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿Qué debes hacer si  tu pareja no quiere tener relaciones?',
      opciones: ['Respetar su desición', 'Convencerla', 'Ignorarla', 'Manipularla'],
      respuesta: 1
    },
  ],

  color5: [
    { tipo: 'vf', texto: 'Todos los métodos anticonceptivos son 100% eficaz', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Medicamente, la pastilla del dia después es abortiva', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Al revertir la operación de la vasectomíam, no existe ningún efecto secundario', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Los métodos anticonceptivos químicos consisten en la utilización de sustancias químicas que anulan la funcionalidad de los espermatozoides o impiden la ovulación', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'Las hormonas de las pastillas, el anillo, el DIU y el parche causan aumento (o perdida) de peso', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'El anilo vaginal previene las enfermedades de transmisión sexual', respuesta: 'Falso'},
    {
      tipo: 'opciones',
      texto: '¿Cuáles de estos anticonceptivos son solo para mujeres?',
      opciones: ['Vasectomia', 'Inyección Vasalgel', 'Capuchón cervical', 'Preservativo'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: '¿En dónde se coloca el DIU?',
      opciones: ['En la vagina', 'En el útero', 'En las trompas de Falopio', 'En la uretra'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Cuáles de estas operaciones se puede hacer la mujer para no quedar embarazada?',
      opciones: ['Apendicectomía', 'Ligadura de trompas', 'Vasectomía'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Quién creo el preservativo?',
      opciones: ['Lord Condom', 'Oliver James', 'Leon Muller', 'Lionel Messi'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Qué metodo previene tanto ITS como embarazo?',
      opciones: ['Pastillas', 'Preservativo', 'DIU', 'Vasectomía'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿Cuál método anticonceptivo es el mejor para evitar embarazos no intencionales?',
      opciones: ['DIU', 'Chip', 'Parche', 'Ninguna de las anteriores'],
      respuesta: 2
    },
  ],

  color6: [
    { tipo: 'vf', texto: 'En un centro de salud no te pueden dar métodos anticonceptivos por ser menor de edad', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Los transexuales son homosexuales', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Las personas con discapacidad no tienen derecho a gozar del más alto nivel posiblede salud sin discriminación por motivos de discapacidad', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Las instituciones educativas están obligadas a llevar adelante un régimen especial para estudiantes embarazadas', respuesta: 'Verdadero'},
    { tipo: 'vf', texto: 'El abuso emocional se da solo dentro de las parejas adolescentes', respuesta: 'Falso'},
    { tipo: 'vf', texto: 'Los actos abusivos se encuentran solo en las relaciones sexuales', respuesta: 'Falso'},
    {
      tipo: 'opciones',
      texto: 'Los Derechos Sexuales y Reproductivos de que son parte?',
      opciones: ['De un país', 'De los Derechos Humanos', 'De un grupo', 'De una persona'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿De cuánto es la pena de cárcel cuando existe abuso sexual sobre menor de 13 años?',
      opciones: ['De seis meses a cuatro años', 'De un año a seis años', 'De diez meses a ocho años', 'Cadena perpetua'],
      respuesta: 1
    },
    {
      tipo: 'opciones',
      texto: '¿Cuál fue el primer país latino en reconocer el matrimonio de personas del mismo sexo?',
      opciones: ['Bolivia', 'Ecuador', 'Argentina', 'Ninguno de los anteriores'],
      respuesta: 3
    },
    {
      tipo: 'opciones',
      texto: 'La lay N° 25.673 Programa Nacional de Salud Sexual y Procreación Responsable ¿A quiénes está destinada?',
      opciones: ['A únicamente para todos los estudiantes de establecimientos educativos', 'A toda la población', 'A los adolescentes', 'A la comunidad LGTB'],
      respuesta: 2
    },
    {
      tipo: 'opciones',
      texto: '¿En cuáles de estos países está prohibido el LGTB?',
      opciones: ['Rusia', 'Bélgica', 'China', 'Bangladesh'],
      respuesta: 4
    },
    {
      tipo: 'opciones',
      texto: '¿Qué metodo previene tanto ITS como embarazo?',
      opciones: ['Pastillas', 'Preservativo', 'DIU', 'Vasectomía'],
      respuesta: 2
    },
  ],
};

/* ---------- helpers ---------- */
function getColorClass(i) {
  const colores = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
  return colores[i % colores.length];
}

/* scaleCalculator: devuelve factor para redimensionar todo (<=1) */
function calcScale() {
  const cw = Math.max(320, container.clientWidth); // ancho disponible (mínimo 320)
  const top = container.getBoundingClientRect().top;
  const maxAvailableHeight = Math.max(300, window.innerHeight - top - MARGEN_CONTROLES);
  const scaleW = cw / BASE_TABLERO_W;
  const scaleH = maxAvailableHeight / BASE_TABLERO_H;
  const scale = Math.min(scaleW, scaleH, 1); // no agrandamos >1
  return scale;
}

/* crearTablero: recrea casillas usando posiciones escaladas */
function crearTablero() {
  tablero.innerHTML = ''; // limpiar
  const scale = calcScale();

  // fijar dimensiones del tablero escaladas (JS controla tamaño real)
  const w = Math.max(200, Math.round(BASE_TABLERO_W * scale));
  const h = Math.max(150, Math.round(BASE_TABLERO_H * scale));
  tablero.style.width = w + 'px';
  tablero.style.height = h + 'px';
  container.style.height = (h + 10) + 'px'; // pequeño margen

  // crear casillas con posicion y tamaño escalados
  for (let i = 0; i < totalCasillas; i++) {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla', getColorClass(i));
    casilla.setAttribute('id', `casilla-${i}`);

    const sx = Math.round(posiciones[i].x * scale);
    const sy = Math.round(posiciones[i].y * scale);

    const casillaSize = Math.max(18, Math.round(BASE_CASILLA * scale));
    const borderSize = Math.max(1, Math.round(BASE_BORDE * scale));
    const fontSize = Math.max(10, Math.round(BASE_FONTSIZE * scale));

    casilla.style.left = sx + 'px';
    casilla.style.top = sy + 'px';
    casilla.style.width = casillaSize + 'px';
    casilla.style.height = casillaSize + 'px';
    casilla.style.borderWidth = borderSize + 'px';
    casilla.style.fontSize = fontSize + 'px';
    casilla.style.lineHeight = casillaSize + 'px'; // centrar número verticalmente

    // Contenido
    if (i === 0) {
      casilla.textContent = 'Inicio';
      casilla.style.fontSize = Math.max(10, Math.round((BASE_FONTSIZE - 2) * scale)) + 'px';
    } else if (i === totalCasillas - 1) {
      casilla.textContent = 'Final';
      casilla.style.fontSize = Math.max(10, Math.round((BASE_FONTSIZE - 2) * scale)) + 'px';
    } else {
      const numero = document.createElement('span');
      numero.textContent = i;
      numero.style.pointerEvents = 'none';
      casilla.appendChild(numero);
    }

    tablero.appendChild(casilla);
  }

  // ajustar imagen decorativa si existe
  const decor = document.getElementById('decoracion');
  if (decor) {
    // posiciones base utilizadas antes: left:850 top:425 width:100
    const baseLeft = 850, baseTop = 425, baseWidth = 100;
    decor.style.left = Math.round(baseLeft * scale) + 'px';
    decor.style.top = Math.round(baseTop * scale) + 'px';
    decor.style.width = Math.max(24, Math.round(baseWidth * scale)) + 'px';
  }
}

/* ---------- lógica de preguntas y movimiento (igual que antes) ---------- */
function mostrarPreguntaSegunColor(colorClass) {
  const contenedor = document.getElementById('pregunta-container');
  contenedor.innerHTML = '';
  contenedor.style.display = 'block';

  const titulo = titulosPorColor[colorClass] || 'Pregunta';
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  contenedor.appendChild(h2);

  const lista = preguntas[colorClass];
  if (!lista || lista.length === 0) {
    contenedor.innerHTML += '<p>No hay preguntas para este color.</p>';
    return;
  }

  const pregunta = lista[Math.floor(Math.random() * lista.length)];
  const p = document.createElement('p');
  p.textContent = pregunta.texto;
  contenedor.appendChild(p);

  if (pregunta.tipo === 'vf') {
    ['Verdadero', 'Falso'].forEach(resp => {
      const btn = document.createElement('button');
      btn.textContent = resp;
      btn.onclick = () => validarRespuesta(resp === pregunta.respuesta);
      contenedor.appendChild(btn);
    });
  } else if (pregunta.tipo === 'opciones') {
    pregunta.opciones.forEach((op, i) => {
      const btn = document.createElement('button');
      btn.textContent = op;
      btn.onclick = () => validarRespuesta((i + 1) === pregunta.respuesta);
      contenedor.appendChild(btn);
    });
  }

  esperandoRespuesta = true;
}

function validarRespuesta(correcta) {
  const contenedor = document.getElementById('pregunta-container');
  contenedor.innerHTML = correcta ? '<p>✅ Correcto</p>' : '<p>❌ Incorrecto</p>';

  setTimeout(() => {
    contenedor.style.display = 'none';
    esperandoRespuesta = false;

    if (!correcta) {
      if (turno === 2) {
        posicion1 = posicionAnterior1;
        turno = 2;
        actualizarTablero();
        const casillaRebote = document.getElementById(`casilla-${posicion1}`);
        if (casillaRebote) {
          casillaRebote.classList.add('rebote');
          setTimeout(() => casillaRebote.classList.remove('rebote'), 600);
        }
      } else {
        posicion2 = posicionAnterior2;
        turno = 1;
        actualizarTablero();
        const casillaRebote = document.getElementById(`casilla-${posicion2}`);
        if (casillaRebote) {
          casillaRebote.classList.add('rebote');
          setTimeout(() => casillaRebote.classList.remove('rebote'), 600);
        }
      }
      document.getElementById('mensaje').textContent += " Volvés al casillero anterior por responder mal.";
    }

  }, 1200);
}

function actualizarTablero() {
  // quitar fichas previas
  document.querySelectorAll('.jugador1, .jugador2').forEach(el => el.remove());

  // insertar fichas en casillas actuales (si existen)
  const casilla1 = document.getElementById(`casilla-${posicion1}`);
  if (casilla1) {
    const ficha1 = document.createElement('div');
    ficha1.classList.add('jugador1');
    // tamaño ficha según casilla actual
    const casillaW = casilla1.clientWidth || Math.round(BASE_CASILLA * calcScale());
    const fichaSize = Math.max(8, Math.round((BASE_FICHA / BASE_CASILLA) * casillaW));
    ficha1.style.width = fichaSize + 'px';
    ficha1.style.height = fichaSize + 'px';
    ficha1.style.borderWidth = Math.max(1, Math.round(BASE_BORDE * calcScale())) + 'px';
    casilla1.appendChild(ficha1);
  }

  const casilla2 = document.getElementById(`casilla-${posicion2}`);
  if (casilla2) {
    const ficha2 = document.createElement('div');
    ficha2.classList.add('jugador2');
    const casillaW = casilla2.clientWidth || Math.round(BASE_CASILLA * calcScale());
    const fichaSize = Math.max(8, Math.round((BASE_FICHA / BASE_CASILLA) * casillaW));
    ficha2.style.width = fichaSize + 'px';
    ficha2.style.height = fichaSize + 'px';
    ficha2.style.borderWidth = Math.max(1, Math.round(BASE_BORDE * calcScale())) + 'px';
    casilla2.appendChild(ficha2);
  }

  const posicionActual = turno === 1 ? posicion1 : posicion2;
  document.getElementById('posicion').textContent = posicionActual + 1;
  document.getElementById('turno').textContent = turno;
}

function tirarDado() {
  if (esperandoRespuesta) return;

  const dado = Math.floor(Math.random() * 6) + 1;
  let mensaje = `Jugador ${turno}: Sacaste un ${dado}. `;
  let pos = turno === 1 ? posicion1 : posicion2;
  let nuevaPos = pos + dado;

  if (nuevaPos > totalCasillas - 1) {
    const exceso = nuevaPos - (totalCasillas - 1);
    nuevaPos = (totalCasillas - 1) - exceso;
    mensaje += `¡Te pasaste! Retrocedés ${exceso} casillas. `;
  }

  if (nuevaPos === totalCasillas - 1) {
    mensaje += `🎉 ¡Jugador ${turno} gana! 🎉`;
  }

  if (turno === 1) posicionAnterior1 = posicion1;
  else posicionAnterior2 = posicion2;

  const onTerminarMovimiento = () => {
    document.getElementById('mensaje').textContent = mensaje;
    const casilla = document.getElementById(`casilla-${nuevaPos}`);
    const colorClass = casilla ? Array.from(casilla.classList).find(cls => cls.startsWith('color')) : null;
    mostrarPreguntaSegunColor(colorClass);
  };

  if (turno === 1) {
    moverPasoAPaso(1, posicion1, nuevaPos, () => {
      turno = 2;
      onTerminarMovimiento();
    });
  } else {
    moverPasoAPaso(2, posicion2, nuevaPos, () => {
      turno = 1;
      onTerminarMovimiento();
    });
  }
}

function moverPasoAPaso(jugador, desde, hasta, callback) {
  let posicionActual = desde;
  const direccion = hasta > desde ? 1 : -1;

  const interval = setInterval(() => {
    posicionActual += direccion;
    if (jugador === 1) posicion1 = posicionActual;
    else posicion2 = posicionActual;
    actualizarTablero();

    if (posicionActual === hasta) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 220); // velocidad entre pasos (ajustable)
}

/* Musica y botones (igual que antes) */
function toggleMusica() {
  const audio = document.getElementById('musica-fondo');
  const btn = document.getElementById('btn-musica');
  if (audio.paused) {
    audio.play().catch(() => {});
    btn.textContent = '🔊 Música: ON';
  } else {
    audio.pause();
    btn.textContent = '🔇 Música: OFF';
  }
}

/* Inicialización y resize */
function initGame() {
  crearTablero();
  actualizarTablero();
}

window.addEventListener('DOMContentLoaded', () => {
  // activar musica con primer click (políticas navegadores)
  const musica = document.getElementById('musica-fondo');
  const activarMusica = () => {
    musica.play().catch(() => {});
    document.removeEventListener('click', activarMusica);
  };
  document.addEventListener('click', activarMusica);

  initGame();
});

// Recalcular al cambiar tamaño de ventana (recrea tablero para reposicionar)
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    crearTablero();
    actualizarTablero();
  }, 120);
});
