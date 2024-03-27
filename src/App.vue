<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.getRouters();
  },
  mounted() {
    // console.log(performance);
    switch (performance.navigation.type) {
      case 0:
        console.log("首次加载出来了");
        break;
      case 1:
        console.log("页面刷新完了");
        break;
    }
  },
  watch: {
    "$store.state.userInfo": {
      deep: true,
      handler(now, old) {
        // 有用户信息了，说明登陆了
        if (Object.keys(now).length) {
          this.$nextTick(async function () {
            // 为了加载登录页面时不加载子应用资源，降低首屏加载的压力
            const microApp = await import("@/utils/micro-app.js");
            microApp.microAppStart(); // 子应用启动
          })
        }
      },
    },
  },
  methods: {
    // 获取权限路由
    getRouters() {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      this.$store.dispatch("routers").then((res) => {
        if (res.code === 0) {
          this.$store.commit("setRouters", res.data);
          this.$store.commit("setMenu", res.data);
          this.getUserInfo();
        }
      });
    },
    // 用户资料
    getUserInfo() {
      this.$store.dispatch("userInfo").then((res) => {
        if (res.code === 0) {
          this.$store.commit("setUserInfo", res.data);
        }
      });
    }
  },
};
</script>

<style lang="less">
// 全局样式文件
@import url("./assets/css/element.less");
@import url("./assets/css/style.less");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
