import {draggable_rect_view} from "./DraggableView.js"

function PlotApp(props)
{
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

    let funcToPlot = (x) => BlogMath.BetaPDF(x, alpha, beta);

    var imagesToPlot = [
        FunctionImageFactory(funcToPlot, [0, 1], 40)
    ]

    let DraggablePlot = draggable_rect_view(Plot);

    return (
        <div className="plot-app">
            <DraggablePlot images={imagesToPlot} width={500} height={500} />
            <ImageConfiguration alpha={alpha} beta={beta} alphaText={alphaText} betaText={betaText}
            alphaError={alphaError} betaError={betaError}
            onAlphaChange={onAlphaChange} onBetaChange={onBetaChange}/>
        </div>
    )
}

const ViewControlType = {
    Undefined: 0,
    Static: 1,
    Draggable: 2,
}

function DraggablePlot2(props)
{
    viewControl = ViewControlFactory(ViewControlType.Draggable, [boundingRect, setBoundingRect], props.width, props.height);

    return (
        <div onMouseDown={viewControl.mouseDown} onMouseUp={viewControl.mouseUp}
        onMouseLeave={viewControl.mouseLeave} onMouseMove={viewControl.mouseMove}>
            <SVGDataListFactory width={props.width} height={props.height} boundingRect={viewControl.boundingRect} 
            imageData={props.images} />
        </div>
    )
}

function Plot(props)
{
    return (
        <div onMouseDown={props.handleMouseDown} onMouseUp={props.handleMouseUp}
        onMouseLeave={props.handleMouseLeave} onMouseMove={props.handleMouseMove}>
            <SVGDataListFactory width={props.width} height={props.height}
            boundingRect={props.boundingRect} imageData={props.images} />
        </div>
    )
}

function SVGDataListFactory(props)
{
    var viewTrans = function(xyPos){
        const x = xyPos[0]
        const y = xyPos[1]

        var xTrans;
        var yTrans;    
        
        let minX = props.boundingRect.minX;
        let minY = props.boundingRect.minY;
        let maxX = props.boundingRect.maxX;
        let maxY = props.boundingRect.maxY;

        if (Number.isFinite(x)) {
            xTrans = (x - minX)/(maxX - minX) * props.width
        }
        else {
            if (x == Infinity) {
                xTrans = props.width;
            }
            else if (x == -Infinity) {
                xTrans = 0;
            } else {
                throw "Unhandled non-finite value " + x.toString();
            }
        }

        if (Number.isFinite(y)) {
            yTrans = (maxY - y)/(maxY - minY) * props.height;
        }
        else {
            if (y == Infinity) {
                yTrans = 0;
            }
            else if (y == -Infinity) {
                yTrans = props.height;
            } else {
                throw "Unhandled non-finite value " + x.toString();
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

    var alphaTextClassName = "parameter-input"
    if (props.alphaError) {
        alphaTextClassName += " parameter-input-error"
    }

    var betaTextClassName = "parameter-input"
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
  