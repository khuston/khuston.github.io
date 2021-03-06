import {add_draggable_view_state} from "./DraggableView.js"
import {Plot} from "./Plot.js"
import {add_parameter_state} from "./ParameterViewModel.js"
import {ParameterSpecifier, TextAndSliderParameter} from "./ParameterView.js"
import {FunctionImageFactory_Adaptive} from "./ImageFactory.js"
import {BlogMath} from "./BlogMath.js"

function PlotApp(props)
{
    let DraggablePlot = add_draggable_view_state(Plot);

    let alphaParamViewModel = add_parameter_state('Alpha', 1);
    let betaParamViewModel = add_parameter_state('Beta', 1);

    let alpha = alphaParamViewModel.param;
    let beta = betaParamViewModel.param;

    let parameterViewModels = [alphaParamViewModel, betaParamViewModel]

    let funcToPlot = (x) => BlogMath.BetaPDF(x, alpha, beta);

    var imagesToPlot = [
        FunctionImageFactory_Adaptive(funcToPlot, [0, 1], 40)
    ]

    return (
        <div className="plot-app">
            <DraggablePlot images={imagesToPlot} width={500} height={500} />
            <ParameterSpecifier parameterViewComponent={TextAndSliderParameter} parameterViewModels={parameterViewModels}/>
        </div>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <PlotApp />,
    document.getElementById('root')
  );
  