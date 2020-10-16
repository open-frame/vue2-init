<template>
  <el-card shadow="never" class="power-stations">
    <el-row :gutter="40" class="filters">
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.stationNo"
          placeholder="请输入编号进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.stationName"
          placeholder="请输入名称进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.leader"
          placeholder="请输入站负责人进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.stationCatagory"
          placeholder="请选择类别进行检索"
        >
          <el-option label="综合站" value="1"></el-option>
          <el-option label="普通站" value="2"></el-option>
          <el-option label="低压站" value="3"></el-option>
          <el-option label="NB站" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.stationStatus"
          placeholder="请选择使用状态进行检索"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="text-align: right">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-button-group>
      <el-button icon="el-icon-plus">新增</el-button>
      <el-button icon="el-icon-edit">修改</el-button>
      <el-button icon="el-icon-delete">删除</el-button>
      <el-button icon="el-icon-link">关联</el-button>
    </el-button-group>
    <el-table :data="tableData" border @selection-change="selectingdata">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="stationNo" label="编号"> </el-table-column>
      <el-table-column prop="stationName" label="名称"> </el-table-column>
      <el-table-column prop="address" label="详细地址"> </el-table-column>
      <el-table-column prop="operationTime" label="运营时间"> </el-table-column>
      <el-table-column prop="leader" label="站负责人"> </el-table-column>
      <el-table-column prop="phone" label="联系方式"> </el-table-column>
      <el-table-column prop="stationCatagoryName" label="类别">
      </el-table-column>
      <el-table-column prop="powerTypeName" label="供电性质"> </el-table-column>
      <el-table-column prop="stationStatusName" label="状态"> </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="primary" size="small"
            >查看</el-button
          >
          <el-button type="danger" size="small" @click="changeStatus"
            >停用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :append-to-body="true"
      :modal-append-to-body="false"
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="closeSeeDetail"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSeeDetail">取 消</el-button>
        <el-button type="primary" @click="okSeeDetail">确 定</el-button>
      </span>
    </el-dialog>
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
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:41:15  星期一
 * @description   电站管理
 */
import api from "@/service/api";

export default {
  name: "power-stations",
  data() {
    return {
      form: {
        stationNo: "",
        stationName: "",
        leader: "",
        stationCatagory: "",
        stationStatus: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "desc",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 条件查询 - 重置
    reset() {
      this.form.stationNo = "";
      this.form.stationName = "";
      this.form.leader = "";
      this.form.stationCatagory = "";
      this.form.stationStatus = "";
      this.getData();
    },
    // 选择数据
    selectingdata(val) {
      console.log(val);
    },
    // 查看数据详情
    detail(detail) {
      console.log(detail);
      this.dialogVisible = true;
    },
    // 改变状态
    changeStatus(data) {
      console.log(data);
    },
    okSeeDetail() {
      this.dialogVisible = false;
    },
    // 关闭查看数据详情
    closeSeeDetail(done) {
      this.dialogVisible = false;
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
    getData() {
      api
        .powerStations(this.form)
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
  },
};
</script>

<style lang="less" scoped>
</style>
