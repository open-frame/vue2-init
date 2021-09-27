import http from '../index'

export default {
  // 账号登陆
  login: (params) => {
    return http.post(path + "/goin", params)
  },
}