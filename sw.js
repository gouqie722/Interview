function active(index) {
  var list = document.getElementsByClassName('list')[0].getElementsByTagName('li');

  var prevIndex = index - 1
  prevIndex < 0 && (prevIndex = list.length - 1)
  var nextIndex = index + 1;
  nextIndex > list.length - 1 && (nextIndex = 0);
  [...list].forEach(item => item.className = '')
  list[index].className = 'layer'
  list[prevIndex].className = 'left'
  list[nextIndex].className = 'right'
}


function init() {
  var index = 0
  // setInterval(() => {

  //   active(index)
  //   index %= document.getElementsByClassName('list')[0].getElementsByTagName('li').length
  // }, 3000)
  active(index)
  setInterval(function () {
    index ++
    index = index %= document.getElementsByClassName('list')[0].getElementsByTagName('li').length
    active(index)
  }, 1000)
}

window.onload = function () {
  init()
}