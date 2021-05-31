/**
* class Harbor Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取全部 港池分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/Harbor`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update
* @param  {object} harbor @description
* @returns request.put Promission
*/
const Update = function (harbor) {
  let path = `/api/navenv/Harbor`

  return request.put(path, harbor)
}

/**
* Create
* @param  {object} harbor @description
* @returns request.post Promission
*/
const Create = function (harbor) {
  let path = `/api/navenv/Harbor`

  return request.post(path, harbor)
}

/**
* GetItemById 根据CCHP.VTS.Models.NavEnv.Harbor.HarborId 获取港池记录
* @param {string}  id @description CCHP.VTS.Models.NavEnv.Harbor.HarborId
* @returns request.get Promission
*/
const GetItemById = function (id) {
  let path = `/api/navenv/Harbor/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/Harbor/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Create, GetItemById, Delete
}
