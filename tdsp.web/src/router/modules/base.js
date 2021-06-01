import Layout from '@/components/layout/Layout.vue'
import Login from '@/views/Login.vue'

/*
* meta: keepalive 是否开启keepAlive
*       needlogin 需要登录
*       fullwith  内容两边是否留白
*       nolayout  不使用layout
 */

const baseRoutes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    meta: {
      icon: 'home',
      keepAlive: false,
      needLogin: true,
      title: '首页',
      fullwidth: false,
      hideInMenu: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "basehome" */ '@/views/Home.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: 'home',
          fullwidth: false,
          hideInMenu: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: false,
      title: '登录',
      fullwidth: false,
      hideInMenu: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: true,
      title: '404',
      fullwidth: false,
      hideInMenu: true
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: true,
      title: '401',
      fullwidth: false,
      hideInMenu: true
    }
  }
]

export default [
  ...baseRoutes
]
