/**
 * 模拟实现new操作符的功能
 * @param {Function} Constructor - 需要实例化的构造函数
 * @param {...any} args - 传递给构造函数的参数
 * @returns {Object} 构造函数实例化后的对象或构造函数返回的对象
 */
function myNew(Constructor, ...args) {
  // 检查构造函数是否为函数类型
  if (typeof Constructor !== "function")
    throw new TypeError("Constructor must be a function");
  
  // 创建一个新对象，其原型指向构造函数的prototype
  const obj = Object.create(Constructor.prototype);
  
  // 将构造函数的this绑定到新对象并执行
  const result = Constructor.apply(obj, args);
  
  // 如果构造函数返回了对象或函数，则返回该结果，否则返回新创建的对象
  return result && (typeof result === "object" || typeof result === "function")
    ? result
    : obj;
}