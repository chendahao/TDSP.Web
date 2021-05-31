/**
* class BeforeMeeting Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetAll 根据日期 获取 船前会记录
* @param {string}  regDate @description
* @returns request.get Promission
*/
const GetAll = function (regDate) {
  let path = `/api/plan/BeforeMeeting`
  let params = {}
  params['regDate'] = regDate

  return request.get(path, { params })
}

/**
* Create 新建 船前会记录
* @param  {object} beforeMeeting @description
* @returns request.post Promission
*/
const Create = function (beforeMeeting) {
  let path = `/api/plan/BeforeMeeting`

  return request.post(path, beforeMeeting)
}

/**
* GetById 根据 Id 获取 船前会记录
* @param {string}  id @description
* @returns request.get Promission
*/
const GetById = function (id) {
  let path = `/api/plan/BeforeMeeting/${id}`
  let params = {}

  return request.get(path, { params })
}

/**
* Update 新建 船前会记录
* @param {string}  id @description
* @param  {object} beforeMeeting @description
* @returns request.put Promission
*/
const Update = function (id, beforeMeeting) {
  let path = `/api/plan/BeforeMeeting/${id}`

  return request.put(path, beforeMeeting)
}

/**
* Delete 新建 船前会记录
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/plan/BeforeMeeting/${id}`
  let params = {}

  return request.delete(path, { params })
}
export default {
  GetAll, Create, GetById, Update, Delete
}
