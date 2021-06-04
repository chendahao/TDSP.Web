import dayjs from 'dayjs'

export const isSameDay = (day: string) => {
  const y = dayjs(day).year()
  const m = dayjs(day).month()
  const d = dayjs(day).date()
  if (y !== dayjs().year()) return false
  if (m !== dayjs().month()) return false
  if (d !== dayjs().date()) return false
  return true
}

/**
 * sessionStorage 赋值
 * @param key
 * @param value
 */
export const sessionSave = (key: string, value: string) => {
  sessionStorage.setItem(key, value)
}

/**
 * sessionStorage 取值
 * @param key
 */
export const sessionRead = (key: string) => {
  return sessionStorage.getItem(key) || ''
}

/**
 * @description: 判断当前时间类型
 * @param {type}
 * @return {type}
 */
export const getNowType = () => {
  const hour = dayjs().hour()
  if (hour < 6) { return '凌晨好！' } else if (hour < 9) { return '早上好！' } else if (hour < 12) { return '上午好！' } else if (hour < 14) { return '中午好！' } else if (hour < 17) { return '下午好！' } else if (hour < 19) { return '傍晚好！' } else if (hour < 22) { return '晚上好！' } else { return '夜里好！' }
}

export const forEach = (arr: Array<any>, fn: Function) => {
  if (!arr.length || !fn) return
  let i = -1
  const len = arr.length
  while (++i < len) {
    const item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1: Array<any>, arr2: Array<any>) => {
  const len = Math.min(arr1.length, arr2.length)
  let i = -1
  const res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1: Array<any>, arr2: Array<any>) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr: Array<any>, arr: Array<any>) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value: any, validList: Array<any>) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @description 获取元素在数组中的位置
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 * @returns 元素所在的位置 没找到返回-1
 */
export function getIndex (value: any, validList: Array<any>) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return i
    }
  }
  return -1
}

/**
 * 删除列表中指定的数据
 * @param data 数组
 * @param val 要删除的元素
 */
export function removeInList (data: Array<any>, val: any) {
  const index = getIndex(val, data)
  if (index > -1) {
    data.splice(index, 1)
  }
  return data
}

/**
 * 删除列表中指定的数据
 * @param data
 * @param id
 * @param key
 */
export function deleteDataList (data: Array<any>, id: any, key: any) {
  for (let i = data.length - 1; i >= 0; i--) {
    if (id.indexOf(data[i][key]) !== -1) {
      data.splice(i, 1)
    }
  }
  return data
}

/**
 * @description:  数组升序排列
 * @param {any}
 * @return:
 * @example: const list2 = list.sort(listSort)
 */
export function listSort (val1: any, val2: any) {
  if (val1 < val2) {
    return -1
  } else if (val1 > val2) {
    return 1
  } else {
    return 0
  }
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  return function (
    element: Element | null | Window | Document,
    event: string,
    handler: EventListener
  ) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  return function (
    element: Element | null | Window | Document,
    event: string,
    handler: EventListener
  ) {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
})()

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp: string) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description: 判断是否是手机
 * @param {*}
 * @return {*}
 */
export const isMobile = () => {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: { [key: string]: any }, key: string) => {
  if (key) return key in obj
  else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1: { [key: string]: string | number }, obj2: { [key: string]: string | number }) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * 文章标题长度省略
 * @param text 需要省略的文本
 * @param sublen 省略的长度
 */
export function ellipsis (text: String, sublen = 15) {
  const length = text.length
  if (length > sublen) {
    const str = `${text.substring(0, sublen)}...`
    return str
  }
  return text
}

// 格式化文件大小
export function renderSize (value: string) {
  if (value === null) {
    return '0 Bytes'
  }
  var unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var index = 0
  var val = ''
  var srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  var size = srcsize / Math.pow(1024, index)
  val = size.toFixed(2)// 保留的小数位数
  return val + unitArr[index]
}
