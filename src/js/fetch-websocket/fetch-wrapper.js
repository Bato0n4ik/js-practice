let table = document.getElementById("table-body");
const url = "/users";
let formData = document.querySelector("[data-id='multipart-form-data-id']");

let userData = null;
let avatar = null;

const createBtn = document.querySelector("[value='registration']");

fetch("users-table").then(response => response.text())
    .then(textHtml => {
        document.body.insertAdjacentHTML('beforeend', textHtml);
    });

formData.addEventListener("submit", async (e) =>{
    const response = await fetch(`${url}`, {
        method: "POST",
        body: new FormData(formData)
    });

    if(response.ok){
        await getUserData();
        await getAvatar();
        if(userData.id){
            updateRow(userData, avatar)
        }
        else{
            createRow(userData, avatar);
        }
    }
});

async function getAvatar(){
    const response = await fetch("/users/avatar", {
        method: "GET"
    });

    if(response.ok){
        avatar = await response.blob();
    }
}

async function getUserData(){
    const response = await fetch("/users/data", {
        method: "GET"
    });

    if(response.ok){
        userData = await response.json();
    }
}

function createRow(dataObject, avatar){
     let row = document.createElement("div");
     row.className = "table-row";
     row.setAttribute("id", dataObject.id);

     let ageDiv = document.createElement("div");
     let nameDiv = document.createElement("div");
     let avatarDiv = document.createElement("div");
     let img = document.createElement('img');

     ageDiv.setAttribute("data-name", "age");
     nameDiv.setAttribute("data-name", "name");
     avatarDiv.setAttribute("data-name", "img");

     ageDiv.textContent = dataObject.age;
     nameDiv.textContent = dataObject.name;
     img.src = URL.createObjectURL(avatar);

     avatarDiv.appendChild(img);

     row.appendChild(ageDiv);
     row.appendChild(nameDiv);
     row.appendChild(avatarDiv);

     table.appendChild(row);
}


function updateRow(data) {
    let row = document.getElementById(data.id);

    for(let field of row.children){
        let attr;
        if((attr = field.getAttribute("data-name")) === "img"){
            field.children[0].src = avatar;
            continue;
        }
        field.textContent = data[attr];
    }
}


function deleteRow(id) {
    let row = document.getElementById(id);
    row.remove();
}


