import store from '@/store'

// 全局指令
const directives = {
  // 自动获取焦点
  focus: (el) => {
    el.focus();
  },

  // 平台内页访问权
  permission(el, path) {
    console.log(el, path);
    if (!store.state.permissionRouters.includes(path.value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }

  
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
