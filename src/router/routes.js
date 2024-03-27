// 开放路由   需要在@/config/public-path.json 里配置路径
const publicRouter = [
  {
    path: '/404',
    name: 'page-404',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      title: '无此页',
      id: "page-404" // 全局唯一
    }
  },
  {
    path: '/403',
    name: 'page-403',
    component: () => import('@/pages/error/403.vue'),
    meta: {
      title: '无权限',
      id: "page-403" // 全局唯一
    }
  },
  {
    path: '/logon',
    name: 'page-login',
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: '账号登录',
      id: "page-login"// 全局唯一
    }
  }
];


export default [...publicRouter]