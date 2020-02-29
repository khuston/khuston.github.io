import {Plot} from "./Plot.js"
import {add_parameter_state} from "./ParameterViewModel.js"
import {ParameterSpecifier, TextAndSliderParameter} from "./ParameterView.js"
import {FunctionImageFactory} from "./ImageFactory.js"
import {BlogMath} from "./BlogMath.js"

function BetaDistributionPlotApp(props)
{
    let alphaParamViewModel = add_parameter_state('Alpha', 1);
    let betaParamViewModel = add_parameter_state('Beta', 1);

    let alpha = alphaParamViewModel.param;
    let beta = betaParamViewModel.param;

    let parameterViewModels = [alphaParamViewModel, betaParamViewModel]

    let funcToPlot = (x) => BlogMath.BetaPDF(x, alpha, beta);

    let funcImage = FunctionImageFactory(funcToPlot, [0, 1], 300);

    const boundingRect = {
        minX: 0,
        minY: 0,
        maxX: 1,
        maxY: 20
    }

    return (
        <div className="plot-app">
            <Plot images={[funcImage]} width={500} height={500} boundingRect={boundingRect} />
            <ParameterSpecifier parameterViewComponent={TextAndSliderParameter} parameterViewModels={parameterViewModels}/>
        </div>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <BetaDistributionPlotApp />,
    document.getElementById('root')
  );
  