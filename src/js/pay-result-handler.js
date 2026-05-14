let dummyAccount = new Account(0);

const paymentData = sessionStorage.getItem("payment-data");

dummyAccount.addEventListener("payment-event", (e)=>{
    documentPrintObject("Payment is " + e.detail.status + ", transfer amount: " + e.detail.payment  + ", account balance: " + e.detail.balance);
})


if(paymentData){
    const data = JSON.parse(paymentData);
    const restoreEVent = new CustomEvent("payment-event", {detail: data});
    dummyAccount.dispatchEvent(restoreEVent);
    sessionStorage.removeItem("payment-data");
}
