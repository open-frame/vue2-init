"use strict";(self["webpackChunkedo_project"]=self["webpackChunkedo_project"]||[]).push([[331],{987:function(t){var e,n,o=Function.prototype.toString,c="object"===typeof Reflect&&null!==Reflect&&Reflect.apply;if("function"===typeof c&&"function"===typeof Object.defineProperty)try{e=Object.defineProperty({},"length",{get:function(){throw n}}),n={},c((function(){throw 42}),null,e)}catch(m){m!==n&&(c=null)}else c=null;var r=/^\s*class\b/,u=function(t){try{var e=o.call(t);return r.test(e)}catch(n){return!1}},l=function(t){try{return!u(t)&&(o.call(t),!0)}catch(e){return!1}},f=Object.prototype.toString,i="[object Object]",a="[object Function]",p="[object GeneratorFunction]",y="[object HTMLAllCollection]",b="[object HTML document.all class]",j="[object HTMLCollection]",s="function"===typeof Symbol&&!!Symbol.toStringTag,h=!(0 in[,]),d=function(){return!1};if("object"===typeof document){var g=document.all;f.call(g)===f.call(document.all)&&(d=function(t){if((h||!t)&&("undefined"===typeof t||"object"===typeof t))try{var e=f.call(t);return(e===y||e===b||e===j||e===i)&&null==t("")}catch(n){}return!1})}t.exports=c?function(t){if(d(t))return!0;if(!t)return!1;if("function"!==typeof t&&"object"!==typeof t)return!1;try{c(t,null,e)}catch(o){if(o!==n)return!1}return!u(t)&&l(t)}:function(t){if(d(t))return!0;if(!t)return!1;if("function"!==typeof t&&"object"!==typeof t)return!1;if(s)return l(t);if(u(t))return!1;var e=f.call(t);return!(e!==a&&e!==p&&!/^\[object HTML/.test(e))&&l(t)}}}]);