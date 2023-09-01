import { utils } from 'xlsx'
import XLSXD from 'xlsx-style'

export function exportExcel(json = [], name = "下载的文件") {
    // 增加序号列
    json = json.map((item, index) => {
      return {
        "序号": index + 1,
        ...item
      }
    })
    const excel = utils.book_new();
    let sheet = utils.json_to_sheet(json);

    sheet = excelStyle(sheet);

    // 合并单元格     s: 起始位置,   e: 结束位置,   r: 行,   c: 列
    // sheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }];

    //  设置列宽  [第一列, 第而列, 第三列,  ... ];
    // sheet["!rows"] = [{ wch: 50 }, { wch: 20 }, { wch: 40 }];
    //  设置行高  [第一行, 第二行, 第三行,  ... ];
    // sheet["!rows"] = [{ hpx: 25 }, { hpx: 38 }, { wch: 50 }];

    sheet["!cols"] = aotoWidth(json);

    utils.book_append_sheet(excel, sheet);
    // XLSX.writeFile(excel, name + ".xlsx"); // 使用XLSXD导出

    const file = new Blob([s2ab(
      XLSXD.write(excel, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary',
        cellStyles: true,
      }))])
    downExcel(file, name + ".xlsx");
  }

export function exportWord(){

  }
  
export function exportPDF() {

  }



// 设置表格样式
function excelStyle(sheet) {
  const border = {
    top: {
      style: 'thin',
    },
    bottom: {
      style: 'thin',
    },
    left: {
      style: 'thin',
    },
    right: {
      style: 'thin',
    }
  }

  // 所有的单元格加边框
  for (let key in sheet) {
    if (["!cols", "!ref"].includes(key)) {
      continue;
    }


    sheet[key].s = {
      border,// 所有单元格都加边框
      alignment: {
        // horizontal: "center",
        vertical: "center",
        wrapText: true,
      }
    };
    // 表头是第一行嘛，给表头字体加粗、加背景色
    const row = key.replace(/\D/ig, "");
    if (row === "1") {
      sheet[key].s = {
        border,
        font: {
          bold: true
        },
        fill: {
          fgColor: {
            rgb: "CCCCCC"
          }
        }
      }
    }
  }


  return sheet;
}


// 计算自适应列宽
function aotoWidth(json) {
  // 1.所有表头字符的宽度
  const headsWidth = Object.keys(json[0]).map((value) => {
    if (!value) {
      return 10;
    } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
      return parseFloat(value.toString().length * 2.15);
    } else {
      return parseFloat(value.toString().length * 1.15)
    }
  });
  // console.log("所有表头的宽度：", headsWidth);

  // 2.所有表体字符的宽度
  const rowsWidth = json.map((row) => {
    // 每行数据中值的宽度
    const maxValues = Object.values(row).map((value, index) => {
      let valueWidth;
      if (!value) {
        valueWidth = 10;
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        valueWidth = parseFloat(value.toString().length * 2.15);
      } else {
        valueWidth = parseFloat(value.toString().length * 1.15);
      }
      // console.log("每行数据中值的宽度：", valueWidth);

      // 对比出表头和表体值的最大数
      return Math.max(valueWidth, headsWidth[index]);
    });
    // console.log("本行值中最大宽度：", maxValues);
    return maxValues;
  })
  // console.log("每行数据对比出的最大宽度：", rowsWidth);

  // 3.对比每列表头和表体字符的最大值，自适应表头宽或表体宽
  let aotuWidth = []
  rowsWidth.map((row, index) => {
    let maxWidth = [];
    row.map((value, i) => {
      if (index === 0) {
        maxWidth.push({ wch: value });
      } else {
        maxWidth.push({ wch: Math.max(value, aotuWidth[i].wch) })
      }
    })
    // console.log("最大值：", maxWidth);
    aotuWidth = maxWidth;
  });
  // console.log("每列最大宽度：", aotuWidth);
  return aotuWidth;
}

// 文件流转换
function s2ab(s) {
  if (typeof ArrayBuffer !== 'undefined') {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i <= s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  } else {
    const buf = new Array(s.length)
    for (let i = 0; i <= s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }
}

// 执行下载表格
function downExcel(obj, fileName) {
  const aLink = document.createElement('a')
  aLink.download = fileName
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(obj, fileName)
  } else {
    aLink.href = URL.createObjectURL(obj)
  }
  aLink.click()
  //
  setTimeout(() => {
    URL.revokeObjectURL(obj)
  }, 2000)
}
