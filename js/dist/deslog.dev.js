"use strict";

//deslogeo de app por inactividad
var timer,
    currSeconds = 0;

function resetTimer() {
  /* detengo timer */
  clearInterval(timer);
  /* resect de segundos*/

  currSeconds = 0;
  /* seteo nuevo timer */

  timer = setInterval(startIdleTimer, 1000);
} // definicion eventos que resectan timer inactividad


window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function startIdleTimer() {
  /* AUMENTO SEGUNDOS */
  currSeconds++; // al minuto deslogueo x inactividad

  if (currSeconds === 60 && sessionStorage['SimularServUser'] && JSON.parse(sessionStorage.getItem("SimularServUser")).adToken === sessionStorage.getItem("logued")) {
    Swal.fire("Deslogueo por inactividad", '', 'info').then(function () {
      removeUserToken();
    });
  }
}

function removeUserToken() //funcion para eliminar datos de logueo activos
{
  sessionStorage.removeItem('logued', ""); //elimino token

  sessionStorage.removeItem('SimularServUser', ""); //eliminos datos user de sessionStorage

  location.reload();
}