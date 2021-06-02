import baseRoutes from './modules/base'
import NenvRoutes from './modules/nav'
import planRoutes from './modules/plan'
import sysRoutes from './modules/sys'
import chartRoutes from './modules/chart'
import rugRoutes from './modules/tug'

/*
* meta: keepalive 是否开启keepAlive
*       needlogin 需要登录
*       fullwith  内容两边是否留白
*       nolayout  不使用layout
 */

export default [
  ...baseRoutes,
  NenvRoutes,
  planRoutes,
  rugRoutes,
  chartRoutes,
  sysRoutes
]
