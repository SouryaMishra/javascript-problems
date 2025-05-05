function promiseWithAutoRetry(fetcher, retries) {
  if (retries === undefined || retries === 0) return fetcher();
  let count = 0;

  const retryPromise = () => {
    if (count === retries) {
      return Promise.reject(new Error("All retries were unsuccessful"));
    }
    return fetcher().catch(() => {
      count++;
      console.log({ retryCount: count });
      return retryPromise();
    });
  };

  return retryPromise();
}

async function promiseWithAutoRetryAsyncAwait(fetcher, retries) {
  if (retries === undefined || retries === 0) return fetcher();
  let count = 0;

  const retryPromise = async () => {
    if (count === retries) {
      return Promise.reject(new Error("All retries were unsuccessful"));
    }

    try {
      return await fetcher();
    } catch (_) {
      count++;
      console.log({ retryCount: count });
      return retryPromise();
    }
  };

  return retryPromise();
}

const fetcher = () => {
  const min = 1;
  const max = 3;
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  // return Promise.reject(new Error("rejected"));
  return randomNumber === 1 ? Promise.reject(new Error("rejected")) : Promise.resolve("resolved");
};

// console.log("passing retries = 2");
// promiseWithAutoRetry(fetcher, 2)
//   .then((value) => console.log(value))
//   .catch((err) => console.error(err.message));

console.log("passing retries = 2");
promiseWithAutoRetryAsyncAwait(fetcher, 2)
  .then((value) => console.log(value))
  .catch((err) => console.error(err.message));
