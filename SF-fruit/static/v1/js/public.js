define(function(require,exports,module) {
    //加入购物车的动画
    function AddCarAnimate(_X,_Y,target,sLeft,sTop, callBack) {
        // obj.hammer().on('tap',function(e) {
            //console.log(e);
            // var _X = e.gesture.center.x;
            // var _Y = e.gesture.center.y;
            var time = null;
            target.removeClass('myRotateFast');
            target.css({ 'left':_X,'top':_Y, 'opacity':1});
            clearTimeout(time);
            time = setTimeout(function() {
                target.addClass('myRotateFast').stop().animate({'left':_X,'top':_Y-50, 'opacity':1},300,function() {
                    target.stop().animate({'left':sLeft,'top':sTop, 'opacity':0},900,function() {
                        target.removeClass('myRotateFast');
                        if(callBack) callBack();
                    });
                });

            },30);
            // HamstopPropaga();
            // e.stopPropagation();
            // e.preventDefault()
        // });
    }
    exports.AddCarAnimate = AddCarAnimate;

    // hammer 冒泡
    function HamstopPropaga() {
        window.event.returnValue = false;
        return false;
    }
    exports.HamstopPropaga = HamstopPropaga;

    //平滑事件
    function onHammerSwiper(obj) {
        this.obj = obj;
    }

    onHammerSwiper.prototype.addHamSwipe = function(obj,type,fn) {
        this.obj = new Hammer.Manager(obj);
        this.obj.add(new Hammer.Swipe({threshold:8,direction:Hammer.DIRECTION_ALL}));
        this.obj.on(type,function(e) {
            if(fn) fn(e);
            //e.preventDefault();
            //e.stopPropagation();
        });
    };

    exports.onHammerSwiper = onHammerSwiper;


     /* 数字验证 */
    function ValiNum(obj,fn1,fn2) {
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(obj.val())){
            if(fn1) fn1();
        }
        else if( obj.val() < 0) {
            TipLayer("数量不能小余1");
            obj.val(1);
        }
        else{if(fn2) fn2();}
    }
    exports.ValiNum = ValiNum;

    /* 字数统计 */
    function statInputNum(textArea,numItem) {
        var max =  numItem.eq(0).text();
        var curLength = 0;
            textArea.each(function(i) {
                textArea.eq(i).attr("maxlength", max).on('input propertychange', function () {

                    curLength = $(this).val().length;
                    numItem.eq(i).empty().text(max - curLength);
                 });
            });

    }
    exports.statInputNum = statInputNum;


    /* 购物车价格统计 */
    function ShopSumPrice(obj,tarFather,target,sumPrice) {
        var _price = 0;
        obj.each(function(i) {
            if(obj.eq(i).hasClass('active')) {
                var _oGoodsPrice = obj.eq(i).siblings(tarFather).find(target);
                _oGoodsPrice.each(function(i) {
                    _price += (_oGoodsPrice.eq(i).text())*1;
                     return  _price;
                });
            }

        });
        sumPrice.text(_price.toFixed(2));
    }
    exports.ShopSumPrice = ShopSumPrice;


    /*************** 弹框效果 s***************/

    //提示框
    function TipLayer (sCont,sStyle,fn) {
        layer.open({
            content: sCont,
            style:sStyle || 'background-color:rgba(0,0,0,0.5); color:#fff; border:none; border-radius: 5px;',
            scrollbar: false,
            time: 2,
            success:function() {if(fn)fn();}
        });
    }
    exports.TipLayer = TipLayer;

    //带按钮提示框
    function TipBtnLayer (sCont,sTit) {
        layer.open({
            title: sTit != 'no' ? sTit : '',
            content: sCont,
            btn:['确定'],
            shadeClose: false,
            scrollbar: false,
        });
    }
    exports.TipBtnLayer = TipBtnLayer;

    // 标题提示框
    function TipTitleLayer (sTitle,styleTit,sCont,fn) {
        layer.open({
            title: [ sTitle,'background-color:#f8f8f8; color:#252525; font-weight:bold' ],
            content: sCont,
            shadeClose:false,
            scrollbar: false,
            style: styleTit,
            cancel:function() {if(fn) fn();}

        });
    }
    exports.TipTitleLayer = TipTitleLayer;

    //询问层
    function askLayer(sCont,yesFn, noFn,sTit,callBack) {
        layer.open({
            //no 为没有标题 sTit为设置标题
            title:sTit != 'no' ? sTit : '',
            content: sCont,
            btn: ['确认', '取消'],
            shadeClose: false,
            scrollbar: false,
            yes: yesFn,
            no: noFn,
            cancel:noFn,
            success:function() {
                if(callBack) callBack();
            }

        });
    }
    exports.askLayer = askLayer;

    // 关闭所有弹框
    function LayerCloseAll() {
        layer.closeAll();
    }
    exports.LayerCloseAll = LayerCloseAll;

    //加载层
    function loadLayer(cont) {
        layer.open({type: 2,content:cont,shadeClose: false,});
    }
    exports.loadLayer = loadLayer;


    /*************** 弹框效果 e***************/

    //节流控制
    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
            //console.log(111)
        }, 20);
    }
    exports.throttle = throttle;



    //s20是代表20秒 h是指小时，如12小时则是：h12 d是天数，30天则：d30
    //写cookies setCookie("name","hayden",'s20');
    function setCookie(name,value,time) {
        var strsec;
        if (time == undefined) {
            var Days = 30; //默认30天有效期
            strsec = Days*24*60*60*1000;
        }
        else {
            strsec = getsec(time)*1;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    exports.setCookie = setCookie;

    //读取cookies getCookie("name")
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        else{
            return null;
        }

    }
    exports.getCookie = getCookie;

    //删除cookies delCookie('name')
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
    exports.delCookie = delCookie;

    //设置cookie时间
    function getsec(str) {
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s") {
            return str1*1000;
        }
        else if (str2=="h") {
            return str1*60*60*1000;
        }
        else if (str2=="d") {
            return str1*24*60*60*1000;
        }
    }

    /* 验证码倒计时 */
    function CutTime(time,fn1,fn2) {
        var _AllTime = time;
        var _T = null;
        clearInterval(_T);
        _T = setInterval(function() {
            if(time<=0) {
                clearInterval(_T);
                if(fn1)fn1(_AllTime);
            }
            else {
                time--;
                if(fn2)fn2(time);
            }
        },1000)
    }
    exports.CutTime = CutTime;

    /*手机号码验证*/
    function checkMobile(obj,fn1,fn2,fn3){
        var oIphone = obj.val();
        var reg = /^(1[3|5|7|8])[\d]{9}$/;   //验证手机号码

        if(oIphone == '') {
            if(fn1)fn1()
        }
        else if (!reg.test(oIphone) ){

            if(fn2)fn2();
        }
        else {
            if(fn3)fn3();
        }
    }
    exports.checkMobile = checkMobile;




    /*************** 滚动条效果 s***************/
    // function ScrollBar(obj) {
    //     this.obj = obj;
    // }

    // //添加滚动条
    // ScrollBar.prototype.AddScroll = function (obj,sOptions) {
    //     this.obj = new IScroll(obj,sOptions);
    // };
    // //刷新滚动条
    // ScrollBar.prototype.ReScroll = function () {
    //     this.obj.refresh();
    // };

    // //删除滚动条
    // ScrollBar.prototype.DelScroll = function () {
    //     this.obj.destroy();
    // };
    // //跳转指定位置
    // ScrollBar.prototype.GotoScroll = function (clsName) {
    //     //需要给ul加class名称才能行
    //     var _clsName = this.obj.scroller.className.replace(' ', '.');
    //     //console.log(this.obj.scroller)
    //     //console.log(document.querySelector('.' + _clsName + ' li' + clsName))
    //     this.obj.scrollToElement(document.querySelector('.' + _clsName), '', 0, 0);
    // };

    // //滚动结束事件
    // ScrollBar.prototype.ScrollEnd = function (fn) {
    //     var _this = this.obj;
    //     _this.on('scrollEnd', fn);
    // };

    //  //滚动监听
    // ScrollBar.prototype.ScrollIng = function (fn) {
    //     var _this = this.obj;
    //     this.obj.on('scroll', fn);
    // };
    //滚动下拉slideDown
    // ScrollBar.prototype.SlideDown = function (fn) {
    //     var _this = this.obj;
    //     this.obj.on('slideDown', fn);
    // };
    // //滚动上拉slideUp
    // ScrollBar.prototype.SlideUp = function (fn) {
    //     var _this = this.obj;
    //     this.obj.on('slideUp', fn);
    // };

    //exports.ScrollBar = ScrollBar;
    /*************** 滚动条效果 e***************/


});


