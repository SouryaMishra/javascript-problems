const createAsyncTask = () => {
  return (callback) => {
    const value = Math.floor(Math.random() * 10);
    setTimeout(() => {
      const isEven = value % 2 === 0;
      callback(isEven ? {value: value, status: "completed"} : {status: "failed"});
    }, value * 1000)
  }
}

const startAsyncTasks = (tasks, callback) => {
  const results = [];
  let completedTasks = 0;
  
  tasks.forEach(task => {
    const cb = ({value, status}) => {
      completedTasks++;
      if(status === "completed") {
        results.push(value);
        console.log(`Task completed after ${value} seconds`);
      }
      else console.log(`Task failed after ${value} seconds`);
      if(completedTasks === tasks.length) callback(results);
    }
    task(cb);
  })
  
}

startAsyncTasks([createAsyncTask(), createAsyncTask(), createAsyncTask()], (results) => console.log("All tasks completed", results));

