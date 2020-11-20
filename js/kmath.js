/**
 * kMath
 *
 * @export
 */
export function kMath() {

    const self = this;

    // Floating point constants (use with caution!)

    this.EPSILON = 2.2204460492503130808472633361816E-16;

    this.PHI = 1.61803398874989484820458683436564; // @constant {Number} (1+sqrt(5))/2
    this.TAU = 6.28318530717958647692528676655901; // @constant {Number} 2 pi
    this.PI2 = 1.57079632679489661923132169163975; // @constant {Number} pi/2
    this.GAMMA = 0.57721566490153286060651209008240; // @constant {Number} lim_(n->infty)(H_n-lnn)
    this.ZETA2 = 1.64493406684822643647241516664603; // @constant {Number} zeta(2)
    this.LOG2P = 0.91893853320467274178032973640562; // @constant {Number} 1/2 (log(2)+log(\[Pi]))
    this.SQRT2PI = 2.50662827463100050241576528481105; // @constant {Number} sqrt(2 pi)
    this.SQRT2 = 1.41421356237309504880168872420970; // @constant {Number} sqrt(2)
    this.F2 = 0.36602540378443864676372317075294; // @constant {Number} 1/(1 + sqrt(3))
    this.F3 = 0.33333333333333333333333333333333; // @constant {Number} 1/3
    this.F4 = 0.30901699437494742410229341718282; // @constant {Number} 1/(1 + sqrt(5))
    this.G2 = 0.21132486540518711774542560974902; // @constant {Number} 1/(3 + sqrt(3))
    this.G3 = 0.16666666666666666666666666666667; // @constant {Number} 1/6
    this.G4 = 0.13819660112501051517954131656344; // @constant {Number} 1/(5 + sqrt(5))
    this.H2 = 0.57735026918962576450914878050196; // @constant {Number} 1/(sqrt(3))
    this.TWOLN2 = 1.3862943611198906188344642429164; // @constant {Number} 2 ln(2)

    
    /**
     * Get OEIS sequence by ID
     *
     * @param {*} id
     * @returns {Array} of integers if sequence is found, false otherwise
     */
    this.getSequenceById = async (id) => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // TODO: register @ OEIS
        const url = `https://oeis.org/search?q=id:${id}&fmt=json`;
        const response = await fetch(proxyurl + url);
        const json = await response.json();
        if (json.results.length) {
            const results = json.results[0]; // Grab first sequence
            const data = results.data; // Get sequence data
            const array = data.split(","); // Explode
            return array.map(el => parseInt(el)); // Return array of integers
        }
        return false;
    }
    
    
    /**
     * Map an array of numerators to an array of denominators
     *
     * @param {Array} numerators
     * @param {Array} denominators
     * @returns {Array} of integers
     */
    this.mapNandD = (numerators, denominators) => numerators.map((numerator, i) => denominators[i]/numerator);


    // @constant {Array} abs(ζ(1 - floor(2 k)))
    this.B2 = [
        1/12, 
        1/120, 
        1/252, 
        1/240, 
        1/132, 
        691/32760, 
        1/12, 
        3617/8160, 
        43867/14364, 
        174611/6600, 
        77683/276, 
        236364091/65520, 
        657931/12
    ];

    // @constant {Array} Numerators of harmonic numbers H(n) = Sum_{i=1..n} 1/i.
    this.HN0 = [
        1, 
        3, 
        11, 
        25, 
        137, 
        49, 
        363, 
        761, 
        7129, 
        7381, 
        83711, 
        86021, 
        1145993, 
        1171733, 
        1195757, 
        2436559, 
        42142223, 
        14274301, 
        275295799, 
        55835135, 
        18858053, 
        19093197, 
        444316699, 
        1347822955,
        34052522467, 
        34395742267, 
        312536252003, 
        315404588903, 
        9227046511387
    ]
    
    // @constant {Array} Denominators of harmonic numbers H(n) = Sum_{i=1..n} 1/i  
    this.HN1 = [
        1, 
        2, 
        6, 
        12, 
        60,
        20, 
        140, 
        280, 
        2520, 
        2520, 
        27720, 
        27720, 
        360360, 
        360360, 
        360360, 
        720720, 
        12252240, 
        4084080, 
        77597520, 
        15519504, 
        5173168, 
        5173168, 
        118982864, 
        356948592, 
        8923714800, 
        8923714800, 
        80313433200, 
        80313433200, 
        2329089562800
    ]

    this.GAMMAINT = [
        0, 
        1, 
        3/2, 
        11/6, 
        25/12, 
        137/60, 
        49/20, 
        363/140, 
        761/280, 
        7129/2520, 
        7381/2520, 
        83711/27720
    ];

    this.GAMMAINT_TEST_VALUES = [ 
        -0.5772156649015329, 
        0.42278433509846713, 
        0.9227843350984671, 
        1.2561176684318003, 
        1.5061176684318007, 
        1.7061176684318005, 
        1.8727843350984674, 
        2.01564147795561,  
        2.14064147795561, 
        2.2517525890667214, 
        2.351752589066721, 
        2.4426616799758123 
    ];

    this.GAMMAHALFINT = [
        0,
        2,
        46/15,
        352/105,
        1126/315,
        13016/3465,
        176138/45045,
        182144/45045,
        3186538/765765,
        62075752/14549535,
        63461422/14549535,
        1488711776/334639305
    ];

    this.GAMMAHALFINT_TEST_VALUES = [ 
        -1.9635100260214235, 
        0.03648997397857652, 
        0.7031566406452432, 
        1.103156640645243, 
        1.388870926359529, 
        1.611093148581751, 
        1.792911330399933, 
        1.9467574842460866, 
        2.08009081757942, 
        2.1977378764029494, 
        2.303001034297686, 
        2.398239129535781
    ];


    /*
     * csc
     *
     * @param {Number} x
     * @returns {x}
     */
    this.csc = x => 1.0 / Math.sin(x);


    /*
     * sinh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.cosh = x => 0.5 * (Math.exp(x) + Math.exp(-x));


    /*
     * sinh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.sinh = c => {
        let d;
        let b;
        let h;
        let e;
        let f;
        let g;
        if (0 === c)
            return 0;
        if (d = Math.abs(c), 0.12 > d) {
            d = self.b / 10;
            h = c * c;
            e = b = g = 1;
            for (f = 0; b > d;) {
                f += 8 * g - 2;
                g++;
                b *= h / f;
                e += b;
            }
            return c * e;
        }
        return 0.36 > d ?
            (b = self.sinh(c / 3), b * (3 + 4 * b * b)) :
            (b = Math.exp(c), (b - 1 / b) / 2);
    };


    /*
     * tanh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.tanh = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));


    /*
     * csch
     *
     * @param {Number} x
     * @returns {x}
     */
    this.csch = x => 2 / (Math.exp(x) - Math.exp(-x));


    /*
     * acoth
     *
     * @param {Number} x
     * @returns {x}
     */
    this.coth = x => 1 / self.tanh(x);


    /*
     * acosh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.acosh = x => Math.log(x + Math.sqrt(x * x - 1));


    /*
     * asinh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.asinh = x => Math.log(x + Math.sqrt(x * x + 1));


    /*
     * atanh
     *
     * @param {Number} x
     * @returns {x}
     */
    this.atanh = x => 0.5 * Math.log((1 + x) / (1 - x));


    /*
     * Fast Sine Approximation
     *
     * @param {Number} x
     * @returns {x}
     */
    this.fsin = x => {
        let b;
        let c;
        return x *= 5214, c = x << 17, x -= 8192, x <<= 18, x >>= 18,
            x = x * x >> 12, b = 19900 - (3516 * x >> 14), b = 4096 - (x * b >> 16),
            0 > c && (b = -b), 2.44E-4 * b;
    };


    /*
     * Fast Cosine Approximation
     *
     * @param {Number} x
     * @returns {x}
     */
    this.fcos = (a, b) => {
        a = 8192 - 5215.19 * a, b = a << 17, a = a - 8192 << 18 >> 18, a = 4096 - ((a * a >> 12) * (19900 - (3516 * (a * a >> 12) >> 14)) >> 16);
        return .0 > b && (a = -a), 2.44E-4 * a;
    };


    /*
     * Unit Step
     *
     * @param {Number} x
     * @returns {x}
     */
    this.unitstep = x => (x >= 0) ? (x ? 1 : 0.5) : 0;


    /*
     * Dirac Delta
     *
     * @param {Number} x
     * @returns {x}
     */
    this.diracdelta = x => (x === 0) ? Infinity : 0;


    /*
     * Kronecker Delta
     *
     * @param {Number} i
     * @param {Number} j
     * @returns {x}
     */
    this.kroneckerdelta = (i, j) => (i === j) ? 1 : 0;


    /*
     * Sgn
     *
     * @param {Number} x
     * @returns {x}
     */
    this.sgn = x => typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;


    /*
     * Sinc
     *
     * @param {Number} x
     * @returns {x}
     */
    this.sinc = x => (x === 0) ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);


    /*
     * Triangle (naive)
     *
     * @param {Number} x
     * @returns {x}
     */
    this.triangle = x => x - Math.floor(x);


    /*
     * Mod
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {x}
     */
    this.mod = (x, y) => x - Math.floor(x / y) * y;


    /*
     * Square Wave Approximation
     *
     * @param {Number} x
     * @param {Number} m Partials
     * @returns {x}
     */
     this.square = (a, b) => {
       return 0.5 * (Math.cos(self.TAU * b * Math.cos(a)) * ((self.digamma(0.75 - b * Math.cos(a)) - self.digamma(0.25 - b * Math.cos(a))) / Math.PI) - 1);
     };


    /*
     * Square Wave Approximation
     *
     * @param {Number} x
     * @param {Number} m Partials
     * @returns {x}
     */
    this.square12 = (a, b) => {
        return 0.5 * (Math.cos(self.TAU * b * Math.cos(a)) * ((self.digamma12(0.75 - b * Math.cos(a)) - self.digamma12(0.25 - b * Math.cos(a))) / Math.PI) - 1);
    };


    /*
     * Factorial
     *
     * @param {Number} x
     * @returns {x}
     */
    this.factorial = x => {

        // Empty product
        if (x === 0) {
            return 1;
        }
        // Complex Infinity
        else if (x > 170 || x < 0) {
            return Infinity;
        }
        // Factor
        else {
            let v = x;
            while (x > 1) {
                v *= --x;
            }
            return v;
        }
    };


    /*
     * Log Gamma
     *
     * @param {Number} x
     * @returns {x}
     */
    this.lngamma = x => {
        let v = 0;
        let signum = 1;

        // Integer values reduce to simple factorial
        if (x % 1 === 0) {
            return Math.log(self.factorial(x - 1));
        }

        // The gamma function alternates sign between poles,
        // with the forward recurrence product containing an
        // odd/even number of factors corresponding to the number
        // of poles between x and 1-x. Thus, Euler's reflection formula
        // can be understood in the literal sense as a type of
        // inverse sync function, or -- nascently -- a delta.
        //
        // Half integer values
        else if (x < 0.5) {

            // When x is negative and the floor is even
            if (x < 0 && ~~x % 2 === 0) {

                // Central binomial coefficient (n=2)
                signum = -1;

                // TODO: Inverting the sign returns the real part of the
                // reciprocal gamma function. Complex values
                // should be computed here.
            }

            // Compute the logarithm of the product
            v = Math.log(signum * Math.PI / Math.sin(Math.PI * x));

            // Euler's reflection formula
            return v - self.lngamma(1 - x);
        }
        // Approximation for all other values
        else {

            // Lancsoz approximation, numerator
            const n = 3.409662655323161e6 + x * (4.1623878911888916e6 + x * (2.222880419448303e6 + x * (678289.7014752217 + x * (129347.25852000745 + x * (15784.880455151022 + x * (1203.8342012464082 + x * (52.458333328046045 + x)))))));

            // Denominator
            const d = x * (5040 + x * (13068 + x * (13132 + x * (6769 + x * (1960 + x * (322 + x * (28 + x)))))));

            // (1/2)*log(2*pi) ...
            v = self.LOG2P - (6.5 + x) - (0.5 * Math.log(6.5 + x)) + (x * Math.log(6.5 + x));

            return v + Math.log(n / d);
        }
    };


    /*
     * Gamma Function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.gamma = x => {

        // Integer values reduce to simple factorial
        if (x % 1 === 0) {
            return self.factorial(x - 1);
        } else if (x < 0) {
            return -Math.PI / (x * Math.sin(Math.PI * x) * self.gamma(-x));
        } else {

            // Lancsoz approximation, numerator
            const n = 3.4096626553343013e6 + x * (4.1623878912255694e6 + x * (2.2228804194936445e6 + x * (678289.7015023368 + x * (129347.25852873185 + x * (15784.880456697823 + x * (1203.8342013887075 + x * (52.458333333333336 + x)))))));

            // denominator ...
            const d = x * (5040 + x * (13068 + x * (13132 + x * (6769 + x * (1960 + x * (322 + x * (28 + x)))))));

            return Math.sqrt(Math.PI * 2) * Math.exp(-x - 6.5 + (x - 0.5) * Math.log(x + 6.5)) * n / d;
        }
    };


    /*
     * Digamma Function
     *
     * @param {Number} x
     * @returns {x}
     */
   this.digamma = b => {
     let c = 0;
     if (0 >= b && b === Math.round(b)) {
       return Infinity;
     }
     if (0 > b) {
       return self.digamma(1.0 - b) + Math.PI / Math.tan(-Math.PI * b);
     }
     if (b <= Number.EPSILON) {
       return 1.64493406684822643647241516664603 * b - 1.0 / b + 0.57721566490153286060651209008240;
     }
     for (; 8.0 > b; b += 1) {
       c -= 1.0 / b;
     }
     return c += Math.log(b) - 0.5 / (b *= b) - (0.08333333333333333 - (0.008333333333333333 - (0.0039682539682539 - (0.004166666666666 - 1 / (132 * b)) / b) / b) / b) / b;
   };
   

   
    /*
     * Precision Digamma Function
     *
     * @param {Number} x
     * @returns {x}
     */
   this.digamma12 = (x, PRECISION) => {

    // Defaults to 12, est. max ~32678*12
    if (!PRECISION) {
        PRECISION = 12;
    }
    var v = 0;
    
    /* If the absolute value of x is less than epsilon we assume zero */
    /* TODO: this should return Complex Infinity */   
    if (Math.abs(x) < Number.EPSILON) {      
      return Infinity;
    }
    /* For negative integers we return Infinity */
    /* TODO: this should return Complex Infinity */
    if (Number.isInteger(x) && x < 0) {
      return Infinity;
    }
    /* Special values at positive integers (table lookup) */
    if (Number.isInteger(x) && x < 12) {
        return self.GAMMAINT[x-1] - self.GAMMA;
    }
    /* Special values at positive half-integers (table lookup) */
    if (Number.isInteger(x-1/2) && x < 25/2) {
        return self.GAMMAHALFINT[x-1/2] - self.GAMMA - self.TWOLN2;
    }
    /* Small values (0.000001) */
    if (Math.abs(x) <= 1e-6) {
      /* Positive x */
      if (x > 0) {
          return self.GAMMA - 1 / x + self.ZETA2;
      }
      /* Negative x */
      if (x < 0) {
          return self.digamma12(1 - x) + Math.PI / Math.tan(-Math.PI * x);
      }
    }
  
    for (; PRECISION > x; x += 1) {
      v -= 1.0 / x;
    }
  
    return (v +=
      Math.log(x) -
      0.5 / (x *= x) -
      (self.B2[0] -
        (self.B2[1] -
          (self.B2[2] -
            (self.B2[3] -
              (self.B2[4] -
                (self.B2[5] -
                  (self.B2[6] -
                    (self.B2[7] -
                      (self.B2[8] -
                        (self.B2[9] - (self.B2[10] - (self.B2[11] - self.B2[12] / x) / x) / x) / x) /
                        x) /
                      x) /
                    x) /
                  x) /
                x) /
              x) /
            x) /
          x) /
        x);
    }

    /*
     * Harmonic Number
     *
     * @param {Number} x
     * @returns {x}
     */
    this.H = x => self.digamma(++x) + self.GAMMA;


    /*
     * Precision Harmonic Number
     *
     * @param {Number} x
     * @returns {x}
     */
    this.H12 = x => self.digamma12(++x) + self.GAMMA;

    /*
     * Phi Distribution
     *
     * @param {Number} x
     * @returns {x}
     */
    this.phi = x => {

        const signum = (x < 0) ? -1 : 1;

        x = Math.abs(x) / self.SQRT2;

        return 0.5 * (1 + signum * (1 - (((((1.061405429 * (1 / (1 + 0.3275911 * x)) - 1.453152027) * (1 / (1 + 0.3275911 * x))) + 1.421413741) * (1 / (1 + 0.3275911 * x)) - 0.284496736) * (1 / (1 + 0.3275911 * x)) + 0.254829592) * (1 / (1 + 0.3275911 * x)) * Math.exp(-x * x)));
    };


    /*
     * Fresnel C Function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.fresnelc = d => {
        d *= self.SQRT2PI / 2;

        const a = d * d;
        const e = a * a;
        let b = 0;
        let c = 0;

        if (0.1 > a) {
            c = 2 * a * d / 3 * Math.exp(-e / 14);
        } else if (15 > a) {
            b = 2 * ~~(6 + 1.2 * a);
            do {
                c = 1 / (2 * b - 5) - e * c / (b * (b + 1));
                b -= 2;
            } while (0 < b);
            c = -(Math.sin(a) / a + 2 * Math.cos(a) + 3 * c) / (2 * d);
        } else {
            b = 2 * ~~(4 + 60 / a);
            c = 1;
            do {
                c = 1 - c * (b - 0.5) * (b - 1.5) / e;
                b -= 2;
            } while (0 < b);
            c = (-c * Math.cos(a) - Math.sin(a) / 2 / a + Math.sqrt(Math.PI * a / 2)) / d;
        }
        return c / self.SQRT2PI;
    };


    /*
     * Riemann Zeta Function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.zeta = b => {
        let a;
        let c = Math.PI;
        if (0 === b) {
            return -0.5;
        }
        if (1 == b) {
            return Infinity;
        }
        if (2 == b) {
            return a * a / 6;
        }
        if (4 == b) {
            return a * a * a * a / 90;
        }
        if (1 > b) {
            return Infinity;
        }
        for (a = 4.4 * (b ** -5.1), c = 1; 10 > c; c++) {
            a += c ** -b;
        }
        return a;
    };


    /*
     * Error function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.erf = a => {

        const b = 0 > a ? -1 : 1;

        a = Math.abs(a);

        a = 1 - 1 / (1 + 0.3275911 * a) * (1 / (1 + 0.3275911 * a) * (1 / (1 + 0.3275911 * a) * (1 / (1 + 0.3275911 * a) * (1 / (1 + 0.3275911 * a) * 1.061405429 - 1.453152027) + 1.421413741) - 0.284496736) + 0.254829592) * Math.exp(-a * a);

        return b * a;
    };


    /*
     * Machine epsilon
     *
     * @returns {x}
     */
    this.epsilon = () => {
        let a = 1;
        let b;
        let c;
        do {
            c = a;
            a /= 2;
            b = 1 + a;
        } while (b > 1);
        return c;
    };


    /*
     * Cantor "Devil's Staircase" Function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.cantor = x => {
        if (x <= 0) {
            return 0;
        }
        if (x >= 1) {
            return 1;
        }

        let a = 0;
        let b = 0.5;
        let c;

        do {
            c = Math.floor(x *= 3);
            x %= 1;

            if (c) {
                a += b;
            }
            b /= 2;
        } while (c != 1 && x && b + a != a);
        return a;
    };


    /*
     * Convert float to int
     *
     * @param {Number} x
     * @returns {x} Integer
     */
    this.int = x => x | 0;


    /*
     * Fast floor function
     *
     * @param {Number} x
     * @returns {x}
     */
    this.floor32 = x => x < 0 ? (x | 0) - 1 : x | 0;


    /*
     * Calculates a number between two numbers at a specific increment.
     *
     * @param {Number} x
     * @param {Number} v0
     * @param {Number} v1
     * @returns {Number}
     */
    this.lerp = (x, v0, v1) => v0 + (v1 - v0) * x;


    /*
     * Clamp a value to an interval
     *
     * @param {Number} x The value to clamp
     * @param {Number} v0 The lower clamp threshold
     * @param {Number} v1 The upper clamp threshold
     * @returns {Number} The clamped value
     */
    this.clamp = (x, v0, v1) => x < v0 ? v0 : x > v1 ? v1 : x;


    /*
     * Normalizes a value from a given range (min, max) into a value between -1.0 and 1.0
     *
     * @param {Number} x The value to normalize
     * @param {Number} v0 The minimum value of the normalization
     * @param {Number} v1 The maximum value of the normalization
     * @returns {Number} The normalized value
     */
    this.normalize = function(x, v0, v1) {
        return this.clamp((x - v0) / (v1 - v0), -1.0, 1.0);
    };


    /*
     * Re-maps a value from one range to another
     *
     * @param {Number} x The value to re-map
     * @param {Number} v0 The minimum input value
     * @param {Number} v1 The maximum input value
     * @param {Number} vx0 The minimum output value
     * @param {Number} vx1 The maximum output value
     * @param {Boolean} clamp Results if True
     * @returns {Number} The re-mapped value
     */
    this.map = (x, v0, v1, vx0, vx1, clamp) => {
        if (Math.abs(v0 - v1) < 1e-15) {
            return vx0;
        } else {
            let _x = ((x - v0) / (v1 - v0) * (vx1 - vx0) + vx0);
            if (clamp) {
                if (vx1 < vx0) {
                    if (_x < vx1) {
                        _x = vx1;
                    } else if (_x > vx0) {
                        _x = vx0;
                    }
                } else {
                    if (_x > vx1) {
                        _x = vx1;
                    } else if (_x < vx0) {
                        _x = vx0;
                    }
                }
            }
            return _x;
        }
    };


    /*
     * Calculates distance between two points (Pythagorean Theorem)
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Number}
     */
    this.dist = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));


    /*
     * Calculates the distances between two points, as in dist()
     * but doesn't take the sqrt() of the result, which is a faster
     * operation if you need to calculate and compare multiple distances.
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Number}
     */
    this.distSquared = (x1, y1, x2, y2) => (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);


    /*
     * Random float
     *
     * @param {Number} min
     * @param {Number} max
     * @param {Number} precision
     * @returns {Number}
     */
    this.randomFloat = (min, max, precision) => {

        if (typeof(precision) === 'undefined') {
            precision = 2;
        }

        return parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(precision));
    };


    /*
     * Random integer
     *
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    this.randomInt = function(min, max) {
        return this.floor32(Math.random() * (max - min + 1) + min);
    };


    /*
     * Random permutation
     *
     * @param {Number} index
     * @returns {Array}
     */
    this.randomPerm = function(index) {

        const perm = new Float32Array(index);

        for (let n = index; n >= 0; n -= 1) {

            const z = perm[n];
            const x = this.floor32(Math.random() * (index + 1));

            perm[n] = perm[x];
            perm[x] = z;
        }

        return perm;
    };


    /*
     * Bit Divisor
     *
     * @param {Number} bits
     * @returns {Number}
     */
    this.bitDivisor = bits => 1 << (bits - 1);


    /*
     * Bit Mask
     *
     * @param {Number} bits
     * @returns {Number}
     */
    this.bitMask = bits => (1 << bits) - 1;


    /*
     * Bit Shift
     *
     * @param {Number} x
     * @param {Number} bits
     * @returns {Number}
     */
    this.bitShift = (x, bits) => (self.bitMask(bits) & x) / self.bitDivisor(bits);

    /*
     * Permutation table
     *
     * @constant {Float32Array}
     */
    this.permutation = new Float32Array([151, 160, 137, 91, 90, 15,
        131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
        190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
        88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
        77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
        102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
        135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
        5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
        223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
        129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
        251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
        49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
        138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
    ]);

    /*
     * Permutation table modulo 12
     *
     * @constant {Float32Array}
     */
    this.permMod12 = new Float32Array([
        7, 4, 5, 7, 6, 3, 11, 1, 9, 11, 0, 5, 2, 5, 7, 9, 8, 0, 7, 6, 9, 10, 8, 3, 1, 0, 9, 10, 11, 10, 6, 4, 7, 0, 6, 3,
        0, 2, 5, 2, 10, 0, 3, 11, 9, 11, 11, 8, 9, 9, 9, 4, 9, 5, 8, 3, 6, 8, 5, 4, 3, 0, 8, 7, 2, 9, 11, 2, 7, 0, 3, 10,
        5, 2, 2, 3, 11, 3, 1, 2, 0, 7, 1, 2, 4, 9, 8, 5, 7, 10, 5, 4, 4, 6, 11, 6, 5, 1, 3, 5, 1, 0, 8, 1, 5, 4, 0, 7, 4, 5,
        6, 1, 8, 4, 3, 10, 8, 8, 3, 2, 8, 4, 1, 6, 5, 6, 3, 4, 4, 1, 10, 10, 4, 3, 5, 10, 2, 3, 10, 6, 3, 10, 1, 8, 3, 2,
        11, 11, 11, 4, 10, 5, 2, 9, 4, 6, 7, 3, 2, 9, 11, 8, 8, 2, 8, 10, 7, 10, 5, 9, 5, 11, 11, 7, 4, 9, 9, 10, 3, 1, 7,
        2, 0, 2, 7, 5, 8, 4, 10, 5, 4, 8, 2, 6, 1, 0, 11, 10, 2, 1, 10, 6, 0, 0, 11, 11, 6, 1, 9, 3, 1, 7, 9, 2, 11, 11, 1,
        0, 10, 7, 1, 7, 10, 1, 4, 0, 0, 8, 7, 1, 2, 9, 7, 4, 6, 2, 6, 8, 1, 9, 6, 6, 7, 5, 0, 0, 3, 9, 8, 3, 6, 6, 11, 1,
        0, 0, 7, 4, 5, 7, 6, 3, 11, 1, 9, 11, 0, 5, 2, 5, 7, 9, 8, 0, 7, 6, 9, 10, 8, 3, 1, 0, 9, 10, 11, 10, 6, 4, 7, 0, 6, 3,
        0, 2, 5, 2, 10, 0, 3, 11, 9, 11, 11, 8, 9, 9, 9, 4, 9, 5, 8, 3, 6, 8, 5, 4, 3, 0, 8, 7, 2, 9, 11, 2, 7, 0, 3, 10, 5,
        2, 2, 3, 11, 3, 1, 2, 0, 7, 1, 2, 4, 9, 8, 5, 7, 10, 5, 4, 4, 6, 11, 6, 5, 1, 3, 5, 1, 0, 8, 1, 5, 4, 0, 7, 4, 5,
        6, 1, 8, 4, 3, 10, 8, 8, 3, 2, 8, 4, 1, 6, 5, 6, 3, 4, 4, 1, 10, 10, 4, 3, 5, 10, 2, 3, 10, 6, 3, 10, 1, 8, 3, 2,
        11, 11, 11, 4, 10, 5, 2, 9, 4, 6, 7, 3, 2, 9, 11, 8, 8, 2, 8, 10, 7, 10, 5, 9, 5, 11, 11, 7, 4, 9, 9, 10, 3, 1, 7,
        2, 0, 2, 7, 5, 8, 4, 10, 5, 4, 8, 2, 6, 1, 0, 11, 10, 2, 1, 10, 6, 0, 0, 11, 11, 6, 1, 9, 3, 1, 7, 9, 2, 11, 11, 1,
        0, 10, 7, 1, 7, 10, 1, 4, 0, 0, 8, 7, 1, 2, 9, 7, 4, 6, 2, 6, 8, 1, 9, 6, 6, 7, 5, 0, 0, 3, 9, 8, 3, 6, 6, 11, 1, 0, 0
    ]);

    /*
     * A lookup table to traverse the simplex around a given point in 4D.
     *
     * @constant {Float32Array}
     */
    this.simplexLookup = new Float32Array([
        [0, 1, 2, 3],
        [0, 1, 3, 2],
        [0, 0, 0, 0],
        [0, 2, 3, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 2, 3, 0],
        [0, 2, 1, 3],
        [0, 0, 0, 0],
        [0, 3, 1, 2],
        [0, 3, 2, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 3, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 2, 0, 3],
        [0, 0, 0, 0],
        [1, 3, 0, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 3, 0, 1],
        [2, 3, 1, 0],
        [1, 0, 2, 3],
        [1, 0, 3, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 3, 1],
        [0, 0, 0, 0],
        [2, 1, 3, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 1, 3],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [3, 0, 1, 2],
        [3, 0, 2, 1],
        [0, 0, 0, 0],
        [3, 1, 2, 0],
        [2, 1, 0, 3],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [3, 1, 0, 2],
        [0, 0, 0, 0],
        [3, 2, 0, 1],
        [3, 2, 1, 0]
    ]);



    /*
     * Compute 1d Gradients
     *
     * @param {Number} hash
     * @param {Number} x
     * @returns {Number}
     */
    this.gradient1d = (hash, x) => {

        const h = (hash & 15) | 0;

        // Gradient value 1.0, 2.0, ..., 8.0
        let grad = 1.0 + (h & 7);

        // Set a random sign for the gradient
        if (h & 8) {
            grad = -grad;
        }

        // Multiply the gradient with the distance
        return (grad * x);
    };


    /*
     * Compute 2d Gradients
     *
     * @param {Number} hash
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    this.gradient2d = (hash, x, y) => {

        // Convert low 3 bits of hash code into 8 simple
        // gradient directions, and compute dot product

        const h = (hash & 7) | 0;
        const u = h < 4 ? x : y;
        const v = h < 4 ? y : x;

        return ((h & 1) ? -u : u) + ((h & 2) ? -2.0 * v : 2.0 * v);
    };

    /*
     * Compute 3d Gradients
     *
     * @param {Number} hash
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Number}
     */
    this.gradient3d = (hash, x, y, z) => {

        // Convert low 4 bits of hash code into 12 simple
        // gradient directions, and compute dot product.

        const h = (hash & 15) | 0;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    };

    /*
     * Compute 4d Gradients
     *
     * @param {Number} hash
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} t
     * @returns {Number}
     */
    this.gradient4d = (hash, x, y, z, t) => {

        // Convert low 5 bits of hash code into 32 simple
        // gradient directions, and compute dot product.

        const h = (hash & 31) | 0;
        const u = h < 24 ? x : y;
        const v = h < 16 ? y : z;
        const w = h < 8 ? z : t;

        return ((h & 1) ? -u : u) + ((h & 2) ? -v : v) + ((h & 4) ? -w : w);
    };

    /*
     * 1d Signed Simplex Noise
     *
     * @param {Number} x
     * @returns {Number}
     */
    this.signedNoise1d = x => {

        const i0 = self.floor32(x);
        const i1 = i0 + 1;

        const x0 = x - i0;
        const x1 = x0 - 1.0;

        let t1 = 1.0 - x1 * x1;
        let t0 = 1.0 - x0 * x0;

        const n0 = (t0 *= t0) * t0 * self.gradient1d(self.permutation[i0 & 0xff], x0);
        const n1 = (t1 *= t1) * t1 * self.gradient1d(self.permutation[i1 & 0xff], x1);

        // The maximum value of this noise is 8*(3/4)^4 = 2.53125
        // A factor of 0.395 would scale to fit exactly within [-1,1], but
        // we want to match PRMan's 1D noise, so we scale it down some more.
        return 0.25 * (n0 + n1);
    };

    /*
     * 2d Signed ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    this.signedNoise2d = (x, y) => {

        // Skew the input space to determine which simplexLookup cell we're in
        let i = self.floor32(x + (x + y) * self.F2);
        let j = self.floor32(y + (x + y) * self.F2);

        // The x,y distances from the cell origin
        const x0 = x - i + (i + j) * self.G2;
        const y0 = y - j + (i + j) * self.G2;

        let i1 = 0;
        let j1 = 1;

        // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        }

        // Offsets for middle corner in (x,y) unskewed coords
        const x1 = x0 - i1 + self.G2;
        const y1 = y0 - j1 + self.G2;

        // Offsets for last corner in (x,y) unskewed coords
        const x2 = x0 - self.H2;
        const y2 = y0 - self.H2;

        i = i % 256;
        j = j % 256;

        const t0 = 0.5 - x0 * x0 - y0 * y0;
        const t1 = 0.5 - x1 * x1 - y1 * y1;
        const t2 = 0.5 - x2 * x2 - y2 * y2;

        const n0 = t0 * t0 * t0 * t0 * self.gradient2d(self.permutation[i + self.permutation[j]], x0, y0);
        const n1 = t1 * t1 * t1 * t1 * self.gradient2d(self.permutation[i + i1 + self.permutation[j + j1]], x1, y1);
        const n2 = t2 * t2 * t2 * t2 * self.gradient2d(self.permutation[i + 1 + self.permutation[j + 1]], x2, y2);

        return 40.0 * (n0 + n1 + n2);
    };

    /*
     * 3d Signed ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Number}
     */
    this.signedNoise3d = (x, y, z) => {
        // Skew the input space to determine which simplexLookup cell we're in
        const s = (x + y + z) * self.F3;

        const i = self.floor32(x + s);
        const j = self.floor32(y + s);
        const k = self.floor32(z + s);

        const t = (i + j + k) * self.G3;

        // The x,y,z distances from the cell origin
        const x0 = x - (i - t);
        const y0 = y - (j - t);
        const z0 = z - (k - t);

        let i1;
        let j1;
        let k1;
        let i2;
        let j2;
        let k2;

        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        } else {
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }

        // Offsets for second corner in (x,y,z) coords
        const x1 = x0 - i1 + self.G3;
        const y1 = y0 - j1 + self.G3;
        const z1 = z0 - k1 + self.G3;

        // Offsets for third corner in (x,y,z) coords
        const x2 = x0 - i2 + self.F3;
        const y2 = y0 - j2 + self.F3;
        const z2 = z0 - k2 + self.F3;

        // Offsets for last corner in (x,y,z) coords
        const x3 = x0 - 0.5;
        const y3 = y0 - 0.5;
        const z3 = z0 - 0.5;

        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;

        const n0 = t0 < 0.0 ? 0.0 : (t0 *= t0) * t0 * self.gradient3d(self.permMod12[i + self.permutation[j + self.permutation[k]]], x0, y0, z0);
        const n1 = t1 < 0.0 ? 0.0 : (t1 *= t1) * t1 * self.gradient3d(self.permMod12[i + i1 + self.permutation[j + j1 + self.permutation[k + k1]]], x1, y1, z1);
        const n2 = t2 < 0.0 ? 0.0 : (t2 *= t2) * t2 * self.gradient3d(self.permMod12[i + i2 + self.permutation[j + j2 + self.permutation[k + k2]]], x2, y2, z2);
        const n3 = t3 < 0.0 ? 0.0 : (t3 *= t3) * t3 * self.gradient3d(self.permMod12[i + 1 + self.permutation[j + 1 + self.permutation[k + 1]]], x3, y3, z3);

        return 32.0 * (n0 + n1 + n2 + n3);
    };

    /*
     * 4d Signed ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     * @returns {Number}
     */
    this.signedNoise4d = (x, y, z, w) => {
        let n0;
        let n1;
        let n2;
        let n3;
        let n4;
        /* Noise contributions from the five corners */

        /* Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in */
        const s = (x + y + z + w) * self.F4;/* Factor for 4D skewing */
        const xs = x + s;
        const ys = y + s;
        const zs = z + s;
        const ws = w + s;
        let i = self.floor32(xs);
        let j = self.floor32(ys);
        let k = self.floor32(zs);
        const l = self.floor32(ws);

        const t = (i + j + k + l) * self.G4;/* Factor for 4D unskewing */
        const X0 = i - t;/* Unskew the cell origin back to (x,y,z,w) space */
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;

        const x0 = x - X0;/* The x,y,z,w distances from the cell origin */
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;

        /* For the 4D case, the simplexLookup is a 4D shape I won't even try to describe. */
        /* To find out which of the 24 possible simplices we're in, we need to */
        /* determine the magnitude ordering of x0, y0, z0 and w0. */
        /* The method below is a good way of finding the ordering of x,y,z,w and */
        /* then find the correct traversal order for the simplexLookup we're in. */
        /* First, six pair-wise comparisons are performed between each possible pair */
        /* of the four coordinates, and the results are used to add up binary bits */
        /* for an integer index. */
        const c1 = self.int((x0 > y0) ? 32 : 0);
        const c2 = self.int((x0 > z0) ? 16 : 0);
        const c3 = self.int((y0 > z0) ? 8 : 0);
        const c4 = self.int((x0 > w0) ? 4 : 0);
        const c5 = self.int((y0 > w0) ? 2 : 0);
        const c6 = self.int((z0 > w0) ? 1 : 0);
        const c = c1 + c2 + c3 + c4 + c5 + c6;

        let i1;
        let j1;
        let k1;
        let l1;

        /* The integer offsets for the second simplexLookup corner */
        let i2;

        let j2;
        let k2;
        let l2;

        /* The integer offsets for the third simplexLookup corner */
        let i3;

        let j3;
        let k3;
        let l3;

        /* The integer offsets for the fourth simplexLookup corner */

        let x1;

        let y1;
        let z1;
        let w1;
        let x2;
        let y2;
        let z2;
        let w2;
        let x3;
        let y3;
        let z3;
        let w3;
        let x4;
        let y4;
        let z4;
        let w4;
        let ll;
        let t0;
        let t1;
        let t2;
        let t3;
        let t4;

        /* simplexLookup[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order. */
        /* Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w */
        /* impossible. Only the 24 indices which have non-zero entries make any sense. */
        /* The number 3 in the "simplexLookup" array is at the position of the largest coordinate. */
        i1 = self.simplexLookup[c][0] >= 3 ? 1 : 0;
        j1 = self.simplexLookup[c][1] >= 3 ? 1 : 0;
        k1 = self.simplexLookup[c][2] >= 3 ? 1 : 0;
        l1 = self.simplexLookup[c][3] >= 3 ? 1 : 0;
        /* The number 2 in the "simplexLookup" array is at the second largest coordinate. */
        i2 = self.simplexLookup[c][0] >= 2 ? 1 : 0;
        j2 = self.simplexLookup[c][1] >= 2 ? 1 : 0;
        k2 = self.simplexLookup[c][2] >= 2 ? 1 : 0;
        l2 = self.simplexLookup[c][3] >= 2 ? 1 : 0;
        /* The number 1 in the "simplexLookup" array is at the second smallest coordinate. */
        i3 = self.simplexLookup[c][0] >= 1 ? 1 : 0;
        j3 = self.simplexLookup[c][1] >= 1 ? 1 : 0;
        k3 = self.simplexLookup[c][2] >= 1 ? 1 : 0;
        l3 = self.simplexLookup[c][3] >= 1 ? 1 : 0;
        /* The fifth corner has all coordinate offsets = 1, so no need to look that up. */

        x1 = x0 - i1 + self.G4;/* Offsets for second corner in (x,y,z,w) coords */
        y1 = y0 - j1 + self.G4;
        z1 = z0 - k1 + self.G4;
        w1 = w0 - l1 + self.G4;
        x2 = x0 - i2 + 2.0 * self.G4;/* Offsets for third corner in (x,y,z,w) coords */
        y2 = y0 - j2 + 2.0 * self.G4;
        z2 = z0 - k2 + 2.0 * self.G4;
        w2 = w0 - l2 + 2.0 * self.G4;
        x3 = x0 - i3 + 3.0 * self.G4;/* Offsets for fourth corner in (x,y,z,w) coords */
        y3 = y0 - j3 + 3.0 * self.G4;
        z3 = z0 - k3 + 3.0 * self.G4;
        w3 = w0 - l3 + 3.0 * self.G4;
        x4 = x0 - 1.0 + 4.0 * self.G4;/* Offsets for last corner in (x,y,z,w) coords */
        y4 = y0 - 1.0 + 4.0 * self.G4;
        z4 = z0 - 1.0 + 4.0 * self.G4;
        w4 = w0 - 1.0 + 4.0 * self.G4;

        /* Wrap the integer indices at 256, to avoid indexing permutation[] out of bounds */
        i = i % 256;
        j = j % 256;
        k = k % 256;
        ll = l % 256;

        /* Calculate the contribution from the five corners */
        t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0.0) {
            n0 = 0.0;
        } else {
            t0 *= t0;
            n0 = t0 * t0 * self.gradient4d(self.permutation[i + self.permutation[j + self.permutation[k + self.permutation[ll]]]], x0, y0, z0, w0);
        }

        t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0.0) {
            n1 = 0.0;
        } else {
            t1 *= t1;
            n1 = t1 * t1 * self.gradient4d(self.permutation[i + i1 + self.permutation[j + j1 + self.permutation[k + k1 + self.permutation[ll + l1]]]], x1, y1, z1, w1);
        }

        t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0.0) {
            n2 = 0.0;
        } else {
            t2 *= t2;
            n2 = t2 * t2 * self.gradient4d(self.permutation[i + i2 + self.permutation[j + j2 + self.permutation[k + k2 + self.permutation[ll + l2]]]], x2, y2, z2, w2);
        }

        t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0.0) {
            n3 = 0.0;
        } else {
            t3 *= t3;
            n3 = t3 * t3 * self.gradient4d(self.permutation[i + i3 + self.permutation[j + j3 + self.permutation[k + k3 + self.permutation[ll + l3]]]], x3, y3, z3, w3);
        }

        t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0.0) {
            n4 = 0.0;
        } else {
            t4 *= t4;
            n4 = t4 * t4 * self.gradient4d(self.permutation[i + 1 + self.permutation[j + 1 + self.permutation[k + 1 + self.permutation[ll + 1]]]], x4, y4, z4, w4);
        }

        /* Sum up and scale the result to cover the range [-1,1] */
        return 27.0 * (n0 + n1 + n2 + n3 + n4); /* TODO: The scale factor is preliminary! */
    };

    /*
     * 1d ofSimplex Noise
     *
     * @param {Number} x
     * @returns {Number}
     */
    this.simplexNoise1d = x => self.signedNoise1d(x) * 0.5 + 0.5;

    /*
     * 2d ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {Number}
     */
    this.simplexNoise2d = (x, y) => self.signedNoise2d(x, y) * 0.5 + 0.5;

    /*
     * 3d ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {Number}
     */
    this.simplexNoise3d = (x, y, z) => self.signedNoise3d(x, y, z) * 0.5 + 0.5;

    /*
     * 4d ofSimplex Noise
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     * @returns {Number}
     */
    this.simplexNoise4d = (x, y, z, w) => self.signedNoise4d(x, y, z, w) * 0.5 + 0.5;
};
