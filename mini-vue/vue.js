



function Vue(options) {
  // 1. 通过属性保存options(配置)
  this.$options = options || {}
  this.$data = options.data || {}
  this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
  // 2. 把data中的成员转换成getter和setter, 注入到vue实例中
  this._proxyData(this.$data)
  // 3. 调用Observer对象，监听数据的变化
  new Observer(this.$data)
  // 4. 调用compiler对象解析指令和插值表达式
  new Compiler(this)
}

Vue.prototype._proxyData = function (data) {
  // 遍历data中所有的属性
  Object.keys(data).forEach(key => {
    // 把data中的属性注入到vue实例中
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get () {
        return data[key]
      },
      set (newVal) {
        if (newVal === data[key]) {
          return
        }
        data[key] = newVal
      }
    })
  })
}