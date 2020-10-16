<template>
  <div class="test">
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {};
  }
};
</script>

<style scope>
</style>
