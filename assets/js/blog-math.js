var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BlogMath = {

    EPSILON: 1e-07,

    complex: function complex(z) {
        if ((typeof z === "undefined" ? "undefined" : _typeof(z)) == Number) {
            return {
                real: z,
                imag: 0
            };
        } else {
            return z;
        }
    },

    BetaPDF: function BetaPDF(x, alpha, beta) {
        var alphaTerm;
        var betaTerm;

        alphaTerm = (alpha - 1) * Math.log(x);
        betaTerm = (beta - 1) * Math.log(1 - x);

        if (x == 0) {
            if (alpha > 1) {
                return 0;
            } else if (alpha == 1) {
                alphaTerm = 0;
            } else {
                alphaTerm = Infinity;
            }
        } else if (x == 1) {
            if (beta > 1) {
                return 0;
            } else if (beta == 1) {
                betaTerm = 0;
            } else {
                betaTerm = Infinity;
            }
        }

        return Math.exp(alphaTerm + betaTerm - BlogMath.logBeta(alpha, beta));
    },

    // todo: implement this correctly.
    // https://en.wikipedia.org/wiki/Lanczos_approximation
    logBeta: function logBeta(x, y) {

        return logGamma(x) + logGamma(y) - logGamma(x + y);

        function logGamma(z) {
            var c = [1.000000000000000174663, 5716.400188274341379136, -14815.30426768413909044, 14291.49277657478554025, -6348.160217641458813289, 1301.608286058321874105, -108.1767053514369634679, 2.605696505611755827729, -0.7423452510201416151527e-2, 0.5384136432509564062961e-7, -0.4023533141268236372067e-8];

            var g = 9;

            var t = z + g;

            var k;
            var s = 0;

            for (k = g + 1; k >= 1; k--) {
                s = s + c[k] / t;
                t = t - 1;
            }

            s = s + c[0];
            var ss = z + g - 0.5;

            return Math.log(s * Math.sqrt(2 * Math.PI)) + (z - 0.5) * Math.log(ss) - ss;
        }
    },

    Integrals: {

        SimpsIntegral: function SimpsIntegral(funcToIntegrate, start, end, numSteps) {
            f = funcToIntegrate;

            var h = (end - start) / numSteps;

            var sum = 0;

            var i;
            var x;
            var term;

            for (i = 0; i <= numSteps; i++) {
                x = start + h * i;
                switch (i) {
                    case 0:
                        term = f(x) + 4 * f(x + h / 2.0);
                        break;
                    case numSteps:
                        term = f(end);
                        break;
                    default:
                        term = 2 * f(x) + 4 * f(x + h / 2.0);
                }

                sum = sum + term;
            }

            return h * sum / 6;
        }
    },

    Derivatives: {
        /* 1st derivative with 2-point stencil */
        Second_CenteredFiniteDifference_Simple: function Second_CenteredFiniteDifference_Simple(func, x) {
            var h = 1e-3;

            return (func(x + h) - 2.0 * func(x) + func(x - h)) / (h * h);
        }
    }
};