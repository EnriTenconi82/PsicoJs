
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
    mensajes=[{"nombre":"TITO", 
            "apellido":"TITOVICH",
            "celular":"341234566",                
            "mail":"TITO@HOTMAIL.COM",
            "obrasocial":"OTRO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
            "consulta":"PRESENCIAL",//(0:Virtual 1:Presencial)
            "modResp":"VIRTUAL", //(0:Mail 1:Whatsupp 2:Llamada)
            "mens":"hola quisiera comunicarme para un turno gracias.",
            "leido":true},//true mensaje viejo (leido)
            {"nombre":"ROMINA",
            "apellido":"CABELLO",
            "celular":"341234566",                
            "mail":"ROOO_CABE@AOL.COM",
            "obrasocial":"GALENO", //(0:Otro 1:Galeno 2:Pami 3:OSDE)
            "consulta":"VIRTUAL",//(0:Virtual 1:Presencial)
            "modResp":"MAIL", //(0:Mail 1:Whatsupp 2:Llamada)
            "mens":"hola me llamo Romi quisiera comunicarme para un turno gracias.",
            "leido": false}]//true mensaje viejo (leido)
}

//fin creacion array mensajes

//funcion de lectura (//false=muestrame nuevos (no leidos) true =muestrame leidos)
function showMessages(arrayIn,esLeido,apellido,nombre){ 
    let texto=""
    let mensMonstrados=[]
    let noMessage=true //variable control (tengo o no mensaje del genero establecido)
    
    if (esLeido) {texto=" viejo(s)."} 
        else if(!esLeido){texto=" nuevo(s)"} 
    
    if(nombre.length>0||apellido.length>0){texto=` de ${nombre} ${apellido}`}
    alert(`Se mostraran  mensajes ${texto} para leer.`)
    
    //filtro a array los mensajes que cumplen condicion (busqueda leido)
    if (typeof esLeido === 'boolean'){
        mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.leido===esLeido)
    }else if (apellido.length>0)
    {        
        if(nombre.length>0)  mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.nombre===nombre&&mensajeALeer.apellido===apellido)
        else {mensMonstrados=arrayIn.filter(mensajeALeer=>mensajeALeer.apellido===apellido)}
    }
    
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

} 

//funcion apellido
function muestraMensApellido(){
    showMessages(mensajes,"","TITOVICH",""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)
}
//funcion apellido y nombres
function muestraMensApellidoNombre(){
    showMessages(mensajes,"","CABELLO","ROMINA"); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}
//funcion para leer  vienjs mensajes(boton)
function muestraMensViejos(){
    showMessages(mensajes,true,"",""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

}

//funcion para leer nuevos mensajes(boton)
function muestraMensNuevos(){
    let temp;
    let validator=false;
    
    showMessages(mensajes,false,"",""); //llamada a funcion de lectura (y tomo las posiciones en array de los no leidos)

    
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


 