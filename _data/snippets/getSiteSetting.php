id: 3
source: 1
name: getSiteSetting
properties: 'a:0:{}'

-----

if($id){
    $page = $modx->getObject('modResource', $id);
    return $page->getTVValue($tv);
}