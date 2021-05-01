id: 2
source: 1
name: sanitize
properties: 'a:0:{}'

-----

if($val){
    $result = str_replace( '"','',$val);
    return $result;
}
return;