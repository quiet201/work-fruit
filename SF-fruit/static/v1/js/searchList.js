seajs.config({
    alias: {
      'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      'layer'  :'./static/v1/js/plug/layer/layer.js',
      'public' :'./static/v1/js/public.js',
    }
});


seajs.use(['hammer','layer','public'], function(myHam,myLay,myPub) {
    $(function() {
        var oHeader = $('.js_header');              //头部
        var oContain = $('.js_contain');            //内容
        var oFooter = $('.js_footer');              //底部
        var oGoodsBox = $('.js_goodsBox');          //产品页面
        var oSearchBox = $('.js_searchBox');        //搜索框
        var oIndexSearch = $('.js_IndexSearch');    //搜索历史
        var oSearchArea = $('.js_searchArea');      //搜索框区域
        var oSStart = $('.js_sStart');              //开始搜索按钮
        var oSCancel = $('.js_sCancel');            //取消搜索按钮
        var oSearchTxt = $('.js_searchTxt');        //搜索框



        //显示搜索框
        oSStart.hammer().on('tap',function(e) {
            oSearchArea.show().eq(1).hide();
            oGoodsBox.hide();
            oFooter.hide();
            oIndexSearch.show();
            oHeader.hide();
            oContain.hide();
            oSearchTxt.focus();
        });

        //隐藏搜索框
        oSCancel.hammer().on('tap',function(e) {
            oSearchArea.show().eq(0).hide();
            oGoodsBox.show();
            oFooter.show();
            oIndexSearch.hide();
            oHeader.show();
            oContain.show();
            oSearchTxt.blur();
        });



        // 搜索设置cookie
        var cTime = 'h2';  //coookie 时间
        var _val = [];
        var oSearchBtn = $('.js_searchBtn');    //搜索按钮
        var oSearchTxt = $('.js_searchTxt');    //搜索框
        var oHClearBtn = $('.js_HClearBtn');  //清楚历史记录按钮
        var oHisListUl = $('.js_hisList').find('ul'); //历史记录UL
        var recomHTMl = $('.js_hisList').find('ul').html();  //系统推荐
        var cookArry = document.cookie.split('; ');   // 分离cookie成数组
        var cookIndex = parseInt(myPub.getCookie('cookIndex')); // 记录个数

        // 获取cookie并设置历史记录
        if(myPub.getCookie('cookIndex') == undefined) {
            myPub.setCookie('cookIndex','-1',cTime);
            cookIndex = parseInt(myPub.getCookie('cookIndex'));
        }
        else {
            oHisListUl.empty();
            for(var i=0; i<cookArry.length; i++) {
                if(cookArry[i].charAt(0) == 'r') {
                    _val[i] = cookArry[i].substring( cookArry[i].indexOf('=')+1 );
                    oHisListUl.prepend('<li>'+ unescape(_val[i]) +'</li>');
                }

            }

        }

        //搜索后添加cookie
        oSearchBtn.hammer().on('tap',function() {
            if(oSearchTxt.val() == '') {
                myPub.TipLayer('亲！搜索信息不能为空！');
            }
            else {
                cookIndex == null || cookIndex >= 4  ? cookIndex = 0 : cookIndex++;
                myPub.setCookie('records'+cookIndex,oSearchTxt.val(),cTime);
                myPub.setCookie('cookIndex',cookIndex,cTime);
            }
        });

        // 清楚cookie和历史记录
        oHClearBtn.hammer().on('tap',function() {
            myPub.askLayer('亲！您确定要清除历史记录？',function() {
                for(var i=0; i<cookArry.length; i++) {
                    myPub.delCookie('records'+i);
                }
                myPub.delCookie('cookIndex');
                // 清楚cookie的记录 添加系统推荐的
                oHisListUl.empty().html(recomHTMl);
                myPub.LayerCloseAll();
            },function() {
                alert('no')
            },'no');
        });

    });

});