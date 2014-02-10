/*
 * kMath
 *
 * "... ersatz of Math"
 */

var kMath = {

	/* global Uint8Array, Float32Array */

	/* @constant {Number} 1/(1 + sqrt(3)) */
	F2: 0.36602540378444,

	/* @constant {Number} 1/3 */
	F3: 0.33333333333332,
    
	/* @constant {Number} 1/(1 + sqrt(5)) */
	F4: 0.30901699437495,

	/* @constant {Number} 1/(3 + sqrt(3)) */
	G2: 0.21132486540519,

	/* @constant {Number} 1/6 */
	G3: 0.16666666666667,

	/* @constant {Number} 1/(5 + sqrt(5)) */
	G4: 0.13819660112501,

	/*
	 * Convert float to int
	 *
	 * @param {Number} x
	 * @returns {x} Integer
	 */
	int: function (x) {
		return x | 0;
	},

	/*
	 * Fast floor function
	 *
	 * @param {Number} x
	 * @returns {x}
	 */
	floor32: function (x) {
		return x < 0 ? (x | 0) - 1 : x | 0;
	},

	/*
	 * Calculates a number between two numbers at a specific increment.
	 *
	 * @param {Number} x
	 * @param {Number} v0
	 * @param {Number} v1
	 * @returns {Number}
	 */
	lerp: function (x, v0, v1) {
		return v0 + (v1 - v0) * x;
	},

	/*
	 * Clamp a value to an interval
	 *
	 * @param {Number} x The value to clamp
	 * @param {Number} v0 The lower clamp threshold
	 * @param {Number} v1 The upper clamp threshold
	 * @returns {Number} The clamped value
	 */
	clamp: function (x, v0, v1) {
		return x < v0 ? v0 : x > v1 ? v1 : x;
	},

	/*
	 * Normalizes a value from a given range (min, max) into a value between -1.0 and 1.0
	 *
	 * @param {Number} x The value to normalize
	 * @param {Number} v0 The minimum value of the normalization
	 * @param {Number} v1 The maximum value of the normalization
	 * @returns {Number} The normalized value
	 */
	normalize: function (x, v0, v1) {
		return this.clamp((x - v0) / (v1 - v0), -1.0, 1.0);
	},

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
	map: function (x, v0, v1, vx0, vx1, clamp) {
		if (Math.abs(v0 - v1) < 1e-15) {
			return vx0;
		} else {
			var _x = ((x - v0) / (v1 - v0) * (vx1 - vx0) + vx0);
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
	},

	/*
	 * Calculates distance between two points (Pythagorean Theorem)
	 *
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @returns {Number}
	 */
	dist: function (x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	},

	/*
	 * Calculates the distances between two points, as in ofDist()
	 * but doesn't take the sqrt() of the result, which is a faster
	 * operation if you need to calculate and compare multiple distances.
	 *
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @returns {Number}
	 */
	distSquared: function (x1, y1, x2, y2) {
		return ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	},

	/*
	 * Return 1 if n is positive, 0 if n = 0, and -1 if n is negative.
	 *
	 * @param {Number} n
	 * @returns {Number}
	 */
	sign: function (n) {
		if (n > 0) {
			return 1;
		} else if (n < 0) {
			return -1;
		} else {
			return 0;
		}
	},

	/*
	 * Random float
	 *
	 * @param {Number} min
	 * @param {Number} max
	 * @param {Number} precision
	 * @returns {Number}
	 */
	randomFloat: function (min, max, precision) {
		
		if (typeof (precision) === 'undefined') { precision = 2; }
		
		return parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(precision));
	},
	
	/*
	 * Random integer
	 *
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */
	randomInt: function (min, max) {
		return this.floor32(Math.random() * (max - min + 1) + min);
	},
	
	/*
	 * Random permutation
	 *
	 * @param {Number} index
	 * @returns {Array}
	 */
	randomPerm: function (index) {

		var perm = new Float32Array(index);

		for (var n = index; n >= 0; n -= 1) {

			var z = perm[n];			
			var x = this.floor32(Math.random() * (index + 1));

			perm[n] = perm[x];
			perm[x] = z;
		}

		return perm;
	},
	
	/*
	 * Bit Divisor
	 *
	 * @param {Number} bits
	 * @returns {Number}
	 */
	bitDivisor: function (bits) {
		return 1 << (bits - 1);
	},	
       
	/*
	 * Bit Mask
	 *
	 * @param {Number} bits
	 * @returns {Number}
	 */
	bitMask: function (bits) {
		return (1 << bits) - 1;
	},
		
	/*
	 * Bit Shift
	 *
	 * @param {Number} x
	 * @param {Number} bits	 
	 * @returns {Number}
	 */
	bitShift: function (x, bits) {
		return (this.bitMask() & x) / this.bitDivisor();
	},

	/*
	 * Permutation table
	 *
	 * @constant {Float32Array}
	 */
	permutation: new Float32Array([151, 160, 137, 91, 90, 15,
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
		138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]),
	
	/*
	 * Permutation table modulo 12
	 *
	 * @constant {Float32Array}
	 */
	permMod12: new Float32Array([
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
    ]),
	
	/*
	 * A lookup table to traverse the simplex around a given point in 4D.
	 *
	 * @constant {Float32Array}
	 */
	simplexLookup: new Float32Array([
		[0, 1, 2, 3], [0, 1, 3, 2], [0, 0, 0, 0], [0, 2, 3, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 0],
		[0, 2, 1, 3], [0, 0, 0, 0], [0, 3, 1, 2], [0, 3, 2, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 3, 2, 0],
		[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
		[1, 2, 0, 3], [0, 0, 0, 0], [1, 3, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 3, 0, 1], [2, 3, 1, 0],
		[1, 0, 2, 3], [1, 0, 3, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 3, 1], [0, 0, 0, 0], [2, 1, 3, 0],
		[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
		[2, 0, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 1, 2], [3, 0, 2, 1], [0, 0, 0, 0], [3, 1, 2, 0],
		[2, 1, 0, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 1, 0, 2], [0, 0, 0, 0], [3, 2, 0, 1], [3, 2, 1, 0]
	]),
	

	/*
	 * Compute 1d Gradients
	 *
	 * @param {Number} hash
	 * @param {Number} x
	 * @returns {Number}
	 */
	gradient1d: function (hash, x) {

		var h = (hash & 15) | 0;

		// Gradient value 1.0, 2.0, ..., 8.0
		var grad = 1.0 + (h & 7);

		// Set a random sign for the gradient
		if (h & 8) {
			grad = -grad;
		}

		// Multiply the gradient with the distance
		return (grad * x);
	},
	
	/*
	 * Compute 2d Gradients
	 *
	 * @param {Number} hash
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Number}
	 */
	gradient2d: function (hash, x, y) {

		// Convert low 3 bits of hash code into 8 simple
		// gradient directions, and comput dot product

		var h = (hash & 7) | 0;
		var u = h < 4 ? x : y;
		var v = h < 4 ? y : x;

		return ((h & 1) ? -u : u) + ((h & 2) ? -2.0 * v : 2.0 * v);
	},
	
	/*
	 * Compute 3d Gradients
	 *
	 * @param {Number} hash
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @returns {Number}
	 */
	gradient3d: function (hash, x, y, z) {

		// Convert low 4 bits of hash code into 12 simple
		// gradient directions, and compute dot product.

		var h = (hash & 15) | 0;
		var u = h < 8 ? x : y;
		var v = h < 4 ? y : h === 12 || h === 14 ? x : z;
		return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
	},
	
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
	gradient4d: function (hash, x, y, z, t) {

		// Convert low 5 bits of hash code into 32 simple
		// gradient directions, and compute dot product.

		var h = (hash & 31) | 0;
		var u = h < 24 ? x : y;
		var v = h < 16 ? y : z;
		var w = h < 8 ? z : t;

		return ((h & 1) ? -u : u) + ((h & 2) ? -v : v) + ((h & 4) ? -w : w);
	},
	
	/*
	 * 1d Signed Simplex Noise
	 *
	 * @param {Number} x
	 * @returns {Number}
	 */
	signedNoise1d: function (x) {

		var i0 = this.floor32(x);
		var i1 = i0 + 1;

		var x0 = x - i0;
		var x1 = x0 - 1.0;

		var t1 = 1.0 - x1 * x1;
		var t0 = 1.0 - x0 * x0;

		var n0 = (t0 *= t0) * t0 * this.gradient1d(this.permutation[i0 & 0xff], x0);
		var n1 = (t1 *= t1) * t1 * this.gradient1d(this.permutation[i1 & 0xff], x1);

		// The maximum value of this noise is 8*(3/4)^4 = 2.53125
		// A factor of 0.395 would scale to fit exactly within [-1,1], but
		// we want to match PRMan's 1D noise, so we scale it down some more.
		return 0.25 * (n0 + n1);
	},
	
	/*
	 * 2d Signed ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Number}
	 */
	signedNoise2d: function (x, y) {

		// Noise contributions from the three corners
		var n0, n1, n2;

		// Skew the input space to determine which simplexLookup cell we're in
		var s = (x + y) * this.F2;
		var xs = x + s;
		var ys = y + s;
		var i = this.floor32(xs);
		var j = this.floor32(ys);

		var t = (i + j) * this.G2;
		 
		// Unskew the cell origin back to (x,y) space
		var X0 = i - t;
		var Y0 = j - t;
		
		// The x,y distances from the cell origin
		var x0 = x - X0;
		var y0 = y - Y0;

		var x1, y1, x2, y2;
		var t0, t1, t2;
		
		// Offsets for second (middle) corner of simplexLookup in (i,j) coords
		var i1, j1;
		
		// lower triangle, XY order: (0,0)->(1,0)->(1,1)
		if (x0 > y0) {
			i1 = 1;
			j1 = 0;
		}
		// upper triangle, YX order: (0,0)->(0,1)->(1,1)
		else {
			i1 = 0;
			j1 = 1;
		} 

		// Offsets for middle corner in (x,y) unskewed coords
		x1 = x0 - i1 + this.G2;
		y1 = y0 - j1 + this.G2;

		// Offsets for last corner in (x,y) unskewed coords
		x2 = x0 - 1.0 + 2.0 * this.G2;
		y2 = y0 - 1.0 + 2.0 * this.G2;

		// Wrap the integer indices at 256, to avoid indexing permutation[] out of bounds
		i = i % 256;
		j = j % 256;

		// Calculate the contribution from the three corners
		t0 = 0.5 - x0 * x0 - y0 * y0;
		
		if (t0 < 0.0) {
			n0 = 0.0;
		} else {
			t0 *= t0;
			n0 = t0 * t0 * this.gradient2d(this.permutation[i + this.permutation[j]], x0, y0);
		}

		t1 = 0.5 - x1 * x1 - y1 * y1;
		
		if (t1 < 0.0) {
			n1 = 0.0;
		} else {
			t1 *= t1;
			n1 = t1 * t1 * this.gradient2d(this.permutation[i + i1 + this.permutation[j + j1]], x1, y1);
		}

		t2 = 0.5 - x2 * x2 - y2 * y2;
		
		if (t2 < 0.0) {
			n2 = 0.0;
		} else {
			t2 *= t2;
			n2 = t2 * t2 * this.gradient2d(this.permutation[i + 1 + this.permutation[j + 1]], x2, y2);
		}

		// Add contributions from each corner to get the final noise value.
		// The result is scaled to return values in the interval [-1,1].
		
		return 40.0 * (n0 + n1 + n2);
	},
	
	/*
	 * 3d Signed ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @returns {Number}
	 */
	signedNoise3d: function (x, y, z) {

		// Skew the input space to determine which simplexLookup cell we're in
		var s = (x + y + z) * this.F3;

		var i = this.floor32(x + s);
		var j = this.floor32(y + s);
		var k = this.floor32(z + s);

		var t = (i + j + k) * this.G3;

		// The x,y,z distances from the cell origin
		var x0 = x - (i - t);
		var y0 = y - (j - t);
		var z0 = z - (k - t);

		var i1, j1, k1, i2, j2, k2;

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
		var x1 = x0 - i1 + this.G3;
		var y1 = y0 - j1 + this.G3;
		var z1 = z0 - k1 + this.G3;

		// Offsets for third corner in (x,y,z) coords
		var x2 = x0 - i2 + this.F3;
		var y2 = y0 - j2 + this.F3;
		var z2 = z0 - k2 + this.F3;

		// Offsets for last corner in (x,y,z) coords
		var x3 = x0 - 0.5;
		var y3 = y0 - 0.5;
		var z3 = z0 - 0.5;

		// Calculate the contribution from the four corners
		var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
		var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
		var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
		var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;

		var n0 = t0 < 0.0 ? 0.0 : (t0 *= t0) * t0 * this.gradient3d(this.permMod12[i + this.permutation[j + this.permutation[k]]], x0, y0, z0);
		var n1 = t1 < 0.0 ? 0.0 : (t1 *= t1) * t1 * this.gradient3d(this.permMod12[i + i1 + this.permutation[j + j1 + this.permutation[k + k1]]], x1, y1, z1);
		var n2 = t2 < 0.0 ? 0.0 : (t2 *= t2) * t2 * this.gradient3d(this.permMod12[i + i2 + this.permutation[j + j2 + this.permutation[k + k2]]], x2, y2, z2);
		var n3 = t3 < 0.0 ? 0.0 : (t3 *= t3) * t3 * this.gradient3d(this.permMod12[i + 1 + this.permutation[j + 1 + this.permutation[k + 1]]], x3, y3, z3);

		return 32.0 * (n0 + n1 + n2 + n3);
	},
	
	/*
	 * 4d Signed ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {Number} w
	 * @returns {Number}
	 */
	signedNoise4d: function (x, y, z, w) {

		var n0, n1, n2, n3, n4; /* Noise contributions from the five corners */

		/* Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in */
		var s = (x + y + z + w) * this.F4; /* Factor for 4D skewing */
		var xs = x + s;
		var ys = y + s;
		var zs = z + s;
		var ws = w + s;
		var i = this.floor32(xs);
		var j = this.floor32(ys);
		var k = this.floor32(zs);
		var l = this.floor32(ws);

		var t = (i + j + k + l) * this.G4; /* Factor for 4D unskewing */
		var X0 = i - t; /* Unskew the cell origin back to (x,y,z,w) space */
		var Y0 = j - t;
		var Z0 = k - t;
		var W0 = l - t;

		var x0 = x - X0; /* The x,y,z,w distances from the cell origin */
		var y0 = y - Y0;
		var z0 = z - Z0;
		var w0 = w - W0;

		/* For the 4D case, the simplexLookup is a 4D shape I won't even try to describe. */
		/* To find out which of the 24 possible simplices we're in, we need to */
		/* determine the magnitude ordering of x0, y0, z0 and w0. */
		/* The method below is a good way of finding the ordering of x,y,z,w and */
		/* then find the correct traversal order for the simplexLookup we're in. */
		/* First, six pair-wise comparisons are performed between each possible pair */
		/* of the four coordinates, and the results are used to add up binary bits */
		/* for an integer index. */
		var c1 = this.int((x0 > y0) ? 32 : 0);
		var c2 = this.int((x0 > z0) ? 16 : 0);
		var c3 = this.int((y0 > z0) ? 8 : 0);
		var c4 = this.int((x0 > w0) ? 4 : 0);
		var c5 = this.int((y0 > w0) ? 2 : 0);
		var c6 = this.int((z0 > w0) ? 1 : 0);
		var c = c1 + c2 + c3 + c4 + c5 + c6;

		var i1, j1, k1, l1; /* The integer offsets for the second simplexLookup corner */
		var i2, j2, k2, l2; /* The integer offsets for the third simplexLookup corner */
		var i3, j3, k3, l3; /* The integer offsets for the fourth simplexLookup corner */

		var x1, y1, z1, w1, x2, y2, z2, w2, x3, y3, z3, w3, x4, y4, z4, w4, ll;
		var t0, t1, t2, t3, t4;

		/* simplexLookup[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order. */
		/* Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w */
		/* impossible. Only the 24 indices which have non-zero entries make any sense. */
		/* The number 3 in the "simplexLookup" array is at the position of the largest coordinate. */
		i1 = this.simplexLookup[c][0] >= 3 ? 1 : 0;
		j1 = this.simplexLookup[c][1] >= 3 ? 1 : 0;
		k1 = this.simplexLookup[c][2] >= 3 ? 1 : 0;
		l1 = this.simplexLookup[c][3] >= 3 ? 1 : 0;
		/* The number 2 in the "simplexLookup" array is at the second largest coordinate. */
		i2 = this.simplexLookup[c][0] >= 2 ? 1 : 0;
		j2 = this.simplexLookup[c][1] >= 2 ? 1 : 0;
		k2 = this.simplexLookup[c][2] >= 2 ? 1 : 0;
		l2 = this.simplexLookup[c][3] >= 2 ? 1 : 0;
		/* The number 1 in the "simplexLookup" array is at the second smallest coordinate. */
		i3 = this.simplexLookup[c][0] >= 1 ? 1 : 0;
		j3 = this.simplexLookup[c][1] >= 1 ? 1 : 0;
		k3 = this.simplexLookup[c][2] >= 1 ? 1 : 0;
		l3 = this.simplexLookup[c][3] >= 1 ? 1 : 0;
		/* The fifth corner has all coordinate offsets = 1, so no need to look that up. */

		x1 = x0 - i1 + this.G4; /* Offsets for second corner in (x,y,z,w) coords */
		y1 = y0 - j1 + this.G4;
		z1 = z0 - k1 + this.G4;
		w1 = w0 - l1 + this.G4;
		x2 = x0 - i2 + 2.0 * this.G4; /* Offsets for third corner in (x,y,z,w) coords */
		y2 = y0 - j2 + 2.0 * this.G4;
		z2 = z0 - k2 + 2.0 * this.G4;
		w2 = w0 - l2 + 2.0 * this.G4;
		x3 = x0 - i3 + 3.0 * this.G4; /* Offsets for fourth corner in (x,y,z,w) coords */
		y3 = y0 - j3 + 3.0 * this.G4;
		z3 = z0 - k3 + 3.0 * this.G4;
		w3 = w0 - l3 + 3.0 * this.G4;
		x4 = x0 - 1.0 + 4.0 * this.G4; /* Offsets for last corner in (x,y,z,w) coords */
		y4 = y0 - 1.0 + 4.0 * this.G4;
		z4 = z0 - 1.0 + 4.0 * this.G4;
		w4 = w0 - 1.0 + 4.0 * this.G4;

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
			n0 = t0 * t0 * this.gradient4d(this.permutation[i + this.permutation[j + this.permutation[k + this.permutation[ll]]]], x0, y0, z0, w0);
		}

		t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
		if (t1 < 0.0) {
			n1 = 0.0;
		} else {
			t1 *= t1;
			n1 = t1 * t1 * this.gradient4d(this.permutation[i + i1 + this.permutation[j + j1 + this.permutation[k + k1 + this.permutation[ll + l1]]]], x1, y1, z1, w1);
		}

		t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
		if (t2 < 0.0) {
			n2 = 0.0;
		} else {
			t2 *= t2;
			n2 = t2 * t2 * this.gradient4d(this.permutation[i + i2 + this.permutation[j + j2 + this.permutation[k + k2 + this.permutation[ll + l2]]]], x2, y2, z2, w2);
		}

		t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
		if (t3 < 0.0) {
			n3 = 0.0;
		} else {
			t3 *= t3;
			n3 = t3 * t3 * this.gradient4d(this.permutation[i + i3 + this.permutation[j + j3 + this.permutation[k + k3 + this.permutation[ll + l3]]]], x3, y3, z3, w3);
		}

		t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
		if (t4 < 0.0) {
			n4 = 0.0;
		} else {
			t4 *= t4;
			n4 = t4 * t4 * this.gradient4d(this.permutation[i + 1 + this.permutation[j + 1 + this.permutation[k + 1 + this.permutation[ll + 1]]]], x4, y4, z4, w4);
		}

		/* Sum up and scale the result to cover the range [-1,1] */
		return 27.0 * (n0 + n1 + n2 + n3 + n4); /* TODO: The scale factor is preliminary! */
	},
	
	/*
	 * 1d ofSimplex Noise
	 *
	 * @param {Number} x
	 * @returns {Number}
	 */
	simplexNoise1d: function (x) {
		return this.signedNoise1d(x) * 0.5 + 0.5;
	},
	
	/*
	 * 2d ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @returns {Number}
	 */
	simplexNoise2d: function (x, y) {
		return this.signedNoise2d(x, y) * 0.5 + 0.5;
	},
	
	/*
	 * 3d ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @returns {Number}
	 */
	simplexNoise3d: function (x, y, z) {
		return this.signedNoise3d(x, y, z) * 0.5 + 0.5;
	},
	
	/*
	 * 4d ofSimplex Noise
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} z
	 * @param {Number} w
	 * @returns {Number}
	 */
	simplexNoise4d: function (x, y, z, w) {
		return this.signedNoise4d(x, y, z, w) * 0.5 + 0.5;
	}
};

