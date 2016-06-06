//弹窗遮罩类
/*  
	使用方法：只需引入modal.js、style.css文件
	          使用时只需新建new Dialog对象，例如dialog = new Dialog（Config）
	
 */
!(function  (global) {
	function Dialog (opt) {
		var opts = $.extend({
            title: '尊敬的客户你好',
            content: '请详细填写你的需求，这有利于我们更加全面，准确的了解你的需求......',
            trigger: '#showDialog',
            effectShow: function ($element) {
                // 淡入效果
                $element.fadeIn(500);
            },
            onClose: function ($element) {
                // 淡出效果
                $element.fadeOut(500);   
            }
        }, opt || {})
		this.init(opts);
	}

	Dialog.prototype = {
		init: function (opts) {
			this._buildHtml(opts);
			this.bindEvent(opts);
		},
		_buildHtml: function (opts) {
		
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
		},
		bindEvent: function (opts) {
			// 获取元素
			var btn = $(opts.trigger);
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

	global.Dialog = Dialog;

})(window);
// 可以导出成jquery插件