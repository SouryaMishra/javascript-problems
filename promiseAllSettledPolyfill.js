/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  if (!Array.isArray(promises)) return Promise.reject(`${promises} is not iterable`);
  // If promises is an empty array, the returned promise is immediately resolved with []
  if (promises.length === 0) return Promise.resolve(promises);

  // Results are in the order of the promises passed, regardless of completion order.
  const results = [];
  let settledCount = 0;

  return new Promise((resolve) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(
          (value) =>
            (results[i] = {
              status: "fulfilled",
              value,
            })
        )
        .catch(
          (err) =>
            (results[i] = {
              status: "rejected",
              reason: err,
            })
        )
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) resolve(results);
        });
    }
  });
}

allSettled([Promise.resolve("value1"), Promise.reject("value2"), Promise.resolve("value3")]).then(console.log);
