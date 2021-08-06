id: 10
source: 1
name: getSiteScheme
properties: 'a:0:{}'

-----

$page = $modx->getObject('modResource', 4);
return trim($page->getTVValue('Color'));