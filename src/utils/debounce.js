import Vue from 'vue';




// 防抖处理 - 先执行
const on = Vue.prototype.$on;
Vue.prototype.$on = function (event, fn) {
  // console.log(event,fn);
  let newFN = fn;
  // 全局所有点击事件
  if (event === 'click') {
    let timer;
    let flag = true;
    newFN = function () {
      if (flag) {
        fn.apply(this, arguments)
        flag = false
      }
      clearTimeout(timer)
      timer = setTimeout(function () {
        flag = true
      }, 800)
    }
  }
  on.call(this, event, newFN)
}


/* // 防抖处理 - 后执行
const on = Vue.prototype.$on;
Vue.prototype.$on = function (event, fn) {
  let timer
  let newFN = fn
  if (event === 'click') {
    newFN = function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(this, arguments)
      }, 6000)
    }
  }
  on.call(this, event, newFN)
} */