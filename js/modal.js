//creacion modal bts 

let showModal=(modalBody,yesLabel,noLabel,modalTitle,callback)=>{

    if (document.getElementById("miModal"))//elimino modal si existe
    {   let padre = document.getElementById("miModal").parentNode;
		padre.removeChild(document.getElementById("miModal"));
    }


    let modalNew= document.createElement("div")
    modalNew.innerHTML=`
    <div class="modal fade" id="miModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content articleBg">
                        <div class="modal-header cardBg">
                            <h5 class="modal-title">${modalTitle}</h5>
                        </div>
            <div class="cardBg modal-body">
                ${modalBody}
            </div>
            <div class="cardBg modal-footer">
                <button type="button" class="modal-success-btn modalBtnStyle" data-bs-dismiss="modal">${yesLabel}</button>
                <button type="button" id="btnNo" class="modalBtnStyle" data-bs-dismiss="modal">${noLabel}</button>
            </div>
        </div>
    </div>
`

    modalNew.querySelector('.modal-success-btn').onclick = callback
    document.body.appendChild(modalNew)
    let modal=new bootstrap.Modal(document.getElementById("miModal"))
    if (noLabel==""){
        let btnNo=document.getElementById("btnNo")
        btnNo.style.display= "none"
    }

    modal.show()
}