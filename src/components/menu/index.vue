<template>
  <el-menu
    class="box-card"
    unique-opened
    :collapse="$store.state.isCollapse"
    :default-active="$store.state.menuId"
    background-color="#2f3332"
    text-color="#fff"
    active-text-color="#4af4d2"
    :style="$store.state.width"
  >
    <el-menu-item index="Page-Home" @click="goPage({ url: '/home' })">
      <i class="fa fa-newspaper-o"></i>
      <span slot="title">看盘</span>
    </el-menu-item>
    <MenuList :data="$store.state.permissionMenu"></MenuList>
  </el-menu>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   菜单栏
 */
import MenuList from "./list";

export default {
  name: "Menu",
  components: {
    MenuList,
  },
  data() {
    return {
      menus: [],
    };
  },
  watch: {
    // 默认的折叠菜单栏右图标不隐藏，此处手动处理
    "$store.state.isCollapse": {
      immediate: true,
      handler(now, old) {
        // console.log(now, old);
        this.$nextTick(() => {
          setTimeout(() => {
            const rightICON = document.querySelectorAll(
              ".menu-list .el-icon-arrow-right"
            );
            if (now) {
              console.log("折叠：", rightICON);
              for (let i = 0, len = rightICON.length; i < len; i++) {
                rightICON[i].style.display = "none";
              }
            } else {
              console.log("展开：", rightICON);
            }
          }, 550);
        });
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
.no-menus {
  color: #ffffff;
  padding: 15px;
}
.fa {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
}
.box-card {
  border: none;
  height: 100vh;
  overflow: auto;
  min-width: 64px;
  .menu {
    height: calc(100vh - 175px);
    overflow: auto;
  }
  .often {
    z-index: 1;
    position: sticky;
    top: 0;
    color: #ffffff;
    padding: 10px 0;
    border-bottom: 1px solid #6b6b6b;
    background-color: #2f3332;
    .title {
      margin-bottom: 8px;
      padding-left: 8px;
    }
    .item {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
}
</style>
