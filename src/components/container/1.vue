<template>
  <el-main class="p-0 bg-light d-flex">
    <nav-menu  mode="vertical" :class="['border-0 edo-menu', $store.state.isCollapse?'':'no-collapse']" :collapse="$store.state.isCollapse" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu" background-color="#2f3332" text-color="#fff" />
    <el-container class="w-100 d-block view">
      <edo-nav class="mb-3" />
      <pages-tab />
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
import { NavMenu } from 'element-navmenu_vue'
import edoNav from "@/components/nav/index.vue";
import PagesTab from "@/components/opened-page";
import excludeKeepAlivePages from "@/config/exclude-keep-alive-pages.json";


export default {
  name: "container-1",
  components: { NavMenu,edoNav, PagesTab },
  data() {
    return {
      excludeKeepAlivePages,
      includeKeepAlivePages:[]
    };
  },
};
</script>

<style lang="less" scoped>
.view {
  height: 100vh;
  overflow: auto;
  width: -webkit-fill-available;
  width: -moz-available;
}

.edo-menu {
  height: 100vh;
  overflow: auto;
}
.edo-menu.no-collapse{
min-width: 200px;
}
</style>