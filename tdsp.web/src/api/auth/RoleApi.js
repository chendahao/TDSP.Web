/**
* class Role Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetRoles
* @returns request.get Promission
*/
const GetRoles = function () {
  let path = `/auth/Role`
  return request.get(path)
}

/**
* CreateRole
* @param  {object} role @description
* @returns request.post Promission
*/
const CreateRole = function (role) {
  let path = `/auth/Role`
  return request.post(path, { name: role })
}

/**
* GetUsersInRole
* @param {string}  role @description
* @returns request.get Promission
*/
const GetUsersInRole = function (role) {
  let path = `/auth/Role/${role}/users`
  return request.get(path)
}

/**
* AddUserToRole
* @param {string}  role @description
* @param {string}  userName @description
* @returns request.post Promission
*/
const AddUserToRole = function (role, userName) {
  let path = `/auth/Role/${role}/users`

  return request.post(path, { userName })
}

/**
* Delete
* @param {string}  role @description
* @returns request.delete Promission
*/
const Delete = function (role) {
  let path = `/auth/Role/${role}`
  return request.delete(path)
}
export default {
  GetRoles, CreateRole, GetUsersInRole, AddUserToRole, Delete
}
