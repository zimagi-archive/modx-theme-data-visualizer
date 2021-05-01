id: 5
name: FredRTETinyMCE
category: FredFAEditor
properties: 'a:0:{}'

-----

$corePath = $modx->getOption('fredrtetinymce.core_path', null, $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/fredrtetinymce/');
/** @var FredRTETinyMCE $fredRTETinyMCE */
$fredRTETinyMCE = $modx->getService(
    'fredrtetinymce',
    'FredRTETinyMCE',
    $corePath . 'model/fredrtetinymce/',
    array(
        'core_path' => $corePath
    )
);

$includes = '
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.2/tinymce.min.js"></script>
    <script type="text/javascript" src="' . $fredRTETinyMCE->getOption('webAssetsUrl') . 'fredrtetinymce.min.js"></script>
';
$beforeRender = '
    this.registerRTE("TinyMCE", FredRTETinyMCE);
';

$modx->event->_output = [
    'includes' => $includes, 
    'beforeRender' => $beforeRender,
    'lexicons' => ['fredrtetinymce:default']
];
return true;