// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './router/guards'
import ElementUI from 'element-ui';
import '../static/theme/index.css'
import directives from './directives/index'
import components from './components'
import commons from "./common/common.js";
import filters from './filters/index.js'
import * as store from '@/store'
import 'default-passive-events'
import "animate.css"; // 引入动画






Vue.use(ElementUI);
Vue.use(filters);
Vue.use(directives);
Vue.use(components);
Vue.config.productionTip = false
Vue.prototype.$commons = commons;
Vue.prototype.$store = store;






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
