'use strict'

import axios from 'axios'
import message from './message'
import storagedata from '@/plugins/storagedata.js'

// Full config:  https://github.com/axios/axios#request-config

function errorLog (type, err) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log(type)
    console.log(err)
  }
}

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  // baseURL: process.env.baseURL || process.env.apiUrl || 'http://192.168.1.103:5000'
}

const service = axios.create(config)

service.interceptors.request.use(
  function (config) {
    // 如果用户登录
    if (storagedata.getUserdata()) {
      let token = storagedata.getlocalStorage('usertoken')
      config.headers.Authorization = 'Bearer ' + token
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    errorLog('request', error)
    // const code = error.request.status
    message.ShowMessage('请求出错', 'error')

    // return Promise.reject(error)
  }
)

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    errorLog('response', error.response)
    const code = error.response.status

    switch (code) {
      case 400:
        return error.response
      case 401:
        message.ShowMessage('没有相关权限或需要登录', 'error')
        break
      case 404:
        message.ShowMessage('没有找到相关数据', 'error')
        break
      case 500:
        // message.ShowMessage('服务器错误', 'error')
        break
      case 504:
        message.ShowMessage('网关超时', 'error')
        break
      default:
        return error.response
    }
    // Do something with response error
  }
)

// Plugin.install = function (Vue, options) {
//   Vue.axios = axios
//   window.axios = axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get () {
//         return axios
//       }
//     },
//     $axios: {
//       get () {
//         return axios
//       }
//     }
//   })
// }

// Vue.use(Plugin)

export default service
