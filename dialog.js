//基于jquery对话框插件
/*  
	使用方法：只需引入dialog.js、style.css文件，在html页面通过调用$('').dialog()新建对话框弹窗
	          dialog可以传入参数
				title : string
				content: string
				trigger: string
				effectShow : function
				onClose : function
 */

(function ($) {
	$.fn.dialog = function (opt) {
		var opts = $.extend({
            title: '尊敬的客户你好',
            content: '请详细填写你的需求，这有利于我们更加全面，准确的了解你的需求......',
            effectShow: function ($element) {
                // 淡入效果
                $element.fadeIn(500);
            },
            onClose: function ($element) {
                // 淡出效果
                $element.fadeOut(500);   
            }
        }, opt || {});
        return this.each(function () {
        	_buildHtml(opts);
        	bindEvent(opts,$(this).attr('id'));
        });
	
	
	function _buildHtml (opts) {
	
		//  构造HTML结构
		var html = '<div class="dialog-container">'
					+ '<div class="mask">'
					+ '<div class="dialog">'
					+ '<div class="title">' 
					+ opts.title 
					+ '</div>'
					+ '<div class="content">'
					+ opts.content 
					+ '</div>'
					+ '<div class="close">'
					+ '&#215;'
					+ '</div>'
					+ '</div></div></div>';

		// 将Dialog插入DOM中
		$('body').append(html);

		// 初始化Dialog
		this.dialog_container = $('.dialog-container');
		this.dialog_container.hide();
	}
	function bindEvent (opts,id) {
		// 获取元素
		var nid ='#'+id;
		var btn = $(nid);
		var close = $('.close');
		var dialog_container = this.dialog_container;
		// 绑定事件
		btn.click(function () {
		 	opts.effectShow(dialog_container);
		 })
		close.click(function () {
			opts.onClose(dialog_container);
		});
		$(document).keydown(function(e){
			if(e.keyCode === 27) {
				opts.onClose(dialog_container);
			}
		})
	}
}
})(jQuery);