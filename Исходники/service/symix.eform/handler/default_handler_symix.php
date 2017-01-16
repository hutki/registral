<?php	
require_once('index.php');
require_once('../symix.capcha/symix.capcha.php');

session_start();

if(!SymixCapcha::check_veriword($values['symix_capcha_word'])){
	 echo json_encode(array(
		'error' => true,
		'error_code' => true,
		'error_message' => 'Не верный код'
	));
	exit();
}
/* отправить почту */
	require_once('setting.php');
	if(is_array($to))
	{
		print_r($to);
		$emails = $to;
	}
	else
		$emails = explode(' ,', $to);
	foreach($emails as $mail)
	{
		mail($mail, $subject, $message, $headers, '-f'.$additional);
	}
echo json_encode(array(
	'error' => false
));
exit();