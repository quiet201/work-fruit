window.onload = function(){

    FastClick.attach(document.body);

    //头部slider
    var $hSlider = $('#header-slider');
    var $swSlider  = $('#slider-switcher');

    $swSlider.on("click",function(e){
        e.stopPropagation();
        if( ! $swSlider.flag ){
            $swSlider.flag = true;
            $hSlider.addClass("open");
            hSwipe.setup();
        }else{
            $swSlider.flag = false;
            $hSlider.removeClass("open");
        }
    });
    $("#main-container").on("click",function(e){
        $swSlider.flag = false;
        $hSlider.removeClass("open");
    });

    var bullets = document.getElementById('bullets').children;

    var hSwipe = Swipe($hSlider[0], {
      startSlide: 0,
      speed: 300,
      continuous: true,
      callback: function(index, element) {
        var i = bullets.length;
        while( i--){
            bullets[i].className = " ";
        }
        bullets[index].className = "on";
      }
      // auto: 3000,
      // disableScroll: true,
      // stopPropagation: true,
      // transitionEnd: function(index, element) {}
    });
};