seajs.use('./js/plug/swiper.jquery.min.js',function() {
    $(function() {
        var sTime = null; //时间
        var oSilderImg = $('.js_silderImg'); //轮播框
        var oBNext = $('.js_BNext'); //下一个
        var oBPrev = $('.js_BPrev'); //上一个
        var oPagin = $('.js_pagin'); //个数点
        var oDetailsImg = $('.js_detailsImg'); //详情轮播
        var oOrderInfoBox = $('.js_orderInfoBox');   //订单tab切换
        var oOrderHeadNav = $('.js_orderHead');     //订单导航
        var oEmptyIcon = $('.js_emptyIcon');        //订单空的图标

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

        // 详情轮播
        var detailsSwiper = oDetailsImg.swiper({
            pagination: oPagin,
            paginationClickable: true,
            lazyLoading: true,
        });

        // 我的订单轮播
        var _iHeight = [];
        var oOrderSlide = oOrderInfoBox.find('.swiper-slide');
        oOrderSlide.each(function (i) {
            _iHeight.push(oOrderSlide.eq(i).outerHeight(true));
            return _iHeight;
        });
        oOrderSlide.css({ 'height': _iHeight[0] + 'px' });

        var orderSwiper = oOrderInfoBox.swiper({
            pagination: oOrderHeadNav[0],
            paginationClickable: true,
            paginationBulletRender:function(index,className){
                switch(index) {
                    case 0:name = '全部'; iconName = 'allOrder'; tip = ''; break;
                    case 1:name = '待付款'; iconName = 'WaitPay'; tip = '<i>100</i>'; break;
                    case 2:name = '待发货'; iconName = 'WaitSend'; tip = '<i>2</i>'; break;
                    case 3:name = '待收货'; iconName = 'WaitGet'; tip = '<i>3</i>'; break;
                    case 4:name = '交易成功'; iconName = 'OK'; tip = ''; break;
                }
                return '<p class="Bflex1 BoxCenter icoStyle icon-'+iconName+' '+ className+'"><span>'+name+'</span>'+tip+'</p>';
            },
            onSlideChangeEnd: function (swiper) {
                oOrderInfoBox.css({ 'height': _iHeight[swiper.activeIndex] + 'px' });
                oEmptyIcon.removeClass('swing').eq(swiper.activeIndex).addClass('swing');
            }
        });


    });

});