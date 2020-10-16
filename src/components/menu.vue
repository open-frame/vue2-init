<template>
  <div class="menu" :style="{ width: width.menu }">
    <el-menu
      :collapse="isCollapse"
      unique-opened
      :default-active="defaultId"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2f3332"
      text-color="#fff"
      active-text-color="#4af4d2"
    >
      <!-- <el-menu-item index="0" @click="goPage({path:'/test',id:'0'})">
        <i class="el-icon-menu"></i>
        <span slot="title">测试页</span>
      </el-menu-item>-->
      <el-menu-item index="0" @click="goPage({ path: '/home', id: '0' })">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">看盘</span>
      </el-menu-item>
      <el-submenu v-for="(menu, i) in menus" :key="i" :index="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <div v-for="(child, t) in menu.list" :key="t">
          <el-menu-item
            v-if="!child.list"
            :index="child.id"
            @click="goPage(child)"
          >
            <i :class="child.icon"></i>
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
        </div>
        <div>
          <div v-for="(child, y) in menu.list" :key="y">
            <el-submenu v-if="child.list" :index="child.id">
              <template slot="title">
                <i :class="child.icon"></i>
                <span>{{ child.name }}</span>
              </template>
              <el-menu-item
                v-for="(item, l) in child.list"
                :key="l"
                :index="item.id"
                @click="goPage(item)"
              >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-submenu>
          </div>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   菜单栏
 */

export default {
  name: "Menu",
  data() {
    return {
      defaultId: "0",
      isCollapse: this.$store.state.isCollapse,
      width: this.$store.state.width,
      menus: []
    };
  },
  created() {
    sessionStorage.getItem("menu_id")
      ? (this.defaultId = sessionStorage.getItem("menu_id"))
      : ""; // 默认停留页

    /* api
      .menuResource({
        user: 1
      })
      .then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.menus = res.data;
        }
      })
      .catch((err) => {
        this.$message.error("获取失败");
      }); */
    this.menus = [
      {
        name: "管理中心",
        id: "1",
        icon: "el-icon-set-up",
        list: [
          {
            name: "运营用户管理",
            id: "1-2",
            icon: "fa fa-handshake-o",
            path: "/management/operation",
          },
          {
            name: "角色管理",
            id: "1-3",
            icon: "fa fa-user-secret",
            path: "/management/role",
          },
          {
            name: "菜单管理",
            id: "1-4",
            icon: "fa fa-sliders",
            path: "/management/menus",
          },
          {
            name: "组织管理",
            id: "1-5",
            icon: "fa fa-sitemap",
            path: "/management/organization",
          },
        ],
      },
      {
        name: "资产中心",
        id: "2",
        icon: "el-icon-wallet",
        list: [
          {
            name: "电站管理",
            id: "2-1",
            icon: "fa fa-podcast",
            path: "/balance/power-stations",
          },
          {
            name: "设备管理",
            id: "2-2",
            icon: "fa fa-circle-o-notch",
            path: "/balance/equipment",
          },
        ],
      },
      {
        name: "订单中心",
        id: "3",
        icon: "el-icon-document",
        list: [
          {
            name: "订单管理",
            id: "3-1",
            icon: "el-icon-notebook-1",
            path: "/orders/order-manage",
          },
        ],
      },
      {
        name: "清算中心",
        id: "4",
        icon: "el-icon-finished",
        list: [
          {
            name: "计费模型",
            id: "4-1",
            icon: "el-icon-c-scale-to-original",
            path: "/accounting/billing-templates",
          },
        ],
      },
      {
        name: "运监中心",
        id: "5",
        icon: "el-icon-monitor",
        list: [
          {
            name: "工单管理",
            id: "5-1",
            icon: "el-icon-chat-line-square",
            path: "/operational/work-order",
          },
        ],
      },
    ];
  },
  watch: {
    "$store.state.isCollapse"(now, old) {
      console.log(now, old);
      this.isCollapse = now;
    },
    "$store.state.width"(now, old) {
      console.log(now, old);
      this.width = now;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转页面
    goPage(page) {
      console.log(this.$route, page);
      if (this.$route.path === page.path) {
        this.$message.warning("已在当前页！");
      } else {
        sessionStorage.setItem("menu_id", page.id);
        this.$router.push({
          path: page.path,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  background-color: #2f3332;
  .fa {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
  }
  .el-menu {
    border: none;
    height: 100vh;
    overflow: auto;
  }
}
</style>
