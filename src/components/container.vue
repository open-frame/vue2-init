<template>
  <el-main :class="['p-0 bg-light', show ? 'd-flex' : 'd-none']">
    <nav-menu :class="['border-0 edo-menu', $store.state.isCollapse?'':'no-collapse']" :collapse="$store.state.isCollapse" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu" background-color="#2f3332" text-color="#fff" />
    <el-container class="w-100 d-block view">
      <edo-nav />
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
import edoNav from "@/components/nav";
import PagesTab from "@/components/opened-page";
import excludeKeepAlivePages from "@/config/exclude-keep-alive-pages.json";


export default {
  name: "",
  components: { NavMenu,edoNav, PagesTab },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  watch:{
    "$store.state.openedPages": {
      deep: true, // 深度监听 属性的变化
      handler(now) {
        // console.log(now) //页签长度发生变化说明缓存也要发生变化
        this.includeKeepAlivePages = now.map(item=>{
          return item.name
        })
      }
    },
  },
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