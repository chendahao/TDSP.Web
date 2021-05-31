/**
* class TrafficLine Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetFeature 获取 GeoJson features 集合
* @returns request.get Promission
*/
const GetFeature = function () {
  let path = `/api/stat/TrafficLine/features`
  return request.get(path)
}

/**
* GetAll 获取全部 交通流量统计线
* @param {string}  creater @description 创建人姓名
* @returns request.get Promission
*/
const GetAll = function (creater) {
  let path = `/api/stat/TrafficLine`
  let params = {}
  params['creater'] = creater

  return request.get(path, { params })
}

/**
* Create 创建 交通流量统计线
* @param  {object} line @description
* @returns request.post Promission
*/
const Create = function (line) {
  let path = `/api/stat/TrafficLine`

  return request.post(path, line)
}

/**
* GetById 根据 Id 获取 交通流量统计线
* @param {Number}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/stat/TrafficLine/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Update 修改通流量统计线
* @param {Number}  id @description
* @param  {object} line @description
* @returns request.put Promission
*/
const Update = function (id, line) {
  let path = `/api/stat/TrafficLine/${id}`

  return request.put(path, line)
}

/**
* Delete 删除通流量统计线
* @param {Number}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/stat/TrafficLine/${id}`
  let params = {}

  return request.delete(path, { params })
}

export default {
  GetFeature, GetAll, Create, GetById, Update, Delete
}
