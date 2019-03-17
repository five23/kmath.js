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
R̶e̶t̶u̶r̶n̶s̶ ̶a̶ ̶n̶u̶m̶e̶r̶i̶c̶ ̶v̶a̶l̶u̶e̶ ̶b̶e̶t̶w̶e̶e̶n̶ ̶~̶~̶-̶1̶ ̶a̶n̶d̶ ̶~̶~̶1̶,̶ ̶r̶e̶p̶r̶e̶s̶e̶n̶t̶i̶n̶g̶ ̶t̶h̶e̶ ̶s̶i̶n̶e̶ ̶o̶f̶ ̶t̶h̶e̶ ̶a̶n̶g̶l̶e̶ ̶g̶i̶v̶e̶n̶ ̶i̶n̶ ̶r̶a̶d̶i̶a̶n̶s̶.̶ ̶T̶h̶e̶ ̶s̶c̶a̶l̶i̶n̶g̶ ̶f̶a̶c̶t̶o̶r̶s̶ ̶(̶5̶2̶1̶4̶,̶ ̶2̶.̶4̶4̶E̶-̶4̶)̶ ̶w̶e̶r̶e̶ ̶c̶h̶o̶s̶e̶n̶ ̶a̶r̶b̶i̶t̶r̶a̶r̶i̶l̶y̶ ̶a̶n̶d̶ ̶i̶n̶ ̶h̶a̶s̶t̶e̶,̶ ̶t̶h̶e̶n̶ ̶t̶r̶u̶n̶c̶a̶t̶e̶d̶ ̶t̶o̶ ̶s̶q̶u̶e̶e̶z̶e̶ ̶a̶ ̶f̶e̶w̶ ̶m̶o̶r̶e̶ ̶c̶l̶o̶c̶k̶ ̶c̶y̶c̶l̶e̶s̶ ̶o̶u̶t̶ ̶o̶f̶ ̶t̶h̶e̶ ̶f̶u̶n̶c̶t̶i̶o̶n̶,̶ ̶s̶o̶ ̶t̶h̶e̶ ̶p̶r̶e̶c̶i̶s̶i̶o̶n̶ ̶i̶s̶ ̶o̶n̶l̶y̶ ̶a̶c̶c̶u̶r̶a̶t̶e̶ ̶t̶o̶ ̶~̶5̶ ̶d̶e̶c̶i̶m̶a̶l̶ ̶p̶l̶a̶c̶e̶s̶ ̶o̶n̶ ̶t̶h̶e̶ ̶a̶r̶c̶.̶ ̶﻿̶ ̶:̶ ̶ ̶ ̶ ̶ ̶ ̶ ̶ ̶ ̶ ̶}̶;̶ ̶ ̶B̶a̶s̶e̶d̶ ̶o̶n̶ ̶t̶h̶e̶ ̶m̶e̶t̶h̶o̶d̶s̶ ̶d̶i̶s̶c̶u̶s̶s̶e̶d̶ ̶h̶e̶r̶e̶:̶ ̶h̶t̶t̶p̶:̶/̶/̶w̶w̶w̶.̶c̶o̶r̶a̶n̶a̶c̶.̶c̶o̶m̶/̶2̶0̶0̶9̶/̶0̶7̶/̶s̶i̶n̶e̶s̶ ̶ ̶P̶e̶r̶f̶o̶r̶m̶a̶n̶c̶e̶ ̶t̶e̶s̶t̶s̶:̶ ̶h̶t̶t̶p̶:̶/̶/̶j̶s̶p̶e̶r̶f̶.̶c̶o̶m̶/̶b̶i̶t̶w̶i̶s̶e̶-̶s̶i̶n̶e̶/̶3̶﻿̶

	t̶h̶i̶s̶.̶f̶s̶i̶n̶ ̶=̶ ̶f̶u̶n̶c̶t̶i̶o̶n̶ ̶(̶x̶)̶ ̶{̶
		v̶a̶r̶ ̶b̶,̶ ̶c̶;̶
	  r̶e̶t̶u̶r̶n̶ ̶x̶ ̶*̶=̶ ̶5̶2̶1̶4̶,̶ ̶c̶ ̶=̶ ̶x̶ ̶<̶<̶ ̶1̶7̶,̶ ̶x̶ ̶-̶=̶ ̶8̶1̶9̶2̶,̶ ̶x̶ ̶<̶<̶=̶ ̶1̶8̶,̶ ̶x̶ ̶>̶>̶=̶ ̶1̶8̶,̶ ̶ ̶ ̶ ̶x̶ ̶=̶ ̶x̶ ̶*̶ ̶x̶ ̶>̶>̶ ̶1̶2̶,̶ ̶b̶ ̶=̶ ̶1̶9̶9̶0̶0̶ ̶-̶ ̶(̶3̶5̶1̶6̶ ̶*̶ ̶x̶ ̶>̶>̶ ̶1̶4̶)̶,̶ ̶b̶ ̶=̶ ̶4̶0̶9̶6̶ ̶-̶ ̶(̶x̶ ̶*̶ ̶b̶ ̶>̶>̶ ̶1̶6̶)̶,̶ ̶ ̶ ̶ ̶0̶ ̶>̶ ̶c̶ ̶&̶&̶ ̶(̶b̶ ̶=̶ ̶-̶b̶)̶,̶ ̶2̶.̶4̶4̶E̶-̶4̶ ̶*̶ ̶b̶;̶
	}̶;̶

B̶a̶s̶e̶d̶ ̶o̶n̶ ̶t̶h̶e̶ ̶m̶e̶t̶h̶o̶d̶s̶ ̶d̶i̶s̶c̶u̶s̶s̶e̶d̶ ̶h̶e̶r̶e̶:̶ ̶h̶t̶t̶p̶:̶/̶/̶w̶w̶w̶.̶c̶o̶r̶a̶n̶a̶c̶.̶c̶o̶m̶/̶2̶0̶0̶9̶/̶0̶7̶/̶s̶i̶n̶e̶s̶

Browsers have become significantly more optimized and this method is no longer fastest.

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
