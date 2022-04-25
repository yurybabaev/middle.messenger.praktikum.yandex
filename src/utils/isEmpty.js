function isEmpty(value) {
    const type = typeof value;
    if (value === null) {
        return true;
    }
    if (type === "number" || type === "boolean" || type === "bigint"
     || type === "symbol" || type === "undefined" || type === "function"){
         return true;
    }
    const proto = Object.getPrototypeOf(value)
    if (type === "string" || proto === Array.prototype) {
        return value.length === 0;
    }
    if (proto === Map.prototype || proto === Set.prototype) {
        return value.size === 0;
    }
    return !Object.keys(value).length === 0;
}

export {isEmpty};

// console.log(isEmpty(null)); // => true
// console.log(isEmpty(true)); // => true
// console.log(isEmpty(1)); // => true
// console.log(isEmpty([1, 2, 3])); // => false
// console.log(isEmpty({ 'a': 1 })); // => false
// console.log(isEmpty('123')); // => false
// console.log(isEmpty(123)); // => true
// console.log(isEmpty('')); // => true
// console.log(isEmpty(0)); // => true