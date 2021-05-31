import {
  getBreadCrumbList,
  getMenuByRouter,
  getHomeRoute
} from '@/libs/util'
import routers from '@/router/routes'
import { RouteConfig, Route } from 'vue-router/types/router'
const { homeName } = { homeName: 'home' }

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    pwdVisible: false
  },
  getters: {
    menuList: (state: Object | Function, getters: { [key: string]: Function }, rootState: { userinfo: { roles: string[] } }) => getMenuByRouter(routers, rootState.userinfo.roles)
  },
  mutations: {
    setPwdVisible (state: { pwdVisible: boolean }, type: boolean) {
      state.pwdVisible = type
    },
    setBreadCrumb (state: { breadCrumbList: any[]; homeRoute: RouteConfig }, route: Route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state: { homeRoute: any }, routes: RouteConfig[]) {
      state.homeRoute = getHomeRoute(routes, homeName)
    }
  },
  actions: {

  }
}
