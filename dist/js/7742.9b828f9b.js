"use strict";(self["webpackChunkiov_platform"]=self["webpackChunkiov_platform"]||[]).push([[7742],{7742:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var o=function(){var e=this,t=e._self._c;return t("el-card",{},[t("button",{on:{click:e.toB}},[e._v("跳转")]),t("button",{on:{click:e.getJS}},[e._v("获取")]),t("button",{on:{click:e.dataSplite}},[e._v("数据切片")]),t("div",[e._v(e._s(e._f("toThousands")("21517753")))]),t("custom-area-select",{attrs:{animatLable:"",placeholder:"隶属区域"},model:{value:e.supplier,callback:function(t){e.supplier=t},expression:"supplier"}}),t("iframe",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"iframe",attrs:{title:"iframe",seamless:"",width:"100%",height:"100%",src:e.iframeURL}})],1)},r=[],s=(n(7658),n(886)),a={name:"test-page",components:{},filters:{toThousands:s.f},data(){return{prop1:"type",prop2:"size",event:"click",supplier:"1",iframeURL:"http://localhost:8081",tableData:[],printPrderDialog:!1}},errorCaptured(e,t,n){},created(){},methods:{dataSplite(){let e=[];for(let r=1;r<=105;r++)e.push({id:r,name:"🍊"+r});const t=20,n=Math.ceil(e.length/t);let o=[];for(let r=0;r<n;r++)o.push(e.slice(r*t,r*t+t))},toB(){this.$refs.iframe.contentWindow.postMessage(JSON.stringify({token:666}),"http://localhost:8081"),window.open("http://localhost:8081","_blank")},print(){this.printPrderDialog=!0,this.$refs["print-order"].getDropdowns()},sendParams(){this.$refs.iframe.contentWindow.postMessage("儿子，给你参数参数参数参数参数参数参数",this.iframeURL)},toJSON(e){if(["xlsx","xls"].includes(e.name))return void this.$message({type:"warning",message:"非excel文件！请重新选择"});const t=new FileReader;t.onload=e=>{const t=XLSX.read(e.target.result,{type:"binary"});t.SheetNames.map((e=>XLSX.utils.sheet_to_json(t.Sheets[e])))},t.readAsBinaryString(e.raw)},toExcel(){const e=XLSX.utils.book_new(),t=[{"IMEI(设备编号)":"86482351421321111","设备名称":"饭少吃","设备类型":"空开","设备型号":"ML-200","NB卡号":"32113213","批次号":"11113333111","出厂编号":"4213231231215431","出厂日期是发哈是开放的粉红色":"2020-01-22 12:44:10","产品标识":"7665323144642124","设备密钥":"cc76w454321a2674j3g65"},{"IMEI(设备编号)":"86482351422131231321111","设备名称":"上点饭","设备类型":"电能表","设备型号":"ML-2100","NB卡号":"323213","批次号":"111133763433444441153531","出厂编号":"215431","出厂日期是发哈是开放的粉红色":"2020-01-22 12:44:10","产品标识":"7665323144642124","设备密钥":"cc76w45432142312312312312312312a2674j3g65"},{"IMEI(设备编号)":"1231321111","设备名称":"粉丝地方撒","设备类型":"空开","设备型号":"ML-200","NB卡号":"3213213213","批次号":"1111333344444111","出厂编号":"21543881","出厂日期是发哈是开放的粉红色":"2020-01-22 12:44:10","产品标识":"766534642124","设备密钥":"cc76w45432142312312312a2674j3g65"}];let n=XLSX.utils.json_to_sheet(t,{});n["A1"].s={font:{bold:!0,sz:28,color:{rgb:"#D35A36"}},alignment:{horizontal:"center",vertical:"center"},border:{top:{style:"thin"},bottom:{style:"thin"},left:{style:"thin"},right:{style:"thin"}},fill:{bgColor:{indexed:64},fgColor:{rgb:"CCCCCC"}}},XLSX.utils.book_append_sheet(e,n);const o=new Blob([this.s2ab(XLSXD.write(e,{bookType:"xlsx",bookSST:!0,type:"binary",cellStyles:!0}))]),r="表格1.xlsx";this.downExcel(o,r)},downExcel(e,t){const n=document.createElement("a");n.download=t,"msSaveOrOpenBlob"in navigator?window.navigator.msSaveOrOpenBlob(e,t):n.href=URL.createObjectURL(e),n.click(),setTimeout((()=>{URL.revokeObjectURL(e)}),2e3)},s2ab(e){if("undefined"!==typeof ArrayBuffer){const t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let o=0;o<=e.length;++o)n[o]=255&e.charCodeAt(o);return t}{const t=new Array(e.length);for(let n=0;n<=e.length;++n)t[n]=255&e.charCodeAt(n);return t}},doSomeing(){},getJS(){window.XLSX||fetch("https://unpkg.com/xlsx@0.18.5").then((e=>e.blob().then((e=>{let t=new FileReader;t.readAsBinaryString(e),t.onload=function(e){new Function(e.currentTarget.result)()}}))))}}},l=a,i=n(1001),c=(0,i.Z)(l,o,r,!1,null,"70859c9d",null),h=c.exports}}]);