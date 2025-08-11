/**
 * 数组去重函数
 * @param {Array} arr - 需要去重的数组
 * @returns {Array} 去重后的新数组
 */
function unique(arr) {
  return Array.from(new Set(arr));
}
// 更通用（对象）:
function uniqueBy(arr, keyFn = (x) => x) {
  const set = new Set();
  return arr.filter((item) => {
    const k = keyFn(item);
    if (set.has(k)) return false;
    set.add(k);
    return true;
  });
}
