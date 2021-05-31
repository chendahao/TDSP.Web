import Vue from 'vue'
import Vuex from 'vuex'
import fullscreen from './modules/fullscreen'
import tabledense from './modules/tabledense'
import app from './modules/app'
import userinfo from './modules/userinfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorShow: false,
    errorcolor: 'success',
    errortimeout: 3000,
    errortext: '',
    // 应急事件搜救船舶列表
    rescueship: [],
    // 用于海图和应急搜救海图url信息存储
    seachart_url_info: null
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    fullscreen,
    tabledense,
    app,
    userinfo
  }
})
