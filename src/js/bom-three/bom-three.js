let btn = document.getElementById("btn");
let textKey = document.getElementById("key-word");

//btn.addEventListener("click", () => alert("You click the button, congratulations"));

//btn.addEventListener("click",() => window.find(textKey.value));

//btn.addEventListener("click", () => {
//    let name = prompt("Enter your name:");
//    const divId = documentPrintObject(`Welcome back ${name}, glad to see you again!`);
//    let newBlock = document.getElementById(divId);
//    newBlock.className = "auto-fade-out";
//    setTimeout(() => {
//        newBlock.classList.add("fade-out-hidden");
//    }, 2500);
//    setTimeout(() =>{
//        newBlock.remove();
//    }, 3000);
//});

let butt = document.getElementById("open-window");
let newWindow = null;

function openNewWindow(){
    if(!newWindow || newWindow.closed){
        newWindow = window.open("https://vk.com/", "_blank", "popup=yes,width=500,height=500,left=200,top=200");
    }
    else{
        closeNewWindow();
    }
}

function closeNewWindow(){
    if(newWindow !== null){
        newWindow.close();
        newWindow = null;
    }
}

butt.addEventListener("click", openNewWindow);
