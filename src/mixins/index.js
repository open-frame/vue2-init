// 重置表格筛选参数
// https://blog.csdn.net/qq_42618566/article/details/124608052
export const queryReset = {
  methods: {
    queryReset(form, method = "getData", fn) {
      if (!this[form]) {
        form = "queryForm";
      }

      this.$data[form] = this.$options.data()[form];
      this[form]["pageNum"] = 1;
      this[form]["pageSize"] = this.$tableDataSize;

      if (Object.keys(this.$route.query).length > 0) {
        this.$router.replace(this.$route.path); // 清空url拼接的参数
        this.$store.state.openedPages.find((item, index) => {
          if (item.meta.menuIdStr === this.$route.meta.menuIdStr) {
            this.$store.state.openedPages[index].fullPath = item.path;
          }
        })
      }
      try {
        this.$refs.table.clearSelection();
      } catch (error) { }

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
    pageReset(form) {
      if (!this[form]) {
        form = "queryForm";
      }

      this[form]["pageNum"] = 1;
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
    handleCurrentChange(val, form = "queryForm", method = "getData") {
      console.log(`当前第 ${val}页`);
      this[form].pageNum = val;
      this[method]();
    },
  }
}

// 获取页面跳转过来的参数
export const parseParmas = {
  created() {
    // this.noArguments()
  },
  activated() {
    this.getArguments("params"); // 解析post传参数
    this.getArguments("query");  // 解析get传参
  },
  methods: {
    getArguments(type, form = "queryForm", method = "getData") {
      console.log(type + "过来的参数:", this.$route[type]);
      if (Object.keys(this.$route[type]).length === 0) {
        return;
      }

      for (let key in this.$route[type]) {
        for (let item in this[form]) {
          if (key === item) {
            this[form][item] = this.$route[type][item];
          }
        }
      }
      this[method]();
    },
    noArguments(method = "getData") {
      const { params, query } = this.$route;
      const hasParams = Object.keys(params).length;
      const hasQuery = Object.keys(query).length;
      if (!hasParams && !hasQuery) {
        this[method]();
      }
    }
  }
}



// 编辑表单模态框的混入
export const editFormDialog = {
  data() {
    return {
      showEditFormDialogrVisible: false
    }
  },
  methods: {
    closeEditFormVisible(formName, fn) {
      this.showEditFormDialogrVisible = false;
      this.$nextTick(() => { // 为了兼容用于先执行关闭操作
        this.$refs[formName].resetFields();
        if (fn && typeof fn === "function") {
          fn()
        }
      });
    },
  }
}