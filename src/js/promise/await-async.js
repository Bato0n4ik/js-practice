function asyncFunc(){
    return  new Promise((resolve, reject) => {
        let randomValue = Math.random() * 1000;
        if(randomValue === 0){
            reject(new Error("Error: value is 0!"));
        }
        else {
            resolve(randomValue / 100);
        }
    }).catch((error) => console.error(error.message));
}

function printAsyncFuncResult(){
    const promises = [];
    const start = performance.now();
    for(let i = 0; i < 100; i++){
        let promise = asyncFunc(i)
            .then(result => console.log(`Thread id: ${i}, value = ${result}`));
        promises.push(promise);
    }

    Promise.all(promises)
        .then(() => {
            const end = performance.now();
            console.log("Performance time: " + (end - start));
        }).catch(globalError => console.error("Global Interception: Everything crashed due to an error:", globalError.message));
}


printAsyncFuncResult();



