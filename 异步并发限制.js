// tasks: 函数数组，每个函数返回 Promise；limit: 并发数
function asyncPool(tasks, limit = 3) {
  const results = [];
  let i = 0;
  const executing = [];

  function enqueue() {
    if (i === tasks.length) return Promise.resolve();
    const index = i++;
    const p = Promise.resolve()
      .then(() => tasks[index]())
      .then((res) => {
        results[index] = res;
      });
    executing.push(p);
    const clean = () => executing.splice(executing.indexOf(p), 1);
    p.then(clean).catch(clean);
    let r = Promise.resolve();
    if (executing.length >= limit) {
      r = Promise.race(executing);
    }
    return r.then(() => enqueue());
  }
  return enqueue()
    .then(() => Promise.all(executing))
    .then(() => results);
}
