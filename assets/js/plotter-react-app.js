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

    var imagesToPlot = [image1, image2];

    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        alpha = _React$useState2[0],
        setAlpha = _React$useState2[1];

    var _React$useState3 = React.useState(0),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        beta = _React$useState4[0],
        setBeta = _React$useState4[1];

    function onAlphaChange(newAlpha) {
        setAlpha(newAlpha);
    }

    function onBetaChange(newBeta) {
        setBeta(newBeta);
    }

    return React.createElement(
        "div",
        { className: "plot-app" },
        React.createElement(Plot, { images: imagesToPlot, width: width, height: height }),
        React.createElement(ImageConfiguration, { alpha: alpha, beta: beta, onAlphaChange: onAlphaChange, onBetaChange: onBetaChange })
    );
}

var Plot = function (_React$Component) {
    _inherits(Plot, _React$Component);

    function Plot(props) {
        _classCallCheck(this, Plot);

        var _this = _possibleConstructorReturn(this, (Plot.__proto__ || Object.getPrototypeOf(Plot)).call(this, props));

        _this.isMouseDown = false;

        _this.state = {
            minX: 0,
            minY: 0,
            maxX: 50,
            maxY: 50
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
                var mouseCoordRatio = (this.state.maxY - this.state.minY) / this.props.height;

                var dx = -e.movementX * mouseCoordRatio;
                var dy = e.movementY * mouseCoordRatio;

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
    var entityStyleSpec = {
        type: 'circle',
        r: 2,
        stroke: "black",
        fill: "black"
    };

    var viewTrans = function viewTrans(xyPos) {
        var x = xyPos[0];
        var y = xyPos[1];
        return [(x - props.minX) / (props.maxX - props.minX) * props.width, (props.maxY - y) / (props.maxY - props.minY) * props.height];
    };

    var svgChildren = props.imageData.map(function (imageData) {
        return SVGDataFactory(imageData, entityStyleSpec, viewTrans);
    }).flat();

    var svgProps = {
        width: props.width,
        height: props.height
    };

    return React.createElement('svg', svgProps, svgChildren);
}

function SVGDataFactory(imageData, entityStyleSpec, viewTrans) {
    var svgChildren;

    switch (imageData.type) {
        case 'data2D':
            {
                svgChildren = imageData.data.map(function (xyPos) {
                    return SVGPointElementFactory(entityStyleSpec, viewTrans(xyPos));
                });
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

    return React.createElement(
        "form",
        null,
        React.createElement(
            "label",
            null,
            "Alpha:",
            React.createElement("input", { type: "text", name: "alpha", onChange: onAlphaChange })
        ),
        React.createElement(
            "label",
            null,
            "Beta:",
            React.createElement("input", { type: "text", name: "beta", onChange: onBetaChange })
        )
    );
}

// ========================================

ReactDOM.render(React.createElement(PlotApp, null), document.getElementById('root'));