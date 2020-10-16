// 全局过滤器
const filters = {
  // 文本转换
  tranForm(data) {
    switch (data) {
      case "1":
        return "哈哈";
      case "2":
        return "丫丫";
      case "3":
        return "拉拉";
      case "4":
        return "大大阿达";
    }
  },

  // 

}



export default {
  install(Vue) {
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    })
  }
}
