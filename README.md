# kmath.js — fast JS digamma implementation

**kMath** is a small ES-module with practical, fast implementations for:

* ψ(x) (digamma): `digamma`, `digamma12` (high-precision), and speed-oriented `digammaFast`, `digammaUltra`
* Harmonic numbers: `H`, `H12`
* A digamma-based square waveshaper: `square`, `square12`
* Handy constants: `TAU`, `HALF_PI`, `EULER_GAMMA`, `ZETA2`, `TWO_LN2`, `SQRT_2PI`

Designed for **speed in hot paths** with **numerical behavior you can reason about**, and sensible defaults for the real line (∞ at the poles 0, −1, −2, …; no exceptions thrown from kMath).

---

## Why this exists

Most JS digamma implementations either:

* chase peak accuracy everywhere (and pay in speed), or
* go fast but **fall apart near reflection / tiny |x|**.

kMath’s ψ variants are **explicit about trade-offs**:

* `digamma` — fast, accurate enough for many numeric workloads (asymptotic tail4)
* `digamma12` — slower, but near double-precision where it matters
* `digammaFast` — even simpler tail; very fast; \~1e-6 typical abs error once shifted
* `digammaUltra` — **extreme** speed; Mortici-style `log(a-0.5)` core; **percent-level error** (use only for effects or coarse work)

---

## Install / Import

This is a single ES module. Drop `kmath.js` in your project and import it.

```js
// ESM (browser, bundlers, Node "type":"module")
import {
  digamma, digamma12, digammaFast, digammaUltra,
  H, H12, square, square12,
  TAU, EULER_GAMMA
} from './kmath.js';
```

> Node without `"type":"module"`? Use dynamic `await import('./kmath.js')`.

---

## Quick start

```js
// Digamma
console.log(digamma(1));      // ~ -EULER_GAMMA
console.log(digamma(0.5));    // ~ -EULER_GAMMA - 2*ln 2

// Higher precision where you care (slower)
const y = digamma12(10);      // high-accuracy ψ(10)

// Harmonic numbers (H(n) = ψ(n+1) + γ)
console.log(H(10));           // 2.9289682539682538

// Square waveshaper (audio / DSP fun)
const a = 0.0, b = 8.0;
const y0 = square(a, b);      // fast
const y1 = square12(a, b);    // precise
```

**Poles:** for x ∈ {0, −1, −2, …}, kMath returns `Infinity` (no throw).
**Left half-plane:** reflection `ψ(x) = ψ(1−x) − πcot(πx)` is handled robustly.

---

## Benchmark (50,000,000 trials)

* Test machine: Apple Mac M1 Pro / macOS 15.6.1
* Test browser: Chrome 139.0.7258.155
* Dataset: fixed-seed random x ∈ (−3, 6), tiny nudge off poles
* **Accuracy reference:** `digamma12(x, 18)` 
* `tan()` calls counted (reflection cost proxy)
* “Sum” is the accumulated return value (helps compilers not dead-code the loop)

### Raw results

| Method                 | Time (ms) |    Mean \|Δ\| |     RMS \|Δ\| |    Max \|Δ\| |           Sum |
| ---------------------- | --------: | ------------: | ------------: | -----------: | ------------: |
| K.digammaUltra         |   1198.10 |      1.274e-2 |      1.579e-2 |     3.649e-2 | 252878547.536 |
| K.digammaFast          |   1623.70 |      4.712e-6 |      4.858e-6 |     1.221e-4 | 253519658.026 |
| K.digamma              |   1649.00 |      6.099e-9 |      8.628e-7 |     1.221e-4 | 253519893.434 |
| K.digamma12            |   2059.30 | **8.383e-13** | **1.061e-10** | **1.490e-8** | 253519893.434 |
| math-digamma           |   2180.90 |      4.443e-6 |      6.278e-4 |     8.882e-2 | 253519893.434 |
| stdlib                 |   2262.80 |      4.443e-6 |      6.278e-4 |     8.882e-2 | 253519893.434 |
| @stdlib polygamma(n=0) |   2389.70 |      4.443e-6 |      6.278e-4 |     8.882e-2 | 253519893.434 |
| cephes (WASM psi)      |   5136.80 |      1.220e-8 |      1.220e-6 |     1.221e-4 | 253519893.434 |

> **Reading the Δ columns:** smaller is better. `1e-13` is *vastly* more accurate than `1e-6`.
> The *Max* column highlights worst-case outliers (e.g., near reflection / tiny |x|).

### Takeaways

* **Fastest:** `K.digammaUltra` at this scale. It wins on wall-clock but trades accuracy hard (percent-level errors).
* **Best speed/accuracy balance:** `K.digamma` — nearly as fast as `digammaFast`, **orders of magnitude** tighter error than common libs.
* **Gold standard:** `K.digamma12` — slowest of kMath’s variants but delivers **near-machine-precision** vs the 18-term reference.
* **Other libraries:** in this run, `math-digamma`, `@stdlib` digamma/polygamma show **higher RMS / Max errors** (long-tail reflection choices) and are slower. `cephes` through WASM is accurate-ish but pays a large interop cost and reports an error at a pole (as expected from its API).

> Benchmarks vary with engine/JIT/hardware. The trends above have been stable across V8/SpiderMonkey, but absolute times differ.

---

## Which ψ should I use?

* **Use `digamma`** for most numeric work. It’s fast and accurate (tail4 asymptotics, careful reflection).
* **Use `digamma12`** when precision matters (statistical functions, special-function work, tests).
* **Use `digammaFast`** when you really want speed and can tolerate \~1e-6 typical error after shifting.
* **Use `digammaUltra`** only for coarse tasks or synthesized signals where visual smoothness beats numeric truth.

---

## API

### Exports

```ts
// constants
export const TAU: number;            // 2π
export const HALF_PI: number;        // π/2
export const INV_PI: number;         // 1/π
export const EULER_GAMMA: number;    // 0.5772156649…
export const ZETA2: number;          // π²/6
export const TWO_LN2: number;        // 2 ln 2
export const SQRT_2PI: number;       // √(2π)

// functions
export function digamma(x: number): number;
export function digamma12(x: number, PRECISION?: number): number;
export function digammaFast(x: number): number;
export function digammaUltra(x: number): number;

export const H:   (x: number) => number;   // H(x) = ψ(x+1) + γ
export const H12: (x: number) => number;

export function square(a: number, b: number): number;
export function square12(a: number, b: number): number;

export function kMath(): Readonly<{
  TAU, HALF_PI, EULER_GAMMA, ZETA2, TWO_LN2, SQRT_2PI,
  digamma, digamma12, digammaFast, H, H12, square, square12
}>;
```

### Behavior notes

* **Poles:** `ψ(x)` returns `Infinity` for x ∈ {0, −1, −2, …}.
* **Reflection:** carefully handled to avoid catastrophic cancellation; tiny neighborhoods near integers use series expansion instead of `Math.tan`.
* **Asymptotics:** `digamma` uses a **4-term** Bernoulli tail (balanced speed/accuracy). `digamma12` uses a longer tail and higher shift target.

### Examples

```js
// High-accuracy evaluation on a grid
const xs = Array.from({length: 11}, (_,i)=> i/10 + 0.1);
const ys = xs.map(x => digamma12(x));   // precise

// Fast harmonic numbers
const Hn = (n) => H(n);                  // integer n
const Hx = (x) => H(x);                  // real x
console.log(Hn(1000), Hx(12.5));

// Square waveshaper sweep
const N = 1024, b = 8.0;
const pts = new Float64Array(N);
for (let i=0;i<N;i++){
  const a = (i/(N-1)) * TAU;
  pts[i] = square(a, b);                 // or square12 for precision
}
```

---

## Reproducing the benchmark

The repo includes a **demo page** with:

* ψ explorer (compare `digamma` vs `digamma12`),
* the digamma-based square waveshaper,
* and the **benchmark** (speed + accuracy vs reference and other libs).

**Methodology**:

* Deterministic PRNG (LCG), x ∈ (−3, 6), “nudge” off exact poles
* **Warm-up** loop to let the JIT settle
* Accuracy measured against `digamma12(x, 18)` on a mixed set (edge probes + random slice)
* `tan()` calls counted to show how often reflection paid for a trig call
* “Sum” accumulates the return value to defeat dead-code elimination

---

## License

MIT. Use it, ship it, have fun.
