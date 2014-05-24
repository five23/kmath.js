# kmath.js

## Usage


Include kmath.js

	<script type="text/javascript" src="kmath.js"></script>


Instantiate kMath object

	var kmath = new kMath();


Do some math

	var y = kmath.lngamma(1);  // 3.1780538303479458



## Methods


fsin(x)
-------
Returns a numeric value between ~~-1 and ~~1, representing the sine of the angle given in radians. The scaling factors (5214, 2.44E-4) were chosen arbitrarily and in haste, then truncated to squeeze a few more clock cycles out of the function, so the precision is only accurate to ~5 decimal places on the arc. ﻿ :

	this.fsin = function (x) {
		var b, c;
		return x *= 5214, c = x << 17, x -= 8192, x <<= 18, x >>= 18,
			x = x * x >> 12, b = 19900 - (3516 * x >> 14), b = 4096 - (x * b >> 16),
			0 > c && (b = -b), 2.44E-4 * b;
	};
    
Based on the methods discussed here: http://www.coranac.com/2009/07/sines

Performance tests: http://jsperf.com/bitwise-sine/3﻿

fcos(x)
-------

Bitwise cosine approximation, see fsin(x)

unitstep(x)
-----------

Represents the unit step function, equal to 0 for x < 0 and 1 for x >= 0


diracdelta(x)
-------------

The Dirac delta function, or δ function, is a generalized function, or distribution, on the real number line that is zero everywhere except at zero, with an integral of one over the entire real line.

http://en.wikipedia.org/wiki/Dirac_delta_function


kroneckerdelta(i, j)
--------------------

The discrete analog of the diracdelta(x) function.

http://en.wikipedia.org/wiki/Kronecker_delta

sgn(x)
------

The sign function or signum function (from signum, Latin for "sign") is an odd mathematical function that extracts the sign of a real number.

http://en.wikipedia.org/wiki/Sign_function

sinc(x)
-------

Normalized sinc function.

http://en.wikipedia.org/wiki/Sinc_function

mod(x,y)
--------

The remainder of division of one number by another.

http://en.wikipedia.org/wiki/Modulo_operation

square(x, n)
------------

Square wave approximation.

factorial(x)
------------

The factorial function (integers)

http://en.wikipedia.org/wiki/Factorial

gamma(x)
--------

Gamma function.

http://en.wikipedia.org/wiki/Gamma


lngamma(x)
----------

The logarithm of the gamma function.


digamma(x)
----------

The logarithmic derivative of the gamma function:

http://en.wikipedia.org/wiki/Digamma_function

H(x)
----

The nth-Harmonic number.

http://en.wikipedia.org/wiki/Harmonic_number

phi(x)
------

Phi distribution.


fresnelc(x)
-----------

The Fresnel C integral C(x)

http://en.wikipedia.org/wiki/Fresnel_integral


zeta(x)
-------

The Riemann zeta function.

http://en.wikipedia.org/wiki/Riemann_zeta_function

erf(x)
------

The "error function" (also called the Gauss error function) is a special function (non-elementary) of sigmoid shape which occurs in probability, statistics and partial differential equations.

http://en.wikipedia.org/wiki/Error_function

epsilon()
---------

Returns machine epsilon.

cantor(x)
---------

The Cantor function, named after Georg Cantor, is an example of a function that is continuous, but not absolutely continuous. It is also referred to as the Devil's staircase, the Cantor staircase function, and the Cantor-Lebesgue function.

http://en.wikipedia.org/wiki/Cantor_function


csc(x)
------

The length of the hypotenuse divided by the length of the opposite side.

cosh(x)
-------

Hyperbolic cosine.

sinh(x)
-------

Hyperbolic sine.

tanh(x)
-------

Hyperbolic tangent.

csch(x)
-------

Hyperbolic cosecant.

coth(x)
-------

Hyperbolic cotangent

acosh(x)
--------

Inverse Hyperbolic Cosine.

asinh(x)
--------

Inverse Hyperbolic Sine.

atanh(x)
--------

Inverse Hyperbolic Tangent.

int(x)
------

Cast float to integer.

floor32(x)
----------

Fast floor function.


lerp(x, v0, v1)
---------------

clamp(x, v0, v1)
----------------

normalize(x, v0, v1)
--------------------

map(x, v0, v1, vx0, vx1, clamp)
-------------------------------

dist(x1, y1, x2, y2)
--------------------

distSquared(x1, y1, x2, y2)
---------------------------

randomFloat(min, max, precision)
--------------------------------

randomInt(min, max)
-------------------

randomPerm(index)
-----------------

bitDivisor(bits)
----------------

bitMask(bits)
-------------

bitShift(x, bits)
-----------------

gradient1d(hash, x)
-------------------

gradient2d(hash, x, y)
----------------------

gradient3d(hash, x, y, z)
-------------------------

gradient4d(hash, x, y, z, t)
----------------------------

signedNoise1d(x)
----------------

signedNoise2d(x, y)
-------------------

signedNoise3d(x, y, z)
----------------------

signedNoise4d(x, y, z, w)
-------------------------

simplexNoise1d(x)
-----------------

simplexNoise2d(x, y)
-----------------

simplexNoise3d(x, y, z)
-----------------------

simplexNoise4d(x, y, z, w)
--------------------------

