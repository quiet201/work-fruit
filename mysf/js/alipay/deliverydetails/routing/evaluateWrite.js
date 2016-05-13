//star
$(document).ready(function(){
    var stepW = 24;
    var stars = $("#star > i");
    var descriptionTemp;
    $("#showb").css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $("#showb").css({"width":stepW*n});
            $(this).find('a').blur();
            if(i<3){
            	 $("#Impression01").show();
                $("#Impression02").hide();
            }else{
            	 $("#Impression02").show();
                $("#Impression01").hide();
            }
            return stopDefault(e);
            return descriptionTemp;
        });
    });
  /*  stars.each(function(i){
        $(stars[0]).click(
            function(){
                $("#Impression01").show();
                $("#Impression02").hide();
            });
        $(stars[1]).click(
            function(){
                $("#Impression01").show();
                $("#Impression02").hide();
            });
        $(stars[2]).click(
            function(){
                $("#Impression01").show();
                $("#Impression02").hide();
            });
        $(stars[3]).click(
            function(){
                $("#Impression02").show();
                $("#Impression01").hide();
            });
        $(stars[4]).click(
            function(){
                $("#Impression02").show();
                $("#Impression01").hide();
            });
    });*/
});
function stopDefault(e){
    if(e && e.preventDefault)
           e.preventDefault();
    else
           window.event.returnValue = false;
    return false;
};