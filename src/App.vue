<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("routers").then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.$store.commit("setRouters", res.data.menuList);
          this.$store.commit("setMenu", res.data.menuList);
        }
      });
    }
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
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
