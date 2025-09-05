export const TAU: number;
export const HALF_PI: number;
export const INV_PI: number;
export const EULER_GAMMA: number;
export const ZETA2: number;
export const TWO_LN2: number;
export const SQRT_2PI: number;

export function digamma(x: number): number;
export function digamma12(x: number, PRECISION?: number): number;
export function digammaFast(x: number): number;
export function digammaUltra(x: number): number;

export const H:   (x: number) => number; // H(x) = ψ(x+1) + γ
export const H12: (x: number) => number;

export function square(a: number, b: number): number;
export function square12(a: number, b: number): number;
