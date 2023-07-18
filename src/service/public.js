import http from './index'

// 公用请求
export default {
  // 下拉菜单的数据
  dropdowns: (code, config) => {
    return http.post("/select/box/selectBoxPoint", { codeType: code }, config)
  },

  // 组织结构树
  organizationTree: (params, config) => {
    return http.post("/system/dept/treeData", params, config);
  },

  // 组织结构列表
  async organizationList(params, config) {
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
  },

  // 角色
  allRoles: (params, config) => {
    return http.post("/system/allRoles", params, config);
  },

  // 库房
  warehouses: (params, config) => {
    return http.post("/system/warehouses", params, config);
  },
}