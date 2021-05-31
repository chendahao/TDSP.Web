/**
* class NavEnv Api
* @description
*/

import request from '@/plugins/axios'

/**
* GetShipMarks Get ShipMarks
* @returns request.get Promission
*/
const GetShipMarks = function () {
  let path = `/marks`
  return request.get(path)
}
export default {
  GetShipMarks
}
