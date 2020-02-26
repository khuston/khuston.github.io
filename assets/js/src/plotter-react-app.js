function PlotApp(props)
{
    var image1 = {
        type: "data2D",
        data: [
            [10, 40],
            [20, 30],
            [30, 20],
            [40, 10]
        ]
    }

    var image2 = {
        type: "data2D",
        data: [
            [100, 0],
            [110, 10],
            [120, 20],
            [130, 30]
        ]
    }

    const [alpha, setAlpha] = React.useState(1);
    const [alphaText, setAlphaText] = React.useState('1');
    const [alphaError, setAlphaError] = React.useState(false);

    const [beta, setBeta] = React.useState(1);
    const [betaText, setBetaText] = React.useState('1');    
    const [betaError, setBetaError] = React.useState(false);    

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
            x = 0.01*i
            data.push([x, BlogMath.BetaPDF(x, alpha, beta)])
        }
    }

    var image3 = {
        type: 'data2D',
        data: data
    }

    let width = 500;
    let height = 500;
    let minX = 0;
    let minY = 0;
    let maxX = 1;
    let maxY = 20;

    aspectRatio = (maxY - minY)/(maxX - minX)*width/height;

    var imagesToPlot = [
        //image3
        FunctionImageFactory(x => BlogMath.BetaPDF(x, alpha, beta), 0, 1, 40, aspectRatio)
    ]

    return (
        <div className="plot-app">
            <Plot images={imagesToPlot} width={width} height={height} minX={minX} minY={minY} maxX={maxX} maxY={maxY}/>
            <ImageConfiguration alpha={alpha} beta={beta} alphaText={alphaText} betaText={betaText}
            alphaError={alphaError} betaError={betaError}
            onAlphaChange={onAlphaChange} onBetaChange={onBetaChange}/>
        </div>
    )
}

class Plot extends React.Component
{
    constructor(props) {
        super(props);

        this.isMouseDown = false;

        this.state = {
            minX: props.minX,
            minY: props.minY,
            maxX: props.maxX,
            maxY: props.maxY
        };
      }

    handleMouseDown() {
        this.isMouseDown = true;
    }

    handleMouseUp() {
        this.isMouseDown = false;
    }

    handleMouseMove(e) {
        if (this.isMouseDown) {
            var mouseCoordRatioX = (this.state.maxX - this.state.minX)/this.props.width
            var mouseCoordRatioY = (this.state.maxY - this.state.minY)/this.props.height

            var dx = -e.movementX*mouseCoordRatioX
            var dy = e.movementY*mouseCoordRatioY

            this.setState({
                minX: this.state.minX + dx,
                minY: this.state.minY + dy,
                maxX: this.state.maxX + dx,
                maxY: this.state.maxY + dy
            })
        }
    }

    render() {
        return (
            <div onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}
            onMouseLeave={this.handleMouseUp.bind(this)} 
            onMouseMove={this.handleMouseMove.bind(this)}>
            <SVGDataListFactory width={this.props.width} height={this.props.height}
            minX={this.state.minX} minY={this.state.minY} maxX={this.state.maxX} maxY={this.state.maxY} imageData={this.props.images} />
            </div>
        )
    }
}

function SVGDataListFactory(props)
{
    var viewTrans = function(xyPos){
        const x = xyPos[0]
        const y = xyPos[1]

        var xTrans;
        var yTrans;        

        if (Number.isFinite(x)) {
            xTrans = (x - props.minX)/(props.maxX - props.minX) * props.width
        }
        else {
            if (x == Infinity) {
                xTrans = props.width;
            }
            else if (x == -Infinity) {
                xTrans = 0;
            }
        }

        if (Number.isFinite(y)) {
            yTrans = (props.maxY - y)/(props.maxY - props.minY) * props.height;
        }
        else {
            if (y == Infinity) {
                yTrans = 0;
            }
            else if (y == -Infinity) {
                yTrans = props.height;
            }
        }

        return [xTrans, yTrans]
    }

    const svgChildren = props.imageData.map((imageData) => SVGDataFactory(imageData, getEntityStyleSpec, viewTrans)).flat();

    var svgProps = {
        width: props.width,
        height: props.height
    }

    return React.createElement('svg', svgProps, svgChildren)
}


function getEntityStyleSpec(imageData) {
    var dataEntityStyleSpec = {
        type: 'circle',
        r: 2,
        stroke: "black",
        fill: "black"
    }

    var lineEntityStyleSpec = {
        type: 'line',
        stroke: "black"
    }

    switch (imageData.type) {
        case 'data2D':
            return dataEntityStyleSpec;
        case 'evaluatedFunc2D':
            return lineEntityStyleSpec;
    }
}


function SVGDataFactory(imageData, getEntityStyleSpec, viewTrans)
{
    var svgChildren;

    var entityStyleSpec = getEntityStyleSpec(imageData);

    switch (imageData.type) {
        case 'data2D': {
            svgChildren = imageData.data.map((xyPos) => SVGPointElementFactory(entityStyleSpec, viewTrans(xyPos)))
            break;
        }
        case 'evaluatedFunc2D': {
            svgChildren = [];
            var i;
            for (i = 0; i < imageData.data.length - 1; i++) {
                var line = SVGLineElementFactory(entityStyleSpec, viewTrans(imageData.data[i]), viewTrans(imageData.data[i+1]));
                svgChildren.push(line);
            }
            break;
        }
        default: {
            svgChildren = [];
        }
    }
    return svgChildren;
}

function SVGPointElementFactory(entityStyleSpec, xyPos)
{
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

    return SVGElementFactory(entitySpec)
}

function SVGLineElementFactory(entityStyleSpec, xyPos1, xyPos2)
{
    var entitySpec = Object.assign({}, entityStyleSpec);

    switch (entitySpec.type) {
        case 'line':
            entitySpec.x1 = xyPos1[0];
            entitySpec.y1 = xyPos1[1];
            entitySpec.x2 = xyPos2[0];
            entitySpec.y2 = xyPos2[1];
            break;
    }

    return SVGElementFactory(entitySpec)
}

function SVGElementFactory(entitySpec)
{


    var entityProps = Object.assign({}, entitySpec);

    delete entityProps.type;

    return React.createElement(entitySpec.type, entityProps, [])
}

function ImageConfiguration(props)
{
    function onAlphaChange(e) {
        return props.onAlphaChange(e.target.value)
    }

    function onBetaChange(e) {
        return props.onBetaChange(e.target.value)
    }    

    alphaTextClassName = "parameter-input"
    if (props.alphaError) {
        alphaTextClassName += " parameter-input-error"
    }

    betaTextClassName = "parameter-input"
    if (props.betaError) {
        betaTextClassName += " parameter-input-error"
    }    

    return (
        <form className="parameter-spec">
            <label>
                Alpha:
                <input type="text" className={alphaTextClassName} name="alpha" value={props.alphaText} onChange={onAlphaChange}></input>
                <input type="range" min="1" max="100" value={props.alpha} onChange={onAlphaChange}></input>
            </label>
            <label>
                Beta:
                <input type="text" className={betaTextClassName} name="beta" value={props.betaText} onChange={onBetaChange}></input>
                <input type="range" min="1" max="100" value={props.beta} onChange={onBetaChange}></input>
            </label>            
        </form>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <PlotApp />,
    document.getElementById('root')
  );
  