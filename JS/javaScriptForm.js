//**************VARIABLES GLOBALES */
//VARIABLES TECLADO
let teclaPresionada;
// variable para recoger el indice del input donde se escribe
let indiceActual = 1;
//controlador para que solo se pueda escribir en una sola libia hasta verificar la palabra
let liniaCompleta = false;
//palabra aleatorio 
let numAleatorio;
let palabraAleatoria;
//Guardar todas las letras que se escriben
let palabra = "";
//para la función manejarEntrada()
let inputActual;
/********Libreria con los datos del uer */
var datosUser = {
  nombreFormulario: "",
  apellidos: "",
  correo: "",
  telefono: "",
};


window.addEventListener("DOMContentLoaded", function () {
  // Variables globales
  const arrayRows = 6;
  const arrayColums = 5;
  const contenedorFormulario = $("#contenedorFormulario");
  const container = $(".container");
  const nombreFormulario = $("#fname");
  const apellidos = $("#apellidos");
  const correo = $("#correo");
  const telefono = $("#telefono");
  const botonFormulario = $("#botonFormulario");
  const textoAlerta = $("#textoAlerta");
  const textoAlertaNombre = $("#textoAlertaNombre");
  const textoAlertaApellidos = $("#textoAlertaApellidos");
  const textoAlertaCorreo = $("#textoAlertaCorreo");
  const textoAlertaTelefono = $("#textoAlertaTelefono");

  //selecciono un apalabra aleatoria
  numAleatorio = numeroAleatorio();
  palabraAleatoria = dic[numAleatorio];
  console.log("palabra aleatoria", palabraAleatoria);
  // Ocultar mensaje de error por defecto
  textoAlerta.hide();

  // Verificar si el formulario ya se ha completado antes
  const formularioCompletado = localStorage.getItem("formularioCompletado");
  if (formularioCompletado) {
    // Si el formulario ya se completó, mostrar directamente el juego
    contenedorFormulario.hide();
    container.show();
    generarCuadricula();
  } else {
    // Si es la primera vez que se visita la página, mostrar el formulario
    contenedorFormulario.show();
    container.hide();
  }

  // Evento clic en el botón de formulario
  botonFormulario.click(function (event) {
    event.preventDefault(); // Evitar envío automático del formulario
    if (validarForm()) { // Llamar a la función de validación
      // Guardar en localStorage que el formulario se ha completado
      localStorage.setItem("formularioCompletado", true);
      contenedorFormulario.hide(); // Ocultar el formulario si la validación es exitosa
      container.show(); // Mostrar el div container cuando el formulario se oculta
      generarCuadricula();
    } else {
      // Mostrar mensaje de error si la validación falla
      textoAlerta.text("Por favor, completa todos los campos correctamente.");
      textoAlerta.slideDown(700);
    }
  });
// Función de validación del formulario
const validarForm = () => {
  // Validar nombre
  let nombre = nombreFormulario.val().trim();
  if (nombre === "") {
    textoAlertaNombre.text("El campo Nombre es obligatorio.");
    return false;
  } else {
    textoAlertaNombre.text("");
  }

  // Validar apellidos
  let apellidosValor = apellidos.val().trim();
  if (apellidosValor === "") {
    textoAlertaApellidos.text("El campo Apellidos es obligatorio.");
    return false;
  } else {  
    textoAlertaApellidos.text("");
  }

  // Validar correo electrónico con expresión regular
  let correoValor = correo.val().trim();
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correo electrónico
  if (!correoRegex.test(correoValor)) {
    textoAlertaCorreo.text("Por favor, introduce un correo electrónico válido.");
    return false;
  } else { 
    textoAlertaCorreo.text("");
  }

  // Validar teléfono con expresión regular
  let telefonoValor = telefono.val().trim();
  const telefonoRegex = /^\d{9}$/; // Expresión regular para validar un número de teléfono de 10 dígitos
  if (!telefonoRegex.test(telefonoValor)) {
    textoAlertaTelefono.text("Por favor, introduce un número de teléfono válido (9 dígitos).");
    return false;
  } else {
    textoAlertaTelefono.text("");
  }

  // Si todos los campos pasan la validación, devolver true
  return true;
};


  //CUADRICULA DINÁMICA
  // Función para generar la cuadrícula
  function generarCuadricula() {
    //capturar el contenedor donde ira la cuadricula
    let cuadricula = document.getElementById("cuadricula");
    //recorremos las rows
    for (let row = 0; row < arrayColums; row++) {
      let divs = document.createElement("div"); //creamos divs
      divs.id = "row" + (row + 1); //le añadimos id
      //recorremos las colums
      for (let col = 0; col < arrayRows; col++) {
        let input = document.createElement("input"); //creamos input  arrayColums
        input.type = "text";
        input.maxLength = "1"; //máximo de letras dentro de cada input
        input.className = "cuadrado"; //le atizamos una clase común a todas
        input.type = "text"; //le añadimos el tipo text
        input.disabled = true;  //desactivamos los inputs
        input.id = "input" + (col * arrayColums + (row + 1)); //añadimos id
        //añadimos dentro de los divs que hemos creado al inicio del form row los input
        divs.appendChild(input);
      }
      //dentro del contenedor capturado del html atizamos los divs con los input dentro
      cuadricula.appendChild(divs);
    }
  }


  //capturo los botones virtuales
  let buttonsVirtuales = document.querySelectorAll('.btn.btn-secondary.m-1');
  buttonsVirtuales.forEach(function (button) {
    button.addEventListener('click', function () {
      let letra = button.id; // Aquí capturas el texto del botón
      manejarEntrada(letra); // Suponiendo que tienes una función manejarEntrada para manejar tanto teclado físico como virtual
    });
  });
  //capturar teclado normal
  window.addEventListener("keydown", function (event) {//evento keydown
    let teclaPresionada = teclasPresionada(event);//guarda la letra presionada lla función teclasPresionada desde donde se captura la tecla
  });
}); //final DOMContentLoaded

