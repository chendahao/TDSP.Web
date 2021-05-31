/**
* class ShipServicePlan Api
* @description 船舶服务计划 Api (原名 Linkage/联合指挥)
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPage 获取联合指挥分页数据
* @param {Number}  pageSize @description
* @param {Number}  page @description
* @param {string}  sortBy @description
* @param {string}  searchKey @description
* @param {boolean}  descending @description
* @returns request.get Promission
*/
const GetPage = function (pagination) {
  let path = `/api/duty/ShipServicePlan`
  let params = pages.toParams(pagination)

  return request.get(path, { params })
}

/**
* GetPage 获取 联合指挥记录的分页方法
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetPageAsync = async function (pagination) {
  let path = `/api/duty/ShipServicePlan`
  let params = pages.toParams(pagination)
  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Create
* @param  {object} entity @description
* @returns request.post Promission
*/
const Create = function (entity) {
  let path = `/api/duty/ShipServicePlan`
  return request.post(path, entity)
}

/**
* GetRunning 获取当前正在执行的作业任务
* @returns request.get Promission
*/
const GetRunning = function () {
  let path = `/api/duty/ShipServicePlan/running`
  return request.get(path)
}

/**
* GetById
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/duty/ShipServicePlan/${id}`
  return request.get(path)
}

/**
* Update
* @param {string}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/duty/ShipServicePlan/${id}`
  return request.put(path, entity)
}

/**
* Delete
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/duty/ShipServicePlan/${id}`
  return request.delete(path)
}
export default {
  GetPage, GetPageAsync, Create, GetRunning, GetById, Update, Delete
}
