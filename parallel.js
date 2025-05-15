/*
You are asked to implement an async function helper, parallel() which works like Promise.all(). Different from sequence(), the async function doesn't wait for each other, rather they are all triggered together.

All async functions have following interface

type Callback = (error: Error, data: any) => void
type AsyncFunc = (
   callback: Callback,
   data: any
) => void
Your parallel() should accept AsyncFunc array, and return a new function which triggers its own callback when all async functions are done or an error occurs.

Suppose we have an 3 async functions

const async1 = (callback) => {
   callback(undefined, 1)
}
const async2 = (callback) => {
   callback(undefined, 2)
}
const async3 = (callback) => {
   callback(undefined, 3)
}
Your parallel() should be able to accomplish this

const all = parallel(
  [
    async1,
    async2,
    async3
  ]
)
all((error, data) => {
   console.log(data) // [1, 2, 3]
}, 1)
When error occurs, only first error is passed down to the last. Later errors or data are ignored.
*/

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  const results = [];
  let completedCount = 0;
  let error = undefined;

  return function (callback) {
    funcs.forEach((func, index) => {
      func((err, data) => {
        if (error) return;

        if (err) {
          error = err;
          callback(err, undefined);
          return;
        }

        completedCount++;
        results[index] = data;
        if (completedCount === funcs.length) callback(undefined, results);
      })
    });
  }
}

const createThunk = num => callback => setTimeout(() => callback(undefined, num), 0)
const createError = error => callback => setTimeout(() => callback(error, undefined), 0)

let thunk = parallel([createThunk(1), createThunk(2), createThunk(3)])

thunk((error, data) => {
  console.log({ error, data })
})

thunk = parallel([
  createThunk(1),
  createError('error1'),
  createError('error2'),
  createThunk(2)
])

thunk((error, data) => {
  console.log({ error, data })
})

