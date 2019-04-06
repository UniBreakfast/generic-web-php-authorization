<?php

require '../common/f.php';
require '../../_offlimits/php/config.php';

$sql = file_get_contents('create_tables.sql');

mysqli_multi_query($db, str_replace('pref_', DB_PREFIX, $sql));

okWith('done');