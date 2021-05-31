/**
* class CCTV Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetPage 获取 CCTV 分页数据
* @param {object}  pagination @description
* @returns request.get Promission
*/
const GetPage = async function (pagination) {
  let path = `/api/navenv/CCTV`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* GetFeatures 获取 CCTV GeoJson FeatureCollection
* @returns request.get Promission
*/
const GetFeatures = function () {
  let path = `/api/navenv/CCTV/features`
  return request.get(path)
}

/**
* GetFeatureById 根据 Id 获取 CCTV GeoJson Feature
* @param {string}  id @description
* @returns request.get Promission
*/
const GetFeatureById = function (id) {
  let path = `/api/navenv/CCTV/features/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetById 根据Id 获取实体对象
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/navenv/CCTV/${id}`
  return request.get(path)
}

/**
* Update 更新实体对象
* @param {string}  id @description
* @param  {object} entity @description
* @returns request.put Promission
*/
const Update = function (id, entity) {
  let path = `/api/navenv/CCTV/${id}`

  return request.put(path, entity)
}

/**
* Create 创建实体对象
* @param  {object} entity @description
* @param {string}  id @description
* @returns request.post Promission
*/
const Create = function (entity) {
  let path = `/api/navenv/CCTV`

  return request.post(path, entity)
}

/**
* Delete 根据 Id 删除实体
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/CCTV/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetPage, GetFeatures, GetFeatureById, GetById, Update, Create, Delete
}
