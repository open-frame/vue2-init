<template>
  <vue-fragment class="menu-list">
    <template v-for="item in data">
      <el-menu-item v-if="item.children.length < 1" :key="item.menuIdStr" :index="item.menuIdStr" @click="goPage(item)">
        <i :class="[item.icon, 'menu-icon']"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
      <el-submenu v-else :key="item.menuIdStr" :index="item.menuIdStr">
        <template slot="title">
          <i :class="[item.icon, 'menu-icon']"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <MenuList :data="item.children"></MenuList>
      </el-submenu>
    </template>
  </vue-fragment>
</template>

<script>
/**
 * @author        全易
 * @time          2021-04-26 08:48:57  星期一
 * @description   菜单栏列表
 */
import { Fragment } from 'vue-fragment'
import { Submenu, MenuItem } from "element-ui";


export default {
  name: "MenuList",
  components: {
    'el-submenu': Submenu,
    'el-menu-item': MenuItem,
    'vue-fragment': Fragment
  },
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
      if (this.$route.path !== page.url) {
        switch (page.menuType) {
          case "0":
            open(page.url, "_blank")
            break;
          case "2":
            open(page.url, "_blank")
            break;
          default:
            this.$router.push(page.url);
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-menu-item,
.is-opened /deep/.el-submenu__title {
  background: rgb(29, 47, 43) !important;
}

.el-menu-item:hover,
.el-menu-item.is-active,
/deep/.el-submenu__title:hover,
.el-submenu.is-active:not(.is-opened) /deep/.el-submenu__title {
  i {
    color: #19AA8D !important;
  }

  color: #19AA8D !important;
  // background: #287465 !important;
}

// .el-submenu.is-active:not(.is-opened) /deep/.el-submenu__title,
// /deep/.el-menu-item.is-active {
//   &::before {
//     content: "";
//     display: block;
//     width: 8px;
//     height: inherit;
//     position: absolute;
//     left: 0;
//     background-color: #19AA8D;
//     border-top-right-radius: 4px;
//     border-bottom-right-radius: 4px;
//   }
// }

.menu-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
}
</style>
