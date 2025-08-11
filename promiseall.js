function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !promises.length) return resolve([]);
    const res = [];
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          res[i] = val;
          count++;
          if (count === promises.length) resolve(res);
        })
        .catch(reject);
    });
  });
}
