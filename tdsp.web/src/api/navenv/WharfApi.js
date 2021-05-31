/**
* class Wharf Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取码头数据 分页列表
* @param {Pagenation}  pagination @description
* @returns request.get Promission
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/Wharf`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 修改 CCHP.VTS.Models.NavEnv.Wharf 对象
* @param  {object} wharf @description
* @returns request.put Promission
*/
const Update = function (wharf) {
  let path = `/api/navenv/Wharf`

  return request.put(path, wharf)
}

/**
* Create 新建码头
* @param  {object} wharf @description
* @returns request.post Promission
*/
const Create = function (wharf) {
  let path = `/api/navenv/Wharf`

  return request.post(path, wharf)
}

/**
* GetItemById 根据 码头Id 获取 码头数据
* @param {string}  wharfId @description 码头Id
* @returns request.get Promission
*/
const GetItemById = function (wharfId) {
  let path = `/api/navenv/Wharf/${wharfId}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除 码头数据记录
* @param {string}  wharfId @description
* @returns request.delete Promission
*/
const Delete = function (wharfId) {
  let path = `/api/navenv/Wharf/${wharfId}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Create, GetItemById, Delete
}
