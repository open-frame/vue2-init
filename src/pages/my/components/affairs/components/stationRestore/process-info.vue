<template>
  <div class="text-center">
    <div>
      <div class="fs-6 fw-bold text-start">审批信息</div>
      <edo-table size="mini" :data="tableData">
        <template v-slot:columns>
          <el-table-column show-overflow-tooltip prop="processInstanceId" label="流程实例id">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="durationTime" label="任务耗时">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="checkStatus" label="审核状态">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="assigneeName" label="审批人">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="taskName" label="任务名称">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="startTime" label="开始时间">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="endTime" label="结束时间">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="checkReason" label="审批意见">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="taskId" label="任务id">
          </el-table-column>
        </template>
      </edo-table>
    </div>
    <img :src="processImg" alt="流程图" srcset="">
  </div>
</template>

<script>
/**
* @author        全易
* @time          2023-06-01 10:11:33  星期四
* @description   审核信息
**/
// import api from "@/service/api/process";

export default {
  name: '',
  data() {
    return {
      tableData: [],
      processImg: ""
    }
  },
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  watch: {
    params: {
      immediate: true, // 立即处理 进入页面就触发
      handler(now, old) {
        this.clearnData();
        if (now.processInstanceId && now.taskId) {
          this.getData();
        }
      },
    }
  },
  methods: {
    getData() {
      this.getHistory();
      this.openProsess();
    },
    getHistory() {
      api.examineHistory({
        processInstanceId: this.params.processInstanceId
      }).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data;
        }
      });
    },
    openProsess() {
      api.processImg({
        processInstanceId: this.params.processInstanceId
      }).then((res) => {
        console.log(res);
        const blob = new Blob([res]);
        this.processImg = URL.createObjectURL(blob);
      });
    },
    clearnData() {
      this.info = {};
      this.tableData = [];
      this.processImg = "";
    }
  }
}
</script>

<style lang="less" scoped></style>