// BUTTON STATUS 
const buttons_Status = document.querySelectorAll("[button-status]");
if (buttons_Status.length > 0) {

    let url = new URL(window.location.href);
    buttons_Status.forEach(item => {
        let active = url.searchParams.get("status");
        item.addEventListener("click", () => {
            const status = item.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
};

// FORM SEARCH 
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        const input = e.target.elements.keyword.value;
        if (input) {
            url.searchParams.set("keyword", input)
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

// PAGINATION
const buttons = document.querySelectorAll("[button-pagination]");
if (buttons) {
    let url = new URL(window.location.href);
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const pageChange = button.getAttribute("button-pagination");
            url.searchParams.set("page", pageChange);
            window.location.href = url.href;
        })

    })
}

// CHECKBOX MULTI 
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const checkAll = checkboxMulti.querySelector("input[name='checkall']");
    const checks = checkboxMulti.querySelectorAll("input[name='id']");
    checkAll.addEventListener("change", () => {
        if (checkAll.checked) {
            checks.forEach(item => {
                item.checked = true;
            })
        } else {
            checks.forEach(item => {
                item.checked = false;
            })
        }
    })
    checks.forEach(item =>{
        item.addEventListener("change",() => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            const countBox = checks.length;
            if(countChecked==countBox){
                checkAll.checked = true;
            }
            else{
                checkAll.checked = false;
            }
        })
    })
}

// FORM CHANGE MULTI 
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    const number= document.querySelectorAll("[checkbox-multi] input[name='position']");
    number.forEach(item=>{
        item.addEventListener("click", ()=>{
            item.closest("tr").querySelector("input[name='id']").checked = true
        })
    })
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const boxChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        if(boxChecked.length>0){
            const typeChange=  e.target.elements.type.value;
            let ids=[];
            boxChecked.forEach(item =>{
                const id = item.value;
                if(typeChange == "change-position"){
                    const position = item.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                   
                }
                else{
                    ids.push(id);
                }
               
            })        
            if(typeChange == "deleted"){
                const isConfirm = confirm("ban muon xoa ko?");
                if(!isConfirm){            
                    return;
                }
            }
            const inputData = formChangeMulti.querySelector("input[name='ids']");
            inputData.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else {
            alert("vui long chon it nhat 1 san pham")
        }
        



    })
}

// SHOW ALERT 
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time)
    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}


// PREVIEW UPLOAD
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const input = uploadImage.querySelector("[upload-image-input]");
    const preview = uploadImage.querySelector("[upload-image-preview]");
    const buttonNone = uploadImage.querySelector("button");
    input.addEventListener("change",(e)=>{
        const file =e.target.files[0];
        if(file){
            preview.src = URL.createObjectURL(file);
            buttonNone.classList.add("d-block");
            buttonNone.classList.remove("d-none");
        }
    })
    buttonNone.addEventListener("click",()=>{
        input.value =""
        preview.src =""
        buttonNone.classList.add("d-none");
        buttonNone.classList.remove("d-block");
    })
}


// SORT 
const sort = document.querySelector("[sort]")
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]")
    const sortButton = sort.querySelector("[sort-clear]")
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue] = e.target.value.split("-");

        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href = url.href
    })

    sortButton.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href
    })

    const sortKey =  url.searchParams.get("sortKey");
    const sortValue =  url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionTrue = sortSelect.querySelector(`option[value='${stringSort}']`);
        optionTrue.selected=true;
    }
}
