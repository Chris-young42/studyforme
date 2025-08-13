function get(obj, path, defaultValue) {
  if (typeof path === 'string') {
    // 把 'a.b[0].c' 转成 ['a','b','0','c']
    path = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  }

  let result = obj;
  for (const key of path) {
    if (result == null || !Object.prototype.hasOwnProperty.call(result, key)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}