<template>
   <custom-table ref="table" size="mini" :data="tableData" @row-dblclick="see" empty-text="暂无未付款订单">
    <template v-slot:columns>
    <el-table-column show-overflow-tooltip prop="userId" label="账号" >
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="phoneNumber" label="手机号" width="120">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="duration" label="用时" > </el-table-column>
    <el-table-column show-overflow-tooltip prop="totalElectric" label="耗电"> </el-table-column>
    <el-table-column show-overflow-tooltip prop="amount" label="订单总额"> </el-table-column>
    <el-table-column show-overflow-tooltip prop="createTime" label="开始时间" width="180">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="endTime" label="结束时间" width="180">
    </el-table-column>
  </template>
    </custom-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 16:57:38  星期天
 * @description   未付款订单
 */
// import {orders} from "@/pages/orders/api.js";
import { parseParmas } from "@/mixins/index.js";


export default {
  name: "nopay-orders",
  mixins: [parseParmas],
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
        // orders({
        //   balance: "",
        //   billStatus: "",
        // })
        // .then((res) => {
          
        //   if (res.code === 0) {
        //     this.tableData = res.rows;
        //   }
        // });
    },
    see(data) {
      console.log(data);
      this.$router.push({
        name:'orders-order-manage-index',
        params: { orderId: data.orderId },
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
