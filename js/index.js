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

function customizeMarker(info){
	//自定义覆盖物dom元素
	autoIncrementId = 0;
	var mDiv = document.createElement("div");
	mDiv.className = "diogs";

	var mImg = document.createElement("img");
	mImg.src = info.imgSrc;
	
	var mSpan = document.createElement("span");
	mSpan.innerHTML = info.num;
	
	var mAnchor = document.createElement("a");
	mAnchor.innerHTML = info.briefDesc;
	mAnchor.href = info.hopLink;
	
	mDiv.appendChild(mImg);
	mDiv.appendChild(mSpan);
	mDiv.appendChild(mAnchor);
	
	var marker = new AMap.Marker({
		id:info.id,
		position:info.location,
		offset:new AMap.Pixel(-38,-120),
		content:mDiv
	});
	mapObj.addOverlays(marker);
	autoIncrementId++;
	/*mapObj.bind(marker,"mouseover",function(){
		n.innerHTML = "高德软件";
		m.className = "marker change";
	});
	mapObj.bind(marker,"mouseout",function(){
		n.innerHTML = "Amap";
		m.className = m.className.replace(" change",""); 
	});*/
}

var mapObj = null;
function initialize() {
	mapObj = new AMap.Map("right_bottom", {level:10}); // 创建地图实例
	var point = new AMap.LngLat(116.404, 39.915); // 创建点坐标
	// mapObj.setCenter(point); // 设置地图中心点坐标

	mapObj.plugin(["AMap.ToolBar", "AMap.Scale"], function(){
		tool = new AMap.ToolBar({
			direction:true,
			ruler:true,
			autoPosition:true
		});
		mapObj.addControl(tool);

		scale = new AMap.Scale();
		mapObj.addControl(scale);
	});

	customizeMarker({
		id: "m225",
		imgSrc: "../image/test.jpg", 
		num: 3, 
		briefDesc: "95㎡ 5000元/月", 
		hopLink: "#", 
		location: new AMap.LngLat(116.37388157654,39.907409934248)
	});

	customizeMarker({
		id: "m226",
		imgSrc: "../image/test.jpg", 
		num: 3, 
		briefDesc: "2室1厅 5000元/月", 
		hopLink: "#", 
		location: new AMap.LngLat(116.57388157654,39.907409934248)
	});

	customizeMarker({
		id: "m227",
		imgSrc: "../image/test.jpg", 
		num: 43, 
		briefDesc: "340㎡ 50000元/月", 
		hopLink: "#", 
		location: new AMap.LngLat(116.47388157654,40.027409934248)
	});

}