/**
 * 节流函数 - 限制函数的执行频率，确保函数在指定的时间间隔内只执行一次
 * @param {Function} fn - 需要进行节流处理的函数
 * @param {number} wait - 节流等待时间（毫秒），默认为300毫秒
 * @param {Object} options - 配置选项
 * @param {boolean} options.trailing - 是否在最后执行一次调用（如果有的话），默认为true
 * @returns {Function} 返回一个经过节流处理的函数
 */
function throttle(fn, wait = 300, options = {}) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    const context = this;
    // 如果距离上次执行的时间差已经超过设定的等待时间，则立即执行
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(context, args);
    // 如果还有剩余时间且没有设置定时器，且配置允许尾部执行，则设置定时器
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}