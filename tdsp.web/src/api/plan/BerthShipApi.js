/**
* class BerthShip Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetCurrent 获取当前期间泊位船舶数据
* @returns request.get Promission
*/
const GetCurrent = function () {
  let path = `/api/plan/BerthShip`
  return request.get(path)
}

/**
* GetByPeriod 根据期间获取泊位船舶数据
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.get Promission
*/
const GetByPeriod = function (date, timespan) {
  let path = `/api/plan/BerthShip/${date}/${timespan}`
  let params = {}

  return request.get(path, { params })
}

/**
* 获取指定期间的泊位占用比例 ,返回 @type OccupyPoint 数组
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.get Promission
*/
const GetOccupy = function (date, timespan) {
  let path = `/api/plan/BerthShip/occupy`
  let params = {}
  params['date'] = date
  params['timespan'] = timespan

  return request.get(path, { params })
}

export default {
  GetCurrent, GetByPeriod, GetOccupy
}
