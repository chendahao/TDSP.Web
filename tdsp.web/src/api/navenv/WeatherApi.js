/**
* class Weather Api
* @description
*/

import pages from '../pages'
import request from '@/plugins/axios'

/**
* GetTodayWeather
* @param {pagination}  pagination @description 分页参数
* @param {string}  date @description 日期
* @returns request.get Promission
*/
const GetTodayWeather = function (pagination, date) {
  let path = `/api/navenv/Weather`
  let params = pages.toParams(pagination)
  if (date) {
    params['date'] = date
  }

  return request.get(path, { params })
}
export default {
  GetTodayWeather
}
