<template>
  <router-view v-if="$store.state.fullPage" />
  <component v-else :is="'edo-container-'+$store.state.layout" :exclude="excludeKeepAlivePages" :include="includeKeepAlivePages" class="bg-light">
    <router-view class="animate-fade-in-left animate-duration-0.3s border-t-none pages" />
  </component>
</template>

<script>
/**
 * @author        全易
 * @time          2023-10-05 16:38:30  星期一
 * @description   页面布局整合 入口文件
 */
import excludeKeepAlivePages from "@/config/exclude-keep-alive.json";

export default {
  name: "main-file",
  // components: {
  //   "edo-container-1": () => import("@/layout/container/1.vue"),
  //   "edo-container-2": () => import("@/layout/container/2.vue"),
  //   "edo-container-3": () => import("@/layout/container/3.vue"),
  // },
  data() {
    return {
      excludeKeepAlivePages,
      includeKeepAlivePages: []
    };
  },
  watch: {
    "$store.state.openedPages": {
      immediate: true, // 立即处理 进入页面就触发
      deep: true, // 深度监听 属性的变化
      handler(now) {
        // console.log(now) //页签长度发生变化说明缓存也要发生变化
        this.includeKeepAlivePages = now.map(item => {
          return item.name
        })
      }
    },
    "$store.state.layout": {
      immediate: true, // 立即处理 进入页面就触发
      handler(now) {
        // console.log(now) 
        this.$options.components['edo-container-'+this.$store.state.layout] = () => import(`@/layout/container/${this.$store.state.layout}.vue`);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pages {
  overflow-y: auto;
  height: calc(100vh - 142px);
}
</style>
