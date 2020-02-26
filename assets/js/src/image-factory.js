/*
    A more robust approach would be a CurveImageFactory that produces smooth points to plot
    a plane curve. Functions would be covered by the case where the plane curve is (x, f(x)).
*/
function FunctionImageFactory(funcToPlot, start, end, minNumSegments, aspectRatio) {
    var i;

    var xArray = [];
    var yArray = [];
    var dydxArray = [];

    var x;

    var maxDx = (end - start)/minNumSegments;

    for (i = 0; i <= minNumSegments; i++) {

        x = start + i*maxDx;
        xArray.push(x);
    }

    yArray = xArray.map(x => funcToPlot(x));
    dydxArray = xArray.map(x => BlogMath.Derivatives.Second_CenteredFiniteDifference_Simple(funcToPlot, x));

    // Replace any NaN or Infinity in dydx with max finite neighbor
    var prevDydx = [];
    var nextDydx = [];

    prevNumber = 0;
    for (i = 0; i < dydxArray.length; i++) {
        dydx = dydxArray[i];
        if (Number.isFinite(dydx)) {
            prevNumber = dydx;
        }
        prevDydx[i] = prevNumber;
    }

    nextNumber = 0;
    for (i = dydxArray.length - 1; i >= 0; i--) {
        dydx = dydxArray[i];
        if ( Number.isFinite(dydx)) {
            nextNumber = dydx;
        }
        nextDydx[i] = nextNumber;
    }

    regularizedDydx = dydxArray.map((dydx, i) => (Number.isFinite(dydx) ? Math.abs(dydx) : Math.max(Math.abs(prevDydx[i]), Math.abs(nextDydx[i]))));

    // todo: verify the proper scaling for numExtraPoints
    numExtraPointsArray = regularizedDydx.map(dydx => 2*Math.trunc((4.0*dydx/aspectRatio*maxDx + 1.0)/2.0));

    var j;
    var extraX;
    var extraXArray = [];
    var extraYArray = [];

    for (i = 0; i < xArray.length; i++) {
        x = xArray[i];
        numExtraPoints = numExtraPointsArray[i];
        dx = maxDx/numExtraPoints;

        for (j = 1; j <= numExtraPoints; j++) {
            extraX = (x - (maxDx + dx)/2.0 + j * dx);
            extraXArray.push(extraX);
        }
    }

    var y;

    for (i = 0; i < extraXArray.length; i++) {
        x = extraXArray[i];
        y = funcToPlot(x);
        extraYArray.push(y);
    }

    fullXArray = xArray.concat(extraXArray);
    fullYArray = yArray.concat(extraYArray);

    fullXYArray = fullXArray.map((x, i) => [x, fullYArray[i]]);

    fullXYArray.sort(function (xy1, xy2) {
        dx = xy2[0] - xy1[0];
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