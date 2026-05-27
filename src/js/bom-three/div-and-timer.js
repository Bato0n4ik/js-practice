const movedBlock = document.getElementById("moved-block");
let rightBorder = document.documentElement.clientWidth;
let lowBorder = document.documentElement.clientHeight;
const computedStyles = window.getComputedStyle(movedBlock);
const boxHeight = parseInt(computedStyles.height);
const boxWidth = parseInt(computedStyles.width);
const step = 5;
let turnBack = false;
let goUp = false;
let currentHeight = 0;
let currentWidth = 0;
let clickCounter = 0;

let animatedFrameId = null;


movedBlock.style.marginTop = currentHeight  + "px";
movedBlock.style.marginLeft = currentWidth  + "px";


function goUpOrDown(){
    currentHeight = parseInt(movedBlock.style.marginTop);

    if(currentHeight + boxHeight > lowBorder && goUp === false){
        goUp = true;
    }
    else if(goUp && currentHeight - boxHeight < 0){
        goUp = false;
    }

    if(!goUp){
        currentHeight = currentHeight + boxHeight;
    }
    else{
        currentHeight = currentHeight - boxHeight;
    }

    movedBlock.style.marginTop = currentHeight  + "px";
}

function moveBlock(){

    rightBorder = document.documentElement.clientWidth;
    lowBorder = document.documentElement.clientHeight;

    currentWidth = parseInt(movedBlock.style.marginLeft);


    if(currentWidth + boxWidth + step < rightBorder && turnBack === false){
        currentWidth = currentWidth + step;
        movedBlock.style.marginLeft = currentWidth + "px";
    }
    else if(currentWidth + boxWidth + step >= rightBorder && turnBack === false){
        goUpOrDown();
        turnBack = true;
    }
    if(turnBack && currentWidth - step > 0){
        currentWidth = currentWidth - step;
        movedBlock.style.marginLeft = currentWidth + "px";
    }
    else if(turnBack && currentWidth - step <= 0){

        goUpOrDown();
        turnBack = false;
    }

    animatedFrameId = window.requestAnimationFrame(moveBlock);
}



movedBlock.addEventListener("click",() => {
    if(clickCounter === 1){
        clickCounter = 0;
        window.cancelAnimationFrame(animatedFrameId);
    }
    else{
        animatedFrameId = window.requestAnimationFrame(moveBlock);
        clickCounter++;
    }
});
