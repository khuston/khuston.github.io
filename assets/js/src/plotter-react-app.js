function PlotApp(props)
{
    var image1 = {
        type: "data2D",
        data: [
            [10, -40],
            [20, -30],
            [30, -20],
            [40, -10]
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

    return (
        <div>
            <Plot images={imagesToPlot} width={250} height={250} />
            <ImageConfiguration />
            <h1>Hello World!</h1>
        </div>
    )
}

function Plot(props)
{
    return (
        <SVGDataListFactory width={props.width} height={props.height} minX={0} maxX={50} minY={-50} maxY={0} imageData={props.images} />
    )
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

    console.log(svgChildren);

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
    return (
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    )
}
  
  // ========================================
  
  ReactDOM.render(
    <PlotApp />,
    document.getElementById('root')
  );
  