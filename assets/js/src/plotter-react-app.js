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

    var imagesToPlot = [
        image1,
        image2
    ]

    const [alpha, setAlpha] = React.useState(0);

    const [beta, setBeta] = React.useState(0);

    function onAlphaChange(newAlpha) {
        setAlpha(newAlpha);
    }

    function onBetaChange(newBeta) {
        setBeta(newBeta);
    }    

    return (
        <div className="plot-app">
            <Plot images={imagesToPlot} width={width} height={height} />
            <ImageConfiguration alpha={alpha} beta={beta} onAlphaChange={onAlphaChange} onBetaChange={onBetaChange}/>
        </div>
    )
}

class Plot extends React.Component
{
    constructor(props) {
        super(props);

        this.isMouseDown = false;

        this.state = {
            minX: 0,
            minY: 0,
            maxX: 50,
            maxY: 50
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
            var mouseCoordRatio = (this.state.maxY - this.state.minY)/this.props.height

            var dx = -e.movementX*mouseCoordRatio
            var dy = e.movementY*mouseCoordRatio

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
    var entityStyleSpec = {
        type: 'circle',
        r: 2,
        stroke: "black",
        fill: "black"
    }

    var viewTrans = function(xyPos){
        const x = xyPos[0]
        const y = xyPos[1]
        return [(x - props.minX)/(props.maxX - props.minX) * props.width, (props.maxY - y)/(props.maxY - props.minY) * props.height]
    }

    const svgChildren = props.imageData.map((imageData) => SVGDataFactory(imageData, entityStyleSpec, viewTrans)).flat();

    var svgProps = {
        width: props.width,
        height: props.height
    }

    return React.createElement('svg', svgProps, svgChildren)
}


function SVGDataFactory(imageData, entityStyleSpec, viewTrans)
{
    var svgChildren;

    switch (imageData.type) {
        case 'data2D': {
            svgChildren = imageData.data.map((xyPos) => SVGPointElementFactory(entityStyleSpec, viewTrans(xyPos)))
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

    return (
        <form>
            <label>
                Alpha:
                <input type="text" name="alpha" onChange={onAlphaChange}></input>
            </label>
            <label>
                Beta:
                <input type="text" name="beta" onChange={onBetaChange}></input>
            </label>            
        </form>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <PlotApp />,
    document.getElementById('root')
  );
  