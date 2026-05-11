class CustomElement extends HTMLElement{
    constructor() {
        super();
        this.textContent = "Some content";
        this.setAttribute("data-value", "not random value");
        this.style.borderColor = "navy";
        this.style.display = "block";
    }

    connectedCallback(){

        this.style.color = "grey";
        if(this.hasAttribute("text-color")){
            this.style.color = this.getAttribute("text-color");
        }
    }

    print(){
        console.log(this);
    }

}

customElements.define("custom-element", CustomElement);
const customItem = new CustomElement();
customItem.print();
