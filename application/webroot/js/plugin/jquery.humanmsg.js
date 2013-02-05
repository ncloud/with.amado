/*
	HUMANIZED MESSAGES 1.0
	idea - http://www.humanized.com/weblog/2006/09/11/monolog_boxes_and_transparent_messages
	home - http://humanmsg.googlecode.com
*/

var humanMsg = {
	setup: function(appendTo, msgOpacity) {
		humanMsg.msgID = 'humanMsg';

		// appendTo is the element the msg is appended to
		if (appendTo == undefined)
			appendTo = 'body';


		// Opacity of the message
		humanMsg.msgOpacity = .8;

		if (msgOpacity != undefined) 
			humanMsg.msgOpacity = parseFloat(msgOpacity);

		// Inject the message structure
		jQuery(appendTo).append('<div id="'+humanMsg.msgID+'" class="humanMsg"><p></p></div>');
	},

	displayMsg: function(msg, className, pos) {
		if (msg == '')
			return;
			
		if(typeof(className) == 'undefined') className = '';
		if(typeof(pos) == 'undefined') pos = 'top';

		clearTimeout(humanMsg.t2);

		// Inject message
		var $obj = jQuery('#'+humanMsg.msgID);
		$obj.find('p').html(msg).removeClass().addClass(className);
		$obj.css('top', (0-$obj.height())+'px');
		
		var opts = {top:'0px'};//{opacity: humanMsg.msgOpacity};
		
		if(pos == 'center') {
			$obj.removeClass('top').addClass('center');
			var top = Math.round(($(window).height() - $obj.height()) / 2);
			opts.top = top + 'px';
		} else {
			$obj.removeClass('center').addClass('top');
		}
	
		// Show message
		$obj.show().stop().animate(opts , 400, function() {
		
		})

		// Watch for mouse & keyboard in .5s
	//	humanMsg.t1 = setTimeout("humanMsg.bindEvents()", 700)
		// Remove message after 5s
		humanMsg.t2 = setTimeout("humanMsg.removeMsg()", 5000)
	},

	bindEvents: function() {
	// Remove message if mouse is moved or key is pressed
		jQuery(window)
			.mousemove(humanMsg.removeMsg)
			.click(humanMsg.removeMsg)
			.keypress(humanMsg.removeMsg)
	},

	removeMsg: function() {
		// Unbind mouse & keyboard
		jQuery(window)
			.unbind('mousemove', humanMsg.removeMsg)
			.unbind('click', humanMsg.removeMsg)
			.unbind('keypress', humanMsg.removeMsg)
		
		var $obj = jQuery('#'+humanMsg.msgID);
		$obj.stop().delay(400).animate({ top: (0-$obj.height()) + 'px' }, 800, function() { jQuery(this).hide() })
	}
};

jQuery(document).ready(function(){
	humanMsg.setup();
});