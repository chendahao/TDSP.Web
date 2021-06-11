/**
* class Account Api
* @description
*/

import request from '@/plugins/axios'

/**
* Register
* @param  {object} info @description
* @returns request.post Promission
*/
const Register = function (info) {
  let path = `/auth/Account/Register`

  return request.post(path, info)
}

/**
* Login
* @param  {string} userName
* @param  {string} password
* @returns request.post Promission
*/
const Login = function (username, password, remberMe = false) {
  let path = `/auth/Account/login`
  let params = {
    userName: username,
    password: password,
    rememberMe: remberMe
  }

  return request.post(path, params)
}

/**
* RefreshToken
* @returns request.post Promission
*/
const RefreshToken = function () {
  let path = `/auth/Account/RefreshToken`
  return request.post(path)
}

/**
* ChangePassword
* @param {string}  currentPwd @description
* @param {string}  newPwd @description
* @returns request.put Promission
*/
const ChangePassword = function (currentPwd, newPwd) {
  let path = `/auth/Account/ChangePassword`
  return request.put(path, { currentPwd, newPwd })
}
export default {
  Register, Login, RefreshToken, ChangePassword
}
