"use strict";(self["webpackChunkiov_platform"]=self["webpackChunkiov_platform"]||[]).push([[4786],{4786:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var l=a(1985),o=function(){var e=this,t=e._self._c;return t(l.Z,{ref:"table",attrs:{size:"mini",data:e.tableData,"empty-text":"今日暂无新增用户"},on:{"row-dblclick":e.see},scopedSlots:e._u([{key:"columns",fn:function(){return[t("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"loginName",label:"账号"}}),t("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"balance",label:"余额"}}),t("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"integral",label:"积分"}})]},proxy:!0}])})},r=[],n=(a(7658),a(6572)),s={name:"new-users",data(){return{tableData:[]}},created(){this.getData()},methods:{getData(){(0,n.a)({pageNum:1,pageSize:99}).then((e=>{this.tableData=e.rows}))},see(e){this.$router.push({name:"management-use-electric-index",params:{loginName:e.loginName}})}}},i=s,u=a(1001),p=(0,u.Z)(i,o,r,!1,null,"068a8a44",null),c=p.exports}}]);