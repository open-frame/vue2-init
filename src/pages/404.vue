<template>
  <div class="no-page">
    <div class="content">
      <img class="pic" src="@/assets/images/no-page.svg" alt="无此页" />
      <h3 class="h3">
        <el-button type="text" @click="$router.back()">返回</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="$router.push('/logon')">登陆</el-button>
      </h3>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-23 14:26:24  星期三
 * @description   404页
 */

export default {
  name: "Page-NoPage",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.no-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 65%;
    .pic {
      width: 100%;
    }
    .h3 {
      text-align: center;
    }
  }
}
</style>
