/**
* class Codes Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetOrgans 组织机构代码
* @returns request.get Promission
*/
const GetOrgans = function () {
  let path = `/api/navenv/Codes/Organ`
  return request.get(path)
}

/**
* GetHarbors 港池编码
* @returns request.get Promission
*/
const GetHarbors = function () {
  let path = `/api/navenv/Codes/Harbor`
  return request.get(path)
}

/**
* GetWharfs 码头编码
* @returns request.get Promission
*/
const GetWharfs = function () {
  let path = `/api/navenv/Codes/Wharf`
  return request.get(path)
}

/**
* GetBerthGroups 泊位组编号,根据组织机构/码头/GropNo 排序
* @returns request.get Promission
*/
const GetBerthGroups = function () {
  let path = `/api/navenv/Codes/BerthGroup`
  return request.get(path)
}

/**
* GetBerths 泊位编码 (BerthId,BerthNo)
* @param {boolean}  showTopLevel @description
* @returns request.get Promission
*/
const GetBerths = function (showTopLevel) {
  let path = `/api/navenv/Codes/Berth`
  let params = {}
  params['showTopLevel'] = showTopLevel

  return request.get(path, { params })
}
export default {
  GetOrgans, GetHarbors, GetWharfs, GetBerthGroups, GetBerths
}
