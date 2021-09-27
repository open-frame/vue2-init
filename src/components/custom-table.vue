<template>
  <div class="custom-table">
    <div class="table-handle">
      <el-button-group class="functions">
        <slot name="function"></slot>
        <el-dropdown v-if="showExport" trigger="click" @command="exporting">
          <el-button size="small">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">导出本页</el-dropdown-item>
            <el-dropdown-item command="2">导出全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <div class="table-config">
        <slot name="config"></slot>
        <el-popover trigger="manual" v-model="config.show" width="160">
          <TableColumnIncDec
            :dataId="dataId"
            :now="config.nowColumn"
            :all="config.allColumn"
            @ok="okConfigTable"
          />
          <el-button
            slot="reference"
            size="small"
            icon="el-icon-setting"
            title="表格配置"
            @click="config.show = !config.show"
          ></el-button>
        </el-popover>
      </div>
    </div>
    <TableColumnDrag
      ref="table"
      :loading="loading"
      :headId="headId"
      :data="data"
      :tableKey="tableKey"
      :header="config.nowColumn"
      :showSelect="showSelect"
      @selectData="selectData"
      @cell-click="cellClick"
    >
      <template v-slot:table-body="{ data }">
        <slot name="body" :data="data"></slot>
      </template>
      <template v-slot:table-handle>
        <slot name="handle"></slot>
      </template>
    </TableColumnDrag>
    <el-pagination
      @size-change="dataSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[15, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-04-15 14:23:16  星期四
 * @description   复合表格
 */

export default {
  name: "CustomTable",
  data() {
    return {};
  },
  props: {
    headId: {
      type: String,
      default: "",
    },
    dataId: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: [],
    },
    tableKey: {
      type: [String, Number],
      default: "",
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    config: {
      type: Object,
      default: {},
    },
    showExport: {
      type: Boolean,
      default: true,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("dataSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("handleCurrent", val);
    },
    // 选择数据
    selectData(val) {
      // console.log(val);
      this.$emit("selectData", val);
    },
    // 点击单元格
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    // 确定配置表格列
    okConfigTable(data) {
      // console.log(data);
      this.config.nowColumn = data;
      this.$refs.table.resetTable();
    },
    // 导出
    exporting(command) {
      this.$emit("exporting", command);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
