export default {
  methods: {
    dataSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryForm.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前第 ${val}页`);
      this.queryForm.pageNum = val;
      this.getData();
    },
  }
}