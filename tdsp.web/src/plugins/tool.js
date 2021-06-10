/**
 * @description:  数组降序排列
 * @param {type}
 * @return:
 */
export function listSort (obj1, obj2) {
  var val1 = obj1.value
  var val2 = obj2.value
  if (val1 < val2) {
    return 1
  } else if (val1 > val2) {
    return -1
  } else {
    return 0
  }
}

/**
 * @description: 数组求和
 * @param {*} arr
 * @return {*}
 */
export function sum (arr) {
  var s = 0
  // arr.forEach(function(val, idx, arr) {
  //   s += val * 1.0
  // }, 0)
  arr.forEach(element => {
    s += element * 1.0
  })
  return s
}

/**
 * @description: 数组排序（IOS时间格式存在错误，暂未使用）
 * @param {*} obj1
 * @param {*} obj2
 * @param {*} arg
 * @param {Boolean} asc 升序
 * @return {*}
 */
export function listSort2 (arg, arg2, asc = true) {
  return function (a, b) {
    if (arg2) {
      if (asc) {
        return b[arg][arg2] - a[arg][arg2]
      } else {
        return a[arg][arg2] - b[arg][arg2]
      }
    } else {
      if (asc) {
        return b[arg] - a[arg]
      } else {
        return a[arg] - b[arg]
      }
    }
  }
  // var val1 = obj1[arg]
  // var val2 = obj2[arg]
  // if (asc) {
  //   if (val1 < val2) {
  //     return 1
  //   } else if (val1 > val2) {
  //     return -1
  //   } else {
  //     return 0
  //   }
  // } else {
  //   if (val1 < val2) {
  //     return -1
  //   } else if (val1 > val2) {
  //     return 1
  //   } else {
  //     return 0
  //   }
  // }
}

/**
 * @description:  多条件分组
 * @param {*} array 原数组
 * @param {*} keyArry 分组条件
 * @param {*} resKey
 * @return {*}
 */
export function dataGroupingToArray (array, keyArry, resKey = 'list') {
  if (keyArry.length <= 0) return array
  let aMap = []
  let aResult = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    let repetitionValue = ''
    let repetitionKey = ''
    keyArry.forEach((keyValue) => {
      repetitionKey = repetitionKey + keyValue
      repetitionValue += '' + item[keyValue]
    })
    if (aMap.indexOf(repetitionValue) === -1) {
      // 没有重复
      let oItem = {}
      oItem[resKey] = [item]

      oItem[repetitionKey] = repetitionValue // item[key] //分组的字段
      aResult.push(oItem)
      aMap.push(repetitionValue)
    } else {
      // 重复了
      let index = aMap.indexOf(repetitionValue)
      aResult[index][resKey].push(item)
    }
  }
  return aResult
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
export const setTitle = (titleText) => {
  window.document.title = `${titleText ? `${titleText} - ` : ''} 拖轮调度系统`
}

/**
 * 文章标题长度省略
 * @param text 需要省略的文本
 * @param sublen 省略的长度
 */
export function ellipsis (text, sublen = 15) {
  const length = text.length
  if (length > sublen) {
    const str = `${text.substring(0, sublen)}...`
    return str
  }
  return text
}

/**
 * 将任意对象转化为树
 * @param data
 * @param key
 * @param pid
 * @param parent
 * @returns {Array}
 */
export function formatDataToTree (data, key = 'menu_id', pid = 'parent_id', parent = {}) {
  if (!data || Object.keys(data).length <= 0) {
    return []
  }

  let map = {}
  const isSetParent = Object.keys(parent).length > 0

  data.forEach(value => {
    if (isSetParent && parent.value.includes(value[parent.key])) {
      value[pid] = 0
    }

    map[value[key]] = { ...value }
  })

  let tree = []
  // eslint-disable-next-line no-unused-vars
  for (let id in data) {
    if (!data.hasOwnProperty(id)) {
      continue
    }

    // 对应索引
    const index = data[id][key]
    if (!map.hasOwnProperty(index)) {
      continue
    }

    // 子节点压入
    if (map[index][pid]) {
      if (!map[map[index][pid]]) {
        continue
      }

      if (!map[map[index][pid]].hasOwnProperty('children')) {
        map[map[index][pid]]['children'] = []
      }

      map[map[index][pid]]['children'].push(map[index])
      continue
    }

    tree.push(map[index])
  }

  return tree
}
