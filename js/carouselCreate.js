//JS CREACION CAROUSEL

//funcion DE CRECION HTML (IMPRESION MENSAJES EN PANTALLAS)    
function messArtCreator(printMess){
    
    let messArti=document.createElement("article")
    let nodeMain=document.getElementById("main")
    messArti.className="articleBg container-md pt-4 py-4  mb-4 px-0 px-sm-4"
    messArti.id="articleCar"
    nodeMain.appendChild(messArti)

    let formCarr= document.createElement("form")
    let nodeD=document.getElementById("articleCar")
    formCarr.id="mensForm"
    let h3=document.createElement("h3")
    h3.innerText="Mensaje(s)"
    formCarr.innerHTML=`<h3>Mensaje(s)</h3>  
                        <div id="myCarousel" data-bs-interval="false" class="carousel">

                            <div class="carousel-indicators" id="carrInd">
                            </div>

                            <div class="carousel-inner" id="carrInn"> 
                            </div>

                            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            
                            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                            
                        </div>`
        //creo hijos directos del form
    nodeD.appendChild(formCarr)
     //he creado form como hido de nodo nodeD
     //tomo nodos para ciclos y creacion indicadores y slides
    let nodeCarrInd=document.getElementById("carrInd")
    let nodeCarrInn=document.getElementById("carrInn")
    

    
    
    printMess.forEach((elemento,i)=>{
        let printStatus="leido"
    
        if (elemento.leido==false) {printStatus="nuevo"}
        
        let innButt=document.createElement("button")
        let itemDiv=document.createElement("div")
        innButt.setAttribute("type","button")
        innButt.setAttribute("data-bs-target","#myCarousel")
        innButt.setAttribute("data-bs-slide-to",`${i}`)
        innButt.setAttribute("aria-current","true")
        if (i==0){
            innButt.setAttribute("class","active")
            itemDiv.setAttribute("class","carousel-item active")
            }
            else{
                itemDiv.setAttribute("class","carousel-item")
            }

        
        itemDiv.innerHTML=
        `<section class="cardBg ownCard mb-4 text-start">
                <div class="row justify-content-start g-4">
                    <div class="col-sm-12">
                        <div class="formBlock justify-content-around">
                            <p>Mensaje: ${i+1} de ${printMess.length}. </p>
                            <p class="privPar"><span  class="fst-italic fw-bolder">Fecha: </span>${elemento.fecha}</p>
                            <p class="privPar"onclick="statusChange(${i})">Estado: <span class="carrSpan" id="readSlot${i}">${printStatus}</span></p>
                            <p class="deleteCarBTN" id="deleteCarrBTNId${i}" onclick="deleteMens(${i})"> Acción: <span class="carrSpan">ELIMINAR</span></p>
                            <p> Id: <span id="idSlot${i}">${elemento.id}</span></p>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Apellido: </p>
                            <p>${elemento.apellido}</p>
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Nombre: </p>
                            <p>${elemento.nombre}</p>
                        
                        </div>
                    </div>
                
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Celular: </p>
                            <p>${elemento.celular}</p>
                        
                        </div>  
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mail: </p>
                            <p>${elemento.mail}</p>
                        
                        </div>
                    </div>
        
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Obra Social: </p>
                            <p>${elemento.obrasocial}</p>
                        
                        </div>
                    </div>
    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Tipo consulta: </p>
                            <p>${elemento.consulta}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Modalidad respuesta: </p>
                            <p>${elemento.modResp}</p>
                        
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="formBlock">
                            <p>Mensaje: </p>
                            <p>${elemento.mens}</p>
                        
                        </div>
                    </div>
                
                </div>
    
        </section>`
        nodeCarrInd.appendChild(innButt)
        nodeCarrInn.appendChild(itemDiv)
})

}


