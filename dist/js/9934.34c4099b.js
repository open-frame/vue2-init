"use strict";(self["webpackChunkiov_platform"]=self["webpackChunkiov_platform"]||[]).push([[9934,886],{6867:function(t,e,i){i.d(e,{rd:function(){return n}});i(153);var l=i(2219);function n(t,e){const i=[...l.Z.state.permissionButtons,...l.Z.state.permissionRouters];i.includes(e.value)||t.parentNode&&t.parentNode.removeChild(t)}},886:function(t,e,i){i.d(e,{f:function(){return n},h:function(){return l}});i(7658);function l(t,e=[],i={name:"code_name",value:"code_value"}){if(!t)return t;if(0===e.length)return t;if(!Object.hasOwn(e[0],"code_name")&&"code_name"===i.name)return t;if(t=t.toString(),t.includes(",")){let l=[];for(let n of t.split(","))l.push(e.find((t=>t[i.value]===n)));return l.map((t=>t[i.name])).join(",")}{const l=e.find((e=>e[i.value]===t));return l?l[i.name]:t}}function n(t){if(isNaN(t))return t;t=parseFloat(t),t=t.toFixed(2);const e=/\B(?=(\d{3})+(?!\d))/g;return t.replace(e,",")}},5376:function(t,e,i){i.d(e,{Wl:function(){return n},eL:function(){return s},hv:function(){return a}});i(7658);var l=i(2617);function n(t,e){return l.o.post("/select/box/selectBoxPoint",{codeType:t},e)}async function s(t,e){const i=await l.o.post("/system/dept/treeData",t,e);let n=[];return 0===i.code&&function t(e){e.map((e=>{e.children&&t(e.children),n.push(e)}))}(i.data),n}function a(){return l.o.get("/system/user/add")}},1377:function(t,e,i){i.d(e,{Z:function(){return c}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"pt-3",staticStyle:{width:"-webkit-fill-available"}},[e("div",{staticClass:"clw-select"},[e("el-select",{ref:"select",attrs:{title:t.title,filterable:"","default-first-option":"",clearable:"","collapse-tags":"",size:t.size,loading:t.loading,disabled:t.disabled,multiple:t.multiple,placeholder:""},on:{focus:t.focus,"visible-change":t.visibleChange,input:t.input,change:t.change},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}},[t.code?t._l(t.dropdowns,(function(t,i){return e("el-option",{key:i,attrs:{label:t.code_name,value:t.code_value}})})):t._t("default")],2),e("label",{staticClass:"text-warmgray",style:t.style},[t._v(t._s(t.placeholder))])],1)])},n=[],s=i(5376),a={name:"clw-select",props:{placeholder:{type:String},value:{type:[String,Array]},size:{type:String,default:"medium"},disabled:{type:Boolean},multiple:{type:Boolean},loading:{type:Boolean},labelBG:{type:String,default:"#ffffff"},labelColor:{type:String,default:"#19aa8d"},code:{type:String}},data(){return{inputHeight:null,val:"",dropdowns:[],style:{}}},mounted(){this.inputHeight=this.$refs.select.$el.offsetHeight,this.resetStyle()},computed:{title(){return`${this.placeholder}：${this.val}`}},watch:{value(t,e){const i=this.multiple?[]:"";this.val=t||i,t&&this.focus()},val(t,e){const i=this.multiple?[]:"";this.val=t||i,this.resetStyle()}},methods:{getData(){(0,s.Wl)(this.code).then((t=>{0===t.code&&(this.dropdowns=t.data)}))},focus(){this.style={transform:`translateY(${-this.inputHeight/2.1}px)`,color:`${this.labelColor} !important`,"background-color":this.labelBG,padding:"0 12px"},this.code&&this.getData(),this.$emit("focus")},visibleChange(t){!t&&this.multiple&&this.val.length<1&&this.resetStyle(),t||this.val||this.resetStyle(),this.$emit("visible-change",t)},input(t){this.$emit("input",t)},change(t){this.$emit("change",t)},resetStyle(){this.multiple&&this.val.length<1&&(this.style={bottom:.29*this.inputHeight+"px"}),this.val||(this.style={bottom:.29*this.inputHeight+"px"})}}},o=a,r=i(1001),u=(0,r.Z)(o,l,n,!1,null,"88ac5862",null),c=u.exports}}]);