const pages = {
    home: {content: "Home page content", url: "#home"},
    about: {content: "Some thing about us", url: "#about"},
    contacts: {content: "Our contacts page", url: "#contacts"}
};

let divPage = document.getElementById("content");
divPage.textContent = pages.home.content;
window.history.replaceState(pages.home, 'Home Page', "");

const a= document.getElementsByTagName("a");


function clickLinksHandler(e){
    const link = e.currentTarget.getAttribute("href");
    const currentPage = pages[link.split("#").pop()];

    if(!history.state || history.state.url !== currentPage.url){
        history.pushState(currentPage, e.currentTarget.textContent, e.currentTarget.href);
        divPage.textContent = currentPage.content;
    }

    e.preventDefault();
}

for(let i = 0; i < a.length; i++){
    a[i].addEventListener("click" , clickLinksHandler);
}

window.addEventListener("popstate", (e) =>{
    if(history.state){
        divPage.textContent = e.state.content;
    }
    else{
        divPage.textContent = pages.home.content;
    }
})



