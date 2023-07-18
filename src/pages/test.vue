<template>
  <el-card class="">
    <button @click="toB">跳转</button>
    <!-- <el-button :[prop1]="'primary'" :[prop2]="'mini'" @[event]="doSomeing"
      >点击</el-button
    > -->
    <button @click="getJS">获取</button>
    <div>
      <el-upload ref="upload" accept=".xls,.xlsx" action="" :auto-upload="false" :on-change="toJSON"
        :show-file-list="false">
        <el-button>EXCEL 导入</el-button>
      </el-upload>
      <el-button @click="toExcel">导出 EXCEL</el-button>
    </div>
    
    <!-- <el-input v-model="supplier" />
    <el-select v-model="supplier" code="1001"></el-select>
    <el-select v-model="supplier">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
    </el-select> -->

    <!-- <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="抄表日期"
      v-model="supplier"></el-date-picker>
    <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="抄表日期"
      v-model="supplier"></el-date-picker> -->

    <iframe v-show="false" title="iframe" seamless width="100%" height="100%" ref="iframe" :src="iframeURL"></iframe>

    <!-- <div v-copy>点我呀，复制</div> -->

    <!-- <table-transfer
      :data="tableData"
      row-key="stakeNo"
      @transfer="transferTable"
    >
      <template v-slot:left-columns>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
      </template>
      <template v-slot:right-columns>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stakeNo" label="设备编号">
        </el-table-column>
      </template>
    </table-transfer> -->

    <!-- <button @click="print">打印</button>
    <print-order ref="print-order" clearNo="QF202209280001" :show="printPrderDialog" @show="status=>{ printPrderDialog=status }"> </print-order> -->
    <!-- <address-cascader v-model="supplier" /> -->
  </el-card>
</template>

<script>
/**
 * @author        全易
 * @time          2022-08-30 10:32:55  星期二
 * @description   测试页面
 **/
// import XLSXD from "xlsx-style";
// import  * as XLSX from "xlsx";


export default {
  name: "test-page",
  components: {
    // "print-order": () => import("./settlement/distribution/final/components/print-order.vue"),
  },
  data() {
    return {
      prop1: "type",
      prop2: "size",
      event: "click",
      supplier: "1",
      iframeURL: "http://localhost:8081",
      tableData: [],
      printPrderDialog: false,
    };
  },
  created() {
    /*     //验证
    this.$refs.examine.validateField("barCode");
    this.rules.barCode= [{ required: true, message: '请上传图片' }]
     
     
    //取消验证
    this.$refs.examine.clearValidate('barCode'); */




    // this.getPlugin();
  },
  // mounted() {
  //   window.addEventListener("message", (data) => {
  //     console.log(data);
  //   });
  // },
  // destroyed() {
  //   window.removeEventListener("message");
  // },
  methods: {
    getPlugin() {
      fetch(`https://unpkg.com/xlsx@0.18.5`)
        .then((res) => {
          console.log(res);
          return res.blob();
        })
        .then((res) => {
          console.log(res);

          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(e);

          };
          reader.readAsBinaryString(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toB() {
      this.$refs.iframe.contentWindow.postMessage(
        JSON.stringify({ token: 666 }),
        "http://localhost:8081"
      );
      window.open("http://localhost:8081", "_blank");
    },
    print() {
      this.printPrderDialog = true;
      this.$refs["print-order"].getDropdowns();
    },
    transferTable(direction, data) {
      console.log(direction, data);
    },
    sendParams() {
      this.$refs.iframe.contentWindow.postMessage(
        "儿子，给你参数参数参数参数参数参数参数",
        this.iframeURL
      );
    },
    toJSON(file) {
      console.log(file);
      if (["xlsx", "xls"].includes(file.name)) {
        this.$message({ type: "warning", message: "非excel文件！请重新选择" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const excel = XLSX.read(e.target.result, {
          type: "binary",
        });
        // console.log(excel);

        const json = excel.SheetNames.map((item) => {
          return XLSX.utils.sheet_to_json(excel.Sheets[item]);
        });
        console.log(json);
      };
      reader.readAsBinaryString(file.raw);
    },
    toExcel() {
      const excel = XLSX.utils.book_new();
      /*  https://www.jianshu.com/p/1f858b9cdaf3


      */

      const demo = [
        {
          "IMEI(设备编号)": "86482351421321111",
          设备名称: "饭少吃",
          设备类型: "空开",
          设备型号: "ML-200",
          NB卡号: "32113213",
          批次号: "11113333111",
          出厂编号: "4213231231215431",
          出厂日期是发哈是开放的粉红色: "2020-01-22 12:44:10",
          产品标识: "7665323144642124",
          设备密钥: "cc76w454321a2674j3g65",
        },
        {
          "IMEI(设备编号)": "86482351422131231321111",
          设备名称: "上点饭",
          设备类型: "电能表",
          设备型号: "ML-2100",
          NB卡号: "323213",
          批次号: "111133763433444441153531",
          出厂编号: "215431",
          出厂日期是发哈是开放的粉红色: "2020-01-22 12:44:10",
          产品标识: "7665323144642124",
          设备密钥: "cc76w45432142312312312312312312a2674j3g65",
        },
        {
          "IMEI(设备编号)": "1231321111",
          设备名称: "粉丝地方撒",
          设备类型: "空开",
          设备型号: "ML-200",
          NB卡号: "3213213213",
          批次号: "1111333344444111",
          出厂编号: "21543881",
          出厂日期是发哈是开放的粉红色: "2020-01-22 12:44:10",
          产品标识: "766534642124",
          设备密钥: "cc76w45432142312312312a2674j3g65",
        },
      ];

      let data = XLSX.utils.json_to_sheet(demo, {
        // origin: "A2", // 设置插入位置
      });
      // A列第一行的样式
      data["A1"].s = {
        // 文本样式
        font: {
          bold: true,
          sz: 28,
          color: { rgb: "#D35A36" },
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        // 给单元格边框加粗 'thin'为细线 ，'thick'为粗线
        border: {
          top: {
            style: "thin",
          },
          bottom: {
            style: "thin",
          },
          left: {
            style: "thin",
          },
          right: {
            style: "thin",
          },
        },
        // 单元格样式
        fill: {
          bgColor: {
            indexed: 64,
          },
          fgColor: {
            rgb: "CCCCCC",
          },
        },
      };
      console.log(data);

      //  设置列宽  [第一列, 第而列, 第三列,  ... ];
      // data["!rows"] = [{ wch: 50 }, { wch: 20 }, { wch: 40 }];
      //  设置行高  [第一行, 第二行, 第三行,  ... ];
      // data["!rows"] = [{ hpx: 25 }, { hpx: 38 }, { wch: 50 }];

      XLSX.utils.book_append_sheet(excel, data);
      //XLSX.writeFile(excel, "空开填写模板.xlsx");
      const tmpDown = new Blob([
        this.s2ab(
          XLSXD.write(excel, {
            bookType: "xlsx",
            bookSST: true,
            type: "binary",
            cellStyles: true,
          })
        ),
      ]);
      const deviceName = "表格1.xlsx";
      this.downExcel(tmpDown, deviceName);
    },
    // 执行下载表格
    downExcel(obj, fileName) {
      const a_node = document.createElement("a");
      a_node.download = fileName;
      if ("msSaveOrOpenBlob" in navigator) {
        window.navigator.msSaveOrOpenBlob(obj, fileName);
      } else {
        a_node.href = URL.createObjectURL(obj);
      }
      a_node.click();
      //
      setTimeout(() => {
        URL.revokeObjectURL(obj);
      }, 2000);
    },
    // 文件流转换
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefined") {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i <= s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      } else {
        const buf = new Array(s.length);
        for (let i = 0; i <= s.length; ++i) {
          buf[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
      }
    },
    doSomeing() {
      console.log("事件执行了");
    },
    // 获取在线js文件
    getJS() {
      console.log(window.XLSX);
      fetch("https://unpkg.com/xlsx@0.18.5").then(res => res.blob().then(blob => {
        console.log(blob);
        let reader = new FileReader();
        reader.readAsBinaryString(blob);
        reader.onload = function (result) {
          console.log(result);
         new Function(result.currentTarget.result)();
          // eval(result.currentTarget.result);
          console.log(window.XLSX);
        }
      }));
    }
  },
};
</script>

<style lang="less" scoped></style>