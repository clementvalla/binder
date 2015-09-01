var siteData;

$(function() {

	//load the json
	$.get( "info.json", function( data ) {

		//this line of code broke the site in a host but not in dropbox
		//data = jQuery.parseJSON( data);

		siteData = data;

		console.log(data.menu);

		//create the title
		document.title = data.title; 
		
		//create the menu
		var menu = $('<div id="menu">');
		var menuopen = $('<div id="menu-open">');
		menuopen.html('<div></div><div></div><div></div>');
		menuopen.appendTo(menu);
		var links = $('<ul id="navigation">');
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
		links.appendTo(menu);

		//create the logo
		var img = $('<img id="logo">'); //Equivalent: $(document.createElement('img'))
		img.attr('src', data.logo);
		img.prependTo(menu);

		//create the about section
		var about = $('<div class="about">');
		about.html(data.about);
		about.appendTo(menu);

		menu.appendTo('body');

		

		//create the background
		var background = $('<div id="background-site">');
		var iframe = $('<iframe name="backgrnd" id="backgrnd" scrolling="yes">');
		iframe.appendTo(background);
		background.appendTo('body');

		//load the google doc
		locationHashChanged();

		$('#menu-open').click(function(){
			$("#navigation").toggle();
			$(".about").toggle();
			$("#menu").toggleClass("border");
		});

		$( "#menu" ).draggable({ cancel: "li" });
    	// $( "div, p" ).disableSelection();
	});
	


});

function locationHashChanged() {
	var item = window.location.hash;
	// if ( $.browser.webkit == true ) {
 //        item = window.location.href;
 //    }
	item = item.replace('#','');
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