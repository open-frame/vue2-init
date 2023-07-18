import http from '../index'

export default {
  // 账号登陆
  login: (params, config) => {
    return http.get("/service/demo/login.json", params, config)
  },
}