var mapObj = null;
var geo = null;
function initialize() {
	document.getElementById("step_2").style.display = "none";
	document.getElementById("step_3").style.display = "none";

	mapObj = new AMap.Map("map_content", {level:10});
	var point = new AMap.LngLat(116.404, 39.915);
	mapObj.setCenter(point);

	var GeocoderOption = {
		range: 3000,
		crossnum: 2,
		roadnum: 3,
		poinum: 2
	};
	geo = new AMap.Geocoder(GeocoderOption);
	mapObj.plugin(["AMap.ToolBar"], function(){
		tool = new AMap.ToolBar({
			direction:true,
			ruler:true,
			autoPosition:false
		});
		
		mapObj.addControl(tool);
		tool.doLocation();
		var counter = 0;
		function getLocationAfterAutoPosition(){
			var obj = tool.getLocation();
			if(counter > 5)
				return;
			if(!obj){
				counter ++;
				setTimeout(getLocationAfterAutoPosition, 1000);
			}else{
				document.getElementById("map_x").value = obj.center.lng; 
				document.getElementById("map_y").value = obj.center.lat; 
				geo.regeocode(obj.center, function(data){
					if(data.status == "E0"){
						var province, city, district;
						province = data.list[0].province.name;
						if(province == "北京市" || province == "上海市" 
							|| province == "天津市" || province == "重庆市"){
							city = province;
						} else {
							city = data.list[0].city.name;
						}
						district = data.list[0].district.name;
						document.getElementById("_province").value = province;
						document.getElementById("_city").value = city;
						document.getElementById("_area").value = district;
					}
				});
			}
		}
		getLocationAfterAutoPosition();
	});

	mapObj.bind(mapObj,"click",function(e){
		document.getElementById("map_x").value = e.lnglat.lng; 
		document.getElementById("map_y").value = e.lnglat.lat;  
	});

	document.getElementById("bStep1_next").onclick = function(){
		var aStep1 = document.getElementById("nav_1");
		aStep1.className = aStep1.className.replace(" active", "");
		document.getElementById("nav_2").className = "step active";

		document.getElementById("step_1").style.display = "none";
		document.getElementById("step_2").style.display = "block";
	};
	document.getElementById("bStep2_last").onclick = function(){
		var aStep2 = document.getElementById("nav_2");
		aStep2.className = aStep2.className.replace(" active", "");
		document.getElementById("nav_1").className = "step active";

		document.getElementById("step_1").style.display = "block";
		document.getElementById("step_2").style.display = "none";
	};
	document.getElementById("bStep2_next").onclick = function(){
		var aStep2 = document.getElementById("nav_2");
		aStep2.className = aStep2.className.replace(" active", "");
		document.getElementById("nav_3").className = "step active";

		document.getElementById("step_2").style.display = "none";
		document.getElementById("step_3").style.display = "block";
	};
	document.getElementById("bStep3_last").onclick = function(){
		var aStep3 = document.getElementById("nav_3");
		aStep3.className = aStep3.className.replace(" active", "");
		document.getElementById("nav_2").className = "step active";

		document.getElementById("step_2").style.display = "block";
		document.getElementById("step_3").style.display = "none";
	};
}

