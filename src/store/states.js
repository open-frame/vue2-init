import publicPath from "../router/path"

export default {
  nowNet: "",  // 网络状态
  onLine: "",  // 在线情况
  userInfo: {}, // 用户信息
  menuId: "1369",// 菜单栏停留id
  permissionMenu: [], // 权限菜单
  permissionRouters: publicPath, //权限路由
  keepAlivePages: ["Page-Home"],
  isCollapse: true, // 菜单栏展开状态,展开是false
  width: { "max-width": "12vw" }, // 布局
  editLayout: false, // 首页模块调整
  addLayout: false,   // 首页添加模块面板
  hideNav: false, // 隐藏顶部条
  hideMenu: false, // 隐藏菜单栏
  showOpenedPages: true,  // 显示访问过的页面
  openedPages: [], // 访问过的页面
  defaultPage: "Page-Home"  // 当前停留页面
}