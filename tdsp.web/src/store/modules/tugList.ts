import { Commit, Dispatch } from 'vuex'
import { tugApi as api } from '@/api/tugApi'
import request from '@/plugins/axios'
import { orderBy } from 'lodash'
import { TugList } from '@/mock/tug'

class tuginfo2 {
  name: string | undefined = ''
  cnName: string | undefined = ''
  mmsi: string | undefined = ''
  num: string | undefined = ''
}
interface Itug {
  name: string,
  cnName: string,
  mmsi: string,
  num: string
}

interface tugList {
  list: Itug[]
}

const state: tugList = {
  list: []
}

export default {
  namespaced: true,
  state: state,
  mutations: {
    setList (state: { list: Itug[] }, tugList: tugList) {
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
              const l = []
              for (let i = 0; i < list.length; i++) {
                let element = list[i]
                const atug = new tuginfo2()
                atug.cnName = element.cnName
                atug.name = element.name
                atug.mmsi = element.mmsi
                atug.num = element.cnName?.replace(/\s+/g, '').replace(/[\u4e00-\u9fa5a-zA-Z]/gm, '')
                l.push(atug)
              }
              const list2 = orderBy(l, ['num'], ['asc'])
              // this.tableData = list2
              commit('setList', list2)
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
