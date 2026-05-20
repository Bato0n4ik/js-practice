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

let emailElem = document.getElementById("email");
let errorDiv = document.getElementById("emailError");
let usernameInput = document.forms["registerForm"].elements["username"];

let sendEmailButton = document.querySelector("[name='sendEmail']")

function checkValidationEmail(){
    console.log(`Email is valid: ${emailElem.validity.valid}`);
    console.log(`Can be validated: ${emailElem.willValidate}`);
    console.log(`Email not valid: ${emailElem.validity.typeMismatch}`);
    console.log(`Field is empty: ${emailElem.validity.valueMissing}`);
    console.log(`Entered incorrect value: ${emailElem.validity.badInput}`);
    console.log(emailElem.validationMessage);
}

function emailValidation(){
    if(!emailElem.validity.valid){
        errorDiv.style.display = "block";
        errorDiv.textContent = emailElem.validationMessage;
    }
    else{
        errorDiv.style.display = "none";
        errorDiv.textContent = "";
    }
}

function usernameValidation(){
    if(usernameInput.value === "username"){
        usernameInput.setCustomValidity("You can't use 'username' name");
    }
}

//sendEmailButton.addEventListener("click", (e) => {
//    e.preventDefault();
//    emailElem.dispatchEvent(new CustomEvent("customEmailErrorEvent"));
//});
sendEmailButton.addEventListener("click", usernameValidation);

usernameInput.addEventListener("change", usernameValidation);
emailElem.addEventListener("customEmailErrorEvent", emailValidation);