function getXmlHttpObject(){
    var xmlHttp = null;
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    } else {
        try{
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e){
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}
var xmlHttp;
function request(paramObj){
    xmlHttp = getXmlHttpObject();
    if(xmlHttp == null){
        alert("Browser does not suport HTTP Request");
        return;
    }

    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4){
            if(xmlHttp.status < 400){
                paramObj.success(xmlHttp.responseText);
            } else {
                paramObj.error();
            }
        }
    };

    xmlHttp.open(paramObj.method, paramObj.url, true);
    if(paramObj.method == "POST"){
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var paramStr = "";
        var counter = 0;
        for(var name in paramObj.data){
            if(typeof paramObj.data[name] === "function")
                continue;
            if(counter != 0)
                paramStr += "&";
            paramStr += name + "=" + paramObj.data[name];
            counter ++;
        }
        alert(paramStr);
        xmlHttp.send(paramStr);
    }else{
        xmlHttp.send();
    }
}

function User(){
    this.name = "zp";
    this.pass = "111111";
    this.foo = function(){
        alert("here");
    }
}

request({
    url:"b.txt",
    method:"POST",
    data:new User(),
    success:function(data){
        alert("success");
    },
    error:function(){
        alert("error");
    }
});
