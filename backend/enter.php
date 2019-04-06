<?php
require 'checkpoint.php';

$query = "SELECT login FROM ".DB_PREFIX."users WHERE id=$id";
$result = mysqli_query($db, $query) or errWith('get login query failed');
list ($login) = mysqli_fetch_row($result) or failWith('user not found');

okWith('login',$login, 'token',$token);
