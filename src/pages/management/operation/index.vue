<template>
  <el-card class="operation">
    <data-filter :loading="loading" :btnSpan="24" :getData="getData" :queryReset="queryReset">
          <el-col :span="6">
            <clw-input clearable size="medium" v-model="queryForm.loginName" placeholder="登录账号" @change="pageReset"
              @keyup.enter.native="getData"></clw-input>
          </el-col>
          <el-col :span="6">
            <clw-input clearable size="medium" v-model="queryForm.userName" placeholder="客户姓名" @change="pageReset"
              @keyup.enter.native="getData"></clw-input>
          </el-col>
          <el-col :span="6">
            <clw-input clearable size="medium" v-model="queryForm.phonenumber" placeholder="手机号码" @change="pageReset"
              @keyup.enter.native="getData"></clw-input>
          </el-col>
          <el-col :span="6">
            <clw-select filterable default-first-option clearable size="medium" v-model="queryForm.status"
              placeholder="账号状态" @change="pageReset">
              <el-option v-for="item in dropdowns.status" :key="item.code_value" :label="item.code_name"
                :value="item.code_value"></el-option>
            </clw-select>
          </el-col>
        </data-filter>
        <el-divider />
        <custom-table ref="table" :loading="loading" :total="total" :data="tableData" height="600" row-key="userId"
          :page-size="queryForm.pageSize" :current-page="queryForm.pageNum" @selection-change="selectingdata"
          @size-change="dataSizeChange" @current-change="handleCurrentChange" :derive="exporting">
          <template v-slot:left>
            <el-button size="small" icon="el-icon-plus" @click="editing('add')">新增</el-button>
            <el-button size="small" icon="el-icon-delete" @click="deleteing('more')">删除</el-button>
          </template>
          <!-- <template v-slot:right>
              表头上右侧容器
          </template> -->
          <template v-slot:columns>
            <el-table-column show-overflow-tooltip label="用户id" prop="userId">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="登录账号" prop="loginName">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="客户姓名" prop="userName">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="sex" label="客户性别">
              <template slot-scope="scope">
                {{ scope.row.sex | transfortext(dropdowns.sex) }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="隶属组织" prop="deptName">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="联系方式" prop="phonenumber">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="邮箱" prop="email">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="status" label="客户状态">
              <template slot-scope="scope">
                {{ scope.row.status | transfortext(dropdowns.status) }}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="加入时间" prop="createTime">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="账号创建人" prop="createBy">
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
              <template slot-scope="scope">
                <el-button plain size="mini" v-permission="'function_edit'" type="primary" @click="editing('modification', scope.row)">编辑</el-button>
                <el-button plain size="mini" type="danger" @click="deleteing('one', scope.row)">删除</el-button>
                <el-button plain size="mini" @click="resetPassWord(scope.row)">修改密码</el-button>
              </template>
            </el-table-column>
          </template>
        </custom-table>
    <el-dialog :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="false" :title="dialogText"
      :visible="showEditFormDialogrVisible" :show-close="false">
      <el-form :model="submitUserForm" :rules="rules" ref="submitUserForm" label-width="100px">
        <el-form-item label="登陆账号" prop="loginName">
          <el-input v-model="submitUserForm.loginName" clearable :readonly="dialogText === '新增用户' ? false : true"
            placeholder="建议用个人手机号为登录账号"></el-input>
        </el-form-item>
        <el-form-item v-show="dialogText === '新增用户'" label="登陆密码" prop="password">
          <el-input v-model="submitUserForm.password" clearable show-password autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="submitUserForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="submitUserForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="submitUserForm.phonenumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select filterable default-first-option v-model="submitUserForm.sex" clearable placeholder="">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select filterable default-first-option v-model="submitUserForm.roleIds" multiple clearable
            @change="selectUserRole" placeholder="">
            <el-option v-for="item in dropdowns.roles" :key="item.roleId" :label="item.roleName"
              :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select filterable default-first-option clearable v-model="submitUserForm.status" placeholder="">
            <el-option v-for="(item, index) in dropdowns.status" :key="index" :label="item.code_name"
              :value="item.code_value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeEditFormVisible('submitUserForm', closeEditDialog)">取 消</el-button>
        <el-button type="primary" @click="submitForm('submitUserForm', dialogText)">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:34:56  星期一
 * @description   运营用户管理
 */

import $secret from "@/utils/secret.js";
import { permission } from '@/directives/index.js'
import { transfortext } from "@/filters/index.js";
import { dropdownsAPI, allRolesAPI } from "@/service/public.js";
import {
  editFormDialog,
  queryReset,
  pageReset,
  pagination,
  parseParmas,
} from "@/mixins/index.js";
import {
  operationUsers,
  operationUserDetail,
  detectionOperationUserNameExist,
  addOperationUsers,
  editOperationUsers,
  deleteOperationUsers,
  operationUsersResetPassWord,
} from "../api.js";

export default {
  name: "management-operation-index",
  mixins: [editFormDialog, queryReset, pageReset, pagination, parseParmas],
  filters: {
    transfortext,
  },
  directives: {
    permission
  },
  data() {
    return {
      loading: false,
      time: "",
      queryForm: {
        userName: "",
        deptCode: "",
        loginName: "",
        phonenumber: "",
        status: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      tableData: [],
      total: 0,
      moreSelect: [],
      dialogText: "",
      dropdowns: {
        sex: [],
        status: [],
        roles: [],
      },
      submitUserForm: {
        loginName: "",
        password: "",
        deptCode: "",
        deptName: "",
        phonenumber: "",
        userName: "",
        email: "",
        sex: "",
        status: "",
        roleIds: [],
      },
      rules,
    };
  },
  created() {
    this.getDropdowns();
  },
  methods: {
    getDropdowns() {
      // 平台客户账号状态
      dropdownsAPI("477924").then((res) => {
        if (res.code === 0) {
          this.dropdowns.status = res.data;
        }
      });

      // 性别
      dropdownsAPI("035927").then((res) => {
        if (res.code === 0) {
          this.dropdowns.sex = res.data;
        }
      });
    },
    // 用户列表数据
    getData() {
      this.tableData = [];
      this.loading = true;
      operationUsers(this.queryForm).then((res) => {
        this.loading = false;
        if (res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
        }
      }).catch(() => {
        this.loading = false;
      })
    },
    // 点击树节点
    organizationsTreeClick(data) {
      console.log(data);
      this.queryForm.deptCode = data.deptCode;
      this.getData();
    },
    // 选择数据
    selectingdata(val) {
      console.log(val);
      this.moreSelect = val;
    },
    // 关闭编辑客户资料面板
    closeEditDialog() {
      for (let item in this.submitUserForm) {
        this.submitUserForm[item] = "";
      }
      this.submitUserForm.roleIds = [];
    },
    // 打开添加/修改用户 面板
    editing(status, data) {
      console.log(status, data);
      this.showEditFormDialogrVisible = true;
      if (status === "add") {
        this.dialogText = "新增用户";
        delete this.submitUserForm.userId;
        this.rules.password = [
          { required: true, message: "密码为必填项！", trigger: "blur" },
          {
            pattern: /^[^<|>|(|)|+|-|*|/|%|=|{|}]*$/,
            message: "禁止< > ( ) + - * / % = { }等特殊字符",
            trigger: "blur",
          },
          {
            min: 4,
            max: 48,
            message: "长度在 4 到 2048 个字符",
            trigger: "blur",
          },
        ];
        this.addFormValidator();
      } else {
        this.dialogText = "修改用户";
        this.rules.password = [];
        this.deleteFormValidator();
        operationUserDetail(data.userId).then((res) => {
          this.submitUserForm.loginName = res.data.user.loginName;
          this.submitUserForm.password = res.data.user.password;
          this.submitUserForm.deptCode = res.data.user.deptCode;
          this.submitUserForm.deptName = res.data.user.deptName;
          this.submitUserForm.phonenumber = res.data.user.phonenumber;
          this.submitUserForm.userName = res.data.user.userName;
          this.submitUserForm.email = res.data.user.email;
          this.submitUserForm.sex = res.data.user.sex;
          this.submitUserForm.status = res.data.user.status;
          this.submitUserForm.roleIds = res.data.role;
          this.submitUserForm.userId = res.data.user.userId;
        });
      }
      // 获取角色列表
      allRolesAPI().then((res) => {
        if (res.code === 0) {
          this.dropdowns.roles = res.data.roles;
        }
      });
    },
    // 增加校验
    addFormValidator() {
      const that = this;
      this.$nextTick(() => {
        if (
          !that.$refs["submitUserForm"].rules.loginName.find((item) => {
            return item.validator;
          })
        ) {
          that.$refs["submitUserForm"].rules.loginName.push({
            validator: (rule, value, next) => {
              detectionOperationUserNameExist({
                loginName: value,
                name: value,
              }).then((res) => {
                if (res === 1) {
                  next(new Error("登录账号已存在，请换个账号试试"));
                } else {
                  next();
                }
              });
            },
            trigger: "blur",
          });
        }
      });
    },
    // 删除个别校验
    deleteFormValidator() {
      const that = this;
      this.$nextTick(() => {
        that.$refs["submitUserForm"].rules.loginName.forEach((item, index) => {
          if (item.validator) {
            item.validator = null;
          }
        });
      });
    },
    // 添加/修改用户时，选择角色
    selectUserRole(data) {
      console.log(data);
      this.submitUserForm.roleIds = data;
    },
    // 提交用户资料按钮
    submitForm(formName, type) {
      // console.log(type);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === "修改用户") {
            delete this.submitUserForm.password;
          }

          if (type === "新增用户") {
            this.submitUserForm.password = $secret.encrypt(
              this.submitUserForm.password
            );
          }
          const api = {
            addOperationUsers,
            editOperationUsers,
          };
          api[type === "新增用户" ? "addOperationUsers" : "editOperationUsers"](
            this.submitUserForm
          ).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              if (
                type === "修改用户" &&
                this.$store.state.userInfo.loginName ===
                this.submitUserForm.loginName
              ) {
                location.reload();
                return;
              }
              this.closeEditFormVisible(
                "submitUserForm",
                this.closeEditDialog()
              );
              this.getData();
            }
          });
        }
      });
    },
    // 删除用户
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
          let ids;
          if (type === "one") {
            ids = data.userId;
          } else {
            ids = [];
            for (let item of this.moreSelect) {
              ids.push(item.userId);
            }
            ids = ids.join();
          }

          deleteOperationUsers({
            ids: ids,
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.getData();
              this.moreSelect = [];
            }
          });
        })
        .catch(() => { });
    },
    // 重置密码
    resetPassWord(data) {
      console.log(data);
      const that = this;
      this.$prompt(`请【${data.userName}】输入新密码：`, "修改密码", {
        confirmButtonText: "重置",
        cancelButtonText: "取消",
      })
        .then((password) => {
          console.log(password);

          operationUsersResetPassWord({
            userId: data.userId,
            loginName: data.loginName,
            password: $secret.encrypt(password.value),
          }).then((res) => {
            if (res.code === 0) {
              that.$message.success("修改成功");
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
      const result = await operationUsers(params)
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
  loginName: [
    { required: true, message: "登录账号为必填项！", trigger: "blur" },
    { pattern: /^[A-Za-z0-9]+$/, message: "只能为数字、字母", trigger: "blur" },
    {
      min: 2,
      max: 48,
      message: "长度在 2 到 48 个字符",
      trigger: "blur",
    },
  ],
  deptCode: [{ required: true, message: "组织为必选项！" }],
  userName: [
    { required: true, message: "客户姓名为必填项！", trigger: "blur" },
    {
      pattern: /^[\u4e00-\u9fa5]*$/,
      message: "只能为中文名字",
      trigger: "blur",
    },
    {
      min: 2,
      max: 12,
      message: "长度在 2 到 12 个字符",
      trigger: "blur",
    },
  ],
  phonenumber: [
    { required: true, message: "联系方式为必填项！", trigger: "blur" },
    { pattern: /^[0-9]+$/, message: "只能为数字", trigger: "blur" },
    {
      min: 7,
      max: 16,
      message: "长度在 7 到 16 个字符",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "邮箱为必填项！", trigger: "blur" },
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: "规则错误",
      trigger: "blur",
    },
    {
      min: 5,
      max: 48,
      message: "长度在 5 到 48 个字符",
      trigger: "blur",
    },
  ],
  roleIds: [
    {
      type: "array",
      required: true,
      message: "至少选择一个用户赋予的角色",
      trigger: "change",
    },
  ],
  status: [{ required: true, message: "账号的状态必选！", trigger: "change" }],
};
</script>

<style lang="less" scoped>
::v-deep .organization-panel {
  .el-card__body {
    .el-tree {
      max-height: 200px;
      overflow: auto;
    }
  }
}
</style>
