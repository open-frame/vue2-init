import $router from './index';
import store from '@/store';


// 全局前置守卫
$router.beforeEach((to, from, next) => {
  console.log(to);
  // 2/1. 判断登陆情况
 /*  const token = localStorage.getItem("token");
  if (!token) {
    if (to.path !== "/logon") {
      store.commit("logout");
      next({ path: '/logon' })
    }
  } */

  // 2/2. 判断访问越权  
 /*  let paths = store.state.permissionRouters;
  if (!paths.includes(to.path)) {
    next({ path: '/404' })
  } */

  // 满足以上条件，才能过 
  next();

  // 记忆访问过的页面
  let includ = store.state.openedPages.some(item => {
    return item.url === to.fullPath;
  });
  if (!includ) {
    store.commit("setOpenedPages", {
      title: to.meta.title,
      url: to.fullPath,
      meta: {
        id: to.meta.id,
        name:to.name
      }
    })
  }
  store.commit("setDefaultPage", to.meta.id);
  store.commit("setKeepAlivePage", to.name);
})

/* // 全局解析守卫
$router.beforeResolve((to, from) => {
    console.log(to,from)
}) */

// 全局后置钩子
$router.afterEach((to, from) => {
  // console.log(to, from)
  store.commit("changeMenuid", to.meta.id)
})
