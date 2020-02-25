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
        return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / this.Beta(alpha, beta);
    },

    // todo: implement this correctly.
    // https://en.wikipedia.org/wiki/Lanczos_approximation
    Beta2: function Beta2(x, y) {
        p = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

        return gamma(x) * gamma(y) / gamma(x + y);

        function gamma(z) {
            var x;
            var y;
            var z;
            var t;
            // z = BlogMath.complex(z)
            if (z /*.real*/ < 0.5) {
                y = Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z)); // Reflection
            } else {
                z -= 1;
                x = 0.99999999999980993;
                var i;
                for (i = 0; i < p.length; i++) {
                    x += p[i] / (z + i + 1);
                }
                t = z + p.length - 0.5;
                y = Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
            }
            return y; //drop_imag(y)
        }

        function drop_imag(z) {
            if (Math.abs(z.imag) <= BlogMath.EPSILON) {
                z = z.real;
            }
            return z;
        }
    },

    Beta: function Beta(x, y) {
        function integrand(t) {
            return Math.pow(t, x - 1.0) * Math.pow(1.0 - t, y - 1.0);
        }

        var numSteps = 10;

        return BlogMath.SimpsIntegral(integrand, 0, 1, numSteps);
    },
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
};