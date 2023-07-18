<template>
  <router-view v-if="$store.state.fullPage" />
  <edo-container v-else>
    <router-view class="animate__animated animate__slideInLeft animate__faster border-top-0 m-3 mt-0 pages" />
  </edo-container>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   页面布局整合 入口文件
 */

import edoContainer from "@/components/container.vue";


export default {
  components: { edoContainer },
  name: "main-file"
};
</script>

<style lang="less" scoped>
.pages {
  overflow-y: auto;
  height: calc(100vh - 120px);/* 全屏高度减去顶部条和页签的高度 */ 
}
</style>
