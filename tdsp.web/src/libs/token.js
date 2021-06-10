import { setToken, getToken } from '@/libs/util'
import jwt from 'jsonwebtoken'
import { AuthApi as authapi } from '@/api/auth'
import request from '@/plugins/axios'
import dayjs from 'dayjs'

// interface t  {
//   [key: string]: boolean | number | string | any,
//   aud?: null | { [key: string]: any } | string,
//   exp?: null | { [key: string]: any } | string,
//   iat?: null | { [key: string]: any } | string,
//   iss?: null | { [key: string]: any } | string,
//   jti?: null | { [key: string]: any } | string,
//   name?: null | { [key: string]: any } | string,
//   nbf?: null | { [key: string]: any } | string
// }

/**
 * @description: 刷新用户token信息 防止token过期
 * @param {type}
 * @return:
 */
export function refreshToken () {
  // 用户登录后或用户存在登录用户时
  const token = getToken()
  if (token) {
    const tokenInfo = jwt.decode(token)
    // diffmin = token剩余有效分钟
    const diffmin = dayjs(tokenInfo.exp * 1000).diff(dayjs(), 'minute')
    // token 有效时间不足30分钟时更新token，
    // 有效时间小于0时，token过期，再次调用api时返回401，弹出重新登陆提示
    if (diffmin < 30 && diffmin > 0) {
      getNewToken()
    }
    setInterval(() => {
      const token = getToken()
      const tokenInfo = jwt.decode(token)
      const diffmin = dayjs(tokenInfo.exp * 1000).diff(dayjs(), 'minute')
      if (diffmin < 30 && diffmin > 0) {
        getNewToken()
      }
    }, 1000 * 60 * 15)
  }
}

/**
 * @description: 通过API获取新的token
 * @param {type}
 * @return:
 */
function getNewToken () {
  const client = new authapi.AccountClient('', request)
  client.refreshToken()
    .then(res => {
      // setToken(res.token!)
      setToken(res.token)
    })
}
