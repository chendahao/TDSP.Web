/**
* class TrafficFlow Api
* @description
*/

import request from '@/plugins/axios'
import buildURL from 'axios/lib/helpers/buildURL'

/**
* GetCustomLineFlowById 获取 指定定线制 流量统计
* @param {string}  id @description
* @param {string}  start @description 开始日期
* @param {string}  end @description 结束日期 默认为当天
* @returns request.get Promission
*/
const GetCustomLineFlowById = function (id, start, end) {
  let path = `/api/stat/TrafficFlow/CustomLine/${id}`
  let params = {}
  params['start'] = start
  params['end'] = end

  return request.get(path, { params })
}

/**
* GetReportLineFlow 获取报告线 交通流量统计
* @param {string}  id @description
* @param {string}  start @description
* @param {string}  end @description
* @returns request.get Promission
*/
const GetReportLineFlow = function (id, start, end) {
  let path = `/api/stat/TrafficFlow/ReportLine`
  let params = {}
  params['id'] = id
  params['start'] = start
  params['end'] = end

  return request.get(path, { params })
}

/**
* GetCustomAreaFlowById 获取报告线 交通流量统计
* @param {string}  id @description 自定义区域 Id
* @param {string}  start @description
* @param {string}  end @description
* @returns request.get Promission
*/
const GetCustomAreaFlowById = function (id, start, end) {
  let path = `/api/stat/TrafficFlow/CustomArea/${id}`
  let params = {}
  params['start'] = start
  params['end'] = end

  return request.get(path, { params })
}

/**
* GetTrafficFlowById 根据 流量线 和日期范围获取 流量统计数据
* @param {Number}  id @description TrafficLine.Id
* @param {string}  start @description
* @param {string}  end @description
* @returns request.get Promission
*/
const GetTrafficFlowById = function (id, start, end) {
  let path = `/api/stat/TrafficFlow/Traffic/${id}`
  let params = {}
  params['start'] = start
  params['end'] = end

  return request.get(path, { params })
}

/**
* QueryFlow 根据流量线测定交通流量
* @param  {object} line @description 用于查询流量的检测线 GeoJson LineString
* @param {string}  start @description 开始日期
* @param {string}  end @description 结束日期
* @returns request.post Promission
*/
const QueryFlow = function (line, start, end) {
  if (line === undefined) {
    throw Error('param line not be null')
  }
  let path = `/api/stat/TrafficFlow/Query`
  let params = { start: start || new Date(), end: end }
  path = buildURL(path, params)

  return request.post(path, line)
}

export default {
  GetCustomLineFlowById,
  GetReportLineFlow,
  GetCustomAreaFlowById,
  GetTrafficFlowById,
  QueryFlow
}
