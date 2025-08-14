/**
 * 异步并发控制函数，限制同时执行的异步任务数量
 * @param {number} poolLimit - 并发限制数量，同时执行的异步任务的最大数量
 * @param {Array} array - 需要处理的数据数组
 * @param {Function} iteratorFn - 用于处理数组中每个元素的异步函数
 * @returns {Promise<Array>} 返回一个Promise，resolve时得到所有异步任务的结果数组
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有异步任务的Promise
  const executing = []; // 存储正在执行的异步任务Promise
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    // 当设置了并发限制且数组长度大于限制时，控制并发执行数量
    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      // 当正在执行的任务数量达到限制时，等待任意一个任务完成
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}