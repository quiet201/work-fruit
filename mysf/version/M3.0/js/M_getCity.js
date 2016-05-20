seajs.config({
    alias: {
      'hammer' : '../../../version/M3.0/js/M_plug/hammer.min.js',
      'iscroll': '../../../version/M3.0/js/M_plug/iscroll.min.js',
      //'layer'  :'../../../../version/M3.0/js/M_plug/layer/layer.js',
      'public' :'../../../version/M3.0/js/M_public.js',
      'city' :'../../../version/M3.0/js/city.data-3.js',
    }
});

seajs.use(['hammer','iscroll','public','city'], function(myHam,myIsc,myPub,myCity) {
    $(function() {

        var oSetBtn = $('.js_setMoren');        // 默认按钮区域
        var oAddr_mrBtn = $('.js_mrBtn');       // 默认按钮
        var oSearchCity = $('.js_searchCity');  //下拉 城市选择部分
        var oShadow = $('.js_shadow');          // 阴影

        var oSearchText = $('.js_searchText');  //搜索框
        var oSeaClearBtn = $('.js_seaClearBtn');//清除按钮

        // 清除搜索内容
        oSeaClearBtn.hammer().on('tap',function() {
            $(this).hide().siblings('.js_searchText').val('');
        });

        // 搜索框
        oSearchText.on('input propertychange',function() {
            $(this).val() == '' ? oSeaClearBtn.hide() : oSeaClearBtn.show();
        });

        // 默认按钮选择
        oSetBtn.on('click',function() {
            if( oAddr_mrBtn.hasClass('active') ) {
                oAddr_mrBtn.removeClass('active');
            }
            else {
                oAddr_mrBtn.addClass('active');
            }
        });


        /****************  城市列表s  ******************/
        var oSeletCity = $('.js_seletCity');    //开启下拉城市列表
        var oCloseBtn = $('.js_closeBtn');      //下拉框关闭按钮
        var oSwiperList = $('.js_swiperList');  // 城市列表区域
        var aLlist = $('.js_Llist');            // 左边区域
        var aRlist = $('.js_Rlist');            // 右边区域
        var HotCity = $('.js_hotCity');         // 热门城市按钮
        var oProvTxt = $('.js_provTxt');        // 省份记录
        var oCityTxt = $('.js_cityTxt');        // 城市记录
        var oAreaTxt = $('.js_areaTxt');        // 地区记录
        var LeftScroll = [];                    // 左边滚动集合
        var RightScroll = [];                   // 右边滚动集合
        var aCityData = cityData3;              // city.data-3.js 模拟的城市数据
        var _FIndex;                            // 省份的索引值



        // 初始化城市列表
        upDateProv(function() {
            // 左边2个添加滚动
            aLlist.each(function(i) {
                LeftScroll[i] = new myPub.ScrollBar();
                LeftScroll[i].AddScroll(aLlist[i],{
                    'useTransition':false,
                    'mouseWheel':true,
                });
            });
            // 右边2个添加滚动
            aRlist.each(function(i) {
                RightScroll[i] = new myPub.ScrollBar();
                RightScroll[i].AddScroll(aRlist[i],{
                    'useTransition':false,
                    'mouseWheel':true,
                });
            });
        });

        // 热门城市点击
        HotCity.hammer().on('tap',function() {
            oSwiperList.hide().eq(0).show().find('.js_Llist li').removeClass('active').eq(_FIndex).addClass('active');
            LeftScroll[0].ReScroll();
            LeftScroll[0].GotoScroll('active');
            RightScroll[0].ReScroll();
        });

        // 省份记录点击
        oProvTxt.hammer().on('tap',function() {
            oSwiperList.hide().eq(0).show().find('.js_Llist li').removeClass('active').eq(_FIndex).addClass('active');
            LeftScroll[0].ReScroll();
            LeftScroll[0].GotoScroll('active');
            RightScroll[0].ReScroll();
        });

        // 城市记录点击
        oCityTxt.hammer().on('tap',function() {
            oSwiperList.hide().eq(1).show();
            LeftScroll[1].ReScroll();
            LeftScroll[1].GotoScroll('active');
            RightScroll[1].ReScroll();
        });


        // 左边城市选择
        aLlist.hammer().on('tap',function(e) {
            var index = aLlist.index($(this));
            var _tar = e.gesture.target;
            var _tarLi = $(_tar);
            var _tarNode = _tar.nodeName.toLowerCase();
            var _tarTxt = _tar.innerText;
            var _indexLi = _tarLi.index();
            if(_tarNode == 'li') {
                switch(index) {
                    case 0 :
                        _FIndex = _indexLi;
                        upDateCity(_indexLi,function() {
                            RightScroll[0].ReScroll();
                        });
                        oProvTxt.show().find('i').text(_tarTxt);
                        oCityTxt.hide();
                        oAreaTxt.hide();
                        break;
                    case 1 :
                        upDateArea (_FIndex,_indexLi,function() {
                            RightScroll[1].ReScroll();
                        });
                        oCityTxt.show().find('i').text(_tarTxt);
                        oAreaTxt.hide();
                        break;
                }

                aLlist.find('li').removeClass('active');
                _tarLi.addClass('active');
            }
        });

        // 右边城市选择
        aRlist.hammer().on('tap',function(e) {
            var index = aRlist.index($(this));
            var _tar = e.gesture.target;
            var _tarLi = $(_tar);
            var _tarNode = _tar.nodeName.toLowerCase();
            var _tarTxt = _tar.innerText;
            if(_tarNode == 'li') {
                switch(index) {
                    case 0:
                        var _indexLi = _tarLi.index();
                        oSwiperList.hide().eq(1).show();
                        aLlist.eq(1).find('li').removeClass('active').eq(_indexLi).addClass('active');
                        upDateArea (_FIndex,_indexLi,function() {
                            LeftScroll[1].ReScroll();
                            LeftScroll[1].GotoScroll('active');
                            RightScroll[1].ReScroll();
                        });
                        oCityTxt.show().find('i').text(_tarTxt);
                        oAreaTxt.hide();
                        break;
                    case 1:
                        oAreaTxt.show().find('i').text(_tarTxt);
                        // 将选择的城市写入搜索框
                        oSearchText.val( oProvTxt.find('i').text() +' '+ oCityTxt.find('i').text() +' '+ oAreaTxt.find('i').text() );
                        oSeaClearBtn.show();
                        break;
                }
            }
        });



        // 开启城市列表 必须置后 用于刷新滚动条操作
        oSeletCity.hammer().on('tap',function() {
            oSearchText.blur();
            oShadow.show();
            oSearchCity.show().stop().animate({'height':90+'%'},500,function() {
                LeftScroll[0].ReScroll();
                LeftScroll[0].GotoScroll('active');
                RightScroll[0].ReScroll();
            });
        });

        // 关闭城市列表
        oCloseBtn.hammer().on('tap',function() {
            oSearchText.blur();
            oSearchCity.stop().animate({'height':0+'%'},500,function() {
                oShadow.hide();
                oSearchCity.hide();
            });
        });


        // 省份列表数据  此处可用ajax替换城市数据
        function upDateProv(callBack) {
            aLlist.find('ul').empty();
            aRlist.find('ul').empty();
            for(var i=0; i< aCityData.length; i++) {
                aLlist.eq(0).find('ul').append('<li>'+ aCityData[i].text +'</li>');
            }
            aLlist.find('ul').eq(0).find('li').eq(0).addClass('active');
            aRlist.find('ul').eq(0).append('<li>'+ aCityData[0].children[0].text +'</li>');
            if(callBack)callBack();
        }

        // 市列表数据   此处可用ajax替换城市数据
        function upDateCity(index,callBack) {
            aRlist.eq(0).find('ul').empty();
            aLlist.eq(1).find('ul').empty();
            for(var i=0; i< aCityData[index].children.length; i++) {
                aRlist.eq(0).find('ul').append('<li>'+ aCityData[index].children[i].text +'</li>');
                aLlist.eq(1).find('ul').append('<li>'+ aCityData[index].children[i].text +'</li>');
            }
            if(callBack)callBack();
        }

        // 区列表数据   此处可用ajax替换城市数据
        function upDateArea (FIndex,index,callBack) {
            aRlist.eq(1).find('ul').empty();
            var _Tchildren = aCityData[FIndex].children[index].children || 0;
            if(_Tchildren == 0) {
                aRlist.eq(1).find('ul').append('<li>无</li>');
            }
            else {
                for(var i=0; i< _Tchildren.length; i++) {
                    aRlist.eq(1).find('ul').append('<li>'+ aCityData[FIndex].children[index].children[i].text +'</li>');
                }
            }
            if(callBack)callBack();
        }


    });

});


