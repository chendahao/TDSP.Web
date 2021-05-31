/**
* class FullTrack Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetAll 获取 全部 shipTrack GeoJson
* @returns request.get Promission
*/
const GetAll = function () {
  let path = `/api/seachart/FullTrack/all`
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
  let path = `/api/seachart/FullTrack`
  let params = {}
  params['left'] = left
  params['bottom'] = bottom
  params['right'] = right
  params['top'] = top
  params['level'] = typeof level !== 'undefined' ? level : 12

  return request.get(path, { params })
}

/**
* GetById 根据 shipId 获取 ShipTrack GeoJson
* @param {string}  shipId @description
* @returns request.get Promission
*/
const GetById = function (shipId) {
  let path = `/api/seachart/FullTrack/${shipId}`
  let params = {}

  return request.get(path, { params })
}
export default {
  GetAll, GetByArea, GetById
}
