function myInstanceof(obj, Constructor) {
  if (obj == null) return false;
  let proto = Object.getPrototypeOf(obj);
  const prototype = Constructor.prototype;
  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
