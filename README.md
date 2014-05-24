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

diracdelta(x)
-------------

kroneckerdelta(i, j)
--------------------

sgn(x)
------

sinc(x)
-------

triangle(x)
-----------

mod(x,y)
--------

square(x, n)
------------

factorial(x)
------------

lngamma(x)
----------

gamma(x)
--------

digamma(x)
----------

H(x)
----

phi(x)
------

fresnelc(x)
-----------

zeta(x)
-------

erf(x)
------

epsilon()
---------

cantor(x)
---------

csc(x)
------

cosh(x)
-------

sinh(x)
-------

tanh(x)
-------

csch(x)
-------

coth(x)
-------

acosh(x)
--------

asinh(x)
--------

atanh(x)
--------


int(x)
------

floor32(x)
----------

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

