<?php
$to = 'info@ufreg.com';
$subject = "Запрос звонка с сайта ufreg.com";
$message = "
	<html>
		<head>
			<title>Форма обратной связи</title>
		</head>
		<body>
			<p>Обратный звонок:</p>
			<p>Отдел: $values[otdel]</p>
			<p>Имя: $values[name]</p>			
			<p>Телефон: +$values[phone]</p>
			<p>Звонить с $values[start] до $values[finish]</p>
		</body>
	</html>
";
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: info@ufreg.com\r\n";
$additional = 'info@ufreg.com';