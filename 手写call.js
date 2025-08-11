/**
 * 手写实现Function.prototype.call方法
 * @param {Object} context - 函数执行时的上下文对象，即this指向的对象
 * @param  {...any} args - 传递给函数的参数列表
 * @returns {*} 返回调用函数的返回值
 */
Function.prototype.myCall = function (context, ...args) {
  // 如果context为null或undefined，则默认为globalThis(全局对象)
  context = context || globalThis;
  // 创建一个唯一的Symbol作为属性名，避免覆盖原有属性
  const fnSymbol = Symbol();
  // 将当前函数(this)作为context的临时属性
  context[fnSymbol] = this;
  // 执行函数并传入参数，此时函数内的this指向context
  const result = context[fnSymbol](...args);
  // 删除临时添加的属性，恢复context原状
  delete context[fnSymbol];
  // 返回函数执行结果
  return result;
};