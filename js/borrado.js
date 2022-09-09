

function eraseOld(){
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
