//JS FUNCIONES DE LECTURA



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
