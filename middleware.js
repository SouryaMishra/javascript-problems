/*
Middleware functions are functions with fixed interface that could be chained up like following two functions.

app.use('/user/:id', function (req, res, next) {
  next()
}, function (req, res, next) {
  next(new Error('sth wrong'))
})


You are asked to create simplified Middleware system:


type Request = object
type NextFunc =  (error?: any) => void
type MiddlewareFunc = 
  (req: Request, next: NextFunc) => void
type ErrorHandler = 
  (error: Error, req: Request, next: NextFunc) => void
class Middleware {
  use(func: MiddlewareFunc | ErrorHandler) {
    // do any async operations
    // call next() to trigger next function
  }
  start(req: Request) {
    // trigger all functions with a req object
  }
}


Now we can do something similar with Express


const middleware = new Middleware()
middleware.use((req, next) => {
   req.a = 1
   next()
})
middleware.use((req, next) => {
   req.b = 2
   next()
})
middleware.use((req, next) => {
   console.log(req)
})
middleware.start({})
// {a: 1, b: 2}


Notice that use() could also accept an ErrorHandler which has 3 arguments. The error handler is triggered if next() is called with an extra argument or uncaught error happens, like following.


const middleware = new Middleware()
// throw an error at first function
middleware.use((req, next) => {
   req.a = 1
   throw new Error('sth wrong') 
   // or `next(new Error('sth wrong'))`
})
// since error occurs, this is skipped
middleware.use((req, next) => {
   req.b = 2
})
// since error occurs, this is skipped
middleware.use((req, next) => {
   console.log(req)
})
// since error occurs, this is called
middleware.use((error, req, next) => {
   console.log(error)
   console.log(req)
})
middleware.start({})
// Error: sth wrong
// {a: 1}

*/

class Middleware {
  constructor() {
    this.callbacks = [];
  }
  /**
   * @param {MiddlewareFunc} func
   */
  use(func) {
    this.callbacks.push(func);
  }

  /**
   * @param {Request} req
   */
  start(req) {
    let counter = 0;

    let next = (error) => {
      const callback = this.callbacks[counter];
      counter++;

      if (typeof callback !== "function") return;

      try {
        if (error) {
          // It means it's an error handler
          if (callback.length === 3) callback(error, req, next)
          // callback is not an error handler, so pass the error to the next callback
          else next(error)
        }
        else {
          callback(req, next)
        }
      }
      catch (error) {
        // pass the error to next callback if error happens in either a normal callback or an error handler
        next(error);
      }
    }

    next();
  }
}

const req = {}
const middleware = new Middleware()
middleware.use((req, next) => {
  req.a = 1
  next()
})
middleware.use((req, next) => {
  req.b = 2
  next()
})
middleware.use((req, next) => {
  req.c = 3
  next()
})
middleware.start(req);
console.log({ req });