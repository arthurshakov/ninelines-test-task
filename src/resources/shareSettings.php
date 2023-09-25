<?php

$protocol = $_SERVER['PROTOCOL'] = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';
$host = $protocol . '://' . $_SERVER['HTTP_HOST'];
$title = '';
$description = '';
$image = $host . '/images/';

// Uncomment the code below and fill in the pages if necessary
$pages = [
	'/' => [
		'title' => 'Артур Шаков. Middle Front-end разработчик (HTML-верстальщик).',
		'description' => 'Как разработчик, я&nbsp;высоко ценю способность воплотить видение дизайнера в&nbsp;жизнь, что считаю очень полезным для бизнеса. Я&nbsp;получаю огромное удовлетворение, наблюдая за&nbsp;работой от&nbsp;идеи до&nbsp;дизайна, особенно когда она появляется в&nbsp;руках пользователя. Я&nbsp;считаю, что ориентированные на&nbsp;пользователя решения являются наиболее ценными цифровыми ресурсами будущего.',
		'image' => '/images/png/sharing-dude.png',
	],
	// '/page/1' => [
	// 	'title' => '',
	// 	'description' => '',
	// 	'image' => '/images/',
	// ],
];

$page = @$pages[$_SERVER['REQUEST_URI']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $host . $page['image'] : $image;
}

?>
