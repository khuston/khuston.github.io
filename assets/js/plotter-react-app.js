var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { draggable_rect_view } from "./DraggableView.js";

function PlotApp(props) {
    var _React$useState = React.useState(1),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        alpha = _React$useState2[0],
        setAlpha = _React$useState2[1];

    var _React$useState3 = React.useState('1'),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        alphaText = _React$useState4[0],
        setAlphaText = _React$useState4[1];

    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        alphaError = _React$useState6[0],
        setAlphaError = _React$useState6[1];

    var _React$useState7 = React.useState(1),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        beta = _React$useState8[0],
        setBeta = _React$useState8[1];

    var _React$useState9 = React.useState('1'),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        betaText = _React$useState10[0],
        setBetaText = _React$useState10[1];

    var _React$useState11 = React.useState(false),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        betaError = _React$useState12[0],
        setBetaError = _React$useState12[1];

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

    function onAlphaChange(newAlpha) {
        setAlphaText(newAlpha);
        tryParseNumber(setAlpha, newAlpha, setAlphaError);
    }

    function onBetaChange(newBeta) {
        setBetaText(newBeta);
        tryParseNumber(setBeta, newBeta, setBetaError);
    }

    var funcToPlot = function funcToPlot(x) {
        return BlogMath.BetaPDF(x, alpha, beta);
    };

    var imagesToPlot = [FunctionImageFactory(funcToPlot, [0, 1], 40)];

    var DraggablePlot = draggable_rect_view(Plot);

    return React.createElement(
        'div',
        { className: 'plot-app' },
        React.createElement(DraggablePlot, { images: imagesToPlot, width: 500, height: 500 }),
        React.createElement(ImageConfiguration, { alpha: alpha, beta: beta, alphaText: alphaText, betaText: betaText,
            alphaError: alphaError, betaError: betaError,
            onAlphaChange: onAlphaChange, onBetaChange: onBetaChange })
    );
}

var ViewControlType = {
    Undefined: 0,
    Static: 1,
    Draggable: 2
};

function DraggablePlot2(props) {
    viewControl = ViewControlFactory(ViewControlType.Draggable, [boundingRect, setBoundingRect], props.width, props.height);

    return React.createElement(
        'div',
        { onMouseDown: viewControl.mouseDown, onMouseUp: viewControl.mouseUp,
            onMouseLeave: viewControl.mouseLeave, onMouseMove: viewControl.mouseMove },
        React.createElement(SVGDataListFactory, { width: props.width, height: props.height, boundingRect: viewControl.boundingRect,
            imageData: props.images })
    );
}

function Plot(props) {
    return React.createElement(
        'div',
        { onMouseDown: props.handleMouseDown, onMouseUp: props.handleMouseUp,
            onMouseLeave: props.handleMouseLeave, onMouseMove: props.handleMouseMove },
        React.createElement(SVGDataListFactory, { width: props.width, height: props.height,
            boundingRect: props.boundingRect, imageData: props.images })
    );
}

function SVGDataListFactory(props) {
    var viewTrans = function viewTrans(xyPos) {
        var x = xyPos[0];
        var y = xyPos[1];

        var xTrans;
        var yTrans;

        var minX = props.boundingRect.minX;
        var minY = props.boundingRect.minY;
        var maxX = props.boundingRect.maxX;
        var maxY = props.boundingRect.maxY;

        if (Number.isFinite(x)) {
            xTrans = (x - minX) / (maxX - minX) * props.width;
        } else {
            if (x == Infinity) {
                xTrans = props.width;
            } else if (x == -Infinity) {
                xTrans = 0;
            } else {
                throw "Unhandled non-finite value " + x.toString();
            }
        }

        if (Number.isFinite(y)) {
            yTrans = (maxY - y) / (maxY - minY) * props.height;
        } else {
            if (y == Infinity) {
                yTrans = 0;
            } else if (y == -Infinity) {
                yTrans = props.height;
            } else {
                throw "Unhandled non-finite value " + x.toString();
            }
        }

        return [xTrans, yTrans];
    };

    var svgChildren = props.imageData.map(function (imageData) {
        return SVGDataFactory(imageData, getEntityStyleSpec, viewTrans);
    }).flat();

    var svgProps = {
        width: props.width,
        height: props.height
    };

    return React.createElement('svg', svgProps, svgChildren);
}

function getEntityStyleSpec(imageData) {
    var dataEntityStyleSpec = {
        type: 'circle',
        r: 2,
        stroke: "black",
        fill: "black"
    };

    var lineEntityStyleSpec = {
        type: 'line',
        stroke: "black"
    };

    switch (imageData.type) {
        case 'data2D':
            return dataEntityStyleSpec;
        case 'evaluatedFunc2D':
            return lineEntityStyleSpec;
    }
}

function SVGDataFactory(imageData, getEntityStyleSpec, viewTrans) {
    var svgChildren;

    var entityStyleSpec = getEntityStyleSpec(imageData);

    switch (imageData.type) {
        case 'data2D':
            {
                svgChildren = imageData.data.map(function (xyPos) {
                    return SVGPointElementFactory(entityStyleSpec, viewTrans(xyPos));
                });
                break;
            }
        case 'evaluatedFunc2D':
            {
                svgChildren = [];
                var i;
                for (i = 0; i < imageData.data.length - 1; i++) {
                    var line = SVGLineElementFactory(entityStyleSpec, viewTrans(imageData.data[i]), viewTrans(imageData.data[i + 1]));
                    svgChildren.push(line);
                }
                break;
            }
        default:
            {
                svgChildren = [];
            }
    }
    return svgChildren;
}

function SVGPointElementFactory(entityStyleSpec, xyPos) {
    var entitySpec = Object.assign({}, entityStyleSpec);

    switch (entitySpec.type) {
        case 'circle':
            entitySpec.cx = xyPos[0];
            entitySpec.cy = xyPos[1];
            break;
        case 'rect':
            entitySpec.cx = xyPos[0] - entityStyleSpec.width / 2;
            entitySpec.cy = xyPos[1] - entityStyleSpec.height / 2;
            break;
    }

    return SVGElementFactory(entitySpec);
}

function SVGLineElementFactory(entityStyleSpec, xyPos1, xyPos2) {
    var entitySpec = Object.assign({}, entityStyleSpec);

    switch (entitySpec.type) {
        case 'line':
            entitySpec.x1 = xyPos1[0];
            entitySpec.y1 = xyPos1[1];
            entitySpec.x2 = xyPos2[0];
            entitySpec.y2 = xyPos2[1];
            break;
    }

    return SVGElementFactory(entitySpec);
}

function SVGElementFactory(entitySpec) {

    var entityProps = Object.assign({}, entitySpec);

    delete entityProps.type;

    return React.createElement(entitySpec.type, entityProps, []);
}

function ImageConfiguration(props) {
    function onAlphaChange(e) {
        return props.onAlphaChange(e.target.value);
    }

    function onBetaChange(e) {
        return props.onBetaChange(e.target.value);
    }

    var alphaTextClassName = "parameter-input";
    if (props.alphaError) {
        alphaTextClassName += " parameter-input-error";
    }

    var betaTextClassName = "parameter-input";
    if (props.betaError) {
        betaTextClassName += " parameter-input-error";
    }

    return React.createElement(
        'form',
        { className: 'parameter-spec' },
        React.createElement(
            'label',
            null,
            'Alpha:',
            React.createElement('input', { type: 'text', className: alphaTextClassName, name: 'alpha', value: props.alphaText, onChange: onAlphaChange }),
            React.createElement('input', { type: 'range', min: '1', max: '100', value: props.alpha, onChange: onAlphaChange })
        ),
        React.createElement(
            'label',
            null,
            'Beta:',
            React.createElement('input', { type: 'text', className: betaTextClassName, name: 'beta', value: props.betaText, onChange: onBetaChange }),
            React.createElement('input', { type: 'range', min: '1', max: '100', value: props.beta, onChange: onBetaChange })
        )
    );
}

// ========================================

ReactDOM.render(React.createElement(PlotApp, null), document.getElementById('root'));