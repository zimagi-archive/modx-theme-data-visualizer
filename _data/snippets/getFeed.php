id: 7
name: getFeed
description: '<b>1.0.0-pl</b> A simple RSS feed client component for MODx Revolution'
properties: 'a:7:{s:3:"url";a:7:{s:4:"name";s:3:"url";s:4:"desc";s:27:"URL of the feed to retrieve";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:3:"tpl";a:7:{s:4:"name";s:3:"tpl";s:4:"desc";s:39:"Name of a chunk to serve as an item tpl";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:5:"limit";a:7:{s:4:"name";s:5:"limit";s:4:"desc";s:51:"Limit the number of items to return; 0 is no limit.";s:4:"type";s:11:"numberfield";s:7:"options";s:0:"";s:5:"value";s:1:"0";s:7:"lexicon";N;s:4:"area";s:0:"";}s:6:"offset";a:7:{s:4:"name";s:6:"offset";s:4:"desc";s:65:"The zero-based index of the item to start at in the feed results.";s:4:"type";s:11:"numberfield";s:7:"options";s:0:"";s:5:"value";s:1:"0";s:7:"lexicon";N;s:4:"area";s:0:"";}s:8:"totalVar";a:7:{s:4:"name";s:8:"totalVar";s:4:"desc";s:107:"The name of a placeholder where the total number of items in the feed is stored. For getPage compatibility.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:5:"total";s:7:"lexicon";N;s:4:"area";s:0:"";}s:13:"toPlaceholder";a:7:{s:4:"name";s:13:"toPlaceholder";s:4:"desc";s:99:"If set, will set the output to this placeholder name. If not set, will output directly the results.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";N;s:4:"area";s:0:"";}s:14:"outputEncoding";a:7:{s:4:"name";s:14:"outputEncoding";s:4:"desc";s:44:"Sets the encoding for the Magpie RSS loader.";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:5:"UTF-8";s:7:"lexicon";N;s:4:"area";s:0:"";}}'

-----

/**
 * getFeed
 *
 * A simple snippet to retrieve an RSS feed and iterate the feed items using a Chunk.
 *
 * @author Jason Coward <jason@modxcms.com>
 * @author Shaun McCormick <shaun@modxcms.com>
 *
 * @version 1.0.0-beta
 * @copyright Copyright 2010 by Jason Coward
 * @license http://www.gnu.org/licenses/gpl.txt GPLv3
 */
if (!defined('MAGPIE_OUTPUT_ENCODING')) {
    $outputEncoding = $modx->getOption('outputEncoding',$scriptProperties,'UTF-8');
    define('MAGPIE_OUTPUT_ENCODING',$outputEncoding);
}
$limit = isset($limit) ? (integer) $limit : 0;
$offset = isset($offset) ? (integer) $offset : 0;
$totalVar = !empty($totalVar) ? $totalVar : 'total';
$total = 0;
$output = array();
if (!empty($url) && $modx->getService('rss', 'xmlrss.modRSSParser')) {
    $rss = $modx->rss->parse($url);
    if (!empty($rss) && isset($rss->items)) {
        $total = count($rss->items);
        $modx->setPlaceholder($totalVar, $total);
        $itemIdx = 0;
        $idx = 0;
        while (list($itemKey, $item) = each($rss->items)) {
            if ($idx >= $offset) {
                foreach ($item as $k => $v) {
                    $item[$k] = str_replace(array('[',']'),array('&#91;','&#93;'),$item[$k]);
                }
                if (!empty($tpl)) {
                    $output[] = $modx->getChunk($tpl, $item);
                } else {
                    $output[] = '<pre>'.$idx.': ' . print_r($item, true) . '</pre>';
                }
                $itemIdx++;
                if ($limit > 0 && $itemIdx+1 > $limit) break;
            }
            $idx++;
        }
    } else {
        $modx->log(modX::LOG_LEVEL_ERROR, "Error parsing RSS feed at {$url}", '', 'getFeed', __FILE__, __LINE__);
    }
}
$output = implode("\n", $output);

if (!empty($scriptProperties['toPlaceholder'])) {
    $modx->setPlaceholder($scriptProperties['toPlaceholder'],$output);
    return '';
}
return $output;