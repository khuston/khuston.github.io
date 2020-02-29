export function ParameterSpecifier(props) {

    let ParameterViewComponent = props.parameterViewComponent;
    let parameterViewModels = props.parameterViewModels;

    const ParameterList = parameterViewModels.map((paramViewModel) => {
        return (
            <ParameterViewComponent key={paramViewModel.paramName} paramViewModel={paramViewModel} sliderMin="1" sliderMax="100"></ParameterViewComponent>
        )
    })

    return (
        <form className="parameter-spec">
            {ParameterList}
        </form>
    )
}

export function TextAndSliderParameter(props) {

    let paramViewModel = props.paramViewModel;

    function handleParamChange(event) {
        return paramViewModel.handleParamChange(event.target.value)
    }

    return (
        <label>
            {paramViewModel.paramName}:&nbsp;
            <input type="text" className={getParamTextboxClassName(paramViewModel.paramError)}
                value={paramViewModel.paramText} onChange={handleParamChange}></input>
            <input type="range" min="1" max="100" value={paramViewModel.param} onChange={handleParamChange}></input>
        </label>)
}

function getParamTextboxClassName(hasError) {

    var className = "parameter-input"
    if (hasError) {
        className += " parameter-input-error"
    }
    return className
}