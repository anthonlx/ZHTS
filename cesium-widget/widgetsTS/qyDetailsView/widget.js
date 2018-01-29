mars3d.widget.bindClass(mars3d.BaseWidget.extend({
    options: {
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 250,
                height: 300
            }
        }
    },
    create: function() {},
    viewWindow: null,
    winCreateOK: function(t, a) {
        this.viewWindow = a
    },
    activate: function() {},
    disable: function() {},
    getData: function() {
        var t = this.config.dataQy;
        return null == t && (t = {
                ID: "B0FFHH68OO",
                NAME: "合肥火星科技有限公司",
                JC: "火星科技",
                LX: "信息技术",
                JD: 117.222121,
                WD: 31.832724,
                DZ: "安徽省合肥市蜀山区望江西路129号",
                LXDH: "0551-67191191"
            }),
            t.ID = "B0FFHH68OO",
            t.QYZP = 5,
            t.CPZP = 4,
            t.QYJJ = "有",
            t.JJ = [{
                    NF: "2015",
                    ZCZ: 6e3 + haoutil.math.random(1e3, 3e3),
                    LY: 1e3 + haoutil.math.random(100, 1e3),
                    NSE: 1e3 + haoutil.math.random(100, 1e3)
                },
                {
                    NF: "2016",
                    ZCZ: 1e4 + haoutil.math.random(2e3, 3e3),
                    LY: 3e3 + haoutil.math.random(100, 1e3),
                    NSE: 3e3 + haoutil.math.random(100, 1e3)
                },
                {
                    NF: "2017",
                    ZCZ: 25e3 + haoutil.math.random(3e3, 5e3),
                    LY: 5e3 + haoutil.math.random(100, 1e3),
                    NSE: 5e3 + haoutil.math.random(100, 1e3)
                }
            ],
            t
    },
    showSPJK: function() {
        var t = this.config.dataQy;
        null !== t && haoutil.msg("查看视频")
    }
}));