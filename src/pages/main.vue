<template>
  <el-main class="main" v-loading="$store.state.onLine==='offline'" element-loading-spinner="el-icon-circle-close"  element-loading-text="无网络">
    <el-aside class="menus" style="width: auto">
      <ydMenu />
    </el-aside>
    <el-container class="view">
      <el-header class="nav" style="padding: 0;">
        <ydNav />
      </el-header>
      <OpenedPage v-show="$store.state.showOpenedPages" />
      <keep-alive :include="$store.state.keepAlivePages" :exclude="noKeepAlivePages.join()">
        <router-view class="animate__animated animate__slideInLeft animate__faster pages" :style="style" />
      </keep-alive>
      <!-- <router-view class="animate__animated animate__slideInLeft animate__faster pages" :style="style" /> -->
    </el-container>
  </el-main>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   页面布局整合 入口文件
 */
import ydMenu from "@/components/menu/index";
import ydNav from "@/components/nav";
import OpenedPage from "@/components/opened-page";
import excludeKeepAlivePages from "../router/exclude-keep-alive-pages.json"

export default {
  components: { ydMenu, ydNav, OpenedPage },
  name: "Page-Main",
  data() {
    return {
      noKeepAlivePages:[],
      style: {
        height: "",
      },
    };
  },
  created() {
    this.noKeepAlivePages = excludeKeepAlivePages;
    let number = this.$store.state.showOpenedPages? 124 : 94;
    this.style.height = window.innerHeight - number + "px";
  },
  watch:{
  '$store.state.showOpenedPages'(now,old){
      let number = now ? 124 : 94;
      this.style.height = window.innerHeight - number + "px";
      window.addEventListener("resize", () => {
        this.style.height = window.innerHeight - number + "px";
      });
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fffefc;
  display: flex;
  padding: 0;
  .view {
    height: 100vh;
    overflow: auto;
    width: -webkit-fill-available;
    width: -moz-available;
    .nav{
      margin-bottom: 16px;
    }
    .pages {
      overflow-y: auto;
      margin: 0 15px;
      border-top: none;
    }
  }
}
</style>
