var widgetPointQy = mars3d.widget.bindClass(mars3d.BaseWidget.extend({
    options: { resources: ["map.css"] },
    create: function() {
        var e = this;
        bindToLayerControl({
            pid: 30,
            name: "企业",
            visible: !0,
            onAdd: function() {
                $(e.entities).each(function(t, i) { e.viewer.entities.add(i) })
            },
            onRemove: function() {
                $(e.entities).each(function(t, i) {
                    e.viewer.entities.remove(i)
                })
            },
            onCenterAt: function(t) {
                e.viewer.flyTo(e.entities, { duration: t })
            }
        });
        var t = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        t.setInputAction(function(e) {
                var t = e.position,
                    i = viewer.scene.pick(t);
                if (i && Cesium.defined(i.id)) {
                    var n = i.id;
                    n.data && n.data.ID && widgetPointQy.showXQ(n.data.ID)
                }
            },
            Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    arrdata: [],
    entities: [],
    activate: function() {
        var e = this;
        this.arrdata = this.config.dataQy, this.arrdata ? (this.addFeature(this.arrdata),
            setTimeout(function() {
                e.addFeature(e.arrdata)
            }, 6e3)) : $.getJSON(this.path + "data/point.json",
            function(t) {
                e.arrdata = t.Data,
                    e.addFeature(e.arrdata, !0),
                    setTimeout(function() { e.addFeature(e.arrdata) }, 6e3)
            })
    },
    disable: function() {},
    clear: function() {
        var e = this.viewer;
        $(this.entities).each(function(t, i) {
                e.entities.remove(i)
            }), this.entities = [],
            mars3d.tooltip.hide()
    },
    objData: {},
    addFeature: function(e, t) {
        this.clear();
        var i = this;
        return i.objData = {}, i.entities = [], $(e).each(function(e, t) {
            i.objData[t.ID] = t;
            var n = Number(t.JD),
                a = Number(t.WD);
            if (!isNaN(n) && 0 != n && !isNaN(a) && 0 != a) {
                t.JD = n, t.WD = a;
                var r = '<ul class="qyMarker" onclick="widgetPointQy.showXQ(\'' + t.ID + "')\">\t\t<li>" + t.NAME + "</li>\t\t<li>" + t.LX + "</li></ul>",
                    o = i.viewer.entities.add({
                        name: t.JC,
                        position: Cesium.Cartesian3.fromDegrees(n, a),
                        point: {
                            color: new Cesium.Color.fromCssColorString("#3388ff"),
                            pixelSize: 10,
                            outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
                            outlineWidth: 2,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                        },
                        label: {
                            text: t.JC,
                            font: "16px Helvetica",
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: Cesium.Color.AZURE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset: new Cesium.Cartesian2(0, (-10)),
                            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 25e3)
                        },
                        data: t,
                        tooltip: { html: r, anchor: [0, -12] }
                    });
                t._entity = o, i.entities.push(o)
            }
        }), t && i.viewer.flyTo(i.entities, { duration: 3 }), e
    },
    getData: function() { return this.arrdata },
    showXQ: function(e) {
        var t = this.objData[e];
        null !== t && mars3d.widget.activate({ uri: "widgetsTS/qyDetailsView/widget.js", dataQy: t })
    },
    queryData: function(e) {
        var t = [];
        this.clear();
        for (var i = this.arrdata, n = 0; n < i.length; n++) {
            var a = i[n];
            "" != e.key && a.NAME.indexOf(e.key) == -1 || (t.push(a), a._entity && (this.viewer.entities.add(a._entity),
                this.entities.push(a._entity)))
        }
        return t
    },
    lastCenter: null,
    clearLastCenter: function() {
        mars3d.tooltip.hide(),
            null != this.lastCenter && (this.lastCenter.point && (this.lastCenter.point.color = new Cesium.Color.fromCssColorString("#3388ff")),
                this.lastCenter = null)
    },
    centerAt: function(e) {
        this.clearLastCenter();
        var t = this.objData[e];
        if (null !== t) {
            var i = t._entity;
            if (null == i) return void haoutil.msg(t.JC + " 无经纬度坐标信息！");
            viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(t.JD, t.WD, 2500),
                    duration: 3,
                    orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 }
                }), setTimeout(function() { mars3d.tooltip.show(i, i.position.getValue()) }, 3e3),
                this.lastCenter = i, this.lastCenter.point && (this.lastCenter.point.color = new Cesium.Color.fromCssColorString("#ff0000"));
            var n = this;
            setTimeout(function() { n.clearLastCenter() }, 1e4)
        }
    }
}));