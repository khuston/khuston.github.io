import {flatten} from "./ArrayUtils.js"

export function Plot(props) {
    return (
        <div onMouseDown={props.handleMouseDown} onMouseUp={props.handleMouseUp}
            onMouseLeave={props.handleMouseLeave} onMouseMove={props.handleMouseMove}>
            <SVGDataListFactory width={props.width} height={props.height}
                boundingRect={props.boundingRect} imageData={props.images} />
        </div>
    )
}

function SVGDataListFactory(props) {
    const svgChildren = []

    let viewTrans = ViewTransformFactory(props.boundingRect, props.width, props.height);

    for (var i = 0; i < props.imageData.length; i ++) {
        let imageData = props.imageData[i];
        try {
            svgChildren.push(SVGDataFactory(imageData, getEntityStyleSpec, viewTrans));
        } catch (error) {
            console.log(error.message);
        }
    }

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

function SVGDataFactory(imageData, getEntityStyleSpec, viewTrans) {
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
                var line = SVGLineElementFactory(entityStyleSpec, viewTrans(imageData.data[i]), viewTrans(imageData.data[i + 1]));
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

    return SVGElementFactory(entitySpec)
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

    return SVGElementFactory(entitySpec)
}

function SVGElementFactory(entitySpec) {


    var entityProps = Object.assign({}, entitySpec);

    delete entityProps.type;

    return React.createElement(entitySpec.type, entityProps, [])
}


function ViewTransformFactory(boundingRect, width, height) { 
    return function viewTrans(xyPos) {
        var x = xyPos[0];
        var y = xyPos[1];

        var xTrans;
        var yTrans;

        var minX = boundingRect.minX;
        var minY = boundingRect.minY;
        var maxX = boundingRect.maxX;
        var maxY = boundingRect.maxY;

        if (Number.isFinite(x)) {
            xTrans = (x - minX) / (maxX - minX) * width;
        } else {
            if (x == Infinity) {
                xTrans = width;
            } else if (x == -Infinity) {
                xTrans = 0;
            } else {
                throw "Unhandled non-finite value " + x.toString();
            }
        }

        if (Number.isFinite(y)) {
            yTrans = (maxY - y) / (maxY - minY) * height;
        } else {
            if (y == Infinity) {
                yTrans = 0;
            } else if (y == -Infinity) {
                yTrans = height;
            } else {
                throw "Unhandled non-finite value " + y.toString();
            }
        }

        return [xTrans, yTrans];
    };
}