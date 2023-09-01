<template>
  <el-main class="p-0 bg-light d-flex">
    <nav-menu mode="vertical" :class="['border-0 edo-menu', $store.state.isCollapse?'':'no-collapse']" :collapse="$store.state.isCollapse" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu" :background-color="themeColor['edo-bg-color']" :text-color="themeColor['edo-text-color']" />
    <el-container class="w-100 d-block view">
      <edo-nav class="mb-3" />
      <pages-tab />
      <keep-alive :exclude="exclude" :include="include">
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
import themeColor from "./theme.json"
import { NavMenu } from 'element-navmenu_vue'
import edoNav from "@/components/nav/index.vue";
import PagesTab from "@/components/opened-page";


export default {
  name: "container-1",
  components: { NavMenu,edoNav, PagesTab },
  data() {
    return {
      themeColor
    };
  },
   props: {
    exclude: {
      type: Array,
      required: true
    },
    include: {
      type: Array,
      required: true
    }
  }
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