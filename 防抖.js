function debounce(fn, wait = 300, immediate = false) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    if (immediate && !timer) {
      fn.apply(context, args);
    }
    timer = setTimeout(() => {
      if (!immediate) fn.apply(context, args);
      timer = null;
    }, wait);
  };
}
