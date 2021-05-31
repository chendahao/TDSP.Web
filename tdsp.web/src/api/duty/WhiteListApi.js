/**
* class WhiteList Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPage 获取 白名单分页列表
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetPage = function (pagination) {
  let path = `/api/duty/WhiteList`
  let params = pages.toParams(pagination)

  return request.get(path, { params })
}

/**
* GetPage 获取 白名单分页列表的 异步方法
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetPageAsync = async function (pagination) {
  let path = `/api/duty/WhiteList`
  let params = pages.toParams(pagination)
  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Create
* @param  {object} entity @description
* @returns request.post Promission
*/
const Create = function (entity) {
  let path = `/api/duty/WhiteList`

  return request.post(path, entity)
}

/**
* GetAll
* @returns request.get Promission
*/
const GetAll = function () {
  let path = `/api/duty/WhiteList/all`
  return request.get(path)
}

/**
* GetById
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/duty/WhiteList/${id}`

  return request.get(path)
}

/**
* Update
* @param {string}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/duty/WhiteList/${id}`
  return request.put(path, entity)
}

/**
* Delete
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/duty/WhiteList/${id}`
  return request.delete(path)
}
export default {
  GetPage, GetPageAsync, Create, GetAll, GetById, Update, Delete
}
