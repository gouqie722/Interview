var oWrap = document.getElementsByClassName('wrap')[0]
var oList = document.getElementsByClassName('list')[0]
var oli = oList.getElementsByTagName('li')

var index = 0
var offsetWdith = oli[0].offsetWidth

function move(dom, num) {
  var speed = 10
  var time
  time = setInterval(() => {
    if (dom.offsetLeft >= -num) {
      dom.style.left = (dom.offsetLeft - speed) + 'px'
    } else {
      dom.style.left = -num + 'px'
      clearInterval(time)
    }
  }, 10);
}

function init() {
  setInterval(() => {
    index ++
    // oList.style.left = - (offsetWdith * index) + 'px'
    if (index === oli.length - 1) {
      index = 0
      oList.style.left = 0 + 'px'
    }
    move(oList, offsetWdith * index)
    console.log(index)
    
  }, 4000);
}

init()
