const iframeBlock= document.getElementById("insert-block");

function loadContent(fileName){

    const request = new XMLHttpRequest();

    request.addEventListener("load", ()=>{
        if(request.status === 200){
            document.title = fileName;
            iframeBlock.srcdoc = request.responseText;
        }
    });

    request.open("GET", fileName + ".html");
    request.setRequestHeader("Accept", "text/html; charset=utf-8");
    request.send();
}

const links = document.getElementsByTagName("a");
for(const link of links){
    link.addEventListener("click", (e)=>{
        loadContent(link.getAttribute("href"));
        e.preventDefault();
    });
}

loadContent("index");