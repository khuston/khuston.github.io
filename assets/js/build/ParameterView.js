export function ParameterSpecifier(props) {

    var ParameterViewComponent = props.parameterViewComponent;
    var parameterViewModels = props.parameterViewModels;

    var ParameterList = parameterViewModels.map(function (paramViewModel) {
        return React.createElement(ParameterViewComponent, { key: paramViewModel.paramName, paramViewModel: paramViewModel, sliderMin: "1", sliderMax: "100" });
    });

    return React.createElement(
        "form",
        { className: "parameter-spec" },
        ParameterList
    );
}

export function TextAndSliderParameter(props) {

    var paramViewModel = props.paramViewModel;

    function handleParamChange(event) {
        return paramViewModel.handleParamChange(event.target.value);
    }

    return React.createElement(
        "label",
        null,
        paramViewModel.paramName,
        ":\xA0",
        React.createElement("input", { type: "text", className: getParamTextboxClassName(paramViewModel.paramError),
            value: paramViewModel.paramText, onChange: handleParamChange }),
        React.createElement("input", { type: "range", min: "1", max: "300", value: paramViewModel.param, onChange: handleParamChange })
    );
}

function getParamTextboxClassName(hasError) {

    var className = "parameter-input";
    if (hasError) {
        className += " parameter-input-error";
    }
    return className;
}