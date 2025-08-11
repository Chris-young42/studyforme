/**
 * 异步并发控制函数，用于限制同时执行的Promise数量
 * @param {Function[]} tasks - 返回Promise的函数数组
 * @param {number} limit - 最大并发数，默认为3
 * @returns {Promise<any[]>} - 按顺序解析所有任务结果的Promise
 */
function asyncPool(tasks, limit = 3) {
  const results = [];
  let i = 0;
  const executing = [];

  // 递归入队函数，控制任务执行
  function enqueue() {
    // 所有任务已入队，返回resolved状态的Promise
    if (i === tasks.length) return Promise.resolve();
    const index = i++;
    const p = Promise.resolve()
      .then(() => tasks[index]()) // 执行当前任务
      .then((res) => {
        results[index] = res; // 保存执行结果
      });
    executing.push(p);
    // 清理函数，任务完成后从执行队列中移除
    const clean = () => executing.splice(executing.indexOf(p), 1);
    p.then(clean).catch(clean);
    let r = Promise.resolve();
    // 达到并发限制时，等待任一任务完成后再继续
    if (executing.length >= limit) {
      r = Promise.race(executing);
    }
    return r.then(() => enqueue());
  }
  return enqueue()
    .then(() => Promise.all(executing)) // 等待所有任务完成
    .then(() => results);
}