let button = document.querySelector("a[data-id='button-id']");

button.addEventListener("click", (e) => {
    e.preventDefault();
    account.pay(50);
});

account.addEventListener("success-payment", (e) => {
    sessionStorage.setItem("payment-data", JSON.stringify(e.detail));
    window.location.href = button.href;
});



