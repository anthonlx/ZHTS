mars3d.widget.bindClass(mars3d.BaseWidget.extend({
    options: {
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 350,
                height: 300
            }
        }
    },
    create: function() {},
    viewWindow: null,
    winCreateOK: function(t, i) { this.viewWindow = i },
    activate: function() {},
    disable: function() {},
    getData: function() {
        return widgetPointQy.arrdata
    },
    centerAt: function(t) { widgetPointQy.centerAt(t) },
    showXQ: function(t) { widgetPointQy.showXQ(t) },
    queryData: function(t) { return widgetPointQy.queryData(t) }
}));