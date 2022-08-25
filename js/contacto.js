

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


//declaro plantilla mensaje

class nuevoMensaje{
    constructor(nombre,
                apellido,
                celular,                
                mail,
                obrasocial, //(0:Otro 1:Galeno 2:Pami 3:OSDE)
                consulta,//(0:Virtual 1:Presencial)
                modResp, //(0:Mail 1:Whatsupp 2:Llamada)
                mens,
                leido)//true mensaje viejo (leido)
                {
                    this.nombre=nombre
                    this.apellido=apellido
                    this.celular=celular
                    this.mail=mail
                    this.obrasocial=obrasocial
                    this.consulta=consulta
                    this.modResp=modResp
                    this.mens=mens
                    this.leido=leido
                }
    }


//control valor numerico u texto de prompt
/* segun si el valor ingresado es como corresponde  (texto o numero) deja seguir el prompt o no
en futura pagina web se requeriran todos los datos y valores de obra social 0 1 2 etc ya veran desde la pagina
*/ 
function mensFieldsInput(dato,esnumero )//insertar valor (true=number,false=texto)
    {
        let validator=false
        
            if(dato.length>0&&isNaN(dato)&&esnumero==false) {validator=true}
                else if(dato.length>0&&!isNaN(dato)&&esnumero==true) {validator=true}
            
            return validator;
    }
//funcion para creacion de nuevos mensajes (boton)
        
        function nuevoMensajeClick()
        {
            //ingreso y checkeo datos
        nombre=document.getElementById("nombre").value.toUpperCase()
        apellido=document.getElementById("apellido").value.toUpperCase()
        celular=document.getElementById("celular").value
        mail=document.getElementById("mail").value.toUpperCase()
        obrasocial=document.getElementById("obrasocial").value.toUpperCase()
        modResp=document.getElementById("modalidadrespuesta").value.toUpperCase()
        consulta=document.querySelector('input[name=consulta]:checked').value.toUpperCase()
            mens=document.getElementById("mensaje").value.toUpperCase()
        leido=false;
        if(mensFieldsInput(nombre,false)&&mensFieldsInput(apellido,false)&&mensFieldsInput(celular,true)&&mensFieldsInput(mail,false)&&mensFieldsInput(obrasocial,false)&&mensFieldsInput(modResp,false)&&mensFieldsInput(consulta,false)&&mensFieldsInput(mens,false)){
    
            const mensajeAgregado=new nuevoMensaje(nombre,apellido,celular,mail,obrasocial,consulta,modResp,mens,leido)
            console.log(mensajeAgregado) //check en consola ok ingreso
            console.log(mensajes)

            //push a array de mensaje
            mensajes.push(mensajeAgregado)
        //check
            console.log(mensajes.length)
            console.log(mensajes[0])
            console.log(mensajes[1])
            console.log(mensajes[2])
        }
        else {alert("Campos Insertados erroneos")}
        
        //simulo subida al servidor nuevo mensaje
        sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
        
    }
