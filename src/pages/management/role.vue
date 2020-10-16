<template>
  <el-card shadow="never" class="role">
    <el-row :gutter="40">
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.roleName"
          placeholder="请输入角色名称进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          clearable
          v-model="form.roleKey"
          placeholder="请输入权限字符进行检索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          clearable
          v-model="form.status"
          placeholder="请选择角色状态进行检索"
        >
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="text-align: right">
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
        <el-button @click="getData" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-button-group>
      <el-button icon="el-icon-plus" @click="editing">新增</el-button>
      <el-button icon="el-icon-delete">删除</el-button>
    </el-button-group>
    <el-table
      size="small"
      :data="tableData"
      border
      @selection-change="selectingdata"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="roleId" label="角色编号" width="260">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleKey" label="权限字符"> </el-table-column>
      <el-table-column prop="roleSort" label="显示顺序"> </el-table-column>
      <el-table-column prop="status" label="角色状态"> </el-table-column>
      <el-table-column prop="createTime" label="操作时间"> </el-table-column>
      <el-table-column label="操作" width="170">
        <template slot-scope="scope">
          <el-button @click="editing(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="deleteing(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :append-to-body="true"
      :modal-append-to-body="false"
      title="修改角色"
      :visible.sync="dialogVisible"
      :before-close="closeSeeDetail"
    >
      <el-form
        :model="menuForm"
        :rules="rules"
        ref="menuForm"
        label-width="100px"
        class="demo-menuForm"
      >
        <el-form-item label="角色名称：" prop="roleName">
          <el-input clearable v-model="menuForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限字符：" prop="roleKey">
          <el-input clearable v-model="menuForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序：" prop="roleSort">
          <el-input clearable v-model="menuForm.roleSort"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input clearable v-model="menuForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-switch v-model="menuForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="权限：">
          <el-tree
            show-checkbox
            node-key="id"
            :default-checked-keys="['22', '321']"
            highlight-current
            :data="treeData"
            :props="{ children: 'children', label: 'label' }"
            @check="selectMenu"
            ref="tree"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('menuForm')"
          >确 定</el-button
        >
        <el-button @click="closeSeeDetail('menuForm')">取 消</el-button>
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
 * @time          2020-10-05 16:36:26  星期一
 * @description   角色管理
 */
import api from "@/service/api";

export default {
  name: "Role",
  data() {
    return {
      form: {
        roleName: "",
        roleKey: "",
        status: "",
        beginTime: "",
        endTime: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "asc",
      },
      time: "",
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      menuForm: {
        roleId: "",
        roleName: "",
        roleKey: "",
        roleSort: "",
        status: "",
        remark: "",
        menuIds: "",
      },
      filterTreeText: "",
      treeData: [
        {
          id: "1",
          label: "一级 1",
          children: [
            {
              id: "11",
              label: "二级 1-1",
              children: [
                {
                  id: "111",
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          label: "一级 2",
          children: [
            {
              id: "21",
              label: "二级 2-1",
              children: [
                {
                  id: "211",
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              id: "22",
              label: "二级 2-2",
              children: [
                {
                  id: "221",
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          id: "3",
          label: "一级 3",
          children: [
            {
              id: "31",
              label: "二级 3-1",
              children: [
                {
                  id: "311",
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              id: "32",
              label: "二级 3-2",
              children: [
                {
                  id: "321",
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      rules: {
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
            min: 2,
            max: 128,
            message: "长度在 2 到 128 个字符",
            trigger: "blur",
          },
        ],
        roleSort: [
          { required: true, message: "请输入显示顺序", trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  watch: {
    // 监听模态框
    dialogVisible(now, old) {
      if (now) {
        // 打开时
      } else {
        // 关闭时，清除表单验证
        this.$refs["menuForm"].resetFields();
      }
    },
  },
  methods: {
    // 条件查询 - 选择时间
    selectTime(time) {
      console.log(time);
      this.form.beginTime = time[0];
      this.form.endTime = time[1];
    },
    //  重置条件查询
    reset() {
      this.form.roleName = "";
      this.form.roleKey = "";
      this.form.status = "";
      this.form.beginTime = "";
      this.form.endTime = "";
      this.time = "";
      this.getData();
    },
    // 选择数据
    selectingdata(val) {
      console.log(val);
    },
    // 删除角色
    deleteing(data) {
      console.log(data);
      api
        .deleteRole({
          ids: data.roleId,
        })
        .then((res) => {
          this.$message.error(res.msg);
        })
        .catch((err) => {
          this.$message.error("操作失败");
        });
    },
    // 添加、修改角色
    editing(data) {
      console.log(data);
      this.dialogVisible = true;
      if (data.hasOwnProperty("roleId")) {
        this.menuForm = data;
      }
      api
        .menuJurisdiction({
          roleId: data.roleId,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            console.log("菜单树：", res);
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    // 选中的菜单节点
    selectMenu(a, s) {
      console.log(a, s);
    },
    // 确认修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.menuForm);
          api
            .editRole(this.menuForm)
            .then((res) => {
              console.log(res);
              if (res.code === 0) {
                this.closeSeeDetail();
                this.getData();
              }
            })
            .catch((err) => {
              this.$message.error("获取失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭数据详情面板
    closeSeeDetail(formName) {
      this.dialogVisible = false;
    },
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前第: ${val}页`);
      this.form.pageNum = val;
      this.getData();
    },
    // 表格数据
    getData() {
      api
        .roleList(this.form)
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
  },
};
</script>

<style lang="less" scoped>
</style>
