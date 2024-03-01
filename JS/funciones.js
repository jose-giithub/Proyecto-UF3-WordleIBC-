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
 
  const inputActual = document.getElementById(idCeldaActual);
 
  if (inputActual) {
    inputActual.value = letraPresionada.toUpperCase();
    palabra += letraPresionada.toLowerCase();
    console.log("palabra añadir", palabra);
    celdaActual++;
  }
}
// Función para vefiriicar si el formulario está completo si exite la palabra

function validarPalabra() {
  console.log("palabra", palabra, "palabra aleatoria", palabraAleatoria);

  if (palabra.length !== 5) {
    console.log("Debe completar las 5 letras antes de presionar Enter.");
    return;
  }

  if (dic.includes(palabra)) {
    console.log("La palabra existe en el diccionario.");
    if (palabra === palabraAleatoria) {
      console.log("¡Correcto! La palabra es igual a la palabra aleatoria.");
      window.alert("|Correcto!")
       marcarPalabra();
      // Aquí podrías implementar alguna lógica para manejar el caso de éxito.
    } else {
      console.log(
        "La palabra no es la correcta, pero existe en el diccionario.");
      window.alert("La palabra no es la correcta")
      //busco coincidencia entre la palabar dada y la aleatoria
      // Preparar para la siguiente fila
      verificarLetras(palabra);
      prepararSiguienteFila();
    }
  } else {
    console.log("La palabra no existe en el diccionario.");
    window.alert("La palabra no existe")
    verificarLetras(palabra);
    // Puedes optar por permitir al usuario intentarlo nuevamente sin avanzar de fila o forzar el avance de todos modos.
   // prepararSiguienteFila();
  }
}

//verificar letras
function verificarLetras(palabraIngresada) {
  for (let i = 0; i < palabraIngresada.length; i++) {
    const letra = palabraIngresada[i];
    const idCeldaActual = `cell${filaActual}-${i + 1}`;
    const celdaActual = document.getElementById(idCeldaActual);

    // Si la letra está en la palabra y en la posición correcta, la marcamos en verde
    if (letra === palabraAleatoria[i]) {
      celdaActual.classList.add("correcta"); // Agrega clase para letra en posición correcta
    }
    // Si la letra está en la palabra pero no en la posición correcta, la marcamos en amarillo
    else if (palabraAleatoria.includes(letra)) {
      celdaActual.classList.add("presente"); // Agrega clase para letra presente pero en posición incorrecta
    } else {
      celdaActual.classList.add("ausente");
    }
  }
}
function marcarPalabra() {
  // Asumiendo que 'color' es una clase que ya tienes definida en tu CSS
  for (let i = 1; i <= 5; i++) {
    const idCeldaActual = `cell${filaActual}-${i}`;
    const celdaActual = document.getElementById(idCeldaActual);

    if (celdaActual) {
      celdaActual.classList.add('correcta');
    }
  }
  
  // Desactivar la entrada de teclado
  desactivarEntradaTeclado();
}

function desactivarEntradaTeclado() {
  // Elimina el event listener de las teclas presionadas
  document.removeEventListener('keydown', teclasPresionada);
  
  // Además, si tienes botones en pantalla para la entrada de teclado virtual,
  // también deberías deshabilitarlos.
  const botonesTeclado = document.querySelectorAll('.btn.btn-secondary.m-1');
  botonesTeclado.forEach(function (button) {
    button.disabled = true; // Deshabilitar los botones del teclado virtual
  });
}

function prepararSiguienteFila() {
  console.log("Preparando para la siguiente fila.");
  
  // Deshabilitar la fila actual
  const filaActualDiv = document.getElementById(`fila${filaActual}`);
  console.log(filaActualDiv);
  if (filaActualDiv) {
    filaActualDiv.classList.add("disabled"); // Añade la clase .disabled al contenedor de la fila
    let inputs = filaActualDiv.querySelectorAll("input.cell");
    inputs.forEach((input) => {
      input.disabled = true; // Deshabilita los inputs de la fila actual
    });
  }
  // Reiniciar palabra y avanzar a la siguiente fila
  palabra = "";
  if (filaActual < 6) {
    filaActual++;
    celdaActual = 1;
  } else {
    console.log("Juego terminado. No quedan más intentos.");
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
    const inputActual = document.getElementById(idCeldaActual);
    if (inputActual) {
      inputActual.value = "";
      palabra = palabra.slice(0, -1);
      console.log("palabra borrar", palabra);
    }
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
    letrasValidas.includes(teclaPresionada.toLowerCase()) ||
    teclaPresionada === "Enter" ||
    teclaPresionada === "Backspace"
  ) {
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
