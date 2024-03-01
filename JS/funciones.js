// Función para agregar letra a la celda correcta
/**
 * Funcion que agrega letra a la celda correcta
 * @param {*} letraPresionada
 * @returns
 */
function agregarLetra(letraPresionada) {
  // si presionan enter que se valide la linia actual
  if (letraPresionada === "Enter") {
    validarPalabra();
    return;
    //si fuera borrar llamar a la funcion que borra las letras
  }
  if (letraPresionada === "Backspace") {
    borrarUltimaLetra();
    return;
  }

  // Asegurándonos de que la celdaActual no exceda el número de celdas por fila
  //si es mayor a 5 no añadir mas letras
  if (celdaActual > 5) {
    return;
  }
  //guardar el id de la celda actual
  const idCeldaActual = `cell${filaActual}-${celdaActual}`;
  //capturo el input actual
  const inputActual = document.getElementById(idCeldaActual);

  if (inputActual) {
    //si existe el input le atizo la letra
    inputActual.value = letraPresionada.toUpperCase();
    //pongo la letra en un str que sera la palabra
    palabra += letraPresionada.toLowerCase();
    //paso al siguiente input
    celdaActual++;
  }
}

/**
 *  Función que verifica la palabra 
 */
function validarPalabra() {
  //si es mas peque de  mensage
  if (palabra.length !== 5) {
    console.log("Debe completar las 5 letras antes de presionar Enter.");
    return;
  }
//si la palabra existe en el diccionario
  if (dic.includes(palabra)) {
    console.log("La palabra existe en el diccionario.");
    //ademas de existir es igual a la palabra aleatoria
    if (palabra === palabraAleatoria) {
      console.log("¡Correcto! La palabra es igual a la palabra aleatoria.");
      window.alert("|Correcto!");
      palabraCorrecta();
      // la palabra existe en el diccionario pero no es igual a la aleatoria
    } else {
      console.log(
        "La palabra no es la correcta, pero existe en el diccionario."
      );
      window.alert("La palabra no es la correcta");
      //llamo a la funcion que buscara coincidencia entre la palabar dada y la aleatoria
      verificarLetras(palabra);
      //llamo a la función que paso a la siguiente fila
      prepararSiguienteFila();
    }
    //la palabra no existe en el diccionario
  } else {
    console.log("La palabra no existe en el diccionario.");
    window.alert("La palabra no existe");
 //llamo a la función que paso a la siguiente fila
 //verificarLetras(palabra);
    // prepararSiguienteFila();
  }

}

//verificar letras
/**
 * Función que valida la letra de la palabra dada con la aleatoria y si coincide la marca
 * Si la letra está en la palabra y en la posición correcta, la marcamos en verde
 * Si la letra está en la palabra pero no en la posición correcta, la marcamos en amarillo
 * Si la letra no está en la palabra, la marcamos en gris
 * @param {*} palabraIngresada 
 */
function verificarLetras(palabraIngresada) {
  //cada vez que entra la función sumo  a intentos
  intentos += 1;
  localStorage.setItem("intentos", intentos);
  console.log("Intentos: ", intentos);
  //recorro la palabra ingresada, guardo la letra y el id de la celda actual
  for (let i = 0; i < palabraIngresada.length; i++) {
    const letra = palabraIngresada[i];
    const idCeldaActual = `cell${filaActual}-${i + 1}`;
    const celdaActual = document.getElementById(idCeldaActual);

    // Si la letra está en la palabra y en la posición correcta, la marcamos en verde
    if (letra === palabraAleatoria[i]) {
      celdaActual.classList.add("perfect"); // Agrega clase para letra en posición correcta
    }
    // Si la letra está en la palabra pero no en la posición correcta, la marcamos en amarillo
    else if (palabraAleatoria.includes(letra)) {
      celdaActual.classList.add("coincide"); // Agrega clase para letra noCoincide pero en posición incorrecta
    //no concede las letras morco en gris
    } else {
      celdaActual.classList.add("noCoincide");
    }
  }
}
/**
 * Si la palabra dada es igual a la aleatoria marca las letras en verde y desactiva la entrada de teclado
 */
function palabraCorrecta() {
  //sumo uno a las partidas ganadas
  partidasGanadas += 1;
  console.log("Partidas ganadas: ", partidasGanadas);
  //pito todas las letras en verde
  for (let i = 1; i <= 5; i++) {
    const idCeldaActual = `cell${filaActual}-${i}`;
    const celdaActual = document.getElementById(idCeldaActual);

    if (celdaActual) {
      celdaActual.classList.add("perfect");
    }
  }
  localStorage.setItem("partidasGanadas", partidasGanadas);
  // Desactivar la entrada de teclado
  desactivarEntradaTeclado();
}
/**
 * Función que desactiva el teclado cuando ganas
 */
function desactivarEntradaTeclado() {
  // Elimina el event listener de las teclas presionadas
  document.removeEventListener("keydown", teclasPresionada);

//capturo todos los teclados
  const botonesTeclado = document.querySelectorAll(".btn.btn-secondary.m-1");
  //los desactvo
  botonesTeclado.forEach(function (button) {
    button.disabled = true; // Deshabilitar los botones del teclado virtual
  });
}

/**
 * Función que prepara la siguiente fila y desactiva la anterior para que no se peuda borrar
 * NO FUNCIONA
 */
function prepararSiguienteFila() {
  console.log("entra en sigiente fila");
  // Deshabilitar la fila actual
  const filaActualDiv = document.getElementById(`fila${filaActual}`);
  console.log(filaActualDiv);
 

  // Reiniciar palabra y avanzar a la siguiente fila
  palabra = "";
  //controlo que no sea la ultima fila
  if (filaActual < 6) {
    filaActual++;
    celdaActual = 1;
    //si es la ultima fila mensaje y desactivo el teclado
  } else {
    partidasPerdidas += 1;
    //añado a local stroage
 
    localStorage.setItem("partidasPerdidas", partidasPerdidas);
    console.log("Juego terminado. No quedan más intentos.");
    alert("Juego terminado. No quedan más intentos.");
    desactivarEntradaTeclado(); 
  }
}

/**
 * Función que borra las letras
 */
function borrarUltimaLetra() {
  //si celda actual es mas de la primera
  if (celdaActual > 1) {
    //resto uno a celda actual
    if (celdaActual === 1) {
      filaActual -= 1;
      celdaActual = 5; //el número máximo de celdas por fila 
    } else {
      //retrocedo una posición
      celdaActual--;
    }
    //capturo el id de la celda actual
    const idCeldaActual = `cell${filaActual}-${celdaActual}`;
    //capturo el input actual
    const inputActual = document.getElementById(idCeldaActual);
    //si existe el input le borro la letra
    if (inputActual) {
      //borro el texto del input
      inputActual.value = "";
      //borro la letra de la palabra
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

/**
 * Función que da un num aleatorio enjtre  y 11033
 * @returns numero aleatorio
 */
function numeroAleatorio() {
  let numeroAleatorio = Math.random();
  let numeroFinal = Math.floor(numeroAleatorio * 11033);
  return numeroFinal;
}
