import { Commit, Dispatch } from 'vuex'
import { remove, indexOf, concat } from 'lodash'
interface alarmItem {
  id: number,
  title: string,
  content: string,
  dateTime: string,
  status: number, // 0 初始状态； 2 延后； 3 完成
  alarm: boolean
}

interface alarmState {
  list: Array<alarmItem>
}

const state: alarmState = {
  list: []
}

export default {
  namespaced: true,
  state: state,
  mutations: {
    AddAlarm(state: alarmState, item: alarmItem) {
      state.list = concat(state.list, item)
    },
    // 完成
    FinishAlarm(state: alarmState, item: alarmItem) {
      const index = indexOf(state.list, item)
      state.list.splice(index, 1)
    }
  },
  actions: {
    add ({ commit, state, dispatch }: { commit:Commit, state: any, dispatch: Dispatch }, item: {item: alarmItem}) {
      commit('AddAlarm', item)
      dispatch('db/set', {
        dbName: 'alarm',
        path: '',
        value: state.list,
        user: false
      }, { root: true })
    },
    remove ({ commit, state, dispatch }: { commit:Commit, state: any, dispatch: Dispatch }, item: {item: alarmItem}) {
      commit('FinishAlarm', item)
      dispatch('db/set', {
        dbName: 'alarm',
        path: '',
        value: state.list,
        user: false
      }, { root: true })
    },
    /**
     * @description 从数据库取用户数据
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    load ({ state, dispatch }: { state: any, dispatch: Dispatch }) {
      return new Promise(async () => {
        // store 赋值
        const list = await dispatch('db/get', {
          dbName: 'alarm',
          path: '',
          defaultValue: {},
          user: false
        }, { root: true })
        state.list = list
        // end
      })
    }
  }
}