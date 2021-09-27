// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import store from './store'
import router from './router'
import './router/guards'
import '../static/theme/index.css'
import "./assets/css/element.less";
import "./assets/css/public.css"
import "./assets/css/style.less";
import components from './components'
import directives from './directives/index'
import filters from './filters/index.js'
import commons from "./utils/common.js";
import secret from "./utils/secret.js";
import publicAPI from "./service/request/public.js";
import systemAPI from "./service/request/system.js";
import 'default-passive-events'
import "animate.css";
import "./utils/listener-net.js"







Vue.use(components);
Vue.use(filters);
Vue.use(directives);




Vue.config.productionTip = false
Vue.prototype.$commons = commons;
Vue.prototype.$secret = secret;
Vue.prototype.$publicAPI = publicAPI;
Vue.prototype.$systemAPI = systemAPI;






/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
