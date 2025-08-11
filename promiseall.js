/**
 * 等待所有Promise完成，并返回包含所有结果的数组
 * @param {Array} promises - Promise对象或值的数组
 * @returns {Promise} - 当所有Promise都解决时，返回包含所有结果的Promise
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 处理空数组或无效参数的情况
    if (!promises || !promises.length) return resolve([]);
    const res = [];
    let count = 0;
    // 遍历所有Promise并等待它们完成
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          res[i] = val;
          count++;
          // 当所有Promise都完成时，解决最终的Promise
          if (count === promises.length) resolve(res);
        })
        .catch(reject);
    });
  });
}