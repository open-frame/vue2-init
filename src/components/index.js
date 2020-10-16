// 全局组件
import Test from './test'



const components = {
  Test
}

export default {
  install(Vue) {
    Object.keys(components).forEach(item => {
      Vue.component(components[item].name, components[item])
    })
  }
}
