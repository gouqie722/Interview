// var arr = [1, 2, 1, 6, 8, 9, 3, 30]

// // reduce实现map方法
// Array.prototype.myMap = function (fn) {
//   return arr.reduce((prevValue, item, index) => {
//     return [...prevValue, fn(item, index)]
//   }, [])
// }


// console.log(arr.myMap((item, index) => {
//   return item + 2
// }))
// P10 打包自定义库
// https://www.bilibili.com/video/BV1pK4y1D76R?p=10&spm_id_from=pageDriver

// var net = require('net')

// net.createConnection({
//   host: 'duyi.ke.qq.com',
//   port: 80
// }, () => {
//   console.log('连接成功')
// })
var app = document.getElementById('app')

function Vue(options) {
  this.options = options
  var data = this._data = options.data
  new Observe(data)
  Object.keys(data).forEach(item => {
    // let val = data[item]
    Object.defineProperty(this, item, {
      enumerable: true,
      configurable: true,
      get() {
        return this._data[item]
      },
      set(newVal) {
        this._data[item] = newVal
      }
    })
  })
  // 编译
  new Compile(options.el, this)
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  // console.dir(fragment)
  replace(fragment)
  function replace (fragment){
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      if (node.nodeType === 3 && reg.test(text)) {
        // console.log(RegExp.$1)
        let exp = RegExp.$1
        console.log(exp)
        let arr = exp.replace(/ /g, '').split('.')
        // console.log(arr)
        let val = vm
        arr.forEach(item => {
          val = val[item]
        })
        console.log(exp)
        // 观察者模式
        new Watcher(vm, exp.replace(/ /g, ''), function (newVal) { // 函数里接收一个新的值
          console.log(newVal)
          node.textContent = text.replace(reg, newVal)
        })
        node.textContent = text.replace(reg, val)
        console.log(val)
      }
      if (node.childNodes) {
        replace(node)
      }
    })
  }
  vm.$el.appendChild(fragment)
}

function observer(data) {
  let dep = new Dep()
  Object.keys(data).forEach(item => {
    console.log(item)
    let val = data[item]
    Observe(val)
    Object.defineProperty(data, item, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        console.log('get =>', Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        console.log('set =>', newVal)
        val = newVal
        Observe(newVal)
        dep.notify()
      }
    })
  })
}

function Observe(data) {
  // console.log(Object.prototype.toString.call(data))
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return
  }
  observer(data)
}


function Dep() {
  this.subs = []
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
  console.log(this.subs)
}

Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update())
}

function Watcher(vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  let val = vm
  let arr = exp.split('.')
  arr.forEach(item => {
    val = val[item]
  })

  console.log(Dep.target, val, '0')
  Dep.target = null
}

Watcher.prototype.update = function () {
  let val = this.vm
  let arr = this.exp.split('.')
  arr.forEach(item => {
    val = val[item]
  })
  this.fn(val)
}

var vm = new Vue({
  el: '#app',
  data: {
    a: {
      b: 90
    },
    demo: 23
  }
})



// https://www.bilibili.com/video/BV1u4411W7ei?p=7&spm_id_from=pageDriver