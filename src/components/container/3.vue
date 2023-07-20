<template>
  <el-main class="p-0 bg-light">
    <nav-menu />
    <el-container class="w-100 d-block view">
      <pages-tab class="mt-2" />
      <keep-alive :exclude="excludeKeepAlivePages" :include="includeKeepAlivePages">
        <slot></slot>
      </keep-alive>
    </el-container>
  </el-main>
</template>

<script>
/**
 * @author        全易
 * @time          2023-02-01 14:51:10  星期三
 * @description   页面结构
 **/
import NavMenu from "@/components/nav-menu.vue";
import PagesTab from "@/components/opened-page";
import excludeKeepAlivePages from "@/config/exclude-keep-alive-pages.json";


export default {
  name: "container-1",
  components: { NavMenu, PagesTab },
  data() {
    return {
      excludeKeepAlivePages,
      includeKeepAlivePages: []
    };
  },
};
</script>

<style lang="less" scoped>
.view {
  overflow: auto;
  width: -webkit-fill-available;
  width: -moz-available;
}
</style>