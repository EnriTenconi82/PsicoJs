"use strict";

/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/
//user y password de zona privada
var user = "nemuadmin";
var password = "nemuuser"; //array de objeto simulandos mensajes recibidos si la SessionStorage no esta creada.

var mensajes = [];

if (sessionStorage['SimularServMensajes']) {
  mensajes = JSON.parse(sessionStorage.getItem('SimularServMensajes'));
} else if (!sessionStorage['SimularServMensajes']) {
  //si no tengo ya unos datos creados de la sessios uso ese array de obj
  mensajes = [{
    "nombre": "TITO",
    "apellido": "TITOVICH",
    "celular": "341234566",
    "mail": "TITO@HOTMAIL.COM",
    "obrasocial": "OTRO",
    //(0:Otro 1:Galeno 2:Pami 3:OSDE)
    "consulta": "PRESENCIAL",
    //(0:Virtual 1:Presencial)
    "modResp": "VIRTUAL",
    //(0:Mail 1:Whatsupp 2:Llamada)
    "mens": "hola quisiera comunicarme para un turno gracias.",
    "leido": true,
    //true mensaje viejo (leido)
    "fecha": "31/08/2022",
    "id": 0
  }, {
    "nombre": "ROMINA",
    "apellido": "CABELLO",
    "celular": "341234566",
    "mail": "ROOO_CABE@AOL.COM",
    "obrasocial": "GALENO",
    //(0:Otro 1:Galeno 2:Pami 3:OSDE)
    "consulta": "VIRTUAL",
    //(0:Virtual 1:Presencial)
    "modResp": "MAIL",
    //(0:Mail 1:Whatsupp 2:Llamada)
    "mens": "hola me llamo Romi quisiera comunicarme para un turno gracias.",
    "leido": true,
    //true mensaje viejo (leido),
    "fecha": "31/08/2022",
    "id": 1
  }, {
    "nombre": "TANO",
    "apellido": "ORTIZ",
    "celular": "341234566",
    "mail": "TANO@AOL.COM",
    "obrasocial": "GALENO",
    //(0:Otro 1:Galeno 2:Pami 3:OSDE)
    "consulta": "VIRTUAL",
    //(0:Virtual 1:Presencial)
    "modResp": "MAIL",
    //(0:Mail 1:Whatsupp 2:Llamada)
    "mens": "hola me llamo Romi quisiera comunicarme para un turno gracias.",
    "leido": false,
    //true mensaje viejo (leido),
    "fecha": "31/08/2022",
    "id": 2
  }, {
    "nombre": "ROBERTO",
    "apellido": "DIEGUEZ",
    "celular": "34123226",
    "mail": "TANO@AOL.COM",
    "obrasocial": "GALENO",
    //(0:Otro 1:Galeno 2:Pami 3:OSDE)
    "consulta": "VIRTUAL",
    //(0:Virtual 1:Presencial)
    "modResp": "MAIL",
    //(0:Mail 1:Whatsupp 2:Llamada)
    "mens": "hola me llamo Romi quisiera comunicarme para un turno gracias.",
    "leido": true,
    //true mensaje viejo (leido),
    "fecha": "01/09/2022",
    "id": 3
  }];
} //fin creacion array mensajes
//definicion eventos de botones ya visibles


var privateForm = document.getElementById("privateForm");
privateForm.addEventListener("submit", privateZone); //funcion de lectura (//false=muestrame nuevos (no leidos) true =muestrame leidos)

function showMessages(arrayIn, esLeido, apellido, nombre) {
  var texto = "";
  var mensMonstrados = [];
  var noMessage = true; //variable control (tengo o no mensaje del genero establecido)
  //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE

  if (document.getElementById("articleCar")) {
    var padre = document.getElementById("articleCar").parentNode;
    padre.removeChild(document.getElementById("articleCar"));
  } //


  if (esLeido) {
    texto = " viejo(s).";
  } else if (!esLeido) {
    texto = " nuevo(s)";
  }

  if (nombre.length > 0 || apellido.length > 0) {
    texto = " de ".concat(nombre, " ").concat(apellido);
  }

  alert("Se mostraran  mensajes ".concat(texto, " para leer.")); //filtro a array los mensajes que cumplen condicion (busqueda leido)

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
  }

  console.log(mensMonstrados); //console check!
  //leos los mens y confirmo que si tengo de este tipo

  if (mensMonstrados.length > 0) {
    noMessage = false;
    messArtCreator(mensMonstrados);
  }

  if (noMessage) alert('Sin mensajes ' + texto + ' para leer'); //si no tengo mensaje de este tipo aviso
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
} //funcion BOTON INGRESO A CHECK ZONA PRIVADA


function privateZone(e) {
  e.preventDefault;
  var inpUser = document.getElementById("user").value;
  var inpPass = document.getElementById("passw").value;

  if (inpUser.length > 0 && inpPass.length > 0) {
    if (inpUser === user && inpPass === password) {
      divCreator();
    } else alert("Combinacion user password errada");
  }
} //funcion CREADORA DIV DE BOTONERA DE LECTURA


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
} //funcion DE CRECION HTML (IMPRESION MENSAJES EN PANTALLAS)    


function messArtCreator(printMess) {
  var messArti = document.createElement("article");
  var nodeMain = document.getElementById("main");
  messArti.className = "articleBg container-md pt-4 py-4  mb-4 px-0 px-sm-4";
  messArti.id = "articleCar";
  nodeMain.appendChild(messArti);
  var formCarr = document.createElement("form");
  var nodeD = document.getElementById("articleCar");
  formCarr.id = "mensForm";
  formCarr.innerHTML = "<h3>Mensaje(s)</h3>  \n                        <div id=\"myCarousel\" class=\"carousel\">\n\n                            <div class=\"carousel-indicators\" id=\"carrInd\">\n                            </div>\n\n                            <div class=\"carousel-inner\" id=\"carrInn\"> \n                            </div>\n\n                            <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"prev\">\n                                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n                                <span class=\"visually-hidden\">Previous</span>\n                            </button>\n                            \n                            <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"next\">\n                                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n                                <span class=\"visually-hidden\">Next</span>\n                            </button>\n                            \n                        </div>"; //creo hijos directos del form

  nodeD.appendChild(formCarr); //he creado form como hido de nodo nodeD
  //tomo nodos para ciclos y creacion indicadores y slides

  var nodeCarrInd = document.getElementById("carrInd");
  var nodeCarrInn = document.getElementById("carrInn");
  printMess.forEach(function (elemento, i) {
    if (i == 0) {
      var printStatus = "leido";

      if (elemento.leido == false) {
        printStatus = "nuevo";
      }

      nodeCarrInd.innerHTML = "<button type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide-to=\"".concat(i, "\" class=\"active\" aria-current=\"true\"></button>"); //        CarrInnDiv.class="item active"

      nodeCarrInn.innerHTML = "<div class=\"carousel-item active\">\n            <section class=\"cardBg ownCard mb-4 text-start\">\n            <div class=\"row justify-content-start g-4\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"formBlock justify-content-around\">\n                            <p>Mensaje: ".concat(i + 1, " de ").concat(printMess.length, ". </p>\n                            <p class=\"privPar\"><span  class=\"fst-italic fw-bolder\">Fecha: </span>").concat(elemento.fecha, "</p>\n                            <p class=\"privPar\"onclick=\"statusChange(").concat(i, ")\">Estado: <span class=\"readSlotC\" id=\"readSlot").concat(i, "\">").concat(printStatus, "</span></p>\n                            <p> Id: <span id=\"idSlot").concat(i, "\">").concat(elemento.id, "</span></p>\n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Apellido: </p>\n                            <p>").concat(elemento.apellido, "</p>\n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Nombre: </p>\n                            <p>").concat(elemento.nombre, "</p>\n                        \n                        </div>\n                    </div>\n                \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Celular: </p>\n                            <p>").concat(elemento.celular, "</p>\n                        \n                        </div>  \n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mail: </p>\n                            <p>").concat(elemento.mail, "</p>\n                        \n                        </div>\n                    </div>\n        \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Obra Social: </p>\n                            <p>").concat(elemento.obrasocial, "</p>\n                        \n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Tipo consulta: </p>\n                            <p>").concat(elemento.consulta, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Modalidad respuesta: </p>\n                            <p>").concat(elemento.modResp, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mensaje: </p>\n                            <p>").concat(elemento.mens, "</p>\n                        \n                        </div>\n                    </div>\n                \n                </div>\n    \n        </section>\n        </div>");
    } else {
      var _printStatus = "leido";

      if (elemento.leido == false) {
        _printStatus = "nuevo";
      }

      nodeCarrInd.innerHTML = nodeCarrInd.innerHTML + "<button type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide-to=\"".concat(i, "\" aria-current=\"true\"></button>");
      nodeCarrInn.innerHTML = nodeCarrInn.innerHTML + "<div class=\"carousel-item\">\n            <section class=\"cardBg ownCard mb-4 text-start\">\n            <div class=\"row justify-content-start g-4\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"formBlock justify-content-around\">\n                            <p>Mensaje: ".concat(i + 1, " de ").concat(printMess.length, ". </p>\n                            <p class=\"privPar\"><span  class=\"fst-italic fw-bolder\">Fecha: </span>").concat(elemento.fecha, "</p>\n                            <p class=\"privPar\" onclick=\"statusChange(").concat(i, ")\">Estado: <span class=\"readSlotC\" id=\"readSlot").concat(i, "\">").concat(_printStatus, "</span></p>\n                            <p> Id: <span id=\"idSlot").concat(i, "\">").concat(elemento.id, "</span></p>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Apellido: </p>\n                            <p>").concat(elemento.apellido, "</p>\n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Nombre: </p>\n                            <p>").concat(elemento.nombre, "</p>\n                        \n                        </div>\n                    </div>\n                \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Celular: </p>\n                            <p>").concat(elemento.celular, "</p>\n                        \n                        </div>  \n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mail: </p>\n                            <p>").concat(elemento.mail, "</p>\n                        \n                        </div>\n                    </div>\n        \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Obra Social: </p>\n                            <p>").concat(elemento.obrasocial, "</p>\n                        \n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Tipo consulta: </p>\n                            <p>").concat(elemento.consulta, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Modalidad respuesta: </p>\n                            <p>").concat(elemento.modResp, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mensaje: </p>\n                            <p>").concat(elemento.mens, "</p>\n                        \n                        </div>\n                    </div>\n                \n                </div>\n    \n        </section>\n        </div>");
    }
  });
} //FUNCION BOTON CAMBIO DE ESTADO NUEVO--->LEIDO 
//LLAMADA DESDE HTML CREADO->            nodeCarrInn.innerHTML


function statusChange(i) {
  var statusChange = document.getElementById("readSlot".concat(i)).innerText;
  var idChange = document.getElementById("idSlot".concat(i)).innerHTML;

  if (statusChange == "nuevo") {
    alert("El mensaje pasará a estado: leido");
    mensajes[idChange].leido = true;
    document.getElementById("readSlot".concat(i)).innerHTML = "leido";
    sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
  }
}