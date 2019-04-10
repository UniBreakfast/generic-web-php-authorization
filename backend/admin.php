<?php
$admin = 1;
require 'checkpoint.php';

$query = p_("SELECT login, lang FROM p_users LEFT JOIN p_settings ON id=user_id WHERE id=$id");
$result = mysqli_query($db, $query) or errWith('get login query failed');
list ($login, $lang) = mysqli_fetch_row($result) or failWith('user not found');

$query = p_("SELECT login, DATE(u.dt_create) registered, CASE WHEN MAX(s.dt_modify) IS NULL THEN '' ELSE DATE_FORMAT(MAX(s.dt_modify), '%Y-%m-%d %H:%i') END seen, CASE WHEN a.user_id IS NULL THEN '' ELSE 'yes' END admin FROM p_users u LEFT JOIN p_sessions s ON u.id=s.user_id LEFT JOIN p_admins a ON u.id=a.user_id GROUP BY login");
$result = mysqli_query($db, $query) or errWith('get userdata query failed');
$rows = mysqli_fetch_all($result);
mysqli_data_seek($result,0);
$headers = array_keys(mysqli_fetch_assoc($result));

okWith('login',$login, 'token',$token, 'lang',$lang, 'users',array($headers,$rows));
