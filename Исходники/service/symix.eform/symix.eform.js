$(document).ready(function(e) {	
   $('#order_e_form').eForm({capcha_width: 80,capcha_height : 32,capcha_length:4, capcha_type : 'lower,numbers'});   
});
(function($){
	jQuery.fn.eForm = function(options){		
		options = $.extend({
			tpl : 'default',
			style : 'style',
			handler : 'default',
			capcha_height : 40,
			capcha_width: 120,
			capcha_length : 6,
			capcha_type : 'lower,upper,numbers'
			},options);
		
		var formHeight;
		var formHeightSuccess;
		var formWidthSuccess;
		var path_capcha;
		var capcha_index=1;
		var path_handler;
		
		positionFormY = function()
		{
			if($('#symix_e_form_background form').height() < $(window).height())
				return parseInt(($(window).height() - $('#symix_e_form_background form').height()) / 2);
			else
				return 0;
		}
		positionFormX = function()
		{
			if($('#symix_e_form_background form').width() < $(window).width())
				return parseInt(($(window).width() - $('#symix_e_form_background form').width()) / 2);
			else
				return 0;
		}
		var chanche_color = function(){			
			$(this).mouseenter(function(e) {
            	$(this).css({'color':options.hover_color});
            }).mouseleave(function(e) {
                $(this).css({'color':options.p_color});
            });
		}	
		positionForm = function(){
			$form = $('#symix_e_form_background').find('form');
			$left = 0;
			$top = $form.height()+100;
			if($(window).width() > $form.width())
				$left = ($(window).width() - $form.width())/2;
			$('#symix_e_form_background').find('form').css({'top':-$top, 'left': $left});
		}	
		capcha_refresh = function(){
			$('#symix_e_form_background img#symix_capcha').attr('src',path_capcha+capcha_index++);
		}	
		emptyFilds = function(){
			$result = false;
			if($('#symix_e_form_background form input[data-not-empty]').size() > 0){
				$('#symix_e_form_background form input[data-not-empty]').each(function(index, element) {					
                    if($(this).val() == ''){
						$result = true;
						return;
					}
                });
			}
			return $result;				
		}
		shakeInputError = function(it)
			{
				$left = $(it).offset().left;
				//$top = $('#symix_e_form').offset().top+$(it).position().top;
				$clone = $(it).clone();
				$clone.val('');
				$(it).after($clone);
				$(it).css({'position':'fixed','left':$left});
				$(it).animate({'left':$left+10},30).animate({'left':$left-10},30).animate({'left':$left+10},30).animate({'left':$left-10},30).animate({'left':$left},30,function()
				{
					$(this).removeAttr('style');
					if($(this).prepend('input').is('input'))
						$(this).next('input').remove();
				});
			}
		checkInput = function(it){
			str = $(it).attr('data-preg-match');
			flags = str.substring(str.lastIndexOf('/')+1, str.length);
			var pattern = new RegExp(str.substring(1,str.lastIndexOf('/')), flags);
			if($(it).val().match(pattern))
			{
				$(it).removeClass('check_fail');
				return true;							
			}
			else{
				if(!$(it).is(':animated')){
					$(it).addClass('check_fail');
					shakeInputError(it);
				}
				return false;
			}
		}
		checkFilds = function(){
			$result = true;
			if($('#symix_e_form_background form input[data-preg-match]').size() > 0)
			{
				$('#symix_e_form_background form input[data-preg-match]').each(function(index, element) {
                    if(!checkInput($(this))){						
						$result = false;	
					}
                });
			}
			return $result;
		}
		click_submit = function(){
			if(emptyFilds()){
				$('#symix_e_form_background div#symix_error_block').html('Необходимо заполнить все поля');
			}
			else 
			if(!checkFilds()){
				$('#symix_e_form_background div#symix_error_block').html('Не верный формат данных');
			}
			else{
				$post_data = 'fieldNames=';
				$('#symix_e_form_background form input[type="text"], #symix_e_form_background form select').each(function(index, element) {
					if(index != 0)
	                    $post_data += ';';
					$post_data += $(this).attr('name');
                });
				$post_data += ';href&href='+ window.location.href;
				$('#symix_e_form_background form input[type="text"], #symix_e_form_background form select').each(function(index, element) {
                    $post_data += '&'+$(this).attr('name')+'='+$(this).val();
                });
				$.ajax({
					url : 'http://'+location.host+'/'+path_handler+options.handler+'_handler_symix.php',
					type: "POST",
					dataType:"json",
					data: $post_data,
					success: function(data){
						if(data.error === true){
							if(data.error_code === true)
							{
								capcha_refresh();
								$('#symix_e_form_background form input#capcha_input').val('');
							}	
							$('#symix_e_form_background div#symix_error_block').html(data.error_message);
						}
						else{
							formSuccess();	
						}
					},
					error : function(){
					}
				});
			}
		}
		hide_form = function(){
			$('#symix_e_form_background form').animate({'top': 1.5*$(window).height()},300,function(){
				$('#symix_e_form_background').fadeOut(10);
				$('#symix_e_form_background form>div.default').removeAttr('style');
				$('#symix_e_form_background form>div.symix_e_form_success').hide();
				$('#symix_e_form_background').remove();
			});
		}
		show_form = function(it){
			options.handler = $(it).data('handler');
			path_handler = $(it).data('path_handler');
			tpl = $(it).data('tpl');
			$('body').append(tpl);
			$('select').selectbox();
			$('#symix_e_form_background').click(function(e) {
                if(e.target.id == 'symix_e_form_background')
					hide_form();
            });
			$('.symix_e_form_close').click(function(e){
				e.preventDefault();
				hide_form();
			});
			$('#symix_e_form_background a#refresh_capcha').click(function(e){
				e.preventDefault();
				capcha_refresh();
			});
			$('#symix_e_form_background form input[type="submit"]').click(function(e){
				e.preventDefault();
				click_submit();
			});
			$('input[data-preg-match]').blur(function(e){
				checkInput($(this));
			});
			$('input[data-preg-match]').focus(function(e) {
                $(this).removeClass('check_fail');
            });
			$('#symix_e_form_background form input[data-mask]').each(function(index, element) {
                $(this).inputmask($(this).attr('data-mask'));
            });
			$('#symix_e_form_background').show();
			$item = $('#symix_e_form_background div.symix_e_form_success');
			$item.css({'opacity':0.01}).show();
			formHeightSuccess = $item.height();
			formWidthSuccess = $item.width();
			$item.hide().removeAttr('style');
			$('#symix_e_form_background img#symix_capcha').attr('src',path_capcha+capcha_index++);
			positionForm();			
			$('#symix_e_form_background form').animate({'top': positionFormY()},200);
		}
		formSuccess = function(){			
				$top = 0;			
				if($(window).height() > formHeightSuccess)
					$top = ($(window).height() - formHeightSuccess) / 2;
				$left = 0;			
				if($(window).width() > formWidthSuccess)
					$left = ($(window).width() - formWidthSuccess) / 2;
				$('#symix_e_form_background form').animate({'left':$left, 'top':$top, 'width': formWidthSuccess, 'height': formHeightSuccess},300,function(){
					$('#symix_e_form_background form>div.default').hide();
					$('#symix_e_form_background form>div.symix_e_form_success').show();
				});
		},			
		init = function(it){	
			it = parseInt(Math.random() * 1000);
			$(this).click(function(e) {
						e.preventDefault();
						show_form(this);												
						});						
			$(this).addClass('button_for_symix_e_form_'+it);
			path = $('head script[src*="symix.eform.js"]').attr('src').replace("symix.eform.js",'');			
			path_capcha = 'http://'+location.host+'/'+path+'symix.capcha/index.php?height='+options.capcha_height+'&width='+options.capcha_width+'&str_len='+options.capcha_length+'&type='+options.capcha_type+'&q=';			
			$.ajax({
				url: 'http://'+location.host+'/'+path+'tpl/'+options.tpl+'.html',
				dataType : "html",
				success: function (obj)
					{	
						obj = '<div id="symix_e_form_background" style="display:none; position:fixed; top:0; left:0; height:100%; width:100%; background-color: rgba(0,0,0,0.3); z-index:1000;">'+obj+'</div>';					
					
					    $('.button_for_symix_e_form_'+it).data('tpl', obj);
						$('.button_for_symix_e_form_'+it).data('handler', options.handler);
						$('.button_for_symix_e_form_'+it).data('path_handler', path+'/handler/');
						if(!$('link[href="'+path+'css/'+options.style+'.css"]').is('link')){
						 	$('head').append('<link rel="stylesheet" type="text/css" href="'+path + 'css/'+options.style+'.css">');
							if(!$('link[href="'+path+'extract/selectbox.css"]').is('link'))
								$('head').append('<link rel="stylesheet" type="text/css" href="'+path + 'extract/selectbox.css">');
						}
						$('.button_for_symix_e_form_'+it).removeClass('button_for_symix_e_form_'+it);
						
						if(!$('head script[src*="jquery.selectbox.js"]').is('script'))
								$('head script[src*="symix.eform.js"]').before('<script type="text/javascript" src="'+path+'extract/jquery.selectbox.js"></script>');;
						
						if($(obj).find('input[data-mask]').is('input')){
							if(!$('head script[src*="jquery.inputmask.js"]').is('script'))
								$('head script[src*="symix.eform.js"]').before('<script type="text/javascript" src="'+path+'jquery.inputmask.js"></script>');
						}						
						$(window).resize(function(e) {
                            $('#symix_e_form_background form').css({'top' : positionFormY(),'left' : positionFormX()});
                        });
					},
				error: function(){
						//alert('Не удалось прочитать шаблон формы обратной связи');
					//alert(location.host);
					}
			});
		}
		
		return this.each(init);
	};
})(jQuery);