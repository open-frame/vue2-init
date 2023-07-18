import http from '../service/index'


export default {
  // 权限路由
  routers: (params, config) => {
    return http.get("/service/demo/routers.json", params, config);
  },

  // 用户信息
  userInfo(params, config) {
    return http.get("/service/demo/user-info.json", params, config)
  },

  
}