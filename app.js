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
}


function observer(data) {
  Object.keys(data).forEach(item => {
    console.log(item)
    let val = data[item]
    Observe(val)
    Object.defineProperty(data, item, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('get =>', val)
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        console.log('set =>', newVal)
        val = newVal
        Observe(newVal)
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

var vm = new Vue({
  data: {
    a: {
      b: 90
    },
    demo: 23
  }
})



