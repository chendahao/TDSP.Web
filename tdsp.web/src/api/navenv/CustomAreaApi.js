/**
* class CustomArea Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取 自定义区域分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/CustomArea`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Edit 更新自定义区域记录
* @param  {object} customarea @description
* @returns request.put Promission
*/
const Edit = function (customarea) {
  let path = `/api/navenv/CustomArea/${customarea.customId}`
  return request.put(path, customarea)
}

/**
* Create 新建 自定义区域记录
* @param  {object} customarea @description
* @returns request.post Promission
*/
const Create = function (customarea) {
  let path = `/api/navenv/CustomArea`

  return request.post(path, customarea)
}

/**
* GetItemById 根据 Id 获取 自定义区域记录
* @param {string}  id @description CCHP.VTS.Models.NavEnv.CustomArea.CustomId
* @returns request.get Promission
*/
const GetItemById = function (id) {
  let path = `/api/navenv/CustomArea/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除自定义区域数据
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/CustomArea/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Edit, Create, GetItemById, Delete
}
