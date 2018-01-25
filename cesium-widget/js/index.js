/* 2018-1-18 09:59:52 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683】 */
function initMap() { var a = haoutil.system.getRequestByName("config", "config.json");
    haoutil.loading.show(), L.mars.createMap({ id: "map", url: a + "?time=20180118", success: function(a, i, t) { haoutil.loading.hide(), map = a, L.widget.init(a, t.widget); var e = haoutil.system.getRequest(); if (haoutil.isutil.isNotNull(e.widget) && L.widget.activate(e.widget), haoutil.isutil.isNotNull(e.x) && haoutil.isutil.isNotNull(e.y) && haoutil.isutil.isNotNull(e.z)) { var o = Number(e.x),
                    n = Number(e.y),
                    r = Number(e.z);
                map.setView([n, o], r) } initWork() } }) }

function initWork() {}

function bindToLayerControl(a, i) { if (map.gisdata.controls && map.gisdata.controls.layers && map.gisdata.controls.layers.addOverlay(i, a), window.manageLayersWidget) manageLayersWidget.addLayerManager(a, i);
    else { var t = { name: a, _layer: i };
        i.config = t, map.gisdata.config.operationallayers.push(t) } }

function unbindLayerControl(a) { if (map.gisdata.controls && map.gisdata.controls.layers && map.gisdata.controls.layers.removeLayer(a), window.manageLayersWidget) manageLayersWidget.removeLayerManager(a);
    else
        for (var i = map.gisdata.config.operationallayers, t = 0; t < i.length; t++) { var e = i[t]; if (e._layer == a) { map.gisdata.config.operationallayers.splice(t, 1); break } } }

function activateWidget(a) { L.widget.activate(a) }

function activateFunByMenu(fun) { eval(fun) }
var map;
$(document).ready(function() { initMap() });