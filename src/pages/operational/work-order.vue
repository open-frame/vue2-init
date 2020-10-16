<template>
  <el-card shadow="never" class="work-order">
    <el-row :gutter="40">
      <el-col :span="4">
        <el-input
          clearable
          placeholder="输入关键字过滤组织树"
          v-model="filterTreeText"
          style="margin-bottom: 20px"
        >
        </el-input>
        <el-tree
          highlight-current
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterTreeNode"
          ref="tree"
          @node-click="treeClick"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="filters">
          <el-input
            clearable
            v-model="form.loginName"
            placeholder="请输入工单号进行检索"
          ></el-input>
          <el-input
            clearable
            v-model="form.phonenumber"
            placeholder="请输入电站名进行检索"
          ></el-input>
          <el-input
            clearable
            v-model="form.phonenumber"
            placeholder="请输入设备进行检索"
          ></el-input>
          <el-select
            clearable
            v-model="form.status"
            placeholder="请选择工单状态进行检索"
          >
            <el-option label="提交" value="1"></el-option>
            <el-option label="处理中" value="2"></el-option>
            <el-option label="运营关闭" value="3"></el-option>
            <el-option label="处理关闭" value="4"></el-option>
          </el-select>
          <el-button @click="getData" type="primary">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
        <el-button-group>
          <el-button icon="el-icon-plus">新增</el-button>
          <el-button icon="el-icon-edit">修改</el-button>
          <el-button icon="el-icon-delete">删除</el-button>
          <el-button icon="el-icon-finished">提交</el-button>
        </el-button-group>
        <el-table :data="tableData" border @selection-change="selectingdata">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="userId" label="工单号"> </el-table-column>
          <el-table-column prop="loginName" label="电站名"> </el-table-column>
          <el-table-column prop="userName" label="设备"> </el-table-column>
          <el-table-column prop="deptName" label="端口"> </el-table-column>
          <el-table-column prop="phonenumber" label="提交人"> </el-table-column>
          <el-table-column prop="status" label="角色"> </el-table-column>
          <el-table-column prop="status" label="提单时间"> </el-table-column>
          <el-table-column prop="status" label="提单描述"> </el-table-column>
          <el-table-column prop="status" label="处理人"> </el-table-column>
          <el-table-column prop="createTime" label="处理时间">
          </el-table-column>
          <el-table-column prop="status" label="处理描述"> </el-table-column>
          <el-table-column prop="status" label="工单状态"> </el-table-column>
          <el-table-column prop="status" label="处理时长"> </el-table-column>
          <el-table-column prop="status" label="超时状态"> </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button type="primary" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="dataSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:37:55  星期一
 * @description   工单管理
 */
import api from "@/service/api";

export default {
  name: "work-order",
  data() {
    return {
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      treeProps: {
        children: "children",
        label: "label",
      },
      filterTreeText: "",
      form: {
        deptCode: 3,
        workOrderId: "",
        stationName: "",
        stakeName: "",
        workOrderStatus: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "desc",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
    };
  },
  created() {
    this.getData();
  },
  watch: {
    filterTreeText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 过滤树节点
    filterTreeNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 点击树节点
    treeClick(data) {
      console.log(data);
    },
    // 组织树数据
    organizationTree() {
      api
        .organizationTree({
          deptName: "",
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    //数据
    getData() {
      api
        .workList(this.form)
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.total = res.total;
            this.tableData = res.rows;
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    reset() {
      // this.form.
    },
    // 选择数据
    selectingdata(val) {
      console.log(val);
    },
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.pageNum = val;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.work-order {
  .filters {
    display: flex;
    margin-bottom: 20px;
    .el-input,
    .el-select {
      margin-right: 25px;
    }
  }
}
</style>
