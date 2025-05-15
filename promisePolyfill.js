class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.error = undefined;
    this.thenCallback = () => {};
    this.catchCallback = () => {};

    executor(
      (value) => {
        this.value = value;
        this.thenCallback(value);
      },
      (error) => {
        this.error = error;
        this.catchCallback(error);
      }
    );
  }

  then(callback) {
    this.thenCallback = callback;
    return this;
  }

  catch(callback) {
    this.catchCallback = callback;
    return this;
  }
}

new MyPromise((res, rej) => setTimeout(() => rej("rejected value"), 0)).catch((err) => console.log({ err }));
