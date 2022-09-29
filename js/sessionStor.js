
//carga datos desde .json

async function getJson() {
    const response = await fetch("../data/mess.json")
	const dato = await response.json();
    !sessionStorage['SimularServMensajes'] && sessionStorage.setItem('SimularServMensajes',JSON.stringify(dato))
    //si ya he estado trabajando en la pagina mantengo los cambio del almacenamiento de Session
}

getJson() // tomo valor de archivo js y guardo en storage para trabajar si recien entre a la app


//creo item en sessionStorage que contendra token de session

!sessionStorage['logued'] && sessionStorage.setItem('logued',``)





