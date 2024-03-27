<template>
  <el-card class="role">
    <data-filter :loading="loading" :btnSpan="16" :getData="getData" :queryReset="queryReset">
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.comment" placeholder="字典名称" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.codeType" placeholder="字典编号" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
    </data-filter>
    <el-divider />
    <custom-table ref="table" :loading="loading" :total="total" :data="tableData" height="570" :border="false"
      row-key="codeType" :page-size="queryForm.pageSize" :current-page="queryForm.pageNum"
      @current-change="handleCurrentChange" @size-change="dataSizeChange" :derive="exporting">
      <template v-slot:left>
        <el-button size="small" icon="el-icon-plus" @click="editing('add')">新增</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column show-overflow-tooltip label="字典编号" prop="codeType"></el-table-column>
        <el-table-column show-overflow-tooltip label="字典名称" prop="comment"></el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button @click="editing('modification', scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="openEditDictionDrawer(scope.row)" type="info" size="mini">配置</el-button>
            <el-button type="danger" size="mini" @click="deleteing(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </custom-table>
    <dictionariesList :show="editDictionDrawer" :data="dictionDetail" @before-close="closeDictionariesDrawer" />
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:36:26  星期一
 * @description   数据字典
 */
import {
  dictionaries,
  addDictionarie,
  modificationDictionarie,
  deleteDictionarie,
} from "../api.js";
import dictionariesList from "./components/list.vue";

import { queryReset, pageReset, pagination, parseParmas } from "@/mixins/index.js";

export default {
  name: "system-dictionaries-index",
  mixins: [queryReset, pageReset, pagination, parseParmas],
  components: { dictionariesList },
  data() {
    return {
      loading: false,
      queryForm: {
        codeType: "",
        comment: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      tableData: [],
      total: 0,
      editDictionDrawer: false,
      dictionDetail: {},
    };
  },
  methods: {
    // 表格数据
    getData() {
      this.tableData = [];
      this.loading = true;
      dictionaries(this.queryForm).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      }).catch(() => {
        this.loading = false;
      })
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
      const that = this;
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

          const api = {
            addDictionarie,
            modificationDictionarie,
          };
          api[status === "add" ? "addDictionarie" : "modificationDictionarie"]({
            comment: value.value,
            codeType: status === "modification" ? data.codeType : "",
          }).then((res) => {
            if (res.code === 0) {
              that.$message.success(res.msg);
              that.getData();
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
          deleteDictionarie({
            codeType: data.codeType,
            comment: data.comment,
          }).then((res) => {
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
    async exporting(command) {
      let params = { ...this.queryForm };
      if (command === "2") {
        params.pageSize = this.total;
        params.pageNum = 1;
      }
      const result = await dictionaries(params)
      if (result.code === 0) {
        const columns = this.$refs.table.getColumns();
        const data = result.rows.map((item) => {
          let column = columns.map(key => {
            return [key.label, item[key.prop]]
          })
          return Object.fromEntries(column);
        });
        return data;
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
