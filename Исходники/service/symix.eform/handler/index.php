<?php
$values = array();
if(isset($_POST['fieldNames']) && !empty($_POST['fieldNames']) && preg_match("/^[a-zA-Z0-9_;]+$/",$_POST['fieldNames']))
{
	$fields = explode(';', $_POST['fieldNames']);
	$count_fields = count($fields);	
}
else {
	echo json_encode(array(
		'error' => true,
		'error_message' => 'Ошибка при передачи данных'
		));
	exit();
}
foreach($fields as $field){
	if(isset($_POST["$field"])){
		$values[$field] = trim($_POST["$field"]);
	}
}
if(count($values) != count($fields))
{
	echo json_encode(array(
		'error' => true,
		'error_message' => 'Произошла ошибка при передачи данных'
		));
	exit();
}

foreach($values as $item)
	if(empty($item)){
		echo json_encode(array(
		'error' => true,
		'error_message' => 'Произошла ошибка при передачи данных2'
		));
		exit();
	}
