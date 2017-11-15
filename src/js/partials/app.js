(function ($) {

$.fn.menu = function () {
	var obj = $(this);
	var ww = $(window).width();
if (ww >= 981&& obj.find('li').hasClass("active")) {



	$(window).load(function() {
var posact = $('.active').position().left;
	var wact = $('.active').width();
$('#line').css({'left': posact, 'width': wact});
	
	$('#menu ul li').mouseenter(function(){
		var pos = $(this).position().left;
		var w = $(this).width();
		$('#line').stop().animate({'left': pos, 'width': w},400);
	});
	$('#menu ul li').mouseleave(function(){
		var pos = $('.active').position().left;
		var w = $('.active').width();
		$('#line').stop().animate({'left': pos, 'width': w + 'px'},400);
	});

	});
		}
}

$.fn.mMenu = function(speed) {
		var obj = $(this);
			obj.children('ul').children('li').mouseenter(function() {
				if ($(this).children('ul').length)
				{
					$(this).children('ul').stop().slideDown(speed);
				}
			}).mouseleave(function() {
				if ($(this).children('ul').length)
				{
					$(this).children('ul').stop().slideUp(speed);
				}
			});
		}

//раскрытие списка в мобилке
$.fn.m2Menu = function() {
		var obj = $(this);
			obj.children('ul').children('li').click(function() {
				$(this).children('ul').slideToggle(400);
				$(this).children('ul>li>span').toggleClass('item_oppened');
			});
		}
//end раскрытие списка в мобилке		

$.fn.scrollmenu = function() {
		
var ww = $(window).width();
if (ww >= 981) {
$(window).on("scroll", function () {
    var scrolled = $(this).scrollTop();
    if( scrolled > 530 ) {
        $('#sc-menu-home').fadeIn(300);
    }   
    if( scrolled <= 530 ) {     
        $('#sc-menu-home').fadeOut(300);
    }
});
}
else{
	$('#sc-menu-home').css({'display': 'none'});
}
		}








$.fn.wrapTable = function () {
	var ww = $(window).width();
if (ww <= 981) {
	$('table').wrap( "<div class='wrap_table'></div>" );
		}
}

$.fn.carusel = function() {
var obj = $(this);
var w_img = obj.find('li').width();
var c_left = Number(obj.children('ul').css('left').replace('px',''));
var w_button = obj.find('.next').width();

	$(window).resize(function() {
			
			itm = Math.floor((Number($('#carusel').parent().width()) - w_button * 2) / w_img);
			$('#carusel').css({'width':(itm*w_img + 2*w_button)+'px'});

		});

obj.children('ul').width(w_img * obj.find('li').length);

obj.find('.next').click(function(){
	obj.children('ul').prepend(obj.find('li:last').clone());
	obj.find('li:last').remove();
	obj.children('ul').css({'left':(c_left - w_img) + 'px'});
	obj.children('ul').animate({'left':c_left}, 500);
});

obj.find('.prev').click(function(){
	obj.children('ul').animate({'left':c_left - w_img}, 500, function () {
	obj.children('ul').append(obj.find('li:first').clone());
	obj.find('li:first').remove();
	obj.children('ul').css({'left':(c_left) + 'px'});
	});
});
}

}) (jQuery)

$(document).ready(function(e){
	$('#menu').menu();
	$('#sc-menu-home').scrollmenu();
	$('table').wrapTable(400);
	$('.m_menu').mMenu(400);
	$('#mob_menu').m2Menu();
	$('#carusel').carusel();

	$(window).load(function() {
		var i = 1;
		var playing = setInterval(function() {
			i++;
			if (i > 1) {
				$('#load_page').fadeOut(300);
				clearInterval(playing);
			}
		}, 500);
	});
	
	$(document).ready(function() {
		var body = $('body');
		var pull = $('#pull');
		var bug = $('.bug');
		var search = $('#search')
		$(pull).on('click', function(e) {
		e.preventDefault();
		body.toggleClass('switch');
			bug.toggleClass('bug bug_close');
			search.toggleClass('search_menu');
		});

	});
	$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

});
});
