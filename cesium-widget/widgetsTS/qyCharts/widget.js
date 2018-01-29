mars3d.widget.bindClass(mars3d.BaseWidget.extend({
    options: {
        view: [{
                type: "window",
                url: "view.html",
                windowOptions: {
                    noTitle: !0,
                    closeBtn: 0,
                    width: 300,
                    position: {
                        top: 150,
                        bottom: 5,
                        left: 5
                    }
                }
            },
            {
                type: "window",
                url: "view2.html",
                windowOptions: {
                    noTitle: !0,
                    closeBtn: 0,
                    width: 300,
                    position: {
                        top: 5,
                        bottom: 5,
                        right: 5
                    }
                }
            }
        ]
    },
    create: function() {},
    activate: function() {},
    disable: function() {},
    setViewStyle: function(t) {
        var r = this.options.view[0];
        layer.style(r._layerIdx, t)
    },
    getData: function() { return this.config.dataQy },
    getAllCount: function() { var t = this.getData(); return t.length },
    getArrForYearJJ: function() {
        for (var t = this.getData(), r = {}, n = 0; n < t.length; n++)
            for (var e = t[n].JJ, a = 0; a < e.length; a++) {
                var o = e[a],
                    i = o.NF;
                null == r[i] && (r[i] = { NF: i, ZCZ: 0, LY: 0, NSE: 0 }),
                    r[i].ZCZ += Number(o.ZCZ || 0), r[i].LY += Number(o.LY || 0),
                    r[i].NSE += Number(o.NSE || 0)
            }
        var e = [];
        for (var n in r) {
            var u = r[n];
            u.ZCZ = Math.round(u.ZCZ / 1e3) / 10,
                u.LY = Math.round(u.LY / 1e3) / 10,
                u.NSE = Math.round(u.NSE / 1e3) / 10, e.push(u)
        }
        var l = function(t) {
            return function(r, n) {
                var e = r[t],
                    a = n[t];
                return e < a ? -1 : e > a ? 1 : 0
            }
        };
        return e.sort(l("NF")), e
    },
    getArrForTypeCount: function() {
        for (var t = this.getData(), r = {}, n = 0; n < t.length; n++) {
            var e = t[n],
                a = $.trim(e.LX);
            "" == a && (a = "其他"),
                null == r[a] && (r[a] = 0),
                r[a] += 1
        }
        var o = [];
        for (var i in r) {
            var u = Number(r[i]);
            o.push({ name: i, value: u })
        }
        return o
    },
    getArrForTypeJJ: function(t) {
        null == t && (t = "ZCZ");
        for (var r = this.getData(),
                n = {},
                e = 0; e < r.length; e++) {
            var a = r[e],
                o = a.JJ;
            if (null != o && 0 != o.length) {
                var i = $.trim(a.LX);
                "" == i && (i = "其他"),
                    null == n[i] && (n[i] = 0),
                    n[i] += Number(o[o.length - 1][t] || 0)
            }
        }
        var u = [];
        for (var l in n) {
            var v = Math.round(n[l]);
            u.push({ name: l, value: v })
        }
        return u
    },
    getArrForSortQy: function(t) {
        null == t && (t = "ZCZ");
        for (var r = this.getData(), n = [], e = 0; e < r.length; e++) {
            var a = r[e],
                o = 0,
                i = a.JJ;
            if (null != i && i.length > 0 && (o = Number(i[i.length - 1][t] || 0)), 0 != o) {
                var u = a.JC;
                n.push({ name: u, value: o })
            }
        }
        var l = function(t) {
            return function(r, n) {
                var e = r[t],
                    a = n[t];
                return e < a ? -1 : e > a ? 1 : 0
            }
        };
        return n.sort(l("value")), n
    }
}));