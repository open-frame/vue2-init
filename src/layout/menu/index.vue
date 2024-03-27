<template>
  <el-menu class="important-border-none" :mode="mode" :unique-opened="uniqueOpened" :collapse="collapse" :default-active="defaultActive"
    background-color="#242b2a" :text-color="textColor" :active-text-color="activeTextColor" @open="open" @close="close">
    <MenuList :data="$store.state.permissionMenu || data"></MenuList>
  </el-menu>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   菜单栏  https://blog.csdn.net/qq_42618566/article/details/116143899
 */
import { Menu } from "element-ui";
import MenuList from "./list.vue";

export default {
  name: "MenuIndex",
  components: {
    "el-menu": Menu,
    MenuList,
  },
  props: {
    mode: {
      type: String,
      default: "horizontal"
    },
    data: {
      type: Array,
      // required: true,
      // validator: function (value) {
      //   // 必传字段
      //   const requireds = ["menuName", "menuId", "icon", "url", "children"];
      //   for (let item of value) {
      //     for (let key of requireds) {
      //       if (Object.keys(item).includes(key)) {
      //         console.log(item[key]);
      //         if(item[key] instanceof ""){
      //           console.log("111");
      //         }
      //       } else {
      //         throw "错误"
      //       }
      //     }
      //   }
      // }
    },
    uniqueOpened: {
      type: Boolean
    },
    collapse: {
      type: Boolean
    },
    defaultActive: {
      type: String
    },
    backgroundColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
    activeTextColor: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    open() {
      this.$emit("open");
    }
  }
};
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.el-menu {
  overflow: auto;
  z-index: 1;
}
</style>
