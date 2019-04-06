<?php

function eject($response) { exit (json_encode($response)); }

function  errWith($msg) { eject(array( 'err'=>$msg)); }
function failWith($msg) { eject(array('fail'=>$msg)); }
function  invWith($msg) { eject(array( 'inv'=>$msg)); }

function okWith() {
  $args = func_get_args();
  if (1 == $len=sizeof($args)) eject(array('ok'=>$args[0]));
  for ($i=0; $i<$len; $i+=2) $ok[$args[$i]] = $args[$i+1];
  eject(array('ok'=>$ok?$ok:1));
}

function request() {
  foreach (func_get_args() as $arg) $values[] = $_REQUEST[$arg];
  return $values;
}

function randStr($length=32) {
  $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  $str = '';
  while ($length--) {
    $chars = str_shuffle($chars);
    $str  .= $chars[rand(0, 60)];
  }
  return $str;
}

function hashStr($str) {
  return $str? substr(crypt($str, '$2a$10$'.randStr(22)), 7) : '';
}

function hashCheck($str, $hash) {
  return !($str.$hash) ||
    ('$2a$10$'.$hash == crypt($str, '$2a$10$'.$hash))? true : false;
}