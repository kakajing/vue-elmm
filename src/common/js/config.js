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
