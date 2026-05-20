/*export*/ const documentPrintObject = (object) =>{
    let newDiv = document.createElement('div');
    let genId = generateId(16);
    newDiv.textContent = object;
    newDiv.setAttribute("id", genId);
    if (document.body) {
        document.body.appendChild(newDiv);
    } else {
        window.onload = () => document.body.appendChild(newDiv);
    }
    return genId;
}

function generateId(length){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}