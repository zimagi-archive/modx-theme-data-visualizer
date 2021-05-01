id: 4
name: FredFAEditor
category: FredAceIntegration
properties: 'a:0:{}'

-----

$corePath = $modx->getOption('fredfaeditor.core_path', null, $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/fredfaeditor/');
/** @var FredFAEditor $fredFAEditor */
$fredFAEditor = $modx->getService(
    'fredfaeditor',
    'FredFAEditor',
    $corePath . 'model/fredfaeditor/',
    array(
        'core_path' => $corePath
    )
);

$includes = '<script type="text/javascript" src="' . $fredFAEditor->getOption('webAssetsUrl') . 'fredfaeditor.min.js"></script>';
$beforeRender = '
    this.registerEditor("FAEditor", FredFAEditor);
';

$modx->event->_output = [
    'includes' => $includes, 
    'beforeRender' => $beforeRender,
    'lexicons' => ['fredfaeditor:default']
];
return true;