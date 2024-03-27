<template>
  <div class="w-full flex flex-justify-center flex-items-center" style="height: 100vh;">
    <el-result icon="error" title="找不到资源">
      <a slot="subTitle" class="text-xs" :href="VUE_APP_CLW_SERVICE">
        如有需要可联系管理员
      </a>
      <template slot="extra">
        <el-button plain type="primary" @click="$router.back()">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-23 14:26:24  星期三
 * @description   404页
 */

export default {
  name: "page-404",
  data() {
    return {
      VUE_APP_CLW_SERVICE: ""
    }
  },
  created() {
    this.VUE_APP_CLW_SERVICE = process.env.VUE_APP_CLW_SERVICE;

    const hasMenu = this.$store.state.permissionMenu.length === 0;
    const userInfo = this.$store.state.userInfo;
    const token = localStorage.getItem("token");
    if (!token || hasMenu || !userInfo.userName) {
      this.$router.replace("/logon")
    }
  },
};
</script>

<style lang="less" scoped></style>
