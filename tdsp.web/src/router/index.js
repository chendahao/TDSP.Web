import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import storagedata from '@/plugins/storagedata.js'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import { hasOneOf, setTitle } from '@/plugins/tool'

Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === from.name) return
  NProgress.start()
  // 需要登录的页面
  if (to.meta.needLogin) {
    // 检查用户的角色 是否有相应的访问角色
    if (to.meta.access) {
      let access = ['root']
      // 用户角色
      if (!hasOneOf(to.meta.access, access)) {
        console.log('没有该功能角色')
        next({ name: '401' })
      } else {
        next()
      }
    } else {
      // 检查用户token是否超时
      if (storagedata.getUserdata()) {
        let datenow = (new Date()).valueOf()
        let login = (new Date(storagedata.getlocalStorage('tokentime'))).valueOf()
        if (datenow - login > 7200000) {
          // 登录时间与上次获取token时间超过2小时时 重新登录
          console.log('token超时')
          next({ path: '/login' })
        } else {
          next()
        }
      } else {
        console.log('需要登录')
        next({ path: '/login' })
      }
    }
  } else {
    if (to.name === 'login') {
      next({ query: to.query })
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  NProgress.done()
  // 更改标题
  setTitle(to.meta.title)
})

router.onError(err => {
  console.log(err)
})

export default router
