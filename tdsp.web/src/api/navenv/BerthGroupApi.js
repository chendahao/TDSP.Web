/**
* class BerthGroup Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取全部泊位组分页列表
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/BerthGroup`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 修改泊位组
* @param {string}  id @description entity id
* @param  {object} berthgroup @description
* @returns request.put Promission
*/
const Update = function (id, berthgroup) {
  let path = `/api/navenv/BerthGroup/${id}`

  return request.put(path, berthgroup)
}

/**
* Create 新建 泊位组
* @param  {object} berthgroup @description
* @returns request.post Promission
*/
const Create = function (berthgroup) {
  let path = `/api/navenv/BerthGroup`
  return request.post(path, berthgroup)
}

/**
* GetItemById 根据 BerthGroup.GroupId 获取泊位组
* @param {string}  groupId @description 泊位组Id
* @returns request.get Promission
*/
const GetItemById = function (groupId) {
  let path = `/api/navenv/BerthGroup/${groupId}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除泊位组
* @param {string}  groupId @description
* @returns request.delete Promission
*/
const Delete = function (groupId) {
  let path = `/api/navenv/BerthGroup/${groupId}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Create, GetItemById, Delete
}
