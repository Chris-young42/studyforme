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
