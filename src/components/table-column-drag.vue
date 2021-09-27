<template>
  <div
    class="drag-table"
    ref="DragTable"
    :class="{ 'table-moving': dragState.dragging }"
  >
    <el-table
      ref="table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      highlight-current-row
      size="mini"
      :data="data"
      :row-key="tableKey"
      tooltip-effect="dark"
      border
      max-height="623"
      @selection-change="selectData"
      @cell-click="cellClick"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
    >
      <el-table-column
        v-if="showSelect"
        type="selection"
        :reserve-selection="true"
        width="55"
        fixed="left"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="(col, index) in tableHeader"
        :key="index"
        :type="col.type"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :header-align="col.headerAlign"
        :column-key="index.toString()"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <slot name="table-body" :data="scope"></slot>
        </template>
      </el-table-column>
      <slot name="table-handle"></slot>
    </el-table>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-04-16 12:39:56  星期五
 * @description   拖动表格列的顺序
 */

export default {
  name: "TableColumnDrag",
  data() {
    return {
      tableHeader: [],
      dragState: {
        start: -9, // 起始元素的 index
        end: -9, // 移动鼠标时所覆盖的元素 index
        dragging: false, // 是否正在拖动
        direction: undefined, // 拖动方向
      },
    };
  },
  created() {
    this.tableHeader =
      JSON.parse(localStorage.getItem(this.headId)) || this.header;
  },
  watch: {
    header(val, oldVal) {
      this.tableHeader = val;
    },
  },
  props: {
    headId: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: true,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    tableKey: {
      type: [String, Number],
      default: "",
    },
    data: {
      default: function () {
        return [];
      },
      type: Array,
    },
    header: {
      default: function () {
        return [];
      },
      type: Array,
    },
  },
  methods: {
    renderHeader(createElement, { column }) {
      return createElement(
        "div",
        {
          class: ["thead-cell"],
          on: {
            mousedown: ($event) => {
              this.handleMouseDown($event, column);
            },
            mousemove: ($event) => {
              this.handleMouseMove($event, column);
            },
          },
        },
        [
          // 用于表头 label
          createElement("span", column.label),
          // 用于显示拖动动画
          createElement("span", {
            class: ["virtual"],
          }),
        ]
      );
    },
    // 开始拖动
    handleMouseDown(e, column) {
      this.dragState.dragging = true;
      this.dragState.start = parseInt(column.columnKey);
      // 给拖动时的虚拟容器添加宽高
      let table = this.$refs.DragTable;
      let virtual = document.getElementsByClassName("virtual");
      for (let item of virtual) {
        item.style.height = table.clientHeight - 1 + "px";
        item.style.width = item.parentElement.parentElement.clientWidth + "px";
      }
      document.addEventListener("mouseup", this.handleMouseUp);
      console.log("1111111111");
    },
    // 拖动中
    handleMouseMove(e, column) {
      if (this.dragState.dragging) {
        let index = parseInt(column.columnKey); // 记录起始列
        if (index - this.dragState.start !== 0) {
          this.dragState.direction =
            index - this.dragState.start < 0 ? "left" : "right"; // 判断拖动方向
          this.dragState.end = parseInt(column.columnKey);
        } else {
          this.dragState.direction = undefined;
        }
      } else {
        return false;
      }
      console.log("222222222222");
    },
    // 处理易位
    dragColumn({ start, end, direction }) {
      let tempData = [];
      let left = direction === "left";
      let min = left ? end : start - 1;
      let max = left ? start + 1 : end;
      for (let i = 0; i < this.tableHeader.length; i++) {
        if (i === end) {
          tempData.push(this.tableHeader[start]);
        } else if (i > min && i < max) {
          tempData.push(this.tableHeader[left ? i - 1 : i + 1]);
        } else {
          tempData.push(this.tableHeader[i]);
        }
      }
      this.tableHeader = tempData;
      console.log("333333333333易位结果：", this.tableHeader);
    },
    // 结束拖动
    handleMouseUp() {
      this.dragColumn(this.dragState);

      // 回归初始化拖动状态
      this.dragState = {
        start: -9,
        end: -9,
        dragging: false,
        direction: undefined,
      };
      console.log("4444444444");
      this.resetTable();
      localStorage.setItem(this.headId, JSON.stringify(this.tableHeader));
    },
    headerCellClassName({ column, columnIndex }) {
      let active =
        columnIndex === this.dragState.end
          ? `darg_active_${this.dragState.direction}`
          : "";
      let start = columnIndex === this.dragState.start ? "darg_start" : "";
      return `${active} ${start}`;
    },
    cellClassName({ column, columnIndex }) {
      return columnIndex === this.dragState.start ? "darg_start" : "";
    },
    // 选择数据
    selectData(val) {
      // console.log(val);
      this.$emit("selectData", val);
    },
    // 重新渲染表格
    resetTable() {
      this.$refs.table.doLayout();
    },
    // 点击单元格
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
  },
};
</script>

<style lang="less" scoped>
.drag-table {
  /deep/.el-table {
    .darg_start {
      background-color: #f3f3f3;
    }
    .darg_active_left {
      .virtual {
        border-left: 2px dotted #666;
        z-index: 99;
      }
    }
    .darg_active_right {
      .virtual {
        border-right: 2px dotted #666;
        z-index: 99;
      }
    }
    .virtual {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      background: none;
      border: none;
    }
    .thead-cell {
      cursor: grab;
    }
  }
}
.table-moving {
  /deep/.el-table {
    .thead-cell {
      cursor: e-resize !important;
    }
    .el-table__fixed {
      cursor: not-allowed;
    }
  }
}
</style>