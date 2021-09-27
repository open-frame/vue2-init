// 首页

import http from '../index'
export default {
  // 首页布局
  homeLayout: (params) => {
    return http.post("/fsfsd/fsfsdfs", params)
  },

  // 修改首页布局
  editHomeLayout: (params) => {
    return http.post("/tertrete/fsdfsfs", params)
  },

  // 首页模块
  homeComponents: (params) => {
    return http.post("/jhrhrt/werwerwe", params)
  },

  // 今日新增用户
  todyNewUsers: (params) => {
    return http.post("/ddddds/kykuyytt/qwwadasd", params)
  },
}