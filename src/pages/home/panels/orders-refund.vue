<template>
   <custom-table ref="table" size="mini" :data="tableData" @row-dblclick="see" empty-text="暂无退款订单">
    <template v-slot:columns>
    <el-table-column show-overflow-tooltip label="状态" width="110">
      <template slot-scope="scope">
        {{ scope.row.approveStatus | transfortext(dropdowns.approveStatus) }}
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="userId" label="申请人账号">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="receiveMoney" label="退款额"> </el-table-column>
    <el-table-column show-overflow-tooltip prop="createTime" label="申请时间">
    </el-table-column>
  </template>
    </custom-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 17:22:25  星期天
 * @description   订单退款
 */
// import { refunds } from "@/pages/settlement/api.js";
import {dropdownsAPI} from "@/service/public.js";
import { transfortext } from "@/filters/index.js";
import { parseParmas } from "@/mixins/index.js";

export default {
  name: "orders-refund",
  mixins: [parseParmas],
  filters: {
    transfortext
  },
  data() {
    return {
      dropdowns: {
        approveStatus: []
      },
      tableData: [],
    };
  },
  created() {
    this.getDrapdowns();
    this.getData()
  },
  methods: {
    getDrapdowns() {
      // 审核状态
      dropdownsAPI("3039").then((res) => {
        if (res.code === 0) {
          this.dropdowns.approveStatus = res.data;
        }
      });
    },
    getData() {
        // refunds({
        //   userName: "",
        //   userId: "",
        //   orderId: "",
        //   phoneNumber: "",
        //   reason: "",
        //   dataResource: "",
        //   status: "",
        //   pageSize: 5,
        //   pageNum: 1,
        //   orderByColumn: "payTime",
        //   isAsc: "desc",
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
        name: "settlement-user-account-refund",
        params: { userId: data.userId },
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
