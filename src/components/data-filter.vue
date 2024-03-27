<template>
  <el-row :gutter="30" class="filters">
    <slot></slot>
    <el-col class="text-end" :span="btnSpan">
      <el-button size="medium" @click="getData" type="primary" :loading="loading">搜索</el-button>
      <el-button size="medium" @click="queryReset" :loading="loading">重置</el-button>
    </el-col>
  </el-row>
</template>

<script>
/**
* @author        全易
* @time          2023-12-19 16:12:34  星期二
* @description   数据条件过滤容器
**/


export default {
  name: 'data-filter',
  props: {
    btnSpan: {
      type: Number,
      default: 4
    },
    loading: {
      type: Boolean,
      default: false
    },
    getData: {
      type: Function
    },
    queryReset: {
      type: Function
    }
  }
}
</script>

<style lang="less" scoped></style>