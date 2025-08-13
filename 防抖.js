/**
 * 防抖函数，用于限制函数的执行频率，避免函数在短时间内被频繁调用
 * @param {Function} fn - 需要进行防抖处理的函数
 * @param {number} wait - 延迟执行的毫秒数，默认为300ms
 * @param {boolean} immediate - 是否立即执行函数，默认为false
 * @returns {Function} 返回一个经过防抖处理的函数
 */
function debounce(fn, wait = 300, immediate = false) {
  let timer;
  return function (...args) {
    const context = this;
    // 清除之前的定时器，避免重复执行
    if (timer) clearTimeout(timer);
    // 如果设置为立即执行且是第一次触发，则立即执行函数
    if (immediate && !timer) {
      fn.apply(context, args);
    }
    // 设置定时器，延迟执行函数
    timer = setTimeout(() => {
      // 如果不是立即执行模式，则在延迟结束后执行函数
      if (!immediate) fn.apply(context, args);
      timer = null;
    }, wait);
  };
}