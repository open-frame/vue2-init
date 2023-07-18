export default {
  methods: {
    reset(fn) {
      for (let item in this.queryForm) {  // 重置的对象要叫queryForm
         this.queryForm[item] = "";
        if (item === "pageNum") {
          this.queryForm["pageNum"] = 1;
        }
        if (item === "pageSize") {
          this.queryForm["pageSize"] = this.$tableDataSize;
        }
      }
      this.getData(); // 注意重置条件后获取数据的方法要叫getData
      if (fn && typeof fn === "function") {
        fn()
      }
    },
  }
}