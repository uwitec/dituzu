function getScreenSize(){
	if(window.innerWidth){
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}
	var doc = document.documentElement;
	if(doc && doc.clientWidth){
		return {
			width: doc.clientWidth,
			height: doc.clientHeight
		}
	}
}

function onResize(){
	if(window._resizeTimer){
		return;
	}
	window._resizeTimer = setTimeout(function(){
		var screenSize = getScreenSize();
		var map = document.getElementById("right_bottom");
		var map_width = screenSize.width-300 > 0 ? screenSize.width - 300 : 0;
		map.style.width =map_width + "px";
		var bottom = document.getElementById("bottom");
		var bottom_height = screenSize.height - 60 > 0 ? screenSize.height - 60 : 0;
		bottom.style.height = bottom_height + "px";
		window._resizeTimer = null;
	}, 100);
	
}

onResize();

var mapObj = null;
function initialize() {
	mapObj = new AMap.Map("right_bottom", {level:10}); // 创建地图实例
	var point = new AMap.LngLat(116.404, 39.915); // 创建点坐标
	// mapObj.setCenter(point); // 设置地图中心点坐标

	mapObj.plugin(["AMap.ToolBar", "AMap.Scale"], function(){
		tool = new AMap.ToolBar({
			direction:true,
			ruler:true,
			autoPosition:false
		});
		mapObj.addControl(tool);

		scale = new AMap.Scale();
		mapObj.addControl(scale);
	});
/*
	var marker = new AMap.Marker({
		id:"m",
		position: point,
		offset:new AMap.Pixel(-8, -34),
		icon: new AMap.Icon({
			size:new AMap.Size(27, 36),
			image:"http://webapi.amap.com/static/images/custom_a_j.png",
			imageOffset:new AMap.Pixel(-28,  0)
		}) 
	});
	mapObj.addOverlays(marker);
*/

	//自定义覆盖物dom元素
	var m = document.createElement("div");
	m.className = "marker";
	var n = document.createElement("div");
	n.innerHTML = "Amap";
	m.appendChild(n);
	
	var marker = new AMap.Marker({
		id:"m225",
		position:new AMap.LngLat(116.37388157654,39.907409934248),//基点位置
		offset:new AMap.Pixel(0,-40),//相对于基点的偏移位置
		//draggable:true, //是否可拖动
		content:m //自定义覆盖物内容
	});
	mapObj.addOverlays(marker);  //添加到地图
	//mouseover,换个皮肤
	mapObj.bind(marker,"mouseover",function(){
		n.innerHTML = "高德软件";//修改内容
		m.className = "marker change";//增加样式
	});
	//mouseout,换回皮肤
	mapObj.bind(marker,"mouseout",function(){
		n.innerHTML = "Amap";//修改内容
		m.className = m.className.replace(" change",""); 
	});

}