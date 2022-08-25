
/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/



//array de objeto simulandos mensajes recibidos si la SessionStorage no esta creada.
let mensajes=[]

if (sessionStorage['SimularServMensajes']) {
    mensajes= JSON.parse(sessionStorage.getItem('SimularServMensajes'))
}

else if(!sessionStorage['SimularServMensajes']){
        //si no tengo ya unos datos creados de la sessios uso ese array de obj
    mensajes=[{"nombre":"Tito", 
            "apellido":"Titovich",
            "celular":"341234566",                
            "mail":"tito@hotmail.com",
            "obrasocial":"otro", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
            "consulta":"presencial",//(0:Virtual 1:Presencial)
            "modResp":"virtual", //(0:Mail 1:Whatsupp 2:Llamada)
            "mens":"hola quisiera comunicarme para un turno gracias.",
            "leido":true},//true mensaje viejo (leido)
            {"nombre":"Romina",
            "apellido":"Cabello",
            "celular":"341234566",                
            "mail":"ro_cabe@hotmail.com",
            "obrasocial":"galeno", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
            "consulta":"virtual",//(0:Virtual 1:Presencial)
            "modResp":"mail", //(0:Mail 1:Whatsupp 2:Llamada)
            "mens":"hola me llamo Romi quisiera comunicarme para un turno gracias.",
            "leido": false}]//true mensaje viejo (leido)
}

//fin creacion array mensajes

//funcion de lectura (//false=muestrame nuevos (no leidos) true =muestrame leidos)
function showMessages(arrayIn,esLeido){ 
    let texto=""
    let mensMonstrados=[]
    let noMessage=true //variable control (tengo o no mensaje del genero establecido)
    
    if (esLeido) {texto=" viejo(s)."} 
        else texto=" nuevo(s)" 
    
    alert('Se mostraran  mensajes '+ texto +' para leer.')
    
    //filtro a array los mensajes que cumplen condicion
    mensMonstrados=arrayIn.filter(function(mensajeALeer)
        {
        return mensajeALeer.leido===esLeido
        }
    )
    
    console.log(mensMonstrados) //console check!
        
    //leos los mens y confirmo que si tengo de este tipo
    if (mensMonstrados.length>0){
        noMessage=false

        mensMonstrados.forEach((elemento)=>{
            alert('Nombre: '+elemento.nombre +'\n'+ 
                'Apellido: '+elemento.apellido +'\n'+
                'Celular: '+elemento.celular +'\n'+
                'Mail: '+elemento.mail +'\n'+
                'Obra Social: '+elemento.obrasocial +'\n'+
                'Tipo Consulta: '+elemento.consulta +'\n'+
                'Modalidad Respuesta: '+elemento.modResp +'\n'+
                'Mensaje: '+elemento.mens +'.')      
        });
    }
        
    if (noMessage) alert('Sin mensajes '+ texto +' para leer') //si no tengo mensaje de este tipo aviso
 //   return idsNew;
} 
//funcion para leer  vienjos mensajes(boton)
function muestraMensViejos(){
    showMessages(mensajes,true); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}

//funcion para leer nuevos mensajes(boton)
function muestraMensNuevos(){
    let temp;
    let validator=false;
    
    showMessages(mensajes,false); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

    
    //marco como leidos los mensajes nuevos?
    mensajes.forEach((elemento,i)=>{
        if (elemento.leido==false){
            do{ //quiero marcar el mensaje como leido?
                temp=prompt("Marcar como leido el mensaje de"+ mensajes[i].nombre+" " + mensajes[i].apellido+ "? S / N "  );
                    if(temp=="S"||temp=="s") {validator=true}
                    else if(temp=="N"||temp=="n") {validator=true}
            }while(validator==false)
            //si marco si marco como leido
            if (temp=="S"||temp=="s") mensajes[i].leido=true;
            //subo a serv de modificaciones

            sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
                            
            }
    })

}


