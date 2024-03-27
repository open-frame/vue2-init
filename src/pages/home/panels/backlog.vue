<template>
  <custom-table size="mini" ref="table" :loading="loading" :total="total" :data="tableData" @row-dblclick="see"
    row-key="processInstanceId">
    <template v-slot:columns>
      <el-table-column show-overflow-tooltip prop="processInstanceId" label="流程id">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="processName" label="流程名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="startTime" label="流程开始时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="taskId" label="任务id">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="taskName" label="任务名称">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="taskCreateTime" label="任务开始时间">
      </el-table-column>
    </template>
  </custom-table>
</template>

<script>
/**
 * @author        全易
 * @time          2023-05-12 13:31:20  星期五
 * @description   待办
 **/
// import { myTask } from "@/pages/my/api.js";
import { parseParmas } from "@/mixins/index.js";


export default {
  name: "my-backlog",
  mixins: [parseParmas],
  data() {
    return {
      loading: false,
      queryForm: {
        processDefinitionKey: "",
        pageSize: 5,
        pageNum: 1,
      },
      tableData: [],
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [];
      this.loading = true;
      // myTask(this.queryForm).then((res) => {
      //   this.loading = false;
      //   if (res.code === 0) {
      //     this.total = res.total;
      //     this.tableData = res.rows;
      //   }
      // }).catch(() => {
      //   this.loading = false;
      // })
    },
    see(data) {
      console.log(data);
      this.$router.push({
        name: "settlement-user-account-withdraw",
        params: { userId: data.userId },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>