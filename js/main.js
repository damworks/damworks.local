$(document).ready(function() {
	$(window).load(function(){
        $('.doc-loader').fadeOut('slow');
    });
	addEvents();
    initialize();
	
	var ResetInput = function(){
    	$('input, textarea').each(function() {
        	$(this).val('').text('');
    	});
	};
	
	$(function() {
		if (window.PIE) {
			$('.rounded').each(function() {
				PIE.attach(this);
			});
		}
	});
	
	var init = setInterval("scrollBg()", scrollSpeed);	
});


