/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("dom-style-ie",function(a){(function(d){var A="hasLayout",l="px",m="filter",b="filters",x="opacity",q="auto",h="borderWidth",k="borderTopWidth",u="borderRightWidth",z="borderBottomWidth",i="borderLeftWidth",j="width",s="height",v="transparent",w="visible",c="getComputedStyle",C=undefined,B=d.config.doc.documentElement,p=d.Features.test,n=d.Features.add,t=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,o=(d.UA.ie>=8),f=function(e){return e.currentStyle||e.style;},r={CUSTOM_STYLES:{},get:function(e,E){var D="",F;if(e){F=f(e)[E];if(E===x&&d.DOM.CUSTOM_STYLES[x]){D=d.DOM.CUSTOM_STYLES[x].get(e);}else{if(!F||(F.indexOf&&F.indexOf(l)>-1)){D=F;}else{if(d.DOM.IE.COMPUTED[E]){D=d.DOM.IE.COMPUTED[E](e,E);}else{if(t.test(F)){D=r.getPixel(e,E)+l;}else{D=F;}}}}}return D;},sizeOffsets:{width:["Left","Right"],height:["Top","Bottom"],top:["Top"],bottom:["Bottom"]},getOffset:function(E,e){var I=f(E)[e],J=e.charAt(0).toUpperCase()+e.substr(1),F="offset"+J,D="pixel"+J,H=r.sizeOffsets[e],G=E.ownerDocument.compatMode,K="";if(I===q||I.indexOf("%")>-1){K=E["offset"+J];if(G!=="BackCompat"){if(H[0]){K-=r.getPixel(E,"padding"+H[0]);K-=r.getBorderWidth(E,"border"+H[0]+"Width",1);}if(H[1]){K-=r.getPixel(E,"padding"+H[1]);K-=r.getBorderWidth(E,"border"+H[1]+"Width",1);}}}else{if(!E.style[D]&&!E.style[e]){E.style[e]=I;}K=E.style[D];}return K+l;},borderMap:{thin:(o)?"1px":"2px",medium:(o)?"3px":"4px",thick:(o)?"5px":"6px"},getBorderWidth:function(D,F,e){var E=e?"":l,G=D.currentStyle[F];if(G.indexOf(l)<0){if(r.borderMap[G]&&D.currentStyle.borderStyle!=="none"){G=r.borderMap[G];}else{G=0;}}return(e)?parseFloat(G):G;},getPixel:function(E,e){var G=null,D=f(E),H=D.right,F=D[e];E.style.right=F;G=E.style.pixelRight;E.style.right=H;return G;},getMargin:function(E,e){var F,D=f(E);if(D[e]==q){F=0;}else{F=r.getPixel(E,e);}return F+l;},getVisibility:function(D,e){var E;while((E=D.currentStyle)&&E[e]=="inherit"){D=D.parentNode;}return(E)?E[e]:w;},getColor:function(D,e){var E=f(D)[e];if(!E||E===v){d.DOM.elementByAxis(D,"parentNode",null,function(F){E=f(F)[e];if(E&&E!==v){D=F;return true;}});}return d.Color.toRGB(E);},getBorderColor:function(D,e){var E=f(D),F=E[e]||E.color;return d.Color.toRGB(d.Color.toHex(F));}},g={};n("style","computedStyle",{test:function(){return"getComputedStyle" in d.config.win;}});n("style","opacity",{test:function(){return"opacity" in B.style;}});n("style","filter",{test:function(){return"filters" in B;}});if(!p("style","opacity")&&p("style","filter")){d.DOM.CUSTOM_STYLES[x]={get:function(E){var G=100;try{G=E[b]["DXImageTransform.Microsoft.Alpha"][x];}catch(F){try{G=E[b]("alpha")[x];}catch(D){}}return G/100;},set:function(E,H,D){var G,F=f(E),e=F[m];D=D||E.style;if(H===""){G=(x in F)?F[x]:1;H=G;}if(typeof e=="string"){D[m]=e.replace(/alpha([^)]*\))/gi,"")+((H<1)?"alpha("+x+"="+H*100+")":"");if(!D[m]){D.removeAttribute(m);}if(!F[A]){D.zoom=1;}}}};}try{d.config.doc.createElement("div").style.height="-1px";}catch(y){d.DOM.CUSTOM_STYLES.height={set:function(E,F,D){var e=parseFloat(F);if(e>=0||F==="auto"||F===""){D.height=F;}else{}}};d.DOM.CUSTOM_STYLES.width={set:function(E,F,D){var e=parseFloat(F);if(e>=0||F==="auto"||F===""){D.width=F;}else{}}};}if(!p("style","computedStyle")){g[j]=g[s]=r.getOffset;g.color=g.backgroundColor=r.getColor;g[h]=g[k]=g[u]=g[z]=g[i]=r.getBorderWidth;g.marginTop=g.marginRight=g.marginBottom=g.marginLeft=r.getMargin;g.visibility=r.getVisibility;g.borderColor=g.borderTopColor=g.borderRightColor=g.borderBottomColor=g.borderLeftColor=r.getBorderColor;d.DOM[c]=r.get;d.namespace("DOM.IE");d.DOM.IE.COMPUTED=g;d.DOM.IE.ComputedStyle=r;}})(a);},"3.4.0",{requires:["dom-style"]});