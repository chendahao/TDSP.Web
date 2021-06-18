import { Commit, Dispatch } from 'vuex'
import { tugApi as api } from '@/api/tugApi'
import request from '@/plugins/axios'
import { orderBy } from 'lodash'

interface tug {
  name: string,
  cnName: string,
  mmsi: string
}

interface tugList {
  list: tug[]
}

const state: tugList = {
  list: []
}

export default {
  namespaced: true,
  state: state,
  mutations: {
    setList (state: { list: tug[] }, tugList: tugList) {
      state = tugList
    }
  },
  actions: {
    get ({ commit, state, dispatch }: { commit:Commit, state: any, dispatch: Dispatch }) {
      return new Promise((resolve, reject) => {
        try {
          const client = new api.TugInfoClient('', request)
          client.tugInfoAll()
            .then(data => {
              let list = data
              for (let i = 0; i < list.length; i++) {
                let element = list[i]
                element.num = element.cnName.replace(/\s+/g, '').replace(/[\u4e00-\u9fa5a-zA-Z]/gm, '') * 1.0
              }
              const list2 = orderBy(list, ['num'], ['asc'])
              this.tableData = list2
              commit('setList', data)
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
