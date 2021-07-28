id: 8
source: 1
name: getPageTitle
properties: 'a:0:{}'

-----

if($id){
    $document = $modx->getObject('modResource',array(
        'id' => $id,
       ));
    return $document->get('pagetitle');
}else{
  return '';
}