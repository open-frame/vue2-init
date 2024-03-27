<template>
  <div class="text-center p-2 reference-info">
    全易@{{ year }}
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2023-08-04 14:07:38  星期五
 * @description   版权说明
 **/

export default {
  name: "copy-right",
  data() {
    return {
      year: new Date().getFullYear(),
      VUE_APP_FIRM_SERVICE: ""
    };
  },
  created() {
    this.VUE_APP_FIRM_SERVICE = process.env.VUE_APP_FIRM_SERVICE;
  }
};
</script>

<style lang="less" scoped>
@text-color: #959595;

.reference-info {
  font-size: 13px;
  color: @text-color;
  position: absolute;
  bottom: 0;
  width: -webkit-fill-available;

  a {
    color: @text-color;
    pointer-events: all;
  }
}
</style>