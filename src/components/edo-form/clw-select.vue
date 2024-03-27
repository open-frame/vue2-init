<template>
  <div class="pt-3" style="width: -webkit-fill-available">
    <div class="clw-select">
      <el-select :title="title" ref="select" filterable default-first-option clearable collapse-tags :size="size"
        :loading="loading" :disabled="disabled" :multiple="multiple" v-model="val" @focus="focus"
        @visible-change="visibleChange" placeholder="" @input="input" @change="change">
        <template v-if="code">
          <el-option v-for="(item, index) in dropdowns" :key="index" :label="item.code_name"
            :value="item.code_value"></el-option>
        </template>
        <slot v-else></slot>
      </el-select>
      <label class="text-warmgray " :style="style">{{ placeholder }}</label>
    </div>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2022-10-11 13:08:46  星期二
 * @description   自定义下拉框组件
 **/
import { dropdownsAPI } from "@/service/public.js";

export default {
  name: "clw-select",
  props: {
    placeholder: {
      type: String,
    },
    // 父组件v-model绑定的值
    value: {
      type: [String, Array], // 因为用于多选或单选的场景了
    },
    size: {
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
    },
    multiple: {
      type: Boolean,
    },
    loading: {
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
    // 可用于传入字典码，直接渲染选择项
    code: {
      type: String,
    },
  },
  data() {
    return {
      inputHeight: null,
      val: "",
      dropdowns: [],
      style: {},
    };
  },
  mounted() {
    this.inputHeight = this.$refs.select.$el.offsetHeight;
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
      const value = this.multiple ? [] : "";
      this.val = now || value;
      if (now) {
        this.focus();
      }
    },
    val(now, old) {
      const value = this.multiple ? [] : "";
      this.val = now || value;
      this.resetStyle();
    },
  },
  methods: {
    getData() {
      dropdownsAPI(this.code).then((res) => {
        if (res.code === 0) {
          this.dropdowns = res.data;
        }
      });
    },
    focus() {
      this.style = {
        transform: `translateY(${-(this.inputHeight / 2.1)}px)`,
        color: `${this.labelColor} !important`,
        "background-color": this.labelBG,
        padding: "0 12px",
      };
      if (this.code) {
        this.getData();
      }
      this.$emit("focus");
    },
    visibleChange(status) {
      if (!status && this.multiple && this.val.length < 1) {
        this.resetStyle();
      }
      if (!status && !this.val) {
        this.resetStyle();
      }

      this.$emit("visible-change", status);
    },
    input(value) {
      this.$emit("input", value);
    },
    change(val) {
      this.$emit("change", val);
    },
    resetStyle() {
      if (this.multiple && this.val.length < 1) {
        this.style = {
          bottom: `${this.inputHeight * 0.29}px`,
        };
      }
      if (!this.val) {
        this.style = {
          bottom: `${this.inputHeight * 0.29}px`,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.clw-select {
  position: relative;

  label {
    font-size: 14px;
    line-height: 14px;
    position: absolute;
    bottom: 15px;
    left: 15px;
    pointer-events: none;
    transition: all 0.3s ease;
  }
}
</style>