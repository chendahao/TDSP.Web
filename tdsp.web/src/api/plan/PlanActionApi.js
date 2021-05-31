/**
* class PlanAction Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetAll 获取指定日期全部 计划活动
* @param {string}  date @description
* @param {Number}  period @description
* @returns request.get Promission
*/
const GetAll = function (date, period = 1) {
  let path = `/api/plan/PlanAction`
  let params = {}
  params['date'] = date
  params['period'] = typeof period !== 'undefined' ? period : 1

  return request.get(path, { params })
}

/**
* Start 开始执行
* @param {string}  planId @description
* @param {string}  time @description 开始时间
* @returns request.post Promission
*/
const Start = function (planId, time) {
  let path = `/api/plan/PlanAction/${planId}/start`

  return request.post(path, time)
}

/**
* Complete 完成执行
* @param {string}  planId @description
* @param {date}  time @description 完成时间
* @returns request.post Promission
*/
const Complete = function (planId, time) {
  let path = `/api/plan/PlanAction/${planId}/complete`
  return request.post(path, time)
}

/**
* Pause 暂停执行
* @param {string}  planId @description
* @param {string}  causes @description 暂停原因
* @param {date}  time @description 暂停时间
* @returns request.post Promission
*/
const Pause = function (planId, causes, time) {
  let path = `/api/plan/PlanAction/${planId}/pause`
  let data = { causes, time }
  return request.post(path, data)
}

export default {
  GetAll, Start, Complete, Pause
}
