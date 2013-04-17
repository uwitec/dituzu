var mapObj = null;
var geo = null;

String.prototype.trim = function() {  
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*/);  
	return (m == null) ? "" : m[1];  
};  
  
String.prototype.isMobile = function() {  
	return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})/.test(this.trim()));  
};  
  
String.prototype.isTel = function(){   
	return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?/.test(this.trim()));  
}; 
String.prototype.isValidEmail = function(){
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(this.trim());
};
String.prototype.isInteger = function(){
	var reg = /^\d+$/;
	return reg.test(this.trim());
};
String.prototype.isFloat = function(){
	var reg = /^\d+(\.\d+)?$/;
	return reg.test(this.trim());
};
String.prototype.hasValidChar = function(){
	var reg = /select|update|delete|grant|join|union|exec|insert|drop|or|'|"|;|=|>|<|%/;
	return reg.test(this);
};

function PublishInfo(){
	this.cellName = "";
	this.province = "";
	this.city = "";
	this.district = "";
	this.street = "";
	this.lng = 0.0;
	this.lat = 0.0;
	this.rentType = 0;
	this.floor = 0;
	this.rooms = 0;
	this.halls = 0;
	this.toilets = 0;
	this.area = 0;
	this.price = 0;
	this.payment = 0;
	this.houseType = 0;
	this.decoration = 0;
	this.direction = 0;
	this.with = 0;
	this.owner = "";
	this.phone = "";
	this.email = "";
	this.verifyCode = "";
	this.isAgree = false;

	this.update1 = function(){
		this.cellName = document.getElementById("cn_label").value;
    	this.province = document.getElementById("_province").value;
    	this.city = document.getElementById("_city").value;
    	this.district = document.getElementById("_district").value;
    	this.street = document.getElementById("_street").value;
    	this.lng = document.getElementById("map_x").value;
    	this.lat = document.getElementById("map_y").value;
    }
    this.checkValid1 = function(){
    	var ret = true;
    	ret = document.getElementById("cn_label").onblur() && ret;
    	ret = document.getElementById("_street").onblur() && ret;
    	return ret;
    }
    this.update2 = function(){
    	this.rentType = document.getElementsByName("rent_type")[0].checked ? 0 : 1;
    	this.floor = document.getElementById("_level").value;
    	this.rooms = document.getElementById("_rooms").value;
    	this.halls = document.getElementById("_halls").value;
    	this.toilets = document.getElementById("_toilets").value;
    	this.area = document.getElementById("_area").value;
    	this.price = document.getElementById("_price").value;
    	var paySelect = document.getElementsByName("payment")[0];
    	this.payment = paySelect.options[paySelect.selectedIndex].value;
    	var houseSelect = document.getElementsByName("house_type")[0];
    	this.houseType = houseSelect.options[houseSelect.selectedIndex].value;
    	var decoSelect = document.getElementsByName("decoration")[0];
    	this.decoration = decoSelect.options[decoSelect.selectedIndex].value;
    	var dirtSelect = document.getElementsByName("direction")[0];
    	this.direction = dirtSelect.options[dirtSelect.selectedIndex].value;
    	var withCB = document.getElementsByName("with");
    	this.with = 0;
    	for(var i = 0; i < withCB.length; i++) if(withCB[i].checked){
    		this.with += parseInt(withCB[i].value);
    	}
    }
    this.checkValid2 = function(){
    	var ret = true;
    	ret = document.getElementById("house_ref").getElementsByTagName("input")[0].onblur() && ret;
    	ret = document.getElementById("_price").onblur() && ret;
    	return ret;
    }
    this.update3 = function(){
    	this.owner = document.getElementById("t_call").value;
    	this.phone = document.getElementById("t_phone").value;
    	this.email = document.getElementById("t_email").value;
    	this.verifyCode = document.getElementById("t_verify").value;
    	this.isAgree = document.getElementById("t_agree").checked;
	}
	this.checkValid3 = function(){
		var ret = true;
		ret = document.getElementById("t_call").onblur() && ret;
		ret = document.getElementById("t_phone").onblur() && ret;
		ret = document.getElementById("t_email").onblur() && ret;
		ret = document.getElementById("t_verify").onblur() && ret;
		ret = document.getElementById("t_agree").onblur() && ret;
		return ret;
	}
}
var formData = new PublishInfo();
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
			autoPosition:true
		});
		
		function autoPositionHandler(e){
			var pos = e.position.center;
			document.getElementById("map_x").value = pos.lng; 
			document.getElementById("map_y").value = pos.lat; 
			geo.regeocode(pos, function(data){
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
					document.getElementById("_district").value = district;
					mapObj.unbind(tool, "location", autoPositionHandler);
				}
			});
		}

		mapObj.bind(tool, "location", autoPositionHandler);
		mapObj.addControl(tool);
	});

	mapObj.bind(mapObj,"click",function(e){
		document.getElementById("map_x").value = e.lnglat.lng; 
		document.getElementById("map_y").value = e.lnglat.lat;  
	});
	document.getElementById("cn_label").onfocus = function(){
		if(this.value == "小区"){
			this.className = "";
			this.value = "";
			document.getElementById("cn_err").style.display = "none";
		}
	};
	document.getElementById("cn_label").onblur = function(){
		var node = document.getElementById("cn_err");
		if(this.value == "" || this.value == "小区"){
			this.className = "unfilled";
			this.value = "小区";
			node.innerHTML = "忘了填写小区名称！";
			node.style.display = "inline";
			return false;
		}
		if(this.value.hasValidChar()){
			node.innerHTML = "含有非法字符";
			node.style.display = "inline";
			return false;
		}
		return true;
	};
	document.getElementById("_street").onfocus = function(){
		if(this.value == "街、道"){
			this.className = "";
			this.value = "";
			document.getElementById("street_err").style.display = "none";
		}
	};
	document.getElementById("_street").onblur = function(){
		var node = document.getElementById("street_err");
		if(this.value == "" || this.value == "街、道"){
			this.className = "unfilled";
			this.value = "街、道";
			node.innerHTML = "忘了填写街道信息";
			node.style.display = "inline";
			return false;
		}
		if(this.value.hasValidChar()){
			node.innerHTML = "含有非法字符";
			node.style.display = "inline";
			return false;
		}
		return true;
	};
	var nodes = document.getElementById("house_ref").getElementsByTagName("input");
	for(var i = 0; i < nodes.length; i++){
		nodes[i].onblur = function(){
			var tip = document.getElementById("num_err");
			for(var k = 0; k < nodes.length; k++){
				if(nodes[k].value == "" || !nodes[k].value.isInteger()){
					tip.innerHTML = "楼层、室、厅、卫和面积不能为空且必须是整数";
					tip.style.display = "inline";
					return false;
				}
			}
			tip.style.display = "none";
			return true;
		};
	}
	document.getElementById("_price").onblur = function(){
		var node = document.getElementById("price_err");
		if(this.value == ""){
			node.innerHTML = "请填写租金";
			node.style.display = "inline";
			return false;
		}
		if(!this.value.isInteger()){
			node.innerHTML = "租金必须是整数";
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("t_call").onblur = function(){
		var node = document.getElementById("call_err");
		if(this.value == ""){
			node.innerHTML = "请填写您的称呼";
			node.style.display = "inline";
			return false;
		}
		if(this.value.hasValidChar()){
			node.innerHTML = "含有非法字符";
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("t_phone").onblur = function(){
		var node = document.getElementById("phone_err");
		if(this.value == ""){
			node.innerHTML = "请填写您的联系方式";
			node.style.display = "inline";
			return false;
		}
		if(this.value.hasValidChar()){
			node.innerHTML = "含有非法字符";
			node.style.display = "inline";
			return false;
		}
		if(!this.value.isTel() && !this.value.isMobile()){
			node.innerHTML = "联系方式格式不合法";
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("t_email").onblur = function(){
		var node = document.getElementById("email_err");
		if(this.value == ""){
			node.innerHTML = "请填写您的电子邮件";
			node.style.display = "inline";
			return false;
		}
		if(this.value.hasValidChar()){
			node.innerHTML = "含有非法字符";
			node.style.display = "inline";
			return false;
		}
		if(!this.value.isValidEmail()){
			node.innerHTML = "邮箱格式不合格";
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("t_verify").onblur = function(){
		var node = document.getElementById("verify_err");
		if(this.value == ""){
			node.innerHTML = "请填写验证码";
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("t_agree").onblur = function(){
		var node = document.getElementById("agree_err");
		if(!this.checked){
			node.style.display = "inline";
			return false;
		}
		node.style.display = "none";
		return true;
	};
	document.getElementById("bStep1_next").onclick = function(){
		if(!formData.checkValid1())
			return false;
		formData.update1();
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
		if(!formData.checkValid2())
			return false;
		formData.update2();
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
    document.getElementById("bStep3_finish").onclick = function(){
    	if(!formData.checkValid3())
			return false;
		formData.update3();
    	alert("here");
    	request({
    		url:"../php/publish.php",
    		method:"POST",
    		data:formData,
    		success:function(data){
        		alert(data);
    		},
    		error:function(){
        		alert("error");
    		}
});
    }
}

