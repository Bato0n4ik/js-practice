let btn = document.getElementById("btn");
let textKey = document.getElementById("key-word");

//btn.addEventListener("click", () => alert("You click the button, congratulations"));

//btn.addEventListener("click",() => window.find(textKey.value));

btn.addEventListener("click", () => {
    let name = prompt("Enter your name:");
    const divId = documentPrintObject(`Welcome back ${name}, glad to see you again!`);
    let newBlock = document.getElementById(divId);
    newBlock.className = "auto-fade-out";
    setTimeout(() => {
        newBlock.classList.add("fade-out-hidden");
    }, 2500);
    setTimeout(() =>{
        newBlock.remove();
    }, 3000);
});

