function curry(fn, arity = fn.length) {
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function (...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}
