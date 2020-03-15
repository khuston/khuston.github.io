import { Plot } from "./Plot.js";
import { add_parameter_state } from "./ParameterViewModel.js";
import { ParameterSpecifier, TextAndSliderParameter } from "./ParameterView.js";
import { FunctionImageFactory } from "./ImageFactory.js";
import { BlogMath } from "./BlogMath.js";

function BetaDistributionPlotApp(props) {
    var alphaParamViewModel = add_parameter_state('Alpha', 1);
    var betaParamViewModel = add_parameter_state('Beta', 1);

    var alpha = alphaParamViewModel.param;
    var beta = betaParamViewModel.param;

    var parameterViewModels = [alphaParamViewModel, betaParamViewModel];

    var funcToPlot = function funcToPlot(x) {
        return BlogMath.BetaPDF(x, alpha, beta);
    };

    var funcImage = FunctionImageFactory(funcToPlot, [0, 1], 300);

    var boundingRect = {
        minX: 0,
        minY: 0,
        maxX: 1,
        maxY: 20
    };

    return React.createElement(
        "div",
        { className: "plot-app" },
        React.createElement(Plot, { images: [funcImage], width: 500, height: 500, boundingRect: boundingRect }),
        React.createElement(ParameterSpecifier, { parameterViewComponent: TextAndSliderParameter, parameterViewModels: parameterViewModels })
    );
}

// ========================================

ReactDOM.render(React.createElement(BetaDistributionPlotApp, null), document.getElementById('root'));