id: 4
source: 1
name: getResourceInclude
properties: 'a:0:{}'

-----

if($id){
    if($modx->getObject('modResource', $id)){
        $page = $modx->getObject('modResource', $id);
        $content = $page->get('content');
        echo $content;
    }
}