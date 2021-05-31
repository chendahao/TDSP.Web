/**
* class PlanPeriod Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetCurrent 获取当前计划期间
* @returns request.get Promission
*/
const GetCurrent = function () {
  let path = `/api/plan/PlanPeriod`
  return request.get(path)
}

/**
* GetPeriods
* @param {string}  date @description
* @returns request.get Promission
*/
const GetPeriods = function (date) {
  let path = `/api/plan/PlanPeriod/${date}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetByDate&timespan
* @param {string}  date @description
* @returns request.get Promission
*/
const GetByDate = function (date, timespan) {
  let path = `/api/plan/PlanPeriod/${date}/${timespan}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetNext
* @returns request.get Promission
*/
const GetNext = function () {
  let path = `/api/plan/PlanPeriod/next`
  return request.get(path)
}

/**
* GetTimeSpans 返回时段列表
* @returns request.get Promission
*/
const GetTimeSpans = function () {
  let path = `/api/plan/PlanPeriod/timespans`
  return request.get(path)
}
export default {
  GetCurrent, GetPeriods, GetNext, GetTimeSpans, GetByDate
}
