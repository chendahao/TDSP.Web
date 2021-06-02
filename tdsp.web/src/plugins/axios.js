'use strict'

import axios from 'axios'
import { Message } from 'element-ui'
import storagedata from '@/plugins/storagedata.js'
import 'element-ui/lib/theme-chalk/index.css'

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
  timeout: 60 * 1000 // Timeout
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
    Message.error('请求出错')

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
        Message.error('没有相关权限或需要登录')
        break
      case 404:
        Message.error('没有找到相关数据')
        break
      case 500:
        // Message.error('服务器错误')
        break
      case 504:
        Message.error('网关超时')
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
