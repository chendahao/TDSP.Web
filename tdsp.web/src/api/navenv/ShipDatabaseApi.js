/**
* class ShipInfo Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPage 获取船舶数据库分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetPage = async function (pagination) {
  let path = `/api/navenv/ShipInfo`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* GetBySign 根据 船舶MMSI/IMO/CallSign 获取船舶信息
* @param {string}  sign @description
* @returns request.get Promission
*/
const GetBySign = function (sign) {
  let path = `/api/navenv/ShipInfo/mmsi/${sign}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetByShipId 根据 船舶 ID 获取船舶信息
* @param {string}  id @description
* @returns request.get Promission
*/
const GetByShipId = function (id) {
  let path = `/api/navenv/ShipInfo/${id}`
  let params = {}

  return request.get(path, { params })
}
export default {
  GetPage, GetBySign, GetByShipId
}
