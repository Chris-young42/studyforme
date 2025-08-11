/**
 * 将嵌套对象扁平化为单层对象
 * @param {Object} obj - 需要扁平化的原始对象
 * @param {string} prefix - 属性名前缀，用于构建扁平化后的属性名
 * @param {Object} res - 存储扁平化结果的对象
 * @returns {Object} 扁平化后的对象
 */
function flattenObject(obj, prefix = "", res = {}) {
  // 遍历对象的所有属性
  for (const key in obj) {
    // 只处理对象自身的属性，忽略继承属性
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const val = obj[key];
    // 构建新的属性名，如果存在前缀则用点号连接
    const newKey = prefix ? `${prefix}.${key}` : key;
    // 判断是否为普通对象（非数组、非Date对象），如果是则递归处理
    if (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      !(val instanceof Date)
    ) {
      flattenObject(val, newKey, res);
    } else {
      // 如果不是普通对象，则直接赋值到结果对象中
      res[newKey] = val;
    }
  }
  return res;
}
