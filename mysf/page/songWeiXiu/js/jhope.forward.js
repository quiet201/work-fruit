var request = function(addTo){
    this.Attributes = {}
    this.getAttribute = function(key,isRequest){
      return isRequest==true?JSON.parse(window.sessionStorage["Request"]||"{}")[key]:this.Attributes[key];
    }
    var temp = decodeURI(window.location.href).split("?");
    if(temp.length < 2){
      return ;
    }
    var parameterMap = temp[1].split("&");
    var mapkv;
    for (var i = 0; i < parameterMap.length; i++) {
        mapkv = parameterMap[i].split("=");
        this.Attributes[unescape(mapkv[0])] = unescape(mapkv[1]);
    };
    if(addTo===true){
    	window.sessionStorage["Request"] = JSON.stringify($.extend({},JSON.parse(window.sessionStorage["Request"]||"{}"), this.Attributes));
    	return ;
    }
    window.sessionStorage["Request"] = JSON.stringify(this.Attributes);
}