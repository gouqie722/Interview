
// 观察者
function Dep() {
  this.subs = []

}

// 添加观察者
Dep.prototype.addSub = function (sub) {
  if (sub && sub.update) {
    this.subs.push(sub)
  }

}

// 发送通知
Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}

