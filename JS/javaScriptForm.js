window.addEventListener("DOMContentLoaded", function () {
  // Variables globales
  const arrayRows = 6;
  const arrayColumns = 5;
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
    const telefonoRegex = /^\d{10}$/; // Expresión regular para validar un número de teléfono de 10 dígitos
    if (!telefonoRegex.test(telefonoValor)) {
      textoAlertaTelefono.text("Por favor, introduce un número de teléfono válido (10 dígitos).");
      return false;
    } else {
      textoAlertaTelefono.text("");
    }

    // Si todos los campos pasan la validación, devolver true
    return true;
  };

  // Función para generar la cuadrícula
  function generarCuadricula() {
    let cuadricula = document.getElementById("cuadricula");
    for (let row = 0; row < arrayColumns; row++) {
      let divs = document.createElement("div");
      divs.id = "row" + (row + 1);
      for (let col = 0; col < arrayRows; col++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";
        input.className = "cuadrado";
        input.id = "input" + (row * arrayRows + (col + 1));
        divs.appendChild(input);
      }
      cuadricula.appendChild(divs);
    }
  }

  window.addEventListener("keydown", function (event) {
    let teclaPresionada = teclasPresionada(event);
    // Añado la letra al div amarillo
  });
});
