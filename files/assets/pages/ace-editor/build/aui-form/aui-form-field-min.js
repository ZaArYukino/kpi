AUI.add("aui-form-field",function(s){var h=s.Lang,l=s.getClassName,j="field",o=" ",u=s.cached(function(C,E){var D=["field"];if(E){D.push(E);}D=D.join("-");var A=[l(D,C)];if(C=="password"){A.push(l(D,"text"));}return A.join(" ");}),b=l(j),g=l(j,"checkbox"),f=l(j,"choice"),B=l(j,"content"),e=l(j,"input"),q=l(j,"hint"),d=l(j,"invalid"),c=l(j,"label"),i=l(j,"radio"),a=l(j,"labels"),y=l(j,"labels","inline"),w={left:[a,"left"].join("-"),right:[a,"right"].join("-"),top:[a,"top"].join("-")},z={radio:i,checkbox:g},n=/left|right/,t='<span class="'+b+'"></span>',x='<span class="'+B+'"></span>',m='<span class="'+q+'"></span>',r='<input autocomplete="off" class="{cssClass}" id="{id}" name="{name}" type="{type}" />',p='<label class="'+c+'"></label>',v={};var k=s.Component.create({NAME:j,ATTRS:{readOnly:{value:false},name:{value:"",getter:function(C){var A=this;return C||A.get("id");}},disabled:{value:false,validator:h.isBoolean},id:{getter:function(D){var A=this;var C=this.get("node");if(C){D=C.get("id");}if(!D){D=s.guid();}return D;}},type:{value:"text",validator:h.isString,writeOnce:true},labelAlign:{valueFn:function(){var A=this;return A._getChoiceCss()?"left":null;}},labelNode:{valueFn:function(){var A=this;return s.Node.create(p);}},labelText:{valueFn:function(){var A=this;return A.get("labelNode").get("innerHTML");},setter:function(C){var A=this;A.get("labelNode").set("innerHTML",C);return C;}},node:{value:null,setter:function(C){var A=this;return s.one(C)||A._createFieldNode();}},fieldHint:{value:""},fieldHintNode:{value:null,setter:function(C){var A=this;return s.one(C)||A._createFieldHint();}},prevVal:{value:""},valid:{value:true,getter:function(E){var A=this;var C=A.get("validator");var D=A.get("disabled")||C(A.get("value"));return D;}},dirty:{value:false,getter:function(D){var A=this;if(A.get("disabled")){D=false;}else{var C=String(A.get("value"));var E=String(A.get("prevVal"));D=(C!==E);}return D;}},size:{},validator:{valueFn:function(){var A=this;return A.fieldValidator;},validator:h.isFunction},value:{getter:"_getNodeValue",setter:"_setNodeValue",validator:"fieldValidator"}},HTML_PARSER:{labelNode:"label",node:"input, textarea, select"},BIND_UI_ATTRS:["disabled","id","readOnly","name","size","tabIndex","type","value"],getTypeClassName:u,getField:function(E){var F=null;if(E instanceof s.Field){F=E;}else{if(E&&(h.isString(E)||E instanceof s.Node||E.nodeName)){var C=s.one(E).get("id");F=v[C];if(!F){var D=E.ancestor(".aui-field");var A=E.ancestor(".aui-field-content");F=new k({boundingBox:D,contentBox:A,node:E});}}else{if(h.isObject(E)){F=new k(E);}}}return F;},prototype:{BOUNDING_TEMPLATE:t,CONTENT_TEMPLATE:x,FIELD_TEMPLATE:r,FIELD_TYPE:"text",initializer:function(){var A=this;var C=A.get("node").guid();v[C]=A;},renderUI:function(){var A=this;A._renderField();A._renderLabel();A._renderFieldHint();},bindUI:function(){var A=this;A.after("labelAlignChange",A._afterLabelAlignChange);A.after("fieldHintChange",A._afterFieldHintChange);},syncUI:function(){var A=this;A.set("prevVal",A.get("value"));},fieldValidator:function(C){var A=this;return true;},isValid:function(){var A=this;return A.get("valid");},isDirty:function(){var A=this;return A.get("dirty");},resetValue:function(){var A=this;A.set("value",A.get("prevVal"));A.clearInvalid();},markInvalid:function(C){var A=this;A.set("fieldHint",C);A.get("fieldHintNode").show();A.get("boundingBox").addClass(d);},clearInvalid:function(){var A=this;A.reset("fieldHint");if(!A.get("fieldHint")){A.get("fieldHintNode").hide();}A.get("boundingBox").removeClass(d);},validate:function(){var A=this;var C=A.get("valid");if(C){A.clearInvalid();}return C;},_afterFieldHintChange:function(C){var A=this;A._uiSetFieldHint(C.newVal,C.prevVal);},_afterLabelAlignChange:function(C){var A=this;A._uiSetLabelAlign(C.newVal,C.prevVal);},_createFieldHint:function(){var A=this;var C=s.Node.create(m);A.get("contentBox").append(C);return C;},_createFieldNode:function(){var A=this;var C=A.FIELD_TEMPLATE;A.FIELD_TEMPLATE=h.sub(C,{cssClass:e,id:A.get("id"),name:A.get("name"),type:A.get("type")});return s.Node.create(A.FIELD_TEMPLATE);},_getChoiceCss:function(){var A=this;var C=A.get("type");return z[C];},_getNodeValue:function(){var A=this;return A.get("node").val();},_renderField:function(){var A=this;var G=A.get("node");G.val(A.get("value"));var E=A.get("boundingBox");var D=A.get("contentBox");var F=A.get("type");var C=[u(F)];var H=A._getChoiceCss();if(H){C.push(f);C.push(H);}E.addClass(C.join(o));G.addClass(u(F,"input"));if(!D.contains(G)){if(G.inDoc()){G.placeBefore(E);D.appendChild(G);}else{D.appendChild(G);}}E.removeAttribute("tabIndex");},_renderFieldHint:function(){var A=this;var C=A.get("fieldHint");if(C){A._uiSetFieldHint(C);}},_renderLabel:function(){var J=this;var D=J.get("labelText");if(D!==false){var E=J.get("node");var A=E.guid();D=J.get("labelText");var G=J.get("labelNode");G.addClass(l(J.name,"label"));G.setAttribute("for",A);G.set("innerHTML",D);J._uiSetLabelAlign(J.get("labelAlign"));var H=J.get("contentBox");var C=J.get("labelAlign");var I=J.get("type").toLowerCase();var K=n.test(C);var F="prepend";if(K&&J._getChoiceCss()){F="append";}H[F](G);}},_setNodeValue:function(C){var A=this;A._uiSetValue(C);return C;},_uiSetDisabled:function(D){var A=this;var C=A.get("node");if(D){C.setAttribute("disabled",D);}else{C.removeAttribute("disabled");}},_uiSetFieldHint:function(C,D){var A=this;A.get("fieldHintNode").set("innerHTML",C);},_uiSetId:function(C,D){var A=this;A.get("node").set("id",C);},_uiSetLabelAlign:function(D,F){var A=this;var C=A.get("boundingBox");C.replaceClass(w[F],w[D]);var E="removeClass";if(n.test(D)){E="addClass";}C[E](y);},_uiSetName:function(C,D){var A=this;A.get("node").setAttribute("name",C);},_uiSetReadOnly:function(C,D){var A=this;A.get("node").setAttribute("readOnly",C);},_uiSetSize:function(C,D){var A=this;A.get("node").setAttribute("size",C);},_uiSetTabIndex:function(C,D){var A=this;A.get("node").setAttribute("tabIndex",C);},_uiSetValue:function(C,D){var A=this;
A.get("node").val(C);},_requireAddAttr:false}});s.Field=k;},"@VERSION@",{requires:["aui-base","aui-component"]});