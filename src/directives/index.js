import $store from '@/store'
import { Notification } from 'element-ui'




// https://quanyi.blog.csdn.net/article/details/131324520


// 权限
export function permission(el, data) {
  // console.log(el, data);
  const permissions = [...$store.state.permissionButtons, ...$store.state.permissionRouters];
  if (!permissions.includes(data.value)) {
    el.parentNode && el.parentNode.removeChild(el);
  }
}

// 复制文本
export function copy(el, data) {
  el.onclick = function () {
    if (!data.value && !el.innerText) return;
    let textarea = document.createElement("textarea");
    textarea.readOnly = 'readonly';
    textarea.value = data.value || el.innerText;
    el.appendChild(textarea);
    textarea.select();
    const result = document.execCommand("Copy");
    if (result) {
      Notification.success({
        duration: 1800,
        title: '复制成功',
        message: textarea.value,
        type: 'success'
      });
    } else {
      Notification.error({
        title: '错误',
        message: '复制失败'
      });
    }
    el.removeChild(textarea);
  }
}


// 选择器滚动加载
export function loadmore(el, data) {
  const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
  SELECTWRAP_DOM.addEventListener('scroll', function () {
    const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
    if (CONDITION) {
      // binding.value 是指令的绑定值，该值可能是字符串，数字、函数
      // binding.value() 表示执行 v-loadmore 绑定的函数
      data.value()
    }
  })
}
