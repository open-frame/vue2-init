<template>
  <div class="">
    <el-drawer :title="data.comment + '列表'" size="40%" :visible="show" direction="rtl" :append-to-body="true"
      :modal-append-to-body="false" :before-close="handleClose">
      <div class="p-3">
        <custom-table ref="table" :loading="tableLoading" :data="dictionDetailTable" :border="false">
          <template v-slot:left>
            <el-input size="mini" clearable :placeholder="'按名称筛选' + data.comment" v-model="queryForm.name"
              @clear="getData">
              <el-button slot="append" @click="getData" :loading="tableLoading">搜索</el-button>
            </el-input>
          </template>
          <template v-slot:right>
            <el-button type="text" size="small" @click="openDictionarieFormDialog('add')">新增</el-button>
          </template>
          <template v-slot:columns>
            <el-table-column show-overflow-tooltip prop="name" label="名称">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="codeValue" label="值">
            </el-table-column>
            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="text" size="mini"
                  @click="openDictionarieFormDialog('modification', scope.row)">编辑</el-button>
                <el-button type="text" size="mini" class="text-danger" @click="deleteing(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </custom-table>
      </div>
    </el-drawer>
    <el-dialog :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="false"
      :title="dictionarieTitle + '字典数据'" :visible="dictionarieVisible" :before-close="closeDictionarieDialog">
      <el-form :model="dictionarieForm" :rules="dictionarieRules" ref="dictionarieForm" label-width="100px">
        <el-form-item label="值名称：" prop="name">
          <el-input clearable v-model="dictionarieForm.name" @keyup.enter.native="submitDictionarieValue"></el-input>
        </el-form-item>
        <el-form-item label="代码：" prop="codeValue">
          <el-input v-model="dictionarieForm.codeValue" @keyup.enter.native="submitDictionarieValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeDictionarieDialog">关 闭</el-button>
        <el-button type="primary" @click="submitDictionarieValue">{{
          dictionarieTitle
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-12-16 15:17:40  星期四
 * @description
 **/
import { dictionarieValues, addDictionarieValue, modificationDictionarieValue, deleteDictionarieValue } from "../../api.js";

export default {
  name: "",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    this.dictionarieRules = dictionarieRules
    return {
      tableLoading: true,
      queryForm: {
        codeValue: "",
        codeType: "",
        name: "",
        pageNum: 1,
        pageSize: 99999,
      },
      dictionDetailTable: [],
      dictionarieTitle: "",
      dictionarieVisible: false,
      dictionarieForm: {
        id: "",
        comment: "",
        name: "",
        codeValue: "",
      },
    };
  },
  watch: {
    data(now, old) {
      console.log(now);
      this.queryForm.pageNum = 1;
      this.queryForm.codeType = now.codeType;
      this.getData();
    },
  },
  methods: {
    // 表格数据
    getData() {
      this.dictionDetailTable = [];
      this.tableLoading = true;
      dictionarieValues(this.queryForm).then((res) => {
        this.tableLoading = false;
        if (res.code === 0) {
          this.dictionDetailTable = res.rows;
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },
    // 打开添加、修改字典模态框
    openDictionarieFormDialog(status, data) {
      console.log(status, data, this.data);
      this.dictionarieForm.comment = this.data.comment;
      this.dictionarieVisible = true;
      if (status === "add") {
        this.dictionarieTitle = "添加";
        this.dictionarieForm.codeType = this.data.codeType;
      } else {
        this.dictionarieTitle = "修改";
        this.dictionarieForm.id = data.id;
        this.dictionarieForm.codeValue = data.codeValue;
        this.dictionarieForm.name = data.name;
      }
    },
    // 提交字典值
    submitDictionarieValue() {
      const hasValue = this.dictionDetailTable.map((item) => {
        return item.codeValue;
      });
      if (
        this.dictionarieTitle === "添加" &&
        hasValue.includes(this.dictionarieForm.codeValue)
      ) {
        return this.$message.error(
          `已存在代码 ${this.dictionarieForm.codeValue}`
        );
      }

      this.$refs["dictionarieForm"].validate((valid) => {
        if (valid) {
          console.log(this.dictionarieForm);
          if (this.dictionarieTitle === "添加") {
            this.insertDictionarieValue();
          } else {
            this.modificationDictionarieValue();
          }
        }
      });
    },
    // 添加字典值
    insertDictionarieValue() {
      addDictionarieValue(this.dictionarieForm).then((res) => {
        if (res.code === 0) {
          this.$message.success("添加成功");
          this.$refs["dictionarieForm"].resetFields();
          this.getData();
        }
      });
    },
    // 修改字典值
    modificationDictionarieValue() {
      modificationDictionarieValue({
        id: this.dictionarieForm.id,
        name: this.dictionarieForm.name,
        codeValue: this.dictionarieForm.codeValue,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("修改成功");
            this.getData();
            this.closeDictionarieDialog();
            delete this.dictionarieForm.id;
          }
        });
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
          deleteDictionarieValue({ ids: [data.id] }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getData();
            }
          });
        })
        .catch(() => { });
    },
    // 关闭增改字典值面板
    closeDictionarieDialog() {
      this.$refs["dictionarieForm"].resetFields();
      this.dictionarieVisible = false;
    },
    handleClose() {
      this.$emit("before-close", false);
    },
  },
};


const dictionarieRules = {
  name: [{ required: true, message: "请输入值名称", trigger: "blur" }],
  codeValue: [{ required: true, message: "请输入代码", trigger: "blur" }],
}
</script>

<style lang="less" scoped></style>