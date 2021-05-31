/**
* class CustomLine Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取 定线制分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/CustomLine`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Edit 更新定线制记录
* @param  {object} customline @description
* @returns request.put Promission
*/
const Edit = function (customline) {
  let path = `/api/navenv/CustomLine`

  return request.put(path, customline)
}

/**
* Update 更新定线制记录
* @param  {object} customline @description
* @returns request.put Promission
*/
const Update = function (customline) {
  let path = `/api/navenv/CustomLine`

  return request.put(path, customline)
}

/**
* Create 新建 定线制记录
* @param  {object} customline @description
* @returns request.post Promission
*/
const Create = function (customline) {
  let path = `/api/navenv/CustomLine`

  return request.post(path, customline)
}

/**
* GetItemById 根据 Id 获取 定线制记录
* @param {string}  id @description CCHP.VTS.Models.NavEnv.CustomLine.CustomId
* @returns request.get Promission
*/
const GetItemById = function (id) {
  let path = `/api/navenv/CustomLine/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除定线制数据
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/CustomLine/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Edit, Create, GetItemById, Delete
}
