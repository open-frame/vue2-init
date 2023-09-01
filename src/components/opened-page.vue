<template>
  <div v-if="$store.state.showOpenedPages" class="d-flex ms-3 me-3 opened-page">
    <el-tabs v-model="$store.state.nowPage" type="card" @tab-click="click" @tab-remove="remove">
      <el-tab-pane :closable="item.path !== '/home'" v-for="item in $store.state.openedPages" :key="item.meta.id"
        :label="item.meta.title" :name="item.meta.id">
      </el-tab-pane>
    </el-tabs>
    <el-dropdown class="close-btn" size="small" @command="handler">
      <el-button size="mini">
        关闭<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1" v-if="$store.state.openedPages.length > 2">其他页面</el-dropdown-item>
        <el-dropdown-item command="2" v-if="$store.state.openedPages.length > 1">全部页面</el-dropdown-item>
        <el-dropdown-item command="0" divided>隐藏页签</el-dropdown-item>
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
  name: "opened-page",
  data() {
    return {};
  },
  methods: {
    click(tab) {
      // console.log(tab);
      let fullPath = this.$store.state.openedPages[Number(tab.index)].fullPath;
      if (this.$route.path !== fullPath) {
        this.$router.push(fullPath);
        this.$store.commit("setDefaultPage", tab.name);
      }
    },
    remove(id) {
      // console.log(id);
      this.$store.commit("closeThisOpenedPages", id);
    },
    // 操作页面记录条
    handler(command) {
      switch (command) {
        case "0":
          this.$store.commit("changeOpenedPages", false);
          break;
        case "1":
          this.$store.commit("closePageTab", "1");
          break;
        case "2":
          this.$store.commit("closePageTab", "0");
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.opened-page {
  position: relative;
  z-index: 1;

  ::v-deep .el-tabs {
    width: calc(100% - 73px);

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
}
</style>
