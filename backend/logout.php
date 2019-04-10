<?php
require 'checkpoint.php';

$query = p_("DELETE FROM p_sessions WHERE token1='$token' OR
            token2='$token' OR token3='$token' OR token4='$token' OR
            token5='$token' OR token6='$token'");
mysqli_query($db, $query) or errWith('delete session query failed');

okWith();