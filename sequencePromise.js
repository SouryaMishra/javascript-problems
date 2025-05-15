async function sequenceAsync(tasks) {
  let completedCount = 0;
  const results = [];

  for (let i = 0; i < tasks.length; i++) {
    try {
      const data = await tasks[i]();
      results[i] = data;
      completedCount++;
      if (completedCount === tasks.length) return results;
    } catch (err) {
      throw err;
    }
  }
}

function sequenceRecursive(tasks) {
  return new Promise((resolve, reject) => {
    const results = [];

    const start = (index) => {
      tasks[index]()
        .then((value) => {
          results[index] = value;
          index++;
          if (index === tasks.length) resolve(results);
          else start(index);
        })
        .catch(reject);
    };

    start(0);
  });
}

const task1 = () => new Promise((resolve) => setTimeout(() => resolve("value 1"), 1000));
const task2 = () => new Promise((_, reject) => setTimeout(() => reject("value 2"), 2000));
const task3 = () => new Promise((_, reject) => setTimeout(() => reject("value 3"), 3000));

sequenceAsync([task1, task2, task3]).then(console.log).catch(console.log);
sequenceRecursive([task1, task2, task3]).then(console.log).catch(console.log);
