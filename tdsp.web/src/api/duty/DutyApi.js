/**
* class Duty Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPage 获取值班记录的分页方法
* @param {object}  pagination 分页参数
* @param {string}  startDate @description 开始日期
* @returns request.get Promission
*/
const GetPage = function (pagination, startDate) {
  let path = `/api/duty/Duty`
  let params = pages.toParams(pagination)
  if (startDate) {
    params['startDate'] = startDate
  }

  return request.get(path, { params })
}

/**
* GetPage 获取值班记录的分页方法
* @param {object}  pagination 分页参数
* @param {string}  startDate @description 开始日期
* @returns {pagedata{ElecDuty[]}}
*/
const GetPageAsync = async function (pagination, startDate) {
  let path = `/api/duty/Duty`
  let params = pages.toParams(pagination)
  if (startDate) {
    params['startDate'] = startDate
  }

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
  let path = `/api/duty/Duty`

  return request.post(path, entity)
}

/**
* GetLast
* @returns request.get Promission
*/
const GetLast = function () {
  let path = `/api/duty/Duty/last`
  return request.get(path)
}

/**
* Generate
* @param {string}  startTime @description
* @param {string}  endTime @description
* @returns request.get Promission
*/
const Generate = function (startTime, endTime) {
  let path = `/api/duty/Duty/Generate`
  let params = {}
  params['startTime'] = startTime
  params['endTime'] = endTime

  return request.get(path, { params })
}

/**
* Download
* @param {string}  id @description
* @returns request.get Promission
*/
const Download = function (id) {
  let path = `/api/duty/Duty/download/${id}`

  return request.get(path)
}

/**
* GetById
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/duty/Duty/${id}`

  return request.get(path)
}

/**
* Update
* @param {string}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/duty/Duty/${id}`

  return request.put(path, entity)
}

/**
* Delete
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/duty/Duty/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetPage, GetPageAsync, Create, GetLast, Generate, Download, GetById, Update, Delete
}
