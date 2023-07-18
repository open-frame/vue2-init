<template>
  <el-card class="my-center">
    <el-tabs v-model="activePane">
      <el-tab-pane label="任务" name="0">
        <my-affairs />
      </el-tab-pane>
      <el-tab-pane label="动态" name="1">
        <my-trends />
      </el-tab-pane>
      <el-tab-pane label="备忘录" name="2">
        <my-memo />
      </el-tab-pane>
      <el-tab-pane label="登陆日志" name="3">登陆日志</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-24 11:41:11  星期四
 * @description   个人中心
 */

export default {
  page:"个人中心",
  name: "my-index",
  components: {
    "my-affairs": () => import("./components/affairs/index.vue"),
    "my-trends": () => import("./components/my-trends/index.vue"),
    "my-memo": () => import("./components/my-memo/index.vue"),
  },
  data() {
    return {
      activePane: "0" // 当前停留的面板
    };
  },
};
</script>

<style lang="less" scoped></style>
