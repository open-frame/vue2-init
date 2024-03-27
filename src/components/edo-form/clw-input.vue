<template>
  <div class="pt-3">
    <div class="clw-input">
      <el-input :type="type" :title="title" ref="input" clearable :disabled="disabled" :size="size" v-model="val" @focus="focus"
        @blur="blur" @input="input" @change="change" />
      <label class="text-warmgray " :style="style">{{ placeholder }}</label>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2022-10-11 13:08:46  星期二
 * @description   自定义输入框组件
 **/

export default {
  name: "clw-input",
  props: {
    placeholder: {
      type: String,
    },
    // 父组件v-model绑定的值
    value: {
      type: String, // 因为用于多选或单选的场景了
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
    },
    labelBG: {
      type: String,
      default: "#ffffff",
    },
    labelColor: {
      type: String,
      default: "#19aa8d",
    },
    type: {
      type: String,
    }
  },
  data() {
    return {
      inputHeight: null,
      val: "",
      style: {},
    };
  },
  mounted() {
    this.inputHeight = this.$refs.input.$el.offsetHeight;
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
      this.val = now;
      if (now) {
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
      if (!this.val) {
        this.resetStyle();
      }

      this.$emit("blur");
    },
    input(val) {
      this.$emit("input", val);
    },
    change(val) {
      this.$emit("change", val);
    },
    resetStyle() {
      if (!this.val) {
        this.style = {
          bottom: `${this.inputHeight * 0.37}px`,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.clw-input {
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