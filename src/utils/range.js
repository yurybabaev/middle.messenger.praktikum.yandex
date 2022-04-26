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
