import { Commit, Dispatch } from 'vuex/types/index'
interface info {
  fullName: string,
  gh: string,
  roles: string[],
  userName: string
}
const state: info = {
  fullName: '',
  gh: '',
  roles: [],
  userName: ''
}
export default {
  namespaced: true,
  state: state,
  mutations: {
    setinfo (state: info, info: info) {
      state.fullName = info.fullName
      state.gh = info.gh
      state.roles = info.roles
      state.userName = info.userName
    }
  },
  getters: {
    getUserInfo (state: {info: object}) {
      return state
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param context
     * @param dispatch
     * @param info
     * @returns {Promise<any>}
     */
    set ({ commit, state, dispatch }: { commit:Commit, state: any, dispatch: Dispatch }, info: {info: object}) {
      return new Promise(resolve => {
        // store 赋值
        commit('setinfo', info)
        // 持久化
        dispatch('db/set', {
          dbName: 'sys',
          path: '',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    clearInfo ({ commit, state }: {commit: Commit, state: any}) {
      return new Promise<void>((resolve, reject) => {
        commit('setinfo', {
          fullName: '',
          gh: '',
          roles: [],
          userName: ''
        })
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    load ({ commit, state, dispatch }: { commit:Commit, state: any, dispatch: Dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        const info = await dispatch('db/get', {
          dbName: 'sys',
          path: '',
          defaultValue: {},
          user: true
        }, { root: true })
        state.fullName = info.fullName
        state.gh = info.gh
        state.roles = info.roles
        state.userName = info.userName
        // end
        resolve()
      })
    }
  }
}
