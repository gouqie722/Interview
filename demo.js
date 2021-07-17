var audioEle = document.getElementsByTagName('audio')[0]
var play = document.getElementsByClassName('play')[0]
var view = document.getElementsByClassName('view')[0]
var items = [...document.getElementsByClassName('item')]
console.log(items);
var sourceNode = null
var analyser = null
var baseVal = view.clientHeight * 0.8

play.addEventListener('click', function () {
  audioEle.play()

  var audioContext = new AudioContext()
  // 设置音频数据源
  sourceNode = audioContext.createMediaElementSource(audioEle)
  
  // 获取音频时间和频率数据，以及实现数据可视化，connect之前调用
  analyser = audioContext.createAnalyser()

  // connect连接器，把声音数据连接到分析器，除了createAnalyser,还有BiquadFilterNode[提高音色]
  // ChannelSplitterNode[分割左右声道] 等对音频数据进行处理，然后通过 connect把处理后的数据连接到扬声器进行播放
  sourceNode.connect(analyser)


  // connect连接器，把声音数据连接到扬声器
  analyser.connect(audioContext.destination)

  // 得到的二进制音频数据，并解析
  parse()
}, false)


function parse () {
  // analyser.frequencyBinCount: 二进制音频频率数据的数量(个数)
  // Uint8Array: 生成一个长度为analyser.frequencyBinCount的，用于二进制数据的数组
  // console.log(analyser) 
  let freqArray = new Uint8Array(analyser.frequencyBinCount)
  // 将当前频率数据复制到freqArray中
  analyser.getByteFrequencyData(freqArray)
  // console.log(freqArray)
  let arr = []
  // 频谱反应的是声音各频谱(frequencyBinCount)上能量的分布
  // 设置step,进行取样
  var step = Math.round(freqArray.length / 7)
  for (var i = 0; i < 7; i ++) {
    arr.push(freqArray[i * step] / baseVal)
  }
  // console.log(arr)
  // 根据分析后的频谱数据生成动画
  animate(arr)
  if (!audioEle.paused) {
    requestAnimationFrame(parse)
  }
}


function animate(arr) {
  console.log(arr)
  items.forEach((item, index) => {
    // console.log(item)
    item.style.height = arr[index] * 100 + '%'
  })
}