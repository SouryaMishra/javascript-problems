/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  if (!Array.isArray(promises)) return Promise.reject(`${promises} is not iterable`);
  // If promises is an empty array, the returned promise is forever pending
  if (promises.length === 0) return new Promise((resolve, reject) => {});

  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve).catch(reject);
    }
  });
}

const getPromise = (value, delay) => new Promise((_, reject) => setTimeout(() => reject(value), delay));

race([1, 2]).then(console.log);
race([Promise.resolve("value1"), Promise.resolve("value2")]).then(console.log);
race([getPromise("value1", 300), getPromise("value2", 200), getPromise("value3", 100)]).catch(console.log);
