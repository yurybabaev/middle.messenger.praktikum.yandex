function last(list) {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }
    return list[list.length - 1];
}

function first(list) {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }
    return list[0];
}

export {last, first};