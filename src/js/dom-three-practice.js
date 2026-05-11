console.log(document.title);
console.log(document.contentType);
console.log(document.lastModified);
console.log(document.URL);

for(let item of document.images){
    console.log(item);
}

arrLinks = document.links;

arrLinks[0].href = "#top";
arrLinks[0].textContent = "Changed text";

for(let item of arrLinks){
    console.log(item);
}

const divBlocks = document.getElementsByTagName("div");

const oneDiv = document.querySelector("div[data-div='one-div']");

for(const node of oneDiv.childNodes){
    console.log(`Node type: ${getNodeNameByTypeNumber(node.nodeType)}, node name: ${node.nodeName}, node value: ${node.nodeValue}`);
}

function treeTraversal(blocks){
    for(let block of blocks){

        console.log(`Tag name: ${block.tagName}, attributes: ${block.getAttributeNames()}, 
        attributes values: ${block.getAttributeNames().map(key => block.getAttribute(key))}`);
        treeTraversal(block.children);
    }
}

treeTraversal(divBlocks);

let item = document.querySelector("span[data-type='inner-span-1']");

item.style.color = "navy";

console.log(`Element type: ${item.nodeType}
, attribute value:  ${item.getAttribute("data-type")}
, tag inner text: ${item.innerText}`);



function getNodeNameByTypeNumber(nodeType){
    if(typeof nodeType !== 'number'){return undefined;}
    if(nodeType === 1){
        return "element";
    }
    else if(nodeType === 2){
        return "attribute";
    }
    else if(nodeType === 3){
        return "text";
    }
    return undefined;
}

let h1 = document.querySelector("h1[data-id='data-h1-id']");
console.log(h1.className);
h1.className = h1.className + " header-color";
console.log(h1.className);
h1.classList.toggle("header-color");
console.log(h1.className);
h1.classList.remove(".header-color");
h1.classList.add("header-color", "header-font", "header-size");
console.log(h1.classList);
for(const elem of h1.classList){
    console.log(elem);
}

console.log(`Tag name: ${h1.tagName}, attributes: ${h1.getAttributeNames()}, 
        attributes values: ${h1.getAttributeNames().map(key => h1.getAttribute(key))}`);



