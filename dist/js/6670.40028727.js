"use strict";(self["webpackChunkiov_platform"]=self["webpackChunkiov_platform"]||[]).push([[6670],{6670:function(t,e,o){o.r(e),o.d(e,{default:function(){return c}});var a=o(1985),l=function(){var t=this,e=t._self._c;return e(a.Z,{ref:"table",attrs:{size:"mini",loading:t.loading,total:t.total,data:t.tableData,"row-key":"processInstanceId"},on:{"row-dblclick":t.see},scopedSlots:t._u([{key:"columns",fn:function(){return[e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"processInstanceId",label:"流程id"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"processName",label:"流程名称"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"startTime",label:"流程开始时间"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"taskId",label:"任务id"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"taskName",label:"任务名称"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"taskCreateTime",label:"任务开始时间"}})]},proxy:!0}])})},r=[],s=(o(7658),o(741)),n={name:"my-backlog",mixins:[s.vd],data(){return{loading:!1,queryForm:{processDefinitionKey:"",pageSize:5,pageNum:1},tableData:[],total:0}},created(){this.getData()},methods:{getData(){this.tableData=[],this.loading=!0},see(t){this.$router.push({name:"settlement-user-account-withdraw",params:{userId:t.userId}})}}},i=n,p=o(1001),u=(0,p.Z)(i,l,r,!1,null,"2c81848c",null),c=u.exports}}]);