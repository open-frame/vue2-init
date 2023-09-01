// 重置表格筛选参数
export const queryReset = {
  methods: {
    queryReset(form, method = "getData", fn) {
      if (!this[form]) {
        form = "queryForm";
      }

      for (let item in this[form]) {
        this[form][item] = "";
        if (item === "pageNum") {
          this[form]["pageNum"] = 1;
        }
        if (item === "pageSize") {
          this[form]["pageSize"] = this.$tableDataSize;
        }
      }
      this[method]();
      if (fn && typeof fn === "function") {
        fn()
      }
    },
  }
}


// 重置页码
export const pageReset = {
  methods: {
    pageReset() {
      try {
        this.queryForm["pageNum"] = 1;
      } catch (err) { }
    },
  }
}


// 翻页方法
export const pagination = {
  methods: {
    dataSizeChange(val, form = "queryForm", method = "getData") {
      console.log(`每页 ${val} 条`);
      this[form].pageSize = val;
      this[method]();
    },
    handleCurrentChange(val, method = "getData") {
      console.log(`当前第 ${val}页`);
      this.queryForm.pageNum = val;
      this[method]();
    },
  }
}