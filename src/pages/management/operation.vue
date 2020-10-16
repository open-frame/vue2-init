<template>
  <el-card shadow="never" class="operation">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input
          clearable
          placeholder="输入关键字过滤组织树"
          v-model="filterTreeText"
          style="margin-bottom: 20px"
        >
        </el-input>
        <el-tree
          highlight-current
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterTreeNode"
          ref="tree"
          @node-click="treeClick"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="filter">
          <el-input
            clearable
            v-model="form.loginName"
            placeholder="请输入账号进行检索"
          ></el-input>
          <el-input
            clearable
            v-model="form.phonenumber"
            placeholder="请输入账号进行检索"
            style="margin-left: 20px"
          ></el-input>
          <el-select
            clearable
            v-model="form.status"
            placeholder="请选择用户状态进行检索"
            style="margin: 0 20px"
          >
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
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
          <!-- <div>
            <el-button @click="getData" type="primary">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div> -->
        </div>
        <el-button-group>
          <el-button icon="el-icon-plus" @click="upDataUser('add')"
            >新增</el-button
          >
          <el-button icon="el-icon-delete">删除</el-button>
        </el-button-group>
        <el-table :data="tableData" border @selection-change="selectingdata">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="userId" label="用户ID" width="260">
          </el-table-column>
          <el-table-column prop="loginName" label="登录名称"> </el-table-column>
          <el-table-column prop="userName" label="用户名称"> </el-table-column>
          <el-table-column prop="deptName" label="组织"> </el-table-column>
          <el-table-column prop="phonenumber" label="手机"> </el-table-column>
          <el-table-column prop="status" label="状态"> </el-table-column>
          <el-table-column prop="createTime" label="操作时间">
          </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button @click="editing(scope.row)" type="primary" size="small"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteing(scope.row)"
                >删除</el-button
              >
            </template>
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
    <el-dialog
      :append-to-body="true"
      :modal-append-to-body="false"
      :title="dialogText"
      :visible.sync="dialogVisible"
      :before-close="closeSeeDetail"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="ruleForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="ruleForm.role" multiple filterable placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSeeDetail('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
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
import api from "@/service/api";

export default {
  name: "Operation",
  data() {
    return {
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      treeProps: {
        children: "children",
        label: "label",
      },
      filterTreeText: "",
      time: "",
      form: {
        deptCode: "",
        parentCode: "",
        loginName: "",
        phonenumber: "",
        status: "",
        beginTime: "",
        endTime: "",
        pageSize: 10,
        pageNum: 1,
        orderByColumn: "",
        isAsc: "desc",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      dialogText: "",
      roles: [],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        role: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  watch: {
    filterTreeText(val) {
      this.$refs.tree.filter(val);
    },
    // 监听模态框
    dialogVisible(now, old) {
      if (now) {
        // 打开时
      } else {
        // 关闭时，清除表单验证
        this.$refs["ruleForm"].resetFields();
      }
    },
  },
  created() {
    this.organizationTree();
    this.getData();
  },
  methods: {
    // 选择时间
    selectTime(time) {
      console.log(time);
      this.form.beginTime = time[0];
      this.form.endTime = time[1];
    },
    // 组织树数据
    organizationTree() {
      api
        .organizationTree({
          deptName: "",
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
          }
        })
        .catch((err) => {
          this.$message.error("获取失败");
        });
    },
    //数据
    getData() {
      api
        .operationUsers(this.form)
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
    // 过滤树节点
    filterTreeNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 点击树节点
    treeClick(data) {
      console.log(data);
    },
    // 选择数据
    selectingdata(val) {
      console.log(val);
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
    // 新增修改用户
    upDataUser(status) {
      if (status === "add") {
        this.dialogText = "新增";
      } else {
        this.dialogText = "修改";
      }
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭查看数据详情
    closeSeeDetail(done) {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  margin-bottom: 20px;
}
</style>
