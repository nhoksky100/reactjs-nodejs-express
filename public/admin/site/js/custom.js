/* WHAT CLIENT SAY’S
 ========================================================*/
jQuery(window).load(function() {
	var owl = jQuery('.testimorial');

	jQuery.each(jQuery(owl).find('.owl-item'), function (i) {
		var titleData = owl.find('.yt-content-slide img');
		var counthref = jQuery(titleData[i]).attr("src");
		 if(typeof titleData  !== 'undefined') {
			var paginationLinks = jQuery('.slider-shortcode .owl-controls span');
			jQuery(paginationLinks[i]).append('<img src='+counthref+'>');	
		}
	});
	
	var titleData2 = jQuery('.testimorial .owl-dot.active').find('span img');
	var counthref2 = titleData2.attr("src");	
	jQuery('.testimorial .sp-module-title').append('<span class="image"><img src='+counthref2+'><i class="fa fa-heart" aria-hidden="true"></i></span>');

	jQuery('.testimorial .owl-dot').click('on', function() {
		jQuery( ".testimorial .sp-module-title .image" ).remove();
		var titleData2 = jQuery(this).find('span img');
		var counthref2 = titleData2.attr("src");
		jQuery('.testimorial .sp-module-title').append('<span class="image"><img src='+counthref2+'><i class="fa fa-heart" aria-hidden="true"></i></span>');
		
	});
});

jQuery(document).ready(function($) {
	jQuery('.list-scoll a[href*=#]').on('click', function(e) {
		e.preventDefault();
		jQuery('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
	});
	
	         
	$(".list-scoll li").each(function(){
		$(this).click(function(){
			$('.list-scoll li').removeClass("active");
			$(this).addClass("active");
			//var neoindext=$(this).index()+1;
			//var neodiv = ("#scoll"+neoindext);
			//var x = $(neodiv).position();
			//$(".list-scoll").css("top",x.top);
			return true;
		});
	});
});



jQuery(document).ready(function($) {
	var ua = navigator.userAgent,
	_device = (ua.match(/iPad/i)||ua.match(/iPhone/i)||ua.match(/iPod/i)) ? "smartphone" : "desktop";
	
	if(_device == "desktop") {
		$("#my-account").bind('hover', function() {
			$(this).children(".dropdown-toggle").addClass(function(){
				if($(this).hasClass("open")){
					$(this).removeClass("open");
					return "";
				}
				return "open";
			});
			$(this).children(".dropdown-menu").stop().slideToggle(350);
			
		}, function(){
			$(this).children(".dropdown-menu").stop().slideToggle(350);
		});
	}else{
		$('#my-account .dropdown-toggle').bind('touchstart', function(){
			$('#my-account .dropdown-menu').stop().slideToggle(350);
		});
	}
});