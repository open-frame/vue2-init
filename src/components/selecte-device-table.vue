<template>
  <div v-show="show">
    <el-row :gutter="15"  class="filters">
      <el-form
        inline
        :model="queryForm"
        ref="fiterDevice"
        :rules="fiterDeviceRules"
      >
        <el-col :span="4">
          <el-form-item prop="typeCode">
            <clw-select
              filterable
              default-first-option
              clearable
              size="small"
              v-model="queryForm.typeCode"
              placeholder="设备类型"
              @change="getData"
            >
              <el-option
                v-for="(item, index) in dropdowns.typeCode"
                :key="index"
                :label="item.code_name"
                :value="item.code_value"
              ></el-option>
            </clw-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="whNo">
            <warehouse-select
              animatLable
              size="small"
              v-model="queryForm.whNo"
              @input="getData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="merchantNo">
            <supplier-select
              animatLable
              size="small"
              v-model="queryForm.merchantNo"
              @input="getData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="stakeName">
            <clw-input
              clearable
              size="small"
              v-model="queryForm.stakeName"
              placeholder="设备名称"
              @change="pageReset"
              @keyup.enter.native="getData"
            ></clw-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="stakeNo">
            <clw-input
              clearable
              size="small"
              v-model="queryForm.stakeNo"
              placeholder="设备编号"
              @change="pageReset"
              @keyup.enter.native="getData"
            ></clw-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="text-end">
          <el-form-item>
            <el-button size="small" @click="getData">查设备</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="flex flex-justify-center">
      <el-transfer
        class="transfer"
        v-if="queryForm.whNo && queryForm.typeCode"
        filterable
        :props="{
          key: 'stakeNo',
          label: 'stakeName',
        }"
        :filter-method="filterMethod"
        :titles="['库房', '出库栏']"
        :button-texts="['撤回', '出库']"
        filter-placeholder="请输入设备编号"
        v-model="outData"
        :data="allData"
        @change="change"
      >
      </el-transfer>
    </div>
  </div>
</template>

<script>
/**
 * @author        疏亮坤
 * @time          2022-09-26 14:12:45  星期一
 * @description   出库操作
 **/
import {insertWarehouseDetail} from "@/pages/property/api.js";
import {dropdownsAPI} from "@/service/public.js";
import {
  pageReset
} from "@/mixins/index.js";

export default {
  name: "selecte-device-table",
  mixins:[pageReset],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fiterDeviceRules,
      queryForm: {
        whNo: "",
        merchantNo: "",
        typeCode: "",
        modelCode: "",
        stakeNo: "",
        stakeName: "",
        pageSize: 999999999,
        pageNum: 1,
      },
      filterMethod(query, item) {
        return item.stakeNo.indexOf(query) > -1;
      },
      dropdowns: {
        typeCode: [],
        modelCode: [],
        whNo: [],
        merchantNo: [],
        organizations: [],
        ioWhReasonCode: [],
      },
      allData: [],
      outData: [],
    };
  },
  watch: {
    show: {
      immediate: true, // 立即处理 进入页面就触发
      handler(now) {
        console.log(now);
        if (now) {
          this.getDropdowns();
        }
      },
    },
  },
  methods: {
    getData() {
      this.$refs["fiterDevice"].validate((valid) => {
        if (valid) {
          insertWarehouseDetail(this.queryForm).then((res) => {
            if (res.code === 0) {
              this.allData = res.rows;
            }
          });
        }
      });
    },
    getDropdowns() {
      // 设备类型
      dropdownsAPI("3004").then((res) => {
        if(res.code===0){
         this.dropdowns.typeCode = res.data;
        }
       
      });
      // 出库类型
      dropdownsAPI("45257").then((res) => {
        if(res.code===0){
         this.dropdowns.ioWhReasonCode = res.data;
        }
       
      });
    },
    change(all, direction, now) {
      console.log(all, direction, now);
      this.$emit("change", all, this.queryForm);
    },
    resetFields() {
      this.$refs["fiterDevice"].resetFields();
    },
  },
};
const fiterDeviceRules = {
  whNo: [{ required: true, message: "请选择库房", trigger: "change" }],
  typeCode: [{ required: true, message: "请选择设备类型", trigger: "change" }],
};
</script>

<style lang="less" scoped>
/deep/.transfer {
  .el-transfer-panel {
    width: 220px;
  }
}
</style>