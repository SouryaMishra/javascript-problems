/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  if (!Array.isArray(promises)) return Promise.reject(`${promises} is not iterable`);
  // If promises is an empty array, returned promise rejects with AggregateError
  if (promises.length === 0) return Promise.reject(new AggregateError("No Promise in Promise.any was resolved"));

  let rejectedCount = 0;
  // Errors are in the order of the promises passed, regardless of completion order.
  const errors = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          rejectedCount++;
          if (rejectedCount === promises.length)
            reject(new AggregateError("No Promise in Promise.any was resolved", errors));
        });
    }
  });
}

any([Promise.resolve("value1"), Promise.reject("value2"), Promise.resolve("value3")]).then(console.log);
any([Promise.reject("value1"), Promise.reject("value2"), Promise.reject("value3")]).catch(console.log);
