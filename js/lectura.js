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
  //
    if (esLeido) {texto=" viejo(s)."} 
        else if(!esLeido){texto=" nuevo(s)"} 
    
    if(nombre.length>0||apellido.length>0){texto=` de ${nombre} ${apellido}`}
    showModal(`Se mostraran  mensajes ${texto} para leer.`,"OK","","INFO",()=>{
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
            
        if (noMessage)  showModal(`Sin mostraran  mensajes ${texto} para leer.`,"OK","","INFO")
    
    })
} 
