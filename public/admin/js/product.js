// CHANGE STATUS
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    let dataPath = formChangeStatus.getAttribute("data-path");
    // console.log(formChangeStatus);
    buttonChangeStatus.forEach(item=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            let status = item.getAttribute("data-status");   
                   
            if(status=="active"){
                status="inactive";
              
            }
            else {
                status="active";         
            }
             const action = dataPath + `/${status}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();

        })
    })
}

const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete){
    const formDelete = document.querySelector("#form-delete-item");
    if(formDelete){
        const path = formDelete.getAttribute("data-path");
        buttonsDelete.forEach(button=>{
            button.addEventListener("click",()=>{
                
                const isConfirm = confirm("ban chac chan xoa khong?");
                if(isConfirm){
                    id = button.getAttribute("data-id");
                    const action = path +`/${id}?_method=DELETE`;
                    formDelete.action = action
                    console.log(action);
                    formDelete.submit()

                }
            })
        })
    }
    
}





