// 全局指令
const directives = {
  // 自动获取焦点
  focus: (el) => {
    el.focus();
  },
  
}



export default {
  install(Vue) {
    Object.keys(directives).forEach(item => {
      Vue.directive(item, {
        inserted: directives[item]
      })
    })
  }
}
