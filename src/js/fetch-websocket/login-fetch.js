const loginForm = document.getElementById("login");

loginForm.addEventListener("submit",async (e) => {
    e.preventDefault();

    const formObject = Object.fromEntries(new FormData(loginForm));
    const {name, age} = formObject;

    const response = await  fetch(url + "/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name: name, age: age})
    });

    if(response.ok){
        const urlObj = await response.json();
        window.location.replace(urlObj.redirectUrl);
    }

    else if (response.status === 401){
        console.log(response.text())
    }
})