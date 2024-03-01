//**************VARIABLES GLOBALES */
//VARIABLES TECLADO
let teclaPresionada;
//palabra aleatorio 
let numAleatorio;
let palabraAleatoria;
//Guardar todas las letras que se escriben
let palabra = "";
let partidasGanadas = 0;
let intentos = 0;
let partidasPerdidas=0;

/********Libreria con los datos del uer */
var datosUser = {
  nombreFormulario: "",
  apellidos: "",
  correo: "",
  telefono: "",
};

// Variables para manejar la posición actual
let filaActual = 1;
let celdaActual = 1;
let inputActual =1;
window.addEventListener("DOMContentLoaded", function () {

  //capturo los botones virtuales
document.querySelectorAll('.btn.btn-secondary.m-1').forEach(function (button) {
  button.addEventListener('click', function () {
    // El ID del botón es la letra, pero necesitas manejar 'Enter' y 'Backspace' adecuadamente
    agregarLetra(button.id); // Usa textContent o innerText según lo que contenga el botón
 
  });
});

  // Escuchar la tecla presionada
document.addEventListener('keydown', teclasPresionada);

 // Evento clic en el botón de teclado, animación
 $(document).ready(function() {//captura botones teclado
  let botonesTeclado = $(".btn-secondary");
  botonesTeclado.click(function() {
    let boton = $(this); // Almacena una referencia al botón
    boton.addClass("btn-danger");//modifico a rojo
    setTimeout(function() {
      boton.removeClass("btn-danger");
    }, 400); // Quita la clase después de 400ms
  });
});

  const contenedorFormulario = $("#contenedorFormulario");
  const container = $(".container");
  const nombreFormulario = $("#fname");
  const apellidos = $("#apellidos");
  const correo = $("#correo");
  const telefono = $("#telefono");
  const botonFormulario = $("#botonFormulario");
  const botonEstadisticas = $("#botonEstadisticas");
  const botonReiniciar = $("#botonReiniciar");
  const botonInstrucciones = $("#botonInstrucciones");
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
    /*************HE BORRADO LA FUNCINO GENERAR CUADRICULA TENDREMOS QUE APAÑAR ESTO */

  } else {
    // Si es la primera vez que se visita la página, mostrar el formulario
    contenedorFormulario.show();
    container.hide();
  }
 

  // Evento clic en el botón de formulario
  botonFormulario.click(function (event) {
    event.preventDefault(); // Evitar envío automático del formulario
    if (validarForm()) { // Llamar a la función de validación
      // Guardar datos del usuario en localStorage
      localStorage.setItem("formularioCompletado", true);
      localStorage.setItem("nombre", nombreFormulario.val().trim());
      localStorage.setItem("apellidos", apellidos.val().trim());
      localStorage.setItem("correo", correo.val().trim());
      localStorage.setItem("telefono", telefono.val().trim());

      contenedorFormulario.hide(); // Ocultar el formulario si la validación es exitosa
      container.show(); // Mostrar el div container cuando el formulario se oculta

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



  

  // INICIO PARTE DE POPUP INSTRUCCIONES
botonInstrucciones.click(function() {
  const popupInstrucciones = new Popup({
    id: "color-info",
    title: `<br>
    PALABRA DEL DÍA`,
    content: `<br><br><br><br>Las reglas son simples: adivina la palabra oculta en 6 intentos. Cada intento debe ser una palabra válida y si la palabra no existe el juego te avisará.
    Después de cada intento el color de las casillas cambia para mostrar qué tan cerca estás de acertar la palabra.
<div class="color-explanation"><div class="color-box green">D</div> VERDE significa que la letra está en la palabra y en la posición CORRECTA.</div>
<div class="color-explanation"><div class="color-box yellow">A</div> AMARILLO significa que la letra está presente en la palabra pero en la posición INCORRECTA.</div>
<div class="color-explanation"><div class="color-box grey">N</div> GRIS significa que la letra NO está presente en la palabra.</div>
<p>¡Una palabra nueva cada día!</p>
<button class="play-button">¡JUGAR!</button>
<a href="https://lapalabradeldia.com/como-jugar/" class="instructions-link">Leer las instrucciones completas
    del juego.</a>`,
    titleColor: "#e1e1e1",
    titleMargin: "40",
    backgroundColor: "#383838",
    textColor: "#fff",
    fontSizeMultiplier: "0.6",
});
popupInstrucciones.show();
});
// FIN PARTE DE POPUP INSTRUCCIONES

// INICIO PARTE DE POPUP ESTADÍSTICAS
botonEstadisticas.click(function() {
  const nombre = localStorage.getItem("nombre");
  const apellidos = localStorage.getItem("apellidos");
  const correo = localStorage.getItem("correo");
  const telefono = localStorage.getItem("telefono");
  const partidasJugadas = localStorage.getItem("partidasJugadas");
  const partidasGanadas = localStorage.getItem("partidasGanadas");
  const partidasPerdidasLocalStorage = localStorage.getItem("partidasPerdidas");
  const porcentajeAciertos = localStorage.getItem("porcentajeAciertos");
  const palabrasAdivinadas = localStorage.getItem("palabrasAdivinadas");
  const palabrasFallidas = localStorage.getItem("palabrasFallidas");
  const letrasAcertadas = localStorage.getItem("letrasAcertadas");
  const intentosLocalStorage = localStorage.getItem("intentos");

  const contenidoPopup = `
    <br><br><br><br>
    <p>Tu nombre: ${nombre}</p>
    <p>Tus apellidos: ${apellidos}</p>
    <p>Tu correo electrónico: ${correo}</p>
    <p>Tu teléfono: ${telefono}</p>
    <p>Partidas ganadas: ${partidasGanadas}</p>
    <p>Partidas perdidas: ${partidasPerdidasLocalStorage}</p>
    
    <p>Intentos: ${intentosLocalStorage}</p>
  `;
  /*
   <p>Partidas jugadas: ${partidasJugadas}</p>
   <p>Porcentaje de aciertos: ${porcentajeAciertos}%</p>
    <p>Palabras adivinadas: ${palabrasAdivinadas}</p>
    <p>Palabras fallidas: ${palabrasFallidas}</p>
    <p>Letras acertadas: ${letrasAcertadas}</p>

   */

  const popupEstadisticas = new Popup({
    id: "color-info",
    title: `<br>ESTADISTICAS`,
    content: contenidoPopup,
    titleColor: "#e1e1e1",
    titleMargin: "40",
    backgroundColor: "#383838",
    textColor: "#fff",
    fontSizeMultiplier: "0.6",
  });

  popupEstadisticas.show();
});
// FIN PARTE DE POPUP ESTADÍSTICAS

// INICIO PARTE DE POPUP REINICIAR
botonReiniciar.click(function() {
  // Limpiar localStorage
  location.reload();


  // Ocultar container y mostrar formulario
  $(".container").hide();
  $("#contenedorFormulario").show();
});
// FIN PARTE DE POPUP REINICIAR


}); //final DOMContentLoaded

