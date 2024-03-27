import {axios} from '@/service/index'


export default {
  // 权限路由
  routers: (state, params, config) => {
    return axios.get("/service/demo/refresh.json", params, config);
  },

  // 用户信息
  userInfo(state, params, config) {
    return axios.get("/service/demo/current.json", params, config)
  },


}