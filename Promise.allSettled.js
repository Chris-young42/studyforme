/**
 * 等待所有Promise完成或拒绝，返回一个包含每个Promise结果的数组
 * 与Promise.all不同，即使某些Promise被拒绝，此函数也会等待所有Promise完成
 * @param {Array} promises - Promise对象或值的数组
 * @returns {Promise} - 返回一个Promise，该Promise在所有输入的Promise都已完成或拒绝时resolve，
 *                      结果是一个对象数组，每个对象表示对应Promise的状态和值或拒绝原因
 */
function promiseAllSettled(promises) {
  // 将每个输入转换为Promise，并处理fulfilled和rejected状态
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}