<?php
header("Access-Control-Allow-Origin: *");
require 'common/f.php';
require 'common/validate.php';
require '../_offlimits/php/config.php';
list ($login, $pass) = request('login', 'pass');

$subj = array('login'=>$login, 'pass'=>$pass);
$checks = array(
  check_is('alphanumeric',
           '/\W/', 'login'),
  check_not('3 to 16 long',
            '/^.{3,16}$/', 'login'),
  check_not('at least 6 long',
            '/.{6}/', 'pass')  );
$invalid = validate($subj, $checks);
if ($invalid) invWith($invalid);

$query = p_("SELECT id FROM p_users WHERE login='$login'");
$result = mysqli_query($db, $query) or errWith('if occupied query failed');
if (mysqli_fetch_row($result)) failWith('occupied');

$hash = hashStr($pass);
$query = p_("INSERT p_users (login, passhash) VALUE ('$login','$hash')");
mysqli_query($db, $query) or errWith('register query failed');

okWith();
