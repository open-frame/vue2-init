import Vue from 'vue';
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import eidaTable from "./components/custom-table.vue"
import './router/guards'
import "./utils/listener-net.js"
import "./utils/debounce.js"







Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$tableDataSize = 15;
Vue.component(eidaTable.name, eidaTable)






new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  template: '<App/>',
}).$mount('#app')
