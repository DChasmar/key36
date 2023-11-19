/*! For license information please see 4268.a1b0781b.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkkey36=self.webpackChunkkey36||[]).push([[4268,6524,3043],{1988:function(e,t,r){r.r(t);var o=r(2791),n=r(1676),i=r(5763),u=r(184);t.default=function(e){var t=e.keyVal,r=e.keyLine,p=(0,o.useContext)(n.Keyboard1Context),a=p.addLetter,c=p.removeLetter,s=p.disableKeyPressRef,f=null;return f=""===t?(0,u.jsx)(i.Zh5,{}):t,(0,u.jsx)("div",{className:0===r?"key guess_key":"key",onClick:function(){s.current||(1===r?a(t):0===r&&c())},children:f})}},1676:function(e,t,r){r.r(t),r.d(t,{Keyboard1Context:function(){return h}});var o=r(2982),n=r(8214),i=r(5861),u=r(885),p=r(2791),a=r(5590),c=r(4457),s=r(1988),f=r(6524),l=r(3043),y=r(184),h=(0,p.createContext)();t.default=function(){var e=(0,p.useContext)(a.I),t=e.setGameChosen,r=e.keysColor,w=e.setKeysColor,v=(0,p.useState)([""]),d=(0,u.Z)(v,2),m=d[0],g=d[1],x=["Q","W","E","R","T","Y","U","I","O","P"],b=["1","2","3","4","5","6","7","8","9","0"],k=(0,p.useState)(""),L=(0,u.Z)(k,2),j=L[0],E=L[1],C=(0,p.useState)([]),q=(0,u.Z)(C,2),S=q[0],N=q[1],_=(0,p.useState)(new Set),O=(0,u.Z)(_,2),Z=O[0],P=O[1],G=(0,p.useRef)(!1),T=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Set(l.words),e.abrupt("return",{wordSet:t});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,p.useEffect)((function(){var e=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:t=e.sent,r=t.wordSet,P(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var F=function(){E("check"),G.current=!0;var e=(0,o.Z)(S);e.push(m.join("")),N(e),setTimeout((function(){if(m.length<10){for(var e=m.length,n=m,i=0;i<e;i++)n[i]="";n.push(""),g(n)}else!function(){var e=(0,o.Z)(r);e[0][0]=1,w(e),t({gameChosen:!1,gameNumber:""})}();E(""),G.current=!1}),500)},I=function(){if(!m.includes("")){var e=m.join("");Z.has(e.toLowerCase())?F():(E("times"),G.current=!0,setTimeout((function(){for(var e=m.length,t=m,r=0;r<e;r++)t[r]="";g(t),E(""),G.current=!1}),500))}},K=(0,c.Fg)(m,g),U=(0,c.Z9)(m,g);(0,p.useEffect)((function(){I()}),[m]);var V=(0,p.useCallback)((function(e){G.current?e.preventDefault():"Backspace"===e.key?U():" "===e.key?t({gameChosen:!1,gameNumber:""}):(b.forEach((function(t){e.key.toUpperCase()===t.toUpperCase()&&U()}),[m,x]),x.forEach((function(t){e.key.toUpperCase()===t.toUpperCase()&&K(t)}),[m,x]))}));return(0,c.yU)(V,[V]),(0,y.jsx)("div",{className:"keyboard",onKeyDown:V,children:(0,y.jsxs)(h.Provider,{value:{addLetter:K,removeLetter:U,disableKeyPressRef:G},children:[(0,y.jsx)("div",{className:"line0",children:m.map((function(e,t){var r="0-".concat(t);return(0,y.jsx)(s.default,{keyVal:e,keyLine:0,guessLine:!0},r)}))}),(0,y.jsx)("div",{className:"line1",children:x.map((function(e,t){var r="1-".concat(t);return(0,y.jsx)(s.default,{keyVal:e,keyLine:1},r)}))}),(0,y.jsx)("div",{className:"line2",children:(0,y.jsx)(f.default,{keyVal:j})}),(0,y.jsx)("div",{className:"word_box",children:S.map((function(e,t){return(0,y.jsx)("p",{className:"word_box_word",children:e},t)}))})]})})}},6524:function(e,t,r){r.r(t);var o=r(2791),n=r(5590),i=r(6355),u=r(184);t.default=function(e){var t=e.keyVal,r=(0,o.useContext)(n.I).setGameChosen,p=null,a="";return"check"===t?(p=(0,u.jsx)(i.l_A,{}),a="check-color"):"times"===t&&(p=(0,u.jsx)(i.aHS,{}),a="times-color"),(0,u.jsx)("div",{className:"key spacebar ".concat(a),onClick:function(){r({gameChosen:!1,gameNumber:""})},children:p})}},5861:function(e,t,r){function o(e,t,r,o,n,i,u){try{var p=e[i](u),a=p.value}catch(c){return void r(c)}p.done?t(a):Promise.resolve(a).then(o,n)}function n(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var u=e.apply(t,r);function p(e){o(u,n,i,p,a,"next",e)}function a(e){o(u,n,i,p,a,"throw",e)}p(void 0)}))}}r.d(t,{Z:function(){return n}})},8214:function(e,t,r){function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function n(){n=function(){return t};var e,t={},r=Object.prototype,i=r.hasOwnProperty,u=Object.defineProperty||function(e,t,r){e[t]=r.value},p="function"==typeof Symbol?Symbol:{},a=p.iterator||"@@iterator",c=p.asyncIterator||"@@asyncIterator",s=p.toStringTag||"@@toStringTag";function f(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{f({},"")}catch(e){f=function(e,t,r){return e[t]=r}}function l(e,t,r,o){var n=t&&t.prototype instanceof g?t:g,i=Object.create(n.prototype),p=new Z(o||[]);return u(i,"_invoke",{value:S(e,r,p)}),i}function y(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=l;var h="suspendedStart",w="suspendedYield",v="executing",d="completed",m={};function g(){}function x(){}function b(){}var k={};f(k,a,(function(){return this}));var L=Object.getPrototypeOf,j=L&&L(L(P([])));j&&j!==r&&i.call(j,a)&&(k=j);var E=b.prototype=g.prototype=Object.create(k);function C(e){["next","throw","return"].forEach((function(t){f(e,t,(function(e){return this._invoke(t,e)}))}))}function q(e,t){function r(n,u,p,a){var c=y(e[n],e,u);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"==o(f)&&i.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,p,a)}),(function(e){r("throw",e,p,a)})):t.resolve(f).then((function(e){s.value=e,p(s)}),(function(e){return r("throw",e,p,a)}))}a(c.arg)}var n;u(this,"_invoke",{value:function(e,o){function i(){return new t((function(t,n){r(e,o,t,n)}))}return n=n?n.then(i,i):i()}})}function S(t,r,o){var n=h;return function(i,u){if(n===v)throw new Error("Generator is already running");if(n===d){if("throw"===i)throw u;return{value:e,done:!0}}for(o.method=i,o.arg=u;;){var p=o.delegate;if(p){var a=N(p,o);if(a){if(a===m)continue;return a}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(n===h)throw n=d,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);n=v;var c=y(t,r,o);if("normal"===c.type){if(n=o.done?d:w,c.arg===m)continue;return{value:c.arg,done:o.done}}"throw"===c.type&&(n=d,o.method="throw",o.arg=c.arg)}}}function N(t,r){var o=r.method,n=t.iterator[o];if(n===e)return r.delegate=null,"throw"===o&&t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method)||"return"!==o&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+o+"' method")),m;var i=y(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var u=i.arg;return u?u.done?(r[t.resultName]=u.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):u:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Z(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function P(t){if(t||""===t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,u=function r(){for(;++n<t.length;)if(i.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return u.next=u}}throw new TypeError(o(t)+" is not iterable")}return x.prototype=b,u(E,"constructor",{value:b,configurable:!0}),u(b,"constructor",{value:x,configurable:!0}),x.displayName=f(b,s,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===x||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,b):(e.__proto__=b,f(e,s,"GeneratorFunction")),e.prototype=Object.create(E),e},t.awrap=function(e){return{__await:e}},C(q.prototype),f(q.prototype,c,(function(){return this})),t.AsyncIterator=q,t.async=function(e,r,o,n,i){void 0===i&&(i=Promise);var u=new q(l(e,r,o,n),i);return t.isGeneratorFunction(r)?u:u.next().then((function(e){return e.done?e.value:u.next()}))},C(E),f(E,s,"Generator"),f(E,a,(function(){return this})),f(E,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var o in t)r.push(o);return r.reverse(),function e(){for(;r.length;){var o=r.pop();if(o in t)return e.value=o,e.done=!1,e}return e.done=!0,e}},t.values=P,Z.prototype={constructor:Z,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(o,n){return p.type="throw",p.arg=t,r.next=o,n&&(r.method="next",r.arg=e),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var u=this.tryEntries[n],p=u.completion;if("root"===u.tryLoc)return o("end");if(u.tryLoc<=this.prev){var a=i.call(u,"catchLoc"),c=i.call(u,"finallyLoc");if(a&&c){if(this.prev<u.catchLoc)return o(u.catchLoc,!0);if(this.prev<u.finallyLoc)return o(u.finallyLoc)}else if(a){if(this.prev<u.catchLoc)return o(u.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return o(u.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&i.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}}n&&("break"===e||"continue"===e)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var u=n?n.completion:{};return u.type=e,u.arg=t,n?(this.method="next",this.next=n.finallyLoc,m):this.complete(u)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var o=r.completion;if("throw"===o.type){var n=o.arg;O(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,o){return this.delegate={iterator:P(t),resultName:r,nextLoc:o},"next"===this.method&&(this.arg=e),m}},t}r.d(t,{Z:function(){return n}})},3043:function(e){e.exports=JSON.parse('{"words":["i","it","or","ow","pi","to","up","we","ye","yo","ere","err","ewe","eye","ire","opt","ore","our","out","owe","pee","pep","per","pet","pew","pie","pip","pit","poo","pop","pot","pow","pro","pry","pup","put","rep","rip","roe","rot","row","rue","rut","rye","tee","tie","tip","tit","toe","too","top","tor","tot","tow","toy","try","tut","two","wee","wet","wit","woe","woo","wop","wot","wow","wry","yep","yer","yet","yew","yip","you","epee","euro","ewer","peep","peer","pert","pier","pipe","pity","poet","poop","poor","pope","pore","port","pour","pout","prep","prey","prop","prow","pure","purr","putt","pyre","quip","quit","riot","ripe","rite","root","rope","ropy","rote","rout","tier","tire","toot","topi","tore","tort","tote","tour","tout","tree","trio","trip","trot","true","tutu","twee","twit","type","typo","tyre","tyro","weep","weir","wept","were","wipe","wire","wiry","wore","writ","yeti","your","eerie","equip","error","erupt","eyrie","otter","outer","outre","peter","petty","piety","piper","pipit","pique","poppy","potty","power","prior","puppy","puree","purer","putty","queer","query","queue","quiet","quite","quoit","quote","retro","retry","riper","ropey","rotor","route","rower","rupee","tepee","terry","titty","topee","tower","trier","tripe","trite","troop","trope","trout","truer","tuque","tutor","tweet","twerp","upper","uteri","utter","weepy","wiper","witty","wooer","worry","write","wrote","yuppy","eerier","equity","output","outwit","peewee","peewit","pepper","petite","pewter","peyote","poetry","poorer","popper","poppet","porter","potter","powwow","preppy","pretty","priory","proper","puppet","purity","putter","qwerty","report","repute","retire","retort","rewire","rioter","ropier","rotter","teepee","teeter","terror","tiptoe","titter","topper","torpor","torque","totter","toupee","troupe","tryout","turret","uppity","uproot","weepie","wetter","witter","writer","yippee","yuppie","equerry","peppery","pettier","pipette","pottery","preppie","purport","queerer","quieter","quitter","require","requite","reroute","retiree","rewrite","rewrote","rupture","terrier","torture","towrope","treetop","tripper","trooper","trotter","trouper","tweeter","twitter","weepier","wittier","worrier","prettier","priority","property","puppetry","reporter","torturer","tripwire","etiquette","pirouette","potpourri","propriety","prototype","puppeteer","repertory","territory","perpetuity","proprietor","repertoire","typewriter"]}')}}]);
//# sourceMappingURL=4268.a1b0781b.chunk.js.map