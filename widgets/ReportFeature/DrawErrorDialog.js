// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/ReportFeature/DrawErrorDialog.html":'\x3cdiv\x3e\r\n\t\x3cp style\x3d"width:90%;height:25px;margin: 20px 5px 0px 7px;"\x3e${nls.chooseALayer}: \x3c/p\x3e\r\n\t\x3cselect data-dojo-attach-point\x3d"selectLayer" class\x3d"jimu-input" style\x3d"width:90%;height:31px;margin: 5px 5px 5px 7px;"\x3e\r\n    \x3coption value\x3d""\x3e\x3c/option\x3e\r\n  \x3c/select\x3e\r\n  \r\n  \x3cp style\x3d"display: none;" data-dojo-attach-point\x3d"drawErrorInstructionsNode" style\x3d"width:90%;height:25px;margin: 5px 5px 5px 7px;" \x3e${nls.drawErrorInstructions}\x3c/p\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"drawBoxNode" style\x3d"display: none"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/array dojo/on dojo/string dojo/dom-construct dojo/dom-style dijit/_WidgetBase dijit/_TemplatedMixin dojo/query dojo/i18n!esri/nls/jsapi esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/geometry/Polygon esri/tasks/datareviewer/ReviewerResultsTask ./InfoWindowContent dojo/text!./DrawErrorDialog.html".split(" "),function(m,g,e,n,k,f,p,q,l,r,t,u,v,w,x,y,z){var A=new t({type:"esriSMS",style:"esriSMSCircle",size:12,xoffset:0,
yoffset:0,color:[0,0,255,51],outline:{type:"esriSLS",style:"esriSLSSolid",color:[0,0,255,128],width:1}}),B=new u({type:"esriSLS",style:"esriSLSSolid",color:[0,0,255,51],width:2}),C=new v({type:"esriSFS",style:"esriSFSSolid",color:[0,0,255,26],outline:{type:"esriSLS",style:"esriSLSSolid",color:[0,0,255,128],width:1}});return m([p,q],{templateString:z,baseClass:"drs-draw-error-dialog",buildRendering:function(){this.inherited(arguments);this._initDom()},_initDom:function(){var a=this.getLayerOptions();
void 0!==a&&""!==a&&k.place(a,this.selectLayer)},_setDrawBoxAttr:function(a){this.setDrawBox(a)},setDrawBox:function(a){this.drawBox=a;this.drawBox.placeAt(this.drawBoxNode);this.drawBox.setMap(this.map);this.drawBox.setPointSymbol(A);this.drawBox.setLineSymbol(B);this.drawBox.setPolygonSymbol(C)},postCreate:function(){this.inherited(arguments);this._initEvents()},startup:function(){this.inherited(arguments);this.drawBox.startup()},_initEvents:function(){var a=this;this.own(e(this.selectLayer,"change",
function(c){var b=c.target.value;c=g.filter(a.config.layers,function(d){return d.id===b});void 0!==c&&0<c.length&&void 0===a.map.getLayer(b)?a.emit("Error",{},[a.nls.errorMapService]):(r.toolbars.draw.addPoint=a.nls.drawFeatureMapPoint,b?a.startDrawing():a.cancelDrawing())}));this.own(e(this.map.infoWindow,"hide",function(){var c=l(".actionsPane");void 0!==c&&null!==c&&0<c.length&&(c[0].style.display="");a.emit("InfoWindowHide")}));this.own(e(this.drawBox,"DrawEnd",function(c,b,d){a._onDrawEnd(c,
b,d)}))},startDrawing:function(){f.set(this.drawErrorInstructionsNode,"display","");f.set(this.drawBoxNode,"display","")},cancelDrawing:function(){this.drawBox.clear();this.drawBox.deactivate();f.set(this.drawErrorInstructionsNode,"display","none");f.set(this.drawBoxNode,"display","none")},_onDrawEnd:function(a){var c=this,b=a.geometry;if("extent"===b.type){var d=new w(b.spatialReference);d.addRing([[b.xmin,b.ymin],[b.xmin,b.ymax],[b.xmax,b.ymax],[b.xmax,b.ymin],[b.xmin,b.ymin]]);b=d}this._resultGeometry=
b;this.drawBox.clear();this.drawBox.deactivate();if(null!==this._resultGeometry){switch(this._resultGeometry.type){case "polyline":b=this._resultGeometry.getExtent().getCenter();break;case "polygon":b=this._resultGeometry.getCentroid();break;default:b=this._resultGeometry}this.map.infoWindow.setTitle(this.nls.infoWindowTitle);this.infoWindowContent=new y({nls:this.nls,title:this.nls.draw,includeReportedBy:this.config.includeReportedBy,defaultUserName:this.config.defaultUserName,onReportSubmit:function(h){c.submitReport(h)}},
k.create("div"));this.infoWindowContent.startup();d=g.filter(c.config.layers,function(h){return h.id===c.selectLayer.value});this.infoWindowContent.set("layerName",d[0].alias);this.infoWindowContent.set("graphic",a);e.once(this.map.infoWindow,"hide",function(){c.map.setInfoWindowOnClick(!1)});this.map.infoWindow.destroyDijits();l(".actionsPane")[0].style.display="none";this.map.infoWindow.setContent(this.infoWindowContent.domNode);this.map.infoWindow.resize(300,600);this.map.infoWindow.show(b);this.emit("DrawEnd")}},
submitReport:function(a){var c=this;a.sessionId=this._sessionId;this.map.infoWindow.hide();this._reviewerResultsTask.writeResult(a,this._resultGeometry).then(function(b){c._onWriteResultComplete(b)},function(b){c._onWriteResultError(b)})},_onWriteResultComplete:function(a){a&&a.success?this.emit("Message",{},["",this.nls.reportMessage]):this.emit("Error",{}[this.nls.errorReportMessage])},_onWriteResultError:function(a){this.emit("Error",{},[a.message,a])},destroy:function(){this.drawBox&&(this.drawBox.destroy(),
this.drawBox=null);this.inherited(arguments)},reset:function(){this.selectLayer.selectedIndex=0;void 0!==this.infoWindowContent&&null!==this.infoWindowContent&&this.infoWindowContent.destroyRecursive();this.map.setInfoWindowOnClick(!1);this.cancelDrawing()},setDrsUrl:function(a){this._reviewerResultsTask=new x(a)},setReviewerSession:function(a){isNaN(a)?this._sessionId=1:this._sessionId=parseInt(a,10)},getLayerOptions:function(){var a="";g.forEach(this.config.layers,function(c){!0===c.show&&(a+=n.substitute('\x3coption value\x3d"${id}"\x3e${alias}\x3c/option\x3e',
c))});return a}})});