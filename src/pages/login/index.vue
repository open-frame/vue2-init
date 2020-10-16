<template>
  <div class="login">
    <h1 class="title">平台名称 平台名称</h1>
    <el-card class="card">
      <h3>登录</h3>
      <el-divider />
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="xa">
          <el-input
            prefix-icon="el-icon-user"
            clearable
            v-model="form.xa"
            placeholder="请输入登陆账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="xb">
          <el-input
            show-password
            prefix-icon="el-icon-key"
            clearable
            v-model="form.xb"
            placeholder="请输入账号密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login('ruleForm')"
            style="width: 100%"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from "@/service/api";

export default {
  name: "login",
  data() {
    return {
      form: {
        xa: "admin",
        xb: "123456",
        xCode: "",
        re: "",
      },
      rules: {
        xa: [
          { required: true, message: "请输入登陆账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        xb: [
          { required: true, message: "请输入账号密码", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          // api
          //   .login(this.form)
          //   .then((res) => {
          //     console.log("登陆：", res);
          //     if (res.code === 0) {
                sessionStorage.setItem(
                  "token",
                  "user-94be07c7-2ebc-4cf7-924a-6f574d306dcc"
                );
                this.$router.push({
                  path: "/",
                });
            //   }
            // })
            // .catch((error) => {
            //   throw error;
            // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  min-height: 100vh;
  background-image: url("../../assets/images/login-bg.jpg");
  .title {
    padding-top: 40px;
    color: #aeeff7;
    text-align: center;
    font-size: 60px;
  }
  /deep/.card {
    max-width: 500px;
    min-width: 300px;
    margin: 150px auto;
    text-align: center;
    background-color: rgba(9, 140, 162, 0.3);
    box-shadow: 5px 5px 35px rgba(0, 0, 0, 0.5);
    border: none;
    color: #aeeff7;
    .el-divider {
      background-color: #aeeff7;
    }
    .el-input__prefix,
    .el-input__suffix {
      color: #aeeff7;
    }
    input {
      background-color: transparent;
      border-color: #00171f;
      color: #aeeff7;
      &::placeholder {
        color: #aeeff7;
      }
    }
  }
}
</style>
