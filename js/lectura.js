
/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/

//const { functionsIn } = require("lodash")


//user y password de zona privada
const user="nemuadmin"
const password="nemuuser"

//array de objeto simulandos mensajes recibidos si la SessionStorage no esta creada.
let mensajes=[]

if (sessionStorage['SimularServMensajes']) {
    mensajes= JSON.parse(sessionStorage.getItem('SimularServMensajes'))
}

else if(!sessionStorage['SimularServMensajes']){
    //si no tengo ya unos datos creados de la sessios uso ese array de obj
mensajes=[{"nombre":"TITO", 
        "apellido":"TITOVICH",
        "celular":"341234566",                
        "mail":"TITO@HOTMAIL.COM",
        "obrasocial":"OTRO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
        "consulta":"PRESENCIAL",//(0:Virtual 1:Presencial)
        "modResp":"VIRTUAL", //(0:Mail 1:Whatsupp 2:Llamada)
        "mens":"hola quisiera comunicarme para un turno gracias.",
        "leido":false,//true mensaje viejo (leido)
        "fecha":"31/08/2022",
        "id":6},
        {"nombre":"ROMINA",
        "apellido":"CABELLO",
        "celular":"341234566",                
        "mail":"ROOO_CABE@AOL.COM",
        "obrasocial":"GALENO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
        "consulta":"VIRTUAL",//(0:Virtual 1:Presencial)
        "modResp":"MAIL", //(0:Mail 1:Whatsupp 2:Llamada)
        "mens":"hola me llamo Romi quisiera comunicarme para un turno gracias.",
        "leido": true,//true mensaje viejo (leido),
        "fecha":"31/08/2022",
        "id":4},
        {"nombre":"TANO",
        "apellido":"ORTIZ",
        "celular":"341234566",                
        "mail":"TANO@AOL.COM",
        "obrasocial":"GALENO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
        "consulta":"VIRTUAL",//(0:Virtual 1:Presencial)
        "modResp":"MAIL", //(0:Mail 1:Whatsupp 2:Llamada)
        "mens":"hola me llamo Romi quisiera comunicarme para un turno gracias.",
        "leido": false,//true mensaje viejo (leido),
        "fecha":"31/08/2022",
        "id":2},
        {"nombre":"ROBERTO",
        "apellido":"DIEGUEZ",
        "celular":"34123226",                
        "mail":"TANO@AOL.COM",
        "obrasocial":"GALENO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
        "consulta":"VIRTUAL",//(0:Virtual 1:Presencial)
        "modResp":"MAIL", //(0:Mail 1:Whatsupp 2:Llamada)
        "mens":"hola me llamo Romi quisiera comunicarme para un turno gracias.",
        "leido": true,//true mensaje viejo (leido),
        "fecha":"01/09/2022",
        "id":3}
    ]
}

//fin creacion array mensajes

//definicion eventos de botones ya visibles
let privateForm=document.getElementById("privateForm")
privateForm.addEventListener("submit",privateZone)


//funcion de lectura (//false=muestrame nuevos (no leidos) true =muestrame leidos)
function showMessages(arrayIn,esLeido,apellido,nombre){ 

    let texto=""
    let mensMonstrados=[]
    let noMessage=true //variable control (tengo o no mensaje del genero establecido)
    
    //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE
    if (document.getElementById("articleCar"))
    {   let padre = document.getElementById("articleCar").parentNode;
		padre.removeChild(document.getElementById("articleCar"));

    }
  //
    if (esLeido) {texto=" viejo(s)."} 
        else if(!esLeido){texto=" nuevo(s)"} 
    
    if(nombre.length>0||apellido.length>0){texto=` de ${nombre} ${apellido}`}
    alert(`Se mostraran  mensajes ${texto} para leer.`)
    
    //filtro a array los mensajes que cumplen condicion (busqueda leido)
    if (typeof esLeido === 'boolean'){
        mensMonstrados=arrayIn.filter((mensajeALeer=>mensajeALeer.leido===esLeido))
        console.log(mensMonstrados)
    }else if (apellido.length>0)
        {        
            if(nombre.length>0)  mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.nombre.includes(nombre)&&mensajeALeer.apellido.includes(apellido))
            else {mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.apellido.includes(apellido))}
        }
    
    console.log(mensMonstrados) //console check!
        
    //leos los mens y confirmo que si tengo de este tipo
    if (mensMonstrados.length>0){
        noMessage=false
        messArtCreator(mensMonstrados)
    }   
        
    if (noMessage) alert('Sin mensajes '+ texto +' para leer') //si no tengo mensaje de este tipo aviso

} 

//funcion BOTON BUSQUEDA POR APELLIDO (Y NOMBRE)

function muestraMensApellidoNombre(){
    let apellidoIn=document.getElementById("apellido").value.toUpperCase()
    apellidoIn=apellidoIn.toUpperCase()
    
    let nombreIn=document.getElementById("nombre").value.toUpperCase()
    if (nombreIn.length>0) nombreIn=nombreIn.toUpperCase()
    if (apellidoIn.length>0)
    showMessages(mensajes,"",apellidoIn,nombreIn); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}
//funcion BOTON LECTURA MENSAJES VIEJOS
function muestraMensViejos(){
    
    showMessages(mensajes,true,"",""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}

//funcion BOTON LECTURA MENSAJES NUEVOS
function muestraMensNuevos(){
    let temp;
    let validator=false;
    
    showMessages(mensajes,false,"",""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}

//funcion BOTON INGRESO A CHECK ZONA PRIVADA

function privateZone(e){
    e.preventDefault
    let inpUser=document.getElementById("user").value
    let inpPass=document.getElementById("passw").value

    if (inpUser.length>0 && inpPass.length>0)
        {if (inpUser===user && inpPass===password ){
            divCreator()

        }
        else alert("Combinacion user password errada")
    }
}

//funcion CREADORA DIV DE BOTONERA DE LECTURA

function divCreator(){
    //modifico mi div donde se encuentra el login  creando ahi mismo la botonera
    let logDiv=document.getElementById("logging")
    logDiv.innerHTML=`        <form onsubmit="return false">
    <fieldset class="cardBg ownCard mb-4 text-start">
        <legend>Busqueda por Apellido y Nombre</legend>
            <div class="row justify-content-start g-4">
                
                <div class="col-sm-6">
                    <div class="formBlock">
                        <label for="apellido">Apellido</label>
                        <input type="text" id="apellido" placeholder="Apellido" required>
                    </div>
                </div>
                
                <div class="col-sm-6">
                    <div class="formBlock">
                        <label for="nombre">Nombre</label >
                        <input type="text" id="nombre"    placeholder="Nombre">
                    </div>
                </div>

                
            
                <div class="col-sm-6">
                    <div class="formBlock">
                        <button class="item-button" id="findSurname">Buscar</button>
                    </div>  
                </div>
        </fieldset>    
    </form>
    
    <form onsubmit="return false">
        <button class="item-button" id="findNew">Mensaje(s) Nuevo(s) </button>
    
        <button class="item-button" id="findOld">Mensaje(s) Archivado(s)</button>
    </form>

</article>`
//botones creados defino funciones
    let findSurname=document.getElementById("findSurname")
    let findNew=document.getElementById("findNew")
    let findOld=document.getElementById("findOld")
    findNew.addEventListener("click", muestraMensNuevos)
    findSurname.addEventListener("click",muestraMensApellidoNombre)
    findOld.addEventListener("click",muestraMensViejos)

}

//funcion DE CRECION HTML (IMPRESION MENSAJES EN PANTALLAS)    
function messArtCreator(printMess){
    
    let messArti=document.createElement("article")
    let nodeMain=document.getElementById("main")
    messArti.className="articleBg container-md pt-4 py-4  mb-4 px-0 px-sm-4"
    messArti.id="articleCar"
    nodeMain.appendChild(messArti)

    let formCarr= document.createElement("form")
    let nodeD=document.getElementById("articleCar")
    formCarr.id="mensForm"
    formCarr.innerHTML=`<h3>Mensaje(s)</h3>  
                        <div id="myCarousel" class="carousel">

                            <div class="carousel-indicators" id="carrInd">
                            </div>

                            <div class="carousel-inner" id="carrInn"> 
                            </div>

                            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            
                            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            
                        </div>`
        //creo hijos directos del form
    nodeD.appendChild(formCarr)
     //he creado form como hido de nodo nodeD
     //tomo nodos para ciclos y creacion indicadores y slides
    let nodeCarrInd=document.getElementById("carrInd")
    let nodeCarrInn=document.getElementById("carrInn")
    
    printMess.forEach((elemento,i)=>{
    
        if (i==0){
            let printStatus="leido"

            if (elemento.leido==false) {printStatus="nuevo"}

            nodeCarrInd.innerHTML=`<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${i}" class="active" aria-current="true"></button>`
    //        CarrInnDiv.class="item active"
        
            nodeCarrInn.innerHTML=
            `<div class="carousel-item active">
            <section class="cardBg ownCard mb-4 text-start">
            <div class="row justify-content-start g-4">
                    <div class="col-sm-12">
                        <div class="formBlock justify-content-around">
                            <p>Mensaje: ${i+1} de ${printMess.length}. </p>
                            <p class="privPar"><span  class="fst-italic fw-bolder">Fecha: </span>${elemento.fecha}</p>
                            <p class="privPar"onclick="statusChange(${i})">Estado: <span class="readSlotC" id="readSlot${i}">${printStatus}</span></p>
                            <p> Id: <span id="idSlot${i}">${elemento.id}</span></p>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Apellido: </p>
                            <p>${elemento.apellido}</p>
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Nombre: </p>
                            <p>${elemento.nombre}</p>
                        
                        </div>
                    </div>
                
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Celular: </p>
                            <p>${elemento.celular}</p>
                        
                        </div>  
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mail: </p>
                            <p>${elemento.mail}</p>
                        
                        </div>
                    </div>
        
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Obra Social: </p>
                            <p>${elemento.obrasocial}</p>
                        
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Tipo consulta: </p>
                            <p>${elemento.consulta}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Modalidad respuesta: </p>
                            <p>${elemento.modResp}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mensaje: </p>
                            <p>${elemento.mens}</p>
                        
                        </div>
                    </div>
                
                </div>
    
        </section>
        </div>`
}      
        else {
            let printStatus="leido"
            if (elemento.leido==false) {printStatus="nuevo"}
            nodeCarrInd.innerHTML=nodeCarrInd.innerHTML+`<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${i}" aria-current="true"></button>`
            nodeCarrInn.innerHTML=nodeCarrInn.innerHTML+`<div class="carousel-item">
            <section class="cardBg ownCard mb-4 text-start">
            <div class="row justify-content-start g-4">
                    <div class="col-sm-12">
                        <div class="formBlock justify-content-around">
                            <p>Mensaje: ${i+1} de ${printMess.length}. </p>
                            <p class="privPar"><span  class="fst-italic fw-bolder">Fecha: </span>${elemento.fecha}</p>
                            <p class="privPar" onclick="statusChange(${i})">Estado: <span class="readSlotC" id="readSlot${i}">${printStatus}</span></p>
                            <p> Id: <span id="idSlot${i}">${elemento.id}</span></p>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Apellido: </p>
                            <p>${elemento.apellido}</p>
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Nombre: </p>
                            <p>${elemento.nombre}</p>
                        
                        </div>
                    </div>
                
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Celular: </p>
                            <p>${elemento.celular}</p>
                        
                        </div>  
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mail: </p>
                            <p>${elemento.mail}</p>
                        
                        </div>
                    </div>
        
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Obra Social: </p>
                            <p>${elemento.obrasocial}</p>
                        
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Tipo consulta: </p>
                            <p>${elemento.consulta}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Modalidad respuesta: </p>
                            <p>${elemento.modResp}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mensaje: </p>
                            <p>${elemento.mens}</p>
                        
                        </div>
                    </div>
                
                </div>
    
        </section>
        </div>`
        }   
        
    })
}

//FUNCION BOTON CAMBIO DE ESTADO NUEVO--->LEIDO 
//LLAMADA DESDE HTML CREADO->            nodeCarrInn.innerHTML

function statusChange(i)
{
    let statusChange=document.getElementById(`readSlot${i}`).innerText
    let idChange=document.getElementById(`idSlot${i}`).innerHTML
    if (statusChange=="nuevo") {
        //real id corresponde a index del menaje con el id de pantalla
        let realId=realIdF(idChange).findIndex(array => array == idChange);
    
        mensajes[realId].leido=true
        document.getElementById(`readSlot${i}`).innerHTML="leido"
        sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 

    }
}
//mapeo mensajes a id
function realIdF(id)
{
    let idArray= mensajes.map(function(men) { return men.id; })
    return idArray
}