export function add_parameter_state(paramName, initValue) {
    const [param, setParam] = React.useState(initValue);
    const [paramText, setParamText] = React.useState(initValue.toString());
    const [paramError, setParamError] = React.useState(false)
    
    function handleParamChange(newParam) {
        setParamText(newParam);
        tryParseNumber(setParam, newParam, setParamError);
    }

    let paramViewModel = {
        paramName: paramName,
        param: param,
        paramText: paramText,
        paramError: paramError,
        handleParamChange: handleParamChange
    }

    return paramViewModel
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