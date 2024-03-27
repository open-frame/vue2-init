import { axios } from './index.js'

// 下拉菜单的数据
export function dropdownsAPI(code, config) {
  return axios.post("/select/box/selectBoxPoint", { codeType: code }, config)
}

// 组织机构树
export function organizationTreeAPI(params, config) {
  return axios.post("/system/dept/treeData", params, config);
}

// 组织机构列表
export async function organizationListAPI(params, config) {
  const result = await axios.post("/system/dept/treeData", params, config);
  let flat = [];
  if (result.code === 0) {
    (function flattening(data) {
      data.map((item) => {
        // console.log(item);
        if (item.children) {
          flattening(item.children); // 递归执行
        }
        flat.push(item);
      });
    })(result.data);
  }
  return flat;
}

// 平台客户
export function platformClientsAPI(params, config) {
  return axios.post("/flow/monitor/getAssigneeList", params, config);
}


// 自己下级的电站
export function selfStationAPI() {
  return axios.get("/assetStake/getStationListByLoginUser");
}

// 获取所有角色
export function allRolesAPI() {
  return axios.get("/system/user/add")
}