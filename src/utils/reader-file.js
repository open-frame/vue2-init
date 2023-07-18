import { read, utils } from "xlsx";


export default {
  // excel表格转json数据
  excel_to_json(file) {
    console.log(file);
    return new Promise((resolve, reject) => {
      if (["xlsx", "xls"].includes(file.name)) {
        this.$message({ type: "warning", message: "非excel文件！请重新选择" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const excel = read(e.target.result, {
          type: "binary",
        });
        console.log(excel);

        const json = excel.SheetNames.map((item) => {
          return utils.sheet_to_json(excel.Sheets[item]);
        });

        console.log(json);
        resolve(json)
      };

      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsBinaryString(file.raw);
    })

  },

  // word转pdf
  word_to_pdf() {

  }
}