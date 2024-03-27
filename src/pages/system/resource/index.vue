<template>
  <el-card class="menus">
    <el-row :gutter="40" class="filters">
      <el-col :span="4">
        <el-input clearable size="medium" v-model="queryForm.menuName" placeholder="资源名称" @change="pageReset"
          @keyup.enter.native="getData"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select filterable default-first-option clearable size="medium" v-model="queryForm.visible" placeholder="资源状态"
          @change="pageReset">
          <el-option v-for="item in dropdowns.visible" :key="item.code_value" :label="item.code_name"
            :value="item.code_value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="16" class="text-end">
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="queryReset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <eida-table :loading="loading" :data="tableData" height="550" row-key="menuId" :page-size="queryForm.pageSize"
      :current-page="queryForm.pageNum">
      <template v-slot:left>
        <el-button v-permission="'function_edit'" size="small" icon="el-icon-plus"
          @click="editingMenu('add')">新增</el-button>
      </template>
      <!-- <template v-slot:right>
        表头上右侧容器
    </template> -->
      <template v-slot:columns>
        <el-table-column prop="menuName" label="资源名称" width="180" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="menuId" label="id">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="orderNum" label="显示排序">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="资源类型" width="90">
          <template slot-scope="scope">
            {{ scope.row.menuType | CodeTransforText(dropdowns.menuType, { name: "code_name", value: "code_value" }) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="资源状态" width="90">
          <template slot-scope="scope">
            {{ scope.row.visible | CodeTransforText(dropdowns.visible) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="perms" label="权限标识">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createBy" label="创建人">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button plain v-permission="'function_edit'" type="primary" size="mini"
              @click="editingMenu('add', scope.row)">新增</el-button>
            <el-button plain v-permission="'function_edit'" size="mini"
              @click="editingMenu('modification', scope.row)">编辑</el-button>
            <el-button plain v-permission="'function_delete'" size="mini" type="danger"
              @click="deletMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </eida-table>

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
        <template v-if="submitMenuForm.menuType != '3'">
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
          <el-select clearable filterable allow-create default-first-option v-model="submitMenuForm.icon" placeholder="">
            <el-option v-for="(item, index) in icons" :key="index" :label="item.name" :value="item.name"
              class="d-flex justify-content-between align-items-center">
              <i :class="[item.name, 'fs-3']"></i>
              <span class="text-black-50">{{ item.name }}</span>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSeeDetail">取 消</el-button>
        <el-button type="primary" @click="submitForm('submitMenuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2023-10-05 16:36:03  星期一
 * @description   资源管理
 */
import api from "@/service/api/management";
import { dropdownsAPI } from "@/service/public.js";
import icons from "@/assets/json/icons.json";
import { permission } from '@/directives/index.js'
import { CodeTransforText } from 'code-transfor-text_vue'
import { queryReset, pageReset } from "@/mixins/index.js"

export default {
  name: "system-resource-index",
  mixins: [queryReset, pageReset],
  directives: {
    permission
  },
  filters: {
    CodeTransforText
  },
  data() {
    return {
      loading: false,
      tableData: [],
      queryForm: {
        menuName: "",
        visible: "",
        pageSize: this.$tableDataSize,
        pageNum: 1,
      },
      dialogVisible: false,
      dialogText: "",
      icons: icons,
      treeProps: {
        children: "children",
        label: "label",
      },
      editMenuTreeData: [],
      dropdowns: {
        menuType: menuTypeDemo,
        visible: [],
        remark: []
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
      rules
    };
  },
  created() {
    this.getData();
    // this.getDropdowns();
  },
  watch: {
    // 监听资源类型选择
    "submitMenuForm.menuType"(now) {
      console.log(now);
      this.rules.orderNum[0].required = !["5", "1"].includes(now);
      this.rules.icon[0].required = ["3", "4"].includes(now);

      if (now === "3") {
        this.submitMenuForm.url = "";
        this.submitMenuForm.remark = "";
      }
    },
    // 监听文件地址选择
    "submitMenuForm.remark"(now) {
      console.log(now);
      this.submitMenuForm.url = now ? "/" + now.replace("/index", "") : "";
      this.submitMenuForm.perms = now ? now.replace(/\//g, "-") : "";
    }
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
      this.loading = true;
      this.tableData = [];
      api.menuResource(this.queryForm).then((res) => {
        if (res.code === 0) {
          this.loading = false;
          this.tableData = res.data.menuList;

          this.editMenuTreeData = [];
          // this.flattening(res.data);
        }
      });
    },
    getPagesFile() {
      this.dropdowns.remark = [];
      const files = require.context('@/pages/', true, /.vue$/).keys();
      // console.log(files)
      files.filter(item => {
        const path = item.replace("./", "").replace(".vue", "");
        // @/pages/components ｜ modules ｜panel目录都不算页面
        if (!path.includes("components") && !path.includes("modules") && !path.includes("panel")) {
          this.dropdowns.remark.push(path)
        }
      })
      // console.log(this.dropdowns.remark)
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
    closeSeeDetail() {
      this.dialogVisible = false;
      this.$refs["submitMenuForm"].resetFields();
      this.submitMenuForm.parentName = "";
      this.submitMenuForm.parentId = "";
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
          api
            .deleteMenu({
              menuId: row.menuId,
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("删除成功");
                this.getData();
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
    { required: true, message: "请输入权限标识", trigger: "blur" },
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
  menuType: [
    { required: true, message: "请选择资源类型", trigger: "change" },
  ],
  visible: [
    { required: true, message: "请选择资源状态", trigger: "change" },
  ],
  url: [
    { required: true, message: "请输入页面请求地址", trigger: "change" },
    {
      pattern: /^[^<|>|(|)|+|*|%|=|{|}]*$/,
      message: "禁止< > ( ) + * % = { }等特殊字符",
      trigger: "blur",
    },
    {
      min: 3,
      max: 128,
      message: "长度在 3 到 128 个字符",
      trigger: "blur",
    },
  ],
  icon: [
    { required: true, message: "请选择形象图标", trigger: "change" },
  ],
  remark: [
    { required: true, message: "请选择资源文件的地址", trigger: "change" },
  ],
}

const menuTypeDemo = [
  {
    "code_value": "0",
    "code_name": "全屏" // 表示没有菜单栏和顶部条，将业务页面整个显示在浏览器里
  },
 {
    "code_value": "1",
    "code_name": "全局" // 表示不在菜单栏显示，但会在项目整个任意地方可以点进去，比如个人中心、我的资料
  },
  {
    "code_value": "2",
    "code_name": "外链"
  },
 {
    "code_value": "3",
    "code_name": "目录"
  },
  {
    "code_value": "4",
    "code_name": "菜单"
  },
  {
    "code_value": "5",
    "code_name": "按钮" // 表示页面需要显示的摁钮、模块之类的控制
  }
]
</script>

<style lang="less" scoped></style>
