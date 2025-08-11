if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(fn, thisArg) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) res.push(fn.call(thisArg, this[i], i, this));
    }
    return res;
  };
}

if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(fn, thisArg) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this && fn.call(thisArg, this[i], i, this)) res.push(this[i]);
    }
    return res;
  };
}

if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function(fn, initial) {
    let i = 0;
    let acc = initial;
    if (acc === undefined) {
      while (i < this.length && !(i in this)) i++;
      acc = this[i++];
    }
    for (; i < this.length; i++) {
      if (i in this) acc = fn(acc, this[i], i, this);
    }
    return acc;
  };
}
