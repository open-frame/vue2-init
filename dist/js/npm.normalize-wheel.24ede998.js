(self["webpackChunkedo_project"]=self["webpackChunkedo_project"]||[]).push([[5588],{3644:function(e,n,t){e.exports=t(4966)},2896:function(e){"use strict";var n=!("undefined"===typeof window||!window.document||!window.document.createElement),t={canUseDOM:n,canUseWorkers:"undefined"!==typeof Worker,canUseEventListeners:n&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:n&&!!window.screen,isInWorker:!n};e.exports=t},2118:function(e){var n,t,i,r,o,a,u,c,d,s,l,f,p,w,m,x=!1;function h(){if(!x){x=!0;var e=navigator.userAgent,h=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e),v=/(Mac OS X)|(Windows)|(Linux)/.exec(e);if(f=/\b(iPhone|iP[ao]d)/.exec(e),p=/\b(iP[ao]d)/.exec(e),s=/Android/i.exec(e),w=/FBAN\/\w+;/i.exec(e),m=/Mobile/i.exec(e),l=!!/Win64/.exec(e),h){n=h[1]?parseFloat(h[1]):h[5]?parseFloat(h[5]):NaN,n&&document&&document.documentMode&&(n=document.documentMode);var N=/(?:Trident\/(\d+.\d+))/.exec(e);a=N?parseFloat(N[1])+4:n,t=h[2]?parseFloat(h[2]):NaN,i=h[3]?parseFloat(h[3]):NaN,r=h[4]?parseFloat(h[4]):NaN,r?(h=/(?:Chrome\/(\d+\.\d+))/.exec(e),o=h&&h[1]?parseFloat(h[1]):NaN):o=NaN}else n=t=i=o=r=NaN;if(v){if(v[1]){var M=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);u=!M||parseFloat(M[1].replace("_","."))}else u=!1;c=!!v[2],d=!!v[3]}else u=c=d=!1}}var v={ie:function(){return h()||n},ieCompatibilityMode:function(){return h()||a>n},ie64:function(){return v.ie()&&l},firefox:function(){return h()||t},opera:function(){return h()||i},webkit:function(){return h()||r},safari:function(){return v.webkit()},chrome:function(){return h()||o},windows:function(){return h()||c},osx:function(){return h()||u},linux:function(){return h()||d},iphone:function(){return h()||f},mobile:function(){return h()||f||p||s||m},nativeApp:function(){return h()||w},android:function(){return h()||s},ipad:function(){return h()||p}};e.exports=v},7516:function(e,n,t){"use strict";var i,r=t(2896);
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function o(e,n){if(!r.canUseDOM||n&&!("addEventListener"in document))return!1;var t="on"+e,o=t in document;if(!o){var a=document.createElement("div");a.setAttribute(t,"return;"),o="function"===typeof a[t]}return!o&&i&&"wheel"===e&&(o=document.implementation.hasFeature("Events.wheel","3.0")),o}r.canUseDOM&&(i=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")),e.exports=o},4966:function(e,n,t){"use strict";var i=t(2118),r=t(7516),o=10,a=40,u=800;function c(e){var n=0,t=0,i=0,r=0;return"detail"in e&&(t=e.detail),"wheelDelta"in e&&(t=-e.wheelDelta/120),"wheelDeltaY"in e&&(t=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(n=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(n=t,t=0),i=n*o,r=t*o,"deltaY"in e&&(r=e.deltaY),"deltaX"in e&&(i=e.deltaX),(i||r)&&e.deltaMode&&(1==e.deltaMode?(i*=a,r*=a):(i*=u,r*=u)),i&&!n&&(n=i<1?-1:1),r&&!t&&(t=r<1?-1:1),{spinX:n,spinY:t,pixelX:i,pixelY:r}}c.getEventType=function(){return i.firefox()?"DOMMouseScroll":r("wheel")?"wheel":"mousewheel"},e.exports=c}}]);