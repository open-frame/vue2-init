<template>
  <el-card shadow="never" class="organization">
    <el-row :gutter="40" class="filters">
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.deptName"
          placeholder="请输入组织名称进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.status"
          placeholder="请选择组织状态进行检索"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-button-group>
      <el-button icon="el-icon-plus">新增</el-button>
      <!-- <el-button icon="el-icon-delete">删除</el-button> -->
    </el-button-group>
    <el-table
      :data="tableData"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="菜单名称"> </el-table-column>
      <el-table-column prop="name" label="显示排序"> </el-table-column>
      <el-table-column prop="name" label="请求地址"> </el-table-column>
      <el-table-column prop="name" label="菜单类型"> </el-table-column>
      <el-table-column prop="name" label="菜单状态"> </el-table-column>
      <el-table-column prop="address" label="权限标识"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="addOrganization(scope.row)"
            >新增</el-button
          >
          <el-button size="mini" @click="editOrganization(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deletOrganization(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :append-to-body="true"
      :modal-append-to-body="false"
      :title="dialogText"
      :visible.sync="dialogVisible"
      :before-close="closeSeeDetail"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSeeDetail">取 消</el-button>
        <el-button type="primary" @click="okSeeDetail">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:35:40  星期一
 * @description   组织管理
 */
import api from "@/service/api";

export default {
  name: "Organization",
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: [
            {
              id: 11,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 12,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 121,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                  id: 122,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 321,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                  id: 322,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄",
                  children: [
                    {
                      id: 3221,
                      date: "2016-05-01",
                      name: "王小虎",
                      address: "上海市普陀区金沙江路 1519 弄",
                    },
                    {
                      id: 3222,
                      date: "2016-05-01",
                      name: "王小虎",
                      address: "上海市普陀区金沙江路 1519 弄",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      form: {
        deptName: "",
        status: "",
      },
      dialogVisible: false,
      dialogText: "编辑",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      api
        .organizations(this.form)
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    // 重置条件查询
    reset() {
      this.form.menuName = "";
      this.form.status = "";
      this.getData();
    },
    // 新增组织
    addOrganization(row) {
      console.log(row);
      this.dialogVisible = true;
      this.dialogText = "新增";
    },
    // 编辑组织
    editOrganization(row) {
      console.log(row);
      this.dialogVisible = true;
      this.dialogText = "编辑";
    },
    // 删除组织
    deletOrganization(row) {
      console.log(row);
      this.$confirm("删除不可恢复，确认删除？")
        .then((_) => {
          console.log("删除！");
        })
        .catch((_) => {});
    },
    // 关闭查看数据详情
    closeSeeDetail(done) {
      this.dialogVisible = false;
    },
    okSeeDetail() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
