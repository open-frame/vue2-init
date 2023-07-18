<template>
  <el-card class="role">
    <el-row :gutter="40">
      <el-col :span="4">
        <el-input clearable size="medium" v-model="queryForm.roleName" placeholder="角色名称" @change="pageReset"
          @keyup.enter.native="getData"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input clearable size="medium" v-model="queryForm.roleKey" placeholder="权限字符" @change="pageReset"
          @keyup.enter.native="getData"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select clearable size="medium" v-model="queryForm.status" placeholder="角色状态" @change="pageReset">
          <el-option v-for="(item, index) in dropdowns.status" :key="index" :label="item.code_name"
            :value="item.code_value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" class="text-end">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <edo-table :loading="loading" :total="total" :data="tableData" height="550" row-key="roleId"
      :page-size="queryForm.pageSize" :current-page="queryForm.pageNum" @selection-change="selectedDate"
      @size-change="dataSizeChange" @current-change="handleCurrentChange" @exporting="exporting" @printing="printing">
      <template v-slot:left>
        <el-button v-permission="'function_edit'" size="small" icon="el-icon-plus" @click="editing('add')">新增</el-button>
        <el-button v-permission="'function_delete'" size="small" icon="el-icon-delete"
          @click="deleteing('more')">删除</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column show-overflow-tooltip label="角色id" prop="roleId"></el-table-column>
        <el-table-column show-overflow-tooltip label="角色名称" prop="roleName"></el-table-column>
        <el-table-column show-overflow-tooltip label="权限字符" prop="roleKey">
          <span slot-scope="scope" v-copy>
            {{ scope.row.roleKey }}
          </span>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="角色状态">
          <template slot-scope="scope">
            {{ scope.row.status | CodeTransforText(dropdowns.status, { name: "code_name", value: "code_value" }) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作时间" prop="createTime"></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button plain v-permission="'function_edit'" @click="editing('modification', scope.row)" type="primary"
              size="small">编辑</el-button>
            <el-button plain v-permission="'function_delete'" type="danger" size="small"
              @click="deleteing('one', scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </edo-table>
    <el-dialog :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="false"
      :title="dialogText + '角色'" :visible="dialogVisible" :before-close="closeSeeDetail">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input clearable v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限字符：" prop="roleKey">
          <el-input clearable :readonly="dialogText === '修改'" v-model="roleForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select filterable clearable size="medium" v-model="roleForm.status" placeholder="">
            <el-option v-for="(item, index) in dropdowns.status" :key="index" :label="item.code_name"
              :value="item.code_value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input clearable v-model="roleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="分配权限：" prop="menuIds">
          <el-input clearable placeholder="输入关键字过滤" v-model="filterMenuTree">
          </el-input>
          <el-tree ref="menuTree" show-checkbox :check-strictly="true" node-key="menuId"
            :default-checked-keys="roleForm.menuIds" highlight-current :data="jurisdictionTreeData"
            :props="{ label: 'menuName' }" @check="checkMenu" :filter-node-method="filterMenu">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
        <el-button @click="closeSeeDetail('roleForm')">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:36:26  星期一
 * @description   角色管理
 */
import api from "@/service/api/management";
import $publicAPI from "@/service/public.js";
import exportFile from "@/utils/export-file";
import { permission, copy } from '@/directives/index.js'
import { CodeTransforText } from 'code-transfor-text_vue'
import resetFilter from "@/mixins/reset-filter.js"
import pageReset from "@/mixins/page-reset.js"
import pagination from "@/mixins/pagination.js"

export default {
  name: "system-role-index",
  mixins: [resetFilter, pageReset, pagination],
  directives: {
    permission, copy
  },
  filters: {
    CodeTransforText
  },
  data() {
    return {
      loading: false,
      queryForm: {
        roleName: "",
        roleKey: "",
        status: "",
        beginTime: "",
        endTime: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "asc",
      },
      dropdowns: {
        status: [{
          code_name: "启用",
          code_value: "1"
        },
        {
          code_name: "禁用",
          code_value: "0"
        }],
      },
      time: "",
      tableData: [],
      total: 0,
      filterMenuTree: "",
      moreSelect: [],
      dialogVisible: false,
      dialogText: "",
      roleForm: {
        roleName: "",
        roleKey: "",
        status: "",
        remark: "",
        menuIds: [],
      },
      jurisdictionTreeData: [],
      rules,
    };
  },
  created() {
    this.getData();
    // this.getDropdowns();
  },
  watch: {
    filterMenuTree(val) {
      this.$refs.menuTree.filter(val);
    },
    jurisdictionTreeData(now) {
      // console.log(now);
      if (now.length) {
        // 首页必选
        this.roleForm.menuIds = [
          now.find((item) => {
            return item.perms === "home/index";
          }).menuId,
        ];
      }
    }
  },
  methods: {
    getDropdowns() {
      // 用户状态
      $publicAPI.dropdowns("626988").then((res) => {
        if (res.code === 0) {
          this.dropdowns.status = res.data;
        }

      });
    },
    // 选择数据
    selectedDate(val) {
      console.log(val);
      this.moreSelect = val;
    },
    // 打开添加、修改角色模态框
    editing(status, data) {
      console.log(status, data);
      this.getMenuResource();
      this.dialogVisible = true;
      const that = this;

      if (status === "add") {
        this.dialogText = "添加";
        delete this.roleForm.roleId;
      } else {
        this.dialogText = "修改";
        this.$nextTick(() => {
          api.roleDetail(data.roleId).then((res) => {

            if (res.code === 0) {
              that.roleForm.roleId = res.data.roleId;
              that.roleForm.roleName = res.data.roleName;
              that.roleForm.roleKey = res.data.roleKey;
              that.roleForm.status = res.data.status;
              that.roleForm.remark = res.data.remark;
              that.roleForm.menuIds = res.data.menuIds;
            }
          });
        });
      }
    },
    // 获取菜单树
    getMenuResource() {
      api.menuResource({}).then((res) => {
        if (res.code === 0) {
          console.log("菜单树：", res);
          this.jurisdictionTreeData = res.data.menuList.map((item) => {
            return {
              ...item,
              disabled: item.perms === "home/index",
            };
          });
        }
      });
    },
    // 过滤资源
    filterMenu(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    // 关闭数据详情面板
    closeSeeDetail(formName) {
      this.dialogVisible = false;
      this.$refs["roleForm"].resetFields();
    },
    // 表格数据
    getData() {
      this.loading = true;

      api.roleList(this.queryForm).then((res) => {

        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      });
    },
    //
    checkMenu(data, node) {
      this.roleForm.menuIds = node.checkedKeys;
    },
    // 提交角色资料按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.roleForm);
          api[this.dialogText === "添加" ? "addRole" : "editRole"](
            this.roleForm
          ).then((res) => {

            if (res.code === 0) {
              if (this.dialogText === "添加") {
                this.$message.success("添加成功");
                this.closeSeeDetail();
                this.getData();
              } else {
                location.reload();
              }
            }
          });
        }
      });
    },
    // 删除角色
    deleteing(type, data) {
      console.log(type, data);
      console.log(this.moreSelect);
      if (type === "more") {
        if (this.moreSelect.length < 1) {
          this.$message.warning("请选择删除项");
          return false;
        }
      }
      this.$confirm("一旦删除不可恢复，确定删除？", "删除提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "放弃",
      })
        .then(() => {
          let ids = [];
          if (type === "one") {
            ids.push(data.roleId);
          } else {
            for (let item of this.moreSelect) {
              ids.push(item.roleId);
            }
          }
          console.log(ids);
          api
            .deleteRole({
              ids: ids,
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success(res.msg);
                this.getData();
                this.moreSelect = [];
              }
            });
        })
        .catch((err) => { });
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

      api.roleList(params).then((res) => {
        if (res.code === 0) {
          downLoading.text = "正在下载...";
          const data = res.rows.map((item) => {
            return {
              角色id: item.roleId,
              角色名称: item.roleName,
              权限字符: item.roleKey,
              角色状态: `${this.$options.filters.CodeTransforText(item.status, this.dropdowns.status)}`,
            };
          });
          exportFile.excel(data, "运营用户列表");
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
        { field: "roleId", displayName: "角色id" },
        { field: "roleName", displayName: "角色名称" },
        { field: "roleKey", displayName: "权限字符" },
      ];
      api.roleList(params).then((res) => {
        printJS({
          type: "json",
          printable: res.rows,
          scanStyles: true,
          header: `<h2 style="text-align: center">运营用户列表</h2>`,
          properties: tableColumn,
          style: "@media print{@page {size:landscape}}",
          gridHeaderStyle: "border: 1px solid #000;text-align:center",
          gridStyle: "border: 1px solid #000;text-align:center",
        });
      });
    }
  },
};

const rules = {
  roleName: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
    {
      min: 2,
      max: 12,
      message: "长度在 2 到 12 个字符",
      trigger: "blur",
    },
  ],
  roleKey: [
    { required: true, message: "请输入权限字符", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9-_]+$/,
      message: "只能为数字、字母、下划线",
      trigger: "blur",
    },
    {
      min: 4,
      max: 128,
      message: "长度在 4 到 128 个字符",
      trigger: "blur",
    },
  ],
  status: [{ required: true, message: "请选择角色状态", trigger: "change" }],
  menuIds: [
    {
      type: "array",
      required: true,
      message: "至少首页看盘应该赋予给该角色",
      trigger: "change",
    },
  ],
};
</script>

<style lang="less" scoped></style>
