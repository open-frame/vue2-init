<template>
  <div class="login">
    <canvas id="canvas"></canvas>
    <div class="title text-center">
      <a class="a fw-bold" href="https://esa.edo-iot.com" target="_blank"
        >伊莎能源</a
      >
    </div>

    <el-card class="card">
      <h3>登 录</h3>
      <el-divider />
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            clearable
            v-model="form.username"
            placeholder="请输入登陆账号"
            @keyup.enter.native="accountLogin('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-key"
            clearable
            v-model="form.password"
            placeholder="请输入账号密码"
            @keyup.enter.native="accountLogin('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            plain
            class="login-btn"
            type="primary"
            @click="accountLogin('ruleForm')"
            >登 陆</el-button
          >
          <div class="other-login">
            <span class="text" @click="showOtherLoin = !showOtherLoin"
              >其他登陆方式</span
            >
            <span
              v-show="showOtherLoin"
              class="
                animate__animated animate__slideInLeft animate__faster
                buttons
              "
            >
              <!-- <img
                src="../../assets/images/login/wx-btn.png"
                alt="微信登陆"
                if="wx-login-btn"
                @click="createWXloginScript"
              />
              <img
                src="../../assets/images/login/qq-btn.png"
                alt="QQ登陆"
                if="qq-login-btn"
                @click="createQQloginScript"
              /> -->
              <i
                class="fa fa-qq"
                title="QQ登陆"
                @click="createQQloginScript"
              ></i>
              <i
                class="fa fa-weixin"
                title="微信登陆"
                @click="createWXloginScript"
              ></i>
            </span>
          </div>
        </el-form-item>
        <div class="limitation">
          优先使用
          <a class="a-tag" target="_blank" href="https://www.google.cn/chrome/"
            >chrome浏览器</a
          >
          或
          <a
            class="a-tag"
            target="_blank"
            href="https://www.microsoft.com/zh-cn/edge"
            >edge浏览器</a
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import api from "@/service/api/login";

export default {
  name: "Page-Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入登陆账号", trigger: "blur" },
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
            min: 3,
            max: 48,
            message: "长度在 3 到 48 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: "",
      showOtherLoin: false,
    };
  },
  mounted() {
    this.initBG();
  },
  methods: {
    // 初始化背景图
    initBG() {
      const c = document.querySelector("#canvas");
      let w = (c.width = window.innerWidth),
        h = (c.height = window.innerHeight),
        ctx = c.getContext("2d"),
        opts = {
          len: 46,
          count: 3000,
          baseTime: 10,
          addedTime: 10,
          dieChance: 0.05,
          spawnChance: 1,
          sparkChance: 0.1,
          sparkDist: 10,
          sparkSize: 2,
          color: "hsl(hue,100%,light%)",
          baseLight: 50,
          addedLight: 10,
          shadowToTimePropMult: 6,
          baseLightInputMultiplier: 0.01,
          addedLightInputMultiplier: 0.02,
          cx: w / 2,
          cy: h / 2,
          repaintAlpha: 0.04,
          hueChange: 0.1,
        },
        tick = 0,
        lines = [],
        dieX = w,
        dieY = h / opts.len,
        baseRad = (Math.PI * 2) / 6;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      function loop() {
        window.requestAnimationFrame(loop);
        ++tick;
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(0,0,0,alp)".replace("alp", opts.repaintAlpha);
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        if (lines.length < opts.count && Math.random() < opts.spawnChance)
          lines.push(new Line());
        lines.map(function (line) {
          line.step();
        });
      }

      function Line() {
        this.reset();
      }
      Line.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;
        this.rad = 0;
        this.lightInputMultiplier =
          opts.baseLightInputMultiplier +
          opts.addedLightInputMultiplier * Math.random();
        this.color = opts.color.replace("hue", tick * opts.hueChange);
        this.cumulativeTime = 0;
        this.beginPhase();
      };
      Line.prototype.beginPhase = function () {
        this.x += this.addedX;
        this.y += this.addedY;
        this.time = 0;
        this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
        this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
        this.addedX = Math.cos(this.rad);
        this.addedY = Math.sin(this.rad);
        if (
          Math.random() < opts.dieChance ||
          this.x > dieX ||
          this.x < -dieX ||
          this.y > dieY ||
          this.y < -dieY
        )
          this.reset();
      };
      Line.prototype.step = function () {
        ++this.time;
        ++this.cumulativeTime;
        if (this.time >= this.targetTime) this.beginPhase();
        const prop = this.time / this.targetTime,
          wave = Math.sin((prop * Math.PI) / 2),
          x = this.addedX * wave,
          y = this.addedY * wave;
        ctx.shadowBlur = prop * opts.shadowToTimePropMult;
        ctx.fillStyle = ctx.shadowColor = this.color.replace(
          "light",
          opts.baseLight +
            opts.addedLight *
              Math.sin(this.cumulativeTime * this.lightInputMultiplier)
        );
        ctx.fillRect(
          opts.cx + (this.x + x) * opts.len,
          opts.cy + (this.y + y) * opts.len,
          2,
          2
        );
        if (Math.random() < opts.sparkChance)
          ctx.fillRect(
            opts.cx +
              (this.x + x) * opts.len +
              Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
              opts.sparkSize / 2,
            opts.cy +
              (this.y + y) * opts.len +
              Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
              opts.sparkSize / 2,
            opts.sparkSize,
            opts.sparkSize
          );
      };
      loop();
      window.addEventListener("resize", function () {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        opts.cx = w / 2;
        opts.cy = h / 2;
        dieX = w;
        dieY = h / opts.len;
      });
    },
    // 账号登录
    accountLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form);
          /* this.loading = this.$loading({
            lock: true,
            text: "登陆中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          api
            .login({
              username: this.form.username,
              password: this.$secret.encrypt(this.form.password),
            })
            .then((res) => {
              console.log("登陆：", res);
              this.loading.close();
              if (res.errorCode === 200) {
                localStorage.setItem("token", res.data.access_token);
                this.getRouters();
              } else {
                this.$message.error(res.errorMsg);
              }
            })
            .catch((err) => {
              this.loading.close();
            }); */
            this.$router.push('/')
        } else {
          return false;
        }
      });
    },
    // 创建微信登陆脚本
    createWXloginScript() {
      const hasScript = document.querySelector("#wx-login-script");
      if (hasScript) {
        this.otherLogin("wx");
      } else {
        const WXloginScript = document.createElement("script");
        WXloginScript.setAttribute("id", "wx-login-script");
        WXloginScript.src =
          "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";
        const wxElement = document.body.appendChild(WXloginScript);

        wxElement.onload = () => {
          this.otherLogin("wx");
        };
      }
    },
    // 创建QQ登陆脚本
    createQQloginScript() {
      const hasScript = document.querySelector("#qq-login-script");
      if (hasScript) {
        this.otherLogin("qq");
      } else {
        const QQloginScript = document.createElement("script");
        QQloginScript.src = "https://connect.qq.com/qc_jssdk.js";
        QQloginScript.setAttribute("id", "qq-login-script");
        const QQElement = document.body.appendChild(QQloginScript);

        QQElement.onload = () => {
          console.log(QC);
          this.otherLogin("qq");
        };
      }
    },
    // 第三方登陆
    otherLogin(type) {
      switch (type) {
        case "qq":
          QC.Login.showPopup({
            appId: "101940467",
            redirectURI: "http://www.edo-iot.com/escar/qq/callback",
          });
          break;
        case "wx":
          console.log(WxLogin);
          // var obj = new WxLogin({
          //   id: 'wx-login-container', // 需要显示的容器id
          //   appid: '', // 公众号appid wx*******
          //   scope: 'snsapi_login', // 网页默认即可
          //   redirect_uri: encodeURIComponent(''), // 授权成功后回调的url
          // })
          break;
      }
    },
    // 获取权限路由
    getRouters() {
      this.$store.dispatch("routers").then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$store.commit("setRouters", res.data.menuList);
          this.$store.commit("setMenu", res.data.menuList);
          this.getUserInfo();
        }
      });
    },
    // 用户资料
    getUserInfo() {
      this.$systemAPI.userInfo().then((res) => {
        if (res.code === 0) {
          console.log(res);
          this.$store.commit("setUserInfo", res.data);
          this.$router.replace("/");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  color: #19aa8d;
  height: 100vh;
  overflow: hidden;
  .title {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 60px;
    margin-top: 120px;
    .a {
      color: #19aa8d;
    }
  }
  /deep/.card {
    z-index: 1;
    max-width: 440px;
    min-width: 300px;
    margin: 15% auto 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: none;
    color: #19aa8d;
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
    .login-btn {
      width: 100%;
      margin-top: 40px;
      background: transparent;
    }
    .other-login {
      float: left;
      cursor: pointer;
      .buttons {
        .fa {
          &:hover {
            color: aqua;
          }
        }
      }
    }
    .limitation {
      font-size: 14px;
      .a-tag {
        color: #19aa8d;
      }
    }
  }
  #canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
}
</style>
