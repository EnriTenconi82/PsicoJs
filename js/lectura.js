//JS FUNCIONES DE LECTURA


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

    (esLeido) ? texto=" viejos" :texto=" nuevos"
    
    if(nombre.length>0||apellido.length>0){texto=` de ${nombre} ${apellido}`}

    Swal.fire( `Se mostraran  mensajes ${texto} para leer.`, '', 'info')


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
            messArtCreator(mensMonstrados) //CREACION CAROUSEL (carouselCreate.js)
        }   

        if (noMessage){
            Swal.fire( `Sin   mensajes ${texto} para leer.`, '', 'info')

            
        }

    


} 


//borrado

function deleteMens(i){
    let idUnic=document.getElementById(`idSlot${i}`).innerHTML
        
    if (( document.getElementById(`readSlot${i}`).innerHTML!="REMOVIDO")){
    Swal.fire({
        title: 'Do Estas seguro de querer eliminar el mensaje?',
        icon:'warning',
        showDenyButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonText: 'SI',
        denyButtonText: `CANCELAR`,
        }).then((result) => {
            if (result.isConfirmed) {
                let realId=realIdF(idUnic).findIndex(array => array == idUnic);
                mensajes.splice(realId,1)
                document.getElementById(`readSlot${i}`).innerHTML="REMOVIDO"
                sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
                Swal.fire('Mensaje eliminado!', '', 'success')
            } 
        
            })
            
    }else if  (( document.getElementById(`readSlot${i}`).innerHTML==="REMOVIDO")){
        Swal.fire(`El mensaje ha sido removido previamente`, '', 'error')
    }
}


//mapeo mensajes a id
function realIdF(id)
{
    let idArray= mensajes.map(function(men) { return men.id; })
    return idArray
}


function eraseOldFunc(){
    eraseMens(mensajes,true)
}


//FUNCION ELIMINACION MENSAJES (parametro variales uso futuro)

function eraseMens(arrayIn,esLeido){ 

    let mensajesGuardados=[]
    let mensajesElim=[]
    //let noMessage=true //variable control (tengo o no mensaje del genero establecido)
    let texto
    
    
    //ELIMINO ARTICLE DE MENSAJE MOSTRADOS SI EXISTE
    if (document.getElementById("articleCar"))
        {let padre = document.getElementById("articleCar").parentNode;
         padre.removeChild(document.getElementById("articleCar"));
        }
  //
    
    
    esLeido ? texto=" viejos" : texto =" nuevos" 

    //chequeo si hay mensajes

    mensajesElim=arrayIn.filter((mensajeAElim=>mensajeAElim.leido===esLeido))
    mensajesGuardados=arrayIn.filter((mensAGuard=>mensAGuard.leido!=esLeido))

    if (mensajesElim.length===0) { Swal.fire(`Sin   mensajes ${texto} para eliminar.`, '', 'info')}

    else {
        
                    
                        Swal.fire({
                            title: `Se eliminaran mensajes ${texto} `,
                            icon:'warning',
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: 'SI',
                            denyButtonText: `CANCELAR`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                mensajes=mensajesGuardados
                                //subida
                                sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
                                Swal.fire(`Mensajes ${texto} eliminados`, '', 'success')
                    
                                } 
                        })
                    
                    
            
        }
    }       
