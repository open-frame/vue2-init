"use strict";(self["webpackChunkedo_project"]=self["webpackChunkedo_project"]||[]).push([[2352],{5705:function(e,t,s){s.r(t),s.d(t,{default:function(){return S}});var r=function(){var e=this,t=e._self._c;return t("el-main",{staticClass:"p-0 bg-light"},[t("nav-menu"),t("el-container",{staticClass:"w-100 d-block view"},[t("pages-tab",{staticClass:"mt-2"}),t("keep-alive",{attrs:{exclude:e.excludeKeepAlivePages,include:e.includeKeepAlivePages}},[e._t("default")],2)],1)],1)},n=[],a=function(){var e=this,t=e._self._c;return t("div",[t("el-header",{staticClass:"bg-white row m-0 align-items-center shadow-sm"},[t("div",{staticClass:"col-2 text-truncate"},[t("router-link",{staticClass:"text-decoration-none h4",attrs:{to:"/"}},[e._v(e._s(e.title))])],1),t("nav-menu",{staticClass:"col-8 d-flex justify-content-center border-0 edo-menu",attrs:{mode:"horizontal",collapse:!1,"default-active":e.$store.state.nowPage,data:e.$store.state.permissionMenu}}),t("div",{staticClass:"col-2 d-flex justify-content-end align-items-center info"},[t("el-dropdown",{on:{command:e.me}},[t("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[e._v(" 欢迎，"+e._s(e.$store.state.userInfo.userName)+" "),t("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{directives:[{name:"permission",rawName:"v-permission",value:"my/center",expression:"'my/center'"}],attrs:{command:"1"}},[e._v("个人中心")]),t("el-dropdown-item",{directives:[{name:"permission",rawName:"v-permission",value:"my/info",expression:"'my/info'"}],attrs:{command:"2"}},[e._v("我的资料")]),t("el-dropdown-item",{attrs:{command:"0",divided:""}},[e._v("退出登录")])],1)],1),t("el-divider",{attrs:{direction:"vertical"}}),t("el-dropdown",{on:{command:e.setings}},[t("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[t("i",{staticClass:"el-icon-s-operation",attrs:{title:"平台设置"}})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.$store.state.showOpenedPages?e._e():t("el-dropdown-item",{attrs:{command:"3",divided:""}},[e._v("显示页签")]),t("el-dropdown-item",{attrs:{command:"1"}},[e._v("切换页面结构")]),t("el-dropdown-item",{attrs:{command:"0",divided:""}},[e._v("清除缓存")])],1)],1),t("el-divider",{attrs:{direction:"vertical"}}),t("el-dropdown",{on:{command:e.helps}},[t("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[t("i",{staticClass:"fa fa-question-circle-o",attrs:{"aria-hidden":"true",title:"帮助"}})]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"1"}},[e._v("使用帮助")]),t("a",{attrs:{href:"mailto:quanyi@edo-iot.com?subject=问题反馈"}},[t("el-dropdown-item",{attrs:{command:"2"}},[e._v(" 反馈问题 ")])],1),t("a",{attrs:{target:"_blank",href:"https://work.weixin.qq.com/kfid/kfcd894c0a8bc6d7627"}},[t("el-dropdown-item",{attrs:{command:"3"}},[e._v(" 在线客服 ")])],1),t("el-dropdown-item",{directives:[{name:"permission",rawName:"v-permission",value:"test-page",expression:"'test-page'"}],attrs:{divided:""}},[t("router-link",{attrs:{to:"/test"}},[e._v("测试页面")])],1)],1)],1),t("el-divider",{attrs:{direction:"vertical"}}),t("i",{class:e.isFullScreen?"fa fa-compress":"el-icon-full-screen",attrs:{title:e.isFullScreen?"退出全屏":"进入全屏"},on:{click:e.fullScreen}}),t("el-divider",{attrs:{direction:"vertical"}}),t("span",{attrs:{title:"当前网络状况"}},[e._v(e._s(e.$store.state.nowNet))])],1)],1),t("page-structure-drawer",{attrs:{show:e.showPageStructureDrawer},on:{close:function(t){e.showPageStructureDrawer=!1}}})],1)},i=[],o=(s(7658),s(9844)),l=s(5572),c={name:"",components:{NavMenu:l.M,"page-structure-drawer":()=>s.e(8243).then(s.bind(s,8243))},directives:{permission:o.r},data(){return{title:"",menus:[],isFullScreen:!1,showPageStructureDrawer:!1}},created(){this.title="亿度物联 · 开源操作平台"},methods:{me(e){switch(e){case"0":this.$store.commit("logout","0");break;case"1":this.$router.push("/my/center");break;case"2":this.$router.push("/my/info");break}},setings(e){switch(e){case"0":localStorage.clear(),location.href="/logon";break;case"1":this.showPageStructureDrawer=!0;break;case"3":this.$store.commit("changeOpenedPages",!0);break}},fullScreen(){if(this.isFullScreen){this.isFullScreen=!1;const e=document,t=e.cancelFullScreen||e.webkitCancelFullScreen||e.mozCancelFullScreen||e.exitFullScreen;if(t)t.call(e);else if("undefined"!==typeof window.ActiveXObject){const e=new ActiveXObject("WScript.Shell");null!=e&&e.SendKeys("{F11}")}}else{this.isFullScreen=!0;const e=document.documentElement,t=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen;if(t)t.call(e);else if("undefined"!==typeof window.ActiveXObject){const e=new ActiveXObject("WScript.Shell");null!=e&&e.SendKeys("{F11}")}}},helps(e){switch(e){case"1":break;case"2":this.$message.info("请留意启动的Email软件");break;case"3":break}}}},d=c,u=s(1001),m=(0,u.Z)(d,a,i,!1,null,"45109457",null),p=m.exports,w=s(1690),v=s(6989),h={name:"container-1",components:{NavMenu:p,PagesTab:w.Z},data(){return{excludeKeepAlivePages:v,includeKeepAlivePages:[]}}},f=h,g=(0,u.Z)(f,r,n,!1,null,"1fc26ed2",null),S=g.exports}}]);