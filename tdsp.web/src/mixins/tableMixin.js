import XLSX from 'xlsx'

var tableMixin = {
  data: function () {
    return {
      title: '表格名称',
      headers: {},
      desserts: []
    }
  },
  methods: {
    /**
         * 导出表格数据到 excel
         */
    exportXlsx: function () {
      let tableName = this.title
      const ws = XLSX.utils.json_to_sheet(this.desserts)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, tableName)
      /* generate file and send to client */
      XLSX.writeFile(wb, `${tableName}.xlsx`)
    }
  }
}

export default tableMixin
