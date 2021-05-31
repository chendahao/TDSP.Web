/**
* class ShipTags Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetByShipId 根据船舶Id 获取 船舶标签
* @param {string}  shipId @description
* @returns request.get Promission
*/
const GetByShipId = function (shipId) {
  let path = `/api/seachart/ShipTags/${shipId}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetAllTags 获取全部标签
* @returns request.get Promission
*/
const GetAllTags = function () {
  let path = `/api/seachart/ShipTags/Tags`
  return request.get(path)
}

/**
* GetShipsByTag 根据 tag 获取 船舶Id
* @param {string}  tag @description
* @returns request.get Promission
*/
const GetShipsByTag = function (tag) {
  let path = `/api/seachart/ShipTags/Tags/${tag}`
  let params = {}

  return request.get(path, { params })
}
export default {
  GetByShipId, GetAllTags, GetShipsByTag
}
