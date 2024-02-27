
//**************FUNCIONES GLOBALES */
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
    telefono:""
};
window.addEventListener('DOMContentLoaded', function(){

/***************CAPTURAR ELEMENTOS */ 
    contenedorFolrulario = $('#contenedorFormulario');
    nombreFormulario = $('#fname');
    apellidos = $('#apellidos');
    correo = $('#correo'); 
    telefono = $('#telefono');
    textoAlerta = $('#textoAlerta');
    //oculto el campo
    textoAlerta.hide();
    botonFormulario = $('#botonFormulario');


    botonFormulario.click(function(event){//evento onclick .trim();
        event.preventDefault();//Para que se carge el formulario sea como sea
     //cuando retorne true se oculta el formulario
      if (validarForm(nombreFormulario)) {
        contenedorFolrulario.hide();
      }
      });//final botonFormulario.click


});//final DOMContentLoaded

function validarForm(nombreFormulario){

      let nombre = nombreFormulario.val();//capturo el valor del campo
        //quito espacios
      nombre.trim();
      //********VALIDAR CAMPO NOMBRE */
        if(nombre == ''){ //si esta vacio 
           console.log('Nombre vacio');
           //muestrame el mensaje de error
           textoAlerta.slideDown(700);
        } setTimeout(function() {
           textoAlerta.slideUp(700);
           return false;
       }, 2000);
       
         //********VALIDAR CAMPO APELLIDOS */
//********VALIDAR CAMPO CORREO */
//********VALIDAR CAMPO TELÉFONO */

         if(nombre != ''){ // tidos los campos están bien 
         return true;
        }
}





