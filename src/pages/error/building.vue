<template>
  <div class="w-full flex flex-justify-center flex-items-center" style="height: 100vh;">
    <el-result icon="info" title="页面正在建设">
      <a slot="subTitle" class="text-xs" :href="VUE_APP_CLW_SERVICE">
        请您敬请期待，如有需要可联系管理员
      </a>
      <template slot="extra">
        <el-button plain type="primary" @click="$router.back()">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-23 14:26:24  星期三
 * @description   404页
 */

export default {
  name: "page-building",
  data() {
    return {
      VUE_APP_CLW_SERVICE: ""
    }
  },
};
</script>

<style lang="less" scoped></style>
