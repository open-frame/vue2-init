<template>
  <el-card shadow="never" class="equipment">
    <el-row :gutter="40" class="filters">
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.stakeNo"
          placeholder="设备编号进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.stakeName"
          placeholder="请输入设备名称进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.stakeCatagory"
          placeholder="请选择设备类型进行检索"
        >
          <el-option label="智能插座" value="1"></el-option>
          <el-option label="充电桩" value="2"></el-option>
          <el-option label="USB插座" value="3"></el-option>
          <el-option label="NB插座" value="4"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.equipModelUuid"
          placeholder="请选择设备型号进行检索"
        >
          <el-option label="MLC-100" value="1"></el-option>
          <el-option label="MLC-200" value="2"></el-option>
          <el-option label="MLC-300" value="3"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.stakeStatus"
          placeholder="请选择设备状态进行检索"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
          <el-option label="故障" value="3"></el-option>
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
      <el-button icon="el-icon-download">资产模板下载</el-button>
      <el-button icon="el-icon-document-checked">资产模板导入</el-button>
    </el-button-group>
    <el-table :data="tableData" border @selection-change="selectingdata">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="stationName" label="所属站"> </el-table-column>
      <el-table-column prop="stakeNo" label="设备编号"> </el-table-column>
      <el-table-column prop="stakeName" label="设备名称"> </el-table-column>
      <el-table-column prop="stakeCatagoryName" label="设备类型">
      </el-table-column>
      <el-table-column prop="msgDetail" label="设备型号"> </el-table-column>
      <el-table-column prop="ratedVolt" label="额定电流(A)"> </el-table-column>
      <el-table-column prop="power" label="额定电压(V)"> </el-table-column>
      <el-table-column prop="powerTypeName" label="额定功率(W)">
      </el-table-column>
      <el-table-column prop="stakeStatusName" label="状态"> </el-table-column>
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
 * @description   设备管理
 */
import api from "@/service/api";

export default {
  name: "Equipment",
  data() {
    return {
      form: {
        stakeNo: "",
        stakeName: "",
        stakeCatagory: "",
        equipModelUuid: "",
        stakeStatus: "",
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
      this.form.stakeNo = "";
      this.form.stakeName = "";
      this.form.stakeCatagory = "";
      this.form.equipModelUuid = "";
      this.form.stakeStatus = "";
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
        .equipmentList(this.form)
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
