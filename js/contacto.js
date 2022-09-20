console.dir(document)

/*archivos de mensaje campos tomados de pagina web
simulando mensajes intersatos en pagina
https://enritenconi82.github.io/PsicologosOnLineFinal/
*/


//creo array desde SessionStorage
let mensajes= JSON.parse(sessionStorage.getItem('SimularServMensajes'))

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
    if  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        
        else {
           return (false)
        }
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
            e.preventDefault()

            //push a array de mensaje
            mensajes.push(mensajeAgregado)
            //simulo subida al servidor nuevo mensaje
            sessionStorage.setItem("SimularServMensajes",JSON.stringify(mensajes)) 
        
            Swal.fire({
                icon:'success',
                title: 'Mensaje Enviado!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok',
                allowOutsideClick: false
            }).then((result) => {
                result.isConfirmed && location.reload()
                })

        }
        else {
            e.preventDefault()
            Swal.fire("ATENCIÓN!", "Campos insertados erroneos!", 'error')
        }
        
        
    }
