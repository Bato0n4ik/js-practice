let redDiv = document.getElementById("redRect");
let blueDiv = document.getElementById("blueRect");
const step = 10;
let position = {blueRect: [0,0], redRect: [0,0]};
let activeElement = blueDiv;


function choiceElement(e){
    if(e.target.hasAttribute("id")){
        if(e.target.id === "redRect"){
            activeElement = redDiv;
        }
        else if(e.target.id === "blueRect"){
            activeElement = blueDiv;
        }
    }
}


function initBlueRect(){
    activeElement.style.marginLeft = position[activeElement.id][0] + "px";
    activeElement.style.marginTop = position[activeElement.id][1] + "px";
}

function initPosition(){
    [blueDiv, redDiv].forEach(elem => {
        let elementStyles = window.getComputedStyle(elem);
        position[elem.id][0] = parseInt(elementStyles.marginLeft);
        position[elem.id][1] = parseInt(elementStyles.marginTop);
    });
}

function setBorders(){
    if(activeElement === redDiv){
        return [blueDiv.clientHeight - activeElement.offsetHeight, blueDiv.clientWidth - activeElement.offsetWidth];

    }
    return [document.documentElement.clientHeight - activeElement.offsetHeight, document.documentElement.clientWidth - activeElement.offsetWidth];


}
function shiftRect(e){
    let posArr = position[activeElement.id];
    let [lowBorder, rightBorder] = setBorders();

    switch (e.key) {
        case "ArrowLeft":
            if(posArr[0] > 0){
                posArr[0] -= step;
            }
            break;
        case "ArrowRight":
            if(posArr[0] < rightBorder){
                posArr[0] += step;
            }
            break;
        case "ArrowUp":
            if(posArr[1] > 0){
                posArr[1] -= step;
            }
            break;
        case "ArrowDown":
            if(posArr[1] < lowBorder){
                posArr[1] += step;
            }
            break;
    }
    initBlueRect();

}

document.addEventListener("mousedown", choiceElement);

document.addEventListener("keydown", shiftRect);
window.addEventListener("load", () => {
    initPosition();
    initBlueRect();
});

function oneClick(e, color){
    //e.target.style = `background-color: ${color}`;
    e.currentTarget.style.backgroundColor =  color;
}

function twoClicks(e){
    //e.target.removeAttribute("style");
    e.currentTarget.style.backgroundColor = "";
}

function applyDynamicBorder(e, borderColor, glowColor){
    e.currentTarget.style.setProperty("--border-color", borderColor);
    e.currentTarget.style.setProperty("--glow-color", glowColor);
    e.currentTarget.classList.add("dynamic-color-border");
}

function removeDynamicBorder(e){
    e.currentTarget.classList.remove("dynamic-color-border");
}

redDiv.addEventListener("mouseover", (e) => {e.stopPropagation();applyDynamicBorder(e, "darkred", "rgba(255, 80, 80, 0.5)");});
redDiv.addEventListener("mouseleave", (e) => {e.stopPropagation();removeDynamicBorder(e);});

blueDiv.addEventListener("mouseover", (e) => applyDynamicBorder(e, "blue", "rgba(65, 105, 225, 1)"));
blueDiv.addEventListener("mouseleave", removeDynamicBorder);

blueDiv.addEventListener("click", (e) => oneClick(e, "blue"));
blueDiv.addEventListener("dblclick", twoClicks);

redDiv.addEventListener("click", (e) => {e.stopPropagation();oneClick(e, "red");});
redDiv.addEventListener("dblclick", (e) => {e.stopPropagation();twoClicks(e);});


//blueDiv.addEventListener("click", (e) => {
//    console.log("Клик по СИНЕМУ");
//    oneClick(e, "blue");
//});
//
//redDiv.addEventListener("click", (e) => {
//    e.stopPropagation();
//    console.log("Клик по КРАСНОМУ (всплытие остановлено)");
//    oneClick(e, "red");
//});