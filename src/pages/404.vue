<template>
  <div class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="content">
      <img class="w-100" src="@/assets/images/no-page.svg" alt="无此页" />
      <h3 class="text-center mt-5">
        <el-button type="text" @click="back">返回</el-button>
        <template v-if="showLogin">
          <el-divider direction="vertical"></el-divider>
          <router-link replace to="/logon">登陆</router-link>
        </template>
      </h3>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2023-12-23 14:26:24  星期三
 * @description   404页
 */

export default {
  name: "page-404",
  beforeRouteEnter(to, from, next) {
    // console.log(to, from);
    next(vm => {
      vm.fromURL = from.fullPath;
    });
  },
  data() {
    return {
      fromURL: "",
    }
  },
  computed: {
    showLogin() {
      const hasMenu = this.$store.state.permissionMenu.length === 0;
      const userInfo = this.$store.state.userInfo;
      const token = localStorage.getItem("token");
      return !token || hasMenu || !userInfo.userName;
    }
  },
  methods: {
    back() {
      this.$router.replace(this.fromURL)
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 65%;
}
</style>
