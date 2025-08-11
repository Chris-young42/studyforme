/**
 * 函数柯里化工具函数
 * 将一个多参数函数转换为一系列嵌套的单参数函数
 * @param {Function} fn - 需要进行柯里化的原始函数
 * @param {Number} arity - 函数的元数（参数个数），默认为fn的参数个数
 * @returns {Function} 返回柯里化后的函数
 */
function curry(fn, arity = fn.length) {
  return function curried(...args) {
    // 如果已收集的参数数量达到或超过函数元数，则执行原函数
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    // 否则返回一个新函数，用于收集更多参数并继续柯里化过程
    return function (...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}