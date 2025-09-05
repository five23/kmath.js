/**
 * kmath.js — minimal, fast, and maintainable mathematical utilities.
 *
 * Exports:
 *   • Constants: TAU, HALF_PI, INV_PI, EULER_GAMMA, ZETA2, TWO_LN2, SQRT_2PI
 *   • Digamma:   digamma (fast+accurate), digamma12 (higher-precision), digammaFast (approx), digammaUltra (very approx)
 *   • Harmonics: H, H12
 *   • Utilities: cosSeries, square, square12, kMath() namespace, default bundle
 *
 * All exports are ES modules with JSDoc for IDE support.
 * Implementation notes:
 *   - No object allocation in hot paths; no recursion.
 *   - Upward recurrence shifts to a ≥ target, then uses a short Bernoulli/Stirling tail.
 *   - π·cot(πx) uses a local series near integers to avoid slow/ill-conditioned tan().
 *   - Poles at nonpositive integers return +Infinity.
 *
 * @module kmath
 */

/* ---------------------------------------
 * Constants (derived from Math)
 * -------------------------------------*/

/**
 * τ = 2π.
 * @type {number}
 * @example
 * import { TAU } from './kmath.js';
 * const oneCycle = TAU; // radians
 */
export const TAU = 2 * Math.PI;

/**
 * π/2 (half pi).
 * @type {number}
 */
export const HALF_PI = Math.PI / 2;

/**
 * 1/π — handy in hot paths.
 * @type {number}
 */
export const INV_PI = 1 / Math.PI;

/** 
 * 2 ln 2 — appears in digamma half-integer identities.
 * @type {number} 
 * @constant
 */
export const TWO_LN2 = 2 * Math.LN2;

/**
 * Euler–Mascheroni constant γ (to double precision).
 * @type {number}
 */
export const EULER_GAMMA = 0.5772156649015328606;

/**
 * ζ(2) = π² / 6.
 * @type {number}
 */
export const ZETA2 = (Math.PI * Math.PI) / 6;

/**
 * √(2π) — common in Stirling/normalizing constants.
 * @type {number}
 */
export const SQRT_2PI = Math.sqrt(TAU);

/* ---------------------------------------
 * Helpers
 * -------------------------------------*/

/**
 * ULP-scaled tolerance for “nearly integer” checks.
 * @type {number}
 * @private
 */
const ULPS = 16 * Number.EPSILON; // ~3.5e-15 on IEEE-754 doubles

/**
 * True if x is within ~ULPS·max(1,|x|) of an integer.
 * @param {number} x
 * @param {number} [tol=ULPS]
 * @returns {boolean}
 * @private
 */
const isNearlyInteger = (x, tol = ULPS) =>
  Math.abs(x - Math.round(x)) <= tol * Math.max(1, Math.abs(x));

/**
 * True if x is within ~ULPS of a half-integer.
 * @param {number} x
 * @param {number} [tol=ULPS]
 * @returns {boolean}
 * @private
 */
const isNearlyHalfInteger = (x, tol = ULPS) => isNearlyInteger(x - 0.5, tol);

/**
 * Harmonic number H_n for positive integer n.
 * @param {number} n Positive integer.
 * @returns {number} H_n
 * @private
 */
function harmonicInt(n) {
  let s = 0;
  for (let k = 1; k <= n; k++) s += 1 / k;
  return s;
}

/**
 * ψ(n+½) via the identity:
 *   ψ(n+½) = −γ − 2 ln 2 + 2·(H_{2n} − ½ H_n)
 * @param {number} n Nonnegative integer.
 * @returns {number}
 * @private
 */
function digammaHalfInteger(n) {
  return -EULER_GAMMA - TWO_LN2 + 2 * (harmonicInt(2 * n) - 0.5 * harmonicInt(n));
}

/**
 * 4-term Bernoulli tail for ψ(a) at large a (a≥target).
 * Input inv = 1/a, evaluates powers of t = a⁻².
 * Truncation at a=12 is <1e-12 abs. (Terms through a⁻8.)
 * @param {number} inv 1/a
 * @returns {number}
 * @private
 */
function tail4(inv) {
  const t  = inv * inv;      // a^-2
  const t2 = t * t;          // a^-4
  const t3 = t2 * t;         // a^-6
  const t4 = t2 * t2;        // a^-8
  return -(1/12)*t + (1/120)*t2 - (1/252)*t3 + (1/240)*t4;
}

/**
 * 6-term Bernoulli tail (more precise), through a⁻12.
 * @param {number} inv 1/a
 * @returns {number}
 * @private
 */
function tail6(inv) {
  const t  = inv * inv;      // a^-2
  const t2 = t * t;          // a^-4
  const t3 = t2 * t;         // a^-6
  const t4 = t2 * t2;        // a^-8
  const t5 = t3 * t2;        // a^-10
  const t6 = t3 * t3;        // a^-12
  return -(1/12)*t + (1/120)*t2 - (1/252)*t3 + (1/240)*t4 - (1/132)*t5 + (691/32760)*t6;
}

/**
 * π·cot(πx) with better conditioning near integers.
 * Uses a cubic series for |x−round(x)| < 1e-5 to avoid tan().
 * @param {number} x
 * @returns {number}
 * @private
 */
function piCotPi(x) {
  const y = x - Math.round(x);
  const ay = Math.abs(y);
  if (ay < 1e-5) {
    const P2 = Math.PI * Math.PI;
    const P4 = P2 * P2;
    const y2 = y * y;
    return 1 / y - (P2 * y) / 3 - (P4 * y * y2) / 45; // 1/y − π²y/3 − π⁴y³/45
  }
  return Math.PI / Math.tan(Math.PI * y);
}

/* ---------------------------------------
 * Digamma (ψ) functions
 * -------------------------------------*/

/**
 * Digamma ψ(z) for real z (all reals except nonpositive integers).
 *
 * Strategy:
 *   - Exact nonpositive integers → +Infinity (poles).
 *   - |z| ≲ 1e-5 → one-term Laurent/series (reflect if z<0).
 *   - z < 0.5: for −8 < z < 0.5 shift upward (no tan); else reflect once.
 *   - Shift to a ≥ 12 and apply 4-term tail (fast, ~1e-12 abs at a=12).
 *
 * @param {number} z Real input.
 * @returns {number} ψ(z)
 * @example
 * import { digamma, EULER_GAMMA } from './kmath.js';
 * digamma(1)    // ≈ −EULER_GAMMA
 * digamma(0.5)  // ≈ −EULER_GAMMA − 2·ln 2
 */
export function digamma(z) {
  if (!Number.isFinite(z)) return z;                 // NaN/±∞ passthrough
  if (z <= 0 && z === Math.trunc(z)) return Infinity; // exact poles
  if (z >= 1e8) return Math.log(z) - 0.5 / z;        // Stirling lead

  // Tiny |z|: Laurent/series or reflected series (no recursion)
  if (Math.abs(z) <= 1e-5) {
    if (z > 0) return -EULER_GAMMA - 1 / z + ZETA2 * z;
    let a = 1 - z, acc = 0.0;                        // reflect once to right half-plane
    if (a < 12.0) {
      let n = Math.ceil(12.0 - a) | 0, ai = a;
      for (let i = 0; i < n; i++) { acc -= 1/ai; ai += 1; }
      a = ai;
    }
    const inv = 1 / a;
    return acc + Math.log(a) - 0.5 * inv + tail4(inv) - piCotPi(z);
  }

  // Left half-plane handling favors cheap shifts for modest negatives
  if (z < 0.5) {
    if (z > -8) {
      // shift up into [0.5, ∞) and then to ≥12 (counted loops are faster than while+updates)
      let a = z, acc = 0.0;
      if (a < 0.5) {
        let n = Math.ceil(0.5 - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1/ai; ai += 1; }
        a = ai;
      }
      if (a < 12.0) {
        let n = Math.ceil(12.0 - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1/ai; ai += 1; }
        a = ai;
      }
      const inv = 1 / a;
      return acc + Math.log(a) - 0.5 * inv + tail4(inv);
    } else {
      // deep negatives: one reflection, then the same core
      let a = 1 - z, acc = 0.0;
      if (a < 12.0) {
        let n = Math.ceil(12.0 - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1/ai; ai += 1; }
        a = ai;
      }
      const inv = 1 / a;
      return acc + Math.log(a) - 0.5 * inv + tail4(inv) - piCotPi(z);
    }
  }

  // z ≥ 0.5: shift to ≥12 and finish with the 4-term tail
  let a = z, acc = 0.0;
  if (a < 12.0) {
    let n = Math.ceil(12.0 - a) | 0, ai = a;
    for (let i = 0; i < n; i++) { acc -= 1/ai; ai += 1; }
    a = ai;
  }
  const inv = 1 / a;
  return acc + Math.log(a) - 0.5 * inv + tail4(inv);
}


/**
 * Digamma ψ(x), fast/approximate.
 *   - Shifts to a ≥ 6 then uses ψ(a) ≈ ln a − 1/(2a) − 1/(12a²)
 *   - For −8 < x < 0.5, prefers upward shifts over reflection (no tan()).
 *   - For deep negatives, reflects once: ψ(x) = ψ(1−x) − πcot(πx).
 *   - Exact-integer poles only (no fuzzy near-integer guard).
 * Typical abs error: ~1e-5 once shifted; decreases with larger a.
 *
 * @param {number} x
 * @returns {number} approximate ψ(x)
 */
export function digammaFast(x) {
  if (!Number.isFinite(x)) return x;
  if (x <= 0 && x === Math.trunc(x)) return Infinity;

  if (Math.abs(x) <= 1e-5) {                                // near zero
    if (x > 0) return -EULER_GAMMA - 1 / x + ZETA2 * x;
    let a = 1 - x, acc = 0.0;                               // reflect tiny negative
    while (a < 6.0) { acc -= 1/a; a += 1; }
    const inv = 1 / a, t = inv * inv;
    return (acc + Math.log(a) - 0.5 * inv - (1/12) * t) - piCotPi(x);
  }

  if (x < 0.5 && x > -8) {                                  // modest negatives
    let a = x, acc = 0.0;
    while (a < 0.5) { acc -= 1/a; a += 1; }
    while (a < 6.0) { acc -= 1/a; a += 1; }
    const inv = 1 / a, t = inv * inv;
    return acc + Math.log(a) - 0.5 * inv - (1/12) * t;
  }

  if (x < 0.5) {                                            // deep negatives
    let a = 1 - x, acc = 0.0;
    while (a < 6.0) { acc -= 1/a; a += 1; }
    const inv = 1 / a, t = inv * inv;
    return (acc + Math.log(a) - 0.5 * inv - (1/12) * t) - piCotPi(x);
  }

  // x ≥ 0.5
  let a = x, acc = 0.0;
  while (a < 6.0) { acc -= 1/a; a += 1; }
  const inv = 1 / a, t = inv * inv;
  return acc + Math.log(a) - 0.5 * inv - (1/12) * t;
}

/**
 * Digamma ψ(x), ultra-fast / very approximate.
 *   ψ(a) ≈ ln(a − ½) after shifting to a ≥ 1.5 (Mortici-style).
 * Typical abs error ≈ 1e-3 in common ranges; intended only for raw throughput.
 *
 * @param {number} x
 * @returns {number} very approximate ψ(x)
 */
export function digammaUltra(x) {
  if (!Number.isFinite(x)) return x;
  if (x <= 0 && x === Math.trunc(x)) return Infinity;

  function coreShift(a) {
    let acc = 0.0;
    while (a < 1.5) { acc -= 1.0 / a; a += 1.0; }
    return acc + Math.log(a - 0.5);
  }

  if (x < 0.5) {
    if (x > -8) return coreShift(x);          // shift path (no tan)
    return coreShift(1 - x) - piCotPi(x);     // deep negatives: reflect
  }
  return coreShift(x);
}

/**
 * Higher-precision digamma ψ(x) with configurable shift target.
 *
 * Strategy:
 *   - Exact nonpositive integers → +Infinity.
 *   - Integer/half-integer shortcuts for small x (>0).
 *   - |x| ≲ 1e-5 → series around 0 (reflect if x<0).
 *   - Reflect for x < 0.5, then shift to a ≥ PRECISION and apply 6-term tail.
 *
 * @param {number} x Real input.
 * @param {number} [PRECISION=12] Shift target (minimum a before tail).
 * @returns {number} ψ(x)
 * @example
 * import { digamma12 } from './kmath.js';
 * digamma12(10) // high-accuracy ψ(10)
 */
export function digamma12(x, PRECISION = 12) {
  if (Math.abs(x) < Number.EPSILON) return Infinity;
  if (x <= 0 && x === Math.trunc(x)) return Infinity;

  // Exact shortcuts
  if (x > 0 && x < PRECISION && isNearlyInteger(x)) {
    const n = Math.round(x);
    if (n >= 1) return harmonicInt(n - 1) - EULER_GAMMA;
  }
  if (x > 0 && isNearlyHalfInteger(x) && x < (PRECISION + 1) / 2 + 0.5) {
    const n = Math.round(x - 0.5);
    return digammaHalfInteger(n);
  }

  // Tiny |x|
  if (Math.abs(x) <= 1e-6) {
    if (x > 0) return -EULER_GAMMA - 1 / x + ZETA2 * x;
    // Prefer shifts over reflection when not deeply negative
    if (x > -8) {
      let a = x, acc = 0.0;
      if (a < 0.5) {
        let n = Math.ceil(0.5 - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
        a = ai;
      }
      if (a < PRECISION) {
        let n = Math.ceil(PRECISION - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
        a = ai;
      }
      const inv = 1 / a;
      return acc + Math.log(a) - 0.5 * inv + tail6(inv);
    }
    // Deep negatives: reflect once
    const w = 1 - x;
    let a = w, acc = 0.0;
    if (a < PRECISION) {
      let n = Math.ceil(PRECISION - a) | 0, ai = a;
      for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
      a = ai;
    }
    const inv = 1 / a;
    return acc + Math.log(a) - 0.5 * inv + tail6(inv) - piCotPi(x);
  }

  // Left half-plane: shift for modest negatives, reflect only for deep ones
  if (x < 0.5) {
    if (x > -8) {
      let a = x, acc = 0.0;
      if (a < 0.5) {
        let n = Math.ceil(0.5 - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
        a = ai;
      }
      if (a < PRECISION) {
        let n = Math.ceil(PRECISION - a) | 0, ai = a;
        for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
        a = ai;
      }
      const inv = 1 / a;
      return acc + Math.log(a) - 0.5 * inv + tail6(inv);
    }
    const w = 1 - x;
    let a = w, acc = 0.0;
    if (a < PRECISION) {
      let n = Math.ceil(PRECISION - a) | 0, ai = a;
      for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
      a = ai;
    }
    const inv = 1 / a;
    return acc + Math.log(a) - 0.5 * inv + tail6(inv) - piCotPi(x);
  }

  // Right half-plane
  let a = x, acc = 0.0;
  if (a < PRECISION) {
    let n = Math.ceil(PRECISION - a) | 0, ai = a;
    for (let i = 0; i < n; i++) { acc -= 1 / ai; ai += 1; }
    a = ai;
  }
  const inv = 1 / a;
  return acc + Math.log(a) - 0.5 * inv + tail6(inv);
}

/* ---------------------------------------
 * Harmonic numbers
 * -------------------------------------*/

/**
 * Harmonic number H(x) via digamma: H(x) = ψ(x+1) + γ.
 * For integer x this equals the usual H_n.
 * @param {number} x
 * @returns {number}
 * @example
 * import { H } from './kmath.js';
 * H(10) // ≈ 2.9289682539682538
 */
export const H = (x) => digamma(x + 1) + EULER_GAMMA;

/**
 * Harmonic number via the higher-precision digamma variant.
 * @param {number} x
 * @returns {number}
 */
export const H12 = (x) => digamma12(x + 1) + EULER_GAMMA;

/* ---------------------------------------
 * Utility: cosine series (oscillator)
 * -------------------------------------*/

/**
 * Generate N samples: out[k] = cos(phase + k·d), k = 0..N−1.
 * Uses stable complex-rotation (no modulo drift).
 * @param {number} N Number of samples (N ≥ 1).
 * @param {number} [phase=0] Starting phase (radians).
 * @param {number} [d=TAU/N] Phase increment per step (radians).
 * @returns {Float64Array} Array of cosines.
 */
export function cosSeries(N, phase = 0, d = TAU / N) {
  const out = new Float64Array(N);
  let c = Math.cos(phase), s = Math.sin(phase);
  const c0 = Math.cos(d),    s0 = Math.sin(d);
  for (let i = 0; i < N; i++) {
    out[i] = c;
    const nc = c * c0 - s * s0;
    s = s * c0 + c * s0;
    c = nc;
  }
  return out;
}

/* ---------------------------------------
 * Square-wave shapers (digamma-based)
 * -------------------------------------*/

/**
 * Core square-shaper (no argument checks).
 * y = ½( cos(τ·b·cos a) · (ψ(¾−bc) − ψ(¼−bc))/π − 1 )
 * @param {number} a Phase (radians).
 * @param {number} b Spectral shaping parameter.
 * @param {(x:number)=>number} digammaFn Digamma implementation to use.
 * @returns {number}
 * @private
 */
function squareCore(a, b, digammaFn) {
  const ca = Math.cos(a);
  const bc = b * ca;
  const top = digammaFn(0.75 - bc) - digammaFn(0.25 - bc);
  return 0.5 * (Math.cos(TAU * bc) * (top * INV_PI) - 1.0);
}

/**
 * Digamma-based square waveshaper using the fast ψ implementation.
 * @param {number} a Phase (radians).
 * @param {number} b Spectral shaping parameter.
 * @returns {number}
 */
export const square = (a, b) => squareCore(a, b, digamma);

/**
 * Digamma-based square waveshaper using the higher-precision ψ₁₂ implementation.
 * @param {number} a Phase (radians).
 * @param {number} b Spectral shaping parameter.
 * @returns {number}
 */
export const square12 = (a, b) => squareCore(a, b, digamma12);

/* ---------------------------------------
 * Namespaced bundle (drop-in replacement for old kMath())
 * -------------------------------------*/

/**
 * Factory returning a frozen namespace mirroring the old OO-style API.
 * Useful when migrating code that previously did `new kMath()`.
 * @returns {Readonly<{
 *   TAU:number, HALF_PI:number, EULER_GAMMA:number, ZETA2:number, SQRT_2PI:number, INV_PI:number,
 *   digamma:(z:number)=>number,
 *   digamma12:(z:number, PRECISION?:number)=>number,
 *   digammaFast:(z:number)=>number,
 *   digammaUltra?:(z:number)=>number,
 *   H:(x:number)=>number,
 *   H12:(x:number)=>number,
 *   square:(a:number,b:number)=>number,
 *   square12:(a:number,b:number)=>number
 * }>}
 */
export function kMath() {
  const K = Object.freeze({ TAU, HALF_PI, EULER_GAMMA, ZETA2, SQRT_2PI, INV_PI });
  return Object.freeze({
    ...K,
    digamma,
    digamma12,
    digammaFast,
    digammaUltra,
    H,
    H12,
    square,
    square12,
  });
}

/**
 * Default export namespace (convenience). Same members as named exports (plus constants).
 * Named imports are preferred for tree-shaking.
 * @type {{
 *   digamma:(z:number)=>number,
 *   digamma12:(z:number, PRECISION?:number)=>number,
 *   digammaFast:(z:number)=>number,
 *   digammaUltra?:(z:number)=>number,
 *   H:(x:number)=>number,
 *   H12:(x:number)=>number,
 *   square:(a:number,b:number)=>number,
 *   square12:(a:number,b:number)=>number,
 *   TAU:number, HALF_PI:number, EULER_GAMMA:number, ZETA2:number, SQRT_2PI:number, INV_PI:number,
 *   kMath:()=>any
 * }}
 */
export default {
  digamma,
  digamma12,
  digammaFast,
  digammaUltra,
  H,
  H12,
  square,
  square12,
  TAU,
  HALF_PI,
  EULER_GAMMA,
  ZETA2,
  SQRT_2PI,
  INV_PI,
  TWO_LN2,
  kMath,
};
