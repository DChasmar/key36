"use strict";(self.webpackChunkkey36=self.webpackChunkkey36||[]).push([[1648,3474],{9519:function(e,n,t){t.r(n);var a=t(2791),i=t(9248),l=t(184);n.default=function(e){var n=e.keyVal,t=e.red,r=e.style,s=(0,a.useContext)(i.KeyboardRContext).selectKey;return(0,l.jsx)("div",{className:t?"key red_key":"key blue_key",style:r,onClick:function(){s(n)},children:n})}},9248:function(e,n,t){t.r(n),t.d(n,{KeyboardRContext:function(){return d}});var a=t(7762),i=t(2982),l=t(885),r=t(2791),s=t(5590),f=t(4457),c=t(9519),o=t(3474),u=t(184),d=(0,r.createContext)();n.default=function(){var e=(0,r.useContext)(s.I),n=e.setGameChosen,t=e.keysColor,x=e.setKeysColor,v=(0,r.useState)(["1","2","3","4","5","6","7","8","9","0"]),y=(0,l.Z)(v,2),h=y[0],O=y[1],k=(0,r.useState)(["Q","W","E","R","T","Y","U","I","O","P"]),m=(0,l.Z)(k,2),C=m[0],Z=m[1],g=(0,r.useState)(["A","S","D","F","G","H","J","K","L"]),j=(0,l.Z)(g,2),N=j[0],S=j[1],b=(0,r.useState)(["Z","X","C","V","B","N","M"]),p=(0,l.Z)(b,2),w=p[0],V=p[1],E=[h,C,N,w],K=(0,r.useState)([0,0,0,0,0,0,0,0,0,0]),A=(0,l.Z)(K,2),G=A[0],I=A[1],L=(0,r.useState)([0,0,0,0,0,0,0,0,0,0]),R=(0,l.Z)(L,2),$=R[0],B=R[1],D=(0,r.useState)([0,0,0,0,0,0,0,0,0]),H=(0,l.Z)(D,2),P=H[0],T=H[1],U=(0,r.useState)([0,0,0,0,0,0,0]),_=(0,l.Z)(U,2),z=_[0],F=_[1],J=["0","1","2","3","4","5","6","7","8","9"],M=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],Q=(0,r.useState)([]),W=(0,l.Z)(Q,2),X=W[0],Y=W[1],q=(0,r.useState)(""),ee=(0,l.Z)(q,2),ne=ee[0],te=ee[1],ae=function(e){if(0===X.length)Y([e]);else if(1===X.length){var n=(0,l.Z)(X,1)[0];if(/^[0-9]$/.test(n)&&/^[0-9]$/.test(e)){if(h.includes(n)&&h.includes(e)){var t=h.map((function(t){return t===n?e:t===e?n:t}));O(t),Y([])}}else if(/^[A-Za-z]$/.test(n)&&/^[A-Za-z]$/.test(e)){var i,r=[C,N,w].filter((function(t){return t.includes(n)||t.includes(e)})),s=(0,a.Z)(r);try{for(s.s();!(i=s.n()).done;){var f=i.value,c=f.map((function(t){return t===n?e:t===e?n:t}));f===C?Z(c):f===N?S(c):f===w&&V(c)}}catch(o){s.e(o)}finally{s.f()}Y([])}else Y([e])}};(0,r.useEffect)((function(){!function(){var e=[0,0,0,0,0,0,0,0,0,0];h.forEach((function(n,t){var a=J.indexOf(n);if(0===t){var i=h[t+1];a+J.indexOf(i)===9&&(e[t]=1)}else if(t===h.length-1){var l=h[t-1];a+J.indexOf(l)===9&&(e[t]=1)}else if(t>0&&t<h.length-1){var r=h[t-1],s=h[t+1],f=J.indexOf(r);a+J.indexOf(s)!==9&&a+f!==9||(e[t]=1)}})),I(e)}(),function(){var e=[0,0,0,0,0,0,0,0,0,0],n=[0,0,0,0,0,0,0,0,0],t=[0,0,0,0,0,0,0];C.forEach((function(n,t){var a=M.indexOf(n);if(0===t){var i=C[t+1],l=M.indexOf(i),r=N[t],s=M.indexOf(r);a+l!==25&&a+s!==25||(e[t]=1)}else if(t===C.length-1){var f=C[t-1],c=M.indexOf(f),o=N[t-1],u=M.indexOf(o);a+c!==25&&a+u!==25||(e[t]=1)}else if(t>0&&t<C.length-1){var d=C[t-1],x=C[t+1],v=M.indexOf(d),y=M.indexOf(x),h=N[t-1],O=M.indexOf(h),k=N[t],m=M.indexOf(k);a+v!==25&&a+y!==25&&a+O!==25&&a+m!==25||(e[t]=1)}})),N.forEach((function(e,t){var a=M.indexOf(e);if(0===t){var i=N[t+1],l=M.indexOf(i),r=C[t],s=M.indexOf(r),f=C[t+1],c=M.indexOf(f);a+l!==25&&a+s!==25&&a+c!==25||(n[t]=1)}else if(t===N.length-1){var o=N[t-1],u=M.indexOf(o),d=C[t],x=M.indexOf(d),v=C[t+1],y=M.indexOf(v);a+u!==25&&a+x!==25&&a+y!==25||(n[t]=1)}else if(t>0&&t<N.length-1){var h=N[t-1],O=N[t+1],k=M.indexOf(h),m=M.indexOf(O),Z=w[t-1],g=M.indexOf(Z),j=C[t],S=M.indexOf(j),b=C[t+1],p=M.indexOf(b);a+k!==25&&a+m!==25&&a+g!==25&&a+S!==25&&a+p!==25||(n[t]=1)}})),w.forEach((function(e,n){var a=M.indexOf(e),i=N[n+1],l=M.indexOf(i);if(0===n){var r=w[n+1];a+M.indexOf(r)!==25&&a+l!==25||(t[n]=1)}else if(n===w.length-1){var s=w[n-1];a+M.indexOf(s)!==25&&a+l!==25||(t[n]=1)}else if(n>0&&n<w.length-1){var f=w[n-1],c=w[n+1],o=M.indexOf(f),u=M.indexOf(c);a+o!==25&&a+u!==25&&a+l!==25||(t[n]=1)}})),B(e),T(n),F(t)}()}),[X]),(0,r.useEffect)((function(){G.includes(0)||$.includes(0)||P.includes(0)||z.includes(0)||(te("check"),setTimeout((function(){var e=(0,i.Z)(t);e[1][3]=1,x(e),n({gameChosen:!1,gameNumber:""})}),1e3))}),[G,$,P,z]);var ie=(0,r.useCallback)((function(e){if("Backspace"===e.key);else if(" "===e.key)n({gameChosen:!1,gameNumber:""});else for(var t=0,i=E;t<i.length;t++){var l,r=i[t],s=(0,a.Z)(r);try{for(s.s();!(l=s.n()).done;){var f=l.value;if(e.key.toLowerCase()===f.toLowerCase()){ae(f);break}}}catch(c){s.e(c)}finally{s.f()}}}),[E]);return(0,f.yU)(ie,[ie]),(0,u.jsx)("div",{className:"keyboard",onKeyDown:ie,children:(0,u.jsxs)(d.Provider,{value:{selectKey:ae},children:[(0,u.jsx)("div",{className:"line0",children:h.map((function(e,n){var t="0-".concat(n);return(0,u.jsx)(c.default,{keyVal:e,red:0===G[n],style:X[0]===e?{color:"yellow"}:{}},t)}))}),(0,u.jsx)("div",{className:"line1",children:C.map((function(e,n){var t="1-".concat(n);return(0,u.jsx)(c.default,{keyVal:e,red:0===$[n],style:X[0]===e?{color:"yellow"}:{}},t)}))}),(0,u.jsx)("div",{className:"line2",children:N.map((function(e,n){var t="2-".concat(n);return(0,u.jsx)(c.default,{keyVal:e,red:0===P[n],style:X[0]===e?{color:"yellow"}:{}},t)}))}),(0,u.jsx)("div",{className:"line3",children:w.map((function(e,n){var t="3-".concat(n);return(0,u.jsx)(c.default,{keyVal:e,red:0===z[n],style:X[0]===e?{color:"yellow"}:{}},t)}))}),(0,u.jsx)("div",{className:"line4",children:(0,u.jsx)(o.default,{keyVal:ne})})]})})}},3474:function(e,n,t){t.r(n);var a=t(2791),i=t(5590),l=t(6355),r=t(184);n.default=function(e){var n=e.keyVal,t=(0,a.useContext)(i.I).setGameChosen,s=null,f="";return"check"===n?(s=(0,r.jsx)(l.l_A,{}),f="check-color"):"times"===n&&(s=(0,r.jsx)(l.aHS,{}),f="times-color"),(0,r.jsx)("div",{className:"key spacebar ".concat(f),onClick:function(){t({gameChosen:!1,gameNumber:""})},children:s})}}}]);
//# sourceMappingURL=1648.538b3f40.chunk.js.map