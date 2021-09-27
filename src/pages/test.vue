<template>
  <el-card class="test">
    <el-button type="primary" @click="test">测试</el-button>
    <el-button @click="openAmap">地图</el-button>
    <el-button @click="change">添加列</el-button>
    <el-table :data="tableData" class="tb-edit" style="width: 100%">
      <el-table-column
        v-for="(item, index) in tableHead"
        :label="item.label"
        :property="item.property"
        :key="index"
        width="180"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row[scope.column.property]"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Amap :show="showAmap" @ok="ok" @close="close" />
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-13 13:52:05  星期二
 * @description   测试页面
 */


export default {
  name: "Page-Test",
  data() {
    return {
      showAmap: false,
      tableHead: [
        {
          label: "姓名",
          property: "name",
        },
        {
          label: "地址",
          property: "address",
        },
      ],
      // 数据值
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎6666",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎45",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎333",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎222",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    test() {
      api.test().then((res) => {
        console.log(res);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    change() {
      this.tableHead.push({
        label: "日期",
        property: "date",
      });
    },
    openAmap() {
      this.showAmap = true;
    },
    ok(data) {
      console.log(data);
    },
    close(status) {
      this.showAmap = status;
    },
  },
};
</script>

<style lang="less" scoped></style>
