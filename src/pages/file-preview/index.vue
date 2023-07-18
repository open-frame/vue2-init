<template>
  <el-card class="">
    <button type="button" class="btn btn-primary" @click="word">word</button>
    <button type="button" class="btn btn-success" @click="excel">excel</button>
    <el-button @click="ppt">PPT</el-button>
    <el-button type="danger" @click="pdf">pdf</el-button>
  </el-card>
</template>

<script>
/**
* @author        全易
* @time          2023-06-30 17:23:43  星期五
* @description   
**/
const path = "https://view.officeapps.live.com/op/view.aspx?src=";

export default {
  name: 'file-preview-index',
  data() {
    return {
    }
  },
  methods: {
    word() {
      window.open(path + "https%3A%2F%2F501351981.github.io%2Fvue-office%2Fexamples%2Fdist%2Fstatic%2Ftest-files%2Ftest.docx&wdOrigin=BROWSELINK",
        "_blank",
        "location=no, status=no, menubar=no"
      );
    },
    excel() {
      window.open(path + "https%3A%2F%2F501351981.github.io%2Fvue-office%2Fexamples%2Fdist%2Fstatic%2Ftest-files%2Ftest.xlsx&wdOrigin=BROWSELINK",
        "_blank",
        "location=no, status=no, menubar=no"
      );
    },
    ppt() {
      window.open(path + "文件地址",
        "_blank",
        "location=no, status=no, menubar=no"
      );
    },
    pdf() {
      const path = "https://api.boot.jeecg.com/generic/web/viewer.html?file=";
      window.open(path + "https%3A%2F%2Fjeecgos.oss-cn-beijing.aliyuncs.com%2Ffiles%2Fsite%2Fjava_p3c.pdf",
        "_blank",
        "location=no, status=no, menubar=no"
      );
    }
  }
}
</script>

<style lang="less" scoped></style>