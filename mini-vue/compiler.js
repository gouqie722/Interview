
function Compiler(vm) {
  this.el = vm.$el
  this.vm = vm
  this.compile(this.el)
}

Compiler.prototype.compile = function (el) {
  let childNodes = el.childNodes
  Array.from(childNodes).forEach(node => {
    // 处理文本节点
    if (this.isTextNode(node)) {
      this.compileText(node)
    } else if (this.isElementNode(node)) {
      // 处理元素节点
      this.compileElement(node)
    }

    // 判断node节点是否有子节点， 如果有子节点, 要递归调用compile
    if (node.childNodes && node.childNodes.length) {
      this.compile(node)
    }
  })
}

// 编译文本节点
Compiler.prototype.compileText = function (node) {
  // console.dir(node)
  // {{ msg }}
  let reg = /\{\{(.+?)\}\}/
  let value = node.textContent
  if (reg.test(value)) {
    // console.log('0', value.replace('{{', '').replace('}}', '').trim())
    // 通过上面匹配的value, 用RegExp拿到key值
    let key = RegExp.$1.trim()
    node.textContent = value.replace(reg, this.vm[key])
    // node.textContent
    console.log(key)
    
    // console.log(node.textContent, 'text')
    // 创建Watcher对象, 当数据改变更新视图
    new Watcher(this.vm, key, function (newVal) {
      node.textContent = newVal
    })
  }
}

// 编译元素节点, 处理指令
Compiler.prototype.compileElement = function (node) {
  // console.log(Array.from(node.attributes))
  // 遍历所有属性节点
  Array.from(node.attributes).forEach(attr => {
    console.dir(attr)
    // 判断是否是指令
    let attrName = attr.name
    if (this.isDirective(attrName)) {
      // v-text --> text
      attrName = attrName.substr(2)
      let key = attr.value
      this.update(node, key, attrName)
    }
  })
}

// 
Compiler.prototype.update = function (node, key, attrName) {
  let updateFn = this[attrName + 'Updater']
  updateFn && updateFn.call(this, node, this.vm[key], key)
}

// 处理v-text指令
Compiler.prototype.textUpdater = function (node, value, key) {
  node.textConent = value
  new Watcher(this.vm, key, function (newVal) {
    node.textContent = newVal
  })
}

// v-model
Compiler.prototype.modelUpdater = function (node, value, key) {
  console.dir(node)
  node.value = value
  new Watcher(this.vm, key, function (newVal) {
    node.value = newVal
  })
  // 双向绑定
  node.addEventListener('input', function () {
    this.vm[key] = node.value
  })
}

// 判断元素属性是否是指令
Compiler.prototype.isDirective = function (attrName) {
  // console.log('isDirective', attrName)
  return attrName.startsWith('v-')
}

// 判断节点是否是文本节点
Compiler.prototype.isTextNode = function (node) {
  return node.nodeType === 3
}

// 判断节点是否是元素节点
Compiler.prototype.isElementNode = function (node) {
  return node.nodeType === 1
}