<?php
require 'checkpoint.php';

$query = p_("SELECT login, lang FROM p_users LEFT JOIN p_settings ON id=user_id WHERE id=$id");
$result = mysqli_query($db, $query) or errWith('get login query failed');
list ($login, $lang) = mysqli_fetch_row($result) or failWith('user not found');

okWith('login',$login, 'token',$token, 'lang',$lang);
