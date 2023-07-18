<template>
  <el-table class="withdraw" highlight-current-row size="mini" :data="tableData" tooltip-effect="dark"
    @row-dblclick="see">
    <el-table-column show-overflow-tooltip label="状态" width="110">
      <template slot-scope="scope">
        {{ scope.row.approveStatus | CodeTransforText(dropdowns.approveStatus) }}
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="userId" label="申请人账号">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="backMoney" label="提现额" width="90"> </el-table-column>
    <el-table-column show-overflow-tooltip prop="createTime" label="申请时间">
    </el-table-column>
  </el-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 16:57:38  星期天
 * @description   用户提现
 */
// import api from "@/service/api/settlement";
import $publicAPI from "@/service/public.js";
import { CodeTransforText } from 'code-transfor-text_vue'

export default {
  name: "users-withdraw",
  filters:{
    CodeTransforText
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
    // this.getData();
    // this.getDrapdowns();
  },
  methods: {
    getDrapdowns() {
      // 审核状态
      $publicAPI.dropdowns("3039").then((res) => {
        if (res.code === 0) {
          this.dropdowns.approveStatus = res.data;
        }
      });
    },
    getData() {
      // api
      //   .withdraws({
      //     pageNum: 1,
      //     pageSize: 5,
      //     refundOrder: "",
      //     phoneNumber: "",
      //     userId: "",
      //     userName: "",
      //     status: "",
      //   })
      //   .then((res) => {

      //     if (res.code === 0) {
      //       this.tableData = res.rows;
      //     }
      //   });
    },
    see(data) {
      console.log(data);
      this.$router.push({
        name: "settlement-user-account-withdraw",
        params: { userId: data.loginName, panel: "1" },
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
