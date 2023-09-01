<template>
  <el-dialog title="停复运审批" :close-on-click-modal="false" :append-to-body="true" :visible="show" :before-close="close">
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
    <process-info ref="process-info" :params="params" />
    <el-form v-if="$listeners.success" class="mt-5" :model="form" :rules="rules" ref="ruleForm" label-width="90px">
      <el-form-item label="审批结果" prop="status">
        <el-select filterable default-first-option clearable v-model="form.status" placeholder="">
          <el-option v-for="(item, index) in dropdowns.status" :key="index" :label="item.code_name"
            :value="item.code_value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批意见" prop="comments">
        <el-input clearable v-model="form.comments" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <template v-if="$listeners.success">
        <el-button v-if="!params.assignee" plain type="primary" @click="entrust">委托办理</el-button>
        <el-button type="primary" @click="examine">审批</el-button>
      </template>
      <el-button @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
* @author        全易
* @time          2023-05-31 11:46:09  星期三
* @description   停复运审批
**/
// import api from "@/service/api/process";
import myAPI from "@/service/api/my";
import { dropdownsAPI } from "@/service/public.js";
import { CodeTransforText } from 'code-transfor-text_vue'

export default {
  name: '',
  components: {
    "process-info": () => import("./process-info.vue"),
  },
  filters: {
    CodeTransforText
  },
  data() {
    return {
      dropdowns: {
        status: [],
        restoreType: []
      },
      info: {},
      rules,
      form: {
        status: "",
        comments: ""
      },
    }
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
      // 审核结果
      dropdownsAPI("426807").then((res) => {
        if (res.code === 0) {
          this.dropdowns.status = res.data;
        }
      });
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
    // 委托办理
    entrust() {
      const h = this.$createElement;
      let transactor = ""; //办理人
      this.$msgbox({
        title: '选择委托办理人',
        message: h("div", { key: (new Date()) + "" }, [
          h("client-select", {
            attrs: {
              key: this.params.taskId
            },
            on: {
              change: (e) => {
                transactor = e;
              }
            }
          })
        ]),
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if (!transactor) {
              this.$message.error("请选择委托办理人");
              return;
            }
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            myAPI.taskEntrust({
              assignee: transactor,
              taskId: this.params.taskId
            }).then((res) => {
              if (res.code === 0) {
                done();
                this.close();
                this.$emit("success");
                this.$message.success(res.msg);
              }
            }).finally(() => {
              instance.confirmButtonLoading = false;
            })
          } else {
            done();
          }
        }
      })
    },
    // 审批
    examine() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          api.stationComplete({
            ...this.form,
            procInstId: this.params.processInstanceId
          }).then((res) => {
            if (res.code === 0) {
              this.close();
              this.$emit("success");
              this.$message.success(res.msg);
            }
          });
        }
      });
    },
    close() {
      try {
        this.$refs["ruleForm"].resetFields();
      } catch (err) { }
      this.$emit("close", false);
    }
  }
}

const rules = {
  status: [{ required: true, message: "请选择审批结果", trigger: "change" }],
  comments: [{ required: true, message: "请输入审批意见", trigger: "blur" },
  {
    pattern: /^[^<|>|-|*|/|=|{|}]*$/,
    message: "禁止< > - * / = { }等特殊字符",
    trigger: "blur",
  },
  ],
}
</script>

<style lang="less" scoped></style>