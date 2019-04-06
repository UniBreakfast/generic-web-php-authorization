<?php
require 'checkpoint.php';

$query = "SELECT login, lang FROM ".DB_PREFIX."users LEFT JOIN ".DB_PREFIX."settings ON id=user_id WHERE id=$id";
$result = mysqli_query($db, $query) or errWith('get login query failed');
list ($login, $lang) = mysqli_fetch_row($result) or failWith('user not found');

okWith('login',$login, 'token',$token, 'lang',$lang);
