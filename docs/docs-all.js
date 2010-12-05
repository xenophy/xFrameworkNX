Ext.ns("Ext.docs","Ext.docs.wiki","Ext.docs.api");Ext.app.App=function(cfg){var me=this;Ext.apply(me,cfg);me.addEvents({ready:true,beforeunload:true});Ext.onReady(me.initApp,me)};
Ext.extend(Ext.app.App,Ext.util.Observable,{initApp:function(){var me=this;me.viewport=new Ext.Viewport({layout:"border",items:[{region:"north",xtype:"header",id:"header"},{region:"west",xtype:"nav",id:"nav",ref:"nav",width:225,minSize:175,maxSize:400,split:true,margins:"0 0 5 5",cmargins:"0 5 5 5",autoScroll:true,listeners:{opendoc:function(id,node){me.viewport.main.load({url:"resources/output/"+id+".html",callback:function(){}})}}},{region:"center",xtype:"main",id:"doc-body",ref:"main",margins:"0 5 5 0",
cmargins:"0 5 5 0"},{region:"south",xtype:"footer",id:"footer"}]});var firstNode;me.viewport.nav.root.findChildBy(function(node){if(node.isLeaf()&&!firstNode)firstNode=node},me,true);firstNode.select();var t=Ext.get(firstNode.getUI().getEl());var a=t.child("a");me.viewport.nav.fireEvent("opendoc",a.getAttribute("href"),firstNode)}});Application=new Ext.app.App;Ext.HeaderBoxComponent=Ext.extend(Ext.BoxComponent,{initComponent:function(){var me=this;Ext.apply(me,{html:[{tag:"img",src:"resources/images/title.png",width:195,height:49}]});Ext.HeaderBoxComponent.superclass.initComponent.apply(me,arguments)}});Ext.reg("header",Ext.HeaderBoxComponent);Ext.FooterBoxComponent=Ext.extend(Ext.BoxComponent,{initComponent:function(){var me=this;Ext.apply(me,{html:[{tag:"address",html:"Copyright &copy; 2010 Xenophy.CO.,LTD All rights Reserved."}]});Ext.FooterBoxComponent.superclass.initComponent.apply(me,arguments)}});Ext.reg("footer",Ext.FooterBoxComponent);Ext.NavPanel=Ext.extend(Ext.tree.TreePanel,{initComponent:function(){var me=this;Ext.apply(me,{animate:false,rootVisible:false,lines:false,root:new Ext.tree.TreeNode,collapseFirst:false});me.root.appendChild([{text:"\u30de\u30cb\u30e5\u30a2\u30eb",cls:"category-node",expanded:true,children:Ext.docs.wiki},{text:"API \u30c9\u30ad\u30e5\u30e1\u30f3\u30c8",cls:"category-node",expanded:true,children:Ext.docs.api}]);me.on("afterrender",function(){var el=me.getEl();el.on("click",function(e,t){var t=e.getTarget("div.x-tree-node-leaf");
if(t){var t=Ext.get(t);var a=t.down("a");var id=a.getAttribute("href");if(id!=="#")me.fireEvent("opendoc",id)}e.stopEvent()})});Ext.NavPanel.superclass.initComponent.apply(me,arguments)}});Ext.reg("nav",Ext.NavPanel);Ext.MainPanel=Ext.extend(Ext.Panel,{initComponent:function(){var me=this;Ext.apply(me,{padding:20});Ext.MainPanel.superclass.initComponent.apply(me,arguments)}});Ext.reg("main",Ext.MainPanel);
