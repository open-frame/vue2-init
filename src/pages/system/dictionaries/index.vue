<template>
  <el-card class="role">
    <el-row :gutter="40">
      <el-col :span="4">
        <el-input clearable size="medium" v-model="queryForm.comment" placeholder="字典名称" @change="pageReset"
          @keyup.enter.native="getData"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input clearable size="medium" v-model="queryForm.codeType" placeholder="字典编号" @change="pageReset"
          @keyup.enter.native="getData"></el-input>
      </el-col>
      <el-col :span="16" class="text-end">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="queryReset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <edo-table :loading="loading" :total="total" :data="tableData" height="570" :border="false" row-key="codeType"
      :page-size="queryForm.pageSize" :current-page="queryForm.pageNum" @current-change="handleCurrentChange"
      @size-change="dataSizeChange" @exporting="exporting" @printing="printing">
      <template v-slot:left>
        <el-button v-permission="'function_edit'" size="small" icon="el-icon-plus" @click="editing('add')">新增</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column show-overflow-tooltip label="字典编号" prop="codeType"></el-table-column>
        <el-table-column show-overflow-tooltip label="字典名称" prop="comment"></el-table-column>
        <el-table-column width="300" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button plain v-permission="'function_edit'" @click="editing('modification', scope.row)" type="primary"
              size="small">编辑</el-button>
            <el-button plain v-permission="'function_config'" @click="openEditDictionDrawer(scope.row)" type="info"
              size="small">配置</el-button>
            <el-button plain v-permission="'function_delete'" type="danger" size="small"
              @click="deleteing(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </edo-table>
    <dictionariesList :show="editDictionDrawer" :data="dictionDetail" @before-close="closeDictionariesDrawer" />
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2023-10-05 16:36:26  星期一
 * @description   数据字典
 */
import api from "@/service/api/system";
import { exportExcel } from "@/utils/export-file";
import { permission } from '@/directives/index.js'
import { queryReset, pageReset, pagination } from "@/mixins/index.js"




export default {
  name: "system-dictionaries-index",
  mixins: [queryReset, pageReset, pagination],
  directives: {
    permission
  },
  components: {
    dictionariesList: () => import("./components/list.vue")
  },
  data() {
    return {
      loading: false,
      queryForm: {
        comment: "",
        codeType: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      tableData: [],
      total: 0,
      editDictionDrawer: false,
      dictionDetail: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 表格数据
    getData() {
      this.loading = true;
      api.dictionaries(this.queryForm).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      });
    },
    // 打开添加、修改字典模态框
    editing(status, data) {
      console.log(status, data);
      let title, inputValue;
      if (status === "add") {
        title = "添加字典";
      } else {
        title = "修改字典";
        inputValue = data.comment;
      }

      this.$prompt(`请输入字典名称：`, title, {
        inputValue,
        beforeClose(action, instance, done) {
          console.log(action, instance, done);
          if (action === "confirm" && !instance.inputValue) {
            return this.$message.warning("不能为空");
          }
          done();
        },
      })
        .then((value) => {
          console.log(value.value);
          if (!value.value) {
            return;
          }
          if (status === "modification" && value.value === data.comment) {
            return;
          }

          api[status === "add" ? "addDictionarie" : "modificationDictionarie"]({
            comment: value.value,
            codeType: status === "modification" ? data.codeType : "",
          }).then((res) => {

            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getData();
            }
          });
        })
        .catch(() => { });
    },
    // 删除字典
    deleteing(data) {
      console.log(data);
      this.$confirm("一旦删除不可恢复，确定删除？", "删除提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "放弃",
      })
        .then(() => {
          api
            .deleteDictionarie({
              codeType: data.codeType,
              comment: data.comment,
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg);
                this.getData();
              }
            });
        })
        .catch(() => { });
    },
    // 打开配置字典面板
    openEditDictionDrawer(data) {
      this.editDictionDrawer = true;
      this.dictionDetail = data;
    },
    // 关闭字典详细列表
    closeDictionariesDrawer(status) {
      this.editDictionDrawer = status;
    },
    // 导出列表
    exporting(command) {
      console.log(command);
      if (this.tableData.length < 1) {
        this.$message.warning("无数据可导");
        return false;
      }

      const downLoading = this.$loading({
        lock: true,
        text: "正在获取数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let params = { ...this.queryForm };
      if (command === "2") {
        params.pageSize = this.total;
        params.pageNum = 1;
      }

      api.dictionaries(params).then((res) => {
        if (res.code === 0) {
          downLoading.text = "正在下载...";
          const data = res.rows.map((item) => {
            return {
              字典编号: item.codeType,
              字典名称: item.comment,
            };
          });
          exportExcel(data, "字典表");
        }
      }).finally(() => {
        downLoading.close();
      });
    },
    // 打印订单表
    printing(command) {
      // https://blog.csdn.net/he_wenzi/article/details/110645566
      // https://www.jianshu.com/p/bc079fbb20c7

      let params = { ...this.queryForm };
      if (command === "2") {
        params.pageSize = this.total;
        params.pageNum = 1;
      }
      const tableColumn = [
        { field: "codeType", displayName: "字典编号" },
        { field: "comment", displayName: "字典名称" },
      ];
      api.dictionaries(params).then((res) => {
        printJS({
          type: "json",
          printable: res.rows,
          scanStyles: true,
          header: `<h2 style="text-align: center">字典表</h2>`,
          properties: tableColumn,
          style: "@media print{@page {size:landscape}}",
          gridHeaderStyle: "border: 1px solid #000;text-align:center",
          gridStyle: "border: 1px solid #000;text-align:center",
        });
      });
    }
  },
};
</script>

<style lang="less" scoped></style>
