<template>
  <div class="">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <el-button-group>
          <slot name="left"></slot>
        </el-button-group>
        <el-dropdown v-if="$listeners.exporting" trigger="click" @command="exporting">
          <el-button :size="size">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">导出本页</el-dropdown-item>
            <el-dropdown-item command="2">导出全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-if="$listeners.printing" trigger="click" @command="printing">
          <el-button :size="size">
            打印<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">打印本页</el-dropdown-item>
            <el-dropdown-item command="2">打印全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="">
        <slot name="right"></slot>
      </div>
    </div>
    <el-table ref="tableidaM" :size="size" :data="data" :[olyHeight]="height || maxHeight || '400'" :border="border"
      :row-key="rowKey" :empty-text="emptyText" v-loading="loading" :show-summary="showSummary"
      :summary-method="summaryMethod" tooltip-effect="dark" highlight-current-row @row-click="rowClick" @select="select"
      @select-all="selectAll" @selection-change="selectionChange" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column v-if="showSelection" :reserve-selection="reserveSelection" type="selection" width="55" fixed="left"
        :selectable="selecteisDisabled">
      </el-table-column>
      <el-table-column v-if="showIndex" label="序号" width="50">
        <template slot-scope="scope">
          {{ pageSize * (pageNum - 1) + (scope.$index + 1) }}
        </template>
      </el-table-column>
      <slot name="columns"></slot>
    </el-table>
    <el-pagination class="text-end mt-3" v-if="$listeners['current-change']" @size-change="dataSizeChange"
      @current-change="handleCurrentChange" :page-sizes="[$tableDataSize, 20, 30, 50]" :page-size="pageSize"
      :disabled="loading" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-12-28 13:26:08  星期二
 * @description   自定义的表格，使用方式同elementUI。属性、方法、事件参考elementUI文档
 **/

export default {
  name: "eida-table",
  data() {
    return {};
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "small",
    },
    emptyText: {
      type: String,
    },
    border: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: [String, Number],
      default: "",
    },
    height: {
      type: [String, Number],
      default: "",
    },
    maxHeight: {
      type: [String, Number],
      default: "",
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default() {
        return this.$tableDataSize;
      },
    },
    currentPage: {
      type: Number,
      default() {
        return this.pageNum;
      },
    },
    // 显示序号列
    showIndex: {
      type: Boolean,
      default: false,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    summaryMethod: {
      type: Function
    },
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    // 返回值用来决定这一行的 CheckBox 是否可以勾选
    selecteisDisabled: {
      type: Function
    },
  },
  watch: {
    data(now, old) {
      const that = this;
      this.$nextTick(() => {
        that.$refs.tableidaM.doLayout(); // 为了解决行错位问题
      });
    },
  },
  computed: {
    showSelection() {
      return this.$listeners["select"] || this.$listeners["selection-change"];
    },
    olyHeight() {
      // 因为elementUI不能 height 和 max-height 同时存在，所以采用动态属性
      // console.log("height：", this.height, "maxHeight：", this.maxHeight);
      if (this.height) {
        return "height";
      } else if (this.maxHeight) {
        return "max-height";
      } else {
        return "max-height";
      }
    },
  },
  methods: {
    // 页量
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("size-change", val);
    },
    // 翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("current-change", val);
    },
    // 选择数据
    select(selection, row) {
      // console.log(election, row);
      this.$emit("select", selection, row);
    },
    // 选择数据
    selectionChange(selection) {
      // console.log(selection);
      this.$emit("selection-change", selection);
    },
    // 全选数据
    selectAll(selection) {
      console.log(selection);
      this.$emit("select-all", selection);
    },
    // 清空选择
    clearSelection() {
      this.$refs.tableidaM.clearSelection();
    },
    // 全选
    toggleAllSelection() {
      this.$refs.tableidaM.toggleAllSelection();
    },
    // 选择数据
    toggleRowSelection(row = [], selected = true) {
      this.$refs.tableidaM.toggleRowSelection(row, selected);
    },
    // 单选数据
    setCurrentRow(row) {
      this.$refs.tableidaM.setCurrentRow(row);
    },
    // 点击行
    rowClick(row, column, event) {
      // console.log(row, column, event);
      this.$emit("row-click", row);
    },
    // 导出表格
    exporting(command) {
      this.$emit("exporting", command);
    },
    // 打印表格数据
    printing(command) {
      this.$emit("printing", command);
    },
    // 重载表格
    doLayout() {
      this.$refs.tableidaM.doLayout();
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-table {
  th.el-table__cell {
    background-color: #f8f7f7;
  }
}
</style>