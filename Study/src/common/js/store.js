export function saveToLocal (name, key, value) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[name] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[name]) {
      seller[name] = {}
    }
  }
  seller[name][key] = value
  // 以JSON字符串的形式存储
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal (name, key, def) {
  let seller = window.localStorage.__seller__
  console.log(seller)
  if (!seller) {
    return def
  }
  // 转化为对象形式
  seller = JSON.parse(seller)[name]
  if (!seller) {
    return def
  }
  let result = seller[key]
  return result || def
}
