<template>
  <div class="opened-page">
    <el-tabs
      v-model="$store.state.defaultPage"
      type="card"
      @tab-click="click"
      @tab-remove="remove"
    >
      <template v-for="item in $store.state.openedPages">
        <el-tab-pane
          :closable="item.url !== '/home'"
          :key="item.meta.id"
          :label="item.title"
          :name="item.meta.id"
        >
        </el-tab-pane>
      </template>
    </el-tabs>
    <el-dropdown class="close-btn" size="small" @command="handler">
      <el-button size="mini">
        关闭<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1" v-if="$store.state.openedPages.length > 2"
          >其他页面</el-dropdown-item
        >
        <el-dropdown-item command="2" v-if="$store.state.openedPages.length > 1"
          >全部页面</el-dropdown-item
        >
        <el-dropdown-item command="0" divided>隐藏标签条</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2021-05-17 17:20:31  星期一
 * @description   页面标签条
 */

export default {
  name: "OpenedPage",
  data() {
    return {};
  },
  methods: {
    click(tab) {
      console.log(tab);
      let url = this.$store.state.openedPages[Number(tab.index)].url;
      if (this.$route.path !== url) {
        this.$router.push(url);
        this.$store.commit("setDefaultPage", tab.name);
      }
    },
    remove(tab) {
      this.$store.commit("closeThisOpenedPages", tab);
      const tablen = this.$store.state.openedPages.length - 1;
      this.$store.commit(
        "setDefaultPage",
        this.$store.state.openedPages[tablen].meta.id
      );
    },
    // 操作页面记录条
    handler(command) {
      switch (command) {
        case "0":
          this.changeOpenedPages();
          break;
        case "1":
          this.closeOtherOpenedPages();
          break;
        case "2":
          this.closeAllOpenedPages();
          break;
      }
    },
    // 关闭其他
    closeOtherOpenedPages() {
      this.$store.commit("closeOtherOpenedPages");
    },
    // 关闭全部
    closeAllOpenedPages() {
      this.$store.commit("closeAllOpenedPages");
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
        this.$store.commit("setDefaultPage", "Page-Home");
      }
    },
    // 隐藏/显示页面记录条
    changeOpenedPages() {
      this.$store.commit(
        "changeOpenedPages",
        !this.$store.state.showOpenedPages
      );
    },
  },
};
</script>

<style lang="less" scoped>
.opened-page {
  margin: 0 15px;
  position: relative;
  display: flex;
  /deep/.el-tabs {
    width: -webkit-fill-available;
    .el-tabs__header {
      margin: 0;
      .is-active {
        background-color: #ffffff;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 26px;
    }
    .el-tabs__item {
      padding: 2px 14px;
      height: auto;
      line-height: inherit;
      .el-icon-close {
        display: none;
      }
      &:hover .el-icon-close {
        display: inline-block;
      }
    }
  }
  // .close-btn {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  // }
}
</style>
