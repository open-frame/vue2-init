<template>
  <main>
    <edo-nav />
    <div class="flex" style="height: calc(100vh - 60px);">
      <nav-menu mode="vertical" :class="[$store.state.isCollapse ? '' : 'no-collapse']" :collapse="$store.state.isCollapse" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu" :background-color="themeColor['edo-bg-color']" :text-color="themeColor['edo-text-color']" />
      <section class="m-3">
        <pages-tab />
        <keep-alive :exclude="exclude" :include="include">
          <slot></slot>
        </keep-alive>
        <copy-right />
      </section>
    </div>
  </main>
</template>

<script>
/**
 * @author        全易
 * @time          2023-02-01 14:51:10  星期三
 * @description   页面结构
 **/
import themeColor from "./theme.json"
import NavMenu  from '@/layout/menu/index.vue'
import edoNav from "@/layout/nav/index.vue";
import PagesTab from "@/layout/page-tabs.vue";
import copyRight from "@/layout/copy-right.vue"

export default {
  name: "container-2",
  components: { NavMenu, edoNav, PagesTab,copyRight },
  data() {
    return {
      themeColor
    };
  },
  props:{
     exclude:{
      type:Array,
      required:true
     },
     include: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
