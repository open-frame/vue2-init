<template>
  <el-card class="">
    <el-row :gutter="30" class="filters">
      <!-- <el-col :span="4">
        <process-select animatLable v-model="queryForm.processDefinitionKey" @change="pageReset" />
      </el-col> -->
      <el-col class="text-end" :span="24">
        <el-button size="medium" @click="getData" type="primary">搜索</el-button>
        <el-button size="medium" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <edo-table ref="order-table" :loading="loading" :total="total" :data="tableData" height="560" row-key="orderId"
      :page-size="queryForm.pageSize" :current-page="queryForm.pageNum" @current-change="handleCurrentChange"
      @size-change="dataSizeChange" @exporting="exporting">
      <!-- <template v-slot:left></template> -->
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
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
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="check(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </template>
    </edo-table>
    <component :ref="componentName" :is="componentName" :params="componentParams" :show="formDialog"
      @close="formDialog = false" @success="getData" />
  </el-card>
</template>

<script>
/**
* @author        全易
* @time          2023-05-12 13:31:20  星期五
* @description   待办
**/
import Vue from 'vue'
import api from "@/service/api/my";
import exportFile from "@/utils/export-file";

import resetFilter from "@/mixins/reset-filter.js"
import pageReset from "@/mixins/page-reset.js"
import pagination from "@/mixins/pagination.js"

export default {
  name: '',
  mixins: [pageReset, resetFilter, pagination],

  data() {
    return {
      loading: false,
      queryForm: {
        processDefinitionKey: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      tableData: [],
      total: 0,
      taskId: "",
      componentName: "",
      formDialog: false,
      componentParams: {}
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.tableData = [];
      api.myTask(this.queryForm).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      });
    },
    // 区分该打开什么审核的表单
    async check(row) {
      if (!row.formKey) {
        this.$message.info(`没有 formKey`);
        return;
      }
      try {
        const component = await import(`./components/${row.formKey}.vue`);
        this.componentName = row.formKey.replace("/", "-");
        Vue.component(this.componentName, component.default);
        this.componentParams = row;
        this.formDialog = true;
      } catch (err) {
        this.$message.info(`找不到 ${row.formKey} 资源，404`);
      }
    },
    // 导出
    exporting(command) {
      console.log(command);
      if (this.tableData.length < 1) {
        this.$message.warning("无数据可导");
        return false;
      }

      const downLoading = this.$loading({
        lock: true,
        text: "正在获取数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let params = { ...this.queryForm };
      if (command === "2") {
        params.pageSize = this.total;
        params.pageNum = 1;
      }

      api
        .myTask(params)
        .then((res) => {
          if (res.code === 0) {
            downLoading.text = "正在下载...";
            const data = res.rows.map((item) => {
              return {
                流程id: item.processInstanceId,
                流程名称: item.processName,
                任务开始时间: item.taskCreateTime,
                任务名称: item.taskName,
                流程开始时间: item.startTime,
                指定处理人: item.assignee,
                任务id: item.taskId,
              };
            });
            exportFile.excel(data, "我的待办");
          }
        })
        .finally(() => {
          downLoading.close();
        });
    },
  }
}
</script>

<style lang="less" scoped></style>