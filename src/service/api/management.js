// 管理中心

import http from '../index'
export default {
  // 路由资源列表
  menuResource: (params, config) => {
    return http.get("/service/demo/menus.json", params, config)
  },

  // 添加菜单资源
  addMenu: (params, config) => {
    return http.post("/service/demo/add", params, config)
  },

  // 修改菜单
  editMenu: (params, config) => {
    return http.post("/service/demo/edit", params, config)
  },

  // 删除路由
  deleteMenu: (params, config) => {
    return http.post("/service/demo/remove", params, config)
  },

  // 角色
  roleList: (params, config) => {
    return http.get("/service/demo/role-list.json", params, config)
  },

  // 角色详情
  roleDetail: (id) => {
    return http.post("/service/demo/edit/" + id);
  },

  // 添加角色
  addRole: (params, config) => {
    return http.post("/service/demo/add", params, config);
  },

  // 修改角色
  editRole: (params, config) => {
    return http.post("/service/demo/edit", params, config);
  },

  // 删除角色
  deleteRole: (params, config) => {
    return http.post("/service/demo/remove", params, config);
  },

  // 路由权限树
  menuJurisdiction: (data) => {
    return http.get("/service/demo/roleMenuTreeData.json", { params: data })
  },

  // 运营用户
  operationUsers: (params, config) => {
    return http.get("/service/demo/operation-users.json", params, config)
  },

  // 运营用户详情
  operationUserDetail: (id) => {
    return http.post("/service/demo/edit/" + id);
  },

  // 删除运营用户
  deleteOperationUsers: (params, config) => {
    return http.post("/service/demo/remove", params, config);
  },

  // 运营用户重置密码
  operationUsersResetPassWord: (params, config) => {
    return http.post("/service/demo/resetPwd", params, config);
  },

  // 添加运营用户
  addOperationUsers: (params, config) => {
    return http.post("/service/demo/add", params, config);
  },

  // 修改运营用户
  editOperationUsers: (params, config) => {
    return http.post("/service/demo/edit", params, config);
  },


}