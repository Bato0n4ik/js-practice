function Person(name, age){
    let _name = name;
    let _age = age;


    this.getName = function(){
        return _name;
    }

    this.getAge = function(){
        return _age;
    }

    this.setName = function(name){
        if(typeof name === "string" && name){
            _name=name;
        }
    }

    this.setAge = function(age){
        if(typeof age === "number" && age > 0  && age <= 100){
            _age = age;
        }
    }
}

Person.prototype.print = function(){
    const p = document.createElement('p');
    p.textContent = `Person age:${this.getAge()}, name:${this.getName()}`;
    document.body.appendChild(p);
}

function Employee(name, age, company){
    Person.call(this, name, age);
    let _company = company;

    this.setCompany = function(company){
        if(typeof company === "string" && company){
            _company = company;
        }
    }

    this.getCompany = function(){
        return _company;
    }
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

let tomEmployee = new Employee("Tom", 25, "Microsoft");
tomEmployee.print();

