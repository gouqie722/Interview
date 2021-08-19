// Dep 解决了两个问题   就是读取属性的时候要做什么事情, 而属性变化的时要做什么事情, 这个问题需要依靠Dep来解决



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

