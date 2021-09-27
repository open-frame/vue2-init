<template>
  <fragment class="menu-list">
    <template v-for="item in data">
      <el-menu-item
        v-if="item.children.length < 1"
        :key="item.menuIdStr"
        :index="item.menuIdStr"
        @click="goPage(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
      <el-submenu v-else :key="item.menuIdStr" :index="item.menuIdStr">
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-show="!$store.state.isCollapse" slot="title">
            {{ item.menuName }}
          </span>
        </template>
        <MenuList :data="item.children"></MenuList>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
/**
 * @author        全易
 * @time          2021-04-26 08:48:57  星期一
 * @description   菜单栏列表
 */
import {Plugin } from 'vue-fragment'
Vue.use(Plugin )

export default {
  name: "MenuList",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 跳转页面
    goPage(page) {
      // console.log(page);
      if (this.$route.path !== page.url) {
        this.$router.push(page.url);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fa {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
}
</style>
