import { add_draggable_view_state } from "./DraggableView.js";
import { Plot } from "./Plot.js";
import { add_parameter_state } from "./ParameterViewModel.js";
import { ParameterSpecifier, TextAndSliderParameter } from "./ParameterView.js";
import { FunctionImageFactory_Adaptive } from "./ImageFactory.js";
import { BlogMath } from "./BlogMath.js";

function PlotApp(props) {
    var DraggablePlot = add_draggable_view_state(Plot);

    var alphaParamViewModel = add_parameter_state('Alpha', 1);
    var betaParamViewModel = add_parameter_state('Beta', 1);

    var alpha = alphaParamViewModel.param;
    var beta = betaParamViewModel.param;

    var parameterViewModels = [alphaParamViewModel, betaParamViewModel];

    var funcToPlot = function funcToPlot(x) {
        return BlogMath.BetaPDF(x, alpha, beta);
    };

    var imagesToPlot = [FunctionImageFactory_Adaptive(funcToPlot, [0, 1], 40)];

    return React.createElement(
        "div",
        { className: "plot-app" },
        React.createElement(DraggablePlot, { images: imagesToPlot, width: 500, height: 500 }),
        React.createElement(ParameterSpecifier, { parameterViewComponent: TextAndSliderParameter, parameterViewModels: parameterViewModels })
    );
}

// ========================================

ReactDOM.render(React.createElement(PlotApp, null), document.getElementById('root'));