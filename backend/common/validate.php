<?php

function validate($subj, $checks) {
  if (isset($checks[0])) {
    for ($i=0; $i<sizeof($checks); $i++)
      if ($err=validate($subj,$checks[$i])) return $err;
  }
  elseif (gettype($subj)=='array') {
    if (isset($subj[0])) {
      if (isset($checks['sub'])) {
        $sub=$checks['sub'];
        if ($err=validate($subj[$sub-1],$checks))
          return array($sub, $err);
      }
      else {
        for ($i=0; $i<sizeof($subj); $i++)
          if ($err=validate($subj[$i],$checks))
            return array($i+1, $err);
      }
    }
    else {
      if (isset($checks['sub'])) {
        $sub=$checks['sub'];
        if ($err=validate($subj[$sub],$checks))
          return array($sub, $err);
      }
      else {
        foreach ($subj as $key=>$value)
          if ($err=validate($value,$checks))
            return array($key, $err);
      }
    }
  }
  else {
    $is = isset($checks['is'])? $checks['is'] :0;
    $not = isset($checks['not'])? $checks['not'] :0;
    $err = $checks['err'];
    if ($is && preg_match($is, $subj) or
        $not && !preg_match($not, $subj)) return $err;
  }
};

$emailRegExp = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';


function check_is($err, $regexp, $sub=null) {
  return array('err'=>$err, 'is'=>$regexp, 'sub'=>$sub);
}
function check_not($err, $regexp, $sub=null) {
  return array('err'=>$err, 'not'=>$regexp, 'sub'=>$sub);
}

function sub_less($subj, $sub) {
  return array_filter($subj, function($k)use($sub){return $k!=$sub;}, 2);
}
function check_less($checks, $sub) {
  return array_values(array_filter($checks,
    function($v)use($sub){return $v['sub']!=$sub;}));
}


?>