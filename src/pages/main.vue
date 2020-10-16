<template>
  <div class="main">
    <Menu />
    <div class="view">
      <Nav :data="userInfo" />
      <router-view class="animate__animated animate__slideInLeft animate__faster" style="margin: 12px" />
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   页面布局整合入口文件
 */

import Menu from "@/components/menu";
import Nav from "@/components/nav";
import api from "@/service/api";

export default {
  components: { Menu, Nav },
  name: "Main",
  data() {
    return {
      userInfo: {
        organization: "啥啥啥啥啥啥啥啥啥啥啥公司",
        user: "admin",
      },
    };
  },
  created(){
    if(localStorage.getItem("memu-unfold")){
      
    }else{
      this.$store.mutations.menUnfold(true);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fffefc;
  display: flex;
  .view {
    height: 100vh;
    overflow: auto;
    width: -webkit-fill-available;
    width: -moz-available;
  }
}
</style>
