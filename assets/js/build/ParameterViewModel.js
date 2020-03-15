var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export function add_parameter_state(paramName, initValue) {
    var _React$useState = React.useState(initValue),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        param = _React$useState2[0],
        setParam = _React$useState2[1];

    var _React$useState3 = React.useState(initValue.toString()),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        paramText = _React$useState4[0],
        setParamText = _React$useState4[1];

    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        paramError = _React$useState6[0],
        setParamError = _React$useState6[1];

    function handleParamChange(newParam) {
        setParamText(newParam);
        tryParseNumber(setParam, newParam, setParamError);
    }

    var paramViewModel = {
        paramName: paramName,
        param: param,
        paramText: paramText,
        paramError: paramError,
        handleParamChange: handleParamChange
    };

    return paramViewModel;
}

function tryParseNumber(stateVarSetter, numberString, stateErrorSetter) {
    var parsedNumber = Number(numberString);

    if (!numberString || Number.isNaN(parsedNumber)) {
        stateVarSetter(numberString);
        stateErrorSetter(true);
    } else {
        stateVarSetter(parsedNumber);
        stateErrorSetter(false);
    }
}