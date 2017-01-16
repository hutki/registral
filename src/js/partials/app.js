(function ($) {

$.fn.menu = function () {
	var obj = $(this);
	var ww = $(window).width();

if (ww >= 981&& obj.find('li').hasClass("active")) {
<<<<<<< HEAD
	var posact = $('.active').position().left;
	var wact = $('.active').width();
	$('#line').css({'left': posact, 'width': wact});
=======

	$(window).load(function() {
var posact = $('.active').position().left;
	var wact = $('.active').width();
$('#line').css({'left': posact, 'width': wact});
>>>>>>> d9892d914b54f5eb35b43f2101fd284685a90770
	
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
<<<<<<< HEAD
		}
	
=======
	});
		}
>>>>>>> d9892d914b54f5eb35b43f2101fd284685a90770
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

<<<<<<< HEAD
=======
$.fn.wrapTable = function () {
	var ww = $(window).width();
if (ww <= 981) {
	$('table').wrap( "<div class='wrap_table'></div>" );
		}
}

>>>>>>> d9892d914b54f5eb35b43f2101fd284685a90770
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
<<<<<<< HEAD
	$('.m_menu').mMenu(400);
	$('#carusel').carusel();



=======
	$('table').wrapTable(400);
	$('.m_menu').mMenu(400);
	$('#carusel').carusel();

>>>>>>> d9892d914b54f5eb35b43f2101fd284685a90770
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
		var pull = $('#pull');
		menu = $('#menu');
		menuHeight = menu.height();

		$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
		});

		$(window).resize(function(){
			var w = $(window).width();

			if(w > 981&& menu.is(':hidden')) {
			menu.removeAttr('style');
			}
		});
	});
});
