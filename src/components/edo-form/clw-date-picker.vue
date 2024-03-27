<template>
  <div class="pt-3">
    <div class="clw-select">
      <el-date-picker :type="type" ref="date-picker" :size="size" v-model="val" clearable prefix-icon=" " :format="format"
        :value-format="valueFormat" :picker-options="pickerOptions" :range-separator="separator" @focus="focus"
        @blur="blur" @change="change" :title="title" style="width: -webkit-fill-available">
        <slot></slot>
      </el-date-picker>
      <label class="text-warmgray  label" :style="style">
        {{ placeholder }}
      </label>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2022-10-11 13:08:46  星期二
 * @description   自定义下拉框组件
 **/

export default {
  name: "clw-date-picker",
  props: {
    // 父组件v-model绑定的值
    value: {
      type: [String, Array],
    },
    type: {
      type: String,
      default: "datetimerange",
    },
    size: {
      type: String,
      default: "medium",
    },
    format: {
      type: String,
    },
    valueFormat: {
      type: String,
    },
    pickerOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    placeholder: {
      type: String,
    },
    startPlaceholder: {
      type: String,
    },
    endPlaceholder: {
      type: String,
    },
    rangeSeparator: {
      type: String,
      default: ' - '
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
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
      val: "",
      style: {},
    };
  },
  mounted() {
    this.inputHeight = this.$refs["date-picker"].$el.offsetHeight;
    this.resetStyle();
  },
  computed: {
    title() {
      return `${this.placeholder}：${this.val}`;
    },
    separator() {
      // console.log("1111111111", this.rangeSeparator);
      // console.log("2222222222", this.val);
      return this.rangeSeparator && this.val ? this.rangeSeparator : ""
    }
  },
  watch: {
    // 实时联动父组件传来的值
    value(now, old) {
      console.log(now);
      const value = this.multiple ? [] : "";
      this.val = now || value;
      if (now) {
        this.focus();
      }
    },
    val(now, old) {
      const value = this.multiple ? [] : "";
      this.val = now || value;
      this.$emit("input", this.val);
      this.resetStyle();
    },
    // rangeSeparator(now){

    // }
  },
  methods: {
    focus() {
      this.style = {
        transform: `translateY(${-(this.inputHeight / 2.1)}px)`,
        color: `${this.labelColor} !important`,
        "background-color": this.labelBG,
        padding: "0 12px",
      };

      this.$emit("focus");
    },
    blur() {
      this.resetStyle();
      this.$emit("blur");
    },
    change(val) {
      this.$emit("change", val);
    },
    resetStyle() {
      if (!this.val.length) {
        this.style = {
          bottom: `${this.inputHeight * 0.3}px`,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.clw-select {
  position: relative;

  .label {
    font-size: 14px;
    line-height: 14px;
    position: absolute;
    bottom: 15px;
    left: 15px;
    pointer-events: none;
    transition: all 0.3s ease;
    max-width: -webkit-fill-available;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>