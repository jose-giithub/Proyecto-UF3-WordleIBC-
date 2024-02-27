// Función para manejar el evento de clic en cada tecla
function manejarEntrada(letraVirtual) {
  console.log("Tecla presionada:", letraVirtual);
  //capturo el input actual
  let inputActual = document.getElementById("input" + indiceActual);
  //si el input actual no es enter o borrar añado el valor al input
  if (letraVirtual !== "Enter" && letraVirtual !== "Backspace") {
    if (inputActual) {
      inputActual.value = letraVirtual;
      indiceActual++;
    }
    }
    //si el input actual es Backspace elimino el input actual o el anterior
    if (letraVirtual === "Backspace") {
      console.log("entra");
      // No necesitas usar inputActual.value aquí para el log
      if (indiceActual > 1) {
        // Asegúrate de que no estés en el primer índice
        indiceActual--; // Mueve hacia atrás el índice para borrar el valor del input anterior
        let inputAnterior = document.getElementById("input" + indiceActual);
        if (inputAnterior && inputAnterior.value === "") {
          // Tu lógica para manejar el borrado cuando el input anterior está vacío
        } else {
          inputAnterior.value = ""; // Limpia el valor del input anterior si no está vacío
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
  ];
  // Convertir a minúsculas para hacer la comparación y aceptar Enter y Backspace como están
  if (
    letrasValidas.includes(teclaPresionada.toLowerCase()) ||
    teclaPresionada === "Enter" ||
    teclaPresionada === "Backspace"
  ) {
    // console.log("Tecla válida presionada: " + event.key);
    manejarEntrada(teclaPresionada);
    // return event.key;
  } else {
    // console.log("Tecla no válida presionada: " + event.key);
    return null;
  }
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
}
