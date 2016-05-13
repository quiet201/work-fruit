$(function($){
	var r = new request();
	var serialNo = r.getAttribute("serialNo");
	$("#serialNo").val(serialNo);
    	
	//绑定事件
	$(".item-star").find('i.ico-star02').click(function(e){
		$(this).removeClass("able");
		$(this).nextAll().removeClass("able");
		$(this).addClass("able");
		$(this).prevAll().addClass("able");
		//设置评分值
		$(this).nextAll("input[target-star]").val($(this).attr("_val"));
	});

    $("#submit-ordcomment").click(function(){
        var score = $("#score").val();
        var expScore = $("#expScore").val();
        var serScore = $("#serScore").val();
        var serialNo = $("#serialNo").val();
        var fComment = $("#fComment").val();
        


        var data = {};
        data["score"] = score;
        data["expScore"] = expScore;
        data["serScore"] = serScore;
        data["serialNo"] = serialNo;
        data["fComment"] = fComment;

        //提交Ajax
        $.post("/service/songweixiu/private/ordcomment/insert", data ,function(result){
          if(result){
            if(result["returnCode"] == 200){
              $("#comment-content").alert({content:"请求成功"});
            }else{
              $("#comment-content").alert({content:result["returnMesg"]});
            }
          }
        },"json");
     });
});