//import {documentPrintObject} from "./UtilityClass.js";

class Person {
    #name;
    #age;

    constructor(name, age){
        this.#name = name;
        this.#age = age;
    }

    set age(ageValue){
        if(typeof ageValue === 'number' && ageValue > 0 && ageValue <= 100){
            this.#age =  ageValue;
        }
    }

    set name(nameValue){
        if(typeof nameValue === 'string' && nameValue){
            this.#name = nameValue;
        }
    }

    get name(){
        return this.#name;
    }

    get age(){
        return this.#age;
    }
}

const person = new Person("Andrew", 27);

const handler = {
    set: function(target, prop, value){
        if(prop in target){
            target[prop] = value;
            return true;
        }
        documentPrintObject(`Field ${prop} is not function and can't be changed`);
        return false;
    },

    get: function(target, prop){
        if(prop in target){
            return target[prop];
        }
        return undefined;
    }
};

const secondHandler = {

};

const proxy = new Proxy(person, handler);
proxy.name = "Jastin";
documentPrintObject(`Proxy.name: ${proxy.name}, Person name: ${person.name}`);
proxy.age = 23;
documentPrintObject(`Proxy.age: ${proxy.age}, Person age: ${person.age}`);


