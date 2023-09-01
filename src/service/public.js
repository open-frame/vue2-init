import http from './index'

// 下拉菜单的数据
export function dropdownsAPI(code, config)  {
  return http.post("/select/box/selectBoxPoint", { codeType: code }, config)
}

// 组织结构树
export function organizationTreeAPI(params, config) {
  return http.post("/system/dept/treeData", params, config);
}

// 组织结构列表
export async function organizationListAPI(params, config) {
  const result = await http.post("/system/dept/treeData", params, config);
  let flat = [];
  (function flattening(data) {
    data.map((item) => {
      // console.log(item);
      if (item.children) {
        flattening(item.children); // 递归执行
      }
      flat.push(item);
    });
  })(result);
  return flat;
}

// 角色
export function allRolesAPI(params, config)  {
  return http.post("/system/allRoles", params, config);
}

// 库房
export function warehousesAPI(params, config)  {
  return http.post("/system/warehouses", params, config);
}
