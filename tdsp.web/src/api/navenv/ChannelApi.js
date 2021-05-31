/**
* class Channel Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetAll 获取全部航道分页数据
* @param {object}  pagination 分页参数
* @returns request.get response
*/
const GetAll = async function (pagination) {
  let path = `/api/navenv/Channel`
  let params = pages.toParams(pagination)

  let res = await request.get(path, { params })
  if (res.page) {
    pages.mergePageination(pagination, res)
  }
  return res
}

/**
* Update 更新航道数据
* @param  {object} channel @description
* @returns request.put Promission
*/
const Update = function (channel) {
  let path = `/api/navenv/Channel/${channel.channelId}`

  return request.put(path, channel)
}

/**
* Create 新建 航道数据
* @param  {object} channel @description
* @returns request.post Promission
*/
const Create = function (channel) {
  let path = `/api/navenv/Channel`

  return request.post(path, channel)
}

/**
* GetItemById 根据 ChannelId 获取 航道数据
* @param {string}  channelId @description 航道Id
* @returns request.get Promission
*/
const GetItemById = function (channelId) {
  let path = `/api/navenv/Channel/${channelId}`
  return request.get(path)
}

/**
* Delete 根据 Id 删除实体
* @param {string}  id @description
* @returns request.delete Promission
*/
const Delete = function (id) {
  let path = `/api/navenv/Channel/${id}`
  return request.delete(path)
}

export default {
  GetAll, Update, Create, GetItemById, Delete
}
