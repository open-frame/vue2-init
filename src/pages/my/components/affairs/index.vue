<template>
  <el-tabs tab-position="right" v-model="activePane">
    <el-tab-pane v-for="item in components" :key="item.id" :label="item.name" :name="item.id">
      <component v-if="activePane === item.id" :is="item.component" :ref="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-24 11:41:11  星期四
 * @description   个人中心
 */

export default {
  name: "",
  components: {
    "my-backlog": () => import("./backlog.vue"),
    "my-finished": () => import("./finished.vue")
  },
  data() {
    return {
      components,
      activePane: "0" // 当前停留的面板
    };
  },
};

const components = [
  {
    id: "0",
    name: "待办",
    component: "my-backlog"
  },
  {
    id: "1",
    name: "已办",
    component: "my-finished"
  }
]
</script>

<style lang="less" scoped></style>
