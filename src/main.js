import Vue from 'vue';
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import { registComponents } from './utils/auto-elementUI.js'
import './assets/css/theme/index.css'
import './router/guards.js'
import "./utils/debounce.js"
import "./utils/authorization.js"
import 'uno.css'






registComponents(Vue);
Vue.config.productionTip = false;
Vue.prototype.$tableDataSize = 15;
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, vm, info);
}





new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  template: '<App/>',
  renderError(h, err) {
    console.log(err);
    return h('pre', { style: { color: 'red' } }, err.stack)
  }
}).$mount('#app')
