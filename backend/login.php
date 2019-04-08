<?php
header('Access-Control-Allow-Origin: *');
require 'common/f.php';
require 'common/validate.php';
require '../_offlimits/php/config.php';
list ($login, $pass) = request('login', 'pass');

$subj = array('login'=>$login, 'pass'=>$pass);
$checks = array(
  check_is('should only have latin letters, numbers and underscores',
           '/\W/', 'login'),
  check_not('enter login', '/./', 'login'));
$invalid = validate($subj, $checks);
if ($invalid) invWith($invalid);

$query = "SELECT id, passhash, user_id FROM ".DB_PREFIX."users LEFT JOIN ".DB_PREFIX."admins ON id=user_id WHERE login='$login'";
$result = mysqli_query($db, $query) or errWith('get hash query failed');
list ($id, $hash, $admin) = mysqli_fetch_row($result) or failWith('user not found');
if (!hashCheck($pass, $hash)) failWith('wrong password');

$token = randStr();
$query = "INSERT ".DB_PREFIX."sessions (user_id, token6) VALUE ($id, '$token')";
mysqli_query($db, $query) or errWith('begin session query failed');

if ($admin) okWith('id',$id, 'token',$token, 'a',1);
okWith('id',$id, 'token',$token);