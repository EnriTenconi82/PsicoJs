//js de creacion de botones al ingresar a zona privada 

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


//definicion eventos de botones ya visibles
let privateForm=document.getElementById("privateForm")
privateForm.addEventListener("submit",privateZone)




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
        //real id corresponde a index del menaje con el id de pantalla

        //abro modal USO FUTURO MODAL CONFIRMACION DE OPERACION
        //let modal=document.getElementById("staticBackdrop")
        //modal.style.show=true
        //
        //var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'),"" )
       // myModal.show();
       // alert(myModal)
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