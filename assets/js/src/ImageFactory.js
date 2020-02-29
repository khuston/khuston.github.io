import {BlogMath} from "./BlogMath.js"

export function FunctionImageFactory(funcToPlot, xInterval, numSegments) {
    let xArray = CreateRangeArray(xInterval, numSegments);

    let fullXYArray = xArray.map((x, i) => [x, funcToPlot(x)]);

    return ({
        type: 'evaluatedFunc2D',
        data: fullXYArray
    })
}


/*
    A more robust approach would be a CurveImageFactory that produces smooth points to plot
    a plane curve. Functions would be covered by the case where the plane curve is (x, f(x)).
*/
export function FunctionImageFactory_Adaptive(funcToPlot, xInterval, minNumSegments, aspectRatio=10) {
    var i;

    var yArray = [];
    var dydxArray = [];

    var x;

    let start = xInterval[0];
    let end = xInterval[1];

    let maxDx = (end - start)/minNumSegments;

    var xArray = CreateRangeArray(xInterval, minNumSegments)

    yArray = xArray.map(x => funcToPlot(x));
    dydxArray = xArray.map(x => BlogMath.Derivatives.Second_CenteredFiniteDifference_Simple(funcToPlot, x));

    // Replace any NaN or Infinity in dydx with max finite neighbor
    var prevDydx = [];
    var nextDydx = [];

    let prevNumber = 0;
    for (i = 0; i < dydxArray.length; i++) {
        let dydx = dydxArray[i];
        if (Number.isFinite(dydx)) {
            prevNumber = dydx;
        }
        prevDydx[i] = prevNumber;
    }

    let nextNumber = 0;
    for (i = dydxArray.length - 1; i >= 0; i--) {
        let dydx = dydxArray[i];
        if ( Number.isFinite(dydx)) {
            nextNumber = dydx;
        }
        nextDydx[i] = nextNumber;
    }

    let regularizedDydx = dydxArray.map((dydx, i) => (Number.isFinite(dydx) ? Math.abs(dydx) : Math.max(Math.abs(prevDydx[i]), Math.abs(nextDydx[i]))));

    // todo: verify the proper scaling for numExtraPoints
    let numExtraPointsArray = regularizedDydx.map(dydx => 2*Math.trunc((4.0*dydx/aspectRatio*maxDx + 1.0)/2.0));

    var j;
    var extraX;
    var extraXArray = [];
    var extraYArray = [];

    for (i = 0; i < xArray.length; i++) {
        x = xArray[i];
        let numExtraPoints = numExtraPointsArray[i];
        let dx = maxDx/numExtraPoints;

        for (j = 1; j <= numExtraPoints; j++) {
            extraX = (x - (maxDx + dx)/2.0 + j * dx);
            if ((start < extraX) && (extraX < end)) {
                extraXArray.push(extraX);
            }
        }
    }

    var y;

    for (i = 0; i < extraXArray.length; i++) {
        x = extraXArray[i];
        y = funcToPlot(x);
        extraYArray.push(y);
    }

    let fullXArray = xArray.concat(extraXArray);
    let fullYArray = yArray.concat(extraYArray);

    let fullXYArray = fullXArray.map((x, i) => [x, fullYArray[i]]);

    fullXYArray.sort(function (xy1, xy2) {
        let dx = xy2[0] - xy1[0];
        if (dx > 0) {
            return -1;
        }
        else if (dx < 0) {
            return 1;
        }
        else {
            return 0;
        }
    });

    return ({
        type: 'evaluatedFunc2D',
        data: fullXYArray
    })
}

function CreateRangeArray(xInterval, numSegments) {
    let start = xInterval[0];
    let end = xInterval[1];
    let dx = (end - start)/numSegments;

    var xArray = [];

    for (var i = 0; i <= numSegments; i++) {
        var x = start + i*dx;
        xArray.push(x);
    };

    return xArray;
}