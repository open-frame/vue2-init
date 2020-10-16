// 获取路由路径文件
/* 
import api from '../service/api'
var routers;
api.routers({
    jurisdiction: 1
  }).then((res) => {
    console.log(res);
    if (res.code === 0) {
      routers = res.data;
    }
  })
  .catch((err) => {
    this.$message.error("获取失败");
  });





// export default = routers;
*/

// 静态路径
export default [{
    path: '/login',
    name: 'Lonin',
    component: () => import("@/pages/login/index.vue")
  },
  {
    path: '/',
    name: 'Main',
    component: () => import("@/pages/main.vue"),
    redirect: "/home",
    children: [{
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home'),
        title: '首页'
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/pages/test'),
        title: '测试页'
      },
      /* ------------------------ 管理中心 ------------------------ */
      {
        path: 'management/operation',
        name: 'Operation',
        component: () => import('@/pages/management/operation'),
        title: '管理中心 - 运营用户管理'
      },
      {
        path: 'management/role',
        name: 'Role',
        component: () => import('@/pages/management/role'),
        title: '管理中心 - 角色管理'
      },
      {
        path: 'management/menus',
        name: 'Menus',
        component: () => import('@/pages/management/menus'),
        title: '管理中心 - 菜单管理'
      },
      {
        path: 'management/organization',
        name: 'Organization',
        component: () => import('@/pages/management/organization'),
        title: '管理中心 - 组织管理'
      },
      /* ------------------------ 资产中心 ------------------------ */
      {
        path: 'balance/equipment',
        name: 'Equipment',
        component: () => import('@/pages/balance/equipment'),
        title: '资产中心 - 设备管理'
      },
      {
        path: 'balance/power-stations',
        name: 'power-stations',
        component: () => import('@/pages/balance/power-stations'),
        title: '资产中心 - 电站管理'
      },
      /* ------------------------ 订单中心 ------------------------ */
      {
        path: 'orders/order-manage',
        name: 'order-manage',
        component: () => import('@/pages/orders/order-manage'),
        title: '订单中心 - 订单管理'
      },
      /* ------------------------ 清算中心 ------------------------ */
      {
        path: 'accounting/billing-templates',
        name: 'billing-templates',
        component: () => import('@/pages/accounting/billing-templates'),
        title: '订单中心 - 订单管理'
      },
      /* ------------------------ 运监中心 ------------------------ */
      {
        path: 'operational/work-order',
        name: 'work-order',
        component: () => import('@/pages/operational/work-order'),
        title: '订单中心 - 订单管理'
      },
    ]
  }
]
