seajs.config({
    alias: {
      // 'hammer' : './static/v1/js/plug/hammer.min.js',
      // 'iscroll': './js/plug/iscroll.min.js',
      // 'layer'  :'./static/v1/js/plug/layer/layer.js',
      // 'public' :'./static/v1/js/public.js',
      'mui'  :'./static/v1/js/plug/mui/mui.min.js',
      'muiPic'  :'./static/v1/js/plug/mui/mui.picker.min.js',
      'cityData'  :'./static/v1/js/city.data-3.js',
    }
});




seajs.use(['mui'], function(myMui) {
    $(function() {
        // 默认地址选择
        var oDefault = $('.js_DefaultAddr');
        var oChecks =  oDefault.find('.js_checkBox');
        var showCityPickerButton = $('.js_showCityBtn')[0];
        var cityResult = $('.js_cityResult');
        oDefault.on('click',function() {
            oChecks.hasClass('active') ? oChecks.removeClass('active') : oChecks.addClass('active');
        });

        seajs.use(['muiPic','cityData'], function(muiPic,myCity) {
            (function($$) {
                $$.init();
                $$.ready(function() {
                    var cityPicker = new $$.PopPicker({  layer: 3  });
                    cityPicker.setData(cityData3);
                    // var showCityPickerButton = doc.getElementById('showCityPicker3');
                    showCityPickerButton.addEventListener('click', function(event) {
                        cityPicker.show(function(items) {
                            var _seletCity = ( items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {} ).text;
                            console.log(items[0])
                            //p.val(items[0])
                            //console.log(items)
                            cityResult[0].value = _seletCity;
                        });
                    }, false);
                });
            })(mui);
        })

    });




});