/**
 * 并发限制
 */
 const delay = function(interval) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(interval);
    }, interval);
  })
}

let tasks = [
  () => delay(1000),
  () => delay(1003),
  () => delay(1002),
  () => delay(1006),
  () => delay(2000),
  () => delay(3000),
]

// Promise.all(tasks.map(task => task())).then(res => {
//   console.log(res);
// })
// function asyncPool(poolLimit, arr, iteratorFn) {}
// /**
//  * 实现一个并发限制函数(一个失败，整体失败)
//  * @param {*} tasks 并发队列
//  * @param {*} poolLimit 并发数量
//  */
function createRequest(tasks, poolLimit) {
  poolLimit = poolLimit || 2;
  let results = [],
      together = new Array(poolLimit).fill(null), // 创建一个工作区
      index = 0;
  together = together.map(() => {
    return new Promise((resolve, reject) => {
      function run() {
        if (index >= tasks.length) {
          resolve();
          return;
        }
        let oldIndex = index,
            task = tasks[index++];
        console.log(index, tasks[oldIndex]);
        // index ++;
        task().then(result => {
          results[oldIndex] = result;
          run()
        }).catch(reason => { reject(reason) })
      }
      run();
    })
  })
  return Promise.all(together).then(() => results, reason => Promise.reject(reason))
}

createRequest(tasks, 2).then(results => {
  // 整体成功才能算成功，按顺序储存结果
  console.log('成功 ==>', results);
}, reason => {
  console.log('失败 ==>', reason);
})


/**
 * 
 * @param {*} tasks 
 * @param {*} pool 
 * @param {*} callback 
 */
function createRequest(tasks, pool, callback) {
  if (typeof pool === 'function') {
    callback = poll;
    poll = 2;
  }
  if (typeof pool !== 'number') pool = 5;
  if (typeof callback !== 'function') callback = function () {};
  
}