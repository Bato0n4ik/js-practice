const people = ["Tom", "Bob", "Sam", "Toby", "Tony", "Jonie", "Sony", "Georgy"];

const person = {name: "Tomas", age: 25};

const myIterator = people[Symbol.iterator]();

function reversArrayIterator(){
    let arr = this
    let count = arr.length;
    return {
        next : function (){
            if(count > 0){
                return {
                    value: arr[--count],
                    done: false
                };
            }
            return{
                value: undefined,
                done: true
            };
        }
    }
}

function objectReversIterator(){
    const obj = this;
    const keysArr = Object.keys(obj);
    let counter = keysArr.length;

    return {
        next(){
            if(counter > 0){
                return {value: obj[keysArr[--counter]], done: false};
            }
            return {value: undefined, done: true};
        }
    }


}


function* reversArrayIteratorGenerator(){
    for(let i = this.length - 1; i >= 0; --i){
        yield this[i];
    }
}

//people[Symbol.iterator] = reversArrayIterator;
//
//for(let elem of people){
//    documentPrintObject(elem);
//}

//documentPrintObject(myIterator.next().value);

//people.forEach((elem, index) => documentPrintObject(elem));

person[Symbol.iterator] = objectReversIterator;

for(let val of person){
    documentPrintObject(val);
}

people[Symbol.iterator] = reversArrayIteratorGenerator;

for(let elem of people){
    documentPrintObject(elem);
}


