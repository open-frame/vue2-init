// https://quanyi.blog.csdn.net/article/details/107308020
import $router from './index';
import store from '@/store';
import { menuResource } from "@/pages/system/api.js"
import { axiosPromise } from '@/service/index'


// 全局前置守卫
$router.beforeEach(async (to, from, next) => {
  // console.log(to);
  // 2/1. 判断登陆情况
  const token = localStorage.getItem("token");
  if (!token && to.path !== "/logon") {
    return store.commit("logout", "1");
  }

  // 2/2. 判断访问越权  
  const paths = store.state.permissionRouters;
  if (paths.includes(to.path) || to.path.includes("/overviews/plateform")) {
    return next()
  }

  axiosPromise.forEach((request, index) => {
    // console.log(request);
    const noCancel = ["/system/menu/refresh", "/system/role/current"];
    if (!noCancel.includes(request.url)) {
      request.cancel()
      delete axiosPromise[index];
    }
  })

  const { data: menuList } = await menuResource({ url: to.path, visible: '0' });
  $router.replace({ path: menuList.length > 0 ? '/403' : '/404' })
})

/* // 全局解析守卫
$router.beforeResolve((to, from) => {
    console.log(to,from)
}) */

// 全局后置钩子
$router.afterEach((to, from) => {
  // console.log(to, from)
  store.commit("setOpenedPages", {
    fullPath: to.fullPath,
    meta: to.meta,
    name: to.name,
    path: to.path,
  })
  store.commit("setDefaultPage", to.meta.menuIdStr);
  store.commit("setPermissionButtons", to.meta.permissions);
  store.commit("changeFullPage", to.meta.menuType === "0");
})
