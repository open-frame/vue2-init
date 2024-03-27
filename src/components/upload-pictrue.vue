<template>
  <el-dialog
    :close-on-click-modal="false"
    class="edit-events-dialog"
    :close-on-press-escape="false"
    :append-to-body="true"
    :modal-append-to-body="false"
    :title="title"
    :visible="show"
    :before-close="close"
  >
    <el-upload
      drag
      class="text-center"
      ref="uploadEventPictrue"
      :auto-upload="false"
      :action="uploadEventPictrueURL"
      :headers="uploadEventPictrueHeaders"
      :show-file-list="false"
      accept="image/*"
      :data="data"
      :on-change="onChange"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onLoadingClose"
      :before-upload="beforeUpload"
      v-loading="submitBtnStatus"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <img v-if="eventImage" :src="eventImage" alt="图例" :style="{ width }" />
      <div
        v-else
        class="flex flex-justify-center flex-items-center"
        :style="{ height, width }"
      >
        <div>
          <i class="el-icon-upload m-0"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          <div class="text-center text-warmgray ">
            仅支持png、jpeg、jpg或gif格式
          </div>
        </div>
      </div>
    </el-upload>

    <div class="text-center mt-5" v-if="placeholder">{{ placeholder }}</div>
    <span slot="footer">
      <el-button @click="close">关 闭</el-button>
      <el-button
        type="primary"
        :disabled="!eventImage"
        :loading="submitBtnStatus"
        @click="uploading"
        >上 传</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
/**
 * @author        全易
 * @time          2021-12-23 10:52:38  星期四
 * @description   上传图片   属性、方法同elementUI
 **/
 import Compressor from 'compressorjs/dist/compressor.js';

export default {
  name: "upload-pictrue",
  data() {
    return {
      uploadEventPictrueURL: "",
      uploadEventPictrueHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      eventImage: "",
      submitBtnStatus: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "上传图片",
    },
    height: {
      type: String,
      default: "160px",
    },
    width: {
      type: String,
      default: "360px",
    },
    placeholder: {
      type: String,
      default() {
        return `请上传${this.height}×${this.width}的图片`;
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    show(now) {
      if (now) {
        this.uploadEventPictrueURL = `${process.env.VUE_APP_BASE_URL}${this.url}`;
      }
    },
  },
  methods: {
    // 选择图片后
    onChange(file, all) {
      console.log(file, all);
      const that = this;
      new Compressor(file.raw, {
        success(result) {
          console.log("压缩后：", result);
          that.eventImage = URL.createObjectURL(result);
          console.log(that.eventImage);
        },
      });
    },
    // 图例上传前
    beforeUpload(file) {
      console.log(file);
      const isIMG =
        file.type === "image/png" || "image/jpeg" || "image/jpg" || "image/gif";
      if (!isIMG) {
        return this.$message.error("只能上传图片");
      }
    },
    // 执行上传
    uploading() {
      if (!this.eventImage) {
        return this.$message.info("请选择图片");
      }

      this.$refs.uploadEventPictrue.submit();
    },
    // 文件上传时
    onProgress() {
      this.submitBtnStatus = true;
    },
    // 响应成功
    onSuccess(res, file, all) {
      if (res.code === 2001) {
        return this.$store.commit("logout", "1");
      }
      this.submitBtnStatus = false;
      if (res.code === 0) {
        this.$message.success("上传成功");
        this.close();
        this.$emit("success", res);
      } else {
        this.$message({
          type: "error",
          duration: 4000,
          message: res.msg,
        });
      }
    },
    // 响应失败
    onLoadingClose(res, file, all) {
      this.submitBtnStatus = false;
    },
    // 清空上传信息
    clearUploadInfo() {
      this.eventImage = "";
      this.$refs.uploadEventPictrue.clearFiles();
      this.submitBtnStatus = false;
    },
    // 关闭上传活动图例面板
    close() {
      if (this.submitBtnStatus) {
        this.$refs.uploadEventPictrue.abort();
      }
      this.$emit("before-close", false);
      URL.revokeObjectURL(this.eventImage);
      this.clearUploadInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.edit-events-dialog {
  ::v-deep .el-upload-dragger {
    height: auto;
    width: auto;
  }
}
</style>