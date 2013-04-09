var mapObj = null;
function initialize() {
	document.getElementById("step_2").style.display = "none";
	document.getElementById("step_3").style.display = "none";

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

