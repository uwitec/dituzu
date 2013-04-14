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
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            if(paramobj.success instance
            paramObj.success(xmlHttp.responseText);
        }
    };

    xmlHttp.open(paramObj.method, paramObj.url, true);
    if(paramObj.method == "POST"){
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(paramObj.dataString);
    }else{
        xmlHttp.send();
    }
}
