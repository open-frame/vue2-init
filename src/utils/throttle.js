// import Vue from 'vue';



/* // 节流
const on = Vue.prototype.$on;
Vue.prototype.$on = function (event, func) {
  let previous = 0
  let newFunc = func
  // 全局所有点击事件
  if (event === 'click') {
    newFunc = function () {
      const now = new Date().getTime()
      if (previous + 1000 <= now) {
        func.apply(this, arguments)
        previous = now
      }
    }
  }
  on.call(this, event, newFunc)
} */