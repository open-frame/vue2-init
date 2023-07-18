<template>
  <micro-app
    name="plateform-bigview"
    class="micro-app"
    :url="microAppUrl"
    baseroute="/overviews/plateform"
    :data="microAppData"
    @created="created"
    @beforemount="beforeMount"
    @mounted="mount"
    @unmount="unmount"
    @error="error"
    @datachange="dataChange"
  ></micro-app>
</template>

<script>
// https://zeroing.jd.com/docs.html#/zh-cn/framework/vue?id=_4%e3%80%81%e5%9c%a8%e9%a1%b5%e9%9d%a2%e4%b8%ad%e5%b5%8c%e5%85%a5%e5%ad%90%e5%ba%94%e7%94%a8
const microAppUrl = process.env.NODE_ENV === "development" ? "http://192.168.1.149:2023/kid-project/" : process.env.VUE_APP_BIG_VIEW;

export default {
  name: "overviews-platform-index",
  data() {
    return {
      microAppUrl,
      loading: true,
      microAppData: {minAppData:this.$store.state},
    };
  },
  mounted() {},
  methods: {
    created() {
      this.loading = this.$loading({
        lock: true,
        text: "应用创建了",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    beforeMount() {
      this.loading.text = "即将渲染";
    },
    mount() {
      this.loading.text = "渲染完成";
      this.loading.close();
    },
    unmount() {
      console.log("卸载了");
    },
    error() {
      const that = this;
      this.$confirm("大屏加载错误", {
        confirmButtonText: "刷新",
        cancelButtonText: "返回",
        type: "warning",
      })
        .then(() => {
          location.reload();
        })
        .catch(() => {
          this.$router.back();
          that.loading.close();
        });
    },
    dataChange(e) {
      console.log("监听到子应用的数据:", e.detail);
    },
  },
};
</script>

<style scoped lang="less">
.bigview-menu {
  position: fixed;
  top: 0;
  overflow: initial;
}
// 菜单显示隐藏的动画
.bigview-menu-enter-active,
.bigview-menu-leave-active {
  transition: all 0.3s ease;
}
.bigview-menu-enter,
.bigview-menu-leave-to {
  opacity: 0;
}
.bigview-menu-enter,
.bigview-menu-leave-to {
  transform: translateX(-60px);
}
.close-menu {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
