function deepCopy(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key], map);
    }
  }
  return copy;
}
