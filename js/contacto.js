console.dir(document)

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
                leido,
                fecha,
                id)//true mensaje viejo (leido)
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
                    this.fecha=fecha
                    this.id=id
                }
    }
//submit de form
let miForm=document.getElementById("formContacto")
miForm.addEventListener ("submit", nuevoMensajeClick);
    


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
        //mail check funcion
        function validarEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        showModal(`MAIL INVALIDO!!!`,"OK","","ATENCIÓN!")
            return (false)
    } 

        function nuevoMensajeClick(e)
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
        let fecha=new Date()
        fecha=fecha.toLocaleDateString() 
        let id=0 

        if (mensajes.length>0){ id= Math.max.apply(null,mensajes.map(function(men) { return men.id; }))+1;}

        if(validarEmail(mail)&& mensFieldsInput(nombre,false)&&mensFieldsInput(apellido,false)&&mensFieldsInput(celular,true)&&mensFieldsInput(mail,false)&&mensFieldsInput(obrasocial,false)&&mensFieldsInput(modResp,false)&&mensFieldsInput(consulta,false)&&mensFieldsInput(mens,false)){
            const mensajeAgregado=new nuevoMensaje(nombre,apellido,celular,mail,obrasocial,consulta,modResp,mens,leido,fecha,id)
       
            
            //push a array de mensaje
            e.preventDefault()
            mensajes.push(mensajeAgregado)
            //simulo subida al servidor nuevo mensaje
            sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
            showModal(`MENSAJE ENVIADO!`,"OK","","ATENCIÓN!",()=>{location.reload();})

        
        }
        else {
            showModal(`Campos Insertados erroneos`,"OK","","ATENCIÓN!")
        }
        
        
    }
