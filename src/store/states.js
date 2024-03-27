const publicPath = require("@/config/public-path.json");

export default {
  loginDialog: false,
  fullPage: false, // 全页面 (无菜单栏和页签)
  layout: "1", // 页面结构
  userInfo: {}, // 用户信息
  permissionMenu: [], // 菜单栏数据
  permissionRouters: publicPath, // 所有路由权限
  permissionButtons: [], // 当前页按钮权限
  isCollapse: true, // 展开菜单栏
  showOpenedPages: true,  // 显示页签
  openedPages: [], // 页面页签
  nowPage: "",  // 当前停留页面
  nowDept: ""
}