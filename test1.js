

function makeCounter(predicate){
    let counter =0;

    return function(){
        counter= predicate(counter)
        return counter;
    }
}

function increase(n){
    return ++n;
}

function decrease(n){
    return --n;
}

const increaser = makeCounter(increase);
console.log(increaser()); //1
console.log(increaser()); //2

const decreaser = makeCounter(decrease);
console.log(decreaser()); //-1
console.log(decreaser()); //-2
