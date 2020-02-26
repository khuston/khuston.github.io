var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function PlotApp(props) {
    var image1 = {
        type: "data2D",
        data: [[10, 40], [20, 30], [30, 20], [40, 10]]
    };

    var image2 = {
        type: "data2D",
        data: [[100, 0], [110, 10], [120, 20], [130, 30]]
    };

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

    var data = [];
    if (!alphaError && !betaError) {
        var i;
        for (i = 0; i <= 100; i++) {
            x = 0.01 * i;
            data.push([x, BlogMath.BetaPDF(x, alpha, beta)]);
        }
    }

    var image3 = {
        type: 'data2D',
        data: data
    };

    var width = 500;
    var height = 500;
    var minX = 0;
    var minY = 0;
    var maxX = 1;
    var maxY = 20;

    aspectRatio = (maxY - minY) / (maxX - minX) * width / height;

    var imagesToPlot = [
    //image3
    FunctionImageFactory(function (x) {
        return BlogMath.BetaPDF(x, alpha, beta);
    }, 0, 1, 40, aspectRatio)];

    return React.createElement(
        "div",
        { className: "plot-app" },
        React.createElement(Plot, { images: imagesToPlot, width: width, height: height, minX: minX, minY: minY, maxX: maxX, maxY: maxY }),
        React.createElement(ImageConfiguration, { alpha: alpha, beta: beta, alphaText: alphaText, betaText: betaText,
            alphaError: alphaError, betaError: betaError,
            onAlphaChange: onAlphaChange, onBetaChange: onBetaChange })
    );
}

var Plot = function (_React$Component) {
    _inherits(Plot, _React$Component);

    function Plot(props) {
        _classCallCheck(this, Plot);

        var _this = _possibleConstructorReturn(this, (Plot.__proto__ || Object.getPrototypeOf(Plot)).call(this, props));

        _this.isMouseDown = false;

        _this.state = {
            minX: props.minX,
            minY: props.minY,
            maxX: props.maxX,
            maxY: props.maxY
        };
        return _this;
    }

    _createClass(Plot, [{
        key: "handleMouseDown",
        value: function handleMouseDown() {
            this.isMouseDown = true;
        }
    }, {
        key: "handleMouseUp",
        value: function handleMouseUp() {
            this.isMouseDown = false;
        }
    }, {
        key: "handleMouseMove",
        value: function handleMouseMove(e) {
            if (this.isMouseDown) {
                var mouseCoordRatioX = (this.state.maxX - this.state.minX) / this.props.width;
                var mouseCoordRatioY = (this.state.maxY - this.state.minY) / this.props.height;

                var dx = -e.movementX * mouseCoordRatioX;
                var dy = e.movementY * mouseCoordRatioY;

                this.setState({
                    minX: this.state.minX + dx,
                    minY: this.state.minY + dy,
                    maxX: this.state.maxX + dx,
                    maxY: this.state.maxY + dy
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { onMouseDown: this.handleMouseDown.bind(this), onMouseUp: this.handleMouseUp.bind(this),
                    onMouseLeave: this.handleMouseUp.bind(this),
                    onMouseMove: this.handleMouseMove.bind(this) },
                React.createElement(SVGDataListFactory, { width: this.props.width, height: this.props.height,
                    minX: this.state.minX, minY: this.state.minY, maxX: this.state.maxX, maxY: this.state.maxY, imageData: this.props.images })
            );
        }
    }]);

    return Plot;
}(React.Component);

function SVGDataListFactory(props) {
    var viewTrans = function viewTrans(xyPos) {
        var x = xyPos[0];
        var y = xyPos[1];

        var xTrans;
        var yTrans;

        if (Number.isFinite(x)) {
            xTrans = (x - props.minX) / (props.maxX - props.minX) * props.width;
        } else {
            if (x == Infinity) {
                xTrans = props.width;
            } else if (x == -Infinity) {
                xTrans = 0;
            }
        }

        if (Number.isFinite(y)) {
            yTrans = (props.maxY - y) / (props.maxY - props.minY) * props.height;
        } else {
            if (y == Infinity) {
                yTrans = 0;
            } else if (y == -Infinity) {
                yTrans = props.height;
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

    alphaTextClassName = "parameter-input";
    if (props.alphaError) {
        alphaTextClassName += " parameter-input-error";
    }

    betaTextClassName = "parameter-input";
    if (props.betaError) {
        betaTextClassName += " parameter-input-error";
    }

    return React.createElement(
        "form",
        { className: "parameter-spec" },
        React.createElement(
            "label",
            null,
            "Alpha:",
            React.createElement("input", { type: "text", className: alphaTextClassName, name: "alpha", value: props.alphaText, onChange: onAlphaChange }),
            React.createElement("input", { type: "range", min: "1", max: "100", value: props.alpha, onChange: onAlphaChange })
        ),
        React.createElement(
            "label",
            null,
            "Beta:",
            React.createElement("input", { type: "text", className: betaTextClassName, name: "beta", value: props.betaText, onChange: onBetaChange }),
            React.createElement("input", { type: "range", min: "1", max: "100", value: props.beta, onChange: onBetaChange })
        )
    );
}

// ========================================

ReactDOM.render(React.createElement(PlotApp, null), document.getElementById('root'));