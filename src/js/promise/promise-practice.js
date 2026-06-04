let intVal = 0;


function calculation(id, IntervalIdGetter){
    new Promise(function(resolve, reject) {
        try{
            intVal += 1;
            resolve(intVal);
        }
        catch(e){
            reject(new Error("Appeared error in firstPromise"));
        }
    })
        .then(function(value){
            console.log(`Promise ${id} end calculation: ` + value);
        }).catch(error =>{
            let intervalId = IntervalIdGetter();
            clearInterval(intervalId);
            console.log(`Interval №${intervalId} stopped because of error!`);
            if(id===1){
                firstIntervalId = null;

            }
            else{
                secondIntervalId = null;
            }
            console.error(`Error in Promise ${id}: ${error.message}`);
        });
}


let firstIntervalId = setInterval(() => calculation(1, () => firstIntervalId), 371);
let secondIntervalId = setInterval(() => calculation(2, () => secondIntervalId), 500);

setTimeout(() => {
    if(firstIntervalId){
        clearInterval(firstIntervalId);
        console.log(`Promise №${firstIntervalId} end successively`);
    }
    if(secondIntervalId){
        clearInterval(secondIntervalId);
        console.log(`Promise №${secondIntervalId} end successively`);
    }
}, 10000);

console.log("End of script!");






