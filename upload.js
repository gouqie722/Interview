let input = document.getElementsByTagName('input')[0]
    btn = document.getElementsByTagName('button')[0]

btn.onclick = upload

function upload() {
  let formData = new FormData() // 帮助你构建一个formData格式的消息体
  let file = input.files
  let chunks = []
  console.log(file)
  for (let i = 0; i < file.length; i++) {
    formData.append('files', file[i])
  }
  // console.log(formData.get('files'))  
  
  

  var xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:3000/upload')
  // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
  xhr.send(formData)
  // 发送并接受返回值
  xhr.onreadystatechange = function () {
    // 这步为判断服务器是否正确响应
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(JSON.parse(xhr.responseText))
      let res = JSON.parse(xhr.responseText)
      let path = res.data.path
      let arr = path.split('.')
      let suffix = arr[arr.length -1]
      if (suffix === 'mp4') {
        let video = document.createElement('video')
        video.src = path
        video.controls = true
        video.autoplay = true
        document.body.appendChild(video)
      } else {
        let img = document.createElement('img')
        img.src = path
        document.body.appendChild(img)
      }
    }
  };

  
  // fetch({
  //   url: 'http://localhost:3000/upload',
  //   data: fromData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })
  // axios.post({
  //   url: '/upload',
  //   data: fromData,
  //   headers: {
  //     'Content-Type': ':multipart/form-data'
  //   }
  // }).then(res => {

  // }).catch(err => {
  //   console.log(err)
  // })

}