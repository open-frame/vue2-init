import http from '../index'

// 公用请求
export default {
  // 自己下级的电站
  selfStation: () => {
    return http.get("/assetStake/getStationListByLoginUser");
  },
  
  // 下拉菜单的数据
  dropdowns: (params) => {
    return http.post("/select/box/selectBoxPoint", { codeType: params })
  },

  // 查询地址
  address: (params) => {
    return http.post("/management/merchant/getDistrict", params)
  },

  // 导出表格前的操作：给后端保存导出数据
  forBackendSaveExportData(params) {
    return http.post("/model/exportAllTable/saveDataArrs", params);
  },

  // 导出表格动作
  exportExcel() {
    location.href = "/yscar/model/exportAllTable/exportTableMsg";
    /* http({
      url: '/model/exportAllTable/exportTableMsg',
      method: 'post',
      responseType: 'blob'
    }).then(res => {
      console.log(res);
      const blob = new Blob([res]);
      let link = document.createElement("a"); // 创建下载的实体标签
      link.href = URL.createObjectURL(blob); // 创建下载的链接
      link.download = "电表填写模板" + ".xls"; // 下载的文件名
      link.click(); // 执行下载
      URL.revokeObjectURL(link.href); // 下载完成释放掉blob对象
    }) */
  },

  // 所有端口
  allPorts: (params) => {
    return http.post("/model/logPhotoBillingModel/queryStationPortMsg", params);
  },

  // 获取所有角色
  allRoles: () => {
    return http.get("/system/user/add")
  },

}