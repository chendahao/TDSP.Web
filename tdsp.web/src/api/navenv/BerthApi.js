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
const GetAll = async function (pagination) {
  let path = `/api/navenv/Berth`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 更新泊位数据
* @param  {object} berth @description
* @returns request.put Promission
*/
const Update = function (berth) {
  let path = `/api/navenv/Berth`
  return request.put(path, berth)
}

/**
* Create 创建泊位
* @param  {object} berth @description
* @returns request.post Promission
*/
const Create = function (berth) {
  let path = `/api/navenv/Berth`

  return request.post(path, berth)
}

/**
* GetItemById 根据 Id 获取泊位数据
* @param {string}  id @description
* @returns request.get Promission
*/
const GetItemById = function (id) {
  let path = `/api/navenv/Berth/${id}`
  return request.get(path)
}

/**
* Delete 删除泊位数据
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/Berth/${id}`
  let params = {}

  return request.delete(path, { params })
}

/**
* UploadFile 文件上传
* @param {file}  file @description
* @returns request.post Promission
*/
const UploadFile = function (file) {
  let path = `/api/navenv/Berth/files`

  return request.post(path, file)
}
export default {
  GetAll, Update, Create, GetItemById, Delete, UploadFile
}
