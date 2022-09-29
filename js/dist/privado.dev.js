"use strict";

//JS conteniente crecion de article de zona privada y botonoera
var mensajes = []; // si el token (logued) es igual al token del usuario registrado muestro privado
//usuario y matriz creado en sessionStor.js (simulacion servidor)

sessionStorage['SimularServUser'] && JSON.parse(sessionStorage.getItem("SimularServUser")).adToken === sessionStorage.getItem("logued") && divCreator(); //SI ESTOY LOGUEADO CREO BOTONERA PRIVADA
//funcior para tomar datos de usurario admin desde json

function getuser() {
  fetch('../data/user.json').then(function (response) {
    return response.json();
  }).then(function (usPass) {
    sessionStorage.setItem('SimularServUser', JSON.stringify(usPass));
    privateZone();
  } //funcion check usurario
  );
} //deslogueo por inactividad
//funcion BOTON INGRESO A CHECK ZONA PRIVADA


function privateZone() {
  var inpUser = document.getElementById("user").value;
  var inpPass = document.getElementById("passw").value; //user y password de zona privada

  var user = JSON.parse(sessionStorage.getItem("SimularServUser")).user;
  var password = JSON.parse(sessionStorage.getItem("SimularServUser")).pass;

  if (inpUser.length > 0 && inpPass.length > 0) {
    if (inpUser === user && inpPass === password) {
      var logToken = JSON.parse(sessionStorage.getItem("SimularServUser")).adToken;
      sessionStorage.setItem('logued', logToken); //guardo token a usuario correspondiente en mi memoria

      divCreator(); //creo div de zona privada    
    } else Swal.fire("Combinaci\xF3n User Password incorrecta", '', 'info');
  }
} ///definicion eventos de botones ya visibles u creado


if (document.getElementById("privateForm")) {
  var privateForm = document.getElementById("privateForm");
  privateForm.addEventListener("submit", getuser);
} //funcion salida de zona privada


function exit() {
  Swal.fire({
    title: 'Estas seguro de deslogearte?',
    showDenyButton: true,
    showCancelButton: false,
    allowOutsideClick: false,
    icon: 'warning',
    confirmButtonText: 'SI',
    denyButtonText: "CANCELAR"
  }).then(function (result) {
    if (result.isConfirmed) {
      removeUserToken();
    }
  });
} //funcion CREADORA DIV DE BOTONERA DE LECTURA


function divCreator() {
  //creo array desde SessionStorage
  mensajes = JSON.parse(sessionStorage.getItem('SimularServMensajes')); //modifico mi div donde se encuentra el login  creando ahi mismo la botonera

  var logDiv = document.getElementById("logging");
  logDiv.innerHTML = "<form onsubmit=\"return false\">\n    <p class=\"logout\" id=\"exit\">X</p>\n    <fieldset class=\"cardBg ownCard mb-4 text-start\">\n        <legend>Busqueda por Apellido y Nombre</legend>\n\n            <div class=\"row justify-content-start g-4\">\n                \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <label for=\"apellido\">Apellido</label>\n                        <input type=\"text\" id=\"apellido\" placeholder=\"Apellido\" required>\n                    </div>\n                </div>\n                \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <label for=\"nombre\">Nombre</label >\n                        <input type=\"text\" id=\"nombre\"    placeholder=\"Nombre\">\n                    </div>\n                </div>\n\n                \n            \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <button class=\"item-button\" id=\"findSurname\">Buscar</button>\n                    </div>  \n                </div>\n        </fieldset>    \n    </form>\n    \n    <form onsubmit=\"return false\" class=\"d-flex flex-wrap justify-content-between\">\n        <div class=\"col-sm-6\">\n            <button class=\"item-button\" id=\"findNew\">Mensaje(s) Nuevo(s) </button>\n    \n            <button class=\"item-button\" id=\"findOld\">Mensaje(s) Leido(s)</button>\n        </div>\n        \n        <button class=\"eraseButton\" id=\"eraseOld\">Eliminar Leido(s)</button>\n        \n        </form>"; //a los botones creados defino funcionalidades

  var findSurname = document.getElementById("findSurname");
  var findNew = document.getElementById("findNew");
  var findOld = document.getElementById("findOld");
  var eraseOldB = document.getElementById("eraseOld");
  var exitB = document.getElementById("exit");
  findNew.addEventListener("click", muestraMensNuevos);
  findSurname.addEventListener("click", muestraMensApellidoNombre);
  findOld.addEventListener("click", muestraMensViejos);
  eraseOldB.addEventListener("click", eraseOldFunc);
  exitB.addEventListener("click", exit);
} //funcion BOTON BUSQUEDA POR APELLIDO (Y NOMBRE)


function muestraMensApellidoNombre() {
  var apellidoIn = document.getElementById("apellido").value.toUpperCase();
  apellidoIn = apellidoIn.toUpperCase();
  var nombreIn = document.getElementById("nombre").value.toUpperCase();
  nombreIn.length > 0 && nombreIn.toUpperCase();
  apellidoIn.length > 0 && showMessages(mensajes, "", apellidoIn, nombreIn); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)
} //funcion BOTON LECTURA MENSAJES VIEJOS ()


function muestraMensViejos() {
  showMessages(mensajes, true, "", ""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)
} //funcion BOTON LECTURA MENSAJES NUEVOS


function muestraMensNuevos() {
  var temp;
  var validator = false;
  showMessages(mensajes, false, "", ""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)
} //FUNCION BOTON CAMBIO DE ESTADO NUEVO--->LEIDO 
//LLAMADA DESDE HTML CREADO->            nodeCarrInn.innerHTML (carouselCreate.js)


function statusChange(i) {
  var statusChange = document.getElementById("readSlot".concat(i)).innerText;
  var idChange = document.getElementById("idSlot".concat(i)).innerHTML;

  if (statusChange == "nuevo") {
    //real id corresponde a index del menaje con. el id de pantalla
    Swal.fire({
      title: 'Estas seguro marcar el mensaje como leido',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'SI',
      denyButtonText: "CANCELAR"
    }).then(function (result) {
      if (result.isConfirmed) {
        var realId = realIdF(idChange).findIndex(function (array) {
          return array == idChange;
        });
        mensajes[realId].leido = true;
        document.getElementById("readSlot".concat(i)).innerHTML = "leido";
        sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
      }
    });
  }
}