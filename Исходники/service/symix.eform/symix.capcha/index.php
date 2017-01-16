<?php
require_once('symix.capcha.php');
if(isset($_GET['height']))
	$height = intval($_GET['height']);
else
	$height = 40;
if(isset($_GET['width']))
	$width = intval($_GET['width']);
else
	$width = 120;
if(isset($_GET['type']))
	$type = $_GET['type'];
else
	$type = 'all';	
if(isset($_GET['str_len']))
	$str_len = intval($_GET['str_len']);
else
	$str_len = 6;

$vword = new SymixCapcha($width, $height, $str_len, $type);
$vword -> output_image();
$vword -> destroy_image();