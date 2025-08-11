/**
 * 深度比较两个值是否相等
 * @param {*} a - 要比较的第一个值
 * @param {*} b - 要比较的第二个值
 * @param {WeakMap} seen - 用于跟踪已比较对象的弱映射，防止循环引用导致的无限循环
 * @returns {boolean} 两个值是否深度相等
 */
function deepEqual(a, b, seen = new WeakMap()) {
  // 基本相等检查（包括相同引用的情况）
  if (a === b) return true;
  
  // 特殊处理NaN的情况（NaN不等于自身，但在这里我们认为两个NaN是相等的）
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  
  // 如果任一值不是对象或为null，则不相等
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  )
    return false;
    
  // 检查构造函数是否相同
  if (a.constructor !== b.constructor) return false;

  // 检查循环引用情况
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  // 特殊对象类型处理：日期
  if (a instanceof Date) return a.getTime() === b.getTime();
  
  // 特殊对象类型处理：正则表达式
  if (a instanceof RegExp) return a.toString() === b.toString();

  // 比较普通对象的键值对
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  // 如果键的数量不同，则对象不相等
  if (keysA.length !== keysB.length) return false;
  
  // 检查每个键和对应的值
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key], seen)) return false;
  }
  return true;
}