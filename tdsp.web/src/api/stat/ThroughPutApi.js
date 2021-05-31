/**
* class ThroughPut Api
* 吞吐量统计 api
*/

import request from '@/plugins/axios'

/**
* GetThroughPutByRange 根据日期范围 统计吞吐量(单位:万吨)
* @param {string}  start @description
* @param {string}  endDate @description
* @returns request.get Promission
*/
const GetThroughPutByRange = function (start, endDate) {
  let path = `/api/stat/ThroughPut`
  let params = {}
  params['start'] = start
  params['endDate'] = endDate

  return request.get(path, { params })
}

/**
* GetThroughPut 根据年/月 统计吞吐量 (单位:万吨)
* @param {Number}  year @description
* @param {Number}  month @description 月 0/null 表示获取全年数据
* @returns request.get Promission
*/
const GetThroughPut = function (year, month) {
  let path = `/api/stat/ThroughPut/${year}/${month}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetGoodsByRange 根据日期范围 获取货物种类分类统计(单位:万吨)
* @param {string}  start @description
* @param {string}  endDate @description
* @returns request.get Promission
*/
const GetGoodsByRange = function (start, endDate) {
  let path = `/api/stat/ThroughPut/goods`
  let params = {}
  params['start'] = start
  params['endDate'] = endDate

  return request.get(path, { params })
}

/**
* GetGoods 根据年/月 统计货物分类统计(单位:万吨)
* @param {Number}  year @description
* @param {Number}  month @description 1-12,month=0 then return full year data
* @returns request.get Promission
*/
const GetGoods = function (year, month) {
  let path = `/api/stat/ThroughPut/goods/${year}/${month}`
  let params = {}

  return request.get(path, { params })
}

export default {
  GetThroughPutByRange, GetThroughPut, GetGoodsByRange, GetGoods
}
