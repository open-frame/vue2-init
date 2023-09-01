<template>
  <el-dialog title="停复运执行" :close-on-click-modal="false" :append-to-body="true" :visible="show" :show-close="false">
    <div class="mb-4">
      <div class="fs-6 fw-bold text-start">内容信息</div>
      <el-descriptions size="small" border>
        <el-descriptions-item label="电站编号">{{ info.stationNo }}</el-descriptions-item>
        <el-descriptions-item label="电站名称">{{ info.stationName }}</el-descriptions-item>
        <el-descriptions-item label="申请类别">{{ info.restoreType | CodeTransforText(dropdowns.restoreType)
        }}</el-descriptions-item>
        <el-descriptions-item label="申请原因">{{ info.reason }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ info.updateBy }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ info.createTime }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <process-info :params="params" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="execute">执行</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
* @author        全易
* @time          2023-05-31 11:46:09  星期三
* @description   停复运执行
**/
// import api from "@/service/api/process";
import { dropdownsAPI } from "@/service/public.js";
import { CodeTransforText } from 'code-transfor-text_vue'

export default {
  name: '',
  components: {
    "process-info": () => import("./process-info.vue")
  },
  data() {
    return {
      dropdowns: {
        restoreType: []
      },
      info: {},
    }
  },
  filters: {
    CodeTransforText
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      required: true
    }
  },
  watch: {
    show: {
      immediate: true, // 立即处理 进入页面就触发
      handler(now, old) {
        if (now) {
          this.getDetailInfo();
          this.getDropdowns();
        }
      },
    }
  },
  methods: {
    getDropdowns() {
      // 申请类别
      dropdownsAPI("3001").then((res) => {
        if (res.code === 0) {
          this.dropdowns.restoreType = res.data;
        }
      });
    },
    getDetailInfo() {
      api.examineInfo({
        procInstId: this.params.processInstanceId
      }).then((res) => {
        if (res.code === 0) {
          this.info = res.data;
        }
      });
    },
    // 执行
    execute() {
      api.stationComplete({
        status: "1",
        procInstId: this.params.processInstanceId
      }).then((res) => {
        if (res.code === 0) {
          this.close();
          this.$emit("success");
          this.$message.success(res.msg);
        }
      });
    },
    close() {
      this.$emit("close", false);
    }
  }
}
</script>

<style lang="less" scoped></style>