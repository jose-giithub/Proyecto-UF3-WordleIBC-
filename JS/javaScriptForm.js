//**************VARIABLES GLOBALES */
//VARIABLE CUADRICULA
const arrayRows = 6;
const arrayColums = 5;
//VARIABLE FORMULARIO
let contenedorFolrulario;
let nombreFormulario;
let apellidos;
let correo;
let telefono;
let botonFormulario;
let textoAlerta;
let formValid = false;
//VARIABLES TECLADO
let teclaPresionada;
// variable para recoger el indice del input donde se escribe
let indiceActual = 1;
//controlador para que solo se pueda escribir en una sola libia hasta verificar la palabra
let liniaCompleta = false;

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


 //capturo los botones virtuales
 let buttonsVirtuales = document.querySelectorAll('.btn.btn-secondary.m-1');
 buttonsVirtuales.forEach(function(button) {
     button.addEventListener('click', function() {
         let letra = button.id; // Aquí capturas el texto del botón
         manejarEntrada(letra); // Suponiendo que tienes una función manejarEntrada para manejar tanto teclado físico como virtual
     });
 });
 //capturar teclado normal
  window.addEventListener("keydown", function (event) {//evento keydown
    let teclaPresionada = teclasPresionada(event);//guarda la letra presionada lla función teclasPresionada desde donde se captura la tecla
  });
 
 


  botonFormulario.click(function (event) {
    //evento onclick .trim();
    event.preventDefault(); //Para que se cargue el formulario sea como sea
    //cuando retorne true se oculta el formulario
    if (validarForm(nombreFormulario)) {
      contenedorFolrulario.hide();
    }
  }); //final botonFormulario.click
}); //final DOMContentLoaded

