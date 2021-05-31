/**
* class WadingWorks Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取全部涉水工程分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/WadingWorks`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 更新涉水工程
* @param  {object} wadingworks @description
* @returns request.put Promission
*/
const Update = function (wadingworks) {
  let path = `/api/navenv/WadingWorks`

  return request.put(path, wadingworks)
}

/**
* Create 新建 涉水工程
* @param  {object} wadingworks @description
* @returns request.post Promission
*/
const Create = function (wadingworks) {
  let path = `/api/navenv/WadingWorks`

  return request.post(path, wadingworks)
}

/**
* GetItemById 根据 WadingWorks.WadingWorksId 获取 涉水工程对象
* @param {string}  workId @description 涉水工程Id
* @returns request.get Promission
*/
const GetItemById = function (workId) {
  let path = `/api/navenv/WadingWorks/${workId}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除涉水工程
* @param {string}  workId @description
* @returns request.delete Promission
*/
const Delete = function (workId) {
  let path = `/api/navenv/WadingWorks/${workId}`
  let params = {}

  return request.delete(path, { params })
}

/**
* GetShips 根据工程Id 获取全部所属船舶
* @param {string}  workId @description
* @returns request.get Promission
*/
const GetShips = function (workId) {
  let path = `/api/navenv/WadingWorks/${workId}/ships`
  let params = {}

  return request.get(path, { params })
}

/**
* UpdateShip 更新涉水工程船舶
* @param {string}  workId @description
* @param  {object} ship @description
* @returns request.put Promission
*/
const UpdateShip = function (workId, ship) {
  let path = `/api/navenv/WadingWorks/${workId}/ships`

  return request.put(path, ship)
}

/**
* AddShip 增加涉水工程船舶
* @param {string}  workId @description
* @param  {object} ship @description
* @returns request.post Promission
*/
const AddShip = function (workId, ship) {
  let path = `/api/navenv/WadingWorks/${workId}/ships`

  return request.post(path, ship)
}

/**
* GetShipById 根据 ShipId 获取涉水工程船舶
* @param {string}  shipId @description
* @returns request.get Promission
*/
const GetShipById = function (shipId) {
  let path = `/api/navenv/WadingWorks/ships/${shipId}`
  let params = {}

  return request.get(path, { params })
}

/**
* DeleteShip 删除涉水工程船信息
* @param {string}  shipId @description 编号
* @returns request.delete Promission
*/
const DeleteShip = function (shipId) {
  let path = `/api/navenv/WadingWorks/ships/${shipId}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Update, Create, GetItemById, Delete, GetShips, UpdateShip, AddShip, GetShipById, DeleteShip
}
