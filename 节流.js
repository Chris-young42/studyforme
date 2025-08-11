function throttle(fn, wait = 300, options = {}) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    const context = this;
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(context, args);
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}
