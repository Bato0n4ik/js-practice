/*export*/ const documentPrintObject = (object) =>{
    let p = document.createElement('p');
    p.textContent = object;
    if (document.body) {
        document.body.appendChild(p);
    } else {
        window.onload = () => document.body.appendChild(p);
    }
}