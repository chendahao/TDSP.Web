/**
* class Organ Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetAll 获取全部顶级组织列表(包含下级组织)
* @returns axios.get Promission
*/
const GetAll = function () {
  let path = `/auth/Organ`
  return request.get(path)
}

/**
* Create
* @param  {object} entity @description
* @returns axios.post Promission
*/
const Create = function (entity) {
  let path = `/auth/Organ`
  return request.post(path, entity)
}

/**
* GetCodes 获取组织代码/名称列表
* @returns axios.get Promission
*/
const GetCodes = function () {
  let path = `/auth/Organ/codes`
  return request.get(path)
}

/**
* GetById
* @param {string}  id @description
* @returns axios.get Promission
*/
const GetById = function (id) {
  let path = `/auth/Organ/${id}`

  return request.get(path)
}

/**
* Update
* @param {string}  id @description
* @param  {object} entity @description
* @returns axios.put Promission
*/
const Update = function (id, entity) {
  let path = `/auth/Organ/${id}`

  return request.put(path, entity)
}

/**
* Delete
* @param {string}  id @description
* @returns axios.delete Promission
*/
const Delete = function (id) {
  let path = `/auth/Organ/${id}`

  return request.delete(path)
}
export default {
  GetAll, Create, GetCodes, GetById, Update, Delete
}
