<?php

require '../common/f.php';
require '../../_offlimits/php/config.php';

$sql = p_(file_get_contents('create_tables.sql'));

mysqli_multi_query($db, $sql);

okWith('done');