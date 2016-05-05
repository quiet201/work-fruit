seajs.use('./static/v1/js/plug/swiper.jquery.min.js',function() {
    $(function() {
        var sTime = null;                           //时间
        var oSilderImg = $('.js_silderImg');        //广告轮播框
        var oIndexPage = $('.js_index');            //首页
        var oIndexNav = $('.js_headerNav');         //首页导航
        var oBNext = $('.js_BNext');                //下一个
        var oBPrev = $('.js_BPrev');                //上一个
        var oPagin = $('.js_pagin');                //个数点
        var oDetailsImg = $('.js_detailsImg');      //详情轮播
        var oOrderInfoBox = $('.js_orderInfoBox');  //订单tab切换
        var oOrderHeadNav = $('.js_orderHead');     //订单导航
        var oEmptyIcon = $('.js_emptyIcon');        //订单空的图标


        var oGoodsList = $('.js_goodsList');

        // 首页导航轮播
        // _indexPage.each(function(i) {
        //     _indexIHeight.push(_indexPage.eq(i).outerHeight(true));
        //     return _indexIHeight;
        // });
        //oIndexPage.css({ 'height': _indexIHeight[0] + 'px' });
        var _indexIHeight;
        var _indexPage = oIndexPage.find('.js_listSlide');
        var _indexIHeight = _indexPage.eq(0).outerHeight(true);
        var _indexLiH = oGoodsList.eq(0).find('li').eq(0).outerHeight(true);
        var oIndexSwiper = oIndexPage.swiper({
            pagination: oIndexNav[0],
            paginationClickable: true,
            paginationBulletRender:function(index,className){
                switch(index) {
                    case 0:name = '精选'; break;
                    case 1:name = '当季鲜果'; break;
                    case 2:name = '海鲜蛋肉';  break;
                    case 3:name = '五谷干货';  break;
                    case 4:name = '酒茶饮品'; break;
                }
                return '<li class="Bflex1 '+className+'"><a>'+name+'</a></li>';
            },
            onSlideChangeEnd: function (swiper) {
                if(swiper.activeIndex !== 0) {
                    oIndexPage.css({ 'height': _indexLiH*2 + 'px' });
                }
                else {
                    oIndexPage.css({ 'height': _indexIHeight + 'px' });
                }

                $(window).scrollTop(0);
            }
        });



        //首页广告轮播
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
        var _ordIHeight = [];
        var oOrderSlide = oOrderInfoBox.find('.swiper-slide');
        oOrderSlide.each(function (i) {
            _ordIHeight.push(oOrderSlide.eq(i).outerHeight(true));
            return _ordIHeight;
        });
        oOrderSlide.css({ 'height': _ordIHeight[0] + 'px' });

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
                oOrderInfoBox.css({ 'height': _ordIHeight[swiper.activeIndex] + 'px' });
                oEmptyIcon.removeClass('swing').eq(swiper.activeIndex).addClass('swing');
                $(window).scrollTop(0);
            }
        });


    });

});