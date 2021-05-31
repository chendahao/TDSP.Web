/**
* class PlanSummary Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetByPeriod 获取 指定日期和时段的 计划汇总
* @param {string}  date @description 计划日期
* @param {Number}  timespan @description 时段 1~4
* @returns request.get Promission
*/
const GetByPeriod = function (date, timespan) {
  let path = `/api/plan/PlanSummary`
  let params = {}
  params['date'] = date
  params['timespan'] = timespan

  return request.get(path, { params })
}

/**
* GetPlanSummary 根据计划Id获取 计划汇总
* @param {string}  planId @description
* @returns request.get Promission
*/
const GetById = function (planId) {
  let path = `/api/plan/PlanSummary/${planId}`
  let params = {}

  return request.get(path, { params })
}

/**
* Update 修改计划并重新检查
* @param {string}  planId @description
* @param  {object} plan @description
* @returns request.put Promission
*/
const Update = function (planId, plan) {
  let path = `/api/plan/PlanSummary/${planId}`

  return request.put(path, plan)
}

/**
* CreatePlanSummary 创建计划汇总
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.post Promission
*/
const CreatePlanSummary = function (date, timespan) {
  let path = `/api/plan/PlanSummary/${date}/${timespan}/create`

  return request.post(path)
}

/**
* CheckPlanSummary 1. 检查没有汇总的计划
2. 过滤掉已经取消的计划
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.post Promission
*/
const CheckPlanSummary = function (date, timespan) {
  let path = `/api/plan/PlanSummary/${date}/${timespan}/check`

  return request.post(path)
}

/**
* SortPlanSummary 排序计划
* @param {string}  date @description     日期
* @param {Number}  timespan @description 时段
* @param {Number}  interval @description 排序间隔分钟数
* @returns request.post Promission
*/
const SortPlanSummary = function (date, timespan, interval) {
  let path = `/api/plan/PlanSummary/${date}/${timespan}/sort`
  if (interval) {
    path += `?interval=${interval}`
  }
  return request.post(path)
}

/**
* AdjustTime 调整 执行时间 <see ref="PlanSummary.ChangeTime" />
* @param {string}  planId @description
* @param {string}  time @description
* @returns request.put Promission
*/
const AdjustTime = function (planId, time) {
  let path = `/api/plan/PlanSummary/${planId}/adjust?time=${time}`
  let data = {}
  // data['time'] = time
  return request.put(path, data)
}

/**
* Export 导出
* @param {string}  date @description
* @param {Number}  timespan @description
* @returns request.get Promission
*/
const Export = function (date, timespan) {
  let path = `/api/plan/PlanSummary/${date}/${timespan}/export`

  return request.get(path)
}

/**
* Pass 通过
* @param {string}  planId @description
* @returns request.post Promission
*/
const Pass = function (planId) {
  let path = `/api/plan/PlanSummary/${planId}/pass`

  return request.post(path)
}

/**
* Cancel 取消计划
* @param {string}  planId @description
* @returns request.post Promission
*/
const Cancel = function (planId) {
  let path = `/api/plan/PlanSummary/${planId}/cancel`

  return request.post(path)
}
export default {
  GetByPeriod, GetById, Update, CreatePlanSummary, CheckPlanSummary, SortPlanSummary, AdjustTime, Export, Pass, Cancel
}
