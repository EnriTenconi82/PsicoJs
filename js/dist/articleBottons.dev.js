"use strict";

//js de creacion de botones al ingresar a zona privada 
//funcion BOTON INGRESO A CHECK ZONA PRIVADA
function privateZone(e) {
  e.preventDefault;
  var inpUser = document.getElementById("user").value;
  var inpPass = document.getElementById("passw").value;

  if (inpUser.length > 0 && inpPass.length > 0) {
    if (inpUser === user && inpPass === password) {
      divCreator();
    } else alert("Combinacion user password errada");
  }
} //definicion eventos de botones ya visibles


var privateForm = document.getElementById("privateForm");
privateForm.addEventListener("submit", privateZone); //funcion CREADORA DIV DE BOTONERA DE LECTURA

function divCreator() {
  //modifico mi div donde se encuentra el login  creando ahi mismo la botonera
  var logDiv = document.getElementById("logging");
  logDiv.innerHTML = "        <form onsubmit=\"return false\">\n    <fieldset class=\"cardBg ownCard mb-4 text-start\">\n        <legend>Busqueda por Apellido y Nombre</legend>\n            <div class=\"row justify-content-start g-4\">\n                \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <label for=\"apellido\">Apellido</label>\n                        <input type=\"text\" id=\"apellido\" placeholder=\"Apellido\" required>\n                    </div>\n                </div>\n                \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <label for=\"nombre\">Nombre</label >\n                        <input type=\"text\" id=\"nombre\"    placeholder=\"Nombre\">\n                    </div>\n                </div>\n\n                \n            \n                <div class=\"col-sm-6\">\n                    <div class=\"formBlock\">\n                        <button class=\"item-button\" id=\"findSurname\">Buscar</button>\n                    </div>  \n                </div>\n        </fieldset>    \n    </form>\n    \n    <form onsubmit=\"return false\">\n        <button class=\"item-button\" id=\"findNew\">Mensaje(s) Nuevo(s) </button>\n    \n        <button class=\"item-button\" id=\"findOld\">Mensaje(s) Archivado(s)</button>\n    </form>\n\n</article>"; //botones creados defino funciones

  var findSurname = document.getElementById("findSurname");
  var findNew = document.getElementById("findNew");
  var findOld = document.getElementById("findOld");
  findNew.addEventListener("click", muestraMensNuevos);
  findSurname.addEventListener("click", muestraMensApellidoNombre);
  findOld.addEventListener("click", muestraMensViejos);
} //funcion BOTON BUSQUEDA POR APELLIDO (Y NOMBRE)


function muestraMensApellidoNombre() {
  var apellidoIn = document.getElementById("apellido").value.toUpperCase();
  apellidoIn = apellidoIn.toUpperCase();
  var nombreIn = document.getElementById("nombre").value.toUpperCase();
  if (nombreIn.length > 0) nombreIn = nombreIn.toUpperCase();
  if (apellidoIn.length > 0) showMessages(mensajes, "", apellidoIn, nombreIn); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)
} //funcion BOTON LECTURA MENSAJES VIEJOS


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
    //real id corresponde a index del menaje con el id de pantalla
    //abro modal USO FUTURO MODAL CONFIRMACION DE OPERACION
    //let modal=document.getElementById("staticBackdrop")
    //modal.style.show=true
    //
    //var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'),"" )
    // myModal.show();
    // alert(myModal)
    var realId = realIdF(idChange).findIndex(function (array) {
      return array == idChange;
    });
    mensajes[realId].leido = true;
    document.getElementById("readSlot".concat(i)).innerHTML = "leido";
    sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
  }
} //mapeo mensajes a id


function realIdF(id) {
  var idArray = mensajes.map(function (men) {
    return men.id;
  });
  return idArray;
}