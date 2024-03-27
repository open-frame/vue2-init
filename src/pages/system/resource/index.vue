<template>
  <el-card class="menus">
    <data-filter :loading="tableLoading" :btnSpan="12" :getData="getData" :queryReset="queryReset">
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.menuName" placeholder="资源名称" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
      <el-col :span="4">
        <clw-input clearable size="medium" v-model="queryForm.url" placeholder="页面路径" @change="pageReset"
          @keyup.enter.native="getData"></clw-input>
      </el-col>
      <el-col :span="4">
        <clw-select filterable default-first-option clearable size="medium" v-model="queryForm.visible" placeholder="资源状态"
          @change="pageReset">
          <el-option v-for="item in dropdowns.visible" :key="item.code_value" :label="item.code_name"
            :value="item.code_value"></el-option>
        </clw-select>
      </el-col>
    </data-filter>
    <el-divider />
    <custom-table ref="table" :loading="tableLoading" :data="tableData" height="550" row-key="menuId"
      :page-size="queryForm.pageSize" :current-page="queryForm.pageNum">
      <template v-slot:left>
        <el-button v-permission="'function_edit'" size="small" icon="el-icon-plus"
          @click="editingMenu('add')">新增</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column show-overflow-tooltip prop="menuName" label="资源名称" width="120">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="menuId" label="id">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="parentId" label="父id">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="menuType" label="资源类型" width="90">
          <template slot-scope="scope">
            {{ scope.row.menuType | transfortext(dropdowns.menuType) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="visible" label="资源状态" width="90">
          <template slot-scope="scope">
            {{ scope.row.visible | transfortext(dropdowns.visible) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="perms" label="权限标识">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createBy" label="创建人">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button v-permission="'function_edit'" type="primary" size="mini"
              @click="editingMenu('add', scope.row)">新增</el-button>
            <el-button v-permission="'function_edit'" size="mini"
              @click="editingMenu('modification', scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </custom-table>
    <el-dialog :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="false"
      :title="dialogText + '资源'" :visible.sync="dialogVisible" :before-close="closeSeeDetail">
      <el-form :model="submitMenuForm" :rules="rules" ref="submitMenuForm" label-width="100px">
        <el-form-item label="上级资源">
          <el-select filterable clearable default-first-option v-model="submitMenuForm.parentId" placeholder="">
            <el-option v-for="item in editMenuTreeData" :key="item.menuId" :label="item.menuName"
              :value="item.menuId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" prop="menuName">
          <el-input v-model="submitMenuForm.menuName" clearable></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="menuType">
          <el-select filterable clearable default-first-option v-model="submitMenuForm.menuType" placeholder="">
            <el-option v-for="item in dropdowns.menuType" :key="item.code_value" :label="item.code_name"
              :value="item.code_value"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="submitMenuForm.menuType !== 'M'">
          <el-form-item label="文件地址" prop="remark">
            <el-select filterable clearable allow-create default-first-option v-model="submitMenuForm.remark"
              placeholder="">
              <el-option v-for="item in dropdowns.remark" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="访问地址" prop="url">
            <el-input v-model="submitMenuForm.url" clearable></el-input>
          </el-form-item>
        </template>
        <el-form-item label="权限标识" prop="perms">
          <el-input v-model="submitMenuForm.perms" clearable :readonly="dialogText === '修改'"></el-input>
        </el-form-item>
        <el-form-item label="显示排序" title="就是资源的顺序排位" prop="orderNum">
          <el-input v-model="submitMenuForm.orderNum" clearable></el-input>
        </el-form-item>
        <el-form-item label="标志图标" prop="icon">
          <el-select clearable filterable allow-create default-first-option v-model="submitMenuForm.icon" placeholder=""
            popper-class="icon-drop" :popper-append-to-body="false" @visible-change="getMenuIcon">
            <span slot="prefix" :class="submitMenuForm.icon"></span>
            <el-option v-for="(item, index) in dropdowns.icons" :key="index" :label="item" :value="item"
              class="flex flex-justify-center flex-items-center">
              <i :class="[item, 'text-xl']"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源状态" title="如果创建的是目录，设置隐藏，其子页都会隐藏" prop="visible">
          <el-select filterable default-first-option clearable size="medium" v-model="submitMenuForm.visible"
            placeholder="">
            <el-option v-for="item in dropdowns.visible" :key="item.code_value" :label="item.code_name"
              :value="item.code_value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeSeeDetail">取 消</el-button>
        <el-button type="primary" @click="submitForm('submitMenuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:36:03  星期一
 * @description   资源管理
 */
import { menuResource, addMenu, editMenu, deleteMenu } from "../api.js";
import { dropdownsAPI } from "@/service/public.js";
import icons from "@/assets/icons/fa.json";
import { transfortext } from "@/filters/index.js";
import { permission } from "@/directives/index.js";
import { queryReset, pageReset, parseParmas } from "@/mixins/index.js";


let iconPageNum = 100;
export default {
  name: "system-resource-index",
  mixins: [queryReset, pageReset, parseParmas],
  filters: {
    transfortext,
  },
  directives: {
    permission
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      queryForm: {
        url: "",
        menuName: "",
        visible: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      dialogVisible: false,
      dialogText: "",
      editMenuTreeData: [],
      dropdowns: {
        icons: icons.slice(0, iconPageNum),
        menuType: [],
        visible: [],
        remark: [],
      },
      submitMenuForm: {
        parentId: "",
        menuType: "",
        menuName: "",
        url: "",
        perms: "",
        orderNum: "",
        icon: "",
        visible: "",
        remark: "",
      },
      rules,
    };
  },
  created() {
    this.getDropdowns();
  },
  watch: {
    // 监听资源类型选择
    "submitMenuForm.menuType"(now) {
      console.log(now);
      this.rules.remark[0].required = !["F", "M"].includes(now);
      this.rules.url[0].required = !["F", "M"].includes(now);
      this.rules.orderNum[0].required = !["F", "1"].includes(now);
      this.rules.icon[0].required = ["M", "C"].includes(now);
    },
    // 监听文件地址选择
    "submitMenuForm.remark"(now) {
      console.log(now);
      // this.submitMenuForm.url = now ? "/" + now.replace("/index", "") : "";
      this.submitMenuForm.perms = now ? now.replace(/\//g, "-") : "";
    },
  },
  methods: {
    getDropdowns() {
      // 资源类型
      dropdownsAPI("746035").then((res) => {
        if (res.code === 0) {
          this.dropdowns.menuType = res.data;
        }
      });
      // 资源状态
      dropdownsAPI("063656").then((res) => {
        if (res.code === 0) {
          this.dropdowns.visible = res.data;
        }
      });
    },
    getData() {
      this.tableLoading = true;
      this.tableData = [];
      menuResource(this.queryForm).then((res) => {
        if (res.code === 0) {
          this.tableLoading = false;
          this.tableData = res.data;

          this.editMenuTreeData = [];
          this.flattening(res.data);
        }
      }).catch(() => {
        this.tableLoading = false;
      })
    },
    getPagesFile() {
      this.dropdowns.remark = [];
      const files = require.context("@/pages/", true, /.vue$/).keys();
      // console.log(files)
      files.filter((item) => {
        const path = item.replace("./", "").replace(".vue", "");
        if (
          !path.includes("components") &&
          !path.includes("modules") &&
          !path.includes("panel")
        ) {
          this.dropdowns.remark.push(path);
        }
      });
      // console.log(this.dropdowns.remark)
    },
    // 异步获取图标
    async getMenuIcon() {
      if (this.dropdowns.icons.length >= icons.length) {
        return;
      }

      const page = Math.ceil(icons.length / iconPageNum);
      for (let i = 2; i <= page; i++) {
        const data = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(icons.slice((i - 1) * iconPageNum, i * iconPageNum))
          }, 888)
        })
        this.dropdowns.icons.push(...data);
      }
      // console.log(this.dropdowns.icons, icons);
    },
    // 打开添加/修改 资源面板
    editingMenu(status, data) {
      console.log(status, data);
      this.getPagesFile();
      this.dialogVisible = true;
      if (status === "add") {
        this.dialogText = "新增";
        delete this.submitMenuForm.menuId;
        if (data) {
          this.submitMenuForm.parentId = data.menuId;
          this.submitMenuForm.parentName = data.menuName;
        }
      } else {
        setTimeout(() => {
          this.dialogText = "修改";
          this.submitMenuForm = { ...data };
        }, 200);
      }
    },
    // 添加/修改用户时，选择组织
    editMenuTreeClick(data) {
      console.log(data);
      this.submitMenuForm.parentId = data.menuId;
      this.submitMenuForm.parentName = data.label;
    },
    // 过滤树节点
    filterTreeNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 过滤树节点
    filterMenu(val) {
      if (this.dialogText === "新增") {
        this.$refs.editMenuTree.filter(val);
      }
    },
    // 关闭查看数据详情
    closeSeeDetail(done) {
      this.dialogVisible = false;
      this.$refs["submitMenuForm"].resetFields();
      this.submitMenuForm.parentName = "";
      this.submitMenuForm.parentId = "";
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const api = {
            addMenu, editMenu
          }
          api[this.dialogText === "新增" ? "addMenu" : "editMenu"](
            this.submitMenuForm
          ).then((res) => {
            if (res.code === 0) {
              if (
                this.dialogText === "修改" &&
                this.$store.state.permissionRouters.includes(
                  this.submitMenuForm.perms
                )
              ) {
                location.reload();
                return;
              }
              this.closeSeeDetail();
              this.getData();
              this.$message.success(res.msg);
            }
          });
        }
      });
    },
    // 删除资源
    deletMenu(row) {
      console.log(row);
      this.$confirm(`【${row.menuName}】删除后不可恢复，确认删除？`)
        .then(() => {

          deleteMenu({
            menuId: row.menuId,
          })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("删除成功");
                this.getData();
                this.$store.commit("routers");
              }
            });
        })
        .catch(() => { });
    },
    // 扁平化数据
    flattening(menu) {
      menu.map((item) => {
        // console.log(item);
        if (item.children) {
          this.flattening(item.children); // 递归执行
        }
        this.editMenuTreeData.push(item);
      });
    },
  },
};

const rules = {
  menuName: [
    { required: true, message: "请输入资源名称", trigger: "blur" },
    {
      min: 2,
      max: 12,
      message: "长度在 2 到 12 个字符",
      trigger: "blur",
    },
  ],
  perms: [
    { required: true, message: "请输入权限标识", trigger: "change" },
    {
      pattern: /^[A-Za-z0-9-_/]+$/,
      message: "只能为数字、字母、下划线、右斜线",
      trigger: "blur",
    },
    {
      min: 4,
      max: 128,
      message: "长度在 4 到 128 个字符",
      trigger: "blur",
    },
  ],
  orderNum: [
    { required: true, message: "请输入排序顺序", trigger: "blur" },
    { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
  ],
  menuType: [{ required: true, message: "请选择资源类型", trigger: "change" }],
  visible: [{ required: true, message: "请选择资源状态", trigger: "change" }],
  url: [
    { required: true, message: "请输入页面请求地址", trigger: "change" },
    {
      pattern: /^[^<|>|(|)|+|%|=|{|}]*$/,
      message: "禁止< > ( ) + % = { }等特殊字符",
      trigger: "blur",
    },
    {
      min: 1,
      max: 128,
      message: "长度在 1 到 128 个字符",
      trigger: "blur",
    },
  ],
  icon: [{ required: true, message: "请选择形象图标", trigger: "change" }],
  remark: [
    { required: true, message: "请选择资源文件的地址", trigger: "change" },
  ],
};
</script>

<style lang="less" scoped>
::v-deep .icon-drop {
  .el-scrollbar__view.el-select-dropdown__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-gap: 5px;
    justify-content: center;
  }
}
</style>
