<template>
  <el-table class="today-new-users" highlight-current-row size="mini" :data="tableData" tooltip-effect="dark"
    empty-text="今日暂无新增用户" @row-dblclick="see">
    <el-table-column show-overflow-tooltip prop="loginName" label="账号">
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="balance" label="余额"> </el-table-column>
    <el-table-column show-overflow-tooltip prop="integral" label="积分"> </el-table-column>
  </el-table>
</template>

<script>
/**
 * @author        全易
 * @time          2021-02-07 11:12:14  星期天
 * @description   新增用户
 */
import api from "@/service/api/home";

export default {
  name: "today-new-users",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.todyNewUsers();
  },
  methods: {
    // 今日新增用户
    todyNewUsers() {
      api
        .todyNewUsers({
          pageNum: 1,
          pageSize: 99,

        })
        .then((res) => {

          this.tableData = res.rows;
        });
    },
    see(data) {
      console.log(data);
      this.$router.push({
        name: "management-use-electric-index",
        params: { loginName: data.loginName },
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
