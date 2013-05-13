$(document).ready(function() {
	var newImg = '<img src="images/slider.png" alt="fly_01" />';
    for (i= 0; i < 4; i++) {
        $('.sprite').append($(newImg));
    };
});

var scrollSpeed = 60; 		// Speed in milliseconds
step = 1; 				// How many pixels to move per step
current = -1960;								
restartPosition = 0;		

function scrollBg(){
	current += step;
	if (current == restartPosition){
		current = -1960;
	}
	$('.sprite').css("left", current+"px");	
}

var addEvents = function()
{
	 $(document).bind('reveal.facebox', function() {
        $('div.popup input#subscriberEmail').attachHint('Enter your email address here');
        $('div.popup #name').attachHint('Your name:');
        $('div.popup #email').attachHint('E-mail address:');
        $('div.popup #subject').attachHint('Subject:');
        $('div.popup #message').attachHint('Message:');
    });
	
	jQuery('a[rel*=facebox]').facebox({
		opacity : 0.9
	});
}

var ClosePopupWindow = function()
{
	jQuery(document).trigger('close.facebox');
}

var initialize = function()
{
    var params = {
        'action'    : 'Initialize'
    };
    $.ajax({
        type: "POST",
        url: "php/mainHandler.php",
        data: params,
        success: function(response){
            if(response){
                var responseObj = jQuery.parseJSON(response);
                if(responseObj.ResponseData)
                {
                    if(responseObj.ResponseData.Start_Date)
                    {
                        setInterval(function(){
                            var countDownObj = calculateTimeDifference(responseObj.ResponseData.Start_Date);
                            if(countDownObj){
                                $('#days').text(countDownObj.Days);
                                $('#hours').text(countDownObj.Hours);
                                $('#minutes').text(countDownObj.Minutes);
                                $('#seconds').text(countDownObj.Seconds);
                            }
                        }, 1000);
                    }
                }
            }
        }
    });
};

var calculateTimeDifference = function(startDate) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var days = 0;

    var currentDate = new Date();
    startDate = new Date(startDate);
    
    var timeCounter = startDate - currentDate;
    if (isNaN(timeCounter))
    {
        return NaN;
    }
    else
    {
        days = Math.floor(timeCounter / day);
        timeCounter = timeCounter % day;

        hours = Math.floor(timeCounter / hour);
        timeCounter = timeCounter % hour;

        minutes = Math.floor(timeCounter / minute);
        timeCounter = timeCounter % minute;
        
        seconds = Math.floor(timeCounter / second);
    }

    var tDiffObj = {
        "Days" : days,
        "Hours" : hours,
        "Minutes" : minutes,
        "Seconds" : seconds
    };

    return tDiffObj;
};

	

	
