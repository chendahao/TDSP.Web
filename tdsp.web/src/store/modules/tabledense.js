export default {
  namespaced: true,
  state: {
    // 表格的紧密状态
    tableDense: false
  },
  mutations: {
    setTableDense (state, tableDense) {
      state.tableDense = tableDense
    }
  }
}
