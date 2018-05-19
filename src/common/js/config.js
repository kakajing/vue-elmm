const Qs = require('querystring')

export default Qs
export const imgBaseUrl = 'https://fuss10.elemecdn.com/'

// 传递过来的图片地址需要处理后才能正常使用
export function subImgUrl (path) {
  let suffix
  //  console.log(path)
  if (path.indexOf('jpeg') !== -1) {
    suffix = '.jpeg'
  } else {
    suffix = '.png'
  }
  let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
  return url
}

export function base64ToBlob1(urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1] || 'image/jpeg'
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab)

  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }

  return new Blob([ab], {
    type: mime
  })
}

export function base64ToBlob(urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1] || 'image/jpeg'
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})

}

