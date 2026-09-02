let form = document.getElementById("form-data");

form.addEventListener("submit", e =>{

    e.preventDefault();
    let formData = new FormData(form);
    let resp = new XMLHttpRequest();

    resp.addEventListener("load", ()=>{
        if(resp.status >=200 && resp.status < 400){
            let p = document.createElement("p");
            document.body.appendChild(p);
            p.textContent = resp.responseText;
        }
    });

    resp.open("POST", "/user");
    resp.send(formData);
});

