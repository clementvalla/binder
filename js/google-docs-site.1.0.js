var siteData;

$(function() {

	//load the json
	$.get( "info.json", function( data ) {

		//did it load json data as string or as an object?
		if (typeof data == "string")
			data = $.parseJSON(data);

		siteData = data;

		//create the title
		document.title = data.title; 
		
		//create the navigation
		var links = $('#navigation');
		for (var property in data.menu) {
    		if (data.menu.hasOwnProperty(property)) {
    			var urlsafe = property.replace(/ /gi, '-');
        		var item = $('<li class="menu-item">');
        		item.addClass(urlsafe);
        		item.html('<a href="#'+ property +'">'+property+'</a>');
        		item.appendTo(links);
        		//tmp
        		var bk = data.menu[property];
    		}
		}

		//create the about section
		var about = $('.about');
		about.html(data.about);

		//load the google doc
		locationHashChanged();

		$('#menu-open').click(function(){
			$("#navigation").toggle();
			$("#menu").toggleClass("border");
		});

		$( "#menu" ).draggable({ cancel: "li" });
    	// $( "div, p" ).disableSelection();
	});
	
	//little fix for the iframe size on mobile
	//mobile hack
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		mobile = true;

 		//setup the iframe width resize
		$("iframe").css( "width",$(window).width()-50+"px" );
		$("#menu").css( "width",$(window).width()-30+"px" );
		$( window ).resize(function() {
	  		$("iframe").css( "width",$(window).width()-50+"px" );
	  		$("#menu").css( "width",$(window).width()-30+"px" );
		});

	}

});

function locationHashChanged() {
	var item = window.location.hash;
	item = item.replace('#','');
	item = decodeURI(item);//thanks Eran! 
	$('li a').removeClass('active');

	if (siteData.menu.hasOwnProperty(item)){
		$('#backgrnd').attr('src', siteData.menu[item]);
		var urlsafe = item.replace(/ /gi, '-');
		$('.'+urlsafe+' a').addClass('active');
	} else {
		//load the first one
		$('#backgrnd').attr('src', siteData.menu[Object.keys(siteData.menu)[0]]);
		var urlsafe = item.replace(/ /gi, '-');
		$('li a').first().addClass('active');
	}
}

window.onhashchange = locationHashChanged;