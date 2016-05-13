$(function($){
  $.get("/service/songweixiu/private/order/list", {},function(result){
        if(result){
        	if(result['redirect']){
        		window.location.href = result['redirect'];
        	}
          var template = [],temp;
          for (var i = 0; i < result.length; i++) {
            temp = result[i];
            template.push('<div class="row col grid-green">');
               template.push('<div class="phone-model">');
                template.push('<p class="model-p">'+temp['productseries']+'</p>');
                template.push('<p class="fault-p">'+temp['customerbigfaultcode1']+'、'+temp['customerbigfaultcode2']+'</p>');
                template.push('<p class="date">'+new Date(temp['createtm']).pattern("yyyy-MM-dd hh:mm:ss")+'</p>');
               template.push('</div>');
               
               template.push('<div class="zt-jx">');
                 template.push('<p class="djx1">'+temp['progress']+'</p>');
                 template.push('<p><a class="more-d" href="order-detail1.html?erporder='+temp['erporder']+'">查看详情</a></p>');
               template.push('</div>');
            template.push('</div>');
          };
          $("#order_list").html(template.join(""));
        }
    },"json");
});