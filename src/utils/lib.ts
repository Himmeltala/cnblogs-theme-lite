type CurryFunction<T, R> = (arg: T) => R | CurryFunction<T, R>;

export function curry<T, R>(fn: (...args: T[]) => R): CurryFunction<T, R> {
  return function curried(...args: T[]): R | CurryFunction<T, R> {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs: T[]): R | CurryFunction<T, R> {
        return curried(...args, ...nextArgs);
      };
    }
  };
}
