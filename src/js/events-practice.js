let redirectBut = document.getElementById("redirect-button");

function buttonClick(e){
    console.log(`Event object: ${e}`);
    console.log(`Time when button was clicked: ${e.timeStamp}`);
    console.log(`Cookie: ${document.cookie}`);
    window.location.href = "https://vk.com";
}

function buttonEnter(){
    redirectBut.classList.add("header-color");
}

function buttonLeave(){
    redirectBut.classList.remove("header-color");
}


redirectBut.addEventListener("mouseenter", buttonEnter);
redirectBut.addEventListener("mouseleave", buttonLeave);
redirectBut.addEventListener("click",buttonClick);


