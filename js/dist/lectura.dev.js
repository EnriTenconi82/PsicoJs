"use strict";

//JS FUNCIONES DE LECTURA
//funcion de lectura (//false=muestrame nuevos (no leidos) true =muestrame leidos)
function showMessages(arrayIn, esLeido, apellido, nombre) {
  var texto = "";
  var mensMonstrados = [];
  var noMessage = true; //variable control (tengo o no mensaje del genero establecido)
  //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE

  if (document.getElementById("articleCar")) {
    var padre = document.getElementById("articleCar").parentNode;
    padre.removeChild(document.getElementById("articleCar"));
  }

  esLeido ? texto = " viejos" : texto = " nuevos";

  if (nombre.length > 0 || apellido.length > 0) {
    texto = " de ".concat(nombre, " ").concat(apellido);
  }

  Swal.fire("Se mostraran  mensajes ".concat(texto, " para leer."), '', 'info'); //filtro a array los mensajes que cumplen condicion (busqueda leido)

  if (typeof esLeido === 'boolean') {
    mensMonstrados = arrayIn.filter(function (mensajeALeer) {
      return mensajeALeer.leido === esLeido;
    });
  } else if (apellido.length > 0) {
    if (nombre.length > 0) mensMonstrados = arrayIn.filter(function (mensajeALeer) {
      return mensajeALeer.nombre.includes(nombre) && mensajeALeer.apellido.includes(apellido);
    });else {
      mensMonstrados = arrayIn.filter(function (mensajeALeer) {
        return mensajeALeer.apellido.includes(apellido);
      });
    }
  } //leos los mens y confirmo que si tengo de este tipo


  if (mensMonstrados.length > 0) {
    noMessage = false;
    messArtCreator(mensMonstrados); //CREACION CAROUSEL (carouselCreate.js)
  }

  if (noMessage) {
    Swal.fire("Sin   mensajes ".concat(texto, " para leer."), '', 'info');
  }
} //borrado


function deleteMens(i) {
  var idUnic = document.getElementById("idSlot".concat(i)).innerHTML;

  if (document.getElementById("readSlot".concat(i)).innerHTML != "REMOVIDO") {
    Swal.fire({
      title: 'Do Estas seguro de querer eliminar el mensaje?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'SI',
      denyButtonText: "CANCELAR"
    }).then(function (result) {
      if (result.isConfirmed) {
        var realId = realIdF(idUnic).findIndex(function (array) {
          return array == idUnic;
        });
        mensajes.splice(realId, 1);
        document.getElementById("readSlot".concat(i)).innerHTML = "REMOVIDO";
        sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
        Swal.fire('Mensaje eliminado!', '', 'success');
      }
    });
  } else if (document.getElementById("readSlot".concat(i)).innerHTML === "REMOVIDO") {
    Swal.fire("El mensaje ha sido removido previamente", '', 'error');
  }
} //mapeo mensajes a id


function realIdF(id) {
  var idArray = mensajes.map(function (men) {
    return men.id;
  });
  return idArray;
}

function eraseOldFunc() {
  eraseMens(mensajes, true);
} //FUNCION ELIMINACION MENSAJES (parametro variales uso futuro)


function eraseMens(arrayIn, esLeido) {
  var mensajesGuardados = [];
  var mensajesElim = []; //let noMessage=true //variable control (tengo o no mensaje del genero establecido)

  var texto; //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE

  if (document.getElementById("articleCar")) {
    var padre = document.getElementById("articleCar").parentNode;
    padre.removeChild(document.getElementById("articleCar"));
  } //


  esLeido ? texto = " viejos" : texto = " nuevos"; //chequeo si hay mensajes

  mensajesElim = arrayIn.filter(function (mensajeAElim) {
    return mensajeAElim.leido === esLeido;
  });
  mensajesGuardados = arrayIn.filter(function (mensAGuard) {
    return mensAGuard.leido != esLeido;
  });

  if (mensajesElim.length === 0) {
    Swal.fire("Sin   mensajes ".concat(texto, " para eliminar."), '', 'info');
  } else {
    Swal.fire({
      title: "Se eliminaran mensajes ".concat(texto, " "),
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'SI',
      denyButtonText: "CANCELAR"
    }).then(function (result) {
      if (result.isConfirmed) {
        mensajes = mensajesGuardados; //subida

        sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
        Swal.fire("Mensajes ".concat(texto, " eliminados"), '', 'success');
      }
    });
  }
}