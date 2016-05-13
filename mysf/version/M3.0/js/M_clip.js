seajs.config({
    alias: {
      'hammer' : '../../../../version/M3.0/js/plug/hammer.min.js',
      'iscroll': '../../../../version/M3.0/js/plug/clip/iscroll-zoom.js',
      'layer'  :'../../../../version/M3.0/js/plug/layer/layer.js',
      'lrz': '../../../../version/M3.0/js/plug/clip/lrz.all.bundle.js',
      'clip': '../../../../version/M3.0/js/plug/clip/photoClip.js',
      'public' :'../../../../version/M3.0/js/public.js',
    }
});

seajs.use(['hammer','iscroll','layer','lrz','public'], function(myHam,myIsc,myLay,myLrz,myPub) {
    $(function() {
        var oGoodsStats = $('.js_goodsStats');          //收货状态选择
        var oReasonList = $('.js_reasonList');          //售后原因选择
        var oUserMessage = $('.js_message').find('textarea');  //留言区域
        var maxLWord = $('.js_wordmax');                //最大字数
        var oUpLoadBtn = $('.js_upLoadBtn');             //上传按钮

        var oPhotoListLi = $('.js_photoList').find('li'); //上传图片数量
        var oClipBox = $('.js_ClipBox');                 //图片截取范围
        var oClipArea = $('.js_clipArea');               //图片区域
        var oClipBtn = $('.js_clipBtn');                 //截图按钮
        var oFileAddr = $('.js_file');                   //图片地址
        var oViewBox = $('.js_view');                    //成功后预览图
        var addPhotoBox = $('.js_addPhotoBox');          //+号图标
        var oCancelBtn = $('.js_cancelBtn');            //取消选中的图片
        var oDelBtn = $('.js_delBtn');                  //删除图片

        seajs.use(['clip'],function(myClip) {
            oPhotoListLi.each(function(i) {
                ClipPhoto(oClipArea.eq(i),oFileAddr.eq(i),oClipBtn.eq(i),function(file) {
                    myPub.loadLayer();
                    $('.layermcont').append('<p style="padding-top:15px;">图片载入中……</P>');
                },function(src) {
                    var beforImg = $('.photo-clip-view').find('img');
                    $('.layermcont').find('p').remove();
                    myPub.LayerCloseAll();
                    oClipBox.show();
                    oClipArea.hide().eq(i).show();
                    //取消载入的图片
                    oCancelBtn.eq(i).hammer().on('tap',function() {
                        var _cont = "亲！您确定要退出截图吗？";
                        myPub.askLayer(_cont,function() {
                            beforImg.eq(i).attr('src','');
                            oClipBox.hide();
                            oClipArea.eq(i).hide();
                            myPub.LayerCloseAll();
                        },function() { });
                    });

                },function(event) {

                },function(dataURL) {
                    var beforImg = $('.photo-clip-view').find('img');
                    beforImg.attr('src','');
                    oViewBox.eq(i).show().find('img').attr('src',dataURL);
                    addPhotoBox.eq(i).hide();
                    oClipBox.hide();
                });
                // 删除准备上传的照片
                oDelBtn.eq(i).hammer().on('tap',function() {
                    var _cont = "亲！您确定要删除此照片吗？";
                    myPub.askLayer(_cont,function() {
                        oViewBox.eq(i).hide().find('img').attr('src','');
                        addPhotoBox.eq(i).show();
                        myPub.LayerCloseAll();
                    },function() { });
                });
            });
        });



        function ClipPhoto (obj,file,ok,start,complet,erro,finish) {
            obj.photoClip({
                size: [300, 300],       // 截取框的宽和高 默认值为[260,260]
                outputSize: [500, 500], // 输出图像的宽和高 默认值为[0,0]，表示输出图像原始大小
                //outputType: "jpg",    // 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
                file: file,             // 上传图片的<input type="file">控件的选择器
                //view: view,           // 显示截取后图像的容器的选择器
                ok: ok,                 // 确认截图按钮的选择器
                loadStart: function(file) {start(file);}, // 开始加载的回调函数
                loadComplete: function(src) {complet(src);}, // 加载完成的回调函数。
                loadError: function(event) {erro(event);}, // 加载失败的回调函数。
                clipFinish: function(dataURL) {finish(dataURL);}, // 裁剪完成的回调函数。

            });
        }







        //收货状态选择
        oGoodsStats.hammer().on('tap',function() {
            oGoodsStats.find('.js_checkBox').removeClass('active');
            $(this).find('.js_checkBox').addClass('active');
        });
        // 售后原因选择
        oReasonList.find('li').hammer().on('tap',function() {
            oReasonList.find('li').removeClass('active');
            $(this).addClass('active');
        });

        // 限制字数
        if(oUserMessage.length>0) {
            myPub.statInputNum(oUserMessage,maxLWord);
        }
    });

});



