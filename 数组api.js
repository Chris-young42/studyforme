/**
 * 自定义实现 Array.prototype.map 方法
 * 创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值
 * @param {Function} fn - 为数组中每个元素执行的函数，接收三个参数：
 *   - currentValue: 当前正在处理的元素
 *   - index: 当前正在处理的元素的索引
 *   - array: 调用 map 的数组本身
 * @param {*} [thisArg] - 执行 fn 时使用的 this 值
 * @returns {Array} 一个新数组，每个元素都是执行 fn 后的返回值
 */
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (fn, thisArg) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      // 使用 in 操作符检查索引是否存在于数组中，处理稀疏数组的情况
      if (i in this) res.push(fn.call(thisArg, this[i], i, this));
    }
    return res;
  };
}

/**
 * 自定义实现 Array.prototype.filter 方法
 * 创建一个新数组，包含所有通过测试的元素
 * @param {Function} fn - 用于测试数组中每个元素的函数，返回 true 表示通过测试，false 表示不通过，接收三个参数：
 *   - currentValue: 当前正在处理的元素
 *   - index: 当前正在处理的元素的索引
 *   - array: 调用 filter 的数组本身
 * @param {*} [thisArg] - 执行 fn 时使用的 this 值
 * @returns {Array} 包含所有通过测试的元素组成的新数组
 */
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (fn, thisArg) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      // 检查索引是否存在且元素通过测试函数
      if (i in this && fn.call(thisArg, this[i], i, this)) res.push(this[i]);
    }
    return res;
  };
}

/**
 * 自定义实现 Array.prototype.reduce 方法
 * 对数组中的每个元素执行 reducer 函数(升序执行)，将其结果汇总为单个返回值
 * @param {Function} fn - 为数组中每个元素执行的函数，接收四个参数：
 *   - accumulator: 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或 initialValue
 *   - currentValue: 当前正在处理的元素
 *   - index: 当前正在处理的元素的索引
 *   - array: 调用 reduce 的数组本身
 * @param {*} [initial] - 用作第一个调用 fn 的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素
 * @returns {*} 累计器累计的最终结果
 */
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function (fn, initial) {
    let i = 0;
    let acc = initial;
    // 如果没有提供初始值，则找到数组中第一个存在的元素作为初始值
    if (acc === undefined) {
      while (i < this.length && !(i in this)) i++;
      acc = this[i++];
    }
    // 从当前索引开始遍历剩余元素，执行累积操作
    for (; i < this.length; i++) {
      if (i in this) acc = fn(acc, this[i], i, this);
    }
    return acc;
  };
}