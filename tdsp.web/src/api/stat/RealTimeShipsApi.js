/**
* class RealTimeShips Api
* @description
*/

import request from '@/plugins/axios'
import navStatus from './navStatus'

/**
* GetByNavStatus 根据航行状态获取实时船舶列表
* @param {navStatus}  navStatus @description
* @returns request.get Promission @see RealTimeShipDto
*/
const GetByNavStatus = function (navStatus) {
  let path = `/api/stat/RealTimeShips/${navStatus}`
  let params = {}

  return request.get(path, { params })
}

/**
* 获取 引擎推进方式航行的船舶列表
*/
const GetByUnderWay = function () {
  let path = `/api/stat/RealTimeShips/${navStatus.UnderWay}`
  return request.get(path)
}

/**
 * 获取正在航行的船舶列表
 */
const GetBySailing = function () {
  let path = `/api/stat/RealTimeShips/${navStatus.Sailing}`
  return request.get(path)
}

/**
 * 抛锚状态
 */
const GetByAtAnchor = function () {
  let path = `/api/stat/RealTimeShips/${navStatus.AtAnchor}`
  return request.get(path)
}

/**
 * 获取停泊状态
 */
const GetByMoored = function () {
  let path = `/api/stat/RealTimeShips/${navStatus.Moored}`
  return request.get(path)
}

/**
* GetLeavingShips 离港船舶
* @returns request.get Promission
*/
const GetLeavingShips = function () {
  let path = `/api/stat/RealTimeShips/leaving`
  return request.get(path)
}
export default {
  GetByNavStatus,
  GetLeavingShips,
  GetByUnderWay,
  GetBySailing,
  GetByAtAnchor,
  GetByMoored
}
