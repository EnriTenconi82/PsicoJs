"use strict";

//JS CREACION CAROUSEL
//funcion DE CRECION HTML (IMPRESION MENSAJES EN PANTALLAS)    
function messArtCreator(printMess) {
  var messArti = document.createElement("article");
  var nodeMain = document.getElementById("main");
  messArti.className = "articleBg container-md pt-4 py-4  mb-4 px-0 px-sm-4";
  messArti.id = "articleCar";
  nodeMain.appendChild(messArti);
  var formCarr = document.createElement("form");
  var nodeD = document.getElementById("articleCar");
  formCarr.id = "mensForm";
  var h3 = document.createElement("h3");
  h3.innerText = "Mensaje(s)";
  formCarr.innerHTML = "<h3>Mensaje(s)</h3>  \n                        <div id=\"myCarousel\" class=\"carousel\">\n\n                            <div class=\"carousel-indicators\" id=\"carrInd\">\n                            </div>\n\n                            <div class=\"carousel-inner\" id=\"carrInn\"> \n                            </div>\n\n                            <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"prev\">\n                                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n                                <span class=\"visually-hidden\">Previous</span>\n                            </button>\n                            \n                            <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#myCarousel\" data-bs-slide=\"next\">\n                                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n                                <span class=\"visually-hidden\">Next</span>\n                            </button>\n                            \n                        </div>"; //creo hijos directos del form

  nodeD.appendChild(formCarr); //he creado form como hido de nodo nodeD
  //tomo nodos para ciclos y creacion indicadores y slides

  var nodeCarrInd = document.getElementById("carrInd");
  var nodeCarrInn = document.getElementById("carrInn");
  printMess.forEach(function (elemento, i) {
    var printStatus = "leido";

    if (elemento.leido == false) {
      printStatus = "nuevo";
    }

    var innButt = document.createElement("button");
    var itemDiv = document.createElement("div");
    innButt.setAttribute("type", "button");
    innButt.setAttribute("data-bs-target", "#myCarousel");
    innButt.setAttribute("data-bs-slide-to", "".concat(i));
    innButt.setAttribute("aria-current", "true");

    if (i == 0) {
      innButt.setAttribute("class", "active");
      itemDiv.setAttribute("class", "carousel-item active");
    } else {
      itemDiv.setAttribute("class", "carousel-item ");
    }

    itemDiv.innerHTML = "<section class=\"cardBg ownCard mb-4 text-start\">\n                <div class=\"row justify-content-start g-4\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"formBlock justify-content-around\">\n                            <p>Mensaje: ".concat(i + 1, " de ").concat(printMess.length, ". </p>\n                            <p class=\"privPar\"><span  class=\"fst-italic fw-bolder\">Fecha: </span>").concat(elemento.fecha, "</p>\n                            <p class=\"privPar\"onclick=\"statusChange(").concat(i, ")\">Estado: <span class=\"readSlotC\" id=\"readSlot").concat(i, "\">").concat(printStatus, "</span></p>\n                            <p> Id: <span id=\"idSlot").concat(i, "\">").concat(elemento.id, "</span></p>\n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Apellido: </p>\n                            <p>").concat(elemento.apellido, "</p>\n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Nombre: </p>\n                            <p>").concat(elemento.nombre, "</p>\n                        \n                        </div>\n                    </div>\n                \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Celular: </p>\n                            <p>").concat(elemento.celular, "</p>\n                        \n                        </div>  \n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mail: </p>\n                            <p>").concat(elemento.mail, "</p>\n                        \n                        </div>\n                    </div>\n        \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Obra Social: </p>\n                            <p>").concat(elemento.obrasocial, "</p>\n                        \n                        </div>\n                    </div>\n    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Tipo consulta: </p>\n                            <p>").concat(elemento.consulta, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Modalidad respuesta: </p>\n                            <p>").concat(elemento.modResp, "</p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"col-sm-6\">\n                        <div class=\"formBlock\">\n                            <p>Mensaje: </p>\n                            <p>").concat(elemento.mens, "</p>\n                        \n                        </div>\n                    </div>\n                \n                </div>\n    \n        </section>");
    nodeCarrInd.appendChild(innButt);
    nodeCarrInn.appendChild(itemDiv);
  });
}