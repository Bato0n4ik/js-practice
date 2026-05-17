let placeholder = document.forms["textInput"].elements["add-str"];
let repeatBlock = document.getElementById("text-block");
let text = " ";
let clearButton = document.forms["textInput"].elements["button"];

function enteringHandler(){
    text = placeholder.value;
    repeatBlock.textContent = text;
}

function checkEnteredData(){
    if(text.trim() === ""){
        placeholder.style.borderColor = "red";
        repeatBlock.style.borderColor = "red";
    }
    else{
        placeholder.style.borderColor = "blue";
        repeatBlock.style.borderColor = "blue";
        placeholder.style.color = "blue";
    }
}

placeholder.addEventListener("input", enteringHandler);
placeholder.addEventListener("blur", checkEnteredData);
clearButton.addEventListener("click", (e) => {e.preventDefault(); placeholder.value = "";});




let optionsList = document.forms["select"].elements["languages"];
let  selectDiv = document.getElementById("select-block");

function writeChosenOptions(){

    while(selectDiv.hasChildNodes()){
        selectDiv.removeChild(selectDiv.firstChild);
    }

    for(let elem of optionsList.selectedOptions){
        let p = document.createElement('p');
        p.textContent = elem.textContent;
        selectDiv.appendChild(p);
    }
}

function choseMultipleOptions(e){
    e.preventDefault();
    const option = e.target;

    if(option.tagName === "OPTION"){
        option.selected = !option.selected;
        optionsList.dispatchEvent(new Event("change"));
    }

}

optionsList.addEventListener("mousedown", choseMultipleOptions);
optionsList.addEventListener("change", writeChosenOptions);