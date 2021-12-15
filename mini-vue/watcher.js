

function Watcher(vm, key, cb) {
  this.vm = vm
  // data中的属性名称
  this.key = key
  // 回调函数负责更新视图
  this.cb = cb

  // 把watcher对象记录到Dep类的静态属性target
  Dep.target = this
  // 触发get方法, 在get方法中会调用addSub
  this.oldVal = vm[key]
  Dep.target = null

}

Watcher.prototype.update = function () {
  let newValue = this.vm[this.key]
  if (this.oldVal === newValue) {
    return
  }
  this.cb(newValue)
}

