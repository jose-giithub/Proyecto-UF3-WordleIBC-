

function validarPalabra() { //abaca curen
  console.log("palabra", palabra , 'palabra aleatoria' , palabraAleatoria);
 
   if (dic.includes(palabra) && palabra === palabraAleatoria) {
    console.log("existe y es igual" );
  } else if (dic.includes(palabra)) {
    console.log("existe" );
  } else{
    console.log("no existe");
  }

  
}



// Función para manejar el evento de clic en cada tecla
function manejarEntrada(letraVirtual) {
  //  console.log("Tecla válida presionada: " + letraVirtual);
  //capturo el input actual
  inputActual = document.getElementById("input" + indiceActual);
  
  //**************se se presiona enter 
  //si ademas de presionar enter el indice es 6 se pasa a la siguiente linea y se desactivan los inputs 1 ,2,3,4,5
  if (letraVirtual === "Enter" && indiceActual === 6) {
    //desactivo los inputs
    for (let i = 1; i <= 5; i++) {
      let input = document.getElementById("input" + i);
      input.disabled = true;
    }

    //calor de la letra
    console.log('*********pasar a la siguiente linea' ,indiceActual );
     
  } else if (letraVirtual === "Enter") {
    console.log('*********Valido sin pasar  a la siguiente linea' ,indiceActual );
     validarPalabra(palabra);
  }


  //si se presiona Backspace borro el valor del input
  if (letraVirtual === "Backspace") {
    // let inputActualBobrrar = document.getElementById("input" + indiceActual);
    // asegurar que no esté en el primer índice
    if (indiceActual > 1) {
      indiceActual--; // Mueve hacia atrás el índice para Backspace el valor del input anterior
      //capturo el input actual y le quito una posición
      let inputAnterior = document.getElementById("input" + indiceActual);
      //elimino la letra de la palabra
      palabra = palabra.slice(0, -1);
      console.log(palabra, "*****borro el valor del input");

      //si no esta vacio lo borro
      if (inputAnterior.value != "") {
        //inputAnterior &&
        //para que se pueda Backspace
        inputAnterior.disabled = true;
        inputAnterior.value = ""; // Limpia el valor del input anterior si no está vacío
      }
    }
    //si indice es 5 o menor activo los inputs
    if (indiceActual <= 5 || indiceActual <= 10) {
      console.log("activo los inputs");
      liniaCompleta = false;
    }
  }
  //si indice es 5 o 10 o 20 o 25, sera final de linia y desactivara los inputs para que no se pueda escribir mas
  if (indiceActual > 5 || indiceActual > 10) {
    console.log("desactivo los inputs");
    liniaCompleta = true;
  }
  //si no esta completa la linia permito añadir letras
  if (!liniaCompleta) {
    // console.log("num input:", indiceActual);

    //si el input actual no es enter o Backspace añado el valor al input --> la letra
    if (letraVirtual !== "Enter" && letraVirtual !== "Backspace") {
      if (inputActual) {
        inputActual.value = letraVirtual;
        palabra += inputActual.value;
        indiceActual++;
      }
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
    console.log("Tecla válida presionada: " + event.key);
    manejarEntrada(teclaPresionada);
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

/**
 * Validar formulario
 * @param {*} nombreFormulario
 * @returns
 */
function validarForm(nombreFormulario) {
  let nombre = nombreFormulario.val(); //capturo el valor del campo
  //quito espacios
  nombre.trim();
  //********VALIDAR CAMPO NOMBRE */
  if (nombre == "") {
    //si esta vació
    console.log("Nombre vacio");
    //muéstrame el mensaje de error
    textoAlerta.slideDown(700);
  }
  setTimeout(function () {
    textoAlerta.slideUp(700);
    return false;
  }, 2000);

  //********VALIDAR CAMPO APELLIDOS */
  //********VALIDAR CAMPO CORREO */
  //********VALIDAR CAMPO TELÉFONO */

  if (nombre != "") {
    // todo los campos están bien
    return true;
  }
};


