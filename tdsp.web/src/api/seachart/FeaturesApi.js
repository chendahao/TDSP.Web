/**
* class Features Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetHarbors 港池 GeoJson Features
* @returns request.get Promission
*/
const GetHarbors = function () {
  let path = `/api/seachart/Features/Harbor`
  return request.get(path)
}

/**
* GetBerth 泊位 GeoJson Features,只包含一级泊位
* @returns request.get Promission
*/
const GetBerth = function () {
  let path = `/api/seachart/Features/Berth`
  return request.get(path)
}

/**
* GetAnchorage 锚地 GeoJson Features
* @returns request.get Promission
*/
const GetAnchorage = function () {
  let path = `/api/seachart/Features/Anchorage`
  return request.get(path)
}

/**
* GetCctv CCTV GeoJson
* @returns request.get Promission
*/
const GetCctv = function () {
  let path = `/api/seachart/Features/Cctv`
  return request.get(path)
}

/**
* GetChannel 航道
* @returns request.get Promission
*/
const GetChannel = function () {
  let path = `/api/seachart/Features/Channel`
  return request.get(path)
}

/**
* GetCustomLine 定线制
* @returns request.get Promission
*/
const GetCustomLine = function () {
  let path = `/api/seachart/Features/CustomLine`
  return request.get(path)
}

/**
* GetCustomArea 自定义区域
* @returns request.get Promission
*/
const GetCustomArea = function () {
  let path = `/api/seachart/Features/CustomArea`
  return request.get(path)
}
export default {
  GetHarbors, GetBerth, GetAnchorage, GetCctv, GetChannel, GetCustomLine, GetCustomArea
}
