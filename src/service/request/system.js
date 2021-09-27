import http from '../index'
import $store from '@/store'


// 系统级请求
export default {
  // 更新权限路由信息
  routers: () => {
    // console.log(store.state.userInfo);
    http.post("/system/menu/refresh").then(res => {
      if (res.code === 0) {
        $store.commit("setMenu", res.data.menuList);
        $store.commit("setRouters", res.data.menuList);
      }
    })
  },

  // 用户信息
  userInfo(){
  return  http.post("/system/role/current")
  }
}
