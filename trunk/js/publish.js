var mapObj = null;
function initialize() {
	mapObj = new AMap.Map("map_content", {level:10});
	var point = new AMap.LngLat(116.404, 39.915);
	mapObj.setCenter(point);

	mapObj.plugin(["AMap.ToolBar"], function(){
		tool = new AMap.ToolBar({
			direction:true,
			ruler:true,
			autoPosition:false
		});
		mapObj.addControl(tool);
	});
}