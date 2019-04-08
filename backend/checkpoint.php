<?php
header("Access-Control-Allow-Origin: *");
require 'common/f.php';
require 'common/validate.php';
require '../_offlimits/php/config.php';
list ($id, $token) = request('id', 'token');

$subj = array('id'=>$id, 'token'=>$token);
$checks = array(
  check_not('should be a positive integer',
            '/^[1-9]\d*$/', 'id'),
  check_not('should be alphanumeric 32 characters long',
            '/^[0-9a-zA-Z]{32}$/', 'token'));
$invalid = validate($subj, $checks);
if ($invalid) invWith($invalid);

$query = "DELETE FROM ".DB_PREFIX."sessions WHERE dt_modify < NOW() - INTERVAL 3 DAY";
mysqli_query($db, $query) or errWith('delete old query failed');

$query = "SELECT id, a.user_id FROM ".DB_PREFIX."sessions s LEFT JOIN ".DB_PREFIX."admins a ON s.user_id=a.user_id WHERE s.user_id=$id AND
  (token1='$token' OR token2='$token' OR token3='$token' OR
   token4='$token' OR token5='$token' OR token6='$token')";
$result = mysqli_query($db, $query) or errWith('get session query failed');
list ($session,$adm) = mysqli_fetch_row($result) or failWith('no such session');
if (isset($admin) and !$adm) failWith('not an admin');

$token = randStr();

$query = "UPDATE ".DB_PREFIX."sessions SET token1=token2, token2=token3,
  token3=token4, token4=token5, token5=token6, token6='$token'
  WHERE id=$session";
mysqli_query($db, $query) or errWith('update session query failed');
