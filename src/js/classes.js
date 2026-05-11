class Person{

    #name;
    #age;
    static #printMethodCallCounter = 0;

    constructor(name, age){
        this.#name = name;
        this.#age = age;
    }

    set name(name){
        if(typeof name === "string" && name){
            this.#name = name;
        }
    }

    set age(age){
        if(typeof age === "number" && age > 0 && age <= 100){
            this.#age = age
        }
    }

    get name(){return this.#name;}
    get age(){return this.#age;}

    static print(person){
        const p = document.createElement('p');
        p.id = "person-info-display";
        p.textContent = `personal object info: name(${person.name}), age(${person.age}), this method called ${++Person.#printMethodCallCounter} times`;
        document.body.appendChild(p);
    }

}

class Employee extends Person{
    #company;

    constructor(name, age, company) {
        super(name, age);
        this.#company = company;
    }

    print(){
        Person.print(this);
        const p = document.getElementById("person-info-display");
        const startWith = `age(${this.age})`
        p.textContent = p.textContent.replace(startWith, startWith + `, company(${this.#company})`);

    }
}

const employee = new Employee("Tornado", 15, "Gayijin");
employee.name = "Tornado-Mornado";
employee.print();


documentPrintObject(`Employee Prototype: ${Employee.prototype}`);
documentPrintObject(`Employee Prototype _Proto_: ${Employee.prototype.__proto__}`);
documentPrintObject(`Employee  _Proto_: ${Employee.__proto__}`);
documentPrintObject(`Person prototype: ${Person.prototype}`)
documentPrintObject(`Person _proto_: ${Person.__proto__}`)
documentPrintObject(`Person Prototype _Proto_: ${Person.prototype.__proto__}`)




