<template>
  <el-table
    class="refund"
    highlight-current-row
    size="mini"
    :data="tableData"
    tooltip-effect="dark"
    @row-dblclick="see"
  >
    <el-table-column label="状态" width="110">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.approveStatus === '1'" type="warning"
          >待审核</el-tag
        >
        <el-tag v-if="scope.row.approveStatus === '2'" type="success"
          >运营已审核</el-tag
        >
        <el-tag v-if="scope.row.approveStatus === '3'" type="info"
          >经理已审核</el-tag
        >
        <el-tag v-if="scope.row.approveStatus === '4'" type="danger"
          >财务已审核</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="userName" label="申请人" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="userId" label="账号" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="phoneNumber" label="手机号" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="receiveMoney" label="退款额"> </el-table-column>
    <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 17:22:25  星期天
 * @description   订单退款
 */
// import api from "@/service/api/settlement";

export default {
  name: "refund",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    getData() {
      api
        .refunds({
          userName: "",
          userId: "",
          orderId: "",
          phoneNumber: "",
          reason: "",
          dataResource: "",
          status: "",
          pageSize: 5,
          pageNum: 1,
          orderByColumn: "payTime",
          isAsc: "desc",
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.tableData = res.rows;
          }
        });
    },
    see(data) {
      console.log(data);
      this.$router.push({
        path: "/settlement/user-account",
        query: { refundOrder: data.refundOrder, panel: "refund" },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  border: none;
  &::before,
  &::after {
    height: 0;
  }
}
</style>
