import { BlogMath } from "./BlogMath.js";

export function FunctionImageFactory(funcToPlot, xInterval, numSegments) {
    var xArray = CreateRangeArray(xInterval, numSegments);

    var fullXYArray = xArray.map(function (x, i) {
        return [x, funcToPlot(x)];
    });

    return {
        type: 'evaluatedFunc2D',
        data: fullXYArray
    };
}

/*
    A more robust approach would be a CurveImageFactory that produces smooth points to plot
    a plane curve. Functions would be covered by the case where the plane curve is (x, f(x)).
*/
export function FunctionImageFactory_Adaptive(funcToPlot, xInterval, minNumSegments) {
    var aspectRatio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

    var i;

    var yArray = [];
    var dydxArray = [];

    var x;

    var start = xInterval[0];
    var end = xInterval[1];

    var maxDx = (end - start) / minNumSegments;

    var xArray = CreateRangeArray(xInterval, minNumSegments);

    yArray = xArray.map(function (x) {
        return funcToPlot(x);
    });
    dydxArray = xArray.map(function (x) {
        return BlogMath.Derivatives.Second_CenteredFiniteDifference_Simple(funcToPlot, x);
    });

    // Replace any NaN or Infinity in dydx with max finite neighbor
    var prevDydx = [];
    var nextDydx = [];

    var prevNumber = 0;
    for (i = 0; i < dydxArray.length; i++) {
        var dydx = dydxArray[i];
        if (Number.isFinite(dydx)) {
            prevNumber = dydx;
        }
        prevDydx[i] = prevNumber;
    }

    var nextNumber = 0;
    for (i = dydxArray.length - 1; i >= 0; i--) {
        var _dydx = dydxArray[i];
        if (Number.isFinite(_dydx)) {
            nextNumber = _dydx;
        }
        nextDydx[i] = nextNumber;
    }

    var regularizedDydx = dydxArray.map(function (dydx, i) {
        return Number.isFinite(dydx) ? Math.abs(dydx) : Math.max(Math.abs(prevDydx[i]), Math.abs(nextDydx[i]));
    });

    // todo: verify the proper scaling for numExtraPoints
    var numExtraPointsArray = regularizedDydx.map(function (dydx) {
        return 2 * Math.trunc((4.0 * dydx / aspectRatio * maxDx + 1.0) / 2.0);
    });

    var j;
    var extraX;
    var extraXArray = [];
    var extraYArray = [];

    for (i = 0; i < xArray.length; i++) {
        x = xArray[i];
        var numExtraPoints = numExtraPointsArray[i];
        var dx = maxDx / numExtraPoints;

        for (j = 1; j <= numExtraPoints; j++) {
            extraX = x - (maxDx + dx) / 2.0 + j * dx;
            if (start < extraX && extraX < end) {
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

    var fullXArray = xArray.concat(extraXArray);
    var fullYArray = yArray.concat(extraYArray);

    var fullXYArray = fullXArray.map(function (x, i) {
        return [x, fullYArray[i]];
    });

    fullXYArray.sort(function (xy1, xy2) {
        var dx = xy2[0] - xy1[0];
        if (dx > 0) {
            return -1;
        } else if (dx < 0) {
            return 1;
        } else {
            return 0;
        }
    });

    return {
        type: 'evaluatedFunc2D',
        data: fullXYArray
    };
}

function CreateRangeArray(xInterval, numSegments) {
    var start = xInterval[0];
    var end = xInterval[1];
    var dx = (end - start) / numSegments;

    var xArray = [];

    for (var i = 0; i <= numSegments; i++) {
        var x = start + i * dx;
        xArray.push(x);
    };

    return xArray;
}