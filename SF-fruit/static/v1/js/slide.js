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




        var oGoodsList = $('.js_goodsList');

        // 首页导航轮播
        // _indexPage.each(function(i) {
        //     _indexIHeight.push(_indexPage.eq(i).outerHeight(true));
        //     return _indexIHeight;
        // });
        //oIndexPage.css({ 'height': _indexIHeight[0] + 'px' });
        var _indexPage = oIndexPage.find('.js_listSlide');
        var _indexIHeight = _indexPage.eq(0).outerHeight(true);
        var _indexLiH = oGoodsList.eq(0).find('li').eq(0).outerHeight(true);
        var slideHeight;
        var _sIndex = 0;
        var swiperOff = [true,true,true,true,true];

        var nCount = [5,5,5,5,5];
        var IndexPage = [1,1,1,1,1];
        var indexH = [];
        var _html = _indexPage.eq(0).find('ul').html()


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
                //_indexPage.hide().eq(swiper.activeIndex).show();
                _sIndex = swiper.activeIndex;
                if(_sIndex !== 0) {
                    if(swiperOff[_sIndex]) {
                        slideHeight = _indexLiH*2
                    }
                    else {
                        slideHeight = indexH[_sIndex];
                    }

                }
                else {
                    slideHeight = _indexIHeight
                }
                oIndexPage.css({ 'height':slideHeight + 'px' });
                $(window).scrollTop(0);
                return _sIndex;
            }
        });


        $(window).on('scroll',function() {
            if(_sIndex !== 0) {
                swiperOff[_sIndex] = false
                indexH[_sIndex] = oIndexPage.outerHeight(true);
                throttleIndex(IndexScrollData,window);
            }
        });




    function IndexScrollData() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var scrollHeight = $(document).height();

        if (scrollTop + windowHeight >= scrollHeight - 150) {
            //页面加载 大于总数/单页的值时 停止加载

            if (IndexPage[_sIndex] >= nCount[_sIndex]) {
                return
            }
            else {
                IndexPage[_sIndex]++;
                _indexPage.eq(_sIndex).find('ul').append(_html)
                oIndexPage.css({'height':_indexLiH*2*(IndexPage[_sIndex]-1)});

            }
        }
    }

    function throttleIndex(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
            //console.log(111)
        }, 250);
    }









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

        // 我的订单轮播 js_myordSlide
        var oOrderHeadNav = $('.js_orderHead');     //订单导航
        var oEmptyIcon = $('.js_emptyIcon');        //订单空的图标
        var oOrderInfoBox = $('.js_orderInfoBox');  //订单tab切换
        var oOrderSlide = oOrderInfoBox.find('.swiper-slide');
        var oListHead_H = oOrderSlide.find('.carListHead').eq(0).outerHeight(true);
        var oOrderInfo_H = oOrderSlide.find('.orderInfo').eq(0).outerHeight(true);
        var oOrderLi_H = oOrderSlide.find('li').eq(0).outerHeight(true);
        var marginBottom = oOrderSlide.find('.carListBox').css('margin-bottom');
        var firstPage_H = oOrderSlide.eq(0).outerHeight(true);
        var swiperOff_H =[true,true,true,true,true];
        var aOrdCount = [5,5,5,5,5];
        var aOrdPage = [1,1,1,1,1];
        var aOrder_H = [];
        var _ordIHeight;

        // n是 对应 li 的个数  AlistHeight (n) 是一个店家的高度
        function AlistHeight (n) {
            return oListHead_H*1 + oOrderInfo_H*1 + oOrderLi_H*(n*1) + parseInt(marginBottom);
        }



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
                _sIndex = swiper.activeIndex;
                if(_sIndex !== 0) {
                    if(swiperOff_H[_sIndex]) {
                        _ordIHeight = AlistHeight (1) * 2;
                    }
                    else {
                        _ordIHeight = aOrder_H[_sIndex];
                    }
                }
                else {
                    _ordIHeight = firstPage_H;
                }
                console.log(_ordIHeight)

                oOrderInfoBox.css({ 'height': _ordIHeight + 'px' });
                oEmptyIcon.removeClass('swing').eq(_sIndex).addClass('swing');
                $(window).scrollTop(0);
                return _sIndex;
            }
        });

        $(window).on('scroll',function() {
            if(_sIndex !== 0) {
                swiperOff_H[_sIndex] = false;
                aOrder_H[_sIndex] = oOrderSlide.outerHeight(true);
                throttleIndex(OrderScrollData,window);
            }
        });



        function OrderScrollData() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var scrollHeight = $(document).height();

            if (scrollTop + windowHeight >= scrollHeight - 150) {
                //页面加载 大于总数/单页的值时 停止加载
                if (aOrdPage[_sIndex] >= aOrdCount[_sIndex]) {
                    return
                }
                else {
                    aOrdPage[_sIndex]++;
                    oOrderInfoBox.css({'height':AlistHeight (1) * 2});
                }
            }
        }

    });

});


