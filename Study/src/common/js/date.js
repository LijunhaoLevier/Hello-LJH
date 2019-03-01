export function formatDate (date, fmt) {
  // "/(y+)/": 匹配以y开头的一个或多个字符串
  // 用"/(y+)/" 去匹配 fmt
  if (/(y+)/.test(fmt)) {
    // RegExp.$1表示捕获到 符合条件的内容 即: yyyy
    // 调用replace替换字符串
    // date.getFullYear() + ''  获取年份并转化为字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    // 构造出一个正则表达式 RegExp(`(${k})`) 去匹配 fmt
    // 上面的 "/(y+)/" 是一个写死的正则表达式
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // (RegExp.$1.length === 1)即：M(length=1不补0)或者MM(length=2补0)
      // 例：如果设置日期格式为 yyyy-M-dd即2019-7-23
      // 设置 yyyy-MM-dd 需要在左侧补0即2019-07-23
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 左侧补0
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
