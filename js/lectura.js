//JS FUNCIONES DE LECTURA




/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/





//creo array desde SessionStorage

let mensajes= JSON.parse(sessionStorage.getItem('SimularServMensajes'))


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

    (esLeido) ? texto=" viejo(s)." :texto=" nuevo(s)"
    
    if(nombre.length>0||apellido.length>0){texto=` de ${nombre} ${apellido}`}

    showModal(`Se mostraran  mensajes ${texto} para leer.`,"OK","","INFO",()=>{
        //filtro a array los mensajes que cumplen condicion (busqueda leido)
        
        if (typeof esLeido === 'boolean'){
            mensMonstrados=arrayIn.filter((mensajeALeer=>mensajeALeer.leido===esLeido))
        
        }else if (apellido.length>0)
            {        
                if(nombre.length>0)  mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.nombre.includes(nombre)&&mensajeALeer.apellido.includes(apellido))
                else {mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.apellido.includes(apellido))}
            }
        
            
        //leos los mens y confirmo que si tengo de este tipo
        if (mensMonstrados.length>0){
            noMessage=false
            messArtCreator(mensMonstrados)
        }   
            
        noMessage  && showModal(`Sin mostraran  mensajes ${texto} para leer.`,"OK","","INFO")
    
    })
} 


//borrado

function eraseOldFunc(){
    eraseMens(mensajes,true)
}

function deleteMens(i){
    let idUnic=document.getElementById(`idSlot${i}`).innerHTML
        
        showModal("Estas seguro de querer eliminar el mensaje?","SI","CANCELAR","ATENCION!!!",()=>{

            let realId=realIdF(idUnic).findIndex(array => array == idUnic);
            mensajes.splice(realId,1)
            document.getElementById(`readSlot${i}`).innerHTML="REMOVIDO"
            sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
            
        })

    
    }



//mapeo mensajes a id
function realIdF(id)
{
    let idArray= mensajes.map(function(men) { return men.id; })
    return idArray
}


//FUNCION ELIMINACION MENSAJES (parametro variales uso futuro)

function eraseMens(arrayIn,esLeido){ 


    let mensajesGuardados=[]
    let mensajesElim=[]
    //let noMessage=true //variable control (tengo o no mensaje del genero establecido)
    let texto
    
    
    //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE
    if (document.getElementById("articleCar"))
    {   let padre = document.getElementById("articleCar").parentNode;
		padre.removeChild(document.getElementById("articleCar"));

    }
  //
    
    
    if (esLeido) {texto=" viejo(s)."} 
        else if(!esLeido){texto=" nuevo(s)"} 
    //chequeo si hay mensajes

    mensajesElim=arrayIn.filter((mensajeAElim=>mensajeAElim.leido===esLeido))
    mensajesGuardados=arrayIn.filter((mensAGuard=>mensAGuard.leido!=esLeido))

    if (mensajesElim.length===0) {showModal(`Sin   mensajes ${texto} para eliminar.`,"OK","","INFO")}
    else {
            if (esLeido) {texto=" viejo(s)."} 
                else if(!esLeido){texto=" nuevo(s)"} 
    
                    showModal(`Se eliminaran mensajes ${texto} `,"OK","CANCELAR","INFO",()=>{
                    mensajes=mensajesGuardados
                    //subida
                    sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
                    showModal(`Mensajes mensajes ${texto} eliminados`,"OK","","INFO")
                    })
            
        }
    }       
