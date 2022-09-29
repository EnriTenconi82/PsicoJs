"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/
//declaro plantilla mensaje
var nuevoMensaje = function nuevoMensaje(nombre, apellido, celular, mail, obrasocial, //(0:Otro 1:Galeno 2:Pami 3:OSDE)
consulta, //(0:Virtual 1:Presencial)
modResp, //(0:Mail 1:Whatsupp 2:Llamada)
mens, leido, fecha, id) //true mensaje viejo (leido)
{
  _classCallCheck(this, nuevoMensaje);

  this.nombre = nombre;
  this.apellido = apellido;
  this.celular = celular;
  this.mail = mail;
  this.obrasocial = obrasocial;
  this.consulta = consulta;
  this.modResp = modResp;
  this.mens = mens;
  this.leido = leido;
  this.fecha = fecha;
  this.id = id;
}; //submit de form


var miForm = document.getElementById("formContacto");
miForm.addEventListener("submit", nuevoMensajeClick); //tomo color de texto de campo (color de default OK) 

var element = document.getElementById('nombre');
var elementStyle = window.getComputedStyle(element);
var elementColor = elementStyle.getPropertyValue('color');
!sessionStorage['textColor'] && sessionStorage.setItem('textColor', elementColor);
/*VALIDACION segun si el valor ingresado es como corresponde  (texto o numero) deja seguir el prompt o no
en futura pagina web se requeriran todos los datos y valores de obra social 0 1 2 etc ya veran desde la pagina
*/

function mensFieldsInput(dato, esnumero, id) //insertar valor (true=number,false=texto)
{
  var validator = false; //SI VALOR NO ES VALIDO SE MARCA EN ROJO, SI ES VALIDO VUELVE A COLOR DE DEFAULT

  if (dato.length > 0 && isNaN(dato) && esnumero == false) {
    validator = true;
    document.getElementById(id).style.color = sessionStorage.getItem('textColor');
  } else if (dato.length > 0 && !isNaN(dato) && esnumero == true) {
    validator = true;
  }

  if (validator === false) document.getElementById(id).style.color = "red";
  return validator;
} //mail check funcion


function validarEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    document.getElementById("mail").style.color = sessionStorage.getItem('textColor');
    return true;
  } else {
    document.getElementById("mail").style.color = "red";
    return false;
  }
} //VALIDO LOS VARIOS CAMPOS Y DEVUELVO FALSE SI HAY POR LO MENOS UNO MAL


function validar() {
  var checkOk = true;
  if (!validarEmail(mail)) checkOk = false;
  if (!mensFieldsInput(nombre, false, "nombre")) checkOk = false;
  if (!mensFieldsInput(apellido, false, "apellido")) checkOk = false;
  if (!mensFieldsInput(celular, true, "celular")) checkOk = false;
  if (!mensFieldsInput(obrasocial, false, "obrasocial")) checkOk = false;
  if (!mensFieldsInput(modResp, false, "modalidadrespuesta")) checkOk = false;
  if (!mensFieldsInput(mens, false, "mensaje")) checkOk = false;
  return checkOk;
}

function nuevoMensajeClick(e) {
  //creo array desde SessionStorage
  var mensajes = JSON.parse(sessionStorage.getItem('SimularServMensajes'));
  console.log(mensajes); //ingreso y checkeo datos

  nombre = document.getElementById("nombre").value.toUpperCase();
  apellido = document.getElementById("apellido").value.toUpperCase();
  celular = document.getElementById("celular").value;
  mail = document.getElementById("mail").value.toUpperCase();
  obrasocial = document.getElementById("obrasocial").value.toUpperCase();
  modResp = document.getElementById("modalidadrespuesta").value.toUpperCase();
  consulta = document.querySelector('input[name=consulta]:checked').value.toUpperCase();
  mens = document.getElementById("mensaje").value.toUpperCase();
  leido = false; //FECHA RECEPCION MENSAJE

  var fecha = new Date();
  var dia = "".concat(fecha.getDate()).padStart(2, '0');
  var mes = "".concat(fecha.getMonth() + 1).padStart(2, '0');
  var anio = fecha.getFullYear();
  fecha = dia + '/' + mes + '/' + anio;
  var id = 0;

  if (mensajes.length > 0) {
    id = Math.max.apply(null, mensajes.map(function (men) {
      return men.id;
    })) + 1;
  }

  var checked = validar(); //VALIDO MENSAJES

  if (checked) {
    var mensajeAgregado = new nuevoMensaje(nombre, apellido, celular, mail, obrasocial, consulta, modResp, mens, leido, fecha, id);
    e.preventDefault(); //push a array de mensaje

    mensajes.push(mensajeAgregado); //simulo subida al servidor nuevo mensaje

    sessionStorage.setItem("SimularServMensajes", JSON.stringify(mensajes));
    Swal.fire({
      icon: 'success',
      title: 'Mensaje Enviado!',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    }).then(function (result) {
      result.isConfirmed && location.reload();
    });
  } else {
    e.preventDefault();
    Swal.fire("ATENCIÓN!", "Verificar campos erroneos!", 'error');
  }
}