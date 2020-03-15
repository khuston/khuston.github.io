function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

export function flatten(input) {
    var stack = [].concat(_toConsumableArray(input));
    var result = [];
    while (stack.length) {
        var next = stack.pop();
        if (Array.isArray(next)) {
            stack.push.apply(stack, _toConsumableArray(next));
        } else {
            result.push(next);
        }
    }

    return result.reverse();
}