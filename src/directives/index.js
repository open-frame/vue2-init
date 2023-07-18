import $store from '@/store'
import { Notification } from 'element-ui'


// 权限
export const permission = {
  // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding, vnode, oldVnode) {
    // console.log('bind', binding);
  },
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
  inserted(el, binding, vnode, oldVnode) {
    // console.log('inserted', binding);
    const allPermission = [...$store.state.permissionPublic, ...$store.state.permissionButtons];
    if (!allPermission.includes(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
  // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
  update(el, binding, vnode, oldVnode) {
    // console.log('update', binding);
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated(el, binding, vnode, oldVnode) {
    // console.log('componentUpdated', binding);
  },
  unbind(el, binding, vnode, oldVnode) {
    // console.log('unbind', binding);
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