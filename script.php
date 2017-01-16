<?php
/*
 * выводит запрошенное количество
 * символов строки
 * Получает следующие параметры	
 * str - строка
 * len - количество символов
 * end - окончание обрезанной строки
 *	
 * @copyright 	2015 SYMIX.RU
 * @author 		Solodkov Vladimir Sergeevich
 * @link		http://symix.ru
 */

// Удаляем html с полученной строки
$str = strip_tags($str);

if (mb_strlen($str) <= $len)
{
	// Возвращаем строку без изменений
	if (!empty($str))
		return htmlspecialchars($str).$end;
}
else
{
	// Выбираем подстроку и разбиваем ее на массив
	$str_array = explode(' ', mb_substr($str, 0, $len));
	
	// Удаляем последний элемент массива
	array_pop($str_array);
	
	// Собираем из массива строку удаляя множественные html пробелы
	$end_str = preg_replace('/  +/',' ',str_replace('&nbsp;',' ',implode(' ', $str_array)));
	
	// Возвращаем результат
	return htmlspecialchars($end_str).$end;
}