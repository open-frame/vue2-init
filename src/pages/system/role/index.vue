<template>
  <el-card class="role">
    <data-filter :loading="loading" :btnSpan="12" :getData="getData" :queryReset="queryReset">
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.roleName" placeholder="角色名称" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.roleKey" placeholder="权限字符" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
      <el-col :span="4">
        <clw-select clearable size="medium" v-model="queryForm.status" placeholder="角色状态" @change="pageReset">
          <el-option v-for="(item, index) in dropdowns.status" :key="index" :label="item.code_name"
            :value="item.code_value"></el-option>
        </clw-select>
      </el-col>
    </data-filter>
    <el-divider />
    <custom-table :loading="loading" :total="total" :data="tableData" height="550" row-key="roleId" ref="table"
      :page-size="queryForm.pageSize" :current-page="queryForm.pageNum" @selection-change="selectedDate"
      @size-change="dataSizeChange" @current-change="handleCurrentChange" :derive="exporting">
      <template v-slot:left>
        <el-button v-permission="'function_edit'" size="small" icon="el-icon-plus" @click="editing('add')">新增</el-button>
        <el-button size="small" icon="el-icon-delete" @click="deleteing('more')">删除</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column show-overflow-tooltip label="角色id" prop="roleId"></el-table-column>
        <el-table-column show-overflow-tooltip label="角色名称" prop="roleName"></el-table-column>
        <el-table-column show-overflow-tooltip label="权限字符" prop="roleKey"></el-table-column>
        <el-table-column show-overflow-tooltip label="角色状态" prop="status">
          <template slot-scope="scope">
            {{ scope.row.status | transfortext(dropdowns.status) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button v-permission="'function_edit'" @click="editing('modification', scope.row)" type="primary"
              size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteing('one', scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </custom-table>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :title="dialogText + '角色'"
      :visible="dialogVisible" :before-close="closeSeeDetail">
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
            :props="{ label: 'menuName' }" @check="checkMenu" :filter-node-method="filterMenu"
            style="height: 330px; overflow-y: auto;">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer">
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
import {
  roleDetail,
  menuResource,
  roleList,
  addRole,
  editRole,
  deleteRole,
} from "../api.js";
import { dropdownsAPI } from "@/service/public.js";

import { transfortext } from "@/filters/index.js";
import { permission } from "@/directives/index.js";
import { queryReset, pageReset, pagination, parseParmas } from "@/mixins/index.js";

export default {
  name: "system-role-index",
  mixins: [queryReset, pageReset, pagination, parseParmas],
  filters: {
    transfortext,
  },
  directives: {
    permission
  },
  data() {
    this.rules = rules;
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
        status: [],
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
    };
  },
  created() {
    this.getDropdowns();
  },
  watch: {
    filterMenuTree(val) {
      this.$refs.menuTree.filter(val);
    },
  },
  methods: {
    getDropdowns() {
      // 用户状态
      dropdownsAPI("626988").then((res) => {
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
    async editing(status, data) {
      console.log(status, data);
      const loading = this.$loading({
        lock: true,
        text: '正在查询',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      const menuTree = await menuResource({});// 获取菜单树
      loading.close();

      if (menuTree.code === 0) {
        console.log("菜单树：", menuTree);
        // 首页必选
        this.roleForm.menuIds = [
          menuTree.data.find((item) => {
            return item.perms === "home/index";
          }).menuId,
        ];
        // 首页禁止操作
        this.jurisdictionTreeData = menuTree.data.map((item) => {
          return {
            ...item,
            disabled: item.perms === "home/index",
          };
        });
      }




      this.dialogVisible = true;
      const that = this;

      if (status === "add") {
        this.dialogText = "添加";
        delete this.roleForm.roleId;
      } else {
        this.dialogText = "修改";
        this.$nextTick(() => {
          roleDetail(data.roleId).then((res) => {
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
      this.tableData = [];
      roleList(this.queryForm).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      }).catch(() => {
        this.loading = false;
      })
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
          const api = {
            addRole,
            editRole,
          };
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

          deleteRole({
            ids: ids,
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getData();
              this.moreSelect = [];
            }
          });
        })
        .catch(() => { });
    },
    // 导出列表
    async exporting(command) {
      let params = { ...this.queryForm };
      if (command === "2") {
        params.pageSize = this.total;
        params.pageNum = 1;
      }
      const result = await roleList(params)
      if (result.code === 0) {
        const columns = this.$refs.table.getColumns();
        const data = result.rows.map((item) => {
          let column = columns.map(key => {
            return [key.label, `${transfortext(item[key.prop], this.dropdowns[key.prop])}`]
          })
          return Object.fromEntries(column);
        });
        return data;
      }
    },
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
