<template>
  <el-card class="">
    <el-button class="mb-4" type="primary" @click="printing">打印json</el-button>
    <pre class="border p-4" style="height: 73vh; overflow-y: auto;">{{ tableData }}</pre>
  </el-card>
</template>

<script>
/**
* @author        全易
* @time          2023-06-30 16:38:56  星期五
* @description  展示打印
**/

import api from "@/service/api/management";

export default {
  name: 'print-index',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      api.roleList().then((res) => {
        if (res.total) {
          this.tableData = res.rows;
        }
      });
    },
    // 打印订单表
    printing() {
      const tableColumn = [
        { field: "roleId", displayName: "角色id" },
        { field: "roleName", displayName: "角色名称" },
        { field: "roleKey", displayName: "权限字符" },
        { field: "createTime", displayName: "创建时间" },
      ];
      printJS({
        type: "json",
        printable: [...this.tableData, ...this.tableData, ...this.tableData],
        scanStyles: true,
        header: `<h2 style="text-align: center">角色列表</h2>`,
        properties: tableColumn,
        style: "@media print{@page {size:landscape}}",
        // gridHeaderStyle: "border: 1px solid #000;text-align:center",
        // gridStyle: "border: 1px solid #000;text-align:center",
      });
    }
  }
}
</script>

<style lang="less" scoped></style>