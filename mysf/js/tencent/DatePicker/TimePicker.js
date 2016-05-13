+ function($) {
	///模拟数据start
	var raw = {//这个是传城市编码返回的数据格式
			"orderEndTime" : "22:59",
			"orderStartTime" : "10:00",
			"todayTimeList" : [ "12:00", "12:30", "13:00", "13:30", "14:00",
					"14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
					"18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
					"21:30", "22:00", "22:30", "23:00" ],
			"dateList" : [ "2016-04-19", "2016-04-20", "2016-04-21" ]
		}; 
	var raw2 = {//这个是传城市编码和日期的索引返回的数据格式
			"orderEndTime" : "22:59",
			"orderStartTime" : "10:00",
			"timeList" : ["11:30","12:00", "12:30", "13:00", "13:30", "14:00",
					"14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
					"18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
					"21:30", "22:00", "22:30", "23:00" ]
		};
	dateList=raw.dateList;
	
	function getTimeList(value){
		var timeList=[];
		var temp=0;
		for(var i=0;i<3;i++){//返回所选日期数组的下标
			if(raw.dateList[i]===value){
				temp=i;
				break;
			}
		}
		if(temp===0){///根据下标选择TimeList
			timeList=raw.todayTimeList;
		}else{
			timeList=raw2.timeList;
		}
		return timeList;
	}
	///模拟数据end
	var t;
	    var defaults = {     //主要是为了添加onChange时间，当当前日期与控件日期不同时，刷新TimeList
	        rotateEffect: false,  //为了性能,不启动3D显示
	        onChange: function (picker, values, displayValues) {
	        	clearTimeout(t);
	        	 t = setTimeout(function(){
	            	if(currentDate !== picker.cols[0].value){
	            	console.log("newDate:"+picker.cols[0].value+" currentDate:"+currentDate);
	            	timeList=getTimeList(picker.cols[0].value);
                    picker.cols[1].replaceValues(timeList);
                    currentDate = picker.cols[0].value;
                    currentTime = picker.cols[1].value;
                    picker.updateValue();  
                   
	            }
	            	
	        	 },200);
	        	 $('#picker-name').html(picker.cols[0].value+" "+picker.cols[1].value);
	        },
	        cols: [
	        {
	            textAlign: 'center',
	            values: [],   
	        },
	        {
	            textAlign: 'center',
	            values: [],
	        }
	        ]
	    };

	    $.fn.ccwpTimePicker = function(params) {
	        return this.each(function() {
	            if(!this) {
	            	return;
	            } 	
	            var p = $.extend(defaults, params);
	            debugger;
	          //计算value
	            if (p.value) {
	                $(this).val(p.value.join(' '));
	            } else {
	                var val = $(this).val();
	                val && (p.value = val.split(' '));
	            }
	            if (p.value) {
	                if(p.value[0]) {
	                    currentDate = p.value[0];
	                    p.cols[1].values = getTimeList(p.value[0]);
	                }
	                if(p.value[1]) {
	                    currentTime = p.value[1];
	                } 
	            }	            
	            console.log(p);   
	            $('#picker-name').html(currentDate+" "+currentTime);
	            $(this).picker(p);
	        });
	    };

	    $("#picker-name").ccwpTimePicker({
			  toolbarTemplate: '<header class="bar bar-nav">\
			  <button class="button button-link pull-right close-picker">确定</button>\
			  <h1 class="title">请选择时间</h1>\
			  </header>',
			  cols: [
				        {
				            textAlign: 'center',
				            values: dateList,  //初始化日期的值，此处应传入一个数组
				          //如果希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
				        },
				        {
				            textAlign: 'center',
				            values: getTimeList(dateList[1]),//初始化时间的值，此处应传入一个数组
				        }
				        ],
			  value:[dateList[1],"23:00"],    ///这个属性很重要，设置初始选中值，此处应传入一个数组
			  inputReadOnly:true
			});
	}(Zepto);

	$('#btn').click(function(){
		alert($('#picker-name').html());
	});
	  
	function noPermitInput(e){       
	       var evt = window.event || e ;     
	        if(isIE()){     
	            evt.returnValue=false; //ie 禁止键盘输入     
	        }else{     
	            evt.preventDefault(); //fire fox 禁止键盘输入     
	        }        
	}     
	function isIE() {     
	    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1)     
	        return true;     
	    else     
	        return false;     
	}   
	
//	$("#city-picker").cityPicker({
//	    toolbarTemplate: '<header class="bar bar-nav">\
//	    <button class="button button-link pull-right close-picker">确定</button>\
//	    <h1 class="title">选择收货地址</h1>\
//	    </header>'
//	  });