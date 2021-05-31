// 获取localstorage中的数据

const Storage = window.localStorage

const setlocalStorage = function (text, val) {
  Storage.setItem(text, val)
}

const removelocalStorage = function (text) {
  Storage.removeItem(text)
}

const getlocalStorage = function (text) {
  let dat = Storage.getItem(text)
  if (dat) {
    return dat
  }
  return ''
}

// 获取用户信息
const getUserdata = function () {
  let dat = Storage.getItem('userdata')
  if (dat) {
    return JSON.parse(dat)
  }
  return false
}

export default {
  setlocalStorage,
  removelocalStorage,
  getlocalStorage,
  getUserdata
}
