// import Vue from 'vue'
// import Vuex from 'vuex'
import states from "./states"
import mutations from "./mutations"
import actions from "./actions"
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: localStorage  // 可选存储位置：sessionStorage/indexDB
})

export default new Vuex.Store({
  //初始的常量集
  state: states,

  // state存储的数据加工,如同computed作用
  // getters: {},

  //触发改变参数
  mutations: mutations,

  //异步触发改变参数
  actions: actions,

  // 拓展插件
  plugins: [vuexLocal.plugin]
})
