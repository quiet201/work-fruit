seajs.use('./js/plug/swiper.jquery.min.js',function() {
    $(function() {
        var sTime = null; //时间
        var oSilderImg = $('.js_silderImg'); //轮播框
        var oBNext = $('.js_BNext'); //下一个
        var oBPrev = $('.js_BPrev'); //上一个
        var oPagin = $('.js_pagin'); //个数点
        var oDetailsImg = $('.js_detailsImg'); //详情轮播

        //首页轮播
        var indexSwiper = oSilderImg.swiper({
            nextButton: oBNext,
            prevButton: oBPrev,
            pagination: oPagin,
            paginationClickable: true,
            preloadImages: false,
            lazyLoading: true,
            autoplay: 4000,
            onTouchEnd: function (swiper) {
                clearTimeout(sTime);
                sTime = setTimeout(function () {
                    indexSwiper.startAutoplay();
                }, 4000);
            },
        });
        var detailsSwiper = oDetailsImg.swiper({
            pagination: oPagin,
            paginationClickable: true,
            lazyLoading: true,
        });



    });

});