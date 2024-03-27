<template>
  <main class="flex">
    <nav-menu mode="vertical" :class="['h-100vh  edo-menu', $store.state.isCollapse ? '' : 'no-collapse']"
      :collapse="$store.state.isCollapse" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu"
      :background-color="themeColor['edo-bg-color']" :text-color="themeColor['edo-text-color']" />
    <section class="block" :style="{ width: menuCollapse }">
      <edo-nav />
      <div class="m-3">
        <page-tabs />
        <keep-alive :exclude="exclude" :include="include">
          <slot></slot>
        </keep-alive>
        <copy-right />
      </div>
    </section>
  </main>
</template>

<script>
/**
 * @author        全易
 * @time          2023-02-01 14:51:10  星期三
 * @description   页面结构
 **/
import themeColor from "./theme.json";
import NavMenu from '@/layout/menu/index.vue';
import edoNav from "@/layout/nav/index.vue";
import PageTabs from "@/layout/page-tabs.vue";
import copyRight from "@/layout/copy-right.vue"

export default {
  name: "container-1",
  components: {
    NavMenu,
    edoNav,
    PageTabs,
    copyRight
  },
  data() {
    return {
      themeColor,
    };
  },
  computed: {
    menuCollapse() {
      return `calc(100vw - ${this.$store.state.isCollapse ? '60px' : '200px'})`
    }
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
.edo-menu.no-collapse {
  min-width: 200px;
}
</style>