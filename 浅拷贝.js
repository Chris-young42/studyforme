/**
 * 执行对象的浅拷贝操作
 * @param {any} obj - 需要进行浅拷贝的参数，可以是数组、对象或其他类型的值
 * @returns {any} 返回原始值，或者数组/对象的浅拷贝副本
 */
function shallowCopy(obj) {
  // 如果是数组，则使用slice方法创建数组的浅拷贝
  if (Array.isArray(obj)) return obj.slice();
  // 如果是对象，则使用Object.assign方法创建对象的浅拷贝
  if (obj && typeof obj === "object") return Object.assign({}, obj);
  // 如果是基本数据类型，则直接返回
  return obj;
}