// 记录MyPromise的三种状态
const PENDING = 'pending';
const FULFILLED  = 'fulfilled';
const REJECTED = 'rejected';


/**
 * 
 * @param {Function} callback 
 */
function runMicroTask(callback) {
  if (process && process.nextTick) {
    process.nextTick(callback);
  } else if (MutationObserver) {
    const p = document.createElement('p');
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true,
    })
    p.innerHTML = 1;
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * 任务执行器
 * @param {Function} executor 
 */
function MyPromise(executor) {
  // console.log(executor);
  this._state = PENDING;
  this._value = undefined;
  this._handlers = [];
  // 更改状态
  const _changeState = (newState, value) => {
    if (this._state !== PENDING) {
      return;
    }
    this._state = newState;
    this._value = value;
  }
  const _resolve = (result) => {
    // console.log(result);
    // 改变状态和数据
    _changeState(FULFILLED, result);
    this.runHandlers();
  }
  const _reject = (reason) => {
    // console.log(reason);
    // 改变状态和数据
    _changeState(REJECTED, reason);
    this.runHandlers();
  }
  try {
    executor(_resolve, _reject);
  } catch (error) {
    _reject(error);
  }
}

function isPromise(obj) {
  return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
}

/**
 * 
 * @param {Function} onFulfilled 
 * @param {Function} onRejected 
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    this.pushHandlers(onFulfilled, FULFILLED, resolve, reject);
    this.pushHandlers(onRejected, REJECTED, resolve, reject);
    this.runHandlers();
  })
}

/**
 * 向处理队列中添加一个函数
 * @param {Function} executor 添加的函数
 * @param {String} state 
 * @param {Function} resolve
 * @param {Function} reject
 */
MyPromise.prototype.pushHandlers = function (executor, state, resolve, reject) {
  this._handlers.push({
    executor,
    state,
    resolve,
    reject,
  });
}

MyPromise.prototype.runHandlers = function () {
  if (this._state === PENDING) {
    return;
  }
  while (this._handlers[0]) {
    this.runOneHandler(this._handlers[0]);
    this._handlers.shift();
  }
}

MyPromise.prototype.runOneHandler = function ({ executor, state, resolve, reject }) {
  runMicroTask(() => {
    if (this._state !== state) {
      return;
    }
    // console.log(this._state);
    if (typeof executor !== 'function') {
      this._state === FULFILLED ? resolve(this._value) : reject(this._value);
      return;
    }
    try {
      const result = executor(this._value);
      if (isPromise(result)) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (err) {
      reject(err);
    }
  });
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

MyPromise.prototype.finally = function (onSettled) {
  return this.then((data) => {
    onSettled();
    return data;
  }, (data) => {
    onSettled()
    throw data;
  })
}

MyPromise.resolve = function (data) {
  if (data instanceof MyPromise) {
    return data;
  }
  return new MyPromise((resolve, reject) => {
    if (isPromise(data)) {
      data.then(resolve, reject)
    } else {
      resolve(data)
    }
  })
}

MyPromise.reject = function (data) {
  return new MyPromise((resolve, reject) => {
    reject(data);
  })
}
MyPromise.all = function (arr) {
  return new MyPromise((resolve, reject) => {
    try {
      const result = []
      let count = 0
      let fulfilledCount = 0
      for (const p of arr) {
        let i = count
        count ++
        MyPromise.resolve(p).then((data) => {
          result[i] = data;
          fulfilledCount ++;
          if (fulfilledCount === count) {
            resolve(result)
          }
        }, reject)
      }
      if (count === 0) {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  })
}
MyPromise.allSettled = function (arr) {
  const ps = []
  for (const p of arr) {
    ps.push(
      MyPromise.resolve(p).then(
        (value) => ({
          status: FULFILLED,
          value,
        }),
        (reason) => ({
          status: REJECTED,
          reason
        })
      )
    )
  }
  return MyPromise.all(ps);
}
MyPromise.race = function (arr) {}
// const pro = new Promise((resolve, reject) => {
//   resolve(1);
// })

// pro.then((data) => {
//   console.log(data);
//   return new MyPromise((resolve, reject) => {
//     resolve(2)
//   })
// }).then((data) => {
//   console.log(data);
// })


// p.then(function B1(res) {
//   console.log(res, 'res2');
// })

// console.log(p);

function delay(duration) {
  return new MyPromise((resolve) => {
    setTimeout(resolve, duration);
  })
}

(async function () {
  console.log('start');
  await delay(2000);
  console.log(123);
})()