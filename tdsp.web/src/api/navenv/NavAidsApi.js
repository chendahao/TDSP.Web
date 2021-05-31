/**
* class NavAids Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPages 获取助航设施的分页列表
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetPages = function (pagination) {
  let path = `/api/navenv/NavAids`
  let params = pages.toParams(pagination)

  return request.get(path, { params })
}

/**
* GetPagesAsync 获取助航设施的分页列表 的异步方法
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetPagesAsync = async function (pagination) {
  let path = `/api/navenv/NavAids`
  let params = pages.toParams(pagination)

  var res = await request.get(path, { params })

  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Create  创建 助航设施
* @param  {object} entity @description
* @returns request.post Promission
*/
const Create = function (entity) {
  let path = `/api/navenv/NavAids`
  return request.post(path, entity)
}

/**
* GetById 根据 Id 获取助航设施
* @param {Number}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/navenv/NavAids/${id}`
  return request.get(path)
}

/**
* Update 更新 助航设施
* @param {Number}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/navenv/NavAids/${id}`
  return request.put(path, entity)
}

/**
* Delete 删除 助航设施记录
* @param {Number}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/NavAids/${id}`
  return request.delete(path)
}
export default {
  GetPages, GetPagesAsync, Create, GetById, Update, Delete
}
