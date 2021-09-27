<template>
  <el-table
    class="withdraw"
    highlight-current-row
    size="mini"
    height="357"
    :data="tableData"
    tooltip-effect="dark"
    @row-dblclick="see"
  >
    <el-table-column prop="userName" label="用户" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="userId" label="账号" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="phoneNumber" label="手机号" width="120">
    </el-table-column>
    <el-table-column prop="duration" label="用时" show-overflow-tooltip> </el-table-column>
    <el-table-column prop="totalElectric" label="耗电"> </el-table-column>
    <el-table-column prop="amount" label="订单总额"> </el-table-column>
    <el-table-column prop="createTime" label="开始时间" width="180">
    </el-table-column>
    <el-table-column prop="endTime" label="结束时间" width="180">
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 16:57:38  星期天
 * @description   未付款订单
 */
// import api from "@/service/api/orders";

export default {
  name: "withdraw",
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
        .orders({
          balance: "",
          billStatus: "",
          clearStatus: "",
          construction: "",
          endTimeSerach: "",
          isAsc: "desc",
          orderByColumn: "createtime",
          orderId: "",
          orderStatus: "3",
          pageNum: 1,
          pageSize: 10,
          payStatus: "1",
          phoneNumber: "",
          settleStatus: "",
          startTimeSerach: "",
          stationName: "",
          stopElecReason: "",
          tradeRecordId: "",
          userName: "",
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
        path: "/orders/order-manage",
        query: { orderId: data.orderId },
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
