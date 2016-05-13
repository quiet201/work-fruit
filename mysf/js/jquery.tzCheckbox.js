(function($){
	$.fn.tzCheckbox = function(options){
		
		 
		//默认 开启/关闭 标签
		options = $.extend({
			labels : ['ON','OFF']
		},options);
		
		return this.each(function(){
			var originalCheckBox = $(this),
				labels = [];

	 
		    //检查HTML5的属性（ data-on / data-off）
			if(originalCheckBox.data('on')){
				labels[1] = originalCheckBox.data('off');
			}
			else labels = options.labels;

		  
            //创建新的checkbox标示
			var checkBox = $('<span>',{
				className	: 'tzCheckBox '+(this.checked?'checked':''),
				html:	'<span class="tzCBContent">'+labels[this.checked?0:1]+
						'</span><span class="tzCBPart"></span>'
			});

		   
            //插入新的checkbox，同事隐藏原来的checkbox
			checkBox.insertAfter(originalCheckBox.hide());

			checkBox.click(function(){
				checkBox.toggleClass('checked');
				
				var isChecked = checkBox.hasClass('checked');
				
				//同步原来的checkbox
				originalCheckBox.attr('checked',isChecked);
				checkBox.find('.tzCBContent').html(labels[isChecked?0:1]);
			});
			
		  
            //监听原来的checkbox的时间和修改新的checkbox的状态
			originalCheckBox.bind('change',function(){
				checkBox.click();
			});
		});
	};
})(jQuery);