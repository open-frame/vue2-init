<template>
  <el-drawer title="页面结构" :size="400" :visible="show" direction="rtl" :append-to-body="true" :modal-append-to-body="false"
    :before-close="close">
    <div class="text-center p-3">
      <el-popover v-for="item in layouts" :key="item" placement="left" trigger="hover">
        <img :src="item | codeTransformImage" style="width: 550px;" />
        <img slot="reference"
          :class="['m-2 p-2', item === $store.state.layout ? 'border-3 border-solid rounded-2 border-dark-1' : '']"
          style="width: 200px;" :src="item | codeTransformImage" @click="changeLayout(item)" />
      </el-popover>
    </div>
  </el-drawer>
</template>

<script>
/**
* @author        全易
* @time          2023-07-19 10:31:47  星期三
* @description   
**/


export default {
  name: 'layout-setting',
  data() {
    return {
      layouts: []
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    codeTransformImage: (code) => {
      // console.log(code);
      if (code) {
        return require(`@/assets/images/platform-set/page-structure/${code}.png`);
      }
      return "";
    },
  },
  created() {
    this.getLayouts();
  },
  methods: {
    getLayouts() {
      const files = require.context('@/assets/images/platform-set/page-structure/', true, /.png$/).keys();
      // console.log(files)
      this.layouts = files.map(item => {
        return item.replace("./", "").replace(".png", "")
      })
      // console.log(this.layouts)
    },
    changeLayout(code) {
      if (code !== this.$store.state.layout) {
        this.$store.commit("changeLayout", code);
      }
    },
    close() {
      this.$emit("close", false)
    }
  }
}
</script>

<style lang="less" scoped></style>