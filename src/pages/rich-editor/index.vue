<template>
  <el-card class="">
    <edo-editor v-model="data" />

    数据：<br />
    {{ data }}
  </el-card>
</template>

<script>
/**
* @author        全易
* @time          2023-06-30 17:06:33  星期五
* @description   
**/


export default {
  name: 'rich-editor-index',
  components: {
    "edo-editor": () => import("@/components/article-editor.vue")
  },
  data() {
    return {
      data: ""
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped></style>