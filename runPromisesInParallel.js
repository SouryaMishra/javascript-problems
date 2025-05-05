const createAsyncTask = () => () =>
  new Promise((resolve, reject) => {
    const value = Math.floor(Math.random() * 10);
    const isEven = value % 2 === 0;
    setTimeout(() => (isEven ? resolve(value) : reject(`Task failed after ${value} seconds`)), value * 1000);
  });

const startAsyncTasks = (tasks, callback) => {
  const results = [];
  let tasksCompleted = 0;

  const executeCallback = () => {
    tasksCompleted++;
    if (tasksCompleted === tasks.length) callback(results);
  };

  tasks.forEach(task => {
    task()
      .then(value => {
        console.log(`Task completed after ${value} seconds`);
        results.push(value);
      })
      .catch(console.error)
      .finally(executeCallback);
  });
};

startAsyncTasks([createAsyncTask(), createAsyncTask(), createAsyncTask()], results => console.log('All tasks completed', results));
