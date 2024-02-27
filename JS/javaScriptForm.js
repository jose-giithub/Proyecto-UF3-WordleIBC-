//**************VARIABLES GLOBALES */
//VARIABLE CUADRICULA
const arrayRows = 5;
const arrayColums = 6;
//VARIABLE FORMULARIO
let contenedorFolrulario;
let nombreFormulario;
let apellidos;
let correo;
let telefono;
let botonFormulario;
let textoAlerta;
let formValid = false;

/********Libreria con los datos del uer */
var datosUser = {
  nombreFormulario: "",
  apellidos: "",
  correo: "",
  telefono: "",
};


window.addEventListener("DOMContentLoaded", function () {
  /***************CAPTURAR ELEMENTOS */
  contenedorFolrulario = $("#contenedorFormulario");
  nombreFormulario = $("#fname");
  apellidos = $("#apellidos");
  correo = $("#correo");
  telefono = $("#telefono");
  textoAlerta = $("#textoAlerta");
  //oculto el campo
  textoAlerta.hide();
  botonFormulario = $("#botonFormulario");

   //CUADRICULA DINÁMICA
  //capturar el contenedor donde ira la cuadricula
  let cuadricula = document.getElementById("cuadricula");
  //recorremos las rows
  for (let row = 0; row < arrayRows; row++) {
    let divs = document.createElement("div"); //creamos divs
    divs.id = "row" + (row + 1); //le añadimos id
    //recorremos las colums
    for (let col = 0; col < arrayColums; col++) {
      let input = document.createElement("input"); //creamos input
      input.type = "text";
      input.maxLength = "1"; //máximo de letras dentro de cada input
      input.className = "cuadrado"; //le atizamos una clase común a todas
      input.id = "input" + (row * arrayRows + (col + 1)); //añadimos id
      //añadimos dentro de los divs que hemos creado al inicio del form row los input
      divs.appendChild(input);
    }
    //dentro del contenedor capturado del html atizamos los divs con los input dentro
    cuadricula.appendChild(divs);
  }
  window.addEventListener("keydown", function (event) {//evento keydown
    let teclaPresionada = teclasPresionada(event);//guarda la letra presionada lla función teclasPresionada desde donde se captura la tecla
    //añado la letra al div amarillo
  
  });
  

  botonFormulario.click(function (event) {
    //evento onclick .trim();
    event.preventDefault(); //Para que se carge el formulario sea como sea
    //cuando retorne true se oculta el formulario
    if (validarForm(nombreFormulario)) {
      contenedorFolrulario.hide();
    }
  }); //final botonFormulario.click
}); //final DOMContentLoaded

