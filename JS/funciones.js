


// Función para agregar letra a la celda correcta
function agregarLetra(letraPresionada) {
  console.log("Letra presionada: " + letraPresionada);

  // Ignorar si es Enter o Backspace directamente
  if (letraPresionada === "Enter") {
    validarPalabra();
    return;
  } else if (letraPresionada === "Backspace") {
    borrarUltimaLetra();
    return;
  }

  // Asegurándonos de que la celdaActual no exceda el número de celdas por fila
  if (celdaActual > 5) {
    // Si ya estamos en la última celda, no hacer nada o avanzar a la siguiente fila
    // Aquí podrías implementar la lógica para avanzar a la siguiente fila si es necesario
    return;
  }

  const idCeldaActual = `cell${filaActual}-${celdaActual}`;
  const divActual = document.getElementById(idCeldaActual);
  
  if (divActual) {
    divActual.innerText = letraPresionada.toUpperCase();
    palabra+=letraPresionada;
    console.log("palabra añadir", palabra);
    celdaActual++;
  }
}

// Función para vefiriicar si el formulario está completo si exite la palabra

function validarPalabra() {
  console.log("palabra", palabra, 'palabra aleatoria', palabraAleatoria);

  if (palabra.length !== 5) {
    console.log("Debe completar las 5 letras antes de presionar Enter.");
    return;
  }

  if (dic.includes(palabra)) {
    console.log("La palabra existe en el diccionario.");
    if (palabra === palabraAleatoria) {
      console.log("¡Correcto! La palabra es igual a la palabra aleatoria.");
      // Aquí podrías implementar alguna lógica para manejar el caso de éxito.
    } else {
      console.log("La palabra no es la correcta, pero existe en el diccionario.");
      // Preparar para la siguiente fila
      prepararSiguienteFila();
    }
  } else {
    console.log("La palabra no existe en el diccionario.");
    // Puedes optar por permitir al usuario intentarlo nuevamente sin avanzar de fila o forzar el avance de todos modos.
    prepararSiguienteFila();
  }
}

function prepararSiguienteFila() {
  // Deshabilitar la fila actual (opcional)
  const filaActualDiv = document.getElementById(`fila${filaActual}`);
  if (filaActualDiv) {
    filaActualDiv.classList.add("disabled"); // Asegúrate de definir el estilo .disabled en tu CSS
  }

  // Reiniciar palabra y avanzar a la siguiente fila
  palabra = "";
  if (filaActual < 6) { // Asumiendo que tienes un máximo de 6 filas.
    filaActual++;
    celdaActual = 1;
  } else {
    console.log("Juego terminado. No quedan más intentos.");
    // Aquí puedes implementar lógica para finalizar el juego o reiniciarlo.
  }
}

function borrarUltimaLetra() {
  if (celdaActual > 1 || (filaActual > 1 && celdaActual === 1)) {
      if (celdaActual === 1) {
          // Ajustar si tienes lógica para manejar múltiples filas
          filaActual -= 1;
          celdaActual = 5; // O el número máximo de celdas por fila que tienes
      } else {
          celdaActual--;
      }

      const idCeldaActual = `cell${filaActual}-${celdaActual}`;
      const divActual = document.getElementById(idCeldaActual);
      if (divActual) {
          divActual.innerText = "";
      }
      // Actualizar la palabra después de ajustar la celda actual
      palabra = palabra.slice(0, -1);
      console.log("palabra borrar", palabra);
  }
}

/**
 * Capturar teclado
 * @param {*} event
 * @returns
 */
function teclasPresionada(event) {
  //recive el evento keydown
  let teclaPresionada = event.key; //Guardo la letra presionada

  //Array con las letras validas
  const letrasValidas = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "Enter",
    "Backspace",
    "ñ",
    "ç",
  ];
  // Convertir a minúsculas para hacer la comparación y aceptar Enter y Backspace como están
  if (
    letrasValidas.includes(teclaPresionada.toLowerCase()) || teclaPresionada === "Enter" || teclaPresionada === "Backspace") {
    //console.log("Tecla válida presionada: " + event.key);
    agregarLetra(teclaPresionada);
    // return event.key;
  } else {
    // console.log("Tecla no válida presionada: " + event.key);
    return null;
  }
}

function numeroAleatorio() {
  let numeroAleatorio = Math.random();
  let numeroFinal = Math.floor(numeroAleatorio * 11033);
  return numeroFinal;
}
