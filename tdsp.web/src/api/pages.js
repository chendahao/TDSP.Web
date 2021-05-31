// vuetify.datatable.pagination.sync
// 用于控制数据表外部的分页和排序，也可以用来设置默认的排序列
// {
//   descending: boolean,
//   page: number,
//   itemsPerPage: number // -1 for All",
//   sortBy: string,
//   totalItems: number
// }
/**
 * @param {Number}  pageSize @description 页面大小
 * @param {Number}  page @description 当前页码
 * @param {string}  keyword @description 查询关键字
 * @param {array}  sort @description 排序字段
 * @param {string}  orderBy @description 排序方式
 */
const pageOptions = {
  // 页面大小
  pageSize: 20,
  // 当前页码
  page: 1,
  // 查询关键字
  searchKey: '',
  // 排序字段
  sortBy: [],
  // 是否 逆序 排序
  sortDesc: []
}

/**
 * 合并分页结果
 * @param {*} pagination
 * @param {page} result
 */
const mergePageination = function (pagination, result) {
  pagination = pagination || {}
  pagination.page = result.page
  pagination.itemsPerPage = result.pageSize
}

const toParams = function (options) {
  options = options || { page: 1, itemsPerPage: 20 }
  let params = {}
  if (options) {
    params.page = options.page || 1
    params.pageSize = options.itemsPerPage || 20

    if (options.searchKey) {
      params.searchKey = options.searchKey
    }
    if (options.sortBy) {
      params.sortBy = options.sortBy[0]
    }
    if (options.sortDesc) {
      params.descending = !!options.sortDesc[0]
    }
  }
  return params
}

export default {
  pageOptions,
  toParams,
  mergePageination
}
