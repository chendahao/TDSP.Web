/**
* class BerthingPlan Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetBerthingPlans 获取指定日期和时段的 靠泊计划
* @param {string}  date @description 申报日期
* @param {Number}  timespan @description 申报时段
* @returns request.get Promission
* @deprecated use @see GetByPeriod
*/
const GetBerthingPlans = function (date, timespan) {
  let path = `/api/plan/BerthingPlan`
  let params = {}
  params['date'] = date
  params['timespan'] = timespan

  return request.get(path, { params })
}

/**
* Create 手动创建靠泊计划,根据期间创建 计划汇总和执行记录
* @param  {object} plan @description
* @returns request.post Promission
*/
const Create = function (plan) {
  let path = `/api/plan/BerthingPlan`

  return request.post(path, plan)
}

/**
* GetByPeriod 获取指定日期和时段的 靠泊计划
* @param {string}  date @description 申报日期
* @param {Number}  timespan @description 申报时段
* @returns request.get Promission
*/
const GetByPeriod = function (date, timespan) {
  let path = `/api/plan/BerthingPlan`
  let params = {}
  params['date'] = date
  params['timespan'] = timespan

  return request.get(path, { params })
}

/**
* GetById 根据 计划Id 获取靠泊计划对象
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/plan/BerthingPlan/id`
  let params = {}
  params['id'] = id

  return request.get(path, { params })
}

/**
* Update 更新靠泊计划
* @param {string}  planId @description
* @param  {object} plan @description @type BerthingPlan
* @returns request.put Promission
*/
const Update = function (planId, plan) {
  let path = `/api/plan/BerthingPlan/${planId}`
  return request.put(path, plan)
}
export default {
  GetByPeriod, Create, GetById, Update, GetBerthingPlans
}
