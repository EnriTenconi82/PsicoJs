"use strict";

//carga datos desde .json
function getJson() {
  var response, dato;
  return regeneratorRuntime.async(function getJson$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("../data/mess.json"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          dato = _context.sent;
          !sessionStorage['SimularServMensajes'] && sessionStorage.setItem('SimularServMensajes', JSON.stringify(dato)); //si ya he estado trabajando en la pagina mantengo los cambio del almacenamiento de Session

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

getJson(); // tomo valor de archivo js y guardo en storage para trabajar si recien entre a la app
//creo item en sessionStorage que contendra token de session

!sessionStorage['logued'] && sessionStorage.setItem('logued', "");