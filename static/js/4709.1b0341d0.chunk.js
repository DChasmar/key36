/*! For license information please see 4709.1b0341d0.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkkey36=self.webpackChunkkey36||[]).push([[4709,3278],{9025:function(e,t,r){r.r(t);var n=r(2791),o=r(6441),i=r(5763),a=r(184);t.default=function(e){var t=e.keyVal,r=e.keyLine,c=e.guessKey,u=e.blankKey,s=(0,n.useContext)(o.Keyboard0Context),f=s.addLetter,l=s.removeLetter,h=s.disableKeyPressRef,y=null;return y=0===r&&""===t?(0,a.jsx)(i.Zh5,{}):t,(0,a.jsx)("div",{className:c?"key guess_key":u?"key blank_key":"key",onClick:function(){h.current||(1===r||2===r||3===r?f(t):0===r&&l())},children:y})}},6441:function(e,t,r){r.r(t),r.d(t,{Keyboard0Context:function(){return v}});var n=r(7762),o=r(2982),i=r(8214),a=r(5861),c=r(885),u=r(2791),s=r(5643),f=r(4457),l=r(9025),h=r(3278),y=r(6380),d=r(184),v=(0,u.createContext)();t.default=function(){var e=(0,u.useContext)(s.I),t=e.setGameChosen,r=e.keysColor,p=e.setKeysColor,m=(0,u.useState)([""]),g=(0,c.Z)(m,2),w=g[0],x=g[1],b=(0,u.useState)(["Q","W","E","R","T","Y","U","I","O","P"]),k=(0,c.Z)(b,2),L=k[0],j=k[1],Z=(0,u.useState)(["A","S","D","F","G","H","J","K","L"]),E=(0,c.Z)(Z,2),C=E[0],S=E[1],N=(0,u.useState)(["Z","X","C","V","B","N","M"]),O=(0,c.Z)(N,2),_=O[0],K=O[1],P=["1","2","3","4","5","6","7","8","9","0"],G=["Q","W","E","R","T","Y","U","I","O","P"],I=["A","S","D","F","G","H","J","K","L"],T=["Z","X","C","V","B","N","M"],V=[L,C,_],F=(0,u.useState)([]),A=(0,c.Z)(F,2),U=A[0],R=A[1],D=(0,u.useState)(new Set),Y=(0,c.Z)(D,2),B=Y[0],H=Y[1],J=(0,u.useState)(""),M=(0,c.Z)(J,2),Q=M[0],W=M[1],X=(0,u.useRef)(!1),q=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Set(y.words),e.abrupt("return",{wordSet:t});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,u.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(){var t,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q();case 2:t=e.sent,r=t.wordSet,H(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var z=function(){W("check"),X.current=!0;var e=(0,o.Z)(U);e.push(w.join("")),R(e),setTimeout((function(){if(w.length<10){for(var e=w.length,n=w,i=0;i<e;i++)n[i]="";n.push(""),x(n),j(G),S(I),K(T)}else!function(){var e=(0,o.Z)(r);e[0][9]=1,p(e),t({gameChosen:!1,gameNumber:""})}();W(""),X.current=!1}),500)},$=function(){W("times"),X.current=!0,setTimeout((function(){for(var e=w.length,t=w,r=0;r<e;r++)t[r]="";x(t),j(G),S(I),K(T),W(""),X.current=!1}),500)},ee=function(e){var t=(0,o.Z)(w),r=(0,o.Z)(L),n=(0,o.Z)(C),i=(0,o.Z)(_),a=t.findIndex((function(e){return""===e}));if(a>=0&&(t[a]=e.toUpperCase()),x(t),r.includes(e)){var c=r.indexOf(e);r[c]="",j(r)}else if(n.includes(e)){var u=n.indexOf(e);n[u]="",S(n)}else if(i.includes(e)){var s=i.indexOf(e);i[s]="",K(i)}},te=function(){var e=(0,o.Z)(w),t=(0,o.Z)(L),r=(0,o.Z)(C),n=(0,o.Z)(_),i=e.findIndex((function(e){return""===e})),a=e[i-1];if(i>0&&i<10&&(e[i-1]=""),x(e),G.includes(a))t[G.indexOf(a)]=a,j(t);else if(I.includes(a)){r[I.indexOf(a)]=a,S(r)}else if(T.includes(a)){n[T.indexOf(a)]=a,K(n)}};(0,u.useEffect)((function(){!function(){if(!w.includes(""))if(1===w.length)"A"===w[0]||"I"===w[0]?z():$();else{var e=w.join("");B.has(e.toLowerCase())?z():$()}}()}),[w]);var re=(0,u.useCallback)((function(e){if(X.current)e.preventDefault();else if("Backspace"===e.key)te();else if(" "===e.key)t({gameChosen:!1,gameNumber:""});else{P.forEach((function(t){e.key.toUpperCase()===t.toUpperCase()&&te()}));for(var r=0,o=V;r<o.length;r++){var i,a=o[r],c=(0,n.Z)(a);try{for(c.s();!(i=c.n()).done;){var u=i.value;if(e.key.toLowerCase()===u.toLowerCase()){ee(u);break}}}catch(s){c.e(s)}finally{c.f()}}}}),[P,V]);return(0,f.yU)(re,[re]),(0,d.jsx)("div",{className:"keyboard",onKeyDown:re,children:(0,d.jsxs)(v.Provider,{value:{addLetter:ee,removeLetter:te,disableKeyPressRef:X},children:[(0,d.jsx)("div",{className:"line0",children:w.map((function(e,t){var r="0-".concat(t);return(0,d.jsx)(l.default,{keyVal:e,keyLine:0,guessKey:!0},r)}))}),(0,d.jsx)("div",{className:"line1",children:L.map((function(e,t){var r="1-".concat(t);return(0,d.jsx)(l.default,{keyVal:e,keyLine:1,blankKey:""===e},r)}))}),(0,d.jsx)("div",{className:"line2",children:C.map((function(e,t){var r="2-".concat(t);return(0,d.jsx)(l.default,{keyVal:e,keyLine:2,blankKey:""===e},r)}))}),(0,d.jsx)("div",{className:"line3",children:_.map((function(e,t){var r="3-".concat(t);return(0,d.jsx)(l.default,{keyVal:e,keyLine:3,blankKey:""===e},r)}))}),(0,d.jsx)("div",{className:"line4",children:(0,d.jsx)(h.default,{keyVal:Q})}),(0,d.jsx)("div",{className:"word_box",children:U.map((function(e,t){return(0,d.jsx)("p",{className:"word_box_word",children:e},t)}))})]})})}},3278:function(e,t,r){r.r(t);var n=r(2791),o=r(5643),i=r(6355),a=r(184);t.default=function(e){var t=e.keyVal,r=(0,n.useContext)(o.I).setGameChosen,c=null,u="";return"check"===t?(c=(0,a.jsx)(i.l_A,{}),u="check-color"):"times"===t&&(c=(0,a.jsx)(i.aHS,{}),u="times-color"),(0,a.jsx)("div",{className:"key spacebar ".concat(u),onClick:function(){r({gameChosen:!1,gameNumber:""})},children:c})}},5861:function(e,t,r){function n(e,t,r,n,o,i,a){try{var c=e[i](a),u=c.value}catch(s){return void r(s)}c.done?t(u):Promise.resolve(u).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function c(e){n(a,o,i,c,u,"next",e)}function u(e){n(a,o,i,c,u,"throw",e)}c(void 0)}))}}r.d(t,{Z:function(){return o}})},8214:function(e,t,r){function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(){o=function(){return t};var e,t={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(e,t,r){e[t]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",f=c.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function h(e,t,r,n){var o=t&&t.prototype instanceof w?t:w,i=Object.create(o.prototype),c=new K(n||[]);return a(i,"_invoke",{value:S(e,r,c)}),i}function y(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=h;var d="suspendedStart",v="suspendedYield",p="executing",m="completed",g={};function w(){}function x(){}function b(){}var k={};l(k,u,(function(){return this}));var L=Object.getPrototypeOf,j=L&&L(L(P([])));j&&j!==r&&i.call(j,u)&&(k=j);var Z=b.prototype=w.prototype=Object.create(k);function E(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function C(e,t){function r(o,a,c,u){var s=y(e[o],e,a);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==n(l)&&i.call(l,"__await")?t.resolve(l.__await).then((function(e){r("next",e,c,u)}),(function(e){r("throw",e,c,u)})):t.resolve(l).then((function(e){f.value=e,c(f)}),(function(e){return r("throw",e,c,u)}))}u(s.arg)}var o;a(this,"_invoke",{value:function(e,n){function i(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(i,i):i()}})}function S(t,r,n){var o=d;return function(i,a){if(o===p)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=N(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=p;var s=y(t,r,n);if("normal"===s.type){if(o=n.done?m:v,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=m,n.method="throw",n.arg=s.arg)}}}function N(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=y(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function K(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function P(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(i.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(n(t)+" is not iterable")}return x.prototype=b,a(Z,"constructor",{value:b,configurable:!0}),a(b,"constructor",{value:x,configurable:!0}),x.displayName=l(b,f,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===x||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,b):(e.__proto__=b,l(e,f,"GeneratorFunction")),e.prototype=Object.create(Z),e},t.awrap=function(e){return{__await:e}},E(C.prototype),l(C.prototype,s,(function(){return this})),t.AsyncIterator=C,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new C(h(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},E(Z),l(Z,f,"Generator"),l(Z,u,(function(){return this})),l(Z,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,K.prototype={constructor:K,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(_),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),s=i.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}r.d(t,{Z:function(){return o}})}}]);
//# sourceMappingURL=4709.1b0341d0.chunk.js.map