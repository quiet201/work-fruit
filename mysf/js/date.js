/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */
(function ($) {
    $.fn.date = function (options,Ycallback,Ncallback) {   
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');
        var datetime = false;
        var nowdate = new Date();
        var indexY=1,indexM=1,indexD=1;
        var indexH=1,indexI=1,indexS=0;
        var initY=parseInt((nowdate.getYear()+"").substr(1,2));
        var initM=parseInt(nowdate.getMonth()+"")+1;
        var initD=parseInt(nowdate.getDate()+"");
        var initH=parseInt(nowdate.getHours());
        var initI=parseInt(nowdate.getMinutes());
        var initS=parseInt(nowdate.getYear());
        var yearScroll=null,monthScroll=null,dayScroll=null;
        var HourScroll=null,MinuteScroll=null,SecondScroll=null;
        $.fn.date.defaultOptions = {
            beginyear:2001,                 //日期--年--份开始
            endyear:2003,                   //日期--年--份结束
            beginmonth:8,                   //日期--月--份结束
            endmonth:21,                    //日期--月--份结束
            beginday:1,                     //日期--日--份结束
            endday:1,                      //日期--日--份结束
            beginhour:1,
            endhour:12,
            beginminute:00,
            endminute:59,
            curdate:false,                   //打开日期是否定位到当前日期
            theme:"date",                    //控件样式（1：日期，2：日期+时间）
            mode:null,                       //操作模式（滑动模式）
            event:"click",                    //打开日期插件默认方式为点击后后弹出日期 
            show:true
        }
        //用户选项覆盖插件默认选项   
        var opts = $.extend( true, {}, $.fn.date.defaultOptions, options );
        if(opts.theme === "datetime"){datetime = true;}
        if(!opts.show){
            that.unbind('click');
        }
		/*www.sucaijiayuan.com*/
        else{
            //绑定事件（默认事件为获取焦点）
            that.bind(opts.event,function () {
            	if(opts.beforeShowFun){
            		var value = opts.beforeShowFun();
            		if(false==value){
            			return;
            		}
            	}
                createUL();      //动态生成控件显示的日期
                init_iScrll();   //初始化iscrll
                extendOptions(); //显示控件
                that.blur();
                if(datetime){
                    showdatetime();
                    refreshTime();
                }
                refreshDate();
                bindButton();
            })  
        };
        function refreshDate(){
            yearScroll.refresh();
            monthScroll.refresh();
            dayScroll.refresh();

            resetInitDete();
            yearScroll.scrollTo(0, initY*40, 100, true);
            monthScroll.scrollTo(0, initM*40-40, 100, true);
        }
        function refreshTime(){
            HourScroll.refresh();
            MinuteScroll.refresh();
            SecondScroll.refresh();
            if(initH>12){    //判断当前时间是上午还是下午
                 SecondScroll.scrollTo(0, initD*40-40, 100, true);   //显示“下午”
                 initH=initH-12-1;
            }
            HourScroll.scrollTo(0, initH*40, 100, true);
            MinuteScroll.scrollTo(0, initI*40, 100, true);   
            initH=parseInt(nowdate.getHours());
        }
        function resetIndex(){
            indexY=1;
            indexM=1;
            indexD=1;
        }
        function resetInitDete(){
        	//that.val("");
            if(opts.curdate){return false;}
            else if(that.val()===""){return false;}
            initY = 0;//parseInt(that.val().substr(2,2));
            initM = 1;//parseInt(that.val().substr(5,2));
            //initD = parseInt(that.val().substr(8,2));
        }
        function bindButton(){
            resetIndex();
            $("#dateconfirm").unbind('click').click(function () {
            	if(opts.monthstart<=0){
            		$("#datePage").hide(); 
                    $("#dateshadow").hide();
                    return;
            	}
            	var conIndexY = Math.min(Math.round(indexY),3);
                conIndexY = Math.max(conIndexY,1);
            	//var year =  $("#yearwrapper ul li:eq("+conIndexY+")").html();
            	var curDate = new Date();
            	var dateValue = curDate;
            	if(2==conIndexY){
            		dateValue = new Date(curDate.setDate(curDate.getDate()+1));
            	}else if(3==conIndexY){
            		dateValue = new Date(curDate.setDate(curDate.getDate()+2));
            	}
            	var month = dateValue.getMonth()+1;
            	if(month<10){
            		month="0"+month;
            	}
            	var yearMonthDateStr = dateValue.getFullYear()+"-"+month+"-"+dateValue.getDate();
            	var indexYMax = opts.endmonth-opts.beginmonth+1;
            	var conIndexMonth = Math.min(Math.round(indexM),indexYMax);
            	conIndexMonth = Math.max(conIndexMonth,1);
            	var monthText = $("#monthwrapper ul li:eq("+conIndexMonth+")").html();
            	var datestr = yearMonthDateStr + " " +monthText;
//                var datestr = $("#yearwrapper ul li:eq("+indexY+")").html()+"-"+
//                          $("#monthwrapper ul li:eq("+indexM+")").html();
               if(datetime){
                     if(Math.round(indexS)===1){//下午
                        $("#Hourwrapper ul li:eq("+indexH+")").html(parseInt($("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Hourwrapper ul li:eq("+indexH+")").html().length-1))+12)
                     }else{
                        $("#Hourwrapper ul li:eq("+indexH+")").html(parseInt($("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Hourwrapper ul li:eq("+indexH+")").html().length-1)))
                     }
                     datestr+=" "+$("#Hourwrapper ul li:eq("+indexH+")").html().substr(0,$("#Minutewrapper ul li:eq("+indexH+")").html().length-1)+":"+
                             $("#Minutewrapper ul li:eq("+indexI+")").html().substr(0,$("#Minutewrapper ul li:eq("+indexI+")").html().length-1);
                         indexS=0;
                }
               
                if(Ycallback===undefined){
                	if(that.attr("destId")){//是否有指定赋值的地方，如果没有就赋值于当前的组件
                		var destObj = $("#"+that.attr("destId"));
                		if(destObj.is("input")){
                			destObj.val(datestr);
                		} else{
                			destObj.html(datestr);
                		}
                	}else{
                        if(docType){
                        	that.val(datestr);
                        }else{
                        	that.html(datestr);
                        }
                	}
                }else{
                     Ycallback(datestr);
                }
                $("#datePage").hide(); 
                $("#dateshadow").hide();
            });
            $("#datecancle").click(function () {
                $("#datePage").hide(); 
                $("#dateshadow").hide();
                if(Ncallback){
                	Ncallback(false);
                }
            });
        }		
        function extendOptions(){
            $("#datePage").show(); 
            $("#dateshadow").show();
        }
        //日期滑动
        function init_iScrll() { 
//            var strY = $("#yearwrapper ul li:eq("+indexY+")").html().substr(0,$("#yearwrapper ul li:eq("+indexY+")").html().length);
//            var strM = $("#monthwrapper ul li:eq("+indexM+")").html().substr(0,$("#monthwrapper ul li:eq("+indexM+")").html().length)
              yearScroll = new iScroll("yearwrapper",{snap:"li",vScrollbar:false,
                  onScrollEnd:function () {
                	  
                       indexY = (this.y/40)*(-1)+1;
                       var conIndexY = Math.min(Math.round(indexY),3);
                       conIndexY = Math.max(conIndexY,1);
                       if(opts.yearScrollEndCallback){
//                    	   if(parseInt(indexY)==indexY){
                    		   opts.yearScrollEndCallback(conIndexY,function(beginmonth,endmonth){
                        		   opts.beginmonth = beginmonth;
                        		   opts.endmonth = endmonth;
                        		   $("#monthwrapper ul").html(createMONTH_UL());
                        		   monthScroll.refresh();
                        		   dayScroll.refresh();
                        		   initM = 1;
                        		   monthScroll.scrollTo(0, initM*40-40, 100, true);
                        		   monthScroll.refresh();
                        		   if(beginmonth==0&&endmonth==0){
                        			   $("#datecancle").triggerHandler("click");
                        		   }
                        	   });
//                    	   }
                    	   
                       }
                       
//                       opts.endday = checkdays(strY,strM);
//                          $("#daywrapper ul").html(createDAY_UL());
//                           dayScroll.refresh();
                           //alert($("#yearwrapper ul li:eq("+indexY+")").html());
                  }});
              monthScroll = new iScroll("monthwrapper",{snap:"li",vScrollbar:false,
                  onScrollEnd:function (){
                      indexM = (this.y/40)*(-1)+1;
//                      opts.endday = checkdays(strY,strM);
//                          $("#daywrapper ul").html(createDAY_UL());
//                           dayScroll.refresh();
                  }});
              dayScroll = new iScroll("daywrapper",{snap:"li",vScrollbar:false,
                  onScrollEnd:function () {
                      indexD = (this.y/40)*(-1)+1;
                  }});
        }
        function showdatetime(){
            init_iScroll_datetime();
            addTimeStyle();
            $("#datescroll_datetime").show(); 
            $("#Hourwrapper ul").html(createHOURS_UL());
            $("#Minutewrapper ul").html(createMINUTE_UL());
            $("#Secondwrapper ul").html(createSECOND_UL());
        }

        //日期+时间滑动
        function init_iScroll_datetime(){
            HourScroll = new iScroll("Hourwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexH = Math.round((this.y/40)*(-1))+1;
                    HourScroll.refresh();
            }})
            MinuteScroll = new iScroll("Minutewrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexI = Math.round((this.y/40)*(-1))+1;
                    HourScroll.refresh();
            }})
            SecondScroll = new iScroll("Secondwrapper",{snap:"li",vScrollbar:false,
                onScrollEnd:function () {
                    indexS = Math.round((this.y/40)*(-1));
                    HourScroll.refresh();
            }})
        } 
        function checkdays (year,month){
            var new_year = year;    //取当前的年份        
            var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）        
            if(month>12)            //如果当前大于12月，则年份转到下一年        
            {        
                new_month -=12;        //月份减        
                new_year++;            //年份增        
            }        
            var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天        
            return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期    
        }
        function  createUL(){
            CreateDateUI();
            $("#yearwrapper ul").html(createYEAR_UL());
            $("#monthwrapper ul").html(createMONTH_UL());
//            $("#daywrapper ul").html(createDAY_UL());
        }
        function CreateDateUI(){
            var str = ''+
                '<div id="dateshadow"></div>'+
                '<div id="datePage" class="page">'+
                    '<section>'+
                        '<footer id="dateFooter">'+
                        '<div id="setcancle">'+
                            '<ul>'+
                                
                                '<li id="datecancle">取消</li>'+
                                '<li id="dateconfirm">确定</li>'+
                            '</ul>'+
                        '</div>'+
                    '</footer>'+
                        '<div id="datemark"><a id="markyear"></a><a id="markmonth"></a><a id="markday"></a></div>'+
                        '<div id="timemark"><a id="markhour"></a><a id="markminut"></a><a id="marksecond"></a></div>'+
                        '<div id="datescroll">'+
                            '<div id="yearwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="monthwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="daywrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                        '</div>'+
                        '<div id="datescroll_datetime">'+
                            '<div id="Hourwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="Minutewrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                            '<div id="Secondwrapper">'+
                                '<ul></ul>'+
                            '</div>'+
                        '</div>'+
                    '</section>'+
                    
                '</div>'
            $("#datePlugin").html(str);
        }
        function addTimeStyle(){
            $("#datePage").css("height","380px");
            $("#datePage").css("bottom","60px");
            $("#yearwrapper").css("position","absolute");
            $("#yearwrapper").css("bottom","200px");
            $("#monthwrapper").css("position","absolute");
            $("#monthwrapper").css("bottom","200px");
            $("#daywrapper").css("position","absolute");
            $("#daywrapper").css("bottom","200px");
        }
        //创建 --年-- 列表
        function createYEAR_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginyear; i<=opts.endyear;i++){
				var text = "";
				if(i==2001){
					text = "今天";
				}else if(i==2002){
					text = "明天";	
				}else if(i==2003){
					text = "后天";	
				}else{
					continue;	
				}
                str+='<li>'+text+'</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --月-- 列表
        function createMONTH_UL(){
        	if(opts.beginmonth<=0){
        		return "";
        	}
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginmonth;i<=opts.endmonth;i++){
                //var text = "";
//				if(i==1){
//					text = "8:00";
//				}else if(i==2){
//					text = "9:00";	
//				}else if(i==3){
//					text = "10:00";
//				}else if(i==4){
//					text = "11:00";	
//				}else if(i==5){
//					text = "12:00";	
//				}else if(i==6){
//					text = "13:00";	
//				}else if(i==7){
//					text = "14:00";
//				}else if(i==8){
//					text = "15:00";	
//				}else if(i==9){
//					text = "16:00";
//				}else if(i==10){
//					text = "17:00";	
//				}else if(i==11){
//					text = "18:00";	
//				}else if(i==12){
//					text = "19:00";	
//				}else if(i==13){
//					text = "20:00";	
//				}else{
//					continue;	
//				}
                str+='<li>'+i+':00</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --日-- 列表
        function createDAY_UL(){
              $("#daywrapper ul").html("");
            var str="<li>&nbsp;</li>";
                for(var i=opts.beginday;i<=opts.endday;i++){
                str+='<li>'+i+'日</li>'
            }
            return str+"<li>&nbsp;</li>";;                     
        }
        //创建 --时-- 列表
        function createHOURS_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginhour;i<=opts.endhour;i++){
                str+='<li>'+i+'时</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --分-- 列表
        function createMINUTE_UL(){
            var str="<li>&nbsp;</li>";
            for(var i=opts.beginminute;i<=opts.endminute;i++){
                if(i<10){
                    i="0"+i
                }
                str+='<li>'+i+'分</li>'
            }
            return str+"<li>&nbsp;</li>";;
        }
        //创建 --分-- 列表
        function createSECOND_UL(){
            var str="<li>&nbsp;</li>";
            str+="<li>上午</li><li>下午</li>"
            return str+"<li>&nbsp;</li>";;
        }
    }
})(jQuery);  
