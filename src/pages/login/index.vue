<template>
  <div class="d-grid align-items-center logon">
    <div>
      <div class="container">
        <img src="~@/assets/images/logo.png" class="img-fluid" alt="logo" />
      </div>
      <div class="row align-self-center content">
        <div class="col-9 text-end left">
          <img class="img-fluid" src="~@/assets/images/login/login-attach.png" alt="登录配图" />
        </div>
        <div class="col-3 bg-white  align-self-center shadow-lg p-3 rounded login-panel" v-loading="loginLoading"
          :element-loading-text="loginText" element-loading-spinner="fa fa-loading"
          element-loading-custom-class="login-loading">
          <h5 class="text-center fw-bold login-title">账号密码登录</h5>
          <hr class="mt-4 mb-4" />
          <el-form :model="form" :rules="rules" ref="ruleForm" @submit.native.prevent>
            <el-form-item prop="username">
              <div class="input-group mb-3">
                <span class="input-group-text bg-transparent border-end-0">
                  <i class="fa fa-user"></i>
                </span>
                <input type="text" v-model="form.username" class="form-control border-start-0" placeholder="请输入登陆账号"
                  @keyup.enter="accountLogin('ruleForm')">
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="input-group mb-3">
                <span class="input-group-text bg-transparent border-end-0">
                  <i class="fa fa-key"></i>
                </span>
                <input type="password" v-model="form.password" class="form-control border-start-0" placeholder="请输入账号密码"
                  @keyup.enter="accountLogin('ruleForm')">
              </div>
            </el-form-item>
            <el-form-item>
              <button plain :disabled="loginLoading" class="w-100 text-white border-0 rounded-3 login-btn"
                @click="accountLogin('ruleForm')">登录</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2023-06-29 16:38:30  星期四
 * @description   登录页
 */
import api from "@/service/api/login";

export default {
  name: "login-page",
  data() {
    return {
      previous: "/",
      form: {
        username: "",
        password: "",
      },
      rules,
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

    if (
      !["/404", "/logon"].includes(this.$route.query.previous) &&
      this.$route.query.previous !== ""
    ) {
      this.previous = this.$route.query.previous || "/";
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
          api.login(this.form).then(res => {
            if (res.errorCode === 200) {
              localStorage.setItem("token", res.data.access_token);
              this.getUserInfo();
            } else {
              this.$essage.error(res.errorMsg);
              this.loginLoading = false;
            }
          })
        }
      });
    },
    // 用户资料
    getUserInfo() {
      this.loginText = "正在匹配用户";
      this.$store.dispatch("userInfo").then((res) => {
        if (res.code === 0) {
          this.$store.commit("setUserInfo", res.data);
          this.getRouters();
        }
      }).catch(() => {
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
            this.setDefaultPage();
          } else {
            this.loginLoading = false;
          }
        })
        .catch(() => {
          this.loginLoading = false;
        });
    },
    // 设置停留页
    async setDefaultPage() {
      let flatRoute = [];
      (function flattening(menu) {
        menu.map((item) => {
          // console.log(item);
          if (item.children) {
            flattening(item.children); // 递归执行
          }
          flatRoute.push(item);
        });
      })(this.$store.state.permissionMenu);
      // console.log(flatRoute);

      const menuId = flatRoute.find((item) => {
        return item.url === this.previous;
      });
      console.log(menuId);
      this.$store.commit("setDefaultPage", menuId || "/");
      this.$router.replace(this.previous);
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
.logon {
  height: 100vh;
  overflow: hidden;
}

.content {
  max-height: 66vh;
  background-color: #e5fef8;

  .left {
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
