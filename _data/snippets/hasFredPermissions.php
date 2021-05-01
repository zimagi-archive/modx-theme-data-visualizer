id: 6
source: 1
name: hasFredPermissions
properties: 'a:0:{}'

-----

$pm = 'fred';
if ($modx->hasPermission($pm)) {
  return 1;
}
return 0;