<template>
  <div class="grid grid-items-center logon">
    <div>
      <div class="container m-auto">
        <img src="~@/assets/images/logo.png" class="img-fluid" alt="logo" />
      </div>
      <div class="flex  content">
        <div class="text-end left">
          <img class="img-fluid" src="~@/assets/images/login/login-attach.png" alt="登录配图" />
        </div>
        <div class=" bg-white flex-self-center shadow-lg p-5 rounded login-panel" v-loading="loginLoading"
          :element-loading-text="loginText" element-loading-spinner="i-fa:loading"
          element-loading-custom-class="login-loading">
          <h5 class="text-xl m-0 text-center fw-bold login-title">账号密码登录</h5>
          <el-divider />
          <el-form class="mt-5 mb-5" :model="form" :rules="rules" ref="ruleForm" @submit.native.prevent>
            <el-form-item prop="username">
              <el-input type="text" v-model="form.username" class="form-control border-t-none" placeholder="请输入登陆账号"
                @keyup.enter="accountLogin('ruleForm')">
                <i slot="prepend" class="i-fa:user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" class="form-control border-t-none" placeholder="请输入账号密码"
                @keyup.enter="accountLogin('ruleForm')">
                <i slot="prepend" class="i-fa:key"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button plain type="primary" :disabled="loginLoading"
            class="w-full important-text-white border-none rounded-5 login-btn" @click="accountLogin('ruleForm')">
            登陆
          </el-button>
        </div>
      </div>
    </div>
    <copy-right />
  </div>
</template>

<script>
import { login } from "./api.js";
import $secret from "@/utils/secret.js";
import copyRight from "@/layout/copy-right.vue";


export default {
  name: "login-page",
  components: {
    copyRight,
  },
  data() {
    this.rules = rules;
    return {
      form: {
        username: "",
        password: "",
      },
      loginLoading: false,
      loginText: "使劲登录中...",
    };
  },
  created() {
    const hasMenu = this.$store.state.permissionMenu.length > 0;
    const userInfo = this.$store.state.userInfo;
    const token = localStorage.getItem("token");
    if (token && hasMenu && userInfo.userName) {
      return this.$router.replace("/");
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
      this.loginText = "正在查询用户";
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

            this.$store.commit("setDefaultPage", "/");
            this.$router.replace("/");
          } else {
            this.loginLoading = false;
          }
        })
        .catch(() => {
          this.loginLoading = false;
        });
    }
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
.logon {
  height: 100vh;
  overflow: hidden;
}

.content {
  max-height: 66vh;
  background-color: #e5fef8;

  .left {
    width: 70%;

    .img-fluid {
      width: 80%;
      margin-top: -7%;
    }
  }

  .login-panel {
    max-width: 330px;
    min-width: 280px;

    .login-title {
      background-image: linear-gradient(to right, #0598d0, #98cc7e);
      -webkit-background-clip: text;
      color: transparent;
    }

    .input-group-text {
      width: 41px;
    }

    /deep/.el-form-item__error {
      margin-top: -15px;
    }

    .login-btn {
      background-image: linear-gradient(to right, #0598d0, #98cc7e);
    }
  }
}

.login-loading {
  background-color: rgb(201 248 237 / 54%);
  backdrop-filter: blur(2px);
}
</style>
