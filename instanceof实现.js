/**
 * 检查对象是否是构造函数的实例
 * @param {*} obj - 需要检查的对象
 * @param {Function} Constructor - 构造函数
 * @returns {boolean} 如果对象是构造函数的实例则返回true，否则返回false
 */
function myInstanceof(obj, Constructor) {
  // 如果对象为null或undefined，直接返回false
  if (obj == null) return false;
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  // 获取构造函数的原型
  const prototype = Constructor.prototype;
  // 沿原型链向上查找
  while (proto) {
    // 如果找到匹配的原型，说明obj是Constructor的实例
    if (proto === prototype) return true;
    // 继续向上查找原型链
    proto = Object.getPrototypeOf(proto);
  }
  // 遍历完整个原型链都没找到匹配项，返回false
  return false;
}