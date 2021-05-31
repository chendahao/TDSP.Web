/**
* class ShipMark Api
* @description
*/
import request from '@/plugins/axios'

/**
* GetAll 获取全部 ShipMark
* @returns request.get Promission
*/
const GetAll = function () {
  let path = `/api/navenv/ShipMark`
  return request.get(path)
}

/**
* Create 创建实体对象
* @param  {object} entity @description
* @returns request.post Promission
*/
const Create = function (entity) {
  let path = `/api/navenv/ShipMark`

  return request.post(path, entity)
}

/**
* GetById 根据Id 获取实体对象
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/navenv/ShipMark/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Update 更新实体对象
* @param {string}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/navenv/ShipMark/${id}`

  return request.put(path, entity)
}

/**
* Delete 根据 Id 删除实体
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/ShipMark/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Create, GetById, Update, Delete
}
