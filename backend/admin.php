<?php
$admin = 1;
require 'checkpoint.php';

$query = "SELECT login, lang FROM ".DB_PREFIX."users LEFT JOIN ".DB_PREFIX."settings ON id=user_id WHERE id=$id";
$result = mysqli_query($db, $query) or errWith('get login query failed');
list ($login, $lang) = mysqli_fetch_row($result) or failWith('user not found');

$query = "SELECT login, DATE(u.dt_create) registered, CASE WHEN MAX(s.dt_modify) IS NULL THEN '' ELSE DATE_FORMAT(MAX(s.dt_modify), '%Y-%m-%d %H:%i') END seen, CASE WHEN a.user_id IS NULL THEN '' ELSE 'yes' END admin FROM ".DB_PREFIX."users u LEFT JOIN ".DB_PREFIX."sessions s ON u.id=s.user_id LEFT JOIN ".DB_PREFIX."admins a ON u.id=a.user_id GROUP BY login";
$result = mysqli_query($db, $query) or errWith('get userdata query failed');
$rows = mysqli_fetch_all($result);
mysqli_data_seek($result,0);
$headers = array_keys(mysqli_fetch_assoc($result));

okWith('login',$login, 'token',$token, 'lang',$lang, 'users',array($headers,$rows));
