/**
* class Berth Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取泊位分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const berthView = async function (pagination) {
  let path = `/api/navenv/BerthView`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

export default {
  berthView
}
