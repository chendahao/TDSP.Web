/**
* class Tides Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取 潮汐表分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/Tides`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 更新每日潮汐记录
* @param  {object} tide @description
* @returns request.put Promission
*/
const Update = function (tide) {
  let path = `/api/navenv/Tides`

  return request.put(path, tide)
}

/**
* Create 新建每日潮汐记录数据
* @param  {object} tide @description
* @returns request.post Promission
*/
const Create = function (tide) {
  let path = `/api/navenv/Tides`

  return request.post(path, tide)
}

/**
* GetDayTides 获取给定日期的潮汐表
* @param {string}  date @description 查询日期,默认为当天
* @returns request.get Promission
*/
const GetDayTides = function (date) {
  let path = `/api/navenv/Tides/${date}`
  let params = {}

  return request.get(path, { params })
}

/**
* Delete 删除指定日期的潮汐数据
* @param {string}  date @description
* @returns request.delete Promission
*/
const Delete = function (date) {
  let path = `/api/navenv/Tides/${date}`
  let params = {}

  return request.delete(path, { params })
}

/**
* GetTodaySeries 获取当日潮高序列(30分钟一个数值)
* @returns request.get Promission
*/
const GetTodaySeries = function () {
  let path = `/api/navenv/Tides/series`
  return request.get(path)
}

/**
* GetSeries 返回指定日期标准潮高序列
* @param {string}  date @description
* @returns request.get Promission
*/
const GetSeries = function (date) {
  let path = `/api/navenv/Tides/series/${date}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetTidePointNow 获取当前 潮汐数据
* @returns request.get Promission
*/
const GetTidePointNow = function () {
  let path = `/api/navenv/Tides/Point`
  return request.get(path)
}

/**
* GetTidePoint 获取给定时间 潮汐数据
* @param {string}  time @description
* @returns request.get Promission
*/
const GetTidePoint = function (time) {
  let path = `/api/navenv/Tides/Point/${time}`
  let params = {}

  return request.get(path, { params })
}
export default {
  GetAll, Update, Create, GetDayTides, Delete, GetTodaySeries, GetSeries, GetTidePointNow, GetTidePoint
}
