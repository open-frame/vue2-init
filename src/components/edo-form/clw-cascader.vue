<template>
  <div class="pt-3">
    <div class="clw-cascader">
      <el-cascader
        :title="title"
        ref="cascader"
        filterable
        clearable
        v-model="val"
        :options="options"
        :props="props"
        :size="size"
        :disabled="disabled"
        placeholder=""
        @focus="focus"
        @visible-change="visibleChange"
        @blur="blur"
        @input="input"
        @change="change"
      ></el-cascader>
      <label class="text-warmgray " :style="style">{{ placeholder }}</label>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2022-10-11 13:08:46  星期二
 * @description   自定义联级选择器
 **/

export default {
  name: "clw-cascader",
  props: {
    placeholder: {
      type: String,
    },
    // 父组件v-model绑定的值
    value: {
      type: Array,
    },
    options: {
      type: Array,
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
    },
    labelBG: {
      type: String,
      default: "#ffffff",
    },
    labelColor: {
      type: String,
      default: "#19aa8d",
    },
  },
  data() {
    return {
      inputHeight: null,
      val: [],
      style: {},
    };
  },
  mounted() {
    this.inputHeight = this.$refs.cascader.$el.offsetHeight;
    this.resetStyle();
  },
  computed: {
    title() {
      return `${this.placeholder}：${this.val}`;
    },
  },
  watch: {
    // 实时联动父组件传来的值
    value(now, old) {
      this.val = now || [];
      if (now.length > 0) {
        this.focus();
      }
    },
    val(now, old) {
      this.val = now;
      this.resetStyle();
    },
  },
  methods: {
    focus() {
      this.style = {
        transform: `translateY(${-(this.inputHeight / 2)}px)`,
        color: `${this.labelColor} !important`,
        "background-color": this.labelBG,
        padding: "0 10px",
      };

      this.$emit("focus");
    },
    blur() {
      this.resetStyle();
      this.$emit("blur");
    },
    input(val) {
      this.$emit("input", val);
    },
    change(val) {
      this.$emit("change", val);
    },
    visibleChange(status) {
      if (!status) {
        this.resetStyle();
      }
      this.$emit("visible-change", status);
    },
    resetStyle() {
      const noData = this.val.every((item) => {
        return item === "";
      });
      if (noData) {
        this.style = {
          bottom: `${this.inputHeight * 0.37}px`,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.clw-cascader {
  position: relative;
  label {
    font-size: 14px;
    line-height: 10px;
    position: absolute;
    bottom: 15px;
    left: 15px;
    pointer-events: none;
    transition: all 0.3s ease;
  }
}
</style>