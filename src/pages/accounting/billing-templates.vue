<template>
  <el-card shadow="never" class="billing-templates">
    <el-row :gutter="30" class="filters">
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.modelId"
          placeholder="请输入模型编号进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.modelName"
          placeholder="请输入计费模型名称进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.runStatus"
          placeholder="请选择使用状态进行检索"
        >
          <el-option label="待提交" value="1"></el-option>
          <el-option label="待审核" value="2"></el-option>
          <el-option label="已审核" value="3"></el-option>
          <el-option label="生效" value="4"></el-option>
          <el-option label="失效" value="5"></el-option>
          <el-option label="已删除" value="6"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.chargeType"
          placeholder="请选择使用收费类型进行检索"
        >
          <el-option label="按时长" value="1"></el-option>
          <el-option label="按电量" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.powerNature"
          placeholder="请选择供电性质进行检索"
        >
          <el-option label="民用" value="1"></el-option>
          <el-option label="商用" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.porType"
          placeholder="请选择供电端口类型进行检索"
        >
          <el-option label="USB" value="1"></el-option>
          <el-option label="五孔" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.provinceCode"
          placeholder="请选择地址:省检索"
          @change="selectAddress"
        >
          <el-option
            v-for="(item, index) in dropdownsData.province"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.cityCode"
          placeholder="请选择地址:市检索"
        >
          <template v-if="dropdownsData.province.city > 0">
            <el-option
              v-for="(item, index) in dropdownsData.city"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </template>
          <el-option v-else label="请先选择省级地址" value="select"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.districtCode"
          placeholder="请选择地址:区/县检索"
        >
          <template v-if="dropdownsData.province.county > 0">
            <el-option
              v-for="(item, index) in dropdownsData.county"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </template>
          <el-option
            v-else
            label="请先选择省、市级地址"
            value="select"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-button-group>
      <el-button icon="el-icon-plus">新增</el-button>
      <el-button icon="el-icon-edit">修改</el-button>
      <el-button icon="el-icon-delete">删除</el-button>
      <el-button icon="el-icon-finished">提交</el-button>
      <el-button icon="el-icon-close">驳回</el-button>
      <el-button icon="el-icon-thumb">通过</el-button>
    </el-button-group>
    <el-table
      size="small"
      :data="tableData"
      border
      @selection-change="selectingdata"
    >
      <el-table-column
        type="selection"
        width="55"
        header-align="center"
        fixed="left"
      >
      </el-table-column>
      <el-table-column label="基础信息" header-align="center">
        <el-table-column
          prop="loginName"
          label="模型编号"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="chineseName"
          label="模型名称"
          header-align="center"
        >
        </el-table-column>
        <el-table-column prop="userName" label="收费类型" header-align="center">
        </el-table-column>
        <el-table-column
          prop="phonenumber"
          label="供电性质"
          header-align="center"
        >
        </el-table-column>
        <el-table-column prop="email" label="适用区域" header-align="center">
        </el-table-column>
        <el-table-column prop="balance" label="端口类型" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="时段" header-align="center">
        <el-table-column prop="integral" label="尖" header-align="center">
        </el-table-column>
        <el-table-column prop="integral" label="峰" header-align="center">
        </el-table-column>
        <el-table-column prop="integral" label="平" header-align="center">
        </el-table-column>
        <el-table-column prop="integral" label="谷" header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="电压" header-align="center">
        <el-table-column
          prop="runStatus"
          label="500W以下"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="500W-1000W"
          header-align="center"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="1001W-2000W"
          header-align="center"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="2001W以上"
          header-align="center"
          min-width="120"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column prop="runStatus" label="服务费" header-align="center">
      </el-table-column>
      <el-table-column prop="runStatus" label="自动计算" header-align="center">
      </el-table-column>
      <el-table-column label="有效期" header-align="center">
        <el-table-column
          prop="runStatus"
          label="生效日期"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="runStatus"
          label="失效日期"
          header-align="center"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column prop="runStatus" label="状态" header-align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="170"
        header-align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="small" @click="detail(scope.row)">历史</el-button>
          <el-button size="small" @click="changeStatus">端口</el-button>
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
 * @time          2020-10-05 16:38:58  星期一
 * @description   计费模型
 */
import api from "@/service/api";

export default {
  name: "billing-templates",
  data() {
    return {
      form: {
        modelId: "",
        modelName: "",
        runStatus: "",
        porType: "",
        provinceCode: "",
        cityCode: "",
        districtCode: "",
        chargeType: "",
        powerNature: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "desc",
      },
      dropdownsData: {
        province: [],
        city: [],
        county: [],
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
    };
  },
  created() {
    this.getData();
    this.addressData({
      code: "",
      level: 1,
    });
  },
  methods: {
    // 重置条件查询
    reset() {
      this.form.modelId = "";
      this.form.modelName = "";
      this.form.porType = "";
      this.form.chargeType = "";
      this.form.powerNature = "";
      this.form.runStatus = "";
      this.form.provinceCode = "";
      this.form.cityCode = "";
      this.form.districtCode = "";
      this.getData();
    },
    // 数据
    getData() {
      api
        .billingModels(this.form)
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
    // 地址数据
    addressData(params) {
      api
        .addressData(params)
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    // 选择地址
    selectAddress(value) {
      console.log(value);
      this.addressData({
        code: "",
        level: 1,
      });
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
  },
};
</script>

<style lang="less" scoped>
.billing-templates {
  .el-row {
    .el-col:nth-child(n + 7) {
      margin-top: 20px;
    }
  }
}
</style>
