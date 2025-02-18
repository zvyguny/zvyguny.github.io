<?php

$recepient = "arendamig@yandex.ru"; //Изменить
$sitename = "http://arendamig.ru"; //Изменить

$eduform = htmlentities($_POST['eduform']);
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nТелефон: $phone \nХочу: $eduform \nОписание: $text";
$headers = 'From: arendamig@yandex.ru' . "\r\n"; //Изменить
$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $headers, $message /*"Content-type: text/plain; charset=\"utf-8\"\n From: $recepient"*/);

