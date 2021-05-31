/**
* class User Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetUsers
* @param {object}  pagination 分页参数
* @returns request.get Promission
*/
const GetUsers = async function (pagination) {
  let path = `/auth/User`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* UpdateUser
* @param  {object} model @description
* @returns request.put Promission
*/
const UpdateUser = function (model) {
  let path = `/auth/User`

  return request.put(path, model)
}

/**
* RegistUser
* @param  {object} info @description
* @returns request.post Promission
*/
const RegistUser = function (info) {
  let path = `/auth/User`
  return request.post(path, info)
}

/**
* GetByName
* @param {string}  userName @description
* @returns request.get Promission
*/
const GetByName = function (userName) {
  let path = `/auth/User/${userName}`
  let params = {}

  return request.get(path, { params })
}

/**
* GetUserRoles
* @param {string}  userName @description
* @returns request.get Promission
*/
const GetUserRoles = function (userName) {
  let path = `/auth/User/${userName}/roles`
  let params = {}

  return request.get(path, { params })
}

/**
* SetUserRoles
* @param {string}  userName @description
* @param  {object} roles @description
* @returns request.post Promission
*/
const SetUserRoles = function (userName, roles) {
  let path = `/auth/User/${userName}/roles`

  return request.post(path, roles)
}

/**
* LockUser
* @param {string}  userName @description
* @returns request.post Promission
*/
const LockUser = function (userName) {
  let path = `/auth/User/${userName}/lock`

  return request.post(path)
}

/**
* UnLockUser
* @param {string}  userName @description
* @returns request.post Promission
*/
const UnLockUser = function (userName) {
  let path = `/auth/User/${userName}/unlock`
  return request.post(path)
}

/**
* DeleteUser
* @param {string}  userName @description
* @returns request.post Promission
*/
const DeleteUser = function (userId) {
  let path = `/auth/User/?uid=${userId}`
  let params = { }
  return request.delete(path, params)
}

export default {
  GetUsers, UpdateUser, RegistUser, GetByName, GetUserRoles, SetUserRoles, LockUser, UnLockUser, DeleteUser
}
