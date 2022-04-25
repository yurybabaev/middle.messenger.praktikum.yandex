function range(start = 0, end, step, isRight) {
    let actualStart = start;
    let actualEnd = end;
    let actualStep = step;  
    if (end === undefined) {
        actualStart = 0;
        actualEnd = start;
    }
    if (step === undefined) {
        actualStep = 1;
    }    
    const countForward = actualEnd >= actualStart;
    actualEnd = Math.abs(actualEnd);
    actualStep = Math.abs(actualStep);
    const res = [];
    if (step === 0) {
        // Just fill array with [start] end - 1 times
        res.length = actualEnd - 1;
        res.fill(start);
    } else {
        for (let counter = actualStart; counter < actualEnd; counter += actualStep) {
            res.push(countForward ? counter : -counter);
        }
    }
    return isRight ? res.reverse() : res;

}

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

export {range, rangeRight};

console.log("=== range ===");
console.log(range(4)); // => [0, 1, 2, 3] 
console.log(range(-4)); // => [0, -1, -2, -3]
console.log(range(1, 5)); // => [1, 2, 3, 4]
console.log(range(0, 20, 5)); // => [0, 5, 10, 15]
console.log(range(0, -4, -1)); // => [0, -1, -2, -3]
console.log(range(1, 4, 0)); // => [1, 1, 1]
console.log(range(0)); // => []
console.log("=== range right ===");
console.log(rangeRight(4)); // => [3, 2, 1, 0]
console.log(rangeRight(-4)); // => [-3, -2, -1, 0]
console.log(rangeRight(1, 5)); // => [4, 3, 2, 1]
console.log(rangeRight(0, 20, 5)); // => [15, 10, 5, 0]
console.log(rangeRight(0, -4, -1)); // => [-3, -2, -1, 0]
console.log(rangeRight(1, 4, 0)); // => [1, 1, 1]
console.log(rangeRight(0)); // => []