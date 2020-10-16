<template>
  <el-card shadow="never" class="order-manage">
    <el-row :gutter="30">
      <el-col :span="4" class="order-totals">
        <h3 style="margin-bottom: 40px">数据总览</h3>
        <div class="list">
          <div class="title">用户数量：</div>
          <div class="number">{{ orderTotals.userIdNum }}位</div>
        </div>
        <div class="list">
          <div class="title">订单数量：</div>
          <div class="number">{{ orderTotals.billStatusOneNum }}笔</div>
        </div>
        <div class="list">
          <div class="title">订单总金额：</div>
          <div class="number">{{ orderTotals.amountNum }}元</div>
        </div>
        <div class="list">
          <div class="title">电站数量：</div>
          <div class="number">{{ orderTotals.stationIdNum }}个</div>
        </div>
        <div class="list">
          <div class="title">设备数量：</div>
          <div class="number">{{ orderTotals.stakeNoNum }}个</div>
        </div>
        <div class="list">
          <div class="title">端口数量：</div>
          <div class="number">{{ orderTotals.chargePortNum }}个</div>
        </div>
        <div class="list">
          <div class="title">总用电时长：</div>
          <div class="number">{{ orderTotals.durationNum }}小时</div>
        </div>
        <div class="list">
          <div class="title">总电量：</div>
          <div class="number">{{ orderTotals.totalElectricNum }}度</div>
        </div>
        <el-collapse style="margin-top: 30px">
          <el-collapse-item title="状态汇总" name="1">
            <div class="list">
              <div class="title">供电中：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">已结束：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">异常：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="停电原因" name="2">
            <div class="list">
              <div class="title">手动停电：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">到时即停：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">充满即停：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">其他：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="发票状态" name="3">
            <div class="list">
              <div class="title">未开票：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">已开票：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="清分状态" name="4">
            <div class="list">
              <div class="title">未清分：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">已清分：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="结算状态" name="5">
            <div class="list">
              <div class="title">未结算：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
            <div class="list">
              <div class="title">已结算：</div>
              <div class="number">{{ orderTotals.totalElectricNum }}单</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="15" class="filters">
          <el-col :span="4">
            <el-input
              clearable
              v-model="form.userName"
              placeholder="请输入用户进行检索"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              clearable
              v-model="form.orderId"
              placeholder="请输入订单编号进行检索"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              clearable
              v-model="form.stationName"
              placeholder="请输入电站名称进行检索"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              clearable
              v-model="form.stopElecReason"
              placeholder="请输入停电原因进行检索"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              clearable
              v-model="form.orderStatus"
              placeholder="请选择订单状态进行检索"
            >
              <el-option label="开始" value="1"></el-option>
              <el-option label="供电中" value="2"></el-option>
              <el-option label="结束" value="2"></el-option>
              <el-option label="异常" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              clearable
              v-model="form.billStatus"
              placeholder="请选择发票状态进行检索"
            >
              <el-option label="已开票" value="1"></el-option>
              <el-option label="未开票" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              clearable
              v-model="form.clearStatus"
              placeholder="请选择清分状态进行检索"
            >
              <el-option label="已清分" value="1"></el-option>
              <el-option label="未清分" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              clearable
              v-model="form.settleStatus"
              placeholder="请选择结算状态进行检索"
            >
              <el-option label="已结算" value="1"></el-option>
              <el-option label="未结算" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectTime"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectTime"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-button @click="orders" type="primary">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <el-divider />
        <el-table size="small" :data="tableData" border>
          <el-table-column prop="userName" label="用户"> </el-table-column>
          <el-table-column prop="orderId" label="订单编号"> </el-table-column>
          <el-table-column prop="amount" label="订单金额(元)">
          </el-table-column>
          <el-table-column prop="stationName" label="电站名称">
          </el-table-column>
          <el-table-column prop="stakeName" label="设备"> </el-table-column>
          <el-table-column prop="chargerName" label="端口"> </el-table-column>
          <el-table-column prop="createTime" label="开始时间">
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间"> </el-table-column>
          <el-table-column prop="duration" label="时长"> </el-table-column>
          <el-table-column prop="totalElectric" label="电量(度)">
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态">
          </el-table-column>
          <el-table-column prop="payStatus" label="支付状态"> </el-table-column>
          <el-table-column prop="stopElecReason" label="停电原因">
          </el-table-column>
          <el-table-column prop="billStatus" label="发票状态">
          </el-table-column>
          <el-table-column prop="clearStatus" label="清分状态">
          </el-table-column>
          <el-table-column prop="settleStatus" label="结算状态">
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
 * @time          2020-10-05 16:38:30  星期一
 * @description   订单管理
 */
import api from "@/service/api";

export default {
  name: "order-manage",
  data() {
    return {
      time: "",
      form: {
        userName: "",
        orderId: "",
        stationName: "",
        stopElecReason: "",
        startTimeSerach: "",
        endTimeSerach: "",
        orderStatus: "",
        billStatus: "",
        clearStatus: "",
        settleStatus: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "createtime",
        isAsc: "desc",
      },
      tableData: [],
      orderTotals: {},
      total: 0,
      currentPage: 1,
    };
  },
  created() {
    this.orders();
    this.orderTotal();
  },
  methods: {
    // 选择时间
    selectTime(time) {
      console.log(time);
    },
    // 重置条件查询
    reset() {
      this.form.loginName = "";
      this.form.userName = "";
      this.form.chineseName = "";
      this.form.phonenumber = "";
      this.form.runStatus = "";
      this.orders();
    },
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.orders();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.pageNum = val;
      this.orders();
    },
    // 订单列表
    orders() {
      api
        .orders(this.form)
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
    // 订单汇总数据
    orderTotal() {
      api
        .orderTotal()
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.orderTotals = res.data[0];
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
.order-manage {
  .order-totals {
    border-right: 1px solid #e4e4e4;
    max-height: 80vh;
    overflow-y: auto;
  }
  .el-row {
    .el-col:nth-child(n + 7) {
      margin-top: 20px;
    }
  }
  .list {
    margin-bottom: 10px;
    div {
      display: inline-block;
    }
    .title {
      color: #858585;
    }
  }
}
</style>
