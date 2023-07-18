// 首页

import http from '../index'
export default {
  // 首页布局
  homeLayout: (params, config) => {
    return http.get("/service/demo/loadHomeConfig.json", params, config)
  },

  // 修改首页布局
  saveHomeLayout: (params, config) => {
    return http.post("/service/demo/saveHomeConfig", params, config)
  },

  // 首页模块
  allComponents: (params, config) => {
    return http.post("/service/demo/homeConfigBox", params, config)
  },

  // 今日新增用户
  todyNewUsers: (params, config) => {
    return http.get("/service/demo/newElecUser.json", params, config)
  },
}