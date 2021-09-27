<template>
  <div class="time-line">
    <div class="steps">
      <div class="step" v-for="(item, index) in steps" :key="index">
        <div>{{ item.title }}</div>
        <div class="sort">{{ index + 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-16 10:58:39  星期三
 * @description   时间线
 */

export default {
  name: "TimeLine",
  props: {
    now: {
      type: String,
      default: "3",
    },
  },
  data() {
    return {
      steps: [
        {
          title: "待提交",
        },
        {
          title: "待审核",
        },
        {
          title: "已审核",
        },
        {
          title: "已生效",
        },
        {
          title: "已失效",
        },
        {
          title: "删除",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 50px 35px;
  .step {
    text-align: center;
    .sort{
      margin-top: 8px;
      font-size: 30px;
    }
  }
}
</style>
