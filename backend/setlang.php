<?php
require 'checkpoint.php';

$lang = $_REQUEST['lang'];

$check = check_not('incorrect language abbreviation', '/^\w{2,3}$/');
$invalid = validate($lang, $check);
if ($invalid) invWith(array('lang',$invalid));

$query = "INSERT ".DB_PREFIX."settings (user_id, lang) VALUES ($id, '$lang')
          ON DUPLICATE KEY UPDATE lang='$lang'";
mysqli_query($db, $query) or errWith('set lang query failed');

okWith('token',$token);
