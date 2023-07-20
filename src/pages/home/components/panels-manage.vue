<template>
  <el-dialog :close-on-click-modal="false" class="module-management" title="模块管理" width="500px" append-to-body
    :visible="show" :before-close="close">
    <el-form :model="editPanelForm">
      <el-form-item>
        <el-select multiple filterable default-first-option v-model="selecteComponent" placeholder="请选择组件"
          @change="selectComponent">
          <el-option v-for="(cmp, index) in allComponent" v-permission="cmp.permission" :key="index" :label="cmp.name"
            :value="cmp.component" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
      <el-button type="primary" @click="okLayout">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
* @author        全易
* @time          2023-06-19 13:17:54  星期一
* @description   模块管理
**/
import allComponent from "@/assets/json/home_modules.json";
import api from "@/service/api/home";
import { permission } from '@/directives/index.js'

export default {
  name: '',
   directives: {
    permission
  },
  data() {
    return {
      allComponent, // 首页全部组件
      selecteComponent: [],
      editPanelForm: {
        components: [], //已选中的
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    myCards: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    show(now, old) {
      // console.log(now);
      if (now) {
        this.selecteComponent = this.myCards.map((item) => {
          return item.component;
        });
      }
    }
  },
  methods: {
    // 选择功能面板
    selectComponent(component) {
      console.log(component);
      let params = [];
      for (let i = 0, len = this.allComponent.length; i < len; i++) {
        for (let l = 0, leng = component.length; l < leng; l++) {
          if (this.allComponent[i].component === component[l]) {
            params.push(this.allComponent[i]);
          }
        }
      }
      this.editPanelForm.components = params;
    },
    // 确定调整布局
    okLayout() {
      api
        .editHomeLayout({
          homeJson: JSON.stringify(this.editPanelForm.components),
        })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("调整成功");
            this.$emit("success", this.editPanelForm.components);
            this.close();
          }
        });
    },
    // 关闭添加展示面板
    close() {
      this.$emit("close", false);
    },
  }
}
</script>

<style lang="less" scoped></style>