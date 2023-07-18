// 开放路由   需要在@/config/public-path.json 里配置路径
const publicRouter = [
  {
    path: '/404',
    name: 'page-404',
    component: () => import('@/pages/404'),
    meta: {
      title: '无此页',
      id: "page-404" // 全局唯一
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
  },
  {
    path: '/',
    name: 'main-file',
    component: () => import("@/pages/main.vue"),
    redirect: "/home",
    children: [
      {
        path: '/overviews/plateform*',
        component: () => import('@/pages/overviews/plateform'),
        meta: {
          menuType: "0"
        }
      }
    ]
  }
];


export default [...publicRouter]