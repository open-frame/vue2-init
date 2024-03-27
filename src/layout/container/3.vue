<template>
  <el-main class="p-0">
    <nav-menu class="pb-3" />
    <section class="w-full block view">
      <pages-tab class="mt-2" />
      <keep-alive :exclude="exclude" :include="include">
        <slot></slot>
      </keep-alive>
      <copy-right />
    </section>
  </el-main>
</template>

<script>
/**
 * @author        全易
 * @time          2023-02-01 14:51:10  星期三
 * @description   页面结构
 **/
import NavMenu from "@/layout/nav/index.vue";
import PagesTab from "@/layout/page-tabs.vue";
import copyRight from "@/layout/copy-right.vue"
import { Main } from "element-ui";

export default {
  name: "container-1",
  components: { "el-main": Main, NavMenu, PagesTab, copyRight },
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

<style lang="less" scoped></style>