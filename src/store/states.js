const publicPath = require("@/config/public-path.json") // 开放路径

export default {
  nowNet: "",  // 网络状态
  onLine: "",  // 在线情况
  fullPage: false, // 全页面 ｜ 结构页面
  userInfo: {}, // 用户信息
  permissionMenu: [], // 菜单栏数据
  permissionRouters: publicPath, // 所有路由
  permissionButtons: [], // 页面按钮权限
  permissionPublic: [], // 全局的权限，如nav条上的【个人中心】
  isCollapse: true, // 展开菜单栏
  showOpenedPages: true,  // 显示页签
  openedPages: [], // 页面页签
  nowPage: "",  // 当前停留页面
}