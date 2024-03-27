<template>
  <div class="w-full flex flex-justify-center flex-items-center" style="height: 100vh;">
    <el-result icon="error" title="没有权限">
      <template slot="subTitle">
        <a class="text-xs" :href="VUE_APP_CLW_SERVICE">如有需要可联系管理员</a>
      </template>
      <template slot="extra">
        <el-button plain type="primary" @click="$router.back()">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
/**
* @author        全易
* @time          2024-01-23 10:42:18  星期二
* @description   403
**/


export default {
  name: 'page-403',
  data() {
    return {
      VUE_APP_CLW_SERVICE: ""
    }
  },
  created() {
    this.VUE_APP_CLW_SERVICE = process.env.VUE_APP_CLW_SERVICE;
  }
}
</script>

<style lang="less" scoped></style>