<template>
  <div class="table-column-config">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="isCheckAll"
      @change="selectAll"
      >全选</el-checkbox
    >
    <hr />
    <el-checkbox-group v-model="defaulte" :min="2" @change="selecting">
      <el-checkbox v-for="column in whole" :label="column" :key="column">
        {{ column }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-04-15 09:50:12  星期四
 * @description   配置表格列的增减
 */

export default {
  name: "TableColumnIncDec",
  data() {
    return {
      isIndeterminate: true,
      isCheckAll: false,
      original: [],
      defaulte: [],
      whole: [],
    };
  },
  props: {
    dataId: {
      type: String,
      default: "",
    },
    now: {
      type: Array,
      default: [],
    },
    all: {
      type: Array,
      default: [],
    },
  },
  watch: {
    all: {
      handler(now) {
        // console.log(now);
        this.original = now;
        this.whole = now.map((item) => {
          return item.label;
        });
      },
      immediate: true,
    },
    now: {
      handler(now) {
        // console.log(now);
        this.defaulte = now.map((item) => {
          return item.label;
        });
      },
      immediate: true,
    },
  },
  methods: {
    // 全选
    selectAll(val) {
      console.log(val);
      val ? (this.defaulte = this.whole) : (this.defaulte.length = 2);
      this.isIndeterminate = false;

      this.configTable();
    },
    // 单选
    selecting(value) {
      // console.log(value);
      this.defaulte = value;
      this.isCheckAll = value.length === this.whole.length;
      this.isIndeterminate =
        value.length > 0 && value.length < this.whole.length;

      this.configTable();
    },
    // 配置表格
    configTable() {
      console.log(this.original, this.defaulte);
      let result = this.defaulte.map((item) => {
        let now;
        for (let i = 0, length = this.original.length; i < length; i++) {
          if (item === this.original[i].label) {
            now = {
              label: this.original[i].label,
              prop: this.original[i].prop,
            };
          }
        }
        // console.log(now);
        return now;
      });
      console.log(result);
      console.log(this.dataId);
      localStorage.setItem(this.dataId, JSON.stringify(result));
      this.$emit("ok", result);
    },
  },
};
</script>

<style lang="less" scoped>
.el-checkbox-group {
  display: grid;
  .el-checkbox {
    margin-right: 0;
  }
}
</style>
