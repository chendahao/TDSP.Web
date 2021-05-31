/**
* class ShipStat Api
* @description
*/
import request from '@/plugins/axios'

/**
* GetShipTypes 根据船舶类型进行分类汇总
* @returns request.get Promission
*/
const GetShipTypes = function () {
  let path = `/api/stat/ShipStat/shipTypes`
  return request.get(path)
}

/**
* GetNavStatus 获取 航行状态统计
* @returns request.get Promission
*/
const GetNavStatus = function () {
  let path = `/api/stat/ShipStat/NavStatus`
  return request.get(path)
}

/**
* GetLocalPort 本港船舶统计
* @returns request.get Promission
*/
const GetLocalPort = function () {
  let path = `/api/stat/ShipStat/DestPort`
  return request.get(path)
}

export default {
  GetShipTypes, GetNavStatus, GetLocalPort
}
