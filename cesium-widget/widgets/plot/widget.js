/* 2017-12-6 11:11:44 | 修改 木遥（QQ：346819890） */
//模块：
mars3d.widget.bindClass(mars3d.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 250, 
                position: {
                    "top": 5,
                    "right": 5,
                    "bottom": 5
                }
            }
        },
    },
    drawControl: null,
    //初始化[仅执行1次]
    create: function () {
        var $this = this;
        this.drawControl = new mars3d.Draw({
            viewer: this.viewer,
            hasEdit:true,
            dragIcon: this.path + 'img/dragIcon.png',
            onStopDrawing: function (entity) {
                $this.viewWindow.plotlist.plotEnd();
            },
            onStartEditing: function (entity) {
                $this.startEditing(entity);
            },
            onChangeEditing: function (entity) {
				$this.startEditing(entity);
            },
            onStopEditing: function (entity) { 
                $this.stopEditing(entity);
            }, 
        });
    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;
    },
    //激活插件
    activate: function () {
        //this.workDraw.onEvnet();
        //map.addLayer(this.layerDraw);

        var $this = this;
        $.getJSON(this.path + "testdata/plot.json", function (result) {
            $this.jsonToLayer(result,true,true);
        });
        
    },
    //释放插件
    disable: function () {
        this.deleteAll();
    },

    //开始标记
    startDraw: function (defval) {
        this.drawControl.startDraw(defval);
    }, 
    startEditing: function (entity) {
        var lonlats = this.drawControl.getCoordinates(entity);
        this.viewWindow.plotEdit.startEditing(entity.attribute, lonlats); 
    },
    stopEditing: function (layer) {
        this.viewWindow.plotEdit.stopEditing();
    },
    //更新图上的属性
    updateAttr2map: function (attr) {
        this.drawControl.updateAttribute(attr);
    },
    //更新图上的几何形状、坐标等
    updateGeo2map: function (coords,withHeight) {
    	var positions = coords;
    	if(positions.length == 2){
    		positions = Cesium.Cartesian3.fromDegrees(Number(coords[0]).toFixed(6),Number(coords[1]).toFixed(6),Number(0));
    	}else if(positions.length == 3){
    		positions = Cesium.Cartesian3.fromDegrees(Number(coords[0]).toFixed(6),Number(coords[1]).toFixed(6),Number(coords[2]).toFixed(2));
    	}else if(positions.length > 3){
    		if(withHeight){
    			positions = Cesium.Cartesian3.fromDegreesArrayHeights(coords);
    		}else{
    			positions = Cesium.Cartesian3.fromDegreesArray(coords);
    		}
    	}
        this.drawControl.updateGeometry(positions);
    },
    //文件处理
    getGeoJson: function () {
        return this.drawControl.toGeoJSON();
    },
    jsonToLayer: function (json, isClear, isFly) {
        return this.drawControl.jsonToEntity(json, isClear,isFly);
    },
    deleteAll: function () {
        this.drawControl.deleteAll();
    },
    deleteCurrentEntity:function(){
    	this.drawControl.deleteCurrentEntity();
    },
    hasEdit: function (val) {
        this.drawControl.hasEdit(val);
    },

    //弹窗属性编辑处理
    last_window_param: null,
    showEditAttrWindow: function (param) {
        this.last_window_param = param;
          
        //layer.open({
        //    type: 2,
        //    title: '选择数据',
        //    fix: true,
        //    shadeClose: false,
        //    maxmin: true,
        //    area: ["100%", "100%"],
        //    content: "test.html?name=" + param.attrName + "&value=" + param.attrVal,
        //    success: function (layero) {

        //    }
        //});
    },
    saveWindowEdit: function (attrVal) {
        this.viewWindow.plotEdit.updateAttr(this.last_window_param.parname, this.last_window_param.attrName, attrVal);
        layer.close(layer.index);
    }




}));