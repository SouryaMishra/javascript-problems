/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  if (!Array.isArray(promises)) return Promise.reject(`${promises} is not iterable`);
  // If promises is an empty array, the returned promise is immediately resolved with []
  if (promises.length === 0) return Promise.resolve(promises);

  let resolvedCount = 0;
  // Results are in the order of the promises passed, regardless of completion order.
  const results = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) resolve(results);
        })
        .catch(reject);
    }
  });
}

const getPromise = (value, delay) => new Promise((resolve) => setTimeout(() => resolve(value), delay));

all([getPromise("value1", 300), getPromise("value2", 200), getPromise("value3", 100)]).then(console.log);
