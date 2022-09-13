// si el token (logued) es igual al token del usuario registrado muestro privado
//usuario y matriz creado en sessionStor.js (simulacion servidor)

if (JSON.parse(sessionStorage.getItem("SimularServUser")).adToken===sessionStorage.getItem("logued"))
{
   divCreator()    //SI ESTOY LOGUEADO CREO BOTONERA PRIVADA
}

//user y password de zona privada
let user=JSON.parse(sessionStorage.getItem("SimularServUser")).user
let password=JSON.parse(sessionStorage.getItem("SimularServUser")).pass



//funcion BOTON INGRESO A CHECK ZONA PRIVADA

function privateZone(e){
    e.preventDefault
    let inpUser=document.getElementById("user").value
    let inpPass=document.getElementById("passw").value

    if (inpUser.length>0 && inpPass.length>0)
        {if (inpUser===user && inpPass===password ){
            let logToken=JSON.parse(sessionStorage.getItem("SimularServUser")).adToken
            sessionStorage.setItem('logued',logToken) //guardo token a usuario correspondiente en mi memoria
            divCreator()   
        }
        else alert("Combinacion user password errada")
    }
}


///definicion eventos de botones ya visibles u creado
if (document.getElementById("privateForm")){
let privateForm=document.getElementById("privateForm")
privateForm.addEventListener("submit",privateZone)
}


//funcion salida de zona privada
function exit(){
    showModal("Estas seguro de deslogearte?","SI","CANCELAR","ATENCION!!!",()=>{
                 sessionStorage.setItem('logued',"") //elimino token
                 location.reload() //reinicio pagina
            }
    )

}



//funcion CREADORA DIV DE BOTONERA DE LECTURA

function divCreator(){
    //modifico mi div donde se encuentra el login  creando ahi mismo la botonera
    let logDiv=document.getElementById("logging")
    logDiv.innerHTML=`<form onsubmit="return false">
    <p class="logout" id="exit">X</p>
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
    
    <form onsubmit="return false" class="d-flex flex-wrap justify-content-between">
        <div class="col-sm-6">
            <button class="item-button" id="findNew">Mensaje(s) Nuevo(s) </button>
    
            <button class="item-button" id="findOld">Mensaje(s) Leido(s)</button>
        </div>
        
        <button class="eraseButton" id="eraseOld">Eliminar Leido(s)</button>
        
        </form>`

//botones creados defino funcionalidades
    let findSurname=document.getElementById("findSurname")
    let findNew=document.getElementById("findNew")
    let findOld=document.getElementById("findOld")
    let eraseOldB=document.getElementById("eraseOld")
    let exitB=document.getElementById("exit")
    findNew.addEventListener("click", muestraMensNuevos)
    findSurname.addEventListener("click",muestraMensApellidoNombre)
    findOld.addEventListener("click",muestraMensViejos)
    eraseOldB.addEventListener("click",eraseOld)
    exitB.addEventListener("click",exit)
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

//FUNCION BOTON CAMBIO DE ESTADO NUEVO--->LEIDO 
//LLAMADA DESDE HTML CREADO->            nodeCarrInn.innerHTML (carouselCreate.js)

function statusChange(i)
{
    let statusChange=document.getElementById(`readSlot${i}`).innerText
    let idChange=document.getElementById(`idSlot${i}`).innerHTML
    if (statusChange=="nuevo") {
        //real id corresponde a index del menaje con. el id de pantalla
         //si en modal confirmo cambio estado a leido (modal.js)
        
        showModal("Estas seguro marcar el mensaje como leido?","SI","CANCELAR","ATENCION!!!",()=>{

            let realId=realIdF(idChange).findIndex(array => array == idChange);
            mensajes[realId].leido=true
            document.getElementById(`readSlot${i}`).innerHTML="leido"
            sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
            
        })

    
    }
}



