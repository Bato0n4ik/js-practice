class Account extends EventTarget{

    #money;

    constructor (money){
        super();
        this.#money = money;
    }


    pay(sum){
        let payEvent;
        let data = {
            payment: sum,
            balance: this.#money
        }
        if(this.#money >= sum){
            this.#money -= sum;
            data.status = "success";
            payEvent = new CustomEvent("success-payment", {detail: data});
        }
        else{
            data.status = "fail";
            payEvent = new CustomEvent("fail-payment", {detail: data});
        }
        this.dispatchEvent(payEvent);
    }

}

let account = new Account(100);