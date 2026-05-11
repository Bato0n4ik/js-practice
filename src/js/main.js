//let a = 1;
//let b = 2;
//const sum = a + b;
////console.log("Результат операции: ", sum);
//
//document.write(`sum a and b = ${sum}<br>`);
//
//document.write("<br>");
//
//let object = {name: "Nikita", age: 22, password: "loh2003" };
//let object2 = {};
//
//document.write(`object && false: ${object && false}<br>`);
//document.write(`object === object2: ${object === object2}<br>`) ;
//
//document.write(`string = \"100\", number = 100, result compering by value:  ${"100" == 100}<br>`);
//
//
//document.write(`typeof object2 is ${typeof object2}<br>`);
//
//document.write("<br>");
//
//let positiveNumber = 0b01101000;
//let negativeNumber = (~0b10001011) + 1;
//
//document.write(`positiveNumber = ${positiveNumber}<br>`);
//document.write(`negativeNumber = ${negativeNumber}<br>`);
//
//document.write(`add code for positiveNumber = ${(~positiveNumber)+1}<br>`);
//document.write(`add code for negativeNumber = ${(~negativeNumber)+1}<br>`);
//
//document.write(`positiveNumber + negativeNumber = ${positiveNumber + negativeNumber}<br>`);
//document.write(`positiveNumber - negativeNumber = ${positiveNumber - negativeNumber}<br>`);
//
//document.write("<br>");
//
//
//let arr1 = ["Tom", 24, "California", true];
//let arr2  = [["Elis", 16, 0b0011],["Joy-Boy"],[17, true]];
//
//arr2[5] = arr1;
//for(let key in object){
//    document.write(`key: ${key}, value: ${object[key]}<br>`);
//}
//
//document.write("<br>");
//
//let counter = 0;
//for(let elem in arr2){
//    counter++;
//    document.write(`${counter} - row elements: ${arr2[elem]}<br>`);
//}
//
//document.write("<br>");
//
//counter=0;
//
//if(arr2.length > 0 && object.name){
//    document.write(`arr2.length: ${arr2.length}<br>`);
//    for(const elem of arr2){
//        counter++;
//        document.write(`${counter} - row elements: ${elem}<br>`);
//    }
//}
//else{
//    document.write("I chose my self <br>");
//}

document.write("<br>");

function argsFunction (...args) {

    document.write("<br>Called argsFunction<br>");

    let counter=0;
    for(let index in args)
    {
        counter++;
        document.write(`${counter}-${args[index]}<br>`);
    }
}

function objectFunction(objects){
    document.write("<br>Called objectFunction<br>");
    if(typeof objects === 'object') {

        let counter=0;
        for(let elem of objects)
        {
            document.write(`${++counter} - name: ${elem.name}, age: ${elem.age} <br>`);
        }
    }
    else{
        document.write(`Wrong arguments was sanded<br>`);
    }
}

function objectFunction2(name, age, email = null){
    document.write("<br>Called objectFunction-2<br>");

    if(typeof name === 'string' && typeof age === 'number' /*&& typeof email === 'string'*/){
        document.write(`name: ${name}, age: ${age}, email: ${email}<br>`);
    }
    else{
        document.write(`Wrong arguments was sanded<br>`);
    }

}

function objectFunction3(object){
    document.write("<br>Called objectFunction-3<br>");
    if(typeof object.name === 'string' && typeof object.age === 'number')
    {
        document.write(`name: ${object.name}, age: ${object.age}, email: ${typeof object.email === 'undefined'? null: object.email }<br>`);
    }
    else{
        document.write(`Wrong arguments was sanded<br>`);
    }
}




argsFunction(1,2,3.5,"some string");

argsFunction({name:"Tom", age: 28});

argsFunction({name:"Tom", age: 28},[[1,2,3],["Bob", 23]], "Hello argsFunction");

objectFunction([{name:"Tom", age: 28}, {name: "Bob", age: 23}]);

objectFunction3({name:"Tom", age: 28});

objectFunction3({name: "Bob", age: 23, email: "bobbynator.t-1000@gmail.com"});

objectFunction([[1,2,3],["Bob", 23]]);

let obj1 = ["Tom", 28];
let obj2 = ["Bob", 23, "bobbynator.t-1000@gmail.com"];

objectFunction2(...obj1);
objectFunction2(...obj2);


document.write(
(
    (x,y) =>
        (
            (func2) =>
                (
                    (func1) => func1(5,30) // end of nested lambdas!
                )((x,y) => [x, func2(), y])
        )(() => x + y)
)(10,15)
);



function func2(lambda){
    if(typeof lambda === 'function'){
        function func1(x, y){
            return [x, lambda ,y];
        }
    }
    return func1;
}









