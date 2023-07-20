// https://quanyi.blog.csdn.net/article/details/107308020
import $router from './index';
import store from '@/store';


// 全局前置守卫
$router.beforeEach((to, from, next) => {
  // console.log(to);
  // 2/1. 判断登陆情况
  const token = localStorage.getItem("token");
  if (!token && to.path !== "/logon") {
    return store.commit("logout", "1");
  }

  // 2/2. 判断访问越权  
  const paths = store.state.permissionRouters;
  if (!paths.includes(to.path)) {
    return next({ path: '/404' })
  }

  // 满足以上条件，才能过 
  next();
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
  store.commit("setDefaultPage", to.meta.id);
  store.commit("setPermissionButtons", to.meta.permissions);
  store.commit("changeLayout", to.meta.menuType === "0" ? "0" : store.state.layout);
})
