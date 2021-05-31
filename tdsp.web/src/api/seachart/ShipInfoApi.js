/**
* class ShipInfo Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* Find 模糊查询船舶摘要信息
* @param {object}  pagination @description
* @returns request.get Promission
*/
const Find = function (pagination) {
  let path = `/api/seachart/ShipInfo`
  let params = pages.toParams(pagination)

  return request.get(path, { params })
}

/**
* Find 模糊查询船舶摘要信息
* @param {object}  pagination @description
* @returns request.get Promission
*/
const FindAsync = async function (pagination) {
  let path = `/api/seachart/ShipInfo`
  let params = pages.toParams(pagination)
  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* GetById 根据船舶 shipId 查找船舶信息
* @param {string}  shipId @description
* @returns request.get Promission
*/
const GetById = function (shipId) {
  let path = `/api/seachart/ShipInfo/id/${shipId}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetByMMSI 根据船舶MMSI 查找船舶信息
* @param {string}  mmsi @description
* @returns request.get Promission
*/
const GetByMMSI = function (mmsi) {
  let path = `/api/seachart/ShipInfo/mmsi/${mmsi}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetAllShipInfo 获取全部 船舶信息
* @returns request.get Promission
*/
const GetAllShipInfo = function () {
  let path = `/api/seachart/ShipInfo/all`
  return request.get(path)
}

/**
* GetByArea 根据区域获取 船舶数据
* @param {number}  left @description 左边界
* @param {number}  bottom @description 下边界
* @param {number}  right @description 右边界
* @param {number}  top @description 上边界
* @param {Number}  level @description
* @returns request.get Promission
*/
const GetByArea = function (left, bottom, right, top, level = 12) {
  let path = `/api/seachart/ShipInfo/area`
  let params = {}
  params['left'] = left
  params['bottom'] = bottom
  params['right'] = right
  params['top'] = top
  params['level'] = typeof level !== 'undefined' ? level : 12

  return request.get(path, { params })
}
export default {
  Find, FindAsync, GetById, GetByMMSI, GetAllShipInfo, GetByArea
}
