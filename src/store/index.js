import Vue from 'vue';
import Vuex from 'vuex';
import state from "./states"
import mutations from "./mutations"
import actions from "./actions"
import VuexPersist from 'vuex-persist'



Vue.use(Vuex)
const vuexLocal = new VuexPersist({
  key:"operation-storage",
})



export default new Vuex.Store({
  //初始的常量集
  state,

  // state存储的数据加工,如同computed作用
  // getters: {},

  //触发改变参数
  mutations,

  //异步触发改变参数
  actions,

  // 拓展插件
  plugins: [vuexLocal.plugin]
})
