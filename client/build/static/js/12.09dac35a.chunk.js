"use strict";(self.webpackChunkmantis_free_react_admin_template=self.webpackChunkmantis_free_react_admin_template||[]).push([[12],{51987:function(e,t,o){o.d(t,{Z:function(){return w}});var r=o(4942),l=o(63366),n=o(87462),i=o(47313),a=o(83061),c=o(21921),s=o(56456),d=o(28170),u=o(11236),f=o(64164),v=o(32298);function b(e){return(0,v.Z)("MuiTab",e)}var h=(0,o(77430).Z)("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]),p=o(46417),m=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],Z=(0,f.ZP)(s.Z,{name:"MuiTab",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.label&&o.icon&&t.labelIcon,t["textColor".concat((0,d.Z)(o.textColor))],o.fullWidth&&t.fullWidth,o.wrapped&&t.wrapped]}})((function(e){var t,o,l,i=e.theme,a=e.ownerState;return(0,n.Z)({},i.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},a.label&&{flexDirection:"top"===a.iconPosition||"bottom"===a.iconPosition?"column":"row"},{lineHeight:1.25},a.icon&&a.label&&(0,r.Z)({minHeight:72,paddingTop:9,paddingBottom:9},"& > .".concat(h.iconWrapper),(0,n.Z)({},"top"===a.iconPosition&&{marginBottom:6},"bottom"===a.iconPosition&&{marginTop:6},"start"===a.iconPosition&&{marginRight:i.spacing(1)},"end"===a.iconPosition&&{marginLeft:i.spacing(1)})),"inherit"===a.textColor&&(t={color:"inherit",opacity:.6},(0,r.Z)(t,"&.".concat(h.selected),{opacity:1}),(0,r.Z)(t,"&.".concat(h.disabled),{opacity:(i.vars||i).palette.action.disabledOpacity}),t),"primary"===a.textColor&&(o={color:(i.vars||i).palette.text.secondary},(0,r.Z)(o,"&.".concat(h.selected),{color:(i.vars||i).palette.primary.main}),(0,r.Z)(o,"&.".concat(h.disabled),{color:(i.vars||i).palette.text.disabled}),o),"secondary"===a.textColor&&(l={color:(i.vars||i).palette.text.secondary},(0,r.Z)(l,"&.".concat(h.selected),{color:(i.vars||i).palette.secondary.main}),(0,r.Z)(l,"&.".concat(h.disabled),{color:(i.vars||i).palette.text.disabled}),l),a.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},a.wrapped&&{fontSize:i.typography.pxToRem(12)})})),w=i.forwardRef((function(e,t){var o=(0,u.Z)({props:e,name:"MuiTab"}),r=o.className,s=o.disabled,f=void 0!==s&&s,v=o.disableFocusRipple,h=void 0!==v&&v,w=o.fullWidth,x=o.icon,g=o.iconPosition,S=void 0===g?"top":g,C=o.indicator,y=o.label,B=o.onChange,M=o.onClick,W=o.onFocus,R=o.selected,E=o.selectionFollowsFocus,T=o.textColor,N=void 0===T?"inherit":T,k=o.value,P=o.wrapped,F=void 0!==P&&P,z=(0,l.Z)(o,m),L=(0,n.Z)({},o,{disabled:f,disableFocusRipple:h,selected:R,icon:!!x,iconPosition:S,label:!!y,fullWidth:w,textColor:N,wrapped:F}),H=function(e){var t=e.classes,o=e.textColor,r=e.fullWidth,l=e.wrapped,n=e.icon,i=e.label,a=e.selected,s=e.disabled,u={root:["root",n&&i&&"labelIcon","textColor".concat((0,d.Z)(o)),r&&"fullWidth",l&&"wrapped",a&&"selected",s&&"disabled"],iconWrapper:["iconWrapper"]};return(0,c.Z)(u,b,t)}(L),A=x&&y&&i.isValidElement(x)?i.cloneElement(x,{className:(0,a.Z)(H.iconWrapper,x.props.className)}):x;return(0,p.jsxs)(Z,(0,n.Z)({focusRipple:!h,className:(0,a.Z)(H.root,r),ref:t,role:"tab","aria-selected":R,disabled:f,onClick:function(e){!R&&B&&B(e,k),M&&M(e)},onFocus:function(e){E&&!R&&B&&B(e,k),W&&W(e)},ownerState:L,tabIndex:R?0:-1},z,{children:["top"===S||"start"===S?(0,p.jsxs)(i.Fragment,{children:[A,y]}):(0,p.jsxs)(i.Fragment,{children:[y,A]}),C]}))}))},51930:function(e,t,o){o.d(t,{Z:function(){return U}});var r,l=o(29439),n=o(4942),i=o(63366),a=o(87462),c=o(47313),s=(o(96214),o(83061)),d=o(21921),u=o(64164),f=o(11236),v=o(62111),b=o(39492);function h(){if(r)return r;var e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),r="reverse",e.scrollLeft>0?r="default":(e.scrollLeft=1,0===e.scrollLeft&&(r="negative")),document.body.removeChild(e),r}function p(e,t){var o=e.scrollLeft;if("rtl"!==t)return o;switch(h()){case"negative":return e.scrollWidth-e.clientWidth+o;case"reverse":return e.scrollWidth-e.clientWidth-o;default:return o}}function m(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}function Z(e,t,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){},n=r.ease,i=void 0===n?m:n,a=r.duration,c=void 0===a?300:a,s=null,d=t[e],u=!1,f=function(){u=!0},v=function r(n){if(u)l(new Error("Animation cancelled"));else{null===s&&(s=n);var a=Math.min(1,(n-s)/c);t[e]=i(a)*(o-d)+d,a>=1?requestAnimationFrame((function(){l(null)})):requestAnimationFrame(r)}};return d===o?(l(new Error("Element already at target position")),f):(requestAnimationFrame(v),f)}var w=o(20897),x=o(46417),g=["onChange"],S={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};var C=o(56248),y=o(82222),B=o(56456),M=o(32298),W=o(77430);function R(e){return(0,M.Z)("MuiTabScrollButton",e)}var E,T,N=(0,W.Z)("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),k=["className","direction","orientation","disabled"],P=(0,u.ZP)(B.Z,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.orientation&&t[o.orientation]]}})((function(e){var t=e.ownerState;return(0,a.Z)((0,n.Z)({width:40,flexShrink:0,opacity:.8},"&.".concat(N.disabled),{opacity:0}),"vertical"===t.orientation&&{width:"100%",height:40,"& svg":{transform:"rotate(".concat(t.isRtl?-90:90,"deg)")}})})),F=c.forwardRef((function(e,t){var o=(0,f.Z)({props:e,name:"MuiTabScrollButton"}),r=o.className,l=o.direction,n=(0,i.Z)(o,k),c="rtl"===(0,v.Z)().direction,u=(0,a.Z)({isRtl:c},o),b=function(e){var t=e.classes,o={root:["root",e.orientation,e.disabled&&"disabled"]};return(0,d.Z)(o,R,t)}(u);return(0,x.jsx)(P,(0,a.Z)({component:"div",className:(0,s.Z)(b.root,r),ref:t,role:null,ownerState:u,tabIndex:null},n,{children:"left"===l?E||(E=(0,x.jsx)(C.Z,{fontSize:"small"})):T||(T=(0,x.jsx)(y.Z,{fontSize:"small"}))}))})),z=o(56127);function L(e){return(0,M.Z)("MuiTabs",e)}var H=(0,W.Z)("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),A=o(66182),j=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],I=function(e,t){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild},X=function(e,t){return e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild},Y=function(e,t,o){for(var r=!1,l=o(e,t);l;){if(l===e.firstChild){if(r)return;r=!0}var n=l.disabled||"true"===l.getAttribute("aria-disabled");if(l.hasAttribute("tabindex")&&!n)return void l.focus();l=o(e,l)}},D=(0,u.ZP)("div",{name:"MuiTabs",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[(0,n.Z)({},"& .".concat(H.scrollButtons),t.scrollButtons),(0,n.Z)({},"& .".concat(H.scrollButtons),o.scrollButtonsHideMobile&&t.scrollButtonsHideMobile),t.root,o.vertical&&t.vertical]}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},t.vertical&&{flexDirection:"column"},t.scrollButtonsHideMobile&&(0,n.Z)({},"& .".concat(H.scrollButtons),(0,n.Z)({},o.breakpoints.down("sm"),{display:"none"})))})),_=(0,u.ZP)("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:function(e,t){var o=e.ownerState;return[t.scroller,o.fixed&&t.fixed,o.hideScrollbar&&t.hideScrollbar,o.scrollableX&&t.scrollableX,o.scrollableY&&t.scrollableY]}})((function(e){var t=e.ownerState;return(0,a.Z)({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},t.fixed&&{overflowX:"hidden",width:"100%"},t.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},t.scrollableX&&{overflowX:"auto",overflowY:"hidden"},t.scrollableY&&{overflowY:"auto",overflowX:"hidden"})})),V=(0,u.ZP)("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:function(e,t){var o=e.ownerState;return[t.flexContainer,o.vertical&&t.flexContainerVertical,o.centered&&t.centered]}})((function(e){var t=e.ownerState;return(0,a.Z)({display:"flex"},t.vertical&&{flexDirection:"column"},t.centered&&{justifyContent:"center"})})),O=(0,u.ZP)("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:function(e,t){return t.indicator}})((function(e){var t=e.ownerState,o=e.theme;return(0,a.Z)({position:"absolute",height:2,bottom:0,width:"100%",transition:o.transitions.create()},"primary"===t.indicatorColor&&{backgroundColor:(o.vars||o).palette.primary.main},"secondary"===t.indicatorColor&&{backgroundColor:(o.vars||o).palette.secondary.main},t.vertical&&{height:"100%",width:2,right:0})})),q=(0,u.ZP)((function(e){var t=e.onChange,o=(0,i.Z)(e,g),r=c.useRef(),l=c.useRef(null),n=function(){r.current=l.current.offsetHeight-l.current.clientHeight};return c.useEffect((function(){var e=(0,b.Z)((function(){var e=r.current;n(),e!==r.current&&t(r.current)})),o=(0,w.Z)(l.current);return o.addEventListener("resize",e),function(){e.clear(),o.removeEventListener("resize",e)}}),[t]),c.useEffect((function(){n(),t(r.current)}),[t]),(0,x.jsx)("div",(0,a.Z)({style:S,ref:l},o))}),{name:"MuiTabs",slot:"ScrollbarSize"})({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),G={},K=c.forwardRef((function(e,t){var o=(0,f.Z)({props:e,name:"MuiTabs"}),r=(0,v.Z)(),u="rtl"===r.direction,m=o["aria-label"],g=o["aria-labelledby"],S=o.action,C=o.centered,y=void 0!==C&&C,B=o.children,M=o.className,W=o.component,R=void 0===W?"div":W,E=o.allowScrollButtonsMobile,T=void 0!==E&&E,N=o.indicatorColor,k=void 0===N?"primary":N,P=o.onChange,H=o.orientation,K=void 0===H?"horizontal":H,U=o.ScrollButtonComponent,J=void 0===U?F:U,Q=o.scrollButtons,$=void 0===Q?"auto":Q,ee=o.selectionFollowsFocus,te=o.TabIndicatorProps,oe=void 0===te?{}:te,re=o.TabScrollButtonProps,le=void 0===re?{}:re,ne=o.textColor,ie=void 0===ne?"primary":ne,ae=o.value,ce=o.variant,se=void 0===ce?"standard":ce,de=o.visibleScrollbar,ue=void 0!==de&&de,fe=(0,i.Z)(o,j),ve="scrollable"===se,be="vertical"===K,he=be?"scrollTop":"scrollLeft",pe=be?"top":"left",me=be?"bottom":"right",Ze=be?"clientHeight":"clientWidth",we=be?"height":"width",xe=(0,a.Z)({},o,{component:R,allowScrollButtonsMobile:T,indicatorColor:k,orientation:K,vertical:be,scrollButtons:$,textColor:ie,variant:se,visibleScrollbar:ue,fixed:!ve,hideScrollbar:ve&&!ue,scrollableX:ve&&!be,scrollableY:ve&&be,centered:y&&!ve,scrollButtonsHideMobile:!T}),ge=function(e){var t=e.vertical,o=e.fixed,r=e.hideScrollbar,l=e.scrollableX,n=e.scrollableY,i=e.centered,a=e.scrollButtonsHideMobile,c=e.classes,s={root:["root",t&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",l&&"scrollableX",n&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",i&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",a&&"scrollButtonsHideMobile"],scrollableX:[l&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]};return(0,d.Z)(s,L,c)}(xe);var Se=c.useState(!1),Ce=(0,l.Z)(Se,2),ye=Ce[0],Be=Ce[1],Me=c.useState(G),We=(0,l.Z)(Me,2),Re=We[0],Ee=We[1],Te=c.useState({start:!1,end:!1}),Ne=(0,l.Z)(Te,2),ke=Ne[0],Pe=Ne[1],Fe=c.useState({overflow:"hidden",scrollbarWidth:0}),ze=(0,l.Z)(Fe,2),Le=ze[0],He=ze[1],Ae=new Map,je=c.useRef(null),Ie=c.useRef(null),Xe=function(){var e,t,o=je.current;if(o){var l=o.getBoundingClientRect();e={clientWidth:o.clientWidth,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop,scrollLeftNormalized:p(o,r.direction),scrollWidth:o.scrollWidth,top:l.top,bottom:l.bottom,left:l.left,right:l.right}}if(o&&!1!==ae){var n=Ie.current.children;if(n.length>0){var i=n[Ae.get(ae)];0,t=i?i.getBoundingClientRect():null}}return{tabsMeta:e,tabMeta:t}},Ye=(0,z.Z)((function(){var e,t,o=Xe(),r=o.tabsMeta,l=o.tabMeta,i=0;if(be)t="top",l&&r&&(i=l.top-r.top+r.scrollTop);else if(t=u?"right":"left",l&&r){var a=u?r.scrollLeftNormalized+r.clientWidth-r.scrollWidth:r.scrollLeft;i=(u?-1:1)*(l[t]-r[t]+a)}var c=(e={},(0,n.Z)(e,t,i),(0,n.Z)(e,we,l?l[we]:0),e);if(isNaN(Re[t])||isNaN(Re[we]))Ee(c);else{var s=Math.abs(Re[t]-c[t]),d=Math.abs(Re[we]-c[we]);(s>=1||d>=1)&&Ee(c)}})),De=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.animation,l=void 0===o||o;l?Z(he,je.current,e,{duration:r.transitions.duration.standard}):je.current[he]=e},_e=function(e){var t=je.current[he];be?t+=e:(t+=e*(u?-1:1),t*=u&&"reverse"===h()?-1:1),De(t)},Ve=function(){for(var e=je.current[Ze],t=0,o=Array.from(Ie.current.children),r=0;r<o.length;r+=1){var l=o[r];if(t+l[Ze]>e){0===r&&(t=e);break}t+=l[Ze]}return t},Oe=function(){_e(-1*Ve())},qe=function(){_e(Ve())},Ge=c.useCallback((function(e){He({overflow:null,scrollbarWidth:e})}),[]),Ke=(0,z.Z)((function(e){var t=Xe(),o=t.tabsMeta,r=t.tabMeta;if(r&&o)if(r[pe]<o[pe]){var l=o[he]+(r[pe]-o[pe]);De(l,{animation:e})}else if(r[me]>o[me]){var n=o[he]+(r[me]-o[me]);De(n,{animation:e})}})),Ue=(0,z.Z)((function(){if(ve&&!1!==$){var e,t,o=je.current,l=o.scrollTop,n=o.scrollHeight,i=o.clientHeight,a=o.scrollWidth,c=o.clientWidth;if(be)e=l>1,t=l<n-i-1;else{var s=p(je.current,r.direction);e=u?s<a-c-1:s>1,t=u?s>1:s<a-c-1}e===ke.start&&t===ke.end||Pe({start:e,end:t})}}));c.useEffect((function(){var e,t=(0,b.Z)((function(){je.current&&(Ye(),Ue())})),o=(0,w.Z)(je.current);return o.addEventListener("resize",t),"undefined"!==typeof ResizeObserver&&(e=new ResizeObserver(t),Array.from(Ie.current.children).forEach((function(t){e.observe(t)}))),function(){t.clear(),o.removeEventListener("resize",t),e&&e.disconnect()}}),[Ye,Ue]);var Je=c.useMemo((function(){return(0,b.Z)((function(){Ue()}))}),[Ue]);c.useEffect((function(){return function(){Je.clear()}}),[Je]),c.useEffect((function(){Be(!0)}),[]),c.useEffect((function(){Ye(),Ue()})),c.useEffect((function(){Ke(G!==Re)}),[Ke,Re]),c.useImperativeHandle(S,(function(){return{updateIndicator:Ye,updateScrollButtons:Ue}}),[Ye,Ue]);var Qe=(0,x.jsx)(O,(0,a.Z)({},oe,{className:(0,s.Z)(ge.indicator,oe.className),ownerState:xe,style:(0,a.Z)({},Re,oe.style)})),$e=0,et=c.Children.map(B,(function(e){if(!c.isValidElement(e))return null;var t=void 0===e.props.value?$e:e.props.value;Ae.set(t,$e);var o=t===ae;return $e+=1,c.cloneElement(e,(0,a.Z)({fullWidth:"fullWidth"===se,indicator:o&&!ye&&Qe,selected:o,selectionFollowsFocus:ee,onChange:P,textColor:ie,value:t},1!==$e||!1!==ae||e.props.tabIndex?{}:{tabIndex:0}))})),tt=function(){var e={};e.scrollbarSizeListener=ve?(0,x.jsx)(q,{onChange:Ge,className:(0,s.Z)(ge.scrollableX,ge.hideScrollbar)}):null;var t=ke.start||ke.end,o=ve&&("auto"===$&&t||!0===$);return e.scrollButtonStart=o?(0,x.jsx)(J,(0,a.Z)({orientation:K,direction:u?"right":"left",onClick:Oe,disabled:!ke.start},le,{className:(0,s.Z)(ge.scrollButtons,le.className)})):null,e.scrollButtonEnd=o?(0,x.jsx)(J,(0,a.Z)({orientation:K,direction:u?"left":"right",onClick:qe,disabled:!ke.end},le,{className:(0,s.Z)(ge.scrollButtons,le.className)})):null,e}();return(0,x.jsxs)(D,(0,a.Z)({className:(0,s.Z)(ge.root,M),ownerState:xe,ref:t,as:R},fe,{children:[tt.scrollButtonStart,tt.scrollbarSizeListener,(0,x.jsxs)(_,{className:ge.scroller,ownerState:xe,style:(0,n.Z)({overflow:Le.overflow},be?"margin".concat(u?"Left":"Right"):"marginBottom",ue?void 0:-Le.scrollbarWidth),ref:je,onScroll:Je,children:[(0,x.jsx)(V,{"aria-label":m,"aria-labelledby":g,"aria-orientation":"vertical"===K?"vertical":null,className:ge.flexContainer,ownerState:xe,onKeyDown:function(e){var t=Ie.current,o=(0,A.Z)(t).activeElement;if("tab"===o.getAttribute("role")){var r="horizontal"===K?"ArrowLeft":"ArrowUp",l="horizontal"===K?"ArrowRight":"ArrowDown";switch("horizontal"===K&&u&&(r="ArrowRight",l="ArrowLeft"),e.key){case r:e.preventDefault(),Y(t,o,X);break;case l:e.preventDefault(),Y(t,o,I);break;case"Home":e.preventDefault(),Y(t,null,I);break;case"End":e.preventDefault(),Y(t,null,X)}}},ref:Ie,role:"tablist",children:et}),ye&&Qe]}),tt.scrollButtonEnd]}))})),U=K}}]);