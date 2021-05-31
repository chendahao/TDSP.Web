/**
* class AuthRequest Api
* @description
*/

import request from '@/plugins/axios'

/**
* Validate
* @returns request.get Promission
*/
const Validate = function () {
  let path = `/auth/AuthRequest`
  return request.get(path)
}
export default {
  Validate
}
