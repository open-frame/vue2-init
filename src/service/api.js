import http from './index'


export default {
  // 通用POST请求
  isPost: (data, link) => {
    return http.post(link, data);
  },

  // 通用GET请求
  isGet: (link, data) => {
    return http.get(link, {
      params: data // 此data需要是：{}格式
    })
  },

  //路由
  routers: (params) => {
    return http.post("/escar/routers", params)
  },

  //登陆
  login: (params) => {
    return http.post("/escar/login", params)
  },

  // 菜单资源列表
  menuResource: (data) => {
    return http.get("/escar/system/menu/list", {
      params: data
    })
  },

  //下拉菜单
  dropdowns: (params) => {
    return http.post("/escar/select/box/selectBoxPoint", params)
  },

  // 选择地址
  addressData: (params) => {
    return http.post("/escar/model/logPhotoBillingModel/queryAreaDropDown", params)
  },

  // 组织
  organizations: (params) => {
    return http.post("/escar/system/dept/list", params);
  },

  // 角色
  roleList: (params) => {
    return http.post("/escar/system/role/list", params);
  },

  // 添加/修改角色
  editRole: (params) => {
    return http.post("/escar/system/role/edit", params);
  },

  // 删除角色
  deleteRole: (params) => {
    return http.post("escar/system/role/remove", params);
  },

  // 菜单权限树
  menuJurisdiction: (data) => {
    return http.get("/escar/system/menu/roleMenuTreeData", {
      params: data
    })
  },

  // 用电用户
  electricUsers: (params) => {
    return http.post("/escar/system/elecuser/getListByPage", params);
  },

  // 改变用电用户状态
  electricUsersStatus: (params) => {
    return http.post("/escar/system/elecuser/updateUserStatus", params);
  },

  // 组织结构树
  organizationTree: (params) => {
    return http.post("/escar/system/dept/treeData", params);
  },

  // 运营用户
  operationUsers: (params) => {
    return http.post("/escar/system/user/list", params);
  },

  // 电站列表
  powerStations: (params) => {
    return http.post("/escar/assetStation/getListByPage", params);
  },

  // 设备列表
  equipmentList: (params) => {
    return http.post("/escar/assetStake/getListByPage", params);
  },

  // 订单列表
  orders: (params) => {
    return http.post("/escar/cloud/charging/chargingElecOrder/list", params);
  },

  // 订单汇总
  orderTotal: (params) => {
    return http.post("/escar/cloud/charging/chargingElecOrder/queryCaculateMsg", params);
  },

  // 计费模型
  billingModels: (params) => {
    return http.post("/escar/model/logPhotoBillingModel/getListByPage", params);
  },

  // 工单列表
  workList: (params) => {
    return http.post("/escar/operatemonitorcenter/workorder/list", params);
  },
}
