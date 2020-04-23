AUI.add("aui-diagram-builder-impl",function(aD){var at=aD.Lang,d=at.isArray,a2=at.isBoolean,O=at.isObject,a6=at.isString,ay=aD.WidgetStdMod,bg=aD.Array,aq="activeElement",ac="availableField",af="availableFields",F="backspace",an="boolean",z="boundary",t="boundingBox",bc="builder",ax="cancel",az="canvas",aS="click",a7="closeEvent",L="closeMessage",a9="condition",T="connector",m="connectors",aB="content",W="controls",aP="controlsToolbar",U="createDocumentFragment",aN="data",ah="delete",aL="deleteConnectorsMessage",r="deleteNodesMessage",aV="description",M="diagram",aA="diagram-builder",aH="diagramNode",ba="diagram-node-manager",H="diagram-node",aZ="dragNode",ae="dragging",I="editEvent",R="editMessage",X="editing",aU="end",a="esc",a1="field",u="fields",aF="fieldsDragConfig",aC="fork",al="graphic",a0="height",aJ="highlightBoundaryStroke",S="highlightDropZones",c="highlighted",aR="id",w="join",Z="keydown",aE="label",C="lock",ao="mousedown",v="mouseenter",ap="mouseleave",q="name",s="node",aK="p1",aI="p2",f="parentNode",o="pencil",aO="radius",av="records",n="recordset",k="region",bd="rendered",Q="required",a5="selected",aY="shape",ag="shapeBoundary",j="shapeInvite",P="showSuggestConnector",Y="source",aM="start",am="state",y="stroke",aX="suggest",aQ="suggestConnectorOverlay",l="target",K="task",p="transition",ab="transitions",g="type",au="visible",V="width",E="xy",D="zIndex",bf="-",i=".",aa="",h="#",N="_",B=aD.getClassName,x=B(M,bc,W),a4=B(M,bc,a1),ar=B(M,s),b=B(M,s,aB),aT=B(M,s,X),ad=B(M,s,aE),be=B(M,s,a5),aW=B(M,s,aY,z),e=B(M,s,aX,T),aw=function(bj,A){var bi=d(bj)?bj:bj.get(t).getXY();return[bi[0]+A[0],bi[1]+A[1]];},bb=function(bk,bj){var bi=bj[0]-bk[0],A=bj[1]-bk[1];return Math.sqrt(bi*bi+A*A);},ak=function(bs,bq){var bo=bs.hotPoints,bn=bq.hotPoints,bv=bs.get(t).getXY(),bt=bq.get(t).getXY(),bk,bi,bl,bj,bu=Infinity,bm=[[0,0],[0,0]];for(bl=0,bk=bo.length;bl<bk;bl++){var br=bo[bl],bx=aw(bv,br);for(bj=0,bi=bn.length;bj<bi;bj++){var bp=bn[bj],bw=aw(bt,bp),A=bb(bw,bx);if(A<bu){bm[0]=br;bm[1]=bp;bu=A;}}}return bm;},aG=function(A,bj){var bi=d(bj)?bj:bj.getXY();var bk=d(A)?A:A.getXY();return bg.map(bk,function(bm,bl){return Math.max(0,bm-bi[bl]);});},J=function(A){return aD.instanceOf(A,aD.Connector);},a8=function(A){return aD.instanceOf(A,aD.DataSet);},ai=function(A){return aD.instanceOf(A,aD.DiagramBuilderBase);},a3=function(A){return aD.instanceOf(A,aD.DiagramNode);};var G=aD.Component.create({NAME:aA,ATTRS:{connector:{setter:"_setConnector",value:null},fieldsDragConfig:{value:null,setter:"_setFieldsDragConfig",validator:O},graphic:{valueFn:function(){return new aD.Graphic();},validator:O},highlightDropZones:{validator:a2,value:true},strings:{value:{addNode:"Add node",cancel:"Cancel",deleteConnectorsMessage:"Are you sure you want to delete the selected connector(s)?",deleteNodesMessage:"Are you sure you want to delete the selected node(s)?",propertyName:"Property Name",save:"Save",settings:"Settings",value:"Value"}},showSuggestConnector:{validator:a2,value:true},suggestConnectorOverlay:{value:null,setter:"_setSuggestConnectorOverlay"}},EXTENDS:aD.DiagramBuilderBase,FIELDS_TAB:0,SETTINGS_TAB:1,prototype:{editingConnector:null,editingNode:null,publishedSource:null,publishedTarget:null,selectedConnector:null,selectedNode:null,initializer:function(){var A=this;var bi=A.get(az);A.on({cancel:A._onCancel,"drag:drag":A._onDrag,"drag:end":A._onDragEnd,"drop:hit":A._onDropHit,save:A._onSave});aD.DiagramNodeManager.on({publishedSource:function(bj){A.publishedTarget=null;A.publishedSource=bj.publishedSource;}});bi.on(v,aD.bind(A._onCanvasMouseEnter,A));A.handlerKeyDown=aD.getDoc().on(Z,aD.bind(A._afterKeyEvent,A));A.dropContainer.delegate(aS,aD.bind(A._onNodeClick,A),i+ar);A.dropContainer.delegate(v,aD.bind(A._onNodeMouseEnter,A),i+ar);A.dropContainer.delegate(ap,aD.bind(A._onNodeMouseLeave,A),i+ar);},renderUI:function(){var A=this;aD.DiagramBuilder.superclass.renderUI.apply(this,arguments);A._renderGraphic();},syncUI:function(){var A=this;aD.DiagramBuilder.superclass.syncUI.apply(this,arguments);A._setupFieldsDrag();A.syncConnectionsUI();A.connector=A.get(T);},syncConnectionsUI:function(){var A=this;A.get(u).each(function(bi){bi.syncConnectionsUI();});},clearFields:function(){var bi=this;var A=[];bi.get(u).each(function(bj){A.push(bj);});bg.each(A,function(bj){bj.destroy();});A=bi.editingConnector=bi.editingNode=bi.selectedNode=null;},closeEditProperties:function(){var A=this;var bi=A.editingNode;var bj=A.tabView;bj.selectTab(aD.DiagramBuilder.FIELDS_TAB);bj.disableTab(aD.DiagramBuilder.SETTINGS_TAB);if(bi){bi.get(t).removeClass(aT);}A.editingConnector=A.editingNode=null;},connect:function(bi,bk,bj){var A=this;if(a6(bi)){bi=aD.Widget.getByNode(h+aD.DiagramNode.buildNodeId(bi));}if(a6(bk)){bk=aD.Widget.getByNode(h+aD.DiagramNode.buildNodeId(bk));}if(bi&&bk){bi.connect(bk.get(q),bj);}return A;},connectAll:function(bi){var A=this;bg.each(bi,function(bj){if(bj.hasOwnProperty(Y)&&bj.hasOwnProperty(l)){A.connect(bj.source,bj.target,bj.connector);}});return A;},createField:function(bi){var A=this;if(!a3(bi)){bi.builder=A;bi.bubbleTargets=A;bi=new (A.getFieldClass(bi.type||s))(bi);}return bi;},deleteSelectedConnectors:function(){var bi=this;var A=bi.getStrings();var bj=bi.getSelectedConnectors();if(bj.length&&confirm(A[aL])){bg.each(bj,function(bk){var bl=bk.get(p);aD.DiagramNode.getNodeByName(bl.source).disconnect(bl);});bi.stopEditing();}},deleteSelectedNode:function(){var bi=this;var A=bi.getStrings();var bj=bi.selectedNode;if(bj&&!bj.get(Q)&&confirm(A[r])){bj.close();bi.editingNode=bi.selectedNode=null;bi.stopEditing();}},destructor:function(bi){var A=this;A.get(aQ).destroy();},eachConnector:function(bi){var A=this;A.get(u).each(function(bj){bj.get(ab).each(function(bk){bi.call(A,bj.getConnector(bk),bk,bj);});});},editConnector:function(bi){var A=this;if(bi){var bj=A.tabView;A.closeEditProperties();bj.enableTab(aD.DiagramBuilder.SETTINGS_TAB);bj.selectTab(aD.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(n,bi.getProperties());
A.editingConnector=A.selectedConnector=bi;}},editNode:function(bj){var A=this;if(bj){var bi=A.tabView;A.closeEditProperties();bi.enableTab(aD.DiagramBuilder.SETTINGS_TAB);bi.selectTab(aD.DiagramBuilder.SETTINGS_TAB);A.propertyList.set(n,bj.getProperties());bj.get(t).addClass(aT);A.editingNode=A.selectedNode=bj;}},getFieldClass:function(bj){var A=this;var bi=aD.DiagramBuilder.types[bj];if(bi){return bi;}else{aD.log("The field type: ["+bj+"] couldn't be found.");return null;}},getNodesByTransitionProperty:function(bk,bj){var A=this;var bi=[];A.get(u).each(function(bl){bl.get(ab).each(function(bm){if(bm[bk]===bj){bi.push(bl);return false;}});});return bi;},getSelectedConnectors:function(){var A=this;var bi=[];A.eachConnector(function(bj){if(bj.get(a5)){bi.push(bj);}});return bi;},getSourceNodes:function(bi){var A=this;return A.getNodesByTransitionProperty(l,bi.get(q));},hideSuggestConnetorOverlay:function(bk,bi){var A=this;A.connector.hide();A.get(aQ).hide();try{A.fieldsDrag.dd.set(C,false);}catch(bj){}},isAbleToConnect:function(){var A=this;return !!(A.publishedSource&&A.publishedTarget);},isFieldsDrag:function(bi){var A=this;return(bi===A.fieldsDrag.dd);},plotField:function(bi){var A=this;if(!bi.get(bd)){bi.render(A.dropContainer);}},select:function(bi){var A=this;A.unselectNodes();A.selectedNode=bi.set(a5,true).focus();},showSuggestConnetorOverlay:function(bj){var A=this;A.get(aQ).set(E,bj||A.connector.get(aI)).show().get(t).addClass(e);try{A.fieldsDrag.dd.set(C,true);}catch(bi){}},stopEditing:function(){var A=this;A.unselectConnectors();A.unselectNodes();A.closeEditProperties();},toJSON:function(){var A=this;var bi={nodes:[]};A.get(u).each(function(bk){var bj={transitions:[]};bg.each(bk.SERIALIZABLE_ATTRS,function(bl){bj[bl]=bk.get(bl);});bk.get(ab).each(function(bm){var bl=bk.getConnector(bm);bm.connector=bl.toJSON();bj.transitions.push(bm);});bi.nodes.push(bj);});return bi;},unselectConnectors:function(){var A=this;bg.each(A.getSelectedConnectors(),function(bi){bi.set(a5,false);});},unselectNodes:function(){var A=this;var bi=A.selectedNode;if(bi){bi.set(a5,false);}A.selectedNode=null;},_afterKeyEvent:function(bi){var A=this;if(bi.hasModifier()||aD.getDoc().get(aq).test(":input,td")){return;}if(bi.isKey(a)){A._onEscKey(bi);}else{if(bi.isKey(F)||bi.isKey(ah)){A._onDeleteKey(bi);}}},_onCancel:function(bi){var A=this;A.closeEditProperties();},_onCanvasMouseEnter:function(){var A=this;A.syncUI();},_onDeleteKey:function(bi){var A=this;A.deleteSelectedConnectors();A.deleteSelectedNode();bi.halt();},_onDrag:function(bj){var A=this;var bi=bj.target;if(A.isFieldsDrag(bi)){var bk=aD.Widget.getByNode(bi.get(aZ));bk.alignTransitions();bg.each(A.getSourceNodes(bk),function(bl){bl.alignTransitions();});}},_onDragEnd:function(bj){var A=this;var bi=bj.target;var bk=aD.Widget.getByNode(bi.get(aZ));if(bk&&A.isFieldsDrag(bi)){bk.set(E,bk.getLeftTop());}},_onDropHit:function(bj){var A=this;var bi=bj.drag;if(A.isAvailableFieldsDrag(bi)){var bl=bi.get(s).getData(ac);var bk=A.addField({xy:aG(bi.lastXY,A.dropContainer),type:bl.get(g)});A.select(bk);}},_onEscKey:function(bi){var A=this;A.hideSuggestConnetorOverlay();A.stopEditing();bi.halt();},_onCanvasMouseDown:function(bi){var A=this;A.stopEditing();A.hideSuggestConnetorOverlay();},_onNodeClick:function(bi){var A=this;var bj=aD.Widget.getByNode(bi.currentTarget);A.select(bj);A._onNodeEdit(bi);bi.stopPropagation();},_onNodeEdit:function(bi){var A=this;if(!bi.target.ancestor(i+b,true)){return;}var bj=aD.Widget.getByNode(bi.currentTarget);if(bj){A.editNode(bj);}},_onNodeMouseEnter:function(bi){var A=this;var bj=aD.Widget.getByNode(bi.currentTarget);bj.set(c,true);},_onNodeMouseLeave:function(bj){var A=this;var bi=A.publishedSource;var bk=aD.Widget.getByNode(bj.currentTarget);if(!bi||!bi.boundaryDragDelegate.dd.get(ae)){bk.set(c,false);}},_onSave:function(bj){var A=this;var bi=A.editingNode;var bk=A.editingConnector;var bl=A.propertyList.get(n);if(bi){bg.each(bl.get(av),function(bm){var bn=bm.get(aN);bi.set(bn.attributeName,bn.value);});}else{if(bk){bg.each(bl.get(av),function(bm){var bn=bm.get(aN);bk.set(bn.attributeName,bn.value);});}}},_onSuggestConnectorNodeClick:function(bk){var A=this;var bl=bk.currentTarget.getData(ac);var bi=A.connector;var bj=A.addField({type:bl.get(g),xy:bi.toCoordinate(bi.get(aI))});A.hideSuggestConnetorOverlay();A.publishedSource.connectNode(bj);},_renderGraphic:function(){var A=this;var bi=A.get(az);var bj=A.get(al);bj.render(bi);aD.one(bi).on(ao,aD.bind(A._onCanvasMouseDown,A));},_setConnector:function(bj){var A=this;if(!J(bj)){var bi=A.get(az).getXY();bj=new aD.Connector(aD.merge({builder:A,graphic:A.get(al),lazyDraw:true,p1:bi,p2:bi,shapeHover:null,showName:false},bj));}return bj;},_setFieldsDragConfig:function(bj){var A=this;var bi=A.dropContainer;return aD.merge({bubbleTargets:A,container:bi,dragConfig:{plugins:[{cfg:{constrain:bi},fn:aD.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:aD.Plugin.DDWinScroll}]},nodes:i+ar},bj||{});},_setSuggestConnectorOverlay:function(bj){var A=this;if(!bj){var bi=aD.getDoc().invoke(U);bg.each(A.get(af),function(bl){var bk=bl.get(s);bi.appendChild(bk.clone().setData(ac,bk.getData(ac)));});bj=new aD.Overlay({bodyContent:bi,render:true,visible:false,zIndex:10000});bj.get(t).delegate(aS,aD.bind(A._onSuggestConnectorNodeClick,A),i+a4);}return bj;},_setupFieldsDrag:function(){var A=this;A.fieldsDrag=new aD.DD.Delegate(A.get(aF));}}});aD.DiagramBuilder=G;aD.DiagramBuilder.types={};var aj=aD.Component.create({NAME:ba,EXTENDS:aD.Base});aD.DiagramNodeManager=new aj();var bh=aD.Component.create({NAME:H,UI_ATTRS:[c,q,Q,a5],ATTRS:{builder:{validator:ai},connectors:{valueFn:"_createDataSet",writeOnce:true},controlsToolbar:{validator:O,valueFn:"_valueControlsToolbar"},description:{value:aa,validator:a6},graphic:{writeOnce:true,validator:O},height:{value:60},highlighted:{validator:a2,value:false},name:{valueFn:function(){var A=this;return A.get(g)+(++aD.Env._uidx);},validator:a6},required:{value:false,validator:a2},selected:{value:false,validator:a2},shapeBoundary:{validator:O,valueFn:"_valueShapeBoundary"},highlightBoundaryStroke:{validator:O,value:{weight:7,color:"#484B4C",opacity:0.25}},shapeInvite:{validator:O,value:{radius:12,type:"circle",stroke:{weight:6,color:"#ff6600",opacity:0.8},fill:{color:"#ffd700",opacity:0.8}}},strings:{value:{closeMessage:"Close",connectMessage:"Connect",description:"Description",editMessage:"Edit",name:"Name",type:"Type"}},tabIndex:{value:1},transitions:{value:null,writeOnce:true,setter:"_setTransitions"},type:{value:s,validator:a6},width:{value:60},zIndex:{value:100}},EXTENDS:aD.Overlay,CIRCLE_POINTS:[[35,20],[28,33],[14,34],[5,22],[10,9],[24,6],[34,16],[31,30],[18,35],[6,26],[7,12],[20,5],[33,12],[34,26],[22,35],[9,30],[6,16],[16,6],[30,9],[35,22],[26,34],[12,33],[5,20],[12,7],[26,6],[35,18],[30,31],[16,34],[6,24],[9,10],[22,5],[34,14],[33,28],[20,35],[7,28],[6,14],[18,5],[31,10],[34,24],[24,34],[10,31],[5,18],[14,6],[28,8],[35,20],[28,33],[14,34],[5,22],[10,8],[25,6],[34,16],[31,30],[18,35],[6,26],[8,12],[20,5],[33,12],[33,27],[22,35],[8,30],[6,15],[16,6],[30,9],[35,23],[26,34],[12,32],[5,20],[12,7],[27,7],[35,18],[29,32],[15,34]],DIAMOND_POINTS:[[30,5],[35,10],[40,15],[45,20],[50,25],[55,30],[50,35],[45,40],[40,45],[35,50],[30,55],[25,50],[20,45],[15,40],[10,35],[5,30],[10,25],[15,20],[20,15],[25,10]],SQUARE_POINTS:[[5,5],[10,5],[15,5],[20,5],[25,5],[30,5],[35,5],[40,5],[50,5],[55,5],[60,5],[65,5],[65,10],[65,15],[65,20],[65,25],[65,30],[65,35],[65,40],[65,45],[65,50],[65,55],[65,60],[65,65],[60,65],[55,65],[50,65],[45,65],[40,65],[35,65],[30,65],[25,65],[20,65],[15,65],[10,65],[5,65],[5,60],[5,55],[5,50],[5,45],[5,40],[5,35],[5,30],[5,25],[5,20],[5,15],[5,10]],getNodeByName:function(A){return aD.Widget.getByNode(h+aD.DiagramNode.buildNodeId(A));
},buildNodeId:function(A){return aH+N+a1+N+A.replace(/[^a-z0-9.:_\-]/ig,"_");},prototype:{LABEL_TEMPLATE:'<div class="'+ad+'">{label}</div>',boundary:null,hotPoints:[[0,0]],CONTROLS_TEMPLATE:'<div class="'+x+'"></div>',SERIALIZABLE_ATTRS:[aV,q,Q,g,V,a0,D,E],initializer:function(){var A=this;A.after({"dataset:remove":aD.bind(A._afterDataSetRemove,A),render:A._afterRender});A.on({nameChange:A._onNameChange});A.publish({connectDrop:{defaultFn:A.connectDrop},connectEnd:{defaultFn:A.connectEnd},connectMove:{defaultFn:A.connectMove},connectOutTarget:{defaultFn:A.connectOutTarget},connectOverTarget:{defaultFn:A.connectOverTarget},connectStart:{defaultFn:A.connectStart},boundaryMouseEnter:{},boundaryMouseLeave:{}});A.get(t).addClass(ar+bf+A.get(g));},destructor:function(){var A=this;A.eachConnector(function(bi,bj,bk){bk.removeTransition(bi.get(p));});A.invite.destroy();A.get(al).destroy();A.get(bc).removeField(A);},addTransition:function(bj){var A=this;var bi=A.get(ab);bj=A.prepareTransition(bj);if(!bi.containsKey(bj.uid)){bj.uid=aD.guid();bi.add(bj.uid,bj);}return bj;},alignTransition:function(bj){var A=this;var bk=aD.DiagramNode.getNodeByName(bj.target);if(bk){var bi=ak(A,bk);bj=aD.merge(bj,{sourceXY:bi[0],targetXY:bi[1]});A.getConnector(bj).setAttrs({p1:aw(A,bj.sourceXY),p2:aw(bk,bj.targetXY)});}},alignTransitions:function(){var A=this;A.get(ab).each(aD.bind(A.alignTransition,A));},close:function(){var A=this;return A.destroy();},connect:function(bm,bk){var A=this;bm=A.addTransition(bm);var bi=null;var bn=aD.DiagramNode.getNodeByName(bm.target);if(bn){if(!A.isTransitionConnected(bm)){var bj=A.get(bc);var bl=ak(A,bn);aD.mix(bm,{sourceXY:bl[0],targetXY:bl[1]});bi=new aD.Connector(aD.merge({builder:bj,graphic:bj.get(al),transition:bm},bk));A.get(m).add(bm.uid,bi);}}A.alignTransition(bm);return bi;},connectDrop:function(bi){var A=this;A.connectNode(bi.publishedTarget);},connectEnd:function(bl){var A=this;var bk=bl.target;var bi=A.get(bc);var bj=bi.publishedSource;if(!bi.isAbleToConnect()&&bi.get(P)&&bi.connector.get(au)){bi.showSuggestConnetorOverlay();}else{bi.connector.hide();bj.invite.set(au,false);}if(bi.get(S)){bi.get(u).each(function(bm){bm.set(c,false);});}},connectMove:function(bk){var A=this;var bj=A.get(bc);var bl=bk.mouseXY;bj.connector.set(aI,bl);if(bj.publishedTarget){var bi=A.invite;var bm=bi.get(aO)||0;if(!bi.get(au)){bi.set(au,true);}bi.setXY([bl[0]-bm,bl[1]-bm]);}},connectNode:function(bj){var bi=this;var A=bi.boundaryDragDelegate.dd;bi.connect(bi.prepareTransition({sourceXY:aG(A.startXY,bi.get(t)),target:bj.get(q),targetXY:aG(A.mouseXY,bj.get(t))}));},connectOutTarget:function(bj){var A=this;var bi=A.get(bc);bi.publishedTarget=null;bi.publishedSource.invite.set(au,false);},connectOverTarget:function(bj){var A=this;var bi=A.get(bc);if(bi.publishedSource!==A){bi.publishedTarget=A;}},connectStart:function(bk){var A=this;var bi=A.get(bc);var bj=bi.get(az);bi.connector.show().set(aK,bk.startXY);if(bi.get(S)){bi.get(u).each(function(bl){bl.set(c,true);});}aD.DiagramNodeManager.fire("publishedSource",{publishedSource:A});},disconnect:function(bi){var A=this;if(A.isTransitionConnected(bi)){A.removeTransition(bi);}},eachConnector:function(bk){var A=this;var bl=[],bi=[].concat(A.get(m).values),bj=bi.length;bg.each(A.get(bc).getSourceNodes(A),function(bm){bm.get(m).each(function(bn){if(A.get(q)===bn.get(p).target){bl.push(bm);bi.push(bn);}});});bg.each(bi,function(bm,bn){bk.call(A,bm,bn,(bn<bj)?A:bl[bn-bj]);});bi=bl=null;return bi;},getConnector:function(bi){var A=this;return A.get(m).item(bi.uid);},getContainer:function(){var A=this;return(A.get(bc).dropContainer||A.get(t).get(f));},getLeftTop:function(){var A=this;return aG(A.get(t),A.getContainer());},getProperties:function(){var A=this;var bi=A.getPropertyModel();bg.each(bi,function(bl){var bk=A.get(bl.attributeName),bj=at.type(bk);if(bj===an){bk=String(bk);}bl.value=bk;});return bi;},getPropertyModel:function(){var bi=this;var A=bi.getStrings();return[{attributeName:aV,editor:new aD.TextAreaCellEditor(),name:A[aV]},{attributeName:q,editor:new aD.TextCellEditor({validator:{rules:{value:{required:true}}}}),name:A[q]},{attributeName:g,editor:false,name:A[g]}];},isBoundaryDrag:function(bi){var A=this;return(bi===A.boundaryDragDelegate.dd);},isTransitionConnected:function(bi){var A=this;return A.get(m).containsKey(bi.uid);},prepareTransition:function(bj){var A=this;var bi={source:A.get(q),target:null,uid:aD.guid()};if(a6(bj)){bi.target=bj;}else{if(O(bj)){bi=aD.merge(bi,bj);}}return bi;},removeTransition:function(bi){var A=this;return A.get(ab).removeKey(bi.uid);},renderShapeBoundary:function(){var A=this;var bi=A.boundary=A.get(al).addShape(A.get(ag));return bi;},renderShapeInvite:function(){var A=this;var bi=A.invite=A.get(bc).get(al).addShape(A.get(j));bi.set(au,false);return bi;},syncConnectionsUI:function(){var A=this;A.get(ab).each(function(bi){A.connect(bi,bi.connector);});},_afterDataSetRemove:function(bj){var A=this;var bi=bj.target;if(bi===A.get(ab)){A.get(m).removeKey(bj.prevVal.uid);}else{if(bi===A.get(m)){bj.prevVal.destroy();}}},_afterRender:function(bi){var A=this;A.setStdModContent(ay.BODY,aa,ay.AFTER);A._renderGraphic();A._renderControls();A._renderLabel();A._uiSetHighlighted(A.get(c));},_bindBoundaryEvents:function(){var A=this;A.boundary.detachAll().on({mouseenter:aD.bind(A._onBoundaryMouseEnter,A),mouseleave:aD.bind(A._onBoundaryMouseLeave,A)});},_createDataSet:function(){var A=this;return new aD.DataSet({bubbleTargets:A});},_handleCloseEvent:function(bi){var A=this;A.get(bc).deleteSelectedNode();},_handleConnectStart:function(bi){var A=this;A.fire("connectStart",{startXY:bi});},_handleConnectMove:function(bj){var A=this;var bi=A.get(bc);A.fire("connectMove",{mouseXY:bj,publishedSource:bi.publishedSource});},_handleConnectEnd:function(){var A=this;var bi=A.get(bc);var bj=bi.publishedSource;var bk=bi.publishedTarget;if(bj&&bk){A.fire("connectDrop",{publishedSource:bj,publishedTarget:bk});}A.fire("connectEnd",{publishedSource:bj});
},_handleConnectOutTarget:function(bk){var A=this;var bi=A.get(bc);var bj=bi.publishedSource;if(bj){A.fire("connectOutTarget",{publishedSource:bj});}},_handleConnectOverTarget:function(){var A=this;var bi=A.get(bc);var bj=bi.publishedSource;if(bj){A.fire("connectOverTarget",{publishedSource:bj});}},_handleEditEvent:function(bi){var A=this;A.get(bc).editNode(A);},_onBoundaryDrag:function(bj){var bi=this;var A=bi.boundaryDragDelegate.dd;bi._handleConnectMove(A.con._checkRegion(A.mouseXY));},_onBoundaryDragEnd:function(bi){var A=this;A._handleConnectEnd();bi.target.get(aZ).show();},_onBoundaryDragStart:function(bi){var A=this;A._handleConnectStart(A.boundaryDragDelegate.dd.startXY);bi.target.get(aZ).hide();},_onBoundaryMouseEnter:function(bi){var A=this;A.fire("boundaryMouseEnter",{domEvent:bi});A._handleConnectOverTarget();},_onBoundaryMouseLeave:function(bi){var A=this;A.fire("boundaryMouseLeave",{domEvent:bi});A._handleConnectOutTarget();},_onNameChange:function(bi){var A=this;A.eachConnector(function(bj,bk,bl){var bm=bj.get(p);bm[(A===bl)?Y:l]=bi.newVal;bj.set(p,bm);});},_renderControls:function(){var A=this;var bi=A.get(t);A.controlsNode=aD.Node.create(A.CONTROLS_TEMPLATE).appendTo(bi);},_renderControlsToolbar:function(bi){var A=this;A.controlsToolbar=new aD.Toolbar(A.get(aP)).render(A.controlsNode);A._uiSetRequired(A.get(Q));},_renderGraphic:function(){var A=this;A.set(al,new aD.Graphic({height:A.get(a0),render:A.bodyNode,width:A.get(V)}));A.renderShapeInvite();A.renderShapeBoundary().addClass(aW);A._bindBoundaryEvents();A._setupBoundaryDrag();},_renderLabel:function(){var A=this;A.labelNode=aD.Node.create(at.sub(A.LABEL_TEMPLATE,{label:A.get("name")}));A.get("contentBox").placeAfter(A.labelNode);},_setTransitions:function(bj){var A=this;if(!a8(bj)){var bi=A._createDataSet();aD.Array.each(bj,function(bl){var bk=aD.guid();bl=O(bl)?aD.mix(bl,{uid:bk}):{uid:bk,target:bl};bi.add(bk,A.prepareTransition(bl));});bj=bi;}return bj;},_setupBoundaryDrag:function(){var A=this;var bi=A.get(bc);A.boundaryDragDelegate=new aD.DD.Delegate({bubbleTargets:A,container:A.bodyNode,nodes:i+aW,dragConfig:{useShim:false,plugins:[{cfg:{constrain:(bi?bi.get(az):null)},fn:aD.Plugin.DDConstrained},{cfg:{scrollDelay:150},fn:aD.Plugin.DDWinScroll},{cfg:{borderStyle:"0px",moveOnEnd:false,resizeFrame:false},fn:aD.Plugin.DDProxy}]},on:{"drag:drag":aD.bind(A._onBoundaryDrag,A),"drag:end":aD.bind(A._onBoundaryDragEnd,A),"drag:start":aD.bind(A._onBoundaryDragStart,A)}});aD.Do.after(A._bindBoundaryEvents,A.boundaryDragDelegate.dd,"_unprep",A);},_uiSetHighlighted:function(bj){var A=this;if(A.get(bd)){var bi=bj?A.get(aJ):A.get(ag+i+y);if(bi){A.boundary.set(y,bi);}}},_uiSetName:function(bj){var A=this;var bi=A.get(t);bi.set(aR,aD.DiagramNode.buildNodeId(bj));if(A.get("rendered")){A.labelNode.setContent(bj);}},_uiSetRequired:function(bk){var bj=this;var bi=bj.getStrings();var A=bj.controlsToolbar;if(A){if(bk){A.remove(a7);}else{A.add({handler:aD.bind(bj._handleCloseEvent,bj),icon:ax,id:a7,title:bi[L]});}}},_uiSetSelected:function(bi){var A=this;A.get(t).toggleClass(be,bi);if(bi&&!A.controlsToolbar){A._renderControlsToolbar();}},_uiSetXY:function(bj){var A=this;var bi=A.getContainer().getXY();this._posNode.setXY([bj[0]+bi[0],bj[1]+bi[1]]);},_valueControlsToolbar:function(bj){var bi=this;var A=bi.getStrings();return{activeState:false,children:[{handler:aD.bind(bi._handleEditEvent,bi),icon:o,id:I,title:A[R]},{handler:aD.bind(bi._handleCloseEvent,bi),icon:ax,id:a7,title:A[L]}]};},_valueShapeBoundary:function(){var A=this;return{height:41,type:"rect",stroke:{weight:7,color:"transparent",opacity:0},width:41};}}});aD.DiagramNode=bh;aD.DiagramBuilder.types[s]=aD.DiagramNode;aD.DiagramNodeState=aD.Component.create({NAME:H,ATTRS:{height:{value:40},type:{value:am},width:{value:40}},EXTENDS:aD.DiagramNode,prototype:{hotPoints:aD.DiagramNode.CIRCLE_POINTS,renderShapeBoundary:function(){var A=this;var bi=A.boundary=A.get(al).addShape(A.get(ag));bi.translate(5,5);return bi;},_valueShapeBoundary:function(){var A=this;return{radius:15,type:"circle",stroke:{weight:7,color:"transparent",opacity:0}};}}});aD.DiagramBuilder.types[am]=aD.DiagramNodeState;aD.DiagramNodeCondition=aD.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:a9},width:{value:60}},EXTENDS:aD.DiagramNodeState,prototype:{hotPoints:aD.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:function(){var A=this;var bi=A.boundary=A.get(al).addShape(A.get(ag));bi.translate(10,10);bi.rotate(45);return bi;},_valueShapeBoundary:aD.DiagramNode.prototype._valueShapeBoundary}});aD.DiagramBuilder.types[a9]=aD.DiagramNodeCondition;aD.DiagramNodeStart=aD.Component.create({NAME:H,ATTRS:{type:{value:aM}},EXTENDS:aD.DiagramNodeState});aD.DiagramBuilder.types[aM]=aD.DiagramNodeStart;aD.DiagramNodeEnd=aD.Component.create({NAME:H,ATTRS:{type:{value:aU}},EXTENDS:aD.DiagramNodeState});aD.DiagramBuilder.types[aU]=aD.DiagramNodeEnd;aD.DiagramNodeJoin=aD.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:w},width:{value:60}},EXTENDS:aD.DiagramNodeState,prototype:{hotPoints:aD.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:aD.DiagramNodeCondition.prototype.renderShapeBoundary,_valueShapeBoundary:aD.DiagramNode.prototype._valueShapeBoundary}});aD.DiagramBuilder.types[w]=aD.DiagramNodeJoin;aD.DiagramNodeFork=aD.Component.create({NAME:H,ATTRS:{height:{value:60},type:{value:aC},width:{value:60}},EXTENDS:aD.DiagramNodeState,prototype:{hotPoints:aD.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:aD.DiagramNodeCondition.prototype.renderShapeBoundary,_valueShapeBoundary:aD.DiagramNode.prototype._valueShapeBoundary}});aD.DiagramBuilder.types[aC]=aD.DiagramNodeFork;aD.DiagramNodeTask=aD.Component.create({NAME:H,ATTRS:{height:{value:70},type:{value:K},width:{value:70}},EXTENDS:aD.DiagramNodeState,prototype:{hotPoints:aD.DiagramNode.SQUARE_POINTS,renderShapeBoundary:function(){var A=this;var bi=A.boundary=A.get(al).addShape(A.get(ag));bi.translate(8,8);return bi;},_valueShapeBoundary:function(){var A=this;
return{height:55,type:"rect",stroke:{weight:7,color:"transparent",opacity:0},width:55};}}});aD.DiagramBuilder.types[K]=aD.DiagramNodeTask;},"@VERSION@",{requires:["aui-data-set","aui-diagram-builder-base","aui-diagram-builder-connector","overlay"],skinnable:true});