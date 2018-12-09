"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(u,p,y){function m(e,t){return _typeof(e)===t}function v(){return"function"!=typeof p.createElement?p.createElement(arguments[0]):w?p.createElementNS.call(p,"http://www.w3.org/2000/svg",arguments[0]):p.createElement.apply(p,arguments)}function g(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function h(e,t,n,o){var r,a,s,i,c,l="modernizr",d=v("div"),f=((c=p.body)||((c=v(w?"svg":"body")).fake=!0),c);if(parseInt(n,10))for(;n--;)(s=v("div")).id=o?o[n]:l+(n+1),d.appendChild(s);return(r=v("style")).type="text/css",r.id="s"+l,(f.fake?f:d).appendChild(r),f.appendChild(d),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(p.createTextNode(e)),d.id=l,f.fake&&(f.style.background="",f.style.overflow="hidden",i=T.style.overflow,T.style.overflow="hidden",T.appendChild(f)),a=t(d,e),f.fake?(f.parentNode.removeChild(f),T.style.overflow=i,T.offsetHeight):d.parentNode.removeChild(d),!!a}function i(e,t){return function(){return e.apply(t,arguments)}}function x(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(e,t,n,o){function r(){s&&(delete E.style,delete E.modElem)}if(o=!m(o,"undefined")&&o,!m(n,"undefined")){var a=function(e,t){var n=e.length;if("CSS"in u&&"supports"in u.CSS){for(;n--;)if(u.CSS.supports(x(e[n]),t))return!0;return!1}if("CSSSupportsRule"in u){for(var o=[];n--;)o.push("("+x(e[n])+":"+t+")");return h("@supports ("+(o=o.join(" or "))+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return y}(e,n);if(!m(a,"undefined"))return a}for(var s,i,c,l,d,f=["modernizr","tspan","samp"];!E.style&&f.length;)s=!0,E.modElem=v(f.shift()),E.style=E.modElem.style;for(c=e.length,i=0;i<c;i++)if(l=e[i],d=E.style[l],!!~(""+l).indexOf("-")&&(l=g(l)),E.style[l]!==y){if(o||m(n,"undefined"))return r(),"pfx"!=t||l;try{E.style[l]=n}catch(e){}if(E.style[l]!=d)return r(),"pfx"!=t||l}return r(),!1}function o(e,t,n,o,r){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+S.join(a+" ")+a).split(" ");return m(t,"string")||m(t,"undefined")?c(s,t,o,r):function(e,t,n){var o;for(var r in e)if(e[r]in t)return!1===n?e[r]:m(o=t[e[r]],"function")?i(o,n||t):o;return!1}(s=(e+" "+P.join(a+" ")+a).split(" "),t,n)}function r(e,t,n){return o(e,y,y,t,n)}var l=[],d=[],e={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){d.push({name:e,fn:t,options:n})},addAsyncTest:function(e){d.push({name:null,fn:e})}},f=function(){};f.prototype=e,(f=new f).addTest("svg",!!p.createElementNS&&!!p.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var T=p.documentElement,w="svg"===T.nodeName.toLowerCase();f.addTest("audio",function(){var e=v("audio"),t=!1;try{(t=!!e.canPlayType)&&((t=new Boolean(t)).ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(e){}return t}),f.addTest("canvas",function(){var e=v("canvas");return!(!e.getContext||!e.getContext("2d"))}),f.addTest("cssremunit",function(){var e=v("a").style;try{e.fontSize="3rem"}catch(e){}return/rem/.test(e.fontSize)});var s=e._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];e._prefixes=s,f.addTest("csscalc",function(){var e=v("a");return e.style.cssText="width:"+s.join("calc(10px);width:"),!!e.style.length}),f.addTest("cssgradients",function(){for(var e,t="background-image:",n="",o=0,r=s.length-1;o<r;o++)e=0===o?"to ":"",n+=t+s[o]+"linear-gradient("+e+"left top, #9f9, white);";f._config.usePrefixes&&(n+=t+"-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");var a=v("a").style;return a.cssText=n,-1<(""+a.backgroundImage).indexOf("gradient")});var t="CSS"in u&&"supports"in u.CSS,n="supportsCSS"in u;f.addTest("supports",t||n);var a=e.testStyles=h;f.addTest("touchevents",function(){var t;if("ontouchstart"in u||u.DocumentTouch&&p instanceof DocumentTouch)t=!0;else{var e=["@media (",s.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");a(e,function(e){t=9===e.offsetTop})}return t});var b="Moz O ms Webkit",S=e._config.usePrefixes?b.split(" "):[];e._cssomPrefixes=S;var C=function(e){var t,n=s.length,o=u.CSSRule;if(void 0===o)return y;if(!e)return!1;if((t=(e=e.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in o)return"@"+e;for(var r=0;r<n;r++){var a=s[r];if(a.toUpperCase()+"_"+t in o)return"@-"+a.toLowerCase()+"-"+e}return!1};e.atRule=C;var P=e._config.usePrefixes?b.toLowerCase().split(" "):[];e._domPrefixes=P;var _={elem:v("modernizr")};f._q.push(function(){delete _.elem});var E={style:_.elem.style};f._q.unshift(function(){delete E.style}),f.addTest("video",function(){var e=v("video"),t=!1;try{(t=!!e.canPlayType)&&((t=new Boolean(t)).ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(e){}return t}),e.testAllProps=o,e.testAllProps=r,f.addTest("cssanimations",r("animationName","a",!0)),f.addTest("cssfilters",function(){if(f.supports)return r("filter","blur(2px)");var e=v("a");return e.style.cssText=s.join("filter:blur(2px); "),!!e.style.length&&(p.documentMode===y||9<p.documentMode)}),f.addTest("flexbox",r("flexBasis","1px",!0)),f.addTest("flexboxlegacy",r("boxDirection","reverse",!0)),f.addTest("flexboxtweener",r("flexAlign","end",!0)),f.addTest("flexwrap",r("flexWrap","wrap",!0)),f.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&r("transform","scale(1)",!0)}),f.addTest("csstransforms3d",function(){var t=!!r("perspective","1px",!0),e=f._config.usePrefixes;if(t&&(!e||"webkitPerspective"in T.style)){var n;f.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",e&&(n+=",(-webkit-transform-3d)")),a("#modernizr{width:0;height:0}"+(n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"),function(e){t=7===e.offsetWidth&&18===e.offsetHeight})}return t}),f.addTest("csstransitions",r("transition","all",!0));var z=e.prefixed=function(e,t,n){return 0===e.indexOf("@")?C(e):(-1!=e.indexOf("-")&&(e=g(e)),t?o(e,t,n):o(e,"pfx"))};f.addTest("backgroundblendmode",z("backgroundBlendMode","text")),function(){var e,t,n,o,r,a;for(var s in d)if(d.hasOwnProperty(s)){if(e=[],(t=d[s]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=m(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)1===(a=e[r].split(".")).length?f[a[0]]=o:(!f[a[0]]||f[a[0]]instanceof Boolean||(f[a[0]]=new Boolean(f[a[0]])),f[a[0]][a[1]]=o),l.push((o?"":"no-")+a.join("-"))}}(),function(e){var t=T.className,n=f._config.classPrefix||"";if(w&&(t=t.baseVal),f._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}f._config.enableClasses&&(t+=" "+n+e.join(" "+n),w?T.className.baseVal=t:T.className=t)}(l),delete e.addTest,delete e.addAsyncTest;for(var k=0;k<f._q.length;k++)f._q[k]();u.Modernizr=f}(window,document);