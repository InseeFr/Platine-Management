export function times<T>(n: number, cb: (k: number) => T): T[] {
  return new Array(n).fill(null).map((_, k) => cb(k));
}
