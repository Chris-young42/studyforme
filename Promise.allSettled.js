function promiseAllSettled(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}
