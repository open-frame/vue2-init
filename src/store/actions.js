import http from '../service/index'


export default {
  // 权限路由
  routers: () => {
    return http.post("/system/menu/refresh");
  },
}