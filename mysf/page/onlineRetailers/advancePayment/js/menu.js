/**
 * 
 */

Ext.onReady(function() {
	var menu = Ext.create('Ext.menu.Menu', {
	    width: 100,
	    margin: '0 0 10 0',
	    floating: false,  // 通常你想设置这个为真 (默认的)
	    renderTo: Ext.getBody(),  // 通常由它的包含容器呈现
	    items: [{
	        text: 'regular item 1'
	    },{
	        text: 'regular item 2'
	    },{
	        text: 'regular item 3'
	    }]
	});
	
	new Ext.Viewport({
		enableTabScroll : true,
		layout : "border",
		items : [ {
			title : "面板",
			region : "center", // 设置位置
			height : 100,
			html : "<h1>测试</h1>",
			tbar : []
//		}, {
//			title : "菜单",
//			region : "west",
//			width : 200,
//			collapsible : true
//		// 是不是可以折叠
//		}, {
//			xtype : "tabpanel",
//			region : "center", // 设置位置
//			items : [ {
//				title : "面板1"
//			}, {
//				title : "面板2"
//			} ]
//		}, {
//			region : "east", // 设置位置
//			width : 200,
//			title : "right",
//			collapsible : true
//		// 是不是可以折叠
//		}, {
//			region : "south", // 设置位置
//			height : 100,
//			title : "bottom",
//			collapsible : true
		// 是不是可以折叠
		} ]
	});
});