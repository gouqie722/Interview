var list = document.getElementsByClassName('list')[0].getElementsByTagName('li');

[...list].forEach((item, i) => {
  (function (i){
    item.addEventListener('click', () => {
      // if (i === index) {
      //   return undefined
      // }
      if (item.className === 'layer') {
        return undefined        
      }
      active(i)
    }, false)
  })(i)
})

function active(index) {
  var prevIndex = index - 1
  prevIndex < 0 && (prevIndex = list.length - 1)
  var nextIndex = index + 1;
  nextIndex > list.length - 1 && (nextIndex = 0);
  [...list].forEach(item => item.className = '')
  list[index].className = 'layer'
  list[prevIndex].className = 'left'
  list[nextIndex].className = 'right'
}

var timer = null
var index = 0

document.getElementsByClassName('list')[0].addEventListener('mouseenter', () => {
  clearInterval(timer)
}, false)
document.getElementsByClassName('list')[0].addEventListener('mouseleave', () => {
  init()
}, false)

// document.getElementsByClassName('left')[0].addEventListener('click', () => {
//   console.log(index)
  
//   index = (index -= 1) %= document.getElementsByClassName('list')[0].getElementsByTagName('li').length
//   active(index)
// }, false)
// document.getElementsByClassName('right')[0].addEventListener('click', () => {
//   console.log(index)
//   index = (index ++) %= document.getElementsByClassName('list')[0].getElementsByTagName('li').length
//   active(index)
// }, false)

function init() {
  // setInterval(() => {

  //   active(index)
  //   index %= document.getElementsByClassName('list')[0].getElementsByTagName('li').length
  // }, 3000)
  var len = document.getElementsByClassName('list')[0].getElementsByTagName('li').length
  active(index)
  timer = setInterval(function () {
    // index = (index ++) % len
    // console.log((index ++) % len)
    index = (index + 1) % len
    active(index)
  }, 1500)
}

window.onload = function () {
  init()
}