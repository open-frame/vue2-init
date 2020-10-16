<template>
  <el-card class="box-card nav">
    <div class="copyright">
      <i
        :class="
          this.$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        "
        :title="this.$store.state.isCollapse ? '展开' : '折叠'"
        @click="isCollapse"
      ></i>
      <h3 style="margin-right: 30px; color: #19aa8d">
        平台名称平台名称
      </h3>
      <h5 style="font-weight: normal; color: #909399">
        {{ data.organization }}
      </h5>
    </div>
    <div class="info">
      <el-dropdown @command="me">
        <span class="el-dropdown-link" style="cursor: pointer">
          欢迎，{{ data.user }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="info">我的资料</el-dropdown-item>
          <el-dropdown-item command="exit" divided>退出登录</el-dropdown-item>
          <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <el-divider direction="vertical"></el-divider>
      <el-dropdown @command="setings">
        <span class="el-dropdown-link" style="cursor: pointer">
          <i class="el-icon-s-operation" title="设置"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="theme">功能1</el-dropdown-item>
          <el-dropdown-item command="language">功能2</el-dropdown-item>
          <el-dropdown-item
            command="editor"
            divided
            v-if="$route.path === '/home'"
            >调整布局</el-dropdown-item
          >
          <el-dropdown-item command="append" v-if="$route.path === '/home'"
            >添加模块</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   导航条
 */

export default {
  name: "Nav",
  props: {
    data: {
      type: Object,
      default() {
        return {
          organization: "啥啥啥啥啥啥啥啥啥啥啥公司",
          user: "admin",
        };
      },
    },
  },
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    // 展开/折叠菜单栏
    isCollapse() {
      console.log(this.$store.state.isCollapse);
      this.$store.mutations.menUnfold(!this.$store.state.isCollapse);
    },
    // 我的 相关设置
    me(command) {
      switch (command) {
        case "info":
          console.log("进入我的资料！");
          break;
        case "center":
          console.log("进入个人中心！");
          break;
        case "exit":
          sessionStorage.clear();
          localStorage.clear();
          this.$router.push({
            path: "/login",
          });
          break;
      }
    },
    // 平台设置
    setings(command) {
      switch (command) {
        case "theme":
          console.log("执行切换主题！");
          break;
        case "language":
          console.log("执行切换语言！");
          break;
        case "editor":
          this.$store.mutations.editLayout(true);
          break;
        case "append":
          this.$store.mutations.addLayout(true);
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 1;

  /deep/.el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    .copyright {
      h3,
      h5 {
        display: inline-block;
      }
    }
    .info {
      display: flex;
      align-items: center;
      .time {
        text-align: center;
      }
    }
  }
}
</style>
