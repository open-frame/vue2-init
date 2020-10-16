import Vue from 'vue'

export const state = Vue.observable({
  isCollapse: JSON.parse(localStorage.getItem("memu-unfold")) ? true : false, // 菜单栏展开状态,展开是false
  width: localStorage.getItem("memu-width") ? JSON.parse(localStorage.getItem("memu-width")) : {memu: "12vw"},
  editLayout: false, // 首页模块调整
  addLayout: false   // 首页添加模块面板
})

export const mutations = {
  //菜单栏展开/折叠切换
  menUnfold(status) {
    state.isCollapse = status;
    localStorage.setItem("memu-unfold", status);
    if (status) {
      state.width = {
        menu: "auto",
        // view: 21
      }
    } else {
      state.width = {
        menu: "12vw",
        // view: 24
      }
    }
    localStorage.setItem("memu-width", JSON.stringify(state.width));
  },

  // 首页布局调整
  editLayout(status) {
    state.editLayout = status;
  },

  // 首页添加模块
  addLayout(status) {
    state.addLayout = status;
  }
}
