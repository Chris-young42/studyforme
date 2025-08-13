/**
 * 深拷贝函数，创建一个对象的深层副本，处理循环引用
 * @param {any} obj - 需要深拷贝的对象
 * @param {WeakMap} map - 用于存储已拷贝对象的映射，防止循环引用导致的无限递归
 * @returns {any} 返回对象的深层副本
 */
function deepCopy(obj, map = new WeakMap()) {
  // 如果值是null或者不是对象类型，则直接返回该值（基本类型不需要深拷贝）
  if (obj === null || typeof obj !== "object") return obj;
  // 如果是Date对象，则创建一个新的Date对象并复制时间值
  if (obj instanceof Date) return new Date(obj.getTime());
  // 如果是RegExp对象，则创建一个新的RegExp对象并复制源和标志
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  // 检查map中是否已经存在该对象，如果存在说明是循环引用，直接返回已拷贝的对象
  if (map.has(obj)) return map.get(obj);

  // 判断原对象是数组还是普通对象，创建对应的新对象
  const copy = Array.isArray(obj) ? [] : {};
  // 将原对象作为键，拷贝对象作为值存入map中，处理循环引用
  map.set(obj, copy);
  // 遍历对象的所有可枚举属性
  for (const key in obj) {
    // 使用hasOwnProperty确保只处理对象自身的属性，不包括原型链上的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归调用deepCopy函数处理每个属性值，并赋值给新对象
      copy[key] = deepCopy(obj[key], map);
    }
  }
  // 返回深拷贝后的新对象
  return copy;
}
