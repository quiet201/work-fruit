var address = {
    del:function(id){
      var e = event;
    	$.post("/service/songweixiu/private/address/delete", {id:id},function(result){
          if(result){
          	if(result["returnCode"] == 200){
                  $(e.target).parents("div.row").remove();
               }else{
                  $("#adress-content").alert({content:result["returnMesg"]});
               }
          }
        },"json");
    },
    updateDefault:function(id){
      var e = event;
      if($(e.target).hasClass("check-active")){
        return ;
      }
      $("i.check-a").each(function(){
        $(this).removeClass("check-active");
      });
      $(e.target).addClass("check-active");
      
      $.post("/service/songweixiu/private/address/update/default", {id:id},function(result){
        if(result){
            if(result["returnCode"] == 200){
                  $("#adress-content").alert({content:"操作成功"});
               }else{
                  $("#adress-content").alert({content:result["returnMesg"]});
               }
          }
      },"json");
    }
}

$(function($){
    $.get("/service/songweixiu/private/address/list", {},function(result){
        if(result){
          var adressTemplate = [];
          for (var i = 0; i < result.length; i++) {
                adressTemplate.push('<div class="row grid-fff btg">');
                  adressTemplate.push('<div class="adress-con" style="width:100%;">');
                    adressTemplate.push('<p class="fz13">'+ result[i]['userName'] +'<span class="date date-fl">'+result[i]['telePhone']+'</span></p>');
                    adressTemplate.push('<p class="fault-p">'+result[i]['detailAddress']+'</p>');
                    adressTemplate.push('<div class="cb manage-adress">');
                      adressTemplate.push('<div class="text-hui"> ');
                        adressTemplate.push('<a href="#">');
                          var isdef = result[i]['addressStatus'] == 1 ? ' check-active' : '';
                          adressTemplate.push('<i class="check-a'+ isdef +'" onclick="address.updateDefault('+result[i]['id']+')">&nbsp;</i>'); 
                          adressTemplate.push('<span class="adress-fault-t">默认地址</span>');
                        adressTemplate.push('</a>');
                      adressTemplate.push('</div>');
                      adressTemplate.push('<div class="btn-text-r">');
                        adressTemplate.push('<a class="btn-buttom-line btn-color-hui" href="editor-adress.html?id='+result[i]['id']+'">编辑</a>');
                        adressTemplate.push('<a class="btn-buttom-line btn-color-hui ml10" onclick="address.del('+result[i]['id']+')">删除</a>');
                      adressTemplate.push('</div>');
                    adressTemplate.push('</div>');
                  adressTemplate.push('</div>');
                adressTemplate.push('</div>');
          };
          $("#adress-list").html(adressTemplate.join(""));
        }
    },"json");
});