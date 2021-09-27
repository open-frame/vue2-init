// 开放路由
const publicRouter = [
  {
    path: '/404',
    component: () => import('@/pages/404'),
    meta: {
      title: '无此页',
      id: "0"
    }
  },
  {
    path: '/logon',
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: '账号登录',
      id: ""
    }
  },
  {
    path: '/',
    name: 'Main',
    component: () => import("@/pages/main.vue"),
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Page-Home',
        component: () => import('@/pages/home/index'),
        meta: {
          title: '看盘',
          id: "Page-Home"
        }
      }
    ]
  }
];

// 权限路由
const privilegeRouter = [
  {
    path: '/',
    name: 'Main',
    component: () => import("@/pages/main.vue"),
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Page-Home',
        component: () => import('@/pages/home/index'),
        meta: {
          title: '首页',
          id: "1369"
        }
      },
      {
        path: 'test',
        name: 'Page-Test',
        component: () => import('@/pages/test'),
        meta: {
          title: '测试页',
          id: "87654331253476541323487654132221"
        }
      },
    ]
  }
]


export default [...publicRouter,...privilegeRouter]