function shallowCopy(obj) {
  if (Array.isArray(obj)) return obj.slice();
  if (obj && typeof obj === "object") return Object.assign({}, obj);
  return obj;
}
