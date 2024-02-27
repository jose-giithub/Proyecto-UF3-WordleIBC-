/**
 * Capturar teclasdo
 * @param {*} event 
 * @returns 
 */
function teclasPresionada(event) {//recive el evento keydown
    let teclaPresionada = event.key;//Guardo la letra presionada
     console.log("Tecla presionada: " + teclaPresionada);
     //Array con las letras validas
     var letrasValidas = ['KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ', 'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyV', 'KeyW', 'KeyY', 'KeyZ'];
     if (letrasValidas.includes(event.code)) {//comparo si la letra presionada esta en el array de letras validas
         return event.key ;
     }else{
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
      //si esta vacio
      console.log("Nombre vacio");
      //muestrame el mensaje de error
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
      // tidos los campos están bien
      return true;
    }
  }
     