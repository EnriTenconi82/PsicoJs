//JS conteniente crecion de article de zona privada y botonoera
let mensajes=[]

// si el token (logued) es igual al token del usuario registrado muestro privado
//usuario y matriz creado en sessionStor.js (simulacion servidor)
sessionStorage['SimularServUser']&& JSON.parse(sessionStorage.getItem("SimularServUser")).adToken===sessionStorage.getItem("logued") && divCreator()    //SI ESTOY LOGUEADO CREO BOTONERA PRIVADA




//funcior para tomar datos de usurario admin desde json
function getuser() {
    
    fetch('../data/user.json')
    .then(response => response.json())
    .then(usPass => {sessionStorage.setItem('SimularServUser',JSON.stringify(usPass))
    sessionStorage.setItem('SimularServUser',JSON.stringify(usPass))
    privateZone()}  //funcion check usurario
    );
}






//deslogueo por inactividad

//funcion BOTON INGRESO A CHECK ZONA PRIVADA

function privateZone(){
    let inpUser=document.getElementById("user").value
    let inpPass=document.getElementById("passw").value

    //user y password de zona privada
    let user=JSON.parse(sessionStorage.getItem("SimularServUser")).user
    let password=JSON.parse(sessionStorage.getItem("SimularServUser")).pass



    if (inpUser.length>0 && inpPass.length>0)
        {if (inpUser===user && inpPass===password ){
            let logToken=JSON.parse(sessionStorage.getItem("SimularServUser")).adToken
            sessionStorage.setItem('logued',logToken) //guardo token a usuario correspondiente en mi memoria
            divCreator()   //creo div de zona privada    
        
        }
        else Swal.fire(`Combinación User Password incorrecta`, '', 'info')
    }
}


///definicion eventos de botones ya visibles u creado
if (document.getElementById("privateForm")){
let privateForm=document.getElementById("privateForm")
privateForm.addEventListener("submit",getuser)
}


//funcion salida de zona privada
function exit(){

    Swal.fire({
        title: 'Estas seguro de deslogearte?',
        showDenyButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        icon:'warning',
        confirmButtonText: 'SI',
        denyButtonText: `CANCELAR`,
        }).then((result) => {
        if (result.isConfirmed) {
            removeUserToken()
            } 
    })

}



//funcion CREADORA DIV DE BOTONERA DE LECTURA

function divCreator(){
    //creo array desde SessionStorage
    mensajes= JSON.parse(sessionStorage.getItem('SimularServMensajes'))

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

//a los botones creados defino funcionalidades
    let findSurname=document.getElementById("findSurname")
    let findNew=document.getElementById("findNew")
    let findOld=document.getElementById("findOld")
    let eraseOldB=document.getElementById("eraseOld")
    let exitB=document.getElementById("exit")
    findNew.addEventListener("click", muestraMensNuevos)
    findSurname.addEventListener("click",muestraMensApellidoNombre)
    findOld.addEventListener("click",muestraMensViejos)
    eraseOldB.addEventListener("click",eraseOldFunc)
    exitB.addEventListener("click",exit)
}

//funcion BOTON BUSQUEDA POR APELLIDO (Y NOMBRE)

function muestraMensApellidoNombre(){
    let apellidoIn=document.getElementById("apellido").value.toUpperCase()
    apellidoIn=apellidoIn.toUpperCase()
    
    let nombreIn=document.getElementById("nombre").value.toUpperCase()
    
    
    nombreIn.length>0 && nombreIn.toUpperCase()
    
    apellidoIn.length>0 && showMessages(mensajes,"",apellidoIn,nombreIn); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}

//funcion BOTON LECTURA MENSAJES VIEJOS ()
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

        Swal.fire({
            title: 'Estas seguro marcar el mensaje como leido',
            icon:'question',
            showDenyButton: true,
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonText: 'SI',
            denyButtonText: `CANCELAR`,
            }).then((result) => {
            if (result.isConfirmed) {
                let realId=realIdF(idChange).findIndex(array => array == idChange);
                mensajes[realId].leido=true
                document.getElementById(`readSlot${i}`).innerHTML="leido"
                sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
            } 
        }) 
    
    }
}



