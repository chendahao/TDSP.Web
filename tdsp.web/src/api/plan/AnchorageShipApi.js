/**
* class AnchorageShip Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetCurrent 获取当前期间锚地船舶
* @returns request.get Promission
*/
const GetCurrent = function () {
  let path = `/api/plan/AnchorageShip`
  return request.get(path)
}

/**
* GetByPeriod 根据期间获取锚地船舶数据
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.get Promission
*/
const GetByPeriod = function (date, timespan) {
  let path = `/api/plan/AnchorageShip/${date}/${timespan}`
  let params = {}

  return request.get(path, { params })
}
export default {
  GetCurrent, GetByPeriod
}
