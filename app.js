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
  initComputed(this)
  // 编译
  // new Compile(options.el, this)
  // 挂载
  let rootDom = document.querySelector(options.el)
  mount(this, rootDom)
}

function initComputed(vm) {
  let computed = vm.options.computed
  console.log(computed)
  Object.keys(computed).forEach(item => {
    Object.defineProperty(vm, item, {
      configurable: true,
      get: typeof computed[item] === 'function' ? computed[item] : computed[item].get,
      set() {}
    })
  })
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
      // 判断文本节点
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
      // 判断元素节点
      if (node.nodeType === 1) {
        // 获取当前节点的属性
        let nodeAttrs = node.attributes
        console.log(nodeAttrs)
        Array.from(nodeAttrs).forEach(attr => {
          console.dir(attr)
          // name => 属性
          // value => 属性值
          let name = attr.name
          let exp = attr.value
          if (name.indexOf('v-') == 0) {
            let value = vm
            exp.split('.').forEach(item => {
              value = value[item]
            })
            node.value = value
          }
          new Watcher(vm, exp, function (newVal) {
            node.value = newVal
          })
          node.addEventListener('input', function (e) {
            // console.log(e)
            let newVal = e.target.value
            let value = vm
            let arr = exp.split('.').slice(0, -1)
            if (arr.length === 0) {
              vm[exp] = newVal
            } else {
              // TODO 
              arr.forEach(item => {
                value = value[item]
              })
              value = newVal
            }
            console.log(value, arr)
          }, false)
        })
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
  },
  computed: {
    count() {
      return this.a.b + this.demo
    }
  }
})


function VNode(
  tag,
  el,
  children,
  text,
  data,
  parent,
  nodeType
) {
  this.tag = tag
  this.el = el
  this.children = children
  this.text = text
  this.data = data
  this.parent = parent
  this.nodeType = nodeType
  this.env = {}
  // 存放指令
  this.instructions = null
  // 当前节点涉及到的节点
  this.template = []
}

function constructVNode(vm, el, parent) { // 算法: 深度优先搜索 
  let vNode = null
  let children = []
  let text = getNodeText(el)
  let data = null
  let nodeType = el.nodeType
  let tag = el.nodeName
  vNode = new VNode(tag, el, children, text, data, parent, nodeType)
  let child = vNode.el.childNodes
  for(let i = 0; i < child.length; i++) {
    let childNodes = constructVNode(vm, child[i], vNode)
    if (childNodes instanceof VNode) { // 返回单一节点的时候
      vNode.children.push(childNodes)
    } else { // 返回节点数组的时候
      vNode.children = vNode.children.concat(childNodes)
    }
  }
  console.log(child)
  return vNode
}

function getNodeText(el) {
  if (el.nodeType === 3) {
    return el.nodeValue
  } else {
    return ''
  }

}

/**
 * 挂载
 */
function mount(vm, el) {
  vm._vNode = constructVNode(vm, el, null)
}

// https://www.bilibili.com/video/BV1u4411W7ei?p=7&spm_id_from=pageDriver