<template>
  <div>
    <el-header class="bg-white row m-0 align-items-center shadow-sm">
      <div class="col-2 text-truncate">
        <router-link class="text-decoration-none h4" to="/">{{ title }}</router-link>
      </div>
      <nav-menu mode="horizontal" class="col-8 d-flex justify-content-center border-0 edo-menu" :collapse="false" :default-active="$store.state.nowPage" :data="$store.state.permissionMenu" />
      <div class="col-2 d-flex justify-content-end align-items-center info">
        <el-dropdown @command="me">
          <span class="el-dropdown-link" style="cursor: pointer">
            欢迎，{{ $store.state.userInfo.userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-permission="'my/center'" command="1">个人中心</el-dropdown-item>
            <el-dropdown-item v-permission="'my/info'" command="2">我的资料</el-dropdown-item>
            <el-dropdown-item command="0" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical"></el-divider>
        <el-dropdown @command="setings">
          <span class="el-dropdown-link" style="cursor: pointer">
            <i class="el-icon-s-operation" title="平台设置"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="3" v-if="!$store.state.showOpenedPages" divided>显示页签</el-dropdown-item>
            <el-dropdown-item command="1">切换页面结构</el-dropdown-item>
            <el-dropdown-item command="0" divided>清除缓存</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical"></el-divider>
        <el-dropdown @command="helps">
          <span class="el-dropdown-link" style="cursor: pointer">
            <i class="fa fa-question-circle-o" aria-hidden="true" title="帮助"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">使用帮助</el-dropdown-item>
            <a href="mailto:quanyi@edo-iot.com?subject=问题反馈">
              <el-dropdown-item command="2"> 反馈问题 </el-dropdown-item>
            </a>
            <a target="_blank" href="https://work.weixin.qq.com/kfid/kfcd894c0a8bc6d7627">
              <el-dropdown-item command="3"> 在线客服 </el-dropdown-item>
            </a>
            <el-dropdown-item v-permission="'test-page'" divided>
              <router-link to="/test">测试页面</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical"></el-divider>
        <i :class="isFullScreen ? 'fa fa-compress' : 'el-icon-full-screen'" :title="isFullScreen ? '退出全屏' : '进入全屏'"
          @click="fullScreen"></i>
        <el-divider direction="vertical"></el-divider>
        <span title="当前网络状况">{{ $store.state.nowNet }}</span>
      </div>
    </el-header>
    <page-structure-drawer :show="showPageStructureDrawer" @close="showPageStructureDrawer = false" />
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   导航条
 */
import { permission } from '@/directives/index.js'
import { NavMenu } from 'element-navmenu_vue'

export default {
  name: "",
  components: {
    NavMenu,
    "page-structure-drawer": () => import("./nav/page-structure.vue")
  },
  directives: {
    permission
  },
  data() {
    return {
      title: "",
      menus: [],
      isFullScreen: false,
      showPageStructureDrawer: false
    };
  },
  created() {
    this.title = process.env.VUE_APP_TITLE;
  },
  methods: {
    // 我的 相关设置
    me(command) {
      switch (command) {
        case "0":
          this.$store.commit("logout", "0");
          break;
        case "1":
          this.$router.push("/my/center");
          break;
        case "2":
          this.$router.push("/my/info");
          break;
      }
    },
    // 平台设置
    setings(command) {
      switch (command) {
        case "0":
          localStorage.clear();
          location.href = "/logon";
          break;
        case "1":
          this.showPageStructureDrawer = true;
          break;
        case "3":
          this.$store.commit("changeOpenedPages", true);
          break;
      }
    },
    fullScreen() {
      if (this.isFullScreen) {
        this.isFullScreen = false;
        //退出全屏
        const el = document;
        const cfs =
          el.cancelFullScreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.exitFullScreen;

        //typeof cfs != "undefined" && cfs
        if (cfs) {
          cfs.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
          //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
          const wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        }
      } else {
        this.isFullScreen = true;
        //全屏
        const el = document.documentElement;
        const rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen;

        //typeof rfs != "undefined" && rfs
        if (rfs) {
          rfs.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
          //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
          const wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        }
      }
    },
    // 平台使用帮助
    helps(command) {
      switch (command) {
        case "1":
          // this.$router.push("/my/info");
          break;
        case "2":
          this.$message.info("请留意启动的Email软件");
          break;
        case "3":
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  position: sticky;
  top: 0;
  z-index: 9;

  ::v-deep .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
}

.depts {
  max-height: 400px !important;
  overflow-y: auto;
}
</style>
