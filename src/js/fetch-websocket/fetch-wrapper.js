
let id = 0;
let table = document.getElementById("table-body");
const url = "/users";
let formData = document.querySelector("[data-id='multipart-form-data-id']");

const createBtn = document.querySelector("[value='create']");
const deleteBtn = document.querySelector("[value='delete']");
const updateBtn = document.querySelector("[value='update']");
const selectBtn = document.querySelector("[value='select']");

selectBtn.addEventListener("click",async (e) => {
    e.preventDefault();
    const response = await  fetch(url, {
        method: "GET",
    });

    if(response.ok){
        const data = await response.json();
        id = data.id;
    }
})

createBtn.addEventListener("click", async (e) =>{
    const response = await fetch(`${url}/${id}`, {
        method: "POST",
        body: new FormData(formData)
    });

    if(response.ok){
        const data = await response.json();
        createRow(data);
    }
});

updateBtn.addEventListener("click", async (e) => {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        body: new FormData(formData)
    });

    if(response.ok){
        const data = await response.json();
        updateRow(data);
    }
});

deleteBtn.addEventListener("click", async (e) => {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE"
    });

    if(response.ok){
        const data = await response.json();
        deleteRow(data.id);
    }
});

function createRow(dataObject){
     let row = document.createElement("div");
     row.className = "table-row";
     id = dataObject.id;
     row.setAttribute("id", id);

     let ageDiv = document.createElement("div");
     let nameDiv = document.createElement("div");
     let avatarDiv = document.createElement("div");
     let img = document.createElement('img');

     ageDiv.setAttribute("data-name", "age");
     nameDiv.setAttribute("data-name", "name");
     avatarDiv.setAttribute("data-name", "img");

     ageDiv.textContent = dataObject.age;
     nameDiv.textContent = dataObject.name;
     img.src = dataObject.avatar;

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
            field.children[0].src = data.avatar;
            continue;
        }
        field.textContent = data[attr];
    }
}


function deleteRow(id) {
    let row = document.getElementById(id);
    row.remove();
}


