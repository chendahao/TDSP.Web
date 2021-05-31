/**
* class Anchorage Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取锚地分页记录
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/Anchorage`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 更新锚地记录
* @param  {object} anchorage @description
* @returns request.put Promission
*/
const Update = function (anchorage) {
  let path = `/api/navenv/Anchorage`
  return request.put(path, anchorage)
}

/**
* Create 创建 锚地记录
* @param  {object} anchorage @description 锚地实例
* @returns request.post Promission
*/
const Create = function (anchorage) {
  let path = `/api/navenv/Anchorage`
  return request.post(path, anchorage)
}

/**
* GetItemById 根据 锚地Id 获取 锚地记录
* @param {string}  id @description 锚地Id
* @returns request.get Promission
*/
const GetItemById = function (id) {
  let path = `/api/navenv/Anchorage/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除锚地记录
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/Anchorage/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Create, GetItemById, Delete
}
