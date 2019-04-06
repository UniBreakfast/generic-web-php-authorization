<?php

error_reporting(E_PARSE | E_ERROR);

define('DEV', $_REQUEST['dev']);

define('DB_HOST', 'localhost');
define('DB_LOGIN', DEV? 'root':'');
define('DB_PASS', DEV? '':'');
define('DB_NAME', 'sandbox');
define('DB_PREFIX', 'gwpa_');

$db = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASS, DB_NAME);

if (!$db) errWith("couldn't connect to db");
