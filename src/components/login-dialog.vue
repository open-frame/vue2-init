<template>
  <el-dialog width="20%" :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="false"
    :visible="$store.state.loginDialog" title="重新登陆" :before-close="close">
    <div slot="title" class="text-center fw-bold">重新登陆</div>
    <el-form v-loading="loginLoading" :element-loading-text="loginText" element-loading-spinner="i-fa:loading"
      element-loading-custom-class="login-loading" :model="form" :rules="rules" ref="ruleForm" @submit.native.prevent>
      <el-form-item prop="username">
        <div class="input-group mb-3">
          <span class="input-group-text bg-transparent border-end-0">
            <i class="i-fa:user"></i>
          </span>
          <input type="text" v-model="form.username" class="form-control border-start-0" placeholder="请输入登陆账号"
            @keyup.enter="accountLogin('ruleForm')" />
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="input-group mb-3">
          <span class="input-group-text bg-transparent border-end-0">
            <i class="i-fa:key"></i>
          </span>
          <input type="password" v-model="form.password" class="form-control border-start-0" placeholder="请输入账号密码"
            @keyup.enter="accountLogin('ruleForm')" />
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="flex justify-content-around">
      <el-button plain type="primary" :disabled="loginLoading" @click="accountLogin('ruleForm')">
        登陆
      </el-button>
      <el-button plain @click="logout">退出</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * @author        全易
 * @time          2022-03-09 09:20:15  星期三
 * @description   登陆
 **/
import { login } from "@/service/api/login.js";
import $secret from "@/utils/secret.js";

export default {
  name: "login-dialog",
  data() {
    this.rules = rules;
    return {
      form: {
        username: "",
        password: "",
      },
      loginLoading: false,
      loginText: "使劲登录中...",
    }
  },
  methods: {
    // 账号登录
    accountLogin(formName) {
      this.loginText = "正在登录";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          this.loginLoading = true;
          login({
            username: this.form.username,
            password: $secret.encrypt(this.form.password),
          }).then((res) => {
            if (res.errorCode === 200) {
              localStorage.setItem("token", res.data.access_token);
              this.getUserInfo();
            } else {
              this.$message.error(res.errorMsg)
              this.loginLoading = false;
            }
          });
        }
      });
    },
    // 用户资料
    getUserInfo() {
      this.loginText = "正在匹配用户";
      this.$store
        .dispatch("userInfo")
        .then((res) => {
          if (res.code === 0) {
            this.$store.commit("setUserInfo", res.data);
            this.getRouters();
          }
        })
        .catch(() => {
          this.loginLoading = false;
        });
    },
    // 获取权限路由
    getRouters() {
      this.loginText = "正在分配权限";
      this.$store
        .dispatch("routers")
        .then((res) => {
          if (res.code === 0) {
            this.$store.commit("setRouters", res.data);
            this.$store.commit("setMenu", res.data);
            this.close();
          } else {
            this.loginLoading = false;
          }
        })
        .catch(() => {
          this.loginLoading = false;
        });
    },
    logout() {
      this.close();
      this.$router.replace({
        path: "/logon",
      });
      sessionStorage.clear();
      localStorage.clear();
    },
    close() {
      this.$store.commit("openLoginDialog", false);
    },
  },
};

const rules = {
  username: [
    { required: true, message: "请输入登陆账号", trigger: "blur" },
    {
      pattern: /^[^<|>|(|)|+|-|*|/|%|=|{|}]*$/,
      message: "禁止< > ( ) + - * / % = { }等特殊字符",
      trigger: "blur",
    },
    {
      min: 2,
      max: 48,
      message: "长度在 2 到 48 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入账号密码", trigger: "blur" },
    {
      pattern: /^[^<|>|(|)|+|-|*|/|%|=]*$/,
      message: "禁止< > ( ) + - * / % = 等特殊字符",
      trigger: "blur",
    },
    {
      min: 3,
      max: 48,
      message: "长度在 3 到 48 个字符",
      trigger: "blur",
    },
  ],
};
</script>

<style lang="less" scoped>
.login-btn {
  background-image: linear-gradient(to right, #0598d0, #98cc7e);
}

.login-loading {
  background-color: rgb(201 248 237 / 54%);
  backdrop-filter: blur(2px);
}
</style>