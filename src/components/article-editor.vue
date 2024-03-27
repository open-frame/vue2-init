<template>
  <vue-quill-editor class="editor" v-model="content" ref="quillEditor" :options="editorOption" @change="onEditorChange">
  </vue-quill-editor>
</template>

<script>
/**
 * @author        全易
 * @time          2022-05-11 10:48:24  星期三
 * @description   图文编辑器
 **/
// https://juejin.cn/post/6976023288753586184
// https://www.kancloud.cn/liuwave/quill/1409423
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "article-editor",
  components: { "vue-quill-editor": quillEditor },
  props: {
    // 父组件v-model绑定的值
    value: {
      type: String,
    },
  },
  watch: {
    // 实时联动父组件传来的值
    value: {
      immediate: true, // 立即处理 进入页面就触发
      handler(now, old) {
        this.content = now;
      },
    },
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
        placeholder: "请输入正文",
        // bounds 编辑器内浮框的边界
        // debug debug级别
        // formats 格式白名单[background bold color font code italic link size strike script underline]
        // readOnly 只读模式
        // scrollingContainer 滚动容器
      },
    };
  },
  methods: {
    onEditorChange() {
      this.$emit("input", this.content);
    },
  },
};

// 工具栏配置项【注释掉的工具是小程序不支持的node】
const toolbarOptions = [
  // 加粗、斜体、下划线、删除线、
  ["bold", "italic", "underline", "strike"],

  // 链接
  // ["link"],

  // 图片、视频
  ["image", "video"],

  // 引用、代码块
  ["blockquote", "code-block"],

  // 文本颜色、文本背景色
  [{ color: [] }, { background: [] }],

  // 有序、无序列表
  [{ list: "ordered" }, { list: "bullet" }],

  // 上标/下标
  [{ script: "sub" }, { script: "super" }],

  // 缩进
  [{ indent: "-1" }, { indent: "+1" }],

  // 文本方向
  [{ direction: "rtl" }],

  // 对齐方式
  [{ align: [] }],

  // 字号
  [{ size: ["small", false, "large", "huge"] }],

  // 标题
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // 字体
  [{ font: [] }],

  // 清除内容格式
  ["clean"],
];
</script>

<style lang="less" scoped>
.editor {
  line-height: normal;

  ::v-deep .ql-editor {
    min-height: 270px;
    max-height: 600px;
  }
}
</style>