// 添加注释到文件头插件 vscode-fileheader
function unique(arr) {
  function isSame(obj1, obj2) {
    for (const prop in obj1) {
      if (!(prop in obj2) || obj1[prop] != obj2[prop]) {
        return false;
      }
    }
    return true;
  }
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (isSame(arr[i], arr[j])) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}

var arr = unique([
  {
    a: 1,
    b: 2,
    c: 3,
  },
  {
    a: 1,
    b: 1,
    c: 4,
  },
  {
    b: 2,
    c: 3,
    a: 1,
  },
  {
    a: 1,
    b: 2,
    c: 3,
  },
]);

// console.log(arr);
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("scripts end");

// script start
// async1 start
// promise1
// script end
// async2
// async1 end
// promise2
// setTimeout